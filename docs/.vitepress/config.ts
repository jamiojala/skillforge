import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SkillForge',
  titleTemplate: ':title | SkillForge',
  description:
    'The operating system for AI capabilities: a portable skill marketplace and local-first orchestration layer for serious multi-model workflows.',
  lang: 'en-US',
  base: '/skillforge/',
  lastUpdated: true,
  cleanUrls: false,
  appearance: 'dark',
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('skillforge-catalog.json')) return 'skillforge-catalog'
            if (id.includes('docs/.vitepress/theme/components')) return 'skillforge-theme'
          }
        }
      }
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/skillforge/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap'
      }
    ],
    ['meta', { name: 'theme-color', content: '#0d1015' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SkillForge' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Portable skill packs, open-source docs, and a local orchestration layer for teams shipping with multiple coding agents.'
      }
    ]
  ],
  themeConfig: {
    logo: {
      src: '/logo-mark.svg',
      alt: 'SkillForge'
    },
    nav: [
      {
        text: 'Discover',
        link: '/discover'
      },
      {
        text: 'Browse',
        items: [
          { text: 'All Skills', link: '/skills/' },
          { text: 'Advanced Packs', link: '/skills/?domain=advanced-packs' },
          { text: 'Architecture', link: '/skills/?domain=architecture' },
          { text: 'Frontend', link: '/skills/?domain=frontend' },
          { text: 'SkillForge 2.0', link: '/skillforge-2-0/' }
        ]
      },
      {
        text: 'Build',
        items: [
          { text: 'Contribute', link: '/contribute' },
          { text: 'Contribution Guide', link: '/contributing/' },
          { text: 'Skill Format', link: '/contributing/skill-format' },
          { text: 'Review Process', link: '/contributing/review-process' }
        ]
      },
      {
        text: 'Community',
        items: [
          { text: 'Community', link: '/community' },
          { text: 'Support', link: '/support' },
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'About', link: '/about' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Quickstart', link: '/quickstart' },
          { text: 'Safety', link: '/safety' },
          { text: 'Providers', link: '/providers' },
          { text: 'Benchmarks', link: '/benchmarks' }
        ]
      }
    ],
    sidebar: {
      '/contributing/': [
        {
          text: 'Build with SkillForge',
          items: [
            { text: 'Overview', link: '/contributing/' },
            { text: 'Skill Format', link: '/contributing/skill-format' },
            { text: 'Validation', link: '/contributing/validation' },
            { text: 'Examples', link: '/contributing/examples' },
            { text: 'Review Process', link: '/contributing/review-process' },
            { text: 'Recognition', link: '/contributing/recognition' }
          ]
        }
      ],
      '/skillforge-2-0/': [
        {
          text: 'SkillForge 2.0',
          items: [
            { text: 'Overview', link: '/skillforge-2-0/' },
            { text: 'Package Overview', link: '/skillforge-2-0/package-overview' },
            { text: 'Living Agent Capabilities', link: '/skillforge-2-0/living-agent-capabilities' },
            { text: 'Vision', link: '/skillforge-2-0/vision' },
            { text: 'Marketplace Strategy', link: '/skillforge-2-0/marketplace-strategy' },
            { text: 'Marketing Plan', link: '/skillforge-2-0/marketing-virality-plan' },
            { text: 'Final Summary', link: '/skillforge-2-0/final-summary' }
          ]
        }
      ],
      '/': [
        {
          text: 'Start Here',
          items: [
            { text: 'Discover', link: '/discover' },
            { text: 'Skills', link: '/skills/' },
            { text: 'Quickstart', link: '/quickstart' },
            { text: 'One-Paste Installs', link: '/one-paste-installs' },
            { text: 'Contribute', link: '/contribute' },
            { text: 'Community', link: '/community' },
            { text: 'Support', link: '/support' },
            { text: 'About', link: '/about' }
          ]
        },
        {
          text: 'Skill Library',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/skills/' },
            { text: 'Persona Architecture', link: '/persona-architecture' },
            { text: 'Advanced Packs', link: '/skills-categories/advanced-packs' },
            { text: 'Architecture & System Design', link: '/skills-categories/architecture' },
            { text: 'Frontend Engineering', link: '/skills-categories/frontend' },
            { text: 'Backend & API Design', link: '/skills-categories/backend' },
            { text: 'Quality Assurance', link: '/skills-categories/qa' },
            { text: 'DevOps & Infrastructure', link: '/skills-categories/devops' },
            { text: 'Security & Compliance', link: '/skills-categories/security' },
            { text: 'Data & Analytics', link: '/skills-categories/data' },
            { text: 'Product & UX', link: '/skills-categories/product' },
            { text: 'Content & Communication', link: '/skills-categories/content' },
            { text: 'Business & Operations', link: '/skills-categories/business' },
            { text: 'AI/ML Engineering', link: '/skills-categories/ai-ml' },
            { text: 'Blockchain & Web3 Engineering', link: '/skills-categories/blockchain' },
            { text: 'IoT & Edge Computing', link: '/skills-categories/iot' }
          ]
        },
        {
          text: 'Reference',
          collapsed: true,
          items: [
            { text: 'Safety', link: '/safety' },
            { text: 'Providers', link: '/providers' },
            { text: 'Cost Routing', link: '/cost-routing' },
            { text: 'Dashboard', link: '/dashboard' },
            { text: 'Benchmarks', link: '/benchmarks' },
            { text: 'Theme Architecture', link: '/theme-architecture' },
            { text: 'FAQ', link: '/faq' },
            { text: 'Roadmap', link: '/roadmap' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/jamiojala/skillforge' }],
    search: {
      provider: 'local'
    },
    outline: [2, 3],
    outlineTitle: 'On this page',
    editLink: {
      pattern: 'https://github.com/jamiojala/skillforge/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  }
})
