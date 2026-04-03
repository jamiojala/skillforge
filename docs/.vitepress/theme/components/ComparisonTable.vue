<script setup lang="ts">
defineProps<{
  rows: Array<{
    label: string
    other: string
    skillforge: string
  }>
}>()
</script>

<template>
  <div class="sf-compare-table" role="table" aria-label="SkillForge comparison">
    <div class="sf-compare-row" role="row">
      <div class="sf-compare-cell"><strong>Capability</strong></div>
      <div class="sf-compare-cell sf-compare-cell--muted"><strong>Typical alternatives</strong></div>
      <div class="sf-compare-cell sf-compare-cell--accent"><strong>SkillForge</strong></div>
    </div>
    <div v-for="row in rows" :key="row.label" class="sf-compare-row" role="row">
      <div class="sf-compare-cell"><strong>{{ row.label }}</strong></div>
      <div class="sf-compare-cell sf-compare-cell--muted">{{ row.other }}</div>
      <div class="sf-compare-cell sf-compare-cell--accent">{{ row.skillforge }}</div>
    </div>
  </div>
</template>
