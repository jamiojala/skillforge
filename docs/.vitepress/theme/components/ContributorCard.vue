<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  contributor: {
    name: string
    username: string
    role: string
    summary: string
    stats: string[]
    badges: string[]
  }
}>()

const initials = computed(() =>
  props.contributor.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)
</script>

<template>
  <article class="sf-contributor-card">
    <div class="sf-contributor-card__meta">
      <span class="sf-contributor-card__avatar" aria-hidden="true">{{ initials }}</span>
      <div>
        <h3>{{ contributor.name }}</h3>
        <p>@{{ contributor.username }} · {{ contributor.role }}</p>
      </div>
    </div>

    <p>{{ contributor.summary }}</p>

    <div class="sf-contributor-card__stats">
      <span v-for="stat in contributor.stats" :key="stat" class="sf-chip">{{ stat }}</span>
    </div>

    <div class="sf-badges">
      <span v-for="badge in contributor.badges" :key="badge" class="sf-badge sf-badge--muted">
        {{ badge }}
      </span>
    </div>
  </article>
</template>
