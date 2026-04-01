<script setup lang="ts">
import { computed } from 'vue'
import SkillCard from './SkillCard.vue'
import {
  filterSkills,
  getCatalogFilterUrl,
  getCollectionBySlug,
  getFeaturedSkills,
  getPageUrl,
  siteCatalog
} from '../lib/catalog'

const props = defineProps<{
  collection: string
}>()

const featuredSkills = getFeaturedSkills()

const activeCollection = computed(() => {
  if (props.collection === 'marketplace') return null
  return getCollectionBySlug(props.collection)
})

const collectionSkills = computed(() => {
  if (props.collection === 'marketplace') return []
  return filterSkills(siteCatalog.skills, '', props.collection)
})
</script>

<template>
  <div v-if="collection === 'marketplace'" class="sf-marketplace-page">
    <section class="sf-page-hero">
      <p class="sf-eyebrow">Marketplace</p>
      <h1>A product-grade browsing layer for the full SkillForge catalog.</h1>
      <p class="sf-page-hero__lead">
        The marketplace is not a side feature. It is the public interface for discovering, auditing,
        and exporting the skill packs that ship in the repository.
      </p>
      <div class="sf-hero__actions">
        <a class="sf-button sf-button--primary" :href="getPageUrl('/skills/')">Open the skills catalog</a>
        <a class="sf-button" :href="getPageUrl('/quickstart')">Get started</a>
      </div>
    </section>

    <section class="sf-trust-strip">
      <div class="sf-trust-pill">
        <span class="sf-trust-pill__value">Catalog</span>
        <span>{{ siteCatalog.stats.totalSkills }} skills</span>
      </div>
      <div class="sf-trust-pill">
        <span class="sf-trust-pill__value">First-party</span>
        <span>{{ siteCatalog.stats.advancedPacks }} advanced packs</span>
      </div>
      <div class="sf-trust-pill">
        <span class="sf-trust-pill__value">Portable</span>
        <span>SKILL.md + YAML</span>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-collections-grid">
        <a
          v-for="item in siteCatalog.collections"
          :key="item.slug"
          class="sf-collection-card"
          :href="getCatalogFilterUrl(item.slug)"
        >
          <span class="sf-collection-card__count">{{ item.count }}</span>
          <h3>{{ item.collectionTitle }}</h3>
          <p>{{ item.description }}</p>
        </a>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Featured skills</p>
        <h2>Representative packs from the library.</h2>
      </div>

      <div class="sf-skill-grid sf-skill-grid--three">
        <SkillCard v-for="skill in featuredSkills" :key="skill.slug" :skill="skill" compact />
      </div>
    </section>
  </div>

  <div v-else-if="activeCollection" class="sf-collection-page">
    <section class="sf-page-hero">
      <p class="sf-eyebrow">Legacy category route</p>
      <h1>{{ activeCollection.collectionTitle }}</h1>
      <p class="sf-page-hero__lead">
        {{ activeCollection.description }}
      </p>
      <div class="sf-hero__actions">
        <a class="sf-button sf-button--primary" :href="getCatalogFilterUrl(activeCollection.slug)">
          Open in the main catalog
        </a>
        <a class="sf-button" :href="getPageUrl('/skills/')">Browse all skills</a>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-results-head">
        <p>{{ collectionSkills.length }} skills in this collection</p>
      </div>
      <div class="sf-skill-grid">
        <SkillCard v-for="skill in collectionSkills" :key="skill.slug" :skill="skill" />
      </div>
    </section>
  </div>

  <div v-else class="sf-empty-state">
    <p class="sf-eyebrow">Missing collection</p>
    <h1>This collection could not be resolved.</h1>
    <a class="sf-button sf-button--primary" :href="getPageUrl('/skills/')">Return to the catalog</a>
  </div>
</template>
