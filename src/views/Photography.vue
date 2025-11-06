<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { usePhotos } from '@/composables/usePhotos'
import { ArrowLeft, Maximize2 } from 'lucide-vue-next'
import type { Photo } from '@/types'

const router = useRouter()
const { photos, loading, error, allTags, fetchPhotos, getPhotoUrl, loadMore, isPreloaded } = usePhotos()
const selectedTag = ref<string>('All')
const selectedPhoto = ref<string | null>(null)

// Detect if we're on mobile/tablet (up to 1024px)
const isMobile = useMediaQuery('(max-width: 1024px)')

// Helper function to get the appropriate image URL for a photo
const getImageUrl = (photo: Photo) => {
  // On mobile, prefer thumbnail if available
  if (isMobile.value && photo.thumbnail_path) {
    return getPhotoUrl(photo.thumbnail_path)
  }
  // Otherwise use full image
  return getPhotoUrl(photo.file_path)
}

// Handle image load errors - fallback to full image if thumbnail fails
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const photo = filteredPhotos.value.find(p => {
    const currentUrl = getImageUrl(p)
    return img.src === currentUrl || img.src.includes(p.thumbnail_path || '')
  })
  
  if (photo && photo.thumbnail_path && img.src.includes(photo.thumbnail_path)) {
    // If thumbnail failed, try full image
    img.src = getPhotoUrl(photo.file_path)
  }
}

useHead({
  title: 'Photography - Sampson Miller'
})

onMounted(() => {
  // If photos are already preloaded, use existing data
  // Otherwise fetch normally
  if (!isPreloaded.value || photos.value.length === 0) {
    fetchPhotos()
  }
})

const tagList = computed(() => {
  return ['All', ...allTags.value]
})

const filteredPhotos = computed(() => {
  if (selectedTag.value === 'All') {
    return photos.value
  }
  return photos.value.filter(photo => 
    photo.tags?.includes(selectedTag.value)
  )
})

const handleTagChange = (tag: string) => {
  selectedTag.value = tag
  fetchPhotos(tag === 'All' ? undefined : { tags: [tag] })
}

const openLightbox = (photoId: string) => {
  selectedPhoto.value = photoId
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedPhoto.value = null
  document.body.style.overflow = ''
}

const currentPhoto = computed(() => {
  return photos.value.find(p => p.id === selectedPhoto.value)
})

const navigatePhoto = (direction: 'prev' | 'next') => {
  if (!selectedPhoto.value) return
  const currentIndex = filteredPhotos.value.findIndex(p => p.id === selectedPhoto.value)
  if (direction === 'prev' && currentIndex > 0) {
    selectedPhoto.value = filteredPhotos.value[currentIndex - 1].id
  } else if (direction === 'next' && currentIndex < filteredPhotos.value.length - 1) {
    selectedPhoto.value = filteredPhotos.value[currentIndex + 1].id
  }
}

// Swipe gesture handling for mobile
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchEndX = ref(0)
const touchEndY = ref(0)
const minSwipeDistance = 50 // Minimum distance in pixels to trigger swipe

const handleTouchStart = (event: TouchEvent) => {
  // Only handle touches on the image container, not buttons
  const target = event.target as HTMLElement
  if (target.closest('button')) return
  
  touchStartX.value = event.touches[0].clientX
  touchStartY.value = event.touches[0].clientY
}

const handleTouchEnd = (event: TouchEvent) => {
  // Only handle touches on the image container, not buttons
  const target = event.target as HTMLElement
  if (target.closest('button')) {
    touchStartX.value = 0
    touchStartY.value = 0
    return
  }
  
  if (!touchStartX.value || !touchStartY.value) return
  
  touchEndX.value = event.changedTouches[0].clientX
  touchEndY.value = event.changedTouches[0].clientY
  
  const deltaX = touchEndX.value - touchStartX.value
  const deltaY = touchEndY.value - touchStartY.value
  
  // Check if horizontal swipe is more significant than vertical swipe
  // This prevents accidental navigation when scrolling vertically
  // Require at least 2:1 ratio of horizontal to vertical movement
  if (Math.abs(deltaX) > Math.abs(deltaY) * 2 && Math.abs(deltaX) > minSwipeDistance) {
    // Prevent default to avoid any scrolling
    event.preventDefault()
    
    if (deltaX > 0) {
      // Swipe right - go to previous photo
      navigatePhoto('prev')
    } else {
      // Swipe left - go to next photo
      navigatePhoto('next')
    }
  }
  
  // Reset touch positions
  touchStartX.value = 0
  touchStartY.value = 0
}
</script>

