/**
 * Available photo tags for the portfolio gallery
 * These tags should match what you use in your Supabase database
 */
export const PHOTO_TAGS = [
  'Nature',
  'Travel',
  'Pets',
  'Italy',
  'Parks',
  'Sunset'
] as const

export type PhotoTag = typeof PHOTO_TAGS[number]

/**
 * Check if a tag is valid
 */
export function isValidPhotoTag(tag: string): tag is PhotoTag {
  return PHOTO_TAGS.includes(tag as PhotoTag)
}

