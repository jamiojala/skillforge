# About

`orchestrator-mcp` exists because serious coding workflows are already multi-model, multi-client, and messy by default.

Most teams now mix:

- Codex for repo-native implementation
- Claude Code for planning and review
- Kimi Code for IDE-first iteration
- Ollama for local or subscription-based open-model capacity
- Gemini and NVIDIA-backed models for multimodal review and reasoning-heavy sidecars

This project gives those workflows one shared local layer instead of a pile of editor-specific prompts and brittle hand wiring.

## What the project is optimizing for

- local-first orchestration instead of hidden cloud glue
- reusable skills instead of one-client lock-in
- visible cost controls instead of surprise spend
- safer delegation with redaction, blocking, and release hygiene
- one portable surface for MCP-capable coding clients

## What the repo does

The repo works in two modes:

### 1. Local-first MCP server

Run one shared orchestration layer across supported clients with routing, safety, semantic caching, budget-aware fallback, and observability.

### 2. Portable skill marketplace

Browse, inspect, and export standalone skill packs with `SKILL.md`, `skill.yaml`, and marketplace metadata, even if you do not want to run the runtime itself.

## Who this is for

This project is a strong fit if you:

- use more than one coding model or agent client
- want a local layer you can inspect and control
- care about budget pressure and fallback behavior
- want reusable skill packs that can travel between ecosystems
- want GitHub Pages docs and repo docs to feel like one coherent product surface
