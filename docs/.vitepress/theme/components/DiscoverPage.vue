<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import SkillGrid from './SkillGrid.vue'
import SupportCTA from './SupportCTA.vue'
import {
  filterSkills,
  getCatalogFilterUrl,
  getFeaturedSkills,
  getPageUrl,
  siteCatalog
} from '../lib/catalog'

const featuredSkills = getFeaturedSkills(6)
const advancedPacks = filterSkills(siteCatalog.skills, { collection: 'advanced-packs' }).slice(0, 6)
const refreshedAt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
}).format(new Date(siteCatalog.generatedAt))
</script>

<template>
  <div class="sf-page sf-page--discover">
    <HeroSection
      eyebrow="Discover"
      title="Start here. Find what matters."
      lead="Curated picks, first-party packs, and every domain lane in one place. No scrolling through a flat list hoping to find the right one."
    >
      <template #title>
        Start here.<br><span class="sf-gradient-text--primary">Find what matters.</span>
      </template>
      <template #actions>
        <a class="sf-btn sf-btn--primary" :href="getPageUrl('/skills/')">Open Full Catalog</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/quickstart')">Quickstart Guide</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Curated picks</p>
        <h2 class="sf-section-heading__title">Packs that consistently deliver. Start with these.</h2>
        <p class="sf-section-heading__lead">Last catalog refresh: {{ refreshedAt }}.</p>
      </div>

      <SkillGrid :skills="featuredSkills" :featured-ids="featuredSkills.slice(0, 1).map((skill) => skill.slug)" />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">First-party packs</p>
        <h2 class="sf-section-heading__title">Built by the maintainer. Orchestration, safety, routing, and evaluation.</h2>
        <p class="sf-section-heading__lead">
          These packs are written and maintained directly by the SkillForge team. They handle the
          infrastructure-level concerns that most community packs don't cover.
        </p>
      </div>

      <SkillGrid :skills="advancedPacks" :columns="3" />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">All {{ siteCatalog.collections.length }} domains</p>
        <h2 class="sf-section-heading__title">Browse by what you build, not by what was added last.</h2>
      </div>

      <div class="sf-collection-grid">
        <a
          v-for="collection in siteCatalog.collections"
          :key="collection.slug"
          class="sf-collection-card"
          :href="getCatalogFilterUrl(collection.slug)"
        >
          <span class="sf-collection-card__count">{{ collection.count }}</span>
          <h3>{{ collection.collectionTitle }}</h3>
          <p>{{ collection.description }}</p>
          <span class="sf-card-link">Browse domain</span>
        </a>
      </div>
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Want the full catalog experience?"
        body="Search, filter by domain, filter by source, check client compatibility — all in one surface."
        primary-label="Browse All {{ siteCatalog.stats.totalSkills }}+ Skills"
        :primary-href="getPageUrl('/skills/')"
        secondary-label="Contribute a Pack"
        :secondary-href="getPageUrl('/contribute')"
      />
    </section>
  </div>
</template>
