<script setup lang="ts">
import ComparisonTable from './ComparisonTable.vue'
import HeroSection from './HeroSection.vue'
import OpenSourceBadges from './OpenSourceBadges.vue'
import ProcessSteps from './ProcessSteps.vue'
import SkillGrid from './SkillGrid.vue'
import SupportCTA from './SupportCTA.vue'
import TrustBar from './TrustBar.vue'
import {
  getCatalogFilterUrl,
  getFeaturedSkills,
  getPageUrl,
  homepageStats,
  siteCatalog
} from '../lib/catalog'

const featuredSkills = getFeaturedSkills(6)
const spotlightIds = featuredSkills.slice(0, 1).map((skill) => skill.slug)
const topCollections = [...siteCatalog.collections].sort((left, right) => right.count - left.count).slice(0, 6)

const processSteps = [
  {
    title: 'Browse the catalog',
    body: '302 packs across 14 domains. Each one has a readable manifest with role, voice, reasoning steps, and validation hooks.'
  },
  {
    title: 'Install or export',
    body: 'Run the full MCP runtime for orchestration, cost routing, and safety checks — or just export individual packs into your existing workflow.'
  },
  {
    title: 'Ship with confidence',
    body: 'Compose packs with explicit triggers and model preferences. Everything is versioned on GitHub. No magic, no lock-in.'
  }
]

const comparisonRows = [
  {
    label: 'Portability',
    other: 'Skills locked to one client or proprietary marketplace.',
    skillforge: 'SKILL.md + YAML manifests that work across Codex, Claude Code, Kimi Code, and any MCP client.'
  },
  {
    label: 'Transparency',
    other: 'Opaque prompt blobs you cannot read, inspect, or audit before installing.',
    skillforge: 'Readable manifests with role, voice, reasoning steps, validation hooks, and file targets.'
  },
  {
    label: 'Contributing',
    other: 'Closed catalogs, proprietary review pipelines, or no contribution path at all.',
    skillforge: 'Fork the repo, add a pack folder, open a PR. GitHub is the entire workflow.'
  },
  {
    label: 'Cost',
    other: 'Paywalls, subscription tiers, or skills duplicated across every client.',
    skillforge: 'Free forever. Open source under Apache-2.0. No gatekeeping, no surprises.'
  }
]
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Open-source · 302 skills · Apache-2.0"
      title="One skill library for every coding agent."
      lead="Portable skill packs for Codex, Claude Code, Kimi Code, and any MCP-capable client. Browse, install, export. No vendor lock-in."
    >
      <template #title>
        One skill library for<br><span class="sf-gradient-text--primary">every coding agent.</span>
      </template>
      <template #actions>
        <a class="sf-btn sf-btn--primary" :href="getPageUrl('/skills/')">Browse 302 Skills</a>
        <a class="sf-btn sf-btn--secondary" href="https://github.com/jamiojala/skillforge">GitHub</a>
        <a class="sf-btn sf-btn--ghost" :href="getPageUrl('/support')">Support this project</a>
      </template>
    </HeroSection>

    <TrustBar :stats="homepageStats" />

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Featured packs</p>
        <h2 class="sf-section-heading__title">Read the manifest before you install.</h2>
        <p class="sf-section-heading__lead">
          Every pack is a real folder with structured metadata — not a prompt blob behind a paywall.
          Inspect it, fork it, improve it.
        </p>
      </div>

      <SkillGrid :skills="featuredSkills" :featured-ids="spotlightIds" />

      <a class="sf-inline-link" :href="getPageUrl('/skills/')">View all {{ siteCatalog.stats.totalSkills }}+ skills</a>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">14 domains</p>
        <h2 class="sf-section-heading__title">Find what you need in seconds, not minutes.</h2>
        <p class="sf-section-heading__lead">
          Skills organized by what you build — frontend, backend, security, AI/ML, DevOps, and more. Not a flat list you have to scroll through.
        </p>
      </div>

      <div class="sf-bento-grid">
        <a
          v-for="collection in topCollections"
          :key="collection.slug"
          class="sf-collection-card"
          :href="getCatalogFilterUrl(collection.slug)"
        >
          <span class="sf-collection-card__count">{{ collection.count }}</span>
          <h3>{{ collection.collectionTitle }}</h3>
          <p>{{ collection.description }}</p>
          <span class="sf-card-link">Browse collection</span>
        </a>
      </div>
    </section>

    <!-- Mid-page support nudge -->
    <section class="sf-shell sf-section">
      <aside class="sf-support-nudge">
        <div class="sf-support-nudge__content">
          <p class="sf-support-nudge__eyebrow">Solo-maintained, community-supported</p>
          <h2 class="sf-support-nudge__title">No VC funding. No corporate sponsor. Just one developer and the people who use this.</h2>
          <p class="sf-support-nudge__body">
            Every pack, every doc page, every safety check is built and shipped by a single maintainer.
            Sponsorship is what keeps 302 packs from going stale. If SkillForge saves your team time,
            consider making that sustainable.
          </p>
          <div class="sf-inline-actions">
            <a class="sf-btn sf-btn--primary" href="https://github.com/sponsors/jamiojala">Sponsor on GitHub</a>
            <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/support')">See what your money funds</a>
          </div>
        </div>
        <div class="sf-support-nudge__stats">
          <div class="sf-support-nudge__stat">
            <strong>302</strong>
            <span>skill packs maintained</span>
          </div>
          <div class="sf-support-nudge__stat">
            <strong>14</strong>
            <span>domain categories</span>
          </div>
          <div class="sf-support-nudge__stat">
            <strong>1</strong>
            <span>maintainer</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Get started</p>
        <h2 class="sf-section-heading__title">Full runtime or just the packs — your call.</h2>
      </div>

      <ProcessSteps
        :steps="processSteps"
        code-example="pip install &quot;orchestrator-mcp[dashboard]&quot;
orchestrator-mcp skills list
orchestrator-mcp skills export liquid-glass-enforcer --to ./skillforge-packs"
      />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Why SkillForge</p>
        <h2 class="sf-section-heading__title">Your skills should outlive the client you wrote them for.</h2>
      </div>

      <ComparisonTable :rows="comparisonRows" />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Open by default</p>
        <h2 class="sf-section-heading__title">Apache-2.0 licensed. GitHub native. No hidden backend.</h2>
      </div>
      <OpenSourceBadges />
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Use it free. Fund it if it matters to you."
        body="The catalog is free forever. Sponsorship funds new packs, better docs, and the maintenance that keeps 302 skills from rotting."
        primary-label="Get Started Free"
        :primary-href="getPageUrl('/quickstart')"
        secondary-label="Become a Sponsor"
        :secondary-href="getPageUrl('/support')"
      />
    </section>
  </div>
</template>
