---
title: "Skill Format"
description: "What a portable SkillForge pack should contain."
---

# Skill format

Portable SkillForge packs are folder-based. A strong pack usually includes:

- `README.md` for human context
- `SKILL.md` for the actual reusable pack behavior
- `skill.yaml` for structured metadata
- `marketplace.yaml` for marketplace-facing presentation

## Folder shape

```text
skills/
  my-skill/
    README.md
    SKILL.md
    skill.yaml
    marketplace.yaml
```

## What good packs do

- State a clear purpose in one sentence.
- Define realistic trigger language.
- Make the best use case obvious.
- Stay portable across clients where possible.
- Avoid vague or tool-locked instructions unless the pack truly depends on them.

## What to avoid

- Marketing copy instead of operational guidance
- Commands that do not exist in this repo
- Client-specific assumptions hidden inside a “portable” pack
- Missing metadata or stale install surfaces
