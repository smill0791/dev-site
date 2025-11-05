# Developer Portfolio - Design Document

## Project Overview
A modern, responsive developer portfolio website showcasing professional experience, projects, skills, and personal interests. Built with Vue 3 to demonstrate modern frontend development capabilities.

## Tech Stack

### Core Framework
- **Vue 3.4+** (Composition API with `<script setup>`)
- **Vite 5+** - Build tool and development server
- **TypeScript** - Type safety and better developer experience
- **Vue Router 4** - Client-side routing

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### Additional Libraries
- **VueUse** - Collection of essential Vue composition utilities
- **Lucide Vue Next** - Icon library (modern, tree-shakeable)
- **@vueuse/motion** - Declarative animations (optional)
- **Axios** - HTTP client for API requests

### Backend & Database
- **Supabase** - Backend-as-a-Service (recommended)
  - PostgreSQL database
  - Storage for photo uploads
  - Built-in authentication
  - Row Level Security (RLS)
  - Auto-generated REST API
- **Alternative**: Firebase (Firestore + Storage)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

### Deployment
- **Vercel** or **Netlify** - Preferred for automatic deployments
- **GitHub Pages** - Alternative free option

## Project Structure

```
portfolio/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── main.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Navigation.vue
│   │   ├── sections/
│   │   │   ├── Hero.vue
│   │   │   ├── About.vue
│   │   │   ├── Experience.vue
│   │   │   ├── Projects.vue
│   │   │   ├── Skills.vue
│   │   │   ├── Gallery.vue
│   │   │   └── Contact.vue
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.vue
│   │   │   ├── PhotoCard.vue
│   │   │   ├── PhotoModal.vue
│   │   │   ├── PhotoUpload.vue (admin)
│   │   │   └── PhotoFilters.vue
│   │   └── ui/
│   │       ├── Button.vue
│   │       ├── Card.vue
│   │       ├── Badge.vue
│   │       ├── Modal.vue
│   │       ├── Spinner.vue
│   │       └── SectionHeader.vue
│   ├── composables/
│   │   ├── useTheme.ts
│   │   ├── useScrollSpy.ts
│   │   ├── usePhotos.ts
│   │   └── useSupabase.ts
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   └── interests.ts
│   ├── lib/
│   │   └── supabase.ts
│   ├── router/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Resume.vue
│   │   ├── ProjectDetail.vue
│   │   ├── PhotoGallery.vue
│   │   └── Admin.vue (optional)
│   ├── App.vue
│   └── main.ts
├── .env.local
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Core Features & Pages

### 1. Home Page (Single-Page Layout)
Primary landing experience with smooth scrolling sections:

**Hero Section**
- Name and professional title
- Brief tagline (1-2 sentences)
- Call-to-action buttons (View Projects, Download Resume, Contact)
- Professional photo or avatar
- Social links (GitHub, LinkedIn, etc.)

**About Section**
- Professional summary (2-3 paragraphs)
- Core competencies highlight
- Personal interests overview
- Tech philosophy or approach

**Experience Section**
- Timeline-style layout
- Job positions with dates
- Key responsibilities and achievements
- Technologies used
- Expandable details for each role

**Projects Section**
- Grid/card layout
- Project thumbnails/screenshots
- Brief descriptions
- Tech stack badges
- Links to live demos and GitHub repos
- Filter by technology (optional)

**Skills Section**
- Categorized skill groups (Frontend, Backend, Tools, etc.)
- Visual representation (badges, progress bars, or simple lists)
- Proficiency indication

**Interests Section**
- Personal hobbies and interests
- Optional: blog posts or articles
- Community involvement

**Gallery Section (NEW)**
- Masonry or grid layout displaying photos
- Photo thumbnails with lazy loading
- Click to view full-size in modal/lightbox
- Filter by category/tag
- EXIF data display (camera, settings, location - optional)
- Pagination or infinite scroll
- Search functionality (optional)

**Contact Section**
- Contact form (email integration via Formspree or similar)
- Social media links
- Location (optional)
- Availability status

### 2. Resume Page
- Downloadable PDF version
- Formatted web version matching PDF
- Print-friendly styling

### 3. Project Detail Pages (Optional)
- Deep dives into individual projects
- Larger screenshots/demos
- Technical challenges and solutions
- Embedded demos (if applicable)

### 4. Photo Gallery Page (NEW)
- Dedicated page for photography showcase
- Grid/masonry layout with responsive images
- Lightbox/modal for full-size viewing
- Photo metadata display
- Category filtering
- Load more/infinite scroll
- Smooth transitions and animations

### 5. Admin Page (Optional, Recommended)
- Simple authentication (Supabase Auth)
- Photo upload interface
- Add title, description, category, tags
- Edit existing photos
- Delete photos
- Batch operations
- Preview before publishing

## Design Guidelines

### Visual Design Principles
- **Clean and Modern**: Minimalist approach with purposeful whitespace
- **Professional**: Color palette that's sophisticated but not boring
- **Readable**: High contrast, appropriate font sizes (16px base minimum)
- **Accessible**: WCAG 2.1 AA compliance minimum

### Recommended Color Palette
```css
/* Light Mode */
--primary: #3B82F6 (blue-500)
--secondary: #8B5CF6 (violet-500)
--accent: #10B981 (emerald-500)
--background: #FFFFFF
--surface: #F9FAFB (gray-50)
--text-primary: #111827 (gray-900)
--text-secondary: #6B7280 (gray-500)

