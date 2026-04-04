<script setup lang="ts">
import { getPageUrl } from '../lib/catalog'
</script>

<template>
  <div class="sf-open-source-badges">
    <a :href="getPageUrl('/license')">
      <strong>Apache-2.0 licensed</strong>
      <span>Use it, fork it, redistribute it. No strings attached.</span>
    </a>
    <a :href="getPageUrl('/safety')">
      <strong>Safety-first by design</strong>
      <span>Secret redaction, release scanning, and no shell execution. Constraints are public.</span>
    </a>
    <a href="https://github.com/jamiojala/skillforge">
      <strong>GitHub native</strong>
      <span>Every pack is a real folder. Fork, edit, PR. No hidden backend or proprietary pipeline.</span>
    </a>
  </div>
</template>
