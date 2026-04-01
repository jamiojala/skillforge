import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const skillsRoot = path.join(repoRoot, 'skills')
const docsRoot = path.join(repoRoot, 'docs')
const generatedRoot = path.join(docsRoot, '.vitepress', 'generated')
const docsSkillsRoot = path.join(docsRoot, 'skills')
const docsCategoriesRoot = path.join(docsRoot, 'skills-categories')
const sponsorUrl = 'https://github.com/sponsors/jamiojala'

const broadDomains = {
  architecture: {
    label: 'Architecture',
    collectionTitle: 'Architecture & System Design',
    description: 'System boundaries, migration seams, infra choreography, and platform structure.'
  },
  frontend: {
    label: 'Frontend',
    collectionTitle: 'Frontend Engineering',
    description: 'High-end UI systems, interface performance, interaction depth, and implementation craft.'
  },
  backend: {
    label: 'Backend',
    collectionTitle: 'Backend & API Design',
    description: 'Contracts, integrations, data flow, failure handling, and API correctness.'
  },
  qa: {
    label: 'QA',
    collectionTitle: 'Quality Assurance',
    description: 'Regression hunting, deterministic testing, failure replay, and confidence building.'
  },
  devops: {
    label: 'DevOps',
    collectionTitle: 'DevOps & Infrastructure',
    description: 'Rollouts, platform operations, deploy safety, and environment-aware systems work.'
  },
  security: {
    label: 'Security',
    collectionTitle: 'Security & Compliance',
    description: 'Threat reduction, policy hardening, release hygiene, and trustworthy AI operations.'
  },
  data: {
    label: 'Data',
    collectionTitle: 'Data & Analytics',
    description: 'Analytics models, pipelines, measurement rigor, and data quality under change.'
  },
  product: {
    label: 'Product',
    collectionTitle: 'Product & UX',
    description: 'Workflow clarity, UX systems, operator trust, and product interaction design.'
  },
  content: {
    label: 'Content',
    collectionTitle: 'Content & Communication',
    description: 'Docs, explanations, release messaging, and technically faithful communication.'
  },
  business: {
    label: 'Business',
    collectionTitle: 'Business & Operations',
    description: 'Decision support, operational leverage, financial clarity, and open-source sustainability.'
  },
  ai_ml: {
    label: 'AI/ML',
    collectionTitle: 'AI/ML Engineering',
    description: 'Prompt systems, retrieval, evaluation, model operations, and agentic AI infrastructure.'
  }
}

const categoryPageOrder = [
  'advanced-packs',
  'architecture',
  'frontend',
  'backend',
  'qa',
  'devops',
  'security',
  'data',
  'product',
  'content',
  'business',
  'ai-ml'
]

const domainQueryOrder = ['all', ...categoryPageOrder]

const firstPartySlugs = new Set([
  'agent-handoff-designer',
  'ai-portfolio-router',
  'api-contract-diff',
  'cinematic-upgrade',
  'context-window-cartographer',
  'cost-router-tuner',
  'design-system-drift-audit',
  'docs-sync-guardian',
  'failure-replay-lab',
  'hallucination-regression-hunter',
  'mcp-server-hardening',
  'model-latency-budgeter',
  'multi-agent-prd-breakdown',
  'prompt-injection-firebreak',
  'prompt-pack-documenter',
  'public-repo-sanitizer',
  'retrieval-grounding-optimizer',
  'test-matrix-generator',
  'threat-model-synthesizer',
  'tool-contract-normalizer'
])

const firstPartyDomainOverrides = {
  'agent-handoff-designer': 'product',
  'ai-portfolio-router': 'ai_ml',
  'api-contract-diff': 'backend',
  'cinematic-upgrade': 'frontend',
  'context-window-cartographer': 'ai_ml',
  'cost-router-tuner': 'ai_ml',
  'design-system-drift-audit': 'frontend',
  'docs-sync-guardian': 'content',
  'failure-replay-lab': 'qa',
  'hallucination-regression-hunter': 'ai_ml',
  'mcp-server-hardening': 'security',
  'model-latency-budgeter': 'ai_ml',
  'multi-agent-prd-breakdown': 'product',
  'prompt-injection-firebreak': 'security',
  'prompt-pack-documenter': 'content',
  'public-repo-sanitizer': 'security',
  'retrieval-grounding-optimizer': 'ai_ml',
  'test-matrix-generator': 'qa',
  'threat-model-synthesizer': 'security',
  'tool-contract-normalizer': 'backend'
}

