export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | 'Present'
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design' | 'Salesforce' | 'Other'
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface Interest {
  title: string
  description: string
  icon?: string
}

