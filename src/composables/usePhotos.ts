import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Photo, PhotoFilters } from '@/types'
import { PHOTO_TAGS } from '@/data/tags'

// Shared state (singleton pattern) - moved outside function to share across component instances
const photos = ref<Photo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = 12
const hasMore = ref(true)
const isPreloaded = ref(false)
const preloadPromise = ref<Promise<void> | null>(null)

export function usePhotos() {

  // Get photo URL from Supabase storage
  // Note: Supabase Storage doesn't support transform options in getPublicUrl
  // For image transformations, you'd need to use Supabase Image Transformations (separate service)
  // or generate thumbnails on upload
  const getPhotoUrl = (path: string) => {
    if (!path) return ''
    
    const { data } = supabase.storage
      .from('photos')
      .getPublicUrl(path)
    
    return data.publicUrl
  }

  // Internal fetch function (used by both fetchPhotos and preloadPhotos)
  const _fetchPhotosInternal = async (filters?: PhotoFilters, page = 1, silent = false) => {
    if (!silent) {
      loading.value = true
    }
    error.value = null

    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      error.value = 'Supabase environment variables are not configured. Please check your deployment settings.'
      if (!silent) {
        loading.value = false
      }
      console.error('Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to environment variables.')
      return
    }

    try {
      let query = supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1)

      // Apply filters
      if (filters?.category) {
        query = query.eq('category', filters.category)
      }
      
      if (filters?.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags)
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      if (page === 1) {
        photos.value = (data || []) as Photo[]
      } else {
        photos.value = [...photos.value, ...((data || []) as Photo[])]
      }

      hasMore.value = (data?.length || 0) === pageSize
      currentPage.value = page
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch photos'
      console.error('Error fetching photos:', e)
      photos.value = []
    } finally {
      if (!silent) {
        loading.value = false
      }
    }
  }

  // Fetch photos with optional filters (normal fetch with loading state)
  const fetchPhotos = async (filters?: PhotoFilters, page = 1) => {
    await _fetchPhotosInternal(filters, page, false)
  }

  // Preload photos silently in the background (no loading state)
  const preloadPhotos = async () => {
    // If already preloaded or preload in progress, return existing promise
    if (isPreloaded.value) {
      return Promise.resolve()
    }
    
    if (preloadPromise.value) {
      return preloadPromise.value
    }

    // Create preload promise
    preloadPromise.value = _fetchPhotosInternal(undefined, 1, true).then(() => {
      isPreloaded.value = true
    }).catch(() => {
      // Reset promise on error so it can be retried
      preloadPromise.value = null
    })

    return preloadPromise.value
  }

  // Get single photo by ID
  const getPhoto = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('photos')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      if (!data) return null

      const photo = data as Photo

      // Increment view count
      const currentViews = typeof photo.views === 'number' ? photo.views : 0
      // Use type assertion to bypass TypeScript inference issue with Supabase types
      await (supabase
        .from('photos') as any)
        .update({ views: currentViews + 1 })
        .eq('id', id)

      return photo
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch photo'
      console.error('Error fetching photo:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  // Load more photos (pagination)
  const loadMore = async (filters?: PhotoFilters) => {
    if (!hasMore.value || loading.value) return
    await fetchPhotos(filters, currentPage.value + 1)
  }

  // Get unique categories
  const categories = computed(() => {
    const cats = new Set<string>()
    photos.value.forEach(photo => {
      if (photo.category) cats.add(photo.category)
    })
    return Array.from(cats).sort()
  })

  // Get all unique tags
  // Prioritizes predefined tags, then adds any additional tags from photos
  const allTags = computed(() => {
    const tagsFromPhotos = new Set<string>()
    photos.value.forEach(photo => {
      photo.tags?.forEach(tag => tagsFromPhotos.add(tag))
    })
    
    // Start with predefined tags that exist in photos
    const predefinedInPhotos = PHOTO_TAGS.filter(tag => tagsFromPhotos.has(tag))
    
    // Add any other tags from photos that aren't in predefined list
    const otherTags = Array.from(tagsFromPhotos)
      .filter(tag => !PHOTO_TAGS.includes(tag as any))
      .sort()
    
    return [...predefinedInPhotos, ...otherTags]
  })

  return {
    photos,
    loading,
    error,
    hasMore,
    currentPage,
    categories,
    allTags,
    fetchPhotos,
    preloadPhotos,
    getPhoto,
    getPhotoUrl,
    loadMore,
    isPreloaded
  }
}
