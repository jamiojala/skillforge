import { withBase } from 'vitepress'
import rawCatalog from '../../generated/skillforge-catalog.json'

export type SkillCatalog = typeof rawCatalog
export type SkillEntry = SkillCatalog['skills'][number]
export type CollectionEntry = SkillCatalog['collections'][number]
export type SortMode = 'featured' | 'alphabetical' | 'first_party'

export interface SkillFilters {
  query?: string
  collection?: string
  source?: 'all' | 'first_party' | 'global'
  client?: string | null
}

export interface CounterStat {
  value: number
  label: string
  caption: string
  prefix?: string
  suffix?: string
}

export const siteCatalog = rawCatalog
export const primaryClients = ['Codex', 'Claude Code', 'Kimi Code', 'orchestrator-mcp']
export const categoryColors: Record<string, string> = {
  'advanced-packs': '#f97316',
  architecture: '#22c55e',
  frontend: '#06b6d4',
  backend: '#38bdf8',
  qa: '#f59e0b',
  devops: '#ef4444',
  security: '#e11d48',
  data: '#8b5cf6',
  product: '#14b8a6',
  content: '#f97316',
  business: '#a855f7',
  'ai-ml': '#6366f1',
  blockchain: '#ec4899',
  iot: '#84cc16'
}
export const homepageStats: CounterStat[] = [
  {
    value: siteCatalog.stats.totalSkills,
    label: 'Skill packs',
    caption: 'Inspectable manifests you can export or install'
  },
  {
    value: siteCatalog.stats.publicDomains,
    label: 'Domains',
    caption: 'From frontend to security to AI/ML'
  },
  {
    value: siteCatalog.stats.advancedPacks,
    label: 'First-party packs',
    caption: 'Routing, safety, orchestration, and release hygiene'
  },
  {
    value: primaryClients.length,
    label: 'Supported clients',
    caption: 'Codex · Claude Code · Kimi Code · MCP runtime'
  }
]
export const supportReasons = [
  'Keeps the full catalog free to browse and portable to export.',
  'Funds first-party packs, sharper docs, and maintenance that does not rot.',
  'Protects an open workflow surface from turning into vendor-locked prompt glue.'
]
export const contributionResources = [
  {
    title: 'SKILL.md specification',
    body: 'Understand the portable manifest format, writing standards, and expected structure.',
    href: '/contributing/skill-format',
    eyebrow: 'Format'
  },
  {
    title: 'Validation guide',
    body: 'Check your pack locally before you open a pull request.',
    href: '/contributing/validation',
    eyebrow: 'Validation'
  },
  {
    title: 'Reference examples',
    body: 'Study featured packs and domain-leading examples before you submit.',
    href: '/contributing/examples',
    eyebrow: 'Examples'
  },
  {
    title: 'Review process',
    body: 'See what happens after submission, from triage to merge and release.',
    href: '/contributing/review-process',
    eyebrow: 'Review'
  }
]

const featuredIndex = new Map(siteCatalog.featuredSkillSlugs.map((slug, index) => [slug, index]))
const collectionIndex = new Map(siteCatalog.collections.map((collection) => [collection.slug, collection]))

export function getPageUrl(path: string) {
  if (path.endsWith('/') || path.includes('?') || path.endsWith('.html')) {
    return withBase(path)
  }
  return withBase(`${path}.html`)
}

export function getSkillUrl(slug: string) {
  return getPageUrl(`/skills/${slug}`)
}

export function getGitHubPackUrl(skill: SkillEntry) {
  return `https://github.com/jamiojala/skillforge/tree/main/${skill.folder}`
}

export function getDomainQueryValue(skill: SkillEntry) {
  return skill.publicDomain === 'ai_ml' ? 'ai-ml' : skill.publicDomain
}

export function getCatalogFilterUrl(collectionSlug: string) {
  const domain = collectionSlug === 'ai_ml' ? 'ai-ml' : collectionSlug
  if (domain === 'all') return getPageUrl('/skills/')
  return getPageUrl(`/skills/?domain=${domain}`)
}

export function getCollectionBySlug(slug: string) {
  return collectionIndex.get(slug)
}

export function getSkillBySlug(slug: string) {
  return siteCatalog.skills.find((skill) => skill.slug === slug)
}

export function getFeaturedSkills(limit?: number) {
  return siteCatalog.featuredSkillSlugs
    .map((slug) => getSkillBySlug(slug))
    .filter((skill): skill is SkillEntry => Boolean(skill))
    .slice(0, limit)
}

export function isFirstPartySkill(skill: SkillEntry) {
  return skill.source === 'first_party'
}

export function getCategoryColor(category: string) {
  return categoryColors[category] ?? categoryColors['advanced-packs']
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function getCompatibilityOptions() {
  return primaryClients.filter((client) =>
    siteCatalog.skills.some((skill) => skill.compatibility.includes(client))
  )
}

export function getDisplayCompatibility(skill: SkillEntry, limit = 3) {
  return skill.compatibility
    .filter((tool) => primaryClients.includes(tool) || tool === 'Portable SKILL.md')
    .slice(0, limit)
}

export function sortSkills(skills: SkillEntry[], mode: SortMode = 'featured') {
  return [...skills].sort((left, right) => {
    if (mode === 'alphabetical') {
      return left.name.localeCompare(right.name)
    }

    if (mode === 'first_party') {
      if (isFirstPartySkill(left) !== isFirstPartySkill(right)) {
        return isFirstPartySkill(left) ? -1 : 1
      }
      return left.name.localeCompare(right.name)
    }

    const leftFeatured = featuredIndex.has(left.slug) ? featuredIndex.get(left.slug)! : Number.POSITIVE_INFINITY
    const rightFeatured = featuredIndex.has(right.slug) ? featuredIndex.get(right.slug)! : Number.POSITIVE_INFINITY

    if (leftFeatured !== rightFeatured) return leftFeatured - rightFeatured

    if (isFirstPartySkill(left) !== isFirstPartySkill(right)) {
      return isFirstPartySkill(left) ? -1 : 1
    }

    return left.name.localeCompare(right.name)
  })
}

export function matchesCollection(skill: SkillEntry, collection: string) {
  if (collection === 'all') return true
  if (collection === 'advanced-packs') return skill.source === 'first_party'
  if (collection === 'ai-ml') return skill.publicDomain === 'ai_ml'
  return skill.publicDomain === collection
}

export function filterSkills(
  skills: SkillEntry[],
  queryOrFilters: string | SkillFilters = '',
  collection = 'all'
) {
  const filters =
    typeof queryOrFilters === 'string'
      ? {
          query: queryOrFilters,
          collection,
          source: 'all' as const,
          client: null
        }
      : {
          query: '',
          collection: 'all',
          source: 'all' as const,
          client: null,
          ...queryOrFilters
        }

  const search = filters.query.trim().toLowerCase()

  return sortSkills(
    skills.filter((skill) => {
      if (!matchesCollection(skill, filters.collection ?? 'all')) return false
      if (filters.source === 'first_party' && !isFirstPartySkill(skill)) return false
      if (filters.source === 'global' && isFirstPartySkill(skill)) return false
      if (filters.client && !skill.compatibility.includes(filters.client)) return false
      if (!search) return true

      const haystack = [
        skill.name,
        skill.purpose,
        skill.publicDomainLabel,
        skill.sourceLabel,
        ...skill.keywords,
        ...skill.validationTools
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(search)
    })
  )
}

export function getRelatedSkills(skill: SkillEntry) {
  return skill.relatedSlugs
    .map((slug) => getSkillBySlug(slug))
    .filter((entry): entry is SkillEntry => Boolean(entry))
}
