<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { projects } from '@/data/projects'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { ExternalLink, Github, ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  return projects.find(p => p.id === route.params.id as string)
})

useHead({
  title: computed(() => project.value ? `${project.value.title} - Portfolio` : 'Project Not Found')
})

if (!project.value) {
  router.push('/')
}
</script>

<template>
  <main class="min-h-screen py-16 pt-32">
    <div class="container-custom max-w-4xl mx-auto">
      <Button
        variant="outline"
        @click="router.push('/')"
        class="mb-8"
      >
        <ArrowLeft class="w-4 h-4 mr-2 inline" />
        Back to Home
      </Button>

      <article v-if="project" class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ project.title }}
        </h1>
        <p class="text-xl text-gray-700 dark:text-gray-300 mb-6">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-8">
          <Badge
            v-for="tech in project.technologies"
            :key="tech"
            variant="primary"
          >
            {{ tech }}
          </Badge>
        </div>

        <div v-if="project.longDescription" class="prose dark:prose-invert max-w-none mb-8">
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ project.longDescription }}
          </p>
        </div>

        <div class="flex flex-wrap gap-4">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">
              <ExternalLink class="w-5 h-5 mr-2 inline" />
              Demo
            </Button>
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              <Github class="w-5 h-5 mr-2 inline" />
              View on GitHub
            </Button>
          </a>
        </div>
      </article>
    </div>
  </main>
</template>