/* Dark Mode */
--primary: #60A5FA (blue-400)
--secondary: #A78BFA (violet-400)
--accent: #34D399 (emerald-400)
--background: #0F172A (slate-900)
--surface: #1E293B (slate-800)
--text-primary: #F1F5F9 (slate-100)
--text-secondary: #94A3B8 (slate-400)
```

### Typography
- **Headings**: Inter, system-ui, or similar modern sans-serif
- **Body**: Same as headings for consistency
- **Code**: JetBrains Mono, Fira Code, or monospace

### Responsive Breakpoints
```javascript
// Tailwind default breakpoints
sm: '640px'   // Mobile landscape / Small tablet
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

## Technical Implementation Guidelines

### 1. Component Architecture

**Use Composition API with `<script setup>`**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '@/types'

const props = defineProps<{
  projects: Project[]
}>()

const filteredProjects = computed(() => {
  // logic here
})
</script>
```

**Component Patterns**
- Keep components small and focused (single responsibility)
- Extract reusable logic into composables
- Use props for data down, emits for events up
- Prefer composition over deep component nesting

### 2. State Management

**No Global Store Needed Initially**
- Use component-level state with `ref` and `reactive`
- Share state via composables when needed
- Add Pinia only if complexity grows

**Example Composable Pattern**
```typescript
// composables/useTheme.ts
import { ref, watch } from 'vue'

export function useTheme() {
  const isDark = ref(false)
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    // Update DOM and localStorage
  }
  
  return { isDark, toggleTheme }
}
```

### 3. Routing Configuration

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('@/views/Resume.vue')
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue')
  }
]
```

### 4. Data Management

**Static Data Structure**
Store portfolio data in TypeScript files for easy updates:

```typescript
// types/index.ts
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

// data/projects.ts
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'Full-stack shopping experience',
    technologies: ['Vue', 'Node.js', 'MongoDB'],
    featured: true
  }
  // ... more projects
]
```

### 5. Performance Optimization

**Image Optimization**
- Use WebP format with JPEG fallbacks
- Implement lazy loading for images below fold
- Use appropriate image sizes for different breakpoints

**Code Splitting**
- Use dynamic imports for routes
- Lazy load heavy components (e.g., project galleries)

**Bundle Optimization**
- Tree-shake unused Tailwind classes (configured automatically)
- Minimize third-party dependencies
- Use production builds for deployment

### 6. Animations & Interactions

**Subtle is Better**
- Fade-in on scroll for sections
- Smooth scrolling for navigation
- Hover effects on interactive elements
- Page transitions (optional)

**Recommended Libraries**
```bash
# For scroll-triggered animations
npm install @vueuse/motion

# For intersection observer utilities
# (included in VueUse)
```

### 7. SEO & Meta Tags

**Vue Meta/Head Management**
```bash
npm install @vueuse/head
```

**Per-Page Meta Tags**
```vue
<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'John Doe - Full Stack Developer',
  meta: [
    { name: 'description', content: 'Portfolio of John Doe...' },
    { property: 'og:title', content: 'John Doe Portfolio' }
  ]
})
</script>
```

### 8. Accessibility Guidelines

- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- Include ARIA labels where needed
- Ensure keyboard navigation works throughout
- Maintain focus states for interactive elements
- Test with screen readers
- Provide skip-to-content link

### 9. Dark Mode Implementation

```typescript
// composables/useTheme.ts
import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  onMounted(() => {
    // Check system preference or localStorage
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    isDark.value = stored ? stored === 'dark' : prefersDark
    updateTheme()
  })

  const updateTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  watch(isDark, updateTheme)

  return { isDark, toggleTheme }
}
```

## Database & Photo Gallery Implementation

### Database Setup (Supabase)

**Why Supabase?**
- Free tier is generous (500MB database, 1GB file storage)
- Built-in authentication
- Auto-generated REST API
- Real-time subscriptions (optional)
- Storage with image transformations
- Row Level Security for data protection
- Easy to use TypeScript client

### 1. Supabase Project Setup

**Create Project**
1. Go to https://supabase.com
2. Create new project
3. Save your project URL and anon key
4. Wait for database to initialize (~2 minutes)

**Install Supabase Client**
```bash
npm install @supabase/supabase-js
```

**Environment Variables**
Create `.env.local`:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Database Schema

**Photos Table**
```sql
-- Create photos table
create table photos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  file_path text not null,
  thumbnail_path text,
  category text,
  tags text[],
  location text,
  camera_model text,
  focal_length text,
  aperture text,
  shutter_speed text,
  iso text,
  taken_at timestamp with time zone,
  is_featured boolean default false,
  display_order integer,
  views integer default 0
);

-- Create index for faster queries
create index photos_category_idx on photos(category);
create index photos_created_at_idx on photos(created_at desc);
create index photos_is_featured_idx on photos(is_featured);

-- Enable Row Level Security
alter table photos enable row level security;

-- Public read access (anyone can view)
create policy "Photos are viewable by everyone" 
  on photos for select 
  using (true);

-- Only authenticated users can insert (optional - for admin)
create policy "Authenticated users can insert photos" 
  on photos for insert 
  with check (auth.role() = 'authenticated');

-- Only authenticated users can update (optional - for admin)
create policy "Authenticated users can update photos" 
  on photos for update 
  using (auth.role() = 'authenticated');

-- Only authenticated users can delete (optional - for admin)
create policy "Authenticated users can delete photos" 
  on photos for delete 
  using (auth.role() = 'authenticated');
```

**Storage Bucket**
```sql
-- Create storage bucket for photos
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true);

-- Allow public read access
create policy "Public read access"
  on storage.objects for select
  using (bucket_id = 'photos');

-- Allow authenticated users to upload
create policy "Authenticated users can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'photos' 
    and auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete
create policy "Authenticated users can delete"
  on storage.objects for delete
  using (
    bucket_id = 'photos' 
    and auth.role() = 'authenticated'
  );
```

### 3. Supabase Client Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### 4. TypeScript Types

```typescript
// types/index.ts

// Add to existing types
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
```

### 5. Photo Management Composable

