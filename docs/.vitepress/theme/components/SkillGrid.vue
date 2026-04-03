<script setup lang="ts">
import { computed } from 'vue'
import type { SkillEntry } from '../lib/catalog'
import SkillCard from './SkillCard.vue'

const props = withDefaults(
  defineProps<{
    skills: SkillEntry[]
    columns?: number
    featuredIds?: string[]
    compact?: boolean
  }>(),
  {
    columns: 3,
    featuredIds: () => [],
    compact: false
  }
)

const style = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`
}))

function resolveVariant(skill: SkillEntry) {
  if (props.compact) return 'compact'
  if (props.featuredIds.includes(skill.slug)) return 'featured'
  return 'default'
}
</script>

<template>
  <div class="sf-skill-grid" :style="style">
    <SkillCard
      v-for="skill in skills"
      :key="skill.slug"
      :skill="skill"
      :variant="resolveVariant(skill)"
      :featured="featuredIds.includes(skill.slug)"
    />
  </div>
</template>
