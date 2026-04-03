<script setup lang="ts">
const heroLines = [
  'skillforge browse',
  'skillforge export liquid-glass-enforcer',
  'portable manifests + validation hooks',
  'codex • claude code • kimi code'
]

defineProps<{
  eyebrow: string
  title: string
  lead: string
}>()
</script>

<template>
  <section class="sf-hero">
    <div class="sf-hero__inner">
      <div class="sf-hero__copy">
        <p class="sf-kicker">{{ eyebrow }}</p>
        <h1 class="sf-display">{{ title }}</h1>
        <p class="sf-hero__lead">{{ lead }}</p>
        <div class="sf-hero__actions">
          <slot name="actions" />
        </div>
      </div>

      <div class="sf-hero__visual">
        <slot name="visual">
          <div class="sf-hero-art" aria-hidden="true">
            <div class="sf-hero-art__grid"></div>
            <div class="sf-hero-art__mesh"></div>
            <span class="sf-hero-art__node sf-hero-art__node--a"></span>
            <span class="sf-hero-art__node sf-hero-art__node--b"></span>
            <span class="sf-hero-art__node sf-hero-art__node--c"></span>
            <span class="sf-hero-art__node sf-hero-art__node--d"></span>
            <div class="sf-hero-art__code">
              <div class="sf-hero-art__chips">
                <span class="sf-chip">Open standard</span>
                <span class="sf-chip">Portable packs</span>
                <span class="sf-chip">Validated</span>
              </div>
              <pre>{{ heroLines.join('\n') }}</pre>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
