<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'gray'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      {
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': variant === 'primary',
        'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200': variant === 'secondary',
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200': variant === 'accent',
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': variant === 'gray'
      }
    ]"
  >
    <slot />
  </span>
</template>
