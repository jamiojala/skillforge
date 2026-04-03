<script setup lang="ts">
import ContributorCard from './ContributorCard.vue'
import HeroSection from './HeroSection.vue'
import ProcessSteps from './ProcessSteps.vue'
import ResourceCard from './ResourceCard.vue'
import SupportCTA from './SupportCTA.vue'
import { contributionResources, getPageUrl } from '../lib/catalog'

const contributionSteps = [
  {
    title: 'Create',
    body: 'Start from a real skill folder structure with README, SKILL.md, skill.yaml, and marketplace.yaml.'
  },
  {
    title: 'Validate',
    body: 'Run the repo checks that already protect the public release surface and docs generation path.'
  },
  {
    title: 'Submit',
    body: 'Open a pull request with a focused pack, clean docs, and commands that reflect how the repo really works.'
  },
  {
    title: 'Review',
    body: 'The pack gets checked for clarity, portability, repo hygiene, and whether the contribution stays maintainable.'
  },
  {
    title: 'Publish',
    body: 'Once merged, it becomes part of the generated catalog and the GitHub Pages marketplace surface.'
  }
]

const maintainer = {
  name: 'Jami Ojala',
  username: 'jamiojala',
  role: 'Maintainer',
  summary:
    'SkillForge is maintained with a solo-maintainer bias: fewer hidden systems, stronger GitHub-native workflows, and a contribution path that stays legible under real-world load.',
  stats: ['302 skills on disk', 'GitHub-first workflow', 'MIT licensed'],
  badges: ['Solo maintained', 'Open source', 'Marketplace pipeline']
}
</script>

<template>
  <div class="sf-page">
    <HeroSection
      eyebrow="Build"
      title="Build with SkillForge"
      lead="Share your AI capabilities through a contribution path that stays simple: real files, public review, and a generated marketplace built from the repo itself."
    >
      <template #actions>
        <a class="sf-btn sf-btn--primary" href="https://github.com/jamiojala/skillforge">Submit Your First Skill</a>
        <a class="sf-btn sf-btn--secondary" :href="getPageUrl('/contributing/')">Read the Guide</a>
      </template>
    </HeroSection>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Contribution process</p>
        <h2 class="sf-section-heading__title">The workflow stays GitHub-native on purpose.</h2>
      </div>

      <ProcessSteps
        :steps="contributionSteps"
        code-example="pytest
python -m py_compile llm_delegator_mcp.py src/orchestrator_mcp/*.py
python scripts/check_public_repo.py
npm run docs:build"
      />
    </section>

    <section class="sf-shell sf-section">
      <div class="sf-section-heading">
        <p class="sf-kicker">Creator resources</p>
        <h2 class="sf-section-heading__title">Everything needed to write a pack without guessing.</h2>
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
        <p class="sf-kicker">Maintainer posture</p>
        <h2 class="sf-section-heading__title">Built for longevity, not for process theater.</h2>
      </div>

      <div class="sf-contributor-grid">
        <ContributorCard :contributor="maintainer" />
      </div>
    </section>

    <section class="sf-shell sf-section">
      <SupportCTA
        title="Want the shortest path from idea to merged pack?"
        body="Study a strong example, keep the change small, and make the install surface as honest as the code."
        primary-label="Open Contribution Docs"
        :primary-href="getPageUrl('/contributing/')"
        secondary-label="Browse Example Packs"
        :secondary-href="getPageUrl('/skills/')"
      />
    </section>
  </div>
</template>
