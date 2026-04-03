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
    title: 'Discover',
    body: 'Browse a catalog of public domains, advanced first-party packs, and portable manifests that can be inspected before adoption.'
  },
  {
    title: 'Install',
    body: 'Use the local orchestration runtime or export a pack directly into another markdown-first or MCP-capable workflow.'
  },
  {
    title: 'Deploy',
    body: 'Compose packs deliberately with explicit triggers, model preferences, validation hooks, and public GitHub-native version history.'
  }
]

const comparisonRows = [
  {
    label: 'Vendor lock-in',
    other: 'Skills tied to one client, one prompt box, or one proprietary surface.',
    skillforge: 'Portable SKILL.md plus YAML packs designed to move between ecosystems.'
  },
  {
    label: 'Operational clarity',
    other: 'Opaque prompt blobs with weak provenance and hidden expectations.',
    skillforge: 'Structured manifests, validation hooks, file targets, and model intent you can inspect.'
  },
  {
    label: 'Contribution path',
    other: 'Closed catalogs or complicated pipelines that do not fit solo maintenance.',
    skillforge: 'Fork, add a pack, open a PR, and let GitHub stay the primary workflow.'
  },
  {
    label: 'Cost and access',
    other: 'Paywalls, proprietary marketplaces, or client-specific duplication.',
    skillforge: 'Open-source catalog, public docs, and portable exports without gatekeeping.'
  }
]
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Open-source AI infrastructure"
      title="The operating system for AI capabilities."
      lead="Portable skill packs that work with Codex, Claude Code, Kimi Code, and any agent that follows the standard. Open source. Community-readable. Ready to use."
    >
      <template #actions>
        <a class="sf-btn sf-btn--primary" :href="getPageUrl('/skills/')">Browse Skills</a>
        <a class="sf-btn sf-btn--secondary" href="https://github.com/jamiojala/skillforge">View on GitHub</a>
      </template>
    </HeroSection>

    <TrustBar :stats="homepageStats" />

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Skills that ship</p>
        <h2 class="sf-section-heading__title">Production-ready capabilities, visible enough to trust.</h2>
        <p class="sf-section-heading__lead">
          SkillForge is strongest when the packs feel inspectable, portable, and specific. These
          are representative slices of the catalog.
        </p>
      </div>

      <SkillGrid :skills="featuredSkills" :featured-ids="spotlightIds" />

      <a class="sf-inline-link" :href="getPageUrl('/skills/')">View all {{ siteCatalog.stats.totalSkills }}+ skills</a>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Browse by lane</p>
        <h2 class="sf-section-heading__title">A marketplace shape, not a documentation maze.</h2>
        <p class="sf-section-heading__lead">
          Clear domain lanes make the catalog scan like a product surface and keep advanced packs
          visible instead of buried.
        </p>
      </div>

      <div class="sf-collection-grid">
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

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">From install to execution</p>
        <h2 class="sf-section-heading__title">One adoption path for the runtime, another for portable packs.</h2>
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
        <p class="sf-kicker">Built different</p>
        <h2 class="sf-section-heading__title">Skill packs should behave like infrastructure, not like prompt scraps.</h2>
      </div>

      <ComparisonTable :rows="comparisonRows" />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Trust signals</p>
        <h2 class="sf-section-heading__title">Open source by default, honest about what is real today.</h2>
      </div>
      <OpenSourceBadges />
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Ready to build with portable AI skills?"
        body="Start with the catalog, install the runtime if you need orchestration, and support the project if you want the next wave of packs to land faster."
        primary-label="Get Started — It’s Free"
        :primary-href="getPageUrl('/quickstart')"
        secondary-label="Support SkillForge"
        :secondary-href="getPageUrl('/support')"
      />
    </section>
  </div>
</template>
