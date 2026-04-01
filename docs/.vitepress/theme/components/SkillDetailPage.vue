<script setup lang="ts">
import { computed } from 'vue'
import SkillCard from './SkillCard.vue'
import { getPageUrl, getRelatedSkills, getSkillBySlug } from '../lib/catalog'

const props = defineProps<{
  slug: string
}>()

const skill = computed(() => getSkillBySlug(props.slug))
const relatedSkills = computed(() => (skill.value ? getRelatedSkills(skill.value) : []))
</script>

<template>
  <div v-if="skill" class="sf-skill-detail">
    <section class="sf-page-hero sf-page-hero--detail">
      <div class="sf-skill-detail__hero">
        <div>
          <p class="sf-eyebrow">{{ skill.sourceLabel }}</p>
          <h1>{{ skill.name }}</h1>
          <p class="sf-page-hero__lead">{{ skill.purpose }}</p>
        </div>

        <div class="sf-detail-meta-card">
          <span class="sf-badge">{{ skill.publicDomainLabel }}</span>
          <p>{{ skill.bestUseCase }}</p>
          <a class="sf-inline-link" :href="`https://github.com/jamiojala/skillforge/tree/main/${skill.folder}`">
            Open pack on GitHub
          </a>
        </div>
      </div>
    </section>

    <section class="sf-section sf-detail-grid">
      <article class="sf-detail-panel">
        <p class="sf-eyebrow">Best use case</p>
        <p>{{ skill.bestUseCase }}</p>
      </article>

      <article class="sf-detail-panel">
        <p class="sf-eyebrow">Ecosystem compatibility</p>
        <div class="sf-chip-row">
          <span v-for="item in skill.compatibility" :key="item" class="sf-chip">{{ item }}</span>
        </div>
      </article>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Install / Use / Export</p>
        <h2>Copy the exact surface you need.</h2>
      </div>

      <div class="sf-command-grid">
        <article class="sf-command-panel">
          <h3>Inspect</h3>
          <pre><code>{{ skill.installCommands.inspect }}</code></pre>
        </article>
        <article class="sf-command-panel">
          <h3>Use</h3>
          <pre><code>{{ skill.installCommands.use }}</code></pre>
        </article>
        <article class="sf-command-panel">
          <h3>Export</h3>
          <pre><code>{{ skill.installCommands.export }}</code></pre>
        </article>
      </div>
    </section>

    <section class="sf-section sf-detail-grid sf-detail-grid--three">
      <article class="sf-detail-panel">
        <p class="sf-eyebrow">Trigger signals</p>
        <div class="sf-chip-row">
          <span v-for="item in skill.triggerSignals" :key="item" class="sf-chip">{{ item }}</span>
        </div>
      </article>

      <article class="sf-detail-panel">
        <p class="sf-eyebrow">Best-fit files</p>
        <ul class="sf-list">
          <li v-for="item in skill.filePatterns" :key="item"><code>{{ item }}</code></li>
        </ul>
      </article>

      <article class="sf-detail-panel">
        <p class="sf-eyebrow">Validation hooks</p>
        <ul class="sf-list">
          <li v-for="item in skill.validationTools" :key="item"><code>{{ item }}</code></li>
        </ul>
      </article>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Model preferences</p>
        <h2>Built with explicit model intent.</h2>
      </div>

      <div class="sf-chip-row">
        <span v-for="model in skill.modelPreferences" :key="model" class="sf-chip sf-chip--muted">{{ model }}</span>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Related skills</p>
        <h2>Good adjacent packs to compose next.</h2>
      </div>

      <div class="sf-skill-grid sf-skill-grid--three">
        <SkillCard v-for="related in relatedSkills" :key="related.slug" :skill="related" compact />
      </div>
    </section>
  </div>

  <div v-else class="sf-empty-state">
    <p class="sf-eyebrow">Missing skill</p>
    <h1>This skill page could not be generated.</h1>
    <p>The manifest-backed catalog does not currently include <code>{{ slug }}</code>.</p>
    <a class="sf-button sf-button--primary" :href="getPageUrl('/skills/')">Return to the catalog</a>
  </div>
</template>
