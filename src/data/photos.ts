import type { Photo } from '@/types'

/**
 * Dynamically import all images from a folder and create Photo objects
 * This automatically picks up any images you add to the folder without manual imports!
 */
function loadPhotosFromFolder(
  folderPath: string,
  baseTags: string[],
  photoPrefix: string
): Photo[] {
  // Use Vite's import.meta.glob to dynamically import all images
  const images = import.meta.glob<string>('@/assets/images/photos/**/*.{jpeg,jpg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url'
  })

  // Filter images that match the folder path
  const folderImages = Object.entries(images)
    .filter(([path]) => path.includes(folderPath))
    .map(([path, url]) => ({
      path,
      url: url as string,
      filename: path.split('/').pop() || ''
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename)) // Sort by filename

  // Create Photo objects with auto-generated IDs and titles
  return folderImages.map(({ url, filename }, index) => ({
    id: `${photoPrefix}-${index + 1}`,
    title: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '), // Clean filename for title
    image: url,
    tags: [...baseTags]
  }))
}

/**
 * Photo collections configuration
 * Add new folders here and they'll automatically be included!
 * Just create a folder under src/assets/images/photos/ and add an entry here.
 */
const photoCollections = [
  {
    folder: 'sunsets',
    tags: ['Sunset', 'Nature'],
    prefix: 'sunset'
  }
  // Add more collections here like:
  // {
  //   folder: 'nature',
  //   tags: ['Nature', 'Landscape'],
  //   prefix: 'nature'
  // },
  // {
  //   folder: 'travel',
  //   tags: ['Travel', 'Adventure'],
  //   prefix: 'travel'
  // }
]

// Load all photos from configured collections
export const photos: Photo[] = photoCollections.flatMap(collection =>
  loadPhotosFromFolder(collection.folder, collection.tags, collection.prefix)
)