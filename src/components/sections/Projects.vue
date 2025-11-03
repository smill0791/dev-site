<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import { projects } from '@/data/projects'
import { ExternalLink, Github } from 'lucide-vue-next'

const selectedTech = ref<string>('All')

const allTechnologies = computed(() => {
  const techs = new Set<string>()
  projects.forEach(project => {
    project.technologies.forEach(tech => techs.add(tech))
  })
  return ['All', ...Array.from(techs).sort()]
})

const filteredProjects = computed(() => {
  if (selectedTech.value === 'All') {
    return projects
  }
  return projects.filter(project => 
    project.technologies.includes(selectedTech.value)
  )
})
</script>

<template>
  <section id="projects" class="section-padding bg-gray-50 dark:bg-slate-800">
    <div class="container-custom">
      <SectionHeader title="Projects" subtitle="A selection of my recent work" />
      
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="tech in allTechnologies"
          :key="tech"
          @click="selectedTech = tech"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            selectedTech === tech
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
          ]"
        >
          {{ tech }}
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="project in filteredProjects"
          :key="project.id"
          :hover="true"
          class="flex flex-col"
        >
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
              {{ project.description }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <Badge
                v-for="tech in project.technologies"
                :key="tech"
                variant="gray"
              >
                {{ tech }}
              </Badge>
            </div>
            
            <div class="flex gap-3 mt-auto">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink class="w-4 h-4 mr-1" />
                Live Demo
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline"
              >
                <Github class="w-4 h-4 mr-1" />
                GitHub
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
