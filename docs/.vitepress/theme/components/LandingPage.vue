<script setup lang="ts">
import SkillCard from './SkillCard.vue'
import { getCatalogFilterUrl, getFeaturedSkills, getPageUrl, siteCatalog } from '../lib/catalog'

const featuredSkills = getFeaturedSkills()
const spotlightSkill = featuredSkills[0]
const featuredRail = featuredSkills.slice(1)

const howItWorks = [
  {
    step: 'Browse a skill',
    body: 'Start from a clean catalog of portable packs instead of digging through prompt scraps and internal notes.'
  },
  {
    step: 'Run or export it',
    body: 'Use SkillForge through the local orchestration layer or take the pack out as a portable asset for another client.'
  },
  {
    step: 'Validate and compose it',
    body: 'Each pack exposes triggers, model preferences, and validation hooks so teams can compose workflows deliberately.'
  }
]

const whyDifferent = [
  {
    title: 'Generic prompts and rules',
    body: 'Opaque instructions, weak reuse, no validation contract, and poor portability once the original tool changes.'
  },
  {
    title: 'SkillForge packs',
    body: 'Structured triggers, visible manifests, reusable install surfaces, and inspectable validation hooks that travel between ecosystems.'
  }
]

const supportPoints = [
  'Keeps the catalog free to browse, export, and inspect.',
  'Funds deeper first-party packs, active maintenance, and sharper docs.',
  'Supports an open-source AI tooling surface that treats quality like infrastructure.'
]

const heroLines = [
  'skill_id: liquid-glass-enforcer',
  'trigger: [glassmorphism, backdrop blur, liquid glass]',
  'validation: [audit_design_compliance]',
  'skill_id: rag-system-architect',
  'trigger: [rag, retrieval, context injection]',
  'validation: [retrieval-accuracy-checker]'
]
</script>

<template>
  <div class="sf-landing">
    <section class="sf-hero">
      <div class="sf-hero__copy">
        <p class="sf-eyebrow">Open-source AI infrastructure</p>
        <h1>Portable AI skills for serious systems teams.</h1>
        <p class="sf-hero__lead">
          SkillForge gives Codex, Claude Code, Kimi Code, and other multi-model workflows one local
          orchestration layer plus a browsable marketplace of exportable skill packs.
        </p>
        <div class="sf-hero__actions">
          <a class="sf-button sf-button--primary" :href="getPageUrl('/skills/')">Browse skills</a>
          <a class="sf-button" :href="getPageUrl('/quickstart')">Get started</a>
          <a class="sf-button" :href="siteCatalog.sponsorUrl">Sponsor project</a>
        </div>
      </div>

      <div class="sf-hero__visual" aria-hidden="true">
        <div class="sf-hero-surface">
          <div class="sf-hero-surface__header">
            <span class="sf-signal">portable manifests</span>
            <span class="sf-signal">validation hooks</span>
          </div>
          <pre class="sf-hero-code"><code>{{ heroLines.join('\n') }}</code></pre>
          <div class="sf-hero-surface__footer">
            <span class="sf-signal">codex</span>
            <span class="sf-signal">claude code</span>
            <span class="sf-signal">kimi code</span>
          </div>
        </div>
      </div>
    </section>

    <section class="sf-trust-strip" aria-label="SkillForge trust strip">
      <div v-for="item in siteCatalog.trustStrip" :key="item.label" class="sf-trust-pill">
        <span class="sf-trust-pill__value">{{ item.value }}</span>
        <span>{{ item.label }}</span>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Featured skills</p>
        <h2>The catalog is the proof surface.</h2>
        <p>
          These packs show the level of structure, specificity, and operational quality the library
          is built around.
        </p>
      </div>

      <div class="sf-featured-layout">
        <SkillCard v-if="spotlightSkill" :skill="spotlightSkill" />
        <div class="sf-featured-rail">
          <SkillCard v-for="skill in featuredRail" :key="skill.slug" :skill="skill" compact />
        </div>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Catalog lanes</p>
        <h2>Browse the library like a product, not a prompt dump.</h2>
        <p>
          SkillForge organizes the catalog into clear public domains, with advanced first-party packs
          visible as a distinct lane instead of buried special cases.
        </p>
      </div>

      <div class="sf-collections-grid">
        <a
          v-for="collection in siteCatalog.collections"
          :key="collection.slug"
          class="sf-collection-card"
          :href="getCatalogFilterUrl(collection.slug)"
        >
          <span class="sf-collection-card__count">{{ collection.count }}</span>
          <h3>{{ collection.label }}</h3>
          <p>{{ collection.description }}</p>
        </a>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">How SkillForge works</p>
        <h2>One system, two adoption paths, zero prompt chaos.</h2>
      </div>

      <div class="sf-process-grid">
        <article v-for="item in howItWorks" :key="item.step" class="sf-process-card">
          <p class="sf-process-card__step">{{ item.step }}</p>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Why SkillForge is different</p>
        <h2>Prompt glue does not scale into infrastructure.</h2>
      </div>

      <div class="sf-compare-grid">
        <article v-for="entry in whyDifferent" :key="entry.title" class="sf-compare-card">
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.body }}</p>
        </article>
      </div>

      <div class="sf-difference-points">
        <span class="sf-chip">Trigger signals</span>
        <span class="sf-chip">Structured metadata</span>
        <span class="sf-chip">Validation hooks</span>
        <span class="sf-chip">Portable SKILL.md + YAML</span>
        <span class="sf-chip">Composable workflows</span>
      </div>
    </section>

    <section class="sf-section sf-support-panel">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Support SkillForge</p>
        <h2>Help keep the project free, sharp, and actively maintained.</h2>
        <p>
          SkillForge is open-source infrastructure for elite AI tooling workflows. Sponsorship helps
          us keep shipping new packs, stronger docs, and better product polish without turning the
          catalog into a paywall.
        </p>
      </div>

      <div class="sf-support-panel__body">
        <ul class="sf-support-list">
          <li v-for="point in supportPoints" :key="point">{{ point }}</li>
        </ul>
        <a class="sf-button sf-button--primary" :href="siteCatalog.sponsorUrl">Sponsor on GitHub</a>
      </div>
    </section>

    <section class="sf-final-cta">
      <div>
        <p class="sf-eyebrow">Flagship open source</p>
        <h2>Browse the catalog, wire it into your workflow, or help fund the next wave.</h2>
      </div>
      <div class="sf-final-cta__actions">
        <a class="sf-button sf-button--primary" :href="getPageUrl('/skills/')">Browse skills</a>
        <a class="sf-button" :href="getPageUrl('/quickstart')">Get started</a>
        <a class="sf-button" :href="siteCatalog.sponsorUrl">Sponsor project</a>
      </div>
    </section>
  </div>
</template>
