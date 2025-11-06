<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import headshotImage from '@/assets/images/headshots/headshot.jpeg'
</script>

<template>
  <section id="about" class="section-padding bg-gray-50 dark:bg-slate-800">
    <div class="container-custom">
      <SectionHeader title="About Me" subtitle="Get to know more about my background and approach" />
      
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          <!-- Headshot Image -->
          <div class="flex-shrink-0">
            <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-lg ring-4 ring-white dark:ring-slate-700">
              <img
                :src="headshotImage"
                alt="Sampson Miller - Full Stack Developer"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 space-y-6 text-gray-700 dark:text-gray-300">
            <p class="text-lg leading-relaxed">
              I'm a full stack developer with a focus on building modern, scalable software applications. My professional experience has been in the Salesforce ecosystem across a broad range of enterprise-level companies. In addition to this background, I'm creating projects with popular frameworks like React, Vue, and Tailwind. I enjoy working on projects in domains I'm passionate about and strive to create experiences that are seamless, intuitive and fun.
            </p>
            <p class="text-lg leading-relaxed">
              My approach combines technical enterprise insight with user focused design. I've had the good fortune to work with many seasoned software developers and learned from their mindset when approaching complex development. I've learned how to build iteratively, organize milestones, maintain a codebase with test cases, create well-structured architecture, and evaluate potential project technologies. With these insights, I strive to ensure that every project delivers both functional value and positive user interactions.
            </p>
            <p class="text-lg leading-relaxed">
              When I'm not coding, you can find me playing guitar, listening to music, enjoying the outdoors, binging my new favorite game, or doing something active to break a sweat.  I'm always investigating new technologies and looking to stay informed in the ever changing software landscape. I believe in continuous improvement, self education and sharing knowledge with fellow developers. We live in a unique time where an abundance of tools are emerging to help us realize our dreams. Among the excitement and overwhelm, I aim to stay focused on understanding these tools to best leverage them while knowing their limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
