// Database types for Supabase
// This file can be auto-generated from Supabase CLI: supabase gen types typescript --project-id YOUR_PROJECT_ID
// For now, we'll define a basic structure

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          file_path: string
          thumbnail_path: string | null
          category: string | null
          tags: string[] | null
          location: string | null
          camera_model: string | null
          focal_length: string | null
          aperture: string | null
          shutter_speed: string | null
          iso: string | null
          taken_at: string | null
          is_featured: boolean
          display_order: number | null
          views: number
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          file_path: string
          thumbnail_path?: string | null
          category?: string | null
          tags?: string[] | null
          location?: string | null
          camera_model?: string | null
          focal_length?: string | null
          aperture?: string | null
          shutter_speed?: string | null
          iso?: string | null
          taken_at?: string | null
          is_featured?: boolean
          display_order?: number | null
          views?: number
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          file_path?: string
          thumbnail_path?: string | null
          category?: string | null
          tags?: string[] | null
          location?: string | null
          camera_model?: string | null
          focal_length?: string | null
          aperture?: string | null
          shutter_speed?: string | null
          iso?: string | null
          taken_at?: string | null
          is_featured?: boolean
          display_order?: number | null
          views?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