```typescript
// composables/usePhotos.ts
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Photo, PhotoUpload, PhotoFilters } from '@/types'

export function usePhotos() {
  const photos = ref<Photo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = 12
  const hasMore = ref(true)

  // Fetch photos with optional filters
  const fetchPhotos = async (filters?: PhotoFilters, page = 1) => {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1)

      // Apply filters
      if (filters?.category) {
        query = query.eq('category', filters.category)
      }
      
      if (filters?.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags)
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      if (page === 1) {
        photos.value = data || []
      } else {
        photos.value = [...photos.value, ...(data || [])]
      }

      hasMore.value = (data?.length || 0) === pageSize
      currentPage.value = page
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch photos'
      console.error('Error fetching photos:', e)
    } finally {
      loading.value = false
    }
  }

  // Get single photo by ID
  const getPhoto = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('photos')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Increment view count
      await supabase
        .from('photos')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id)

      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch photo'
      console.error('Error fetching photo:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  // Upload photo (admin only)
  const uploadPhoto = async (file: File, metadata: PhotoUpload) => {
    loading.value = true
    error.value = null

    try {
      // Generate unique file path
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Create thumbnail path (Supabase can generate this automatically)
      const thumbnailPath = filePath

      // Insert photo record
      const { data, error: insertError } = await supabase
        .from('photos')
        .insert({
          ...metadata,
          file_path: filePath,
          thumbnail_path: thumbnailPath
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Add to local photos array
      photos.value = [data, ...photos.value]

      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to upload photo'
      console.error('Error uploading photo:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Delete photo (admin only)
  const deletePhoto = async (id: string, filePath: string) => {
    loading.value = true
    error.value = null

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([filePath])

      if (storageError) throw storageError

      // Delete from database
      const { error: deleteError } = await supabase
        .from('photos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      // Remove from local array
      photos.value = photos.value.filter(p => p.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete photo'
      console.error('Error deleting photo:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // Get photo URL
  const getPhotoUrl = (path: string, transform?: { width?: number; height?: number; quality?: number }) => {
    if (transform) {
      return supabase.storage
        .from('photos')
        .getPublicUrl(path, {
          transform: {
            width: transform.width,
            height: transform.height,
            quality: transform.quality || 80
          }
        }).data.publicUrl
    }
    
    return supabase.storage.from('photos').getPublicUrl(path).data.publicUrl
  }

  // Load more photos (pagination)
  const loadMore = async (filters?: PhotoFilters) => {
    if (!hasMore.value || loading.value) return
    await fetchPhotos(filters, currentPage.value + 1)
  }

  // Get unique categories
  const categories = computed(() => {
    const cats = new Set<string>()
    photos.value.forEach(photo => {
      if (photo.category) cats.add(photo.category)
    })
    return Array.from(cats).sort()
  })

  // Get all unique tags
  const allTags = computed(() => {
    const tags = new Set<string>()
    photos.value.forEach(photo => {
      photo.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  })

  return {
    photos,
    loading,
    error,
    hasMore,
    currentPage,
    categories,
    allTags,
    fetchPhotos,
    getPhoto,
    uploadPhoto,
    deletePhoto,
    getPhotoUrl,
    loadMore
  }
}
```

### 6. Gallery Component Structure

**PhotoGrid.vue - Main gallery grid**
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePhotos } from '@/composables/usePhotos'
import PhotoCard from './PhotoCard.vue'
import PhotoModal from './PhotoModal.vue'
import Spinner from '@/components/ui/Spinner.vue'

const { photos, loading, hasMore, fetchPhotos, loadMore, getPhotoUrl } = usePhotos()
const selectedPhoto = ref<string | null>(null)

onMounted(() => {
  fetchPhotos()
})

const openModal = (photoId: string) => {
  selectedPhoto.value = photoId
}

const closeModal = () => {
  selectedPhoto.value = null
}
</script>

<template>
  <div class="photo-gallery">
    <!-- Loading state -->
    <div v-if="loading && photos.length === 0" class="flex justify-center py-12">
      <Spinner />
    </div>

    <!-- Grid -->
    <div 
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <PhotoCard
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @click="openModal(photo.id)"
      />
    </div>

    <!-- Load more button -->
    <div v-if="hasMore && !loading" class="text-center mt-8">
      <button
        @click="loadMore()"
        class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Load More
      </button>
    </div>

    <!-- Modal -->
    <PhotoModal
      v-if="selectedPhoto"
      :photo-id="selectedPhoto"
      @close="closeModal"
    />
  </div>
</template>
```

**PhotoCard.vue - Individual photo card**
```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { Photo } from '@/types'
import { usePhotos } from '@/composables/usePhotos'

const props = defineProps<{
  photo: Photo
}>()

const { getPhotoUrl } = usePhotos()

const thumbnailUrl = computed(() => 
  getPhotoUrl(props.photo.thumbnail_path || props.photo.file_path, {
    width: 400,
    height: 400,
    quality: 80
  })
)
</script>

