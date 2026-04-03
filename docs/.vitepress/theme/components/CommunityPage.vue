<script setup lang="ts">
import ContributorCard from './ContributorCard.vue'
import HeroSection from './HeroSection.vue'
import ResourceCard from './ResourceCard.vue'
import SupportCTA from './SupportCTA.vue'
import { getPageUrl, homepageStats } from '../lib/catalog'

const communityResources = [
  {
    eyebrow: 'GitHub',
    title: 'Issues and pull requests',
    body: 'SkillForge collaboration happens in the open today, directly in the repo.',
    href: 'https://github.com/jamiojala/skillforge'
  },
  {
    eyebrow: 'Roadmap',
    title: 'What ships next',
    body: 'Track the planned direction, product gaps, and docs work without waiting for private updates.',
    href: getPageUrl('/roadmap')
  },
  {
    eyebrow: 'Support',
    title: 'Why sponsorship matters',
    body: 'Funding helps the catalog stay fast, polished, and actively maintained without a paywall.',
    href: getPageUrl('/support')
  }
]

const maintainer = {
  name: 'Jami Ojala',
  username: 'jamiojala',
  role: 'Maintainer',
  summary:
    'The current community surface is intentionally small: GitHub-first collaboration, readable docs, and a workflow that can grow without collapsing under solo maintenance.',
  stats: [`${homepageStats[0].value} skills`, `${homepageStats[1].value} public domains`, 'One generated catalog'],
  badges: ['Open source', 'GitHub Pages', 'Solo-maintainer friendly']
}
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Community"
      title="Built in public, designed to stay legible."
      lead="SkillForge does not pretend to have a giant community machine behind it. The current community surface is GitHub-native, transparent, and meant to scale honestly."
    >
      <template #actions>
        <a class="sf-btn sf-btn--primary" href="https://github.com/jamiojala/skillforge">Join on GitHub</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/contribute')">Contribute a Pack</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Where collaboration happens</p>
        <h2 class="sf-section-heading__title">Today’s community layer is intentionally small and real.</h2>
      </div>

      <div class="sf-resource-grid">
        <ResourceCard
          v-for="resource in communityResources"
          :key="resource.title"
          :eyebrow="resource.eyebrow"
          :title="resource.title"
          :body="resource.body"
          :href="resource.href"
        />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Maintainer context</p>
        <h2 class="sf-section-heading__title">Designed for momentum without hidden operations overhead.</h2>
      </div>

      <div class="sf-contributor-grid">
        <ContributorCard :contributor="maintainer" />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Want to help the community surface grow?"
        body="The fastest wins are still simple: contribute a pack, improve the docs, file a focused issue, or sponsor the maintenance work."
        primary-label="Build with SkillForge"
        :primary-href="getPageUrl('/contribute')"
        secondary-label="Support the Infrastructure"
        :secondary-href="getPageUrl('/support')"
      />
    </section>
  </div>
</template>
