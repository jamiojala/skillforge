<script setup lang="ts">
defineProps<{
  tier: {
    name: string
    price: string
    body: string
    benefits: string[]
    cta: string
    link: string
  }
}>()
</script>

<template>
  <article class="sf-sponsor-tier">
    <p class="sf-kicker">Sponsor tier</p>
    <h3>{{ tier.name }}</h3>
    <div class="sf-sponsor-tier__price">{{ tier.price }}</div>
    <p>{{ tier.body }}</p>
    <ul class="sf-sponsor-tier__benefits">
      <li v-for="benefit in tier.benefits" :key="benefit">{{ benefit }}</li>
    </ul>
    <a class="sf-btn sf-btn--primary" :href="tier.link">{{ tier.cta }}</a>
  </article>
</template>
