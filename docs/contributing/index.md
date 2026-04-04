---
title: "Contribution Guide"
description: "Everything you need to contribute a skill pack to SkillForge."
---

# Contribution Guide

SkillForge keeps the contribution path deliberately simple. If you can write a markdown file and open a pull request, you can contribute.

## The short version

1. Fork the repo and create a folder under `skills/<your-pack-slug>/`
2. Add four files: `README.md`, `SKILL.md`, `skill.yaml`, `marketplace.yaml`
3. Run the repo checks locally
4. Open a focused PR with a clear description

That is the entire process.

## What makes a good pack

- **Solves a real problem** in one sentence
- **Defines clear trigger language** so agents know when to activate it
- **Stays portable** across clients where possible
- **Includes honest examples** instead of inflated claims
- **Keeps the manifest readable** by a human, not just a machine

## What to avoid

- Marketing copy where operational guidance should be
- Commands that don't exist in this repo
- Client-specific assumptions hidden inside a "portable" pack
- Missing metadata or stale install references

## Guides

| Guide | What it covers |
|---|---|
| [Skill Format](./skill-format) | The four-file pack structure and what each file does |
| [Validation](./validation) | How to check your pack before submitting |
| [Examples](./examples) | Real packs to study and learn from |
| [Review Process](./review-process) | What the maintainer looks for during review |
| [Recognition](./recognition) | How contributors are acknowledged |
