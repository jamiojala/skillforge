<script setup lang="ts">
import { getPageUrl } from '../lib/catalog'
</script>

<template>
  <footer class="sf-site-footer">
    <div class="sf-site-footer__brand">
      <p class="sf-eyebrow">SkillForge</p>
      <p>
        Open-source AI tooling for teams that want their orchestration layer and skill marketplace to
        feel like serious infrastructure.
      </p>
    </div>

    <nav class="sf-site-footer__links" aria-label="Footer">
      <a :href="getPageUrl('/skills/')">Skills</a>
      <a :href="getPageUrl('/quickstart')">Quickstart</a>
      <a :href="getPageUrl('/marketplace')">Marketplace</a>
      <a :href="getPageUrl('/about')">About</a>
      <a href="https://github.com/jamiojala/skillforge">GitHub</a>
      <a href="https://github.com/sponsors/jamiojala">GitHub Sponsors</a>
    </nav>
  </footer>
</template>
