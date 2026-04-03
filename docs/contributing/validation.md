---
title: "Validation"
description: "Checks to run before opening a SkillForge pull request."
---

# Validation

Before you open a pull request, run the checks already defined by the repo.

## Core checks

```bash
pytest
python -m py_compile llm_delegator_mcp.py src/orchestrator_mcp/*.py
python scripts/check_public_repo.py
```

## Docs checks

If you changed docs, theme code, or marketplace presentation:

```bash
npm run docs:build
```

## Review checklist

- Keep the change small and reviewable.
- Do not commit local paths, caches, or secrets.
- Keep docs aligned with the real repo behavior.
- Prefer precise install or export instructions over aspirational copy.
