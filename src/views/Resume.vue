<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { experiences } from '@/data/experience'
import { skills } from '@/data/skills'
import Badge from '@/components/ui/Badge.vue'

useHead({
  title: 'Resume - Developer Portfolio'
})

const skillCategories = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = []
  }
  acc[skill.category].push(skill)
  return acc
}, {} as Record<string, typeof skills>)
</script>

<template>
  <main class="min-h-screen bg-white dark:bg-slate-900 py-16">
    <div class="container-custom max-w-4xl mx-auto">
      <div class="bg-white dark:bg-slate-800 shadow-lg p-8 md:p-12">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Sampson Miller
          </h1>
          <p class="text-xl text-gray-700 dark:text-gray-300 mb-4">
            Full Stack Developer
          </p>
          <div class="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <a href="mailto:smill0791@gmail.com" class="hover:text-blue-600 dark:hover:text-blue-400">
              smill0791@gmail.com
            </a>
            <span>•</span>
            <a href="https://github.com/smill0791" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 dark:hover:text-blue-400">
              GitHub
            </a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/sampson-miller-72087a17a/" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 dark:hover:text-blue-400">
              LinkedIn
            </a>
          </div>
          <div class="text-center">
            <a href="/resume.pdf" download class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <!-- Experience -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
            Experience
          </h2>
          <div v-for="exp in experiences" :key="exp.id" class="mb-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ exp.position }}
                </h3>
                <p class="text-lg text-blue-600 dark:text-blue-400">
                  {{ exp.company }}
                </p>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                {{ exp.startDate }} - {{ exp.endDate }}
              </p>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-2">
              {{ exp.description }}
            </p>
            <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-2">
              <li v-for="achievement in exp.achievements" :key="achievement">
                {{ achievement }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="tech in exp.technologies" :key="tech">
                {{ tech }}
              </Badge>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
            Skills
          </h2>
          <div v-for="(categorySkills, category) in skillCategories" :key="category" class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ category }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in categorySkills"
                :key="skill.name"
                class="text-gray-700 dark:text-gray-300"
              >
                {{ skill.name }} <span class="text-gray-500">({{ skill.proficiency }})</span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
@media print {
  body {
    background: white;
  }
  .container-custom {
    max-width: 100%;
  }
}
</style>
