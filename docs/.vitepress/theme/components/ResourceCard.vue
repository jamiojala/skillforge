<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  body: string
  href: string
}>()
</script>

<template>
  <a class="sf-resource-card" :href="href">
    <p class="sf-resource-card__eyebrow">{{ eyebrow }}</p>
    <h3>{{ title }}</h3>
    <p>{{ body }}</p>
    <span class="sf-card-link">Open resource</span>
  </a>
</template>
