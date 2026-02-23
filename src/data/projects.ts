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
    id: 'project-4',
    title: 'Data Integration Platform',
    description: 'Enterprise ETL pipeline integrating CRM, ERP, and Accounting APIs with real-time monitoring.',
    longDescription: 'An enterprise-grade multi-source data integration platform built with Spring Boot, SQL Server, React, and AWS. Ingests data from CRM, ERP, and Accounting APIs through a validated ETL pipeline with a four-schema database architecture (staging → validated → final → audit). Features async processing via AWS SQS, real-time sync monitoring through a React/Next.js dashboard backed by REST and GraphQL APIs with WebSocket subscriptions. Includes 147 tests (127 unit + 20 integration using Testcontainers against a real SQL Server instance) and a full CI/CD pipeline via GitHub Actions. Built with Claude as an AI development partner.',
    technologies: ['Java', 'Spring Boot', 'React', 'Next.js', 'TypeScript', 'SQL Server', 'GraphQL', 'AWS SQS', 'Docker', 'GitHub Actions'],
    featured: true,
    githubUrl: 'https://github.com/smill0791/data-integration-platform'
  },
  {
    id: 'project-3',
    title: 'Dev Site',
    description: 'What you\'re on now! A modern, responsive developer portfolio website.',
    longDescription: 'A modern, responsive developer portfolio website built with Vue 3, TypeScript and Tailwind CSS. Added photo gallery powered by Supabase for backend storage.',
    technologies: ['Vue', 'TypeScript', 'Tailwind CSS','PostgreSQL', 'Supabase'],
    featured: true,
    liveUrl: 'https://sampson-dev.vercel.app/',
    githubUrl: 'https://github.com/smill0791/dev-site'
  }
]
