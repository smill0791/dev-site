import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Better error handling for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('   VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.error('   VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
  console.error('   Photo gallery will not work without these variables.')
  console.error('   For local development, add them to .env.local')
  console.error('   For Vercel deployment, add them in Vercel dashboard → Settings → Environment Variables')
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Type helper for photos table
export type PhotosTable = Database['public']['Tables']['photos']['Row']
export type PhotosInsert = Database['public']['Tables']['photos']['Insert']
export type PhotosUpdate = Database['public']['Tables']['photos']['Update']
