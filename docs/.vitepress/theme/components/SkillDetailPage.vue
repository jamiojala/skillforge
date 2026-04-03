<script setup lang="ts">
import { computed } from 'vue'
import OpenSourceBadges from './OpenSourceBadges.vue'
import SkillGrid from './SkillGrid.vue'
import {
  getGitHubPackUrl,
  getPageUrl,
  getRelatedSkills,
  getSkillBySlug
} from '../lib/catalog'

const props = defineProps<{
  slug: string
}>()

const skill = computed(() => getSkillBySlug(props.slug))
const relatedSkills = computed(() => (skill.value ? getRelatedSkills(skill.value) : []))
</script>

<template>
  <div v-if="skill" class="sf-page sf-page--detail">
    <section class="sf-shell sf-page-hero">
      <p class="sf-kicker">{{ skill.publicDomainLabel }} · {{ skill.sourceLabel }}</p>
      <h1 class="sf-section-heading__title">{{ skill.name }}</h1>
      <p class="sf-page-hero__lead">{{ skill.purpose }}</p>
      <div class="sf-badges">
        <span v-for="item in skill.compatibility.slice(0, 4)" :key="item" class="sf-chip">{{ item }}</span>
      </div>
      <div class="sf-page-hero__actions">
        <a class="sf-btn sf-btn--primary" :href="getGitHubPackUrl(skill)">Open pack on GitHub</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/skills/')">Back to catalog</a>
      </div>
    </section>

    <section class="sf-shell sf-grid sf-grid--3">
      <article class="sf-resource-card">
        <p class="sf-resource-card__eyebrow">Best use case</p>
        <p>{{ skill.bestUseCase }}</p>
      </article>
      <article class="sf-resource-card">
        <p class="sf-resource-card__eyebrow">Trigger signals</p>
        <div class="sf-badges">
          <span v-for="item in skill.triggerSignals" :key="item" class="sf-chip">{{ item }}</span>
        </div>
      </article>
      <article class="sf-resource-card">
        <p class="sf-resource-card__eyebrow">Validation hooks</p>
        <div class="sf-badges">
          <span v-for="item in skill.validationTools" :key="item" class="sf-chip">{{ item }}</span>
        </div>
      </article>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Install surface</p>
        <h2 class="sf-section-heading__title">Copy the exact command path you need.</h2>
      </div>

      <div class="sf-resource-grid">
        <article class="sf-resource-card">
          <p class="sf-resource-card__eyebrow">Inspect</p>
          <pre><code>{{ skill.installCommands.inspect }}</code></pre>
        </article>
        <article class="sf-resource-card">
          <p class="sf-resource-card__eyebrow">Use</p>
          <pre><code>{{ skill.installCommands.use }}</code></pre>
        </article>
        <article class="sf-resource-card">
          <p class="sf-resource-card__eyebrow">Export</p>
          <pre><code>{{ skill.installCommands.export }}</code></pre>
        </article>
      </div>
    </section>

    <section class="sf-shell sf-grid sf-grid--2">
      <article class="sf-resource-card">
        <p class="sf-resource-card__eyebrow">File patterns</p>
        <div class="sf-badges">
          <span v-for="item in skill.filePatterns" :key="item" class="sf-chip">{{ item }}</span>
        </div>
      </article>
      <article class="sf-resource-card">
        <p class="sf-resource-card__eyebrow">Model preferences</p>
        <div class="sf-badges">
          <span v-for="item in skill.modelPreferences" :key="item" class="sf-chip">{{ item }}</span>
        </div>
      </article>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Related skills</p>
        <h2 class="sf-section-heading__title">Adjacent packs to compose next.</h2>
      </div>

      <SkillGrid :skills="relatedSkills" :compact="true" />
    </section>

    <section class="sf-shell sf-section">
      <OpenSourceBadges />
    </section>
  </div>

  <div v-else class="sf-page">
    <div class="sf-shell sf-empty-state">
      <p class="sf-kicker">Missing skill</p>
      <h1 class="sf-section-heading__title">This skill page could not be generated.</h1>
      <p>The current catalog does not include <code>{{ slug }}</code>.</p>
      <a class="sf-btn sf-btn--primary" :href="getPageUrl('/skills/')">Return to the catalog</a>
    </div>
  </div>
</template>
