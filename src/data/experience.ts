import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Guild',
    position: 'Salesforce Developer (Remote) ',
    startDate: '09/2022',
    endDate: '05/2024',
    description: 'Strengthened skills in CI/CD automation, managed package customization, and scalable Salesforce configuration with remote teams.',
    achievements: [
      'Updated CI/CD packaging model through github for daily deployments',
      'Collaborated with business staff to define project requirements',
      'Modified ETL model between AWS and Salesforce',
      'Created omni channel configurations to route work across coaching team',
      'Wrote jest tests for frontend LWC testing'
    ],
    technologies: ['LWC', 'AWS (Lambda)', 'Omnichannel', 'GitHub Actions']
  },
  {
    id: 'exp-2',
    company: 'Virta Health',
    position: 'Salesforce Developer',
    startDate: '03/2021',
    endDate: '04/2022',
    description: 'Gained expertise in cross platform integrations, performance optimization, and modern frontend architecture in a healthcare technology environment.',
    achievements: [
      'Updated Google Cloud Pubsub Salesforce subscription model for data efficiency',
      'Optimized lightning components in Salesforce for our patient admin team',
      'Wrote frontend code in our internal patient app built on React and TypeScript',
      'Used modern development stack including Docker, Kubernetes, Tilt and Storybook'
    ],
    technologies: ['Google Cloud Pub/Sub', 'React', 'Docker', 'Kubernetes']
  },
  {
    id: 'exp-3',
    company: 'Slalom Consulting',
    position: 'Salesforce Consultant',
    startDate: '09/2020',
    endDate: '06/2019',
    description: 'Built consulting expertise and technical versatility in multi-org environments, gaining exposure to different enterprise code base practices and secure deployment processes.',
    achievements: [
      'Directed Salesforce projects though execution of consulting approach and onsite visits',
      'Used different client DevOps pipelines and various CI/CD solutions',
      'Developed POC work during project discovery phases to support client buy in'
    ],
    technologies: ['Salesforce', 'LWC', 'Aura', 'Jenkins']
  },
  {
    id: 'exp-4',
    company: 'Zayo Group',
    position: 'Salesforce Application Developer',
    startDate: '01/2015',
    endDate: '09/2018',
    description: 'Built consulting expertise and technical versatility in multi-org environments, gaining exposure to different enterprise code base practices and secure deployment processes.',
    achievements: [
      'Directed Salesforce projects though execution of consulting approach and onsite visits',
      'Used different client DevOps pipelines and various CI/CD solutions',
      'Developed POC work during project discovery phases to support client buy in'
    ],
    technologies: ['Salesfoce', 'Apex', 'SOQL', 'Angular.js']
  }
]
