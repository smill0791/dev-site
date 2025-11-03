<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import { experiences } from '@/data/experience'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

const expandedItems = ref<Set<string>>(new Set())

const toggleExpand = (id: string) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  } else {
    expandedItems.value.add(id)
  }
}
</script>

<template>
  <section id="experience" class="section-padding">
    <div class="container-custom">
      <SectionHeader title="Experience" subtitle="My professional journey and achievements" />
      
      <div class="max-w-4xl mx-auto space-y-6">
        <Card
          v-for="exp in experiences"
          :key="exp.id"
          :hover="true"
          class="p-6"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {{ exp.company }}
              </h3>
              <p class="text-lg text-blue-600 dark:text-blue-400 mb-2">
                {{ exp.position }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ exp.startDate }} - {{ exp.endDate }}
              </p>
            </div>
            <button
              @click="toggleExpand(exp.id)"
              class="mt-4 md:mt-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              :aria-expanded="expandedItems.has(exp.id)"
            >
              <ChevronDown
                v-if="!expandedItems.has(exp.id)"
                class="w-5 h-5 text-gray-600 dark:text-gray-400"
              />
              <ChevronUp
                v-else
                class="w-5 h-5 text-gray-600 dark:text-gray-400"
              />
            </button>
          </div>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ exp.description }}
          </p>
          
          <div v-if="expandedItems.has(exp.id)" class="mt-4 space-y-4">
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li v-for="achievement in exp.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Technologies:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge v-for="tech in exp.technologies" :key="tech">
                  {{ tech }}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