<template>
  <main class="min-h-screen py-16 pt-32">
    <div class="container-custom">
      <button
        @click="router.push('/')"
        class="mb-8 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Home
      </button>

      <SectionHeader title="Photography" subtitle="Capturing moments and exploring creative photography" />
      
      <!-- Error message -->
      <div v-if="error" class="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
        <p class="font-medium">Error loading photos</p>
        <p class="text-sm mt-1">{{ error }}</p>
        <p class="text-sm mt-2">
          <span v-if="error.includes('not configured')">
            For local development: Add environment variables to <code class="bg-red-200 dark:bg-red-900 px-1 rounded">.env.local</code><br>
            For Vercel deployment: Add environment variables in Vercel Dashboard → Settings → Environment Variables
          </span>
          <span v-else>
            Please check your Supabase configuration. See <code class="bg-red-200 dark:bg-red-900 px-1 rounded">VERCEL_DEPLOYMENT.md</code> for deployment instructions.
          </span>
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading && photos.length === 0" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>

      <!-- Tag filters -->
      <div v-if="!loading || photos.length > 0" class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="tag in tagList"
          :key="tag"
          @click="handleTagChange(tag)"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            selectedTag === tag
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
          ]"
        >
          {{ tag }}
        </button>
      </div>
      
      <!-- Photo grid -->
      <div v-if="!loading || photos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="photo in filteredPhotos"
          :key="photo.id"
          class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          @click="openLightbox(photo.id)"
        >
          <img
            :key="`${photo.id}-${isMobile}`"
            :src="getImageUrl(photo)"
            :alt="photo.title"
            class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            @error="handleImageError"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
            <Maximize2 class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p class="text-white text-sm font-medium">{{ photo.title }}</p>
            <div v-if="photo.tags && photo.tags.length > 0" class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="tag in photo.tags"
                :key="tag"
                class="text-xs bg-white/20 text-white px-2 py-0.5 rounded"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && photos.length === 0 && !error" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400 text-lg">No photos found</p>
      </div>

      <!-- Load more button -->
      <div v-if="photos.length > 0 && !loading" class="text-center mt-8">
        <button
          @click="loadMore(selectedTag === 'All' ? undefined : { tags: [selectedTag] })"
          class="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Load More
        </button>
      </div>

      <!-- Lightbox Modal -->
      <div
        v-if="selectedPhoto"
        class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <button
          v-if="filteredPhotos.findIndex(p => p.id === selectedPhoto) > 0"
          @click="navigatePhoto('prev')"
          class="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Previous"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          v-if="filteredPhotos.findIndex(p => p.id === selectedPhoto) < filteredPhotos.length - 1"
          @click="navigatePhoto('next')"
          class="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Next"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div 
          class="max-w-7xl max-h-full touch-none"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <img
            v-if="currentPhoto"
            :src="getPhotoUrl(currentPhoto.file_path)"
            :alt="currentPhoto.title"
            class="max-w-full max-h-[90vh] object-contain select-none"
            draggable="false"
          />
          <div class="mt-4 text-center text-white">
            <h3 class="text-xl font-semibold">{{ currentPhoto?.title }}</h3>
            <p v-if="currentPhoto?.description" class="mt-2 text-gray-300 text-sm">
              {{ currentPhoto.description }}
            </p>
            <div v-if="currentPhoto?.tags && currentPhoto.tags.length > 0" class="flex flex-wrap justify-center gap-2 mt-2">
              <span
                v-for="tag in currentPhoto.tags"
                :key="tag"
                class="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Prevent body scroll when lightbox is open */

/* Improve touch handling for swipe gestures */
.touch-none {
  touch-action: pan-x pan-y pinch-zoom;
}

/* Prevent image dragging on mobile */
img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
</style>
