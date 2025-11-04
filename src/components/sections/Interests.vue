<script setup lang="ts">
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import Card from '@/components/ui/Card.vue'
import { interests } from '@/data/interests'

const router = useRouter()
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
          :class="['p-6', interest.link && 'cursor-pointer']"
          @click="interest.link && router.push(interest.link)"
        >
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ interest.title }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300" v-html="interest.description"></p>
          <a
            v-if="interest.link"
            :href="interest.link"
            @click.prevent
            class="mt-3 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View Gallery →
          </a>
        </Card>
      </div>
    </div>
  </section>
</template>
