# Developer Portfolio - Quick Reference Guide

## Project Rules Summary

### ✅ DO
- Use `<script setup>` with TypeScript for all components
- Extract reusable logic into composables
- Use predefined tags from `src/data/tags.ts` for photos
- Store photos in Supabase Storage, not local assets
- Use Tailwind utility classes for styling
- Include proper TypeScript types for all functions/components
- Handle loading and error states in async operations
- Use `getPhotoUrl()` from `usePhotos()` composable for image URLs
- Keep components small and focused
- Use semantic HTML elements

### ❌ DON'T
- Don't import photos from local assets (use Supabase)
- Don't use custom tags that aren't in `src/data/tags.ts`
- Don't skip error handling in async operations
- Don't use inline styles when Tailwind can handle it
- Don't mutate props directly
- Don't forget to handle loading states
- Don't skip TypeScript types
- Don't commit `.env.local` file (it's gitignored)

## File Locations Quick Reference

| What | Where |
|------|-------|
| Supabase client | `src/lib/supabase.ts` |
| Photo operations | `src/composables/usePhotos.ts` |
| Predefined tags | `src/data/tags.ts` |
| Photo types | `src/types/index.ts` |
| Database types | `src/types/database.ts` |
| Gallery page | `src/views/Photography.vue` |
| Environment vars | `.env.local` (create from `.env.local.example`) |

## Tag List
- Nature
- Travel
- Pets
- Italy
- Parks
- Sunset

## Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Environment Variables Required
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

