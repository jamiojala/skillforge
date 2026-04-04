# About SkillForge

<p class="omcp-lead">
  SkillForge exists because real developer workflows already span multiple models and clients —
  and the skills you write for one should not be trapped inside it.
</p>

## The problem

Most developers now use more than one coding agent:

- **Codex** for repo-native implementation
- **Claude Code** for planning, review, and complex reasoning
- **Kimi Code** for IDE-first iteration and MCP-heavy workflows
- **Ollama** for cheap local capacity
- **Gemini** and **NVIDIA-backed models** for multimodal review and reasoning fallback

The problem is not access. It is coordination. Without a shared layer, teams end up with duplicated prompts, inconsistent routing, no cost controls, and skills that get trapped inside whichever client happened to be used first.

SkillForge fixes that.

## What the project optimizes for

<div class="omcp-grid omcp-grid--two">
  <article class="omcp-panel">
    <p class="omcp-label">Local-first</p>
    <h3>Orchestration you can inspect</h3>
    <p>
      Routing, fallback logic, caching, and safety checks run locally. You see exactly what happens
      and why.
    </p>
  </article>
  <article class="omcp-panel">
    <p class="omcp-label">Portable</p>
    <h3>Skills that move between clients</h3>
    <p>
      The pack format is designed to travel. Write once, use across Codex, Claude Code, Kimi Code,
      and any MCP-capable client.
    </p>
  </article>
  <article class="omcp-panel">
    <p class="omcp-label">Transparent</p>
    <h3>Every tradeoff is visible</h3>
    <p>
      Budget pressure, fallback behavior, safety constraints, and routing decisions are explicit
      operating choices — not hidden side effects.
    </p>
  </article>
  <article class="omcp-panel">
    <p class="omcp-label">Practical</p>
    <h3>Low adoption friction</h3>
    <p>
      Standard stdio installs. Straightforward config. Exportable packs. Working software matters
      more than demo theatrics.
    </p>
  </article>
</div>

## Two products in one repo

### 1. Local-first MCP runtime

Run one shared orchestration layer across multiple coding clients with cost-aware routing, semantic caching, safety guardrails, budget controls, and a Streamlit dashboard.

### 2. Portable skill marketplace

Browse, inspect, and export 302 standalone skill packs — even if you never run the runtime. Every pack is a real folder with SKILL.md, skill.yaml, marketplace.yaml, and README.md.

## What SkillForge is not

- Not a shell-capable agent that executes local commands
- Not a single-model ideology project
- Not a private prompt library disguised as a product
- Not a marketplace that only exists as runtime output

## Who this is for

SkillForge is a strong fit if you:

- Use more than one coding model or agent client
- Want a local orchestration layer you can inspect and control
- Care about cost discipline and fallback behavior
- Want reusable skill packs that travel between ecosystems
- Expect public docs that feel like a product, not internal notes
