<script setup lang="ts">
import { computed } from 'vue'
import SkillGrid from './SkillGrid.vue'
import { filterSkills, getCatalogFilterUrl, getCollectionBySlug, getPageUrl, siteCatalog } from '../lib/catalog'

const props = defineProps<{
  collection: string
}>()

const activeCollection = computed(() => getCollectionBySlug(props.collection))
const collectionSkills = computed(() =>
  activeCollection.value ? filterSkills(siteCatalog.skills, { collection: props.collection }) : []
)
</script>

<template>
  <div v-if="activeCollection" class="sf-page">
    <section class="sf-shell sf-page-hero">
      <p class="sf-kicker">Collection</p>
      <h1 class="sf-section-heading__title">{{ activeCollection.collectionTitle }}</h1>
      <p class="sf-page-hero__lead">{{ activeCollection.description }}</p>
      <div class="sf-page-hero__actions">
        <a class="sf-btn sf-btn--primary" :href="getCatalogFilterUrl(activeCollection.slug)">Open in catalog</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/discover')">Discover more</a>
      </div>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-results-head">
        <p>{{ collectionSkills.length }} skills in this lane</p>
      </div>
      <SkillGrid :skills="collectionSkills" />
    </section>
  </div>

  <div v-else class="sf-page">
    <div class="sf-shell sf-empty-state">
      <p class="sf-kicker">Missing collection</p>
      <h1 class="sf-section-heading__title">This collection could not be resolved.</h1>
      <p>Try the main catalog instead of a legacy category route.</p>
      <a class="sf-btn sf-btn--primary" :href="getPageUrl('/skills/')">Return to catalog</a>
    </div>
  </div>
</template>
