---
title: "Theme Architecture"
description: "Overview of the custom SkillForge VitePress theme implementation."
---

# Theme architecture

The SkillForge site keeps VitePress as the platform and customizes it selectively.

## Theme entry

- `docs/.vitepress/theme/index.ts` extends the default VitePress theme
- Nav CTA and footer are injected through VitePress layout slots
- Page-level marketplace surfaces are implemented as Vue components

## Style system

The design system is split into focused CSS files:

- `styles/vars.css` for tokens and VitePress variable mapping
- `styles/typography.css` for type hierarchy and global text rules
- `styles/animations.css` for restrained motion
- `styles/components.css` for layout, nav, hero, footer, and page primitives
- `styles/cards.css` for the marketplace card system

## Data model

- `docs/.vitepress/generated/skillforge-catalog.json` is the generated catalog source
- `docs/.vitepress/theme/lib/catalog.ts` provides helper functions for URLs, filtering, sorting, category colors, and verified stats

## Core components

- `LandingPage.vue` powers the homepage
- `SkillsCatalogPage.vue` powers the searchable catalog
- `SkillDetailPage.vue` powers generated skill pages
- `DiscoverPage.vue`, `ContributePage.vue`, `CommunityPage.vue`, and `SupportPage.vue` power the new marketplace routes
- Shared primitives like `HeroSection.vue`, `SkillCard.vue`, `TrustBar.vue`, and `SupportCTA.vue` keep the system reusable

## Maintainability notes

- The skill content pipeline remains file-based and GitHub-native
- The site still builds as static output for GitHub Pages
- No extra frontend runtime dependencies were added for the redesign
