# Developer Portfolio

A modern, responsive developer portfolio website built with Vue 3, TypeScript, and Tailwind CSS. Features a photo gallery powered by Supabase.

## Tech Stack

- **Vue 3.4+** with Composition API
- **TypeScript** for type safety
- **Vite 5+** for build tooling
- **Tailwind CSS 3** for styling
- **Vue Router 4** for routing
- **VueUse** for composition utilities
- **Lucide Vue** for icons
- **Supabase** for photo gallery backend

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Vue components
│   ├── layout/    # Layout components
│   ├── sections/  # Page sections
│   └── ui/        # Reusable UI components
├── composables/   # Vue composables
├── data/          # Static data files
├── lib/           # External library configs (Supabase)
├── router/        # Vue Router configuration
├── types/         # TypeScript types
└── views/         # Page views
```

## Features

- Responsive design
- Dark mode support
- Smooth scrolling navigation
- Project filtering
- Photo gallery with Supabase integration
- Tag-based photo filtering
- Contact form
- SEO optimized
- Accessible components

## Customization

Update the content in `src/data/` files:
- `projects.ts` - Your projects
- `experience.ts` - Your work experience
- `skills.ts` - Your skills
- `interests.ts` - Your interests
- `tags.ts` - Photo tags (Nature, Travel, Pets, Italy, Parks, Sunset)

## Documentation

- `PROJECT_SUMMARY.md` - Complete project summary and architecture
- `PROJECT_RULES.md` - Quick reference guide and coding standards
- `SUPABASE_SETUP.md` - Detailed Supabase setup instructions
- `vue-portfolio-design.md` - Original design document

## License

MIT

