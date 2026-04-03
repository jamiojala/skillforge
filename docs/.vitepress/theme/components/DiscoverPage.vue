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
      title="Find the packs worth installing next."
      lead="Start with featured packs, explore advanced first-party surfaces, and move through the catalog by domain instead of by guesswork."
    >
      <template #actions>
        <a class="sf-btn sf-btn--primary" :href="getPageUrl('/skills/')">Open Catalog</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/contribute')">Build with SkillForge</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Staff picks</p>
        <h2 class="sf-section-heading__title">A focused slice of the strongest public-facing packs.</h2>
        <p class="sf-section-heading__lead">Current catalog refresh: {{ refreshedAt }}.</p>
      </div>

      <SkillGrid :skills="featuredSkills" :featured-ids="featuredSkills.slice(0, 1).map((skill) => skill.slug)" />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Advanced packs</p>
        <h2 class="sf-section-heading__title">First-party surfaces for orchestration, safety, evaluation, and routing.</h2>
      </div>

      <SkillGrid :skills="advancedPacks" :columns="3" />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Category map</p>
        <h2 class="sf-section-heading__title">Browse the public domains that organize the whole library.</h2>
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
          <span class="sf-card-link">Open lane</span>
        </a>
      </div>
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Need the full browse surface?"
        body="The main catalog gives you search, domain filters, source filtering, and client compatibility in one place."
        primary-label="Browse All Skills"
        :primary-href="getPageUrl('/skills/')"
        secondary-label="Quickstart"
        :secondary-href="getPageUrl('/quickstart')"
      />
    </section>
  </div>
</template>
