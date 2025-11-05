import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Photo gallery will not work without them.')
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Type helper for photos table
export type PhotosTable = Database['public']['Tables']['photos']['Row']
export type PhotosInsert = Database['public']['Tables']['photos']['Insert']
export type PhotosUpdate = Database['public']['Tables']['photos']['Update']
