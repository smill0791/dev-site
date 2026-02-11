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
              I'm a full stack developer with a focus on building modern, scalable software applications. My professional background spans cloud based SaaS products such as Salesforce, AWS, GCP, CI/CD optimization and microservice architecture. I've worked at enterprise companies working in industries including healthcare, education, fiber and tech consulting. In addition to this background, I enjoy personal projects with modern tools and frameworks like React, Tailwind Next.js, Tailwind and Agentic AI tools like Cursor and Claude Code.
            </p>
            <p class="text-lg leading-relaxed">
              My approach combines technical enterprise insight with a focus on excellent user experience. I've had the opportunity to work with many seasoned developers and learned from their mindset while developing complex projects. I've learned how to organize milestones, iterate quickly, maintain a test framework, create logical architecture, and evaluate potential technologies. With my experience, I strive to ensure that every project delivers functional value and positive user experience.
            </p>
            <p class="text-lg leading-relaxed">
              Aside from coding my hobbies include playing guitar, listening to music, spending time outdoors, binging my new favorite game, or doing something active to break a sweat. I always keep an eye on new technologies and changes in the software landscape. I believe in continuous improvement, self education and sharing knowledge. The best part of development today is we're more enabled than ever to pursue creating in areas we're passionate about. I'm focused on constructing thoughtful software alongside collaborative teams and building experiences that are seamless, intuitive, and fun to use.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
