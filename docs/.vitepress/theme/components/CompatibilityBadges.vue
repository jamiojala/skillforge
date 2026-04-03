<script setup lang="ts">
defineProps<{
  tools: string[]
}>()
</script>

<template>
  <div class="sf-compatibility" aria-label="Compatibility">
    <span v-for="tool in tools" :key="tool" class="sf-compatibility__item">
      {{ tool.replace('Portable SKILL.md', 'Portable') }}
    </span>
  </div>
</template>
