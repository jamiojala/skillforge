# Frequently Asked Questions

## Do I need the MCP runtime to use the skill packs?

No. You can browse, inspect, and export individual packs without ever running the orchestrator-mcp server. The runtime adds routing, caching, safety checks, and cost controls — but the packs stand alone.

## What clients does SkillForge support?

Codex, Claude Code, Kimi Code, and any MCP-capable client that supports `stdio` transport. The skill packs themselves are portable YAML + markdown and work in any markdown-first agent workflow.

## Why GitHub Pages instead of a wiki?

GitHub Pages gives us a real product surface — versioned docs, proper SEO, custom components, and a marketplace-quality browsing experience. A wiki cannot do that.

## Why both `skill.yaml` and `SKILL.md`?

`skill.yaml` is for structured registries and the orchestrator-mcp runtime. `SKILL.md` is for portability — it works in any agent ecosystem that consumes markdown-based skill packs. Both describe the same pack from different angles.

## Why is Ollama the recommended cheapest default?

Local Ollama (or Ollama Pro) consistently gives the best cost-to-capability ratio for repeated coding work. Cloud providers remain available as specialist fallback through the routing layer.

## Is this really maintained by one person?

Yes. SkillForge is solo-maintained. That is a deliberate choice — it keeps decisions fast, the contribution path simple, and the project honest about what it can sustain. Sponsorship is what makes it viable.

## What license is this under?

Apache-2.0. Use it, fork it, redistribute it. Keep the license terms attached.

## How do I contribute a pack?

Fork the repo, add a folder under `skills/`, include the four required files (README.md, SKILL.md, skill.yaml, marketplace.yaml), run the checks, and open a PR. Full guide: [Contributing](/contributing/).

## How do I sponsor the project?

Through [GitHub Sponsors](https://github.com/sponsors/jamiojala). Monthly and one-time options available. See the [Support](/support) page for tier details and what the money funds.
