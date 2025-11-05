# Developer Portfolio - Project Summary & Rules

## Project Overview

A modern, responsive developer portfolio website built with Vue 3, TypeScript, and Tailwind CSS. Features a photo gallery powered by Supabase for hosting and managing photography content.

## Tech Stack

### Core Framework
- **Vue 3.4+** (Composition API with `<script setup>`)
- **TypeScript** for type safety
- **Vite 5+** for build tooling
- **Vue Router 4** for client-side routing

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** and **Autoprefixer** for CSS processing

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database for photo metadata
  - Storage bucket for photo files
  - Row Level Security (RLS) enabled

### Additional Libraries
- **VueUse** - Vue composition utilities (@vueuse/core, @vueuse/head)
- **Lucide Vue Next** - Icon library
- **@supabase/supabase-js** - Supabase client library

## Project Structure

```
src/
├── assets/
│   ├── images/
│   │   ├── headshots/          # Profile photos
│   │   └── photos/             # (Deprecated - now using Supabase)
│   └── styles/
│       └── main.css            # Tailwind imports and custom styles
├── components/
│   ├── layout/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Navigation.vue      # Responsive nav with dark mode
│   ├── sections/
│   │   ├── Hero.vue
│   │   ├── About.vue           # With headshot image
│   │   ├── Experience.vue
│   │   ├── Projects.vue
│   │   ├── Skills.vue
│   │   ├── Interests.vue      # Links to photography gallery
│   │   └── Contact.vue
│   └── ui/
│       ├── Button.vue
│       ├── Card.vue
│       ├── Badge.vue
│       └── SectionHeader.vue
├── composables/
│   ├── useTheme.ts            # Dark mode management
│   ├── useScrollSpy.ts        # Scroll-based navigation
│   └── usePhotos.ts           # Supabase photo operations
├── data/
│   ├── projects.ts            # Static project data
│   ├── experience.ts          # Work experience data
│   ├── skills.ts              # Skills with categories
│   ├── interests.ts            # Interests with links
│   ├── photos.ts              # (Deprecated - Supabase now)
│   └── tags.ts                # Predefined photo tags
├── lib/
│   └── supabase.ts            # Supabase client configuration
├── router/
│   └── index.ts               # Route definitions
├── types/
│   ├── index.ts               # Application types
│   └── database.ts            # Supabase database types
└── views/
    ├── Home.vue               # Main portfolio page
    ├── Resume.vue             # Resume/web version
    ├── Photography.vue        # Photo gallery with filtering
    └── ProjectDetail.vue      # Individual project pages
```

## Key Features Implemented

### 1. Portfolio Sections
- **Hero Section**: Introduction with CTA buttons and social links
- **About Section**: Professional summary with headshot image
- **Experience Section**: Timeline-style work history with expandable details
- **Projects Section**: Grid layout with technology filtering
- **Skills Section**: Categorized skills with proficiency levels
- **Interests Section**: Personal interests with links (Photography links to gallery)
- **Contact Section**: Contact form and information

### 2. Photo Gallery (Supabase-Powered)
- **Dynamic Photo Loading**: Photos fetched from Supabase database
- **Tag Filtering**: Filter by predefined tags (Nature, Travel, Pets, Italy, Parks, Sunset)
- **Lightbox Modal**: Full-size photo viewing with navigation
- **Pagination**: Load more functionality for large galleries
- **Responsive Grid**: Adapts to screen size (1-4 columns)
- **Image Optimization**: Uses Supabase Storage public URLs

### 3. Technical Features
- **Dark Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Smooth Scrolling**: Section-based navigation
- **Type Safety**: Full TypeScript coverage
- **SEO**: Meta tags managed via @vueuse/head

## Configuration Requirements

### Environment Variables (`.env.local`)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup
1. **Database Table**: `photos` table with schema (see SUPABASE_SETUP.md)
2. **Storage Bucket**: `photos` bucket configured as public
3. **Row Level Security**: Public read access enabled

## Project Rules & Standards

### 1. Code Style
- **Use Composition API with `<script setup>`** for all components
- **TypeScript First**: All files should use TypeScript with proper types
- **Component Structure**: Keep components small and focused (single responsibility)
- **Composables**: Extract reusable logic into composables

### 2. File Organization
- **Static Data**: Store in `src/data/` as TypeScript files
- **Types**: Define in `src/types/` with descriptive interfaces
- **Composables**: Place in `src/composables/` with descriptive names
- **Components**: Organize by feature/layout in `src/components/`

