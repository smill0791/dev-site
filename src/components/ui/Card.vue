<script setup lang="ts">
interface Props {
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false
})
</script>

<template>
  <div
    :class="[
      'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm transition-all',
      hover && 'hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600'
    ]"
  >
    <slot />
  </div>
</template>
