<script setup lang="ts">
defineProps<{
  sponsors: Array<{
    name: string
    href: string
    description: string
  }>
}>()
</script>

<template>
  <div v-if="sponsors.length" class="sf-sponsor-grid">
    <a v-for="sponsor in sponsors" :key="sponsor.name" class="sf-resource-card" :href="sponsor.href">
      <p class="sf-resource-card__eyebrow">Supporter</p>
      <h3>{{ sponsor.name }}</h3>
      <p>{{ sponsor.description }}</p>
    </a>
  </div>

  <div v-else class="sf-empty-state">
    <p class="sf-kicker">Sponsor wall</p>
    <h2 class="sf-section-heading__title">No public sponsors listed yet.</h2>
    <p>That is fixable. If SkillForge saves your team time, you can be the first visible supporter.</p>
  </div>
</template>
