---
title: "Review Process"
description: "How SkillForge pull requests are evaluated and what helps them merge faster."
---

# Review Process

SkillForge is solo-maintained. Reviews are fast because the bar is clear and the process is simple.

## What the maintainer checks

1. **Does the pack solve a real problem?** If the use case is not obvious within 10 seconds of reading the README, it needs work.
2. **Is it portable?** Packs that only work in one client need a strong justification for being in a portable catalog.
3. **Do the docs match reality?** Commands, examples, and install instructions must reflect how the repo actually works today.
4. **Is it maintainable?** Will this pack still make sense in six months without constant updates?

## What helps your PR merge faster

- **One pack per PR.** Focused changes review faster and merge cleaner.
- **Honest examples.** Show what the pack actually does, not what you wish it did.
- **Passing checks.** Run `pytest`, the compile check, the repo hygiene scan, and `npm run docs:build` before submitting.
- **Clear description.** Explain what changed, why it matters, and who benefits.

## What slows review down

- Mixed unrelated changes in one PR
- Missing or stale documentation
- Hidden assumptions about proprietary tools
- Packs that duplicate existing catalog entries without explaining the improvement
- Public repo hygiene issues (leaked paths, credentials, or local-only references)

## Timeline

Most reviews close within a few days. Complex packs or packs in unfamiliar domains may take longer. If your PR sits without feedback for more than a week, ping the maintainer — it is not intentional.
