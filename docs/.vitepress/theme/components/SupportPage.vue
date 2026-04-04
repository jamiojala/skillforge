<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import SponsorTier from './SponsorTier.vue'
import SupportCTA from './SupportCTA.vue'
import { getPageUrl } from '../lib/catalog'

const tiers = [
  {
    name: 'Supporter',
    price: '$10/mo',
    body: 'The catalog stays free because people like you fund the work directly.',
    benefits: [
      'Name on the public sponsor wall',
      'Early visibility into roadmap updates',
      'The concrete knowledge that this project continues because of you'
    ],
    cta: 'Start sponsoring',
    link: 'https://github.com/sponsors/jamiojala',
    featured: false
  },
  {
    name: 'Advocate',
    price: '$50/mo',
    body: 'For teams that use SkillForge daily and want the packs to improve faster than they would otherwise.',
    benefits: [
      'Everything in Supporter',
      'Priority acknowledgement in docs and release notes',
      'Input on which packs and domains get built next'
    ],
    cta: 'Become an Advocate',
    link: 'https://github.com/sponsors/jamiojala',
    featured: true
  },
  {
    name: 'Champion',
    price: '$250/mo',
    body: 'For organizations that believe a portable, open skill layer should exist — and want to make sure it does.',
    benefits: [
      'Everything in Advocate',
      'Quarterly maintainer sync (async or call)',
      'Logo on the docs site and README',
      'Direct influence on the project roadmap'
    ],
    cta: 'Back SkillForge',
    link: 'https://github.com/sponsors/jamiojala',
    featured: false
  }
]

const whatMoneyFunds = [
  {
    title: 'New skill packs',
    body: 'Each pack takes 2–4 hours to research, write, validate, and document properly. The catalog grows because someone does the work, not because an LLM auto-generates filler.',
    icon: '+'
  },
  {
    title: 'Ongoing maintenance',
    body: 'Frameworks change. Models evolve. Best practices shift. Without active maintenance, packs start giving bad advice within months.',
    icon: '↻'
  },
  {
    title: 'Docs and tooling',
    body: 'The catalog site, CLI, search, safety checks, CI pipeline, and generated marketplace surface. Infrastructure that makes the packs usable.',
    icon: '◈'
  },
  {
    title: 'Independence',
    body: 'Sponsorship keeps SkillForge independent. No vendor deals, no gated tiers, no rug pulls. The catalog stays free because it is funded directly.',
    icon: '◉'
  }
]
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Support"
      title="This project survives on sponsorship."
      lead="302 skill packs. 14 domains. One maintainer. No corporate backing. Sponsorship is the only thing that keeps this going."
    >
      <template #title>
        This project survives on<br><span class="sf-gradient-text--primary">sponsorship.</span>
      </template>
      <template #actions>
        <a class="sf-btn sf-btn--sponsor sf-btn--lg" href="https://github.com/sponsors/jamiojala">
          <span class="sf-btn__heart" aria-hidden="true">&#9829;</span>
          Sponsor on GitHub
        </a>
        <a class="sf-btn sf-btn--secondary" href="https://github.com/jamiojala/skillforge">View the repo</a>
      </template>
    </HeroSection>

    <!-- Maintainer story -->
    <section class="sf-shell sf-section">
      <div class="sf-maintainer-story">
        <div class="sf-maintainer-story__content">
          <p class="sf-kicker">The maintainer</p>
          <h2 class="sf-section-heading__title">Built by one person. Used by many.</h2>
          <p>
            I build SkillForge because I got tired of rewriting the same skill prompts every time a new
            coding agent launched. The packs should be portable. The manifests should be readable.
            And the whole thing should be free to use.
          </p>
          <p>
            This is not a funded startup. There is no runway, no investors, no team. It is an open-source
            project that runs on focused effort and the direct support of the people who depend on it.
            Every sponsorship dollar goes toward the catalog — not overhead.
          </p>
        </div>
        <div class="sf-maintainer-story__numbers">
          <div class="sf-maintainer-story__stat">
            <strong>302</strong>
            <span>skill packs shipped</span>
          </div>
          <div class="sf-maintainer-story__stat">
            <strong>14</strong>
            <span>domain categories</span>
          </div>
          <div class="sf-maintainer-story__stat">
            <strong>20</strong>
            <span>advanced first-party packs</span>
          </div>
          <div class="sf-maintainer-story__stat">
            <strong>1</strong>
            <span>maintainer</span>
          </div>
        </div>
      </div>
    </section>

    <!-- What money funds -->
    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Where your money goes</p>
        <h2 class="sf-section-heading__title">No vague line items. Here is exactly what the money pays for.</h2>
        <p class="sf-section-heading__lead">
          No "community events" budget. No marketing spend. Four specific things that keep 302 packs useful.
        </p>
      </div>

      <div class="sf-grid sf-grid--2">
        <article v-for="item in whatMoneyFunds" :key="item.title" class="sf-fund-card">
          <span class="sf-fund-card__icon" aria-hidden="true">{{ item.icon }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Sponsor tiers -->
    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Sponsor tiers</p>
        <h2 class="sf-section-heading__title">Pick the level that matches what this saves you.</h2>
        <p class="sf-section-heading__lead">
          All tiers go through GitHub Sponsors. Cancel anytime. One-time donations are also welcome.
        </p>
      </div>

      <div class="sf-sponsor-grid sf-sponsor-grid--featured">
        <SponsorTier v-for="tier in tiers" :key="tier.name" :tier="tier" />
      </div>

      <p class="sf-support-note">
        Prefer a one-time donation? You can do that on
        <a href="https://github.com/sponsors/jamiojala">GitHub Sponsors</a> too ---
        just pick "One-time" instead of "Monthly."
      </p>
    </section>

    <!-- Sponsor wall — invitational empty state -->
    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Sponsor wall</p>
        <h2 class="sf-section-heading__title">People who keep SkillForge alive.</h2>
      </div>

      <div class="sf-sponsor-wall-empty">
        <div class="sf-sponsor-wall-empty__placeholder" aria-hidden="true">
          <span class="sf-sponsor-wall-empty__slot" v-for="n in 6" :key="n">?</span>
        </div>
        <h3>This wall is waiting for its first name.</h3>
        <p>
          If SkillForge saves your team even one hour a week, being the first sponsor sends a real
          signal — to the maintainer, and to every developer deciding whether to depend on this project.
          Early supporters get remembered.
        </p>
        <a class="sf-btn sf-btn--sponsor" href="https://github.com/sponsors/jamiojala">
          <span class="sf-btn__heart" aria-hidden="true">&#9829;</span>
          Be the first sponsor
        </a>
      </div>
    </section>

    <!-- Non-monetary contribution -->
    <section class="sf-shell sf-section">
      <SupportCTA
        title="Not in a position to sponsor? You can still make a difference."
        body="Open a high-quality PR. Improve the docs. File focused issues. Or just share SkillForge with the teams you know are already juggling multiple coding agents."
        primary-label="Contribute on GitHub"
        :primary-href="getPageUrl('/contribute')"
        secondary-label="Browse the Catalog"
        :secondary-href="getPageUrl('/skills/')"
      />
    </section>
  </div>
</template>
