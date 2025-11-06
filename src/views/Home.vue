<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Experience from '@/components/sections/Experience.vue'
import Projects from '@/components/sections/Projects.vue'
import Skills from '@/components/sections/Skills.vue'
import Interests from '@/components/sections/Interests.vue'
import Contact from '@/components/sections/Contact.vue'
import { usePhotos } from '@/composables/usePhotos'

useHead({
  title: 'Developer Portfolio',
  meta: [
    { name: 'description', content: 'Full Stack Developer Portfolio - Modern web applications with Vue.js and TypeScript' }
  ]
})

const { preloadPhotos } = usePhotos()

// Preload photos after a short delay or when browser is idle
onMounted(() => {
  const preloadWithIdleCallback = () => {
    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          preloadPhotos().catch(() => {
            // Silently fail - preload is optional
          })
        },
        { timeout: 2000 } // Fallback after 2 seconds if idle callback doesn't fire
      )
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        preloadPhotos().catch(() => {
          // Silently fail - preload is optional
        })
      }, 2000)
    }
  }

  preloadWithIdleCallback()
})
</script>

<template>
  <main>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Interests />
    <Contact />
  </main>
</template>
