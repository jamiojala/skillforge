<script setup lang="ts">
import type { SkillEntry } from '../lib/catalog'
import { getCatalogFilterUrl, getDomainQueryValue, getSkillUrl } from '../lib/catalog'

defineProps<{
  skill: SkillEntry
  compact?: boolean
}>()
</script>

<template>
  <article class="sf-skill-card" :class="{ 'sf-skill-card--compact': compact }">
    <div class="sf-skill-card__topline">
      <span class="sf-badge">{{ skill.sourceLabel }}</span>
      <a class="sf-inline-link" :href="getCatalogFilterUrl(getDomainQueryValue(skill))">{{ skill.publicDomainLabel }}</a>
    </div>

    <div class="sf-skill-card__body">
      <h3 class="sf-skill-card__title">
        <a :href="getSkillUrl(skill.slug)">{{ skill.name }}</a>
      </h3>
      <p class="sf-skill-card__purpose">{{ skill.purpose }}</p>
    </div>

    <div class="sf-skill-card__meta">
      <div class="sf-chip-row">
        <span v-for="keyword in skill.keywords.slice(0, 3)" :key="keyword" class="sf-chip">
          {{ keyword }}
        </span>
      </div>
      <div class="sf-chip-row sf-chip-row--muted">
        <span v-for="compatibility in skill.compatibility.slice(0, compact ? 2 : 3)" :key="compatibility" class="sf-chip sf-chip--muted">
          {{ compatibility }}
        </span>
      </div>
    </div>

    <a class="sf-card-link" :href="getSkillUrl(skill.slug)">View skill</a>
  </article>
</template>
