# Supabase Setup Guide

This guide will help you set up Supabase for the photo gallery feature.

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: Your project name
   - Database Password: Create a strong password (save this!)
   - Region: Choose closest to you
5. Wait for project to initialize (~2 minutes)

## 2. Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Run the following SQL to create the photos table:

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

-- Create indexes for faster queries
create index photos_category_idx on photos(category);
create index photos_created_at_idx on photos(created_at desc);
create index photos_is_featured_idx on photos(is_featured);

-- Enable Row Level Security
alter table photos enable row level security;

-- Public read access (anyone can view)
create policy "Photos are viewable by everyone" 
  on photos for select 
  using (true);
```

## 5. Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click "New bucket"
3. Create a bucket named `photos`:
   - Name: `photos`
   - Public bucket: **Yes** (checked)
   - File size limit: 50MB (or your preference)
   - Allowed MIME types: `image/*`

4. Go to **Storage** → **Policies**
5. Click "New Policy" for the `photos` bucket
6. Create a policy for public read access:

```sql
-- Allow public read access
create policy "Public read access"
  on storage.objects for select
  using (bucket_id = 'photos');
```

## 6. Upload Photos (Optional - Admin Interface)

For now, you can upload photos directly through the Supabase dashboard:

1. Go to **Storage** → **photos** bucket
2. Click "Upload file"
3. Upload your photos
4. Copy the file path (you'll need this for the database)

5. Go to **Table Editor** → **photos**
6. Click "Insert row"
7. Fill in the photo details:
   - `title`: Photo title
   - `file_path`: Path from storage (e.g., `uploads/photo.jpg`)
   - `tags`: Array of tags - use these predefined tags:
     - `Nature`
     - `Travel`
     - `Pets`
     - `Italy`
     - `Parks`
     - `Sunset`
     - Example: `["Sunset", "Nature"]` or `["Travel", "Italy"]`
   - `category`: Optional category
   - `is_featured`: true/false
   - Other fields as needed

## 7. Test the Gallery

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/photography` page
3. Your photos should now load from Supabase!

## Troubleshooting

### Photos not loading?
- Check that `.env.local` exists and has correct values
- Verify Supabase project is active
- Check browser console for errors
- Ensure RLS policies are set correctly

### Storage access issues?
- Verify bucket is marked as "Public"
- Check storage policies allow public read access
- Ensure file paths in database match storage paths

### Database connection errors?
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check that the `photos` table exists
- Ensure RLS policies allow SELECT operations

## Next Steps

For a full admin interface to upload photos, you can:
- Implement authentication (see design document)
- Create an admin upload component
- Add photo management features

For now, you can upload photos through the Supabase dashboard or use the Supabase API directly.

