<script setup lang="ts">
defineProps<{
  mobile?: boolean
}>()
</script>

<template>
  <a class="sf-nav-sponsor" :class="{ 'sf-nav-sponsor--mobile': mobile }" href="https://github.com/sponsors/jamiojala">
    Sponsor
  </a>
</template>
