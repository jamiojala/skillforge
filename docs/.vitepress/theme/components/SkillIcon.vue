<script setup lang="ts">
import { computed } from 'vue'
import { getCategoryColor } from '../lib/catalog'

const props = defineProps<{
  category: string
  label?: string
}>()

const initials = computed(() => {
  if (props.label) return props.label

  return props.category
    .replace('advanced-packs', 'ap')
    .replace('ai-ml', 'ai')
    .split(/[-_]/)
    .map((token) => token.slice(0, 1))
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

const style = computed(() => ({
  background: `linear-gradient(135deg, ${getCategoryColor(props.category)}, color-mix(in srgb, ${getCategoryColor(props.category)} 68%, white))`
}))
</script>

<template>
  <span class="sf-skill-icon" :style="style" aria-hidden="true">{{ initials }}</span>
</template>