const featuredPriority = [
  'liquid-glass-enforcer',
  'rag-system-architect',
  'cinematic-upgrade',
  'prompt-injection-firebreak',
  'gdpr-by-design-architect',
  'grant-proposal-architect'
]

const requiredPackFiles = ['README.md', 'SKILL.md', 'skill.yaml', 'marketplace.yaml']

function parseScalar(rawValue) {
  const value = rawValue.trim()

  if (value === 'true') return true
  if (value === 'false') return false
  if (/^-?\d+$/.test(value)) return Number(value)

  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\"/g, '"')
  }

  return value
}

function countIndent(line) {
  let indent = 0
  while (indent < line.length && line[indent] === ' ') indent += 1
  return indent
}

function parseYamlSubset(sourceText) {
  const rawLines = sourceText.replace(/\r\n/g, '\n').split('\n')
  const lines = rawLines.map((raw) => ({
    raw,
    indent: countIndent(raw),
    text: raw.trim()
  }))

  function parseBlock(startIndex, indent) {
    const line = lines[startIndex]
    if (!line) return [null, startIndex]
    if (line.indent !== indent) {
      throw new Error(`Invalid indentation at line ${startIndex + 1}: expected ${indent}, received ${line.indent}`)
    }
    if (line.text.startsWith('-')) {
      return parseList(startIndex, indent)
    }
    return parseObject(startIndex, indent)
  }

  function parseObject(startIndex, indent) {
    const output = {}
    let index = startIndex

    while (index < lines.length) {
      const line = lines[index]

      if (!line.text) {
        index += 1
        continue
      }

      if (line.indent < indent) break
      if (line.indent > indent) {
        throw new Error(`Unexpected nested object indentation at line ${index + 1}`)
      }
      if (line.text.startsWith('-')) break

      const separatorIndex = line.text.indexOf(':')
      if (separatorIndex === -1) {
        throw new Error(`Missing key separator at line ${index + 1}`)
      }

      const key = line.text.slice(0, separatorIndex).trim()
      const remainder = line.text.slice(separatorIndex + 1).trim()

      if (remainder === '|') {
        const [blockValue, nextIndex] = parseBlockScalar(index + 1, indent + 2)
        output[key] = blockValue
        index = nextIndex
        continue
      }

      if (!remainder) {
        const nextMeaningfulIndex = findNextMeaningfulLine(index + 1)
        if (nextMeaningfulIndex === -1 || lines[nextMeaningfulIndex].indent <= indent) {
          output[key] = null
          index += 1
          continue
        }
        const [childValue, nextIndex] = parseBlock(nextMeaningfulIndex, lines[nextMeaningfulIndex].indent)
        output[key] = childValue
        index = nextIndex
        continue
      }

      output[key] = parseScalar(remainder)
      index += 1
    }

    return [output, index]
  }

  function parseList(startIndex, indent) {
    const output = []
    let index = startIndex

    while (index < lines.length) {
      const line = lines[index]

      if (!line.text) {
        index += 1
        continue
      }

      if (line.indent < indent) break
      if (line.indent > indent) {
        throw new Error(`Unexpected nested list indentation at line ${index + 1}`)
      }
      if (!line.text.startsWith('-')) break

      const remainder = line.text.slice(1).trim()

      if (remainder === '|') {
        const [blockValue, nextIndex] = parseBlockScalar(index + 1, indent + 2)
        output.push(blockValue)
        index = nextIndex
        continue
      }

      if (!remainder) {
        const nextMeaningfulIndex = findNextMeaningfulLine(index + 1)
        if (nextMeaningfulIndex === -1 || lines[nextMeaningfulIndex].indent <= indent) {
          output.push(null)
          index += 1
          continue
        }
        const [childValue, nextIndex] = parseBlock(nextMeaningfulIndex, lines[nextMeaningfulIndex].indent)
        output.push(childValue)
        index = nextIndex
        continue
      }

      output.push(parseScalar(remainder))
      index += 1
    }

    return [output, index]
  }

  function parseBlockScalar(startIndex, indent) {
    const output = []
    let index = startIndex

    while (index < lines.length) {
      const line = lines[index]

      if (!line.text && line.indent < indent) break
      if (line.text && line.indent < indent) break

      if (!line.raw) {
        output.push('')
        index += 1
        continue
      }

      output.push(line.raw.slice(Math.min(indent, line.raw.length)))
      index += 1
    }

    return [output.join('\n').replace(/\n+$/, ''), index]
  }

  function findNextMeaningfulLine(startIndex) {
    for (let index = startIndex; index < lines.length; index += 1) {
      if (lines[index].text) return index
    }
    return -1
  }

  const [parsed] = parseBlock(findNextMeaningfulLine(0), 0)
  return parsed
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true })
}

