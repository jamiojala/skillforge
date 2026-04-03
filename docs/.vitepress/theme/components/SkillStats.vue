<script setup lang="ts">
import type { SkillEntry } from '../lib/catalog'

defineProps<{
  skill: SkillEntry
}>()
</script>

<template>
  <div class="sf-skill-stats" aria-label="Skill metadata">
    <span class="sf-skill-stats__item">{{ skill.validationTools.length }} hooks</span>
    <span class="sf-skill-stats__item">{{ skill.modelPreferences.length }} models</span>
    <span class="sf-skill-stats__item">{{ skill.portable ? 'Portable' : 'Repo only' }}</span>
  </div>
</template>
