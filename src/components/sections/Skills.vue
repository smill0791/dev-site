<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import Badge from '@/components/ui/Badge.vue'
import { skills } from '@/data/skills'
import { computed } from 'vue'

const skillCategories = computed(() => {
  const categories: Record<string, typeof skills> = {}
  skills.forEach(skill => {
    if (!categories[skill.category]) {
      categories[skill.category] = []
    }
    categories[skill.category].push(skill)
  })
  return categories
})

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case 'Expert':
      return 'primary'
    case 'Advanced':
      return 'secondary'
    case 'Intermediate':
      return 'accent'
    default:
      return 'gray'
  }
}
</script>

<template>
  <section id="skills" class="section-padding">
    <div class="container-custom">
      <SectionHeader title="Skills" subtitle="Technologies and tools I work with" />
      
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(categorySkills, category) in skillCategories"
          :key="category"
          class="space-y-4"
        >
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {{ category }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="skill in categorySkills"
              :key="skill.name"
              class="flex items-center gap-2"
            >
              <Badge :variant="getProficiencyColor(skill.proficiency) as any">
                {{ skill.name }}
              </Badge>
              <span class="text-xs text-gray-600 dark:text-gray-400">
                {{ skill.proficiency }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