<template>
  <div 
    class="photo-card group cursor-pointer overflow-hidden rounded-lg bg-surface hover:shadow-xl transition-all duration-300"
  >
    <div class="aspect-square relative overflow-hidden">
      <img
        :src="thumbnailUrl"
        :alt="photo.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
        <div class="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <h3 class="font-semibold">{{ photo.title }}</h3>
          <p v-if="photo.description" class="text-sm text-white/80 line-clamp-2">
            {{ photo.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
```

**PhotoModal.vue - Full-size photo viewer**
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { usePhotos } from '@/composables/usePhotos'

const props = defineProps<{
  photoId: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { getPhoto, getPhotoUrl } = usePhotos()
const photo = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  photo.value = await getPhoto(props.photoId)
  loading.value = false
  
  // Handle escape key
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const fullSizeUrl = computed(() => 
  photo.value ? getPhotoUrl(photo.value.file_path) : ''
)
</script>

<template>
  <div 
    class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
    @click.self="emit('close')"
  >
    <!-- Close button -->
    <button
      @click="emit('close')"
      class="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
    >
      <X :size="32" />
    </button>

    <!-- Loading -->
    <div v-if="loading" class="text-white">Loading...</div>

    <!-- Photo -->
    <div v-else-if="photo" class="max-w-7xl w-full">
      <img
        :src="fullSizeUrl"
        :alt="photo.title"
        class="w-full h-auto max-h-[85vh] object-contain"
      />
      
      <!-- Metadata -->
      <div class="mt-4 text-white">
        <h2 class="text-2xl font-bold">{{ photo.title }}</h2>
        <p v-if="photo.description" class="mt-2 text-gray-300">
          {{ photo.description }}
        </p>
        
        <!-- EXIF data -->
        <div v-if="photo.camera_model" class="mt-4 text-sm text-gray-400 space-y-1">
          <p>{{ photo.camera_model }}</p>
          <p v-if="photo.focal_length || photo.aperture || photo.shutter_speed || photo.iso">
            <span v-if="photo.focal_length">{{ photo.focal_length }}</span>
            <span v-if="photo.aperture"> • f/{{ photo.aperture }}</span>
            <span v-if="photo.shutter_speed"> • {{ photo.shutter_speed }}s</span>
            <span v-if="photo.iso"> • ISO {{ photo.iso }}</span>
          </p>
        </div>
        
        <!-- Tags -->
        <div v-if="photo.tags?.length" class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tag in photo.tags"
            :key="tag"
            class="px-2 py-1 bg-white/10 rounded text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
```

### 7. Admin Photo Upload Component

**PhotoUpload.vue - Upload interface (admin only)**
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { usePhotos } from '@/composables/usePhotos'
import type { PhotoUpload } from '@/types'

const { uploadPhoto, loading, error } = usePhotos()

const fileInput = ref<HTMLInputElement>()
const previewUrl = ref<string>()
const form = ref<PhotoUpload>({
  title: '',
  description: '',
  category: '',
  tags: [],
  location: '',
  is_featured: false
})

const selectedFile = ref<File>()

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  if (!selectedFile.value) return

  try {
    await uploadPhoto(selectedFile.value, form.value)
    
    // Reset form
    form.value = {
      title: '',
      description: '',
      category: '',
      tags: [],
      location: '',
      is_featured: false
    }
    selectedFile.value = undefined
    previewUrl.value = undefined
    if (fileInput.value) fileInput.value.value = ''
    
    alert('Photo uploaded successfully!')
  } catch (e) {
    console.error('Upload failed:', e)
  }
}

const handleTagInput = (event: Event) => {
  const input = (event.target as HTMLInputElement).value
  form.value.tags = input.split(',').map(t => t.trim()).filter(Boolean)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Upload Photo</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- File input -->
      <div>
        <label class="block text-sm font-medium mb-2">Photo</label>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          class="block w-full"
          required
        />
      </div>

      <!-- Preview -->
      <div v-if="previewUrl" class="mt-4">
        <img :src="previewUrl" alt="Preview" class="max-w-full h-64 object-contain" />
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium mb-2">Title *</label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium mb-2">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium mb-2">Category</label>
        <input
          v-model="form.category"
          type="text"
          placeholder="e.g., Landscape, Portrait, Street"
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-sm font-medium mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          @input="handleTagInput"
          placeholder="e.g., sunset, mountains, nature"
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium mb-2">Location</label>
        <input
          v-model="form.location"
          type="text"
          placeholder="e.g., Denver, Colorado"
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <!-- Featured -->
      <div class="flex items-center">
        <input
          v-model="form.is_featured"
          type="checkbox"
          id="featured"
          class="mr-2"
        />
        <label for="featured" class="text-sm font-medium">Featured Photo</label>
      </div>

      <!-- Error message -->
      <div v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="loading || !selectedFile"
        class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Uploading...' : 'Upload Photo' }}
      </button>
    </form>
  </div>
</template>
```

### 8. Authentication (Optional - For Admin)

If you want to protect the admin upload functionality:

```typescript
// composables/useAuth.ts
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const user = ref<User | null>(null)
  const loading = ref(true)

  onMounted(async () => {
    // Get current session
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user ?? null
    loading.value = false

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  })

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    user,
    loading,
    signIn,
    signOut
  }
}
```

### 9. Router Updates

```typescript
// router/index.ts
// Add to existing routes
{
  path: '/gallery',
  name: 'Gallery',
  component: () => import('@/views/PhotoGallery.vue'),
  meta: { title: 'Photo Gallery' }
},
{
  path: '/admin',
  name: 'Admin',
  component: () => import('@/views/Admin.vue'),
  meta: { requiresAuth: true }
}
```

### 10. Gallery Page Implementation Tips

**Performance Optimization:**
- Use lazy loading for images
- Implement virtual scrolling for large galleries (use `vue-virtual-scroller`)
- Generate and serve thumbnails at multiple sizes
- Use Supabase image transformations for automatic resizing
- Implement progressive image loading (blur-up technique)

**User Experience:**
- Add skeleton loaders while images load
- Implement smooth transitions between grid and modal views
- Add keyboard navigation in modal (arrow keys, escape)
- Support swipe gestures on mobile
- Add image download option
- Include share functionality

**SEO Considerations:**
- Add proper alt text for all images
- Implement structured data for images (Schema.org)
- Create an image sitemap
- Optimize image file names and paths

## Initial Build Steps

### Phase 1: Project Setup
1. Initialize Vite project: `npm create vite@latest portfolio -- --template vue-ts`
2. Install dependencies:
   ```bash
   npm install vue-router@4 @vueuse/core @vueuse/head lucide-vue-next @supabase/supabase-js axios
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. Configure Tailwind in `tailwind.config.js`
4. Set up TypeScript paths in `tsconfig.json`
5. Create project structure (folders listed above)
6. Create `.env.local` for Supabase credentials

