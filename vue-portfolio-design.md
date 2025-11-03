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
│   │   │   └── Contact.vue
│   │   └── ui/
│   │       ├── Button.vue
│   │       ├── Card.vue
│   │       ├── Badge.vue
│   │       └── SectionHeader.vue
│   ├── composables/
│   │   ├── useTheme.ts
│   │   └── useScrollSpy.ts
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   └── interests.ts
│   ├── router/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Resume.vue
│   │   └── ProjectDetail.vue
│   ├── App.vue
│   └── main.ts
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

## Initial Build Steps

### Phase 1: Project Setup
1. Initialize Vite project: `npm create vite@latest portfolio -- --template vue-ts`
2. Install dependencies:
   ```bash
   npm install vue-router@4 @vueuse/core @vueuse/head lucide-vue-next
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. Configure Tailwind in `tailwind.config.js`
4. Set up TypeScript paths in `tsconfig.json`
5. Create project structure (folders listed above)

### Phase 2: Core Layout
1. Build `App.vue` with router-view
2. Create `Header.vue` with navigation
3. Create `Footer.vue` with social links
4. Set up routing in `router/index.ts`
5. Implement dark mode toggle in header

### Phase 3: Content Sections
1. Create Hero section with introduction
2. Build About section with professional summary
3. Implement Experience timeline
4. Create Projects grid with filtering
5. Add Skills categorization
6. Build Contact form
7. Add Interests section

### Phase 4: Polish & Details
1. Add page transitions
2. Implement scroll-triggered animations
3. Add responsive images
4. Create Resume page/PDF
5. Test accessibility
6. Optimize performance
7. Add meta tags for SEO

### Phase 5: Deployment
1. Build for production: `npm run build`
2. Test production build locally: `npm run preview`
3. Deploy to Vercel/Netlify
4. Configure custom domain (if applicable)
5. Set up analytics (optional)

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

## Maintenance & Updates

### Regular Updates
- Add new projects as completed
- Update experience with new roles
- Refresh skills list
- Update resume PDF
- Review and update dependencies quarterly

### Content Versioning
Consider keeping content in separate JSON/TS files for easy updates without touching component code.

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
8. Resume is downloadable and matches 