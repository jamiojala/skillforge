<script setup lang="ts">
import ContributorCard from './ContributorCard.vue'
import HeroSection from './HeroSection.vue'
import ResourceCard from './ResourceCard.vue'
import SupportCTA from './SupportCTA.vue'
import { getPageUrl, homepageStats } from '../lib/catalog'

const communityResources = [
  {
    eyebrow: 'Collaborate',
    title: 'Issues and pull requests',
    body: 'Every decision, every discussion, every review happens in the open on GitHub. No private Slack, no hidden Jira board.',
    href: 'https://github.com/jamiojala/skillforge'
  },
  {
    eyebrow: 'Direction',
    title: 'Public roadmap',
    body: 'See what ships next, what is being considered, and what the project is deliberately not building.',
    href: getPageUrl('/roadmap')
  },
  {
    eyebrow: 'Sustainability',
    title: 'Sponsor the work',
    body: 'SkillForge has no corporate backer. Sponsorship is how the catalog stays maintained, the docs stay current, and the project stays independent.',
    href: getPageUrl('/support')
  }
]

const maintainer = {
  name: 'Jami Ojala',
  username: 'jamiojala',
  role: 'Maintainer',
  summary:
    'SkillForge is solo-maintained by design. The community surface stays small and real — GitHub-first, readable, and built to grow without collapsing under operations overhead.',
  stats: [`${homepageStats[0].value} skill packs`, `${homepageStats[1].value} domains`, 'Apache-2.0 licensed'],
  badges: ['Open source', 'GitHub Pages', 'Solo-maintained']
}
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Community"
      title="Small by design. Transparent by default."
      lead="SkillForge doesn't pretend to have a community team. What it has is a public repo, honest docs, and a contribution path that works."
    >
      <template #title>
        Small by design.<br><span class="sf-gradient-text--primary">Transparent by default.</span>
      </template>
      <template #actions>
        <a class="sf-btn sf-btn--primary" href="https://github.com/jamiojala/skillforge">Join on GitHub</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/contribute')">Contribute a Pack</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">How we work</p>
        <h2 class="sf-section-heading__title">Everything happens in public. No exceptions.</h2>
        <p class="sf-section-heading__lead">
          No private channels, no invite-only discussions, no hidden roadmap. If it affects the project,
          it is visible on GitHub.
        </p>
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
        <p class="sf-kicker">Who maintains this</p>
        <h2 class="sf-section-heading__title">One maintainer. Clear ownership. Fast decisions.</h2>
      </div>

      <div class="sf-contributor-grid">
        <ContributorCard :contributor="maintainer" />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="The best way to grow this community is to ship."
        body="Contribute a pack. Improve the docs. File a focused issue. Or sponsor the maintenance that keeps everything running."
        primary-label="Start Contributing"
        :primary-href="getPageUrl('/contribute')"
        secondary-label="Become a Sponsor"
        :secondary-href="getPageUrl('/support')"
      />
    </section>
  </div>
</template>