### Phase 2: Database Setup
1. Create Supabase account and new project
2. Run SQL schema for photos table (provided in Database section)
3. Create storage bucket for photos
4. Configure Row Level Security policies
5. Test database connection with Supabase client
6. Add environment variables to `.env.local`

### Phase 3: Core Layout
1. Build `App.vue` with router-view
2. Create `Header.vue` with navigation (add Gallery link)
3. Create `Footer.vue` with social links
4. Set up routing in `router/index.ts`
5. Implement dark mode toggle in header

### Phase 4: Content Sections (Original Portfolio)
1. Create Hero section with introduction
2. Build About section with professional summary
3. Implement Experience timeline
4. Create Projects grid with filtering
5. Add Skills categorization
6. Build Contact form
7. Add Interests section

### Phase 5: Photo Gallery Implementation (NEW)
1. Create Supabase client configuration (`lib/supabase.ts`)
2. Define Photo types in `types/index.ts`
3. Build `usePhotos` composable with CRUD operations
4. Create PhotoGrid component with masonry/grid layout
5. Build PhotoCard component with hover effects
6. Implement PhotoModal for full-size viewing
7. Add PhotoFilters component (optional)
8. Create PhotoGallery view page
9. Build PhotoUpload admin component
10. Test photo upload, display, and deletion
11. Add pagination or infinite scroll
12. Optimize image loading (lazy loading, thumbnails)

### Phase 6: Authentication (Optional for Admin)
1. Set up Supabase authentication
2. Create login page/component
3. Build `useAuth` composable
4. Protect admin routes with auth guards
5. Add sign in/out functionality

### Phase 7: Polish & Details
1. Add page transitions
2. Implement scroll-triggered animations
3. Add responsive images with Supabase transformations
4. Create Resume page/PDF
5. Test accessibility (including gallery navigation)
6. Optimize performance (especially image loading)
7. Add meta tags for SEO (including gallery images)
8. Test gallery on mobile devices
9. Implement keyboard navigation for modal

### Phase 8: Deployment
1. Build for production: `npm run build`
2. Test production build locally: `npm run preview`
3. Add Supabase environment variables to hosting platform
4. Deploy to Vercel/Netlify
5. Configure custom domain (if applicable)
6. Test photo uploads in production
7. Set up analytics (optional)
8. Monitor storage usage in Supabase

## Content Guidelines

### Writing Tone
- Professional but personable
- Active voice, concise sentences
- Focus on impact and outcomes
- Quantify achievements where possible ("Improved performance by 40%")

