import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Fitness Timer',
    description: 'Streamlined interval training with customizable circuits.',
    longDescription: 'A circuit timer application to create customized interval timers. Built with React, TypeScript and Tailwind CSS with Supabase for authentication and database features.',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase'],
    featured: true,
    liveUrl: 'https://fitness-timer-app.vercel.app/'
  },
  {
    id: 'project-2',
    title: 'Salesforce Resume Dev Site',
    description: 'Resume built with Salesforce coding stack.',
    longDescription: 'Developer Resume built on Salesforce platform with Lightning Web Components and Apex.',
    technologies: ['Apex', 'LWC'],
    featured: true,
    liveUrl: 'https://sampson2-dev-ed.develop.my.site.com/resume/',
    githubUrl: 'https://github.com/smill0791/sf-dev-site'
  },
  {
    id: 'project-3',
    title: 'Dev Site',
    description: 'What you\'re on now! A modern, responsive developer portfolio website.',
    longDescription: 'A modern, responsive developer portfolio website built with Vue 3, TypeScript and Tailwind CSS.',
    technologies: ['Vue', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    liveUrl: 'https://sampson-dev.vercel.app/',
    githubUrl: 'https://github.com/smill0791/dev-site'
  }
]
