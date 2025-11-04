<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { photos } from '@/data/photos'
import { ArrowLeft, Maximize2 } from 'lucide-vue-next'

const router = useRouter()
const selectedTag = ref<string>('All')
const selectedPhoto = ref<string | null>(null)

useHead({
  title: 'Photography - Sampson Miller'
})

const allTags = computed(() => {
  const tags = new Set<string>()
  photos.forEach(photo => {
    photo.tags.forEach(tag => tags.add(tag))
  })
  return ['All', ...Array.from(tags).sort()]
})

const filteredPhotos = computed(() => {
  if (selectedTag.value === 'All') {
    return photos
  }
  return photos.filter(photo => 
    photo.tags.includes(selectedTag.value)
  )
})

const openLightbox = (photoId: string) => {
  selectedPhoto.value = photoId
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedPhoto.value = null
  document.body.style.overflow = ''
}

const currentPhoto = computed(() => {
  return photos.find(p => p.id === selectedPhoto.value)
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
      
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="selectedTag = tag"
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
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="photo in filteredPhotos"
          :key="photo.id"
          class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          @click="openLightbox(photo.id)"
        >
          <img
            :src="photo.image"
            :alt="photo.title"
            class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
            <Maximize2 class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p class="text-white text-sm font-medium">{{ photo.title }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
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

        <div class="max-w-7xl max-h-full">
          <img
            v-if="currentPhoto"
            :src="currentPhoto.image"
            :alt="currentPhoto.title"
            class="max-w-full max-h-[90vh] object-contain"
          />
          <div class="mt-4 text-center text-white">
            <h3 class="text-xl font-semibold">{{ currentPhoto?.title }}</h3>
            <div class="flex flex-wrap justify-center gap-2 mt-2">
              <span
                v-for="tag in currentPhoto?.tags"
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
</style>
