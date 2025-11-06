<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Moon, Sun, Menu, X } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
]

const scrollToSection = (href: string) => {
  const id = href.replace('#', '')
  
  // If we're not on the home page, navigate to home first
  if (route.path !== '/') {
    router.push('/').then(() => {
      // Wait for the page to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        isMobileMenuOpen.value = false
      }, 100)
    })
  } else {
    // Already on home page, just scroll
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    isMobileMenuOpen.value = false
  }
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <a href="#home" @click.prevent="scrollToSection('#home')" class="text-xl font-bold text-gray-900 dark:text-white">
          Portfolio
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {{ item.name }}
          </a>
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun v-if="isDark" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <Moon v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-2">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
      >
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>