### Project Descriptions
Each project should include:
- What problem it solves
- Your role and contributions
- Technical challenges overcome
- Technologies used
- Results or impact

### Experience Descriptions
Each role should highlight:
- Primary responsibilities
- Key achievements (3-5 bullets)
- Technologies and methodologies used
- Team size and collaboration

## Testing Checklist

- [ ] All routes navigate correctly
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Dark mode toggles properly
- [ ] Images load with lazy loading
- [ ] Forms validate and submit correctly
- [ ] External links open in new tabs
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility
- [ ] Performance score >90 on Lighthouse
- [ ] SEO meta tags are present
- [ ] 404 page exists
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] **Photo gallery loads and displays correctly**
- [ ] **Photo modal opens and closes properly**
- [ ] **Gallery filters work correctly**
- [ ] **Photo upload succeeds (admin)**
- [ ] **Photos can be deleted (admin)**
- [ ] **Image thumbnails load efficiently**
- [ ] **Pagination/infinite scroll functions properly**
- [ ] **Gallery is mobile-responsive**
- [ ] **Keyboard navigation in modal works**
- [ ] **Database connection is secure**
- [ ] **Row Level Security policies work correctly**

## Maintenance & Updates

### Regular Updates
- Add new projects as completed
- Update experience with new roles
- Refresh skills list
- Update resume PDF
- **Upload new photos to gallery**
- **Update photo metadata and categories**
- **Monitor Supabase storage usage**
- Review and update dependencies quarterly

### Content Versioning
Consider keeping content in separate JSON/TS files for easy updates without touching component code.

### Database Maintenance
- Regularly backup Supabase database
- Monitor storage usage (free tier: 1GB)
- Clean up unused photos periodically
- Optimize database queries if gallery grows large
- Review and update RLS policies as needed

## Resources for Development

### Documentation
- Vue 3: https://vuejs.org/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- VueUse: https://vueuse.org/
- Vue Router: https://router.vuejs.org/

### Design Inspiration
- Awwwards.com (developer portfolios)
- Dribbble.com (UI patterns)
- CodePen.io (interactive components)

### Tools
- Figma/Sketch for mockups (optional)
- Lighthouse for performance testing
- WebAIM for accessibility testing
- Vercel/Netlify for deployment

---

## Success Criteria

The portfolio is considered complete when:
1. All sections contain real, polished content
2. Site is fully responsive across all device sizes
3. Performance scores are >90 on Lighthouse
4. Accessibility standards are met (WCAG 2.1 AA)
5. Site is deployed and accessible via custom domain
6. All links and interactions work as expected
7. Contact form successfully delivers messages
8. Resume is downloadable and matches web version
9. **Photo gallery displays images efficiently**
10. **Photos can be uploaded via admin interface**
11. **Gallery filters and search work correctly**
12. **Database connection is secure and functional**
13. **Image loading is optimized with lazy loading**
14. **Modal navigation works with keyboard and mouse**
15. **Gallery performs well on mobile devices**

## Additional Gallery Enhancements (Optional)

### Advanced Features to Consider
- **Image Optimization**: Automatic compression and WebP conversion
- **EXIF Extraction**: Automatically extract camera settings from uploaded photos
- **Geolocation**: Display photos on a map based on location data
- **Collections/Albums**: Group photos into themed collections
- **Favorites**: Allow visitors to favorite photos (with authentication)
- **Comments**: Enable commenting on photos (requires moderation)
- **Sharing**: Social media sharing buttons for individual photos
- **Slideshows**: Automatic slideshow mode
- **Print Shop**: Integration with print-on-demand service
- **Download Options**: Allow visitors to download photos in various sizes
- **Watermarking**: Automatically add watermarks to displayed images
- **Analytics**: Track which photos are most viewed

### Image Processing Pipeline
If you want advanced image processing, consider:
- Using Cloudinary or Imgix for automatic transformations
- Implementing a serverless function for EXIF extraction
- Setting up automatic thumbnail generation
- Creating multiple size variants on upload

### Performance Considerations for Large Galleries
- Implement virtual scrolling for 100+ photos
- Use CDN for image delivery
- Consider using a dedicated image hosting service
- Implement progressive loading (LQIP - Low Quality Image Placeholder)
- Add service worker for offline caching