<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import SponsorGrid from './SponsorGrid.vue'
import SponsorTier from './SponsorTier.vue'
import SupportCTA from './SupportCTA.vue'
import { getPageUrl, supportReasons } from '../lib/catalog'

const tiers = [
  {
    name: 'Supporter',
    price: '$10/mo',
    body: 'A straightforward way to keep the lights on and the catalog free.',
    benefits: ['Name on public sponsor wall', 'Early visibility into roadmap updates', 'Direct signal that the work matters'],
    cta: 'Sponsor on GitHub',
    link: 'https://github.com/sponsors/jamiojala'
  },
  {
    name: 'Advocate',
    price: '$50/mo',
    body: 'For teams that rely on the packs and want faster iteration on the surrounding product surface.',
    benefits: ['Everything in Supporter', 'Priority sponsor acknowledgement', 'Extra context on big roadmap shifts'],
    cta: 'Become an Advocate',
    link: 'https://github.com/sponsors/jamiojala'
  },
  {
    name: 'Champion',
    price: '$250/mo',
    body: 'For organizations that want to help shape a public, portable AI capability layer.',
    benefits: ['Everything in Advocate', 'Quarterly maintainer sync by arrangement', 'Visible support for open infrastructure'],
    cta: 'Back SkillForge',
    link: 'https://github.com/sponsors/jamiojala'
  }
]
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Support"
      title="Support the infrastructure"
      lead="SkillForge stays free to browse because the core bet is openness. Sponsorship helps pay for the maintenance, polish, and first-party packs that make the catalog usable."
    >
      <template #actions>
        <a class="sf-btn sf-btn--primary" href="https://github.com/sponsors/jamiojala">Sponsor on GitHub</a>
        <a class="sf-btn sf-btn--secondary" href="https://github.com/jamiojala/skillforge">View the repo</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Why support matters</p>
        <h2 class="sf-section-heading__title">The goal is sharper infrastructure, not gated access.</h2>
      </div>

      <div class="sf-grid sf-grid--3">
        <article v-for="reason in supportReasons" :key="reason" class="sf-resource-card">
          <p class="sf-resource-card__eyebrow">Support</p>
          <p>{{ reason }}</p>
        </article>
      </div>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Sponsor tiers</p>
        <h2 class="sf-section-heading__title">Transparent, GitHub-native support options.</h2>
      </div>

      <div class="sf-sponsor-grid">
        <SponsorTier v-for="tier in tiers" :key="tier.name" :tier="tier" />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Current sponsors</p>
        <h2 class="sf-section-heading__title">Public supporters will appear here.</h2>
      </div>

      <SponsorGrid :sponsors="[]" />
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Prefer to help without money?"
        body="Open a high-quality pull request, improve the docs, file focused issues, or share the project with the teams already juggling multiple coding agents."
        primary-label="Build with SkillForge"
        :primary-href="getPageUrl('/contribute')"
        secondary-label="Browse Skills"
        :secondary-href="getPageUrl('/skills/')"
      />
    </section>
  </div>
</template>
