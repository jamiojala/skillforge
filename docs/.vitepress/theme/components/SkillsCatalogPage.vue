<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SkillCard from './SkillCard.vue'
import {
  filterSkills,
  getCatalogFilterUrl,
  getFeaturedSkills,
  siteCatalog
} from '../lib/catalog'

const featuredSkills = getFeaturedSkills()
const spotlightSkill = featuredSkills[0]
const featuredRail = featuredSkills.slice(1)

const searchQuery = ref('')
const activeCollection = ref('all')
const hydrated = ref(false)

const filteredSkills = computed(() =>
  filterSkills(siteCatalog.skills, searchQuery.value, activeCollection.value)
)

function applyQueryFromLocation() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const nextQuery = params.get('q') ?? ''
  const nextCollection = params.get('domain') ?? 'all'

  searchQuery.value = nextQuery
  activeCollection.value = siteCatalog.domainQueryOrder.includes(nextCollection) ? nextCollection : 'all'
}

function syncLocation() {
  if (!hydrated.value || typeof window === 'undefined') return

  const params = new URLSearchParams()
  if (searchQuery.value.trim()) params.set('q', searchQuery.value.trim())
  if (activeCollection.value !== 'all') params.set('domain', activeCollection.value)

  const query = params.toString()
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname
  window.history.replaceState({}, '', nextUrl)
}

onMounted(() => {
  applyQueryFromLocation()
  hydrated.value = true
  window.addEventListener('popstate', applyQueryFromLocation)
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('popstate', applyQueryFromLocation)
  }
})

watch([searchQuery, activeCollection], syncLocation)
</script>

<template>
  <div class="sf-catalog-page">
    <section class="sf-page-hero">
      <p class="sf-eyebrow">Skill catalog</p>
      <h1>Browse 130 portable AI skill packs with real structure.</h1>
      <p class="sf-page-hero__lead">
        Search the full SkillForge library, filter by public domain, and move from a catalog view
        into skill-level detail without falling back into docs-template browsing.
      </p>
    </section>

    <section class="sf-section">
      <div class="sf-section__head">
        <p class="sf-eyebrow">Featured at the top</p>
        <h2>The sharpest slices of the library.</h2>
      </div>

      <div class="sf-featured-layout">
        <SkillCard v-if="spotlightSkill" :skill="spotlightSkill" />
        <div class="sf-featured-rail">
          <SkillCard v-for="skill in featuredRail" :key="skill.slug" :skill="skill" compact />
        </div>
      </div>
    </section>

    <section class="sf-section">
      <div class="sf-catalog-controls">
        <div class="sf-search-field">
          <label class="sf-search-field__label" for="skillforge-search">Search skills</label>
          <input
            id="skillforge-search"
            v-model="searchQuery"
            class="sf-search-field__input"
            type="search"
            placeholder="Search by name, purpose, keyword, or validation hook"
          />
        </div>

        <div class="sf-filter-bar" role="tablist" aria-label="Skill collections">
          <button
            v-for="collection in [{ slug: 'all', label: 'All' }, ...siteCatalog.collections]"
            :key="collection.slug"
            class="sf-filter-pill"
            :class="{ 'sf-filter-pill--active': activeCollection === collection.slug }"
            type="button"
            @click="activeCollection = collection.slug"
          >
            {{ collection.label }}
          </button>
        </div>
      </div>

      <div class="sf-results-head">
        <p>{{ filteredSkills.length }} skills visible</p>
        <a class="sf-inline-link" :href="getCatalogFilterUrl(activeCollection)">Open filtered view</a>
      </div>

      <div class="sf-skill-grid">
        <SkillCard v-for="skill in filteredSkills" :key="skill.slug" :skill="skill" />
      </div>
    </section>
  </div>
</template>
