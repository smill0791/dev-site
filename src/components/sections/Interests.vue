<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import Card from '@/components/ui/Card.vue'
import { interests } from '@/data/interests'
</script>

<template>
  <section id="interests" class="section-padding">
    <div class="container-custom">
      <SectionHeader title="Interests" subtitle="What I do when I'm not coding" />
      
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="interest in interests"
          :key="interest.title"
          :hover="true"
          class="p-6"
        >
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ interest.title }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300" v-html="interest.description"></p>
        </Card>
      </div>
    </div>
  </section>
</template>
