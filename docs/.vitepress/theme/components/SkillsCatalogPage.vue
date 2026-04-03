<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SkillGrid from './SkillGrid.vue'
import {
  filterSkills,
  getCompatibilityOptions,
  getPageUrl,
  siteCatalog,
  sortSkills,
  type SortMode
} from '../lib/catalog'

const searchQuery = ref('')
const activeCollection = ref('all')
const activeSource = ref<'all' | 'first_party' | 'global'>('all')
const activeClient = ref<string | null>(null)
const sortMode = ref<SortMode>('featured')
const hydrated = ref(false)

const compatibilityOptions = getCompatibilityOptions()

const filteredSkills = computed(() =>
  sortSkills(
    filterSkills(siteCatalog.skills, {
      query: searchQuery.value,
      collection: activeCollection.value,
      source: activeSource.value,
      client: activeClient.value
    }),
    sortMode.value
  )
)

function applyQueryFromLocation() {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const nextCollection = params.get('domain') ?? 'all'
  const nextSource = params.get('source') ?? 'all'
  const nextClient = params.get('client')
  const nextSort = params.get('sort') ?? 'featured'

  searchQuery.value = params.get('q') ?? ''
  activeCollection.value = siteCatalog.domainQueryOrder.includes(nextCollection) ? nextCollection : 'all'
  activeSource.value =
    nextSource === 'first_party' || nextSource === 'global' || nextSource === 'all'
      ? nextSource
      : 'all'
  activeClient.value = compatibilityOptions.includes(nextClient ?? '') ? nextClient : null
  sortMode.value =
    nextSort === 'alphabetical' || nextSort === 'first_party' || nextSort === 'featured'
      ? nextSort
      : 'featured'
}

function syncLocation() {
  if (!hydrated.value || typeof window === 'undefined') return

  const params = new URLSearchParams()
  if (searchQuery.value.trim()) params.set('q', searchQuery.value.trim())
  if (activeCollection.value !== 'all') params.set('domain', activeCollection.value)
  if (activeSource.value !== 'all') params.set('source', activeSource.value)
  if (activeClient.value) params.set('client', activeClient.value)
  if (sortMode.value !== 'featured') params.set('sort', sortMode.value)

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

watch([searchQuery, activeCollection, activeSource, activeClient, sortMode], syncLocation)
</script>

<template>
  <div class="sf-page sf-page--catalog">
    <section class="sf-shell sf-page-hero">
      <p class="sf-kicker">Browse</p>
      <h1 class="sf-section-heading__title">Search the full SkillForge catalog.</h1>
      <p class="sf-page-hero__lead">
        Filter by domain, source, and client compatibility to find packs that fit your workflow
        without dropping back into docs-template browsing.
      </p>
      <div class="sf-page-hero__actions">
        <a class="sf-btn sf-btn--primary" :href="getPageUrl('/discover')">Discover Collections</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/quickstart')">Quickstart</a>
      </div>
    </section>

    <section class="sf-shell sf-catalog-layout">
      <aside class="sf-catalog-sidebar">
        <div class="sf-filter-group">
          <label class="sf-search-field" for="skillforge-search">
            <span class="sf-kicker">Search</span>
            <input
              id="skillforge-search"
              v-model="searchQuery"
              class="sf-search-input"
              type="search"
              :placeholder="`Search ${siteCatalog.stats.totalSkills}+ skills...`"
            />
          </label>
        </div>

        <div class="sf-filter-group">
          <p class="sf-kicker">Sort</p>
          <select v-model="sortMode" class="sf-select" aria-label="Sort skills">
            <option value="featured">Featured first</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="first_party">First-party first</option>
          </select>
        </div>

        <div class="sf-filter-group">
          <h3>Domain</h3>
          <div class="sf-filter-pills">
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

        <div class="sf-filter-group">
          <h3>Source</h3>
          <div class="sf-filter-pills">
            <button
              class="sf-filter-pill"
              :class="{ 'sf-filter-pill--active': activeSource === 'all' }"
              type="button"
              @click="activeSource = 'all'"
            >
              All
            </button>
            <button
              class="sf-filter-pill"
              :class="{ 'sf-filter-pill--active': activeSource === 'first_party' }"
              type="button"
              @click="activeSource = 'first_party'"
            >
              First-party
            </button>
            <button
              class="sf-filter-pill"
              :class="{ 'sf-filter-pill--active': activeSource === 'global' }"
              type="button"
              @click="activeSource = 'global'"
            >
              Global library
            </button>
          </div>
        </div>

        <div class="sf-filter-group">
          <h3>Client compatibility</h3>
          <div class="sf-toggle-list">
            <label v-for="client in compatibilityOptions" :key="client" class="sf-toggle">
              <input v-model="activeClient" type="radio" name="client-filter" :value="client" />
              <span>{{ client }}</span>
            </label>
            <label class="sf-toggle">
              <input v-model="activeClient" type="radio" name="client-filter" :value="null" />
              <span>Any client</span>
            </label>
          </div>
        </div>
      </aside>

      <div class="sf-catalog-results">
        <div class="sf-results-head">
          <p>{{ filteredSkills.length }} skills visible</p>
          <a class="sf-inline-link" :href="getPageUrl('/contribute')">Contribute a new pack</a>
        </div>

        <SkillGrid :skills="filteredSkills" />

        <div v-if="!filteredSkills.length" class="sf-empty-state">
          <p class="sf-kicker">No matches</p>
          <h2 class="sf-section-heading__title">No skills match your filters.</h2>
          <p>Try broader search terms, reset the client filter, or browse all domains.</p>
        </div>
      </div>
    </section>
  </div>
</template>
