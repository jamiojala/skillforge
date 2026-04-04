<script setup lang="ts">
import ContributorCard from './ContributorCard.vue'
import HeroSection from './HeroSection.vue'
import ProcessSteps from './ProcessSteps.vue'
import ResourceCard from './ResourceCard.vue'
import SupportCTA from './SupportCTA.vue'
import { contributionResources, getPageUrl } from '../lib/catalog'

const contributionSteps = [
  {
    title: 'Fork and create',
    body: 'Add a folder under skills/ with four files: README.md, SKILL.md, skill.yaml, and marketplace.yaml. That is the entire pack.'
  },
  {
    title: 'Validate locally',
    body: 'Run the repo checks before you push. They catch hygiene issues, stale commands, and missing metadata before review.'
  },
  {
    title: 'Open a PR',
    body: 'One pack per PR. Include a clear description of what the pack does, who it helps, and why it belongs in the catalog.'
  },
  {
    title: 'Review',
    body: 'The maintainer checks for clarity, portability, honest claims, and long-term maintainability. Most reviews close within days.'
  },
  {
    title: 'Ship',
    body: 'Once merged, your pack appears in the generated catalog, the docs site, and the CLI export surface. Immediately usable.'
  }
]

const maintainer = {
  name: 'Jami Ojala',
  username: 'jamiojala',
  role: 'Maintainer',
  summary:
    'SkillForge is solo-maintained by design. The contribution path stays simple because the maintenance path has to stay sustainable. Every process choice reflects that reality.',
  stats: ['302 packs shipped', 'GitHub-native workflow', 'Apache-2.0 licensed'],
  badges: ['Solo maintained', 'Open source', 'Fast reviews']
}
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Contribute"
      title="Fork. Add a pack. Open a PR."
      lead="The entire contribution workflow runs on GitHub. No CLI tools to install, no accounts to create, no approval queues. Your work ships when it merges."
    >
      <template #title>
        Fork. Add a pack.<br><span class="sf-gradient-text--primary">Open a PR.</span>
      </template>
      <template #actions>
        <a class="sf-btn sf-btn--primary" href="https://github.com/jamiojala/skillforge">Start on GitHub</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/contributing/')">Read the Full Guide</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Five steps to a shipped pack</p>
        <h2 class="sf-section-heading__title">The workflow is simple because it has to be.</h2>
        <p class="sf-section-heading__lead">
          A solo-maintained project cannot afford a complex contribution pipeline. This one works.
        </p>
      </div>

      <ProcessSteps
        :steps="contributionSteps"
        code-example="# Run these before opening your PR
pytest
python -m py_compile src/orchestrator_mcp/*.py
python scripts/check_public_repo.py
npm run docs:build"
      />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Resources</p>
        <h2 class="sf-section-heading__title">Everything you need to write a strong pack.</h2>
      </div>

      <div class="sf-resource-grid">
        <ResourceCard
          v-for="resource in contributionResources"
          :key="resource.href"
          :eyebrow="resource.eyebrow"
          :title="resource.title"
          :body="resource.body"
          :href="getPageUrl(resource.href)"
        />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Maintainer</p>
        <h2 class="sf-section-heading__title">One person reviews. Decisions are fast.</h2>
      </div>

      <div class="sf-contributor-grid">
        <ContributorCard :contributor="maintainer" />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Best way to get started: study a strong pack, then build your own."
        body="Browse the catalog, pick a pack in your domain, read its manifest, and use the same structure for yours."
        primary-label="Read the Contribution Guide"
        :primary-href="getPageUrl('/contributing/')"
        secondary-label="Browse Example Packs"
        :secondary-href="getPageUrl('/skills/')"
      />
    </section>
  </div>
</template>
