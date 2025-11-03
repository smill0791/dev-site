<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import { Mail, MapPin, Calendar } from 'lucide-vue-next'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true
  submitStatus.value = 'idle'
  
  // In a real application, this would submit to a service like Formspree
  // For now, we'll simulate a submission
  setTimeout(() => {
    isSubmitting.value = false
    submitStatus.value = 'success'
    formData.value = { name: '', email: '', message: '' }
    
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 3000)
  }, 1000)
}
</script>

<template>
  <section id="contact" class="section-padding bg-gray-50 dark:bg-slate-800">
    <div class="container-custom">
      <SectionHeader title="Get In Touch" subtitle="Let's connect and discuss opportunities" />
      
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Mail class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Email</p>
                  <a href="mailto:smill0791@gmail.com" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    smill0791@gmail.com
                  </a>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <MapPin class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Location</p>
                  <p class="text-gray-600 dark:text-gray-400">Remote / Available Worldwide</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Calendar class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Availability</p>
                  <p class="text-gray-600 dark:text-gray-400">Open to new opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Card class="p-6">
          <form @submit="handleSubmit" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button type="submit" :disabled="isSubmitting" size="lg" class="w-full">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </Button>
            <p v-if="submitStatus === 'success'" class="text-green-600 dark:text-green-400 text-sm text-center">
              Message sent successfully!
            </p>
          </form>
        </Card>
      </div>
    </div>
  </section>
</template>
