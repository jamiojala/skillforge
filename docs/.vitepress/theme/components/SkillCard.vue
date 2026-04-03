<script setup lang="ts">
import { computed } from 'vue'
import type { SkillEntry } from '../lib/catalog'
import {
  getCategoryColor,
  getDisplayCompatibility,
  getGitHubPackUrl,
  getSkillUrl
} from '../lib/catalog'
import CompatibilityBadges from './CompatibilityBadges.vue'
import FeaturedBadge from './FeaturedBadge.vue'
import SkillIcon from './SkillIcon.vue'
import SkillStats from './SkillStats.vue'

const props = withDefaults(
  defineProps<{
    skill: SkillEntry
    compact?: boolean
    variant?: 'default' | 'featured' | 'compact' | 'horizontal'
    featured?: boolean
  }>(),
  {
    compact: false,
    variant: 'default',
    featured: false
  }
)

const resolvedVariant = computed(() => (props.compact ? 'compact' : props.variant))
const compatibility = computed(() =>
  getDisplayCompatibility(props.skill, resolvedVariant.value === 'compact' ? 2 : 4)
)
const categoryStyle = computed(() => ({
  background: getCategoryColor(props.skill.publicDomain === 'ai_ml' ? 'ai-ml' : props.skill.publicDomain)
}))
</script>

<template>
  <article class="sf-skill-card" :class="`sf-skill-card--${resolvedVariant}`">
    <span class="sf-skill-card__bar" :style="categoryStyle" />

    <header class="sf-skill-card__header">
      <div class="sf-skill-card__identity">
        <SkillIcon :category="skill.publicDomain === 'ai_ml' ? 'ai-ml' : skill.publicDomain" />

        <div class="sf-skill-card__copy">
          <div class="sf-skill-card__micro">
            <FeaturedBadge v-if="featured || skill.featured" />
            <span class="sf-badge">{{ skill.publicDomainLabel }}</span>
            <span class="sf-badge sf-badge--muted">{{ skill.sourceLabel }}</span>
          </div>

          <h3 class="sf-skill-card__title">
            <a class="sf-skill-card__title-link" :href="getSkillUrl(skill.slug)">{{ skill.name }}</a>
          </h3>
        </div>
      </div>

      <a class="sf-card-link" :href="getGitHubPackUrl(skill)">Open pack</a>
    </header>

    <p class="sf-skill-card__purpose">{{ skill.purpose }}</p>

    <CompatibilityBadges :tools="compatibility" />

    <footer class="sf-skill-card__footer">
      <SkillStats :skill="skill" />
      <div class="sf-skill-card__actions">
        <a class="sf-card-link" :href="getSkillUrl(skill.slug)">View details</a>
      </div>
    </footer>
  </article>
</template>
