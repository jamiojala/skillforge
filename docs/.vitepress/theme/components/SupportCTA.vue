<script setup lang="ts">
defineProps<{
  title: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}>()
</script>

<template>
  <aside class="sf-support-cta">
    <p class="sf-kicker">Support the infrastructure</p>
    <h2 class="sf-section-heading__title">{{ title }}</h2>
    <p>{{ body }}</p>
    <div class="sf-inline-actions">
      <a class="sf-btn sf-btn--primary" :href="primaryHref">{{ primaryLabel }}</a>
      <a v-if="secondaryLabel && secondaryHref" class="sf-btn sf-btn--secondary" :href="secondaryHref">
        {{ secondaryLabel }}
      </a>
    </div>
  </aside>
</template>
