import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'Full-stack shopping experience with modern UI',
    longDescription: 'A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['Vue', 'Node.js', 'MongoDB', 'Express'],
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    longDescription: 'A Kanban-style task management application with team collaboration features and real-time synchronization.',
    technologies: ['Vue', 'TypeScript', 'Firebase'],
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'Real-time weather information with beautiful visualizations',
    longDescription: 'A responsive weather dashboard displaying current conditions and forecasts with interactive charts.',
    technologies: ['Vue', 'Chart.js', 'OpenWeather API'],
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  }
]
