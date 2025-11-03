<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { Github, Linkedin, Mail, Download } from 'lucide-vue-next'

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/smill0791' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sampson-miller-72087a17a/' },
  { name: 'Email', icon: Mail, url: 'mailto:smill0791@gmail.com' }
]

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="home" class="min-h-screen flex items-center justify-center section-padding pt-32">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Hi, I'm <span class="text-blue-600 dark:text-blue-400">Sampson Miller</span>
        </h1>
        <h2 class="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6">
          Full Stack Developer
        </h2>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          I build modern web applications with a focus on user experience, performance, and clean code.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" @click="scrollToSection('projects')">
            View Projects
          </Button>
          <Button variant="outline" size="lg" @click="scrollToSection('contact')">
            Get In Touch
          </Button>
          <a href="/resume.pdf" download>
            <Button variant="secondary" size="lg">
              <Download class="w-5 h-5 mr-2 inline" />
              Resume
            </Button>
          </a>
        </div>

        <div class="flex items-center justify-center space-x-6">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :aria-label="link.name"
          >
            <component :is="link.icon" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
