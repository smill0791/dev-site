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
  link?: string
}

export interface Photo {
  id: string
  created_at: string
  title: string
  description?: string
  file_path: string
  thumbnail_path?: string
  category?: string
  tags?: string[]
  location?: string
  camera_model?: string
  focal_length?: string
  aperture?: string
  shutter_speed?: string
  iso?: string
  taken_at?: string
  is_featured: boolean
  display_order?: number
  views: number
}

export interface PhotoUpload {
  title: string
  description?: string
  category?: string
  tags?: string[]
  location?: string
  camera_model?: string
  focal_length?: string
  aperture?: string
  shutter_speed?: string
  iso?: string
  taken_at?: string
  is_featured?: boolean
}

export interface PhotoFilters {
  category?: string
  tags?: string[]
  search?: string
}

