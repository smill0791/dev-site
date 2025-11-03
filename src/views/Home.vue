<script setup lang="ts">
import { useHead } from '@vueuse/head'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Experience from '@/components/sections/Experience.vue'
import Projects from '@/components/sections/Projects.vue'
import Skills from '@/components/sections/Skills.vue'
import Interests from '@/components/sections/Interests.vue'
import Contact from '@/components/sections/Contact.vue'

useHead({
  title: 'Developer Portfolio',
  meta: [
    { name: 'description', content: 'Full Stack Developer Portfolio - Modern web applications with Vue.js and TypeScript' }
  ]
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
