# CLAUDE.md — Developer Portfolio

## Project Overview

Vue 3 + TypeScript + Tailwind CSS developer portfolio. Single-page application with a photography gallery, resume page, and project showcases. Deployed to Vercel.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run build:check  # Type check + build (use before deploying)
npm run preview      # Preview production build locally
```

## Tech Stack

- **Vue 3** — Composition API with `<script setup>` exclusively
- **TypeScript 5.3** — Strict mode enabled
- **Vite 5** — Build tool, path alias `@/` → `src/`
- **Tailwind CSS 3.4** — Utility-first styling, dark mode via `.dark` class
- **Vue Router 4** — All routes lazy-loaded for code splitting
- **VueUse** — `@vueuse/core` (scroll spy, intersection observer), `@vueuse/head` (meta tags)
- **Lucide Vue Next** — Icon library
- **Supabase** — Currently used for photo storage/metadata (**planned for removal**, see below)

## Project Structure

```
src/
├── assets/styles/main.css        # Tailwind imports, CSS variables, .container-custom, .section-padding
├── components/
│   ├── layout/                   # Header.vue, Footer.vue, Navigation.vue
│   ├── sections/                 # Hero, About, Experience, Projects, Skills, Interests, Contact
│   └── ui/                       # Card, Badge, Button, SectionHeader (reusable primitives)
├── composables/
│   ├── useTheme.ts               # Dark mode toggle + localStorage persistence
│   ├── useScrollSpy.ts           # Active section tracking for nav highlighting
│   └── usePhotos.ts              # Photo gallery state + Supabase operations (to be replaced)
├── data/                         # Static TypeScript arrays: projects, experience, skills, interests, tags
├── lib/supabase.ts               # Supabase client (to be replaced)
├── router/index.ts               # Route definitions
├── types/
│   ├── index.ts                  # All app interfaces (Project, Experience, Skill, Photo, etc.)
│   └── database.ts               # Supabase DB types (to be replaced with new solution's types)
└── views/                        # Home, Resume, Photography, ProjectDetail
```

## Key Patterns & Conventions

### Component Style
- Always use `<script setup lang="ts">` — never Options API
- Props via `defineProps<Props>()` with a TypeScript interface
- Emits via `defineEmits<{ ... }>()`
- Use `ref()` for primitives, `reactive()` for objects, `computed()` for derived state

### Imports
- Always use `@/` alias (e.g., `import type { Project } from '@/types'`)
- Import icons as named components from `lucide-vue-next`

### Styling
- Tailwind utility classes first; avoid custom CSS unless necessary
- Always include `dark:` variants alongside light mode classes
- Use `dark:` on the same element as the light class, don't add separate selectors
- Use `.container-custom` and `.section-padding` for section layout consistency
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Custom color tokens: `primary` (blue), `secondary` (violet), `accent` (emerald)

### UI Components
- **Card.vue** — Use for content blocks; pass `hover` prop for interactive cards
- **Badge.vue** — Variants: `primary`, `secondary`, `accent`, `gray`
- **Button.vue** — Variants: `primary`, `secondary`, `outline`; Sizes: `sm`, `md`, `lg`
- **SectionHeader.vue** — Use for all section titles; accepts `title` and optional `subtitle`

### Data Layer
- All static content (projects, experience, skills, interests) lives in `src/data/` as typed TS files
- Photo tags are predefined in `src/data/tags.ts` — don't add tags elsewhere
- Types for all data structures are defined in `src/types/index.ts`

### Adding a New Section
1. Create component in `src/components/sections/`
2. Import and add to `src/views/Home.vue`
3. Add nav link in `src/components/layout/Navigation.vue`
4. Give the section a unique `id` attribute for scroll navigation

### Adding a New Route
1. Add route to `src/router/index.ts` using a dynamic import
2. Create the view in `src/views/`

### Meta Tags
- Use `useHead()` from `@vueuse/head` in views to set page title/description

## Supabase — Planned Removal

**Supabase is used only for the photo gallery** (storage + metadata DB). It is planned for removal and replacement with a different solution. Until a replacement is chosen:

- **Do not expand** Supabase usage to new features
- **Do not add** new Supabase tables or storage buckets
- Keep Supabase logic isolated in `src/lib/supabase.ts`, `src/composables/usePhotos.ts`, and `src/types/database.ts`

When migrating, these are the only files that need to change:
1. `src/lib/supabase.ts` — Replace client with new provider's client
2. `src/composables/usePhotos.ts` — Replace fetch logic and `getPhotoUrl()`
3. `src/types/database.ts` — Replace with new provider's type schema
4. Remove `@supabase/supabase-js` from `package.json`
5. Remove `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from env

The `Photo` interface in `src/types/index.ts` should remain stable — it's used throughout the gallery and is decoupled from the storage provider.

## Contact Form

The contact form in `Contact.vue` currently simulates submission (no backend). It needs a real email service. Options: Formspree, EmailJS, or a serverless function.

## Environment Variables

```
VITE_SUPABASE_URL=        # Supabase project URL (temporary)
VITE_SUPABASE_ANON_KEY=   # Supabase anon key (temporary)
```

Set in `.env.local` for development, Vercel dashboard for production.

## Dark Mode

- Managed by `useTheme()` composable
- Reads system preference on first load, then uses localStorage value
- Toggled by the button in `Navigation.vue`
- Applied via `.dark` class on the `<html>` element

## Photo Gallery Architecture

- `usePhotos()` composable uses a **singleton pattern** (state lives outside the function) so photos preloaded in `Home.vue` are immediately available in `Photography.vue`
- `Home.vue` calls `preloadPhotos()` via `requestIdleCallback` on mount
- Tag filtering is applied in `Photography.vue` using computed properties
- Pagination: 12 photos per page, "Load More" button for subsequent pages
- Lightbox supports keyboard navigation and mobile swipe gestures
