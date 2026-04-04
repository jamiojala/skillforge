# Quickstart

<p class="omcp-lead">
  From zero to a running SkillForge instance in under five minutes. Install the package,
  copy the config, validate, and wire it into your coding agent.
</p>

## 1. Install

```bash
pip install "orchestrator-mcp[dashboard]"
```

::: tip Python version
If your system uses `python3` instead of `python`, substitute that in every command below.
:::

## 2. Configure

```bash
cp .env.example .env
cp orchestrator-mcp.yaml.example orchestrator-mcp.yaml
```

Add only the provider credentials you actually use. Start lean — you can add more later.

## 3. Validate

```bash
orchestrator-mcp doctor
```

Catches missing credentials, config issues, and release-hygiene problems before you wire the runtime into a client.

## 4. Start the server

```bash
orchestrator-mcp serve
```

The runtime is now ready for Codex, Claude Code, Kimi Code, or any `stdio`-capable MCP client.

## 5. Open the dashboard (optional)

```bash
orchestrator-mcp dashboard
```

Live view of recent runs, cache behavior, failures, and estimated spend across all providers.

## What to do next

| Goal | Page |
|---|---|
| Wire into Codex, Claude Code, or Kimi Code | [One-Paste Installs](./one-paste-installs) |
| Just use the skill packs without the runtime | [Skills Catalog](/skills/) |
| Understand the safety model first | [Safety](./safety) |
| Contribute a pack | [Contribute](./contribute) |
