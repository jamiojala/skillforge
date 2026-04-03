<script setup lang="ts">
import StatsCounter from './StatsCounter.vue'

defineProps<{
  stats: Array<{
    value: number
    label: string
    caption: string
    prefix?: string
    suffix?: string
  }>
}>()
</script>

<template>
  <section class="sf-shell sf-section">
    <div class="sf-trust-bar" aria-label="Verified SkillForge stats">
      <article v-for="stat in stats" :key="stat.label" class="sf-trust-bar__item">
        <strong class="sf-trust-bar__value">
          <StatsCounter :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix" />
        </strong>
        <span class="sf-trust-bar__label">{{ stat.label }}</span>
        <span class="sf-trust-bar__caption">{{ stat.caption }}</span>
      </article>
    </div>
  </section>
</template>
