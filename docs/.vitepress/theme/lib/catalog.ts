import { withBase } from 'vitepress'
import rawCatalog from '../../generated/skillforge-catalog.json'

export type SkillCatalog = typeof rawCatalog
export type SkillEntry = SkillCatalog['skills'][number]
export type CollectionEntry = SkillCatalog['collections'][number]

export const siteCatalog = rawCatalog

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

export function getFeaturedSkills() {
  return siteCatalog.featuredSkillSlugs
    .map((slug) => getSkillBySlug(slug))
    .filter((skill): skill is SkillEntry => Boolean(skill))
}

export function sortSkills(skills: SkillEntry[]) {
  return [...skills].sort((left, right) => {
    const leftFeatured = featuredIndex.has(left.slug) ? featuredIndex.get(left.slug)! : Number.POSITIVE_INFINITY
    const rightFeatured = featuredIndex.has(right.slug) ? featuredIndex.get(right.slug)! : Number.POSITIVE_INFINITY

    if (leftFeatured !== rightFeatured) return leftFeatured - rightFeatured

    if (left.source !== right.source) {
      return left.source === 'first_party' ? -1 : 1
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

export function filterSkills(skills: SkillEntry[], query: string, collection: string) {
  const search = query.trim().toLowerCase()

  return sortSkills(
    skills.filter((skill) => {
      if (!matchesCollection(skill, collection)) return false
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