### 3. Image Handling
- **Profile Photos**: Store in `src/assets/images/headshots/`
- **Gallery Photos**: Store in Supabase Storage, metadata in database
- **Image Imports**: Use `?url` suffix for Vite image imports
- **Alt Text**: Always include descriptive alt text for accessibility

### 4. Photo Tags
- **Predefined Tags Only**: Use tags from `src/data/tags.ts`
  - `Nature`
  - `Travel`
  - `Pets`
  - `Italy`
  - `Parks`
  - `Sunset`
- **Multiple Tags**: Photos can have multiple tags (array format)
- **Tag Filtering**: Tags appear in predefined order, then any additional tags

### 5. Supabase Integration
- **Client Configuration**: Use `src/lib/supabase.ts` for all Supabase operations
- **Photo Operations**: Use `usePhotos()` composable for gallery functionality
- **URL Generation**: Use `getPhotoUrl()` function from composable
- **Error Handling**: Always handle errors and show user-friendly messages

### 6. Styling Guidelines
- **Tailwind CSS**: Use utility classes, avoid custom CSS when possible
- **Dark Mode**: Use `dark:` prefix for dark mode styles
- **Responsive**: Use Tailwind breakpoints (sm, md, lg, xl, 2xl)
- **Custom Styles**: Add to `src/assets/styles/main.css` if needed

### 7. Type Safety
- **Database Types**: Keep `src/types/database.ts` in sync with Supabase schema
- **Type Imports**: Import types from `@/types` for consistency
- **Type Guards**: Use type guards for runtime type checking when needed

### 8. Component Patterns
- **Props**: Use TypeScript interfaces for props
- **Emits**: Define emit types explicitly
- **Reactive State**: Use `ref()` for primitives, `reactive()` for objects
- **Computed**: Use `computed()` for derived state

### 9. Error Handling
- **Loading States**: Always show loading indicators during async operations
- **Error Messages**: Display user-friendly error messages
- **Graceful Degradation**: Handle missing data gracefully (empty states)

### 10. Performance
- **Lazy Loading**: Use `loading="lazy"` for images below fold
- **Code Splitting**: Use dynamic imports for routes
- **Image Optimization**: Consider generating thumbnails on upload

## Important Notes

### Deprecated Files
- `src/data/photos.ts` - No longer used (Supabase handles photos)
- `src/assets/images/photos/` - Photos moved to Supabase Storage

### Photo Database Schema
Photos stored in Supabase must include:
- `title` (required)
- `file_path` (required) - Path in Supabase Storage
- `tags` (array) - Use predefined tags from `src/data/tags.ts`
- `thumbnail_path` (optional) - For optimized thumbnails
- Other metadata fields as needed

### Environment Setup
1. Copy `.env.local.example` to `.env.local`
2. Add Supabase credentials
3. Run `npm install` to install dependencies
4. Run `npm run dev` for development

### Build & Deploy
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Deploy**: Build output in `dist/` folder

## Common Tasks

### Adding a New Photo
1. Upload photo to Supabase Storage (`photos` bucket)
2. Copy the file path
3. Add row to `photos` table with:
   - Title
   - File path
   - Tags (from predefined list)
   - Other metadata

### Updating Tags
- Edit `src/data/tags.ts` to modify predefined tags
- Tags will automatically appear in filter buttons
- Update photos in database to use new tags

### Adding a New Section
1. Create component in `src/components/sections/`
2. Import and add to `src/views/Home.vue`
3. Add navigation link in `src/components/layout/Navigation.vue`
4. Add section ID for scroll navigation

## Development Workflow

1. **Make Changes**: Edit files in `src/`
2. **Test Locally**: Run `npm run dev` and check browser
3. **Check Types**: TypeScript will show errors in IDE
4. **Build**: Run `npm run build` to verify production build
5. **Deploy**: Push to repository (Vercel/Netlify auto-deploys)

## Documentation Files

- `README.md` - Project overview and quick start
- `SUPABASE_SETUP.md` - Detailed Supabase setup instructions
- `vue-portfolio-design.md` - Original design document

## Notes for Future Development

- Consider adding admin interface for photo uploads
- Implement authentication for admin features
- Add image optimization/transformation service
- Consider adding photo categories in addition to tags
- Add search functionality for photos
- Implement photo collections/albums feature