function writeFileIfChanged(filePath, nextContent) {
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null
  if (current === nextContent) return
  fs.writeFileSync(filePath, nextContent)
}

function cleanGeneratedMarkdown(directoryPath) {
  if (!fs.existsSync(directoryPath)) return
  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      fs.unlinkSync(path.join(directoryPath, entry.name))
    }
  }
}

function lowerFirst(value) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

function trimSentence(value) {
  return value.replace(/\.\s*$/, '')
}

function normalizeList(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function inferSource(slug) {
  return firstPartySlugs.has(slug) ? 'first_party' : 'superpower_global'
}

function normalizePublicDomain(skill) {
  if (firstPartyDomainOverrides[skill.slug]) {
    return firstPartyDomainOverrides[skill.slug]
  }
  if (Object.prototype.hasOwnProperty.call(broadDomains, skill.internalCategory)) {
    return skill.internalCategory
  }
  throw new Error(`Missing public domain mapping for ${skill.slug} (${skill.internalCategory})`)
}

function buildCompatibility(skill) {
  const compatibility = ['Codex', 'Claude Code', 'Kimi Code', 'orchestrator-mcp']
  if (skill.files.includes('SKILL.md')) compatibility.push('Portable SKILL.md')
  if (skill.files.includes('skill.yaml')) compatibility.push('skill.yaml')
  if (skill.files.includes('marketplace.yaml')) compatibility.push('marketplace.yaml')
  return compatibility
}

function buildBestUseCase(skill) {
  const keywordPhrase = skill.keywords.slice(0, 2).join(' and ')
  const action = lowerFirst(trimSentence(skill.purpose))
  if (keywordPhrase) {
    return `Use ${skill.name} when you need to ${action}, especially when the work is driven by ${keywordPhrase}.`
  }
  return `Use ${skill.name} when you need to ${action}.`
}

function buildInstallCommands(slug) {
  return {
    inspect: [
      'pip install "orchestrator-mcp[dashboard]"',
      `orchestrator-mcp skills show ${slug}`
    ].join('\n'),
    use: [
      `orchestrator-mcp skills export ${slug} --to ./skillforge-packs`,
      '# copy the exported pack into your preferred agent environment'
    ].join('\n'),
    export: [
      `cp -R skills/${slug} ./your-agent-skills/${slug}`,
      `# or open skills/${slug}/SKILL.md in a markdown-first client`
    ].join('\n')
  }
}

function stringifyJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

function toTitle(value) {
  return value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

function buildSkillPageMarkdown(skill) {
  return `---\ntitle: ${skill.name}\ndescription: ${skill.purpose}\nsidebar: false\naside: false\noutline: false\nlastUpdated: false\n---\n\n<SkillDetailPage slug="${skill.slug}" />\n`
}

function buildCatalogPageMarkdown() {
  return `---\ntitle: Skills\ndescription: Browse the SkillForge catalog of portable AI skill packs.\nsidebar: false\naside: false\noutline: false\n---\n\n<SkillsCatalogPage />\n`
}

function buildCategoryPageMarkdown(collection) {
  return `---\ntitle: ${collection.collectionTitle}\ndescription: ${collection.description}\nsidebar: false\naside: false\noutline: false\n---\n\n<SkillsCollectionPage collection="${collection.slug}" />\n`
}

function buildMarketplacePageMarkdown() {
  return `---\ntitle: Marketplace\ndescription: Explore the SkillForge marketplace of portable AI skill packs.\nsidebar: false\naside: false\noutline: false\n---\n\n<SkillsCollectionPage collection="marketplace" />\n`
}

function main() {
  ensureDirectory(generatedRoot)
  ensureDirectory(docsSkillsRoot)
  ensureDirectory(docsCategoriesRoot)

  const skillDirectories = fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right))

  const skills = skillDirectories.map((slug) => {
    const skillDirectory = path.join(skillsRoot, slug)

    for (const fileName of requiredPackFiles) {
      assert(fs.existsSync(path.join(skillDirectory, fileName)), `Missing ${fileName} for ${slug}`)
    }

    const manifest = parseYamlSubset(fs.readFileSync(path.join(skillDirectory, 'marketplace.yaml'), 'utf8'))
    const source = inferSource(slug)
    const internalCategory = String(manifest.category)
    const publicDomain = normalizePublicDomain({
      slug,
      internalCategory
    })
    const publicDomainMeta = broadDomains[publicDomain]
    const files = requiredPackFiles.slice()
    const validationTools = normalizeList(manifest.validation_hooks)
      .map((hook) => hook?.tool)
      .filter(Boolean)
    const modelPreferences = normalizeList([
      manifest.model_preferences?.primary,
      manifest.model_preferences?.fallback,
      manifest.model_preferences?.local_only
    ])
    const keywords = unique(normalizeList(manifest.trigger_conditions?.keywords))
    const filePatterns = unique(normalizeList(manifest.trigger_conditions?.file_patterns))

    assert(manifest.skill_id === slug, `Manifest skill_id mismatch for ${slug}`)
    assert(manifest.name, `Missing name in ${slug}`)
    assert(manifest.superpower, `Missing superpower in ${slug}`)
    assert(publicDomainMeta, `Missing public domain metadata for ${slug}`)

    const skill = {
      slug,
      name: String(manifest.name),
      version: String(manifest.version ?? '1.0.0'),
      purpose: String(manifest.superpower),
      publicDomain,
      publicDomainLabel: publicDomainMeta.label,
      publicDomainTitle: publicDomainMeta.collectionTitle,
      source,
      sourceLabel: source === 'first_party' ? 'Advanced pack' : 'Global library',
      featured: Boolean(manifest.metadata?.featured),
      internalCategory,
      keywords,
      triggerSignals: keywords,
      filePatterns,
      validationTools,
      modelPreferences,
      compatibility: buildCompatibility({ files }),
      installCommands: buildInstallCommands(slug),
      relatedSlugs: [],
      files,
      bestUseCase: '',
      marketplaceBacked: files.includes('marketplace.yaml'),
      portable: files.includes('SKILL.md'),
      folder: `skills/${slug}`
    }

    skill.bestUseCase = buildBestUseCase(skill)
    return skill
  })

  assert(skills.length === skillDirectories.length, 'Skill catalog size does not match folder count')

  const skillsBySlug = new Map(skills.map((skill) => [skill.slug, skill]))

  for (const skill of skills) {
    const related = skills
      .filter((candidate) => candidate.slug !== skill.slug)
      .map((candidate) => {
        const sharedKeywordCount = candidate.keywords.filter((keyword) => skill.keywords.includes(keyword)).length
        const sameDomain = candidate.publicDomain === skill.publicDomain ? 1 : 0
        const sameSource = candidate.source === skill.source ? 1 : 0
        return {
          candidate,
          score: sameDomain * 100 + sharedKeywordCount * 10 + sameSource
        }
      })
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score
        return left.candidate.name.localeCompare(right.candidate.name)
      })
      .slice(0, 3)
      .map((entry) => entry.candidate.slug)

    skill.relatedSlugs = related
  }

  const featuredSkillSlugs = unique([
    ...featuredPriority.filter((slug) => skillsBySlug.has(slug)),
    ...skills.filter((skill) => skill.featured).map((skill) => skill.slug),
    'cinematic-upgrade',
    'prompt-injection-firebreak'
  ]).slice(0, 6)

  const categoryCounts = Object.fromEntries(
    Object.keys(broadDomains).map((slug) => [slug, skills.filter((skill) => skill.publicDomain === slug).length])
  )

  const collections = [
    {
      slug: 'advanced-packs',
      label: 'Advanced Packs',
      collectionTitle: 'Advanced First-Party Packs',
      description: 'First-party orchestration, safety, evaluation, and workflow packs built to push beyond generic prompt libraries.',
      count: skills.filter((skill) => skill.source === 'first_party').length
    },
    ...Object.entries(broadDomains).map(([slug, meta]) => ({
      slug: slug === 'ai_ml' ? 'ai-ml' : slug,
      label: meta.label,
      collectionTitle: meta.collectionTitle,
      description: meta.description,
      count: categoryCounts[slug]
    }))
  ]

  const catalogData = {
    generatedAt: new Date().toISOString(),
    sponsorUrl,
    stats: {
      totalSkills: skills.length,
      advancedPacks: skills.filter((skill) => skill.source === 'first_party').length,
      publicDomains: Object.keys(broadDomains).length,
      featuredSkills: featuredSkillSlugs.length
    },
    trustStrip: [
      { label: `${skills.length} skills`, value: 'Catalog' },
      { label: `${skills.filter((skill) => skill.source === 'first_party').length} advanced packs`, value: 'First-party' },
      { label: 'Codex', value: 'Compatibility' },
      { label: 'Claude Code', value: 'Compatibility' },
      { label: 'Kimi Code', value: 'Compatibility' },
      { label: 'Portable SKILL.md + YAML', value: 'Format' }
    ],
    clients: ['Codex', 'Claude Code', 'Kimi Code', 'orchestrator-mcp', 'Portable SKILL.md + YAML'],
    domainQueryOrder,
    collections,
    featuredSkillSlugs,
    skills
  }

  const publicCatalog = {
    version: 3,
    generatedAt: catalogData.generatedAt,
    summary: {
      total: skills.length,
      first_party: catalogData.stats.advancedPacks,
      superpower_global: skills.length - catalogData.stats.advancedPacks
    },
    skills: skills.map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      purpose: skill.purpose,
      publicDomain: skill.publicDomain,
      source: skill.source,
      featured: skill.featured,
      keywords: skill.keywords,
      compatibility: skill.compatibility,
      validationTools: skill.validationTools,
      installCommands: skill.installCommands,
      relatedSlugs: skill.relatedSlugs,
      category: skill.internalCategory,
      portable: skill.portable,
      marketplace_backed: skill.marketplaceBacked,
      files: skill.files
    }))
  }

  writeFileIfChanged(path.join(generatedRoot, 'skillforge-catalog.json'), stringifyJson(catalogData))
  writeFileIfChanged(path.join(skillsRoot, 'catalog.json'), stringifyJson(publicCatalog))

  cleanGeneratedMarkdown(docsSkillsRoot)
  cleanGeneratedMarkdown(docsCategoriesRoot)

  const oldCatalogPage = path.join(docsRoot, 'skills.md')
  if (fs.existsSync(oldCatalogPage)) {
    fs.unlinkSync(oldCatalogPage)
  }

  writeFileIfChanged(path.join(docsSkillsRoot, 'index.md'), buildCatalogPageMarkdown())
  for (const skill of skills) {
    writeFileIfChanged(path.join(docsSkillsRoot, `${skill.slug}.md`), buildSkillPageMarkdown(skill))
  }

  for (const collection of collections) {
    writeFileIfChanged(path.join(docsCategoriesRoot, `${collection.slug}.md`), buildCategoryPageMarkdown(collection))
  }

  writeFileIfChanged(path.join(docsRoot, 'marketplace.md'), buildMarketplacePageMarkdown())

  console.log(`Generated SkillForge site data for ${skills.length} skills.`)
}

main()
