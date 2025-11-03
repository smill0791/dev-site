<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next'

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/smill0791' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sampson-miller-72087a17a/' },
  { name: 'Email', icon: Mail, url: 'mailto:smill0791@gmail.com' }
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
    <div class="container-custom section-padding">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="text-gray-600 dark:text-gray-400">
          <p>&copy; {{ currentYear }} Portfolio. All rights reserved.</p>
        </div>
        <div class="flex items-center space-x-6">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            :aria-label="link.name"
          >
            <component :is="link.icon" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
