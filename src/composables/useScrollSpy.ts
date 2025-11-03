import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref<string>('')

  onMounted(() => {
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        useIntersectionObserver(
          element,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              activeSection.value = id
            }
          },
          {
            rootMargin: '-20% 0px -70% 0px'
          }
        )
      }
    })
  })

  return { activeSection }
}
