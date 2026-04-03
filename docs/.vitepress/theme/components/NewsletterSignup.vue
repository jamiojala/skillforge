<script setup lang="ts">
import { getPageUrl } from '../lib/catalog'
</script>

<template>
  <aside class="sf-newsletter">
    <p class="sf-kicker">Stay in the loop</p>
    <h3>SkillForge ships in public.</h3>
    <p>
      There is no glossy marketing backend here. Follow GitHub, watch the roadmap, and track the
      next wave of packs as they land.
    </p>
    <div class="sf-inline-actions">
      <a class="sf-btn sf-btn--primary" href="https://github.com/jamiojala/skillforge">Watch on GitHub</a>
      <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/roadmap')">View roadmap</a>
    </div>
  </aside>
</template>
