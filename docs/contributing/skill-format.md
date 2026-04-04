---
title: "Skill Format"
description: "The four-file pack structure that every SkillForge skill follows."
---

# Skill Format

Every SkillForge pack is a folder with four files. No build step, no config generator, no CLI scaffolding required.

## Folder structure

```text
skills/
  your-pack-slug/
    README.md            # Human context — what, why, who
    SKILL.md             # The actual reusable pack behavior
    skill.yaml           # Structured metadata for the runtime
    marketplace.yaml     # Marketplace-facing presentation
```

## What each file does

### README.md

Human-readable context for anyone browsing the repo. Explain what the pack does, who it helps, and when to use it. Keep it honest — this is the first thing contributors and reviewers read.

### SKILL.md

The portable skill definition. This is what gets loaded by agents. It includes the pack's role, voice, reasoning steps, and response shape. Write it so that an agent reading this file knows exactly how to behave.

### skill.yaml

Structured metadata for the orchestrator-mcp runtime. Includes trigger patterns, model preferences, validation hooks, and file targets. This is the machine-readable version of the pack's intent.

### marketplace.yaml

Presentation metadata for the generated catalog. Includes the pack's display name, description, domain category, compatibility flags, and any featured status.

## What good packs do

- State a clear purpose in one sentence
- Define realistic trigger language
- Make the best use case obvious within 10 seconds
- Stay portable across clients where possible
- Avoid vague instructions unless the pack genuinely requires flexibility

## What to avoid

- Marketing copy instead of operational guidance
- Commands that do not exist in this repo
- Client-specific assumptions hidden inside a "portable" pack
- Missing or stale metadata
- Packs that duplicate existing catalog entries without a clear improvement
