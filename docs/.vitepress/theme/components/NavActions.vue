<script setup lang="ts">
import { getPageUrl } from '../lib/catalog'

defineProps<{
  mobile?: boolean
}>()
</script>

<template>
  <div class="sf-nav-actions" :class="{ 'sf-nav-actions--mobile': mobile }">
    <a class="sf-btn sf-btn--primary" :href="getPageUrl('/quickstart')">Get Started</a>
  </div>
</template>
