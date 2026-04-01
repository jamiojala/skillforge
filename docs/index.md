<section class="omcp-hero">
  <div class="omcp-hero__inner">
    <div class="omcp-hero__copy">
      <p class="omcp-eyebrow">Local-first MCP orchestration</p>
      <h1>One orchestration layer for every serious coding model.</h1>
      <p class="omcp-hero__lead">
        Run a shared local MCP server for Codex, Claude Code, Kimi Code, Ollama, Gemini, and NVIDIA-backed models.
        Or use this repo purely as a portable skill marketplace and export the packs you want.
      </p>
      <div class="omcp-hero__actions" markdown="1">
        [Get started](quickstart.md){ .md-button .md-button--primary }
        [Browse marketplace](marketplace.md){ .md-button }
        [View on GitHub](https://github.com/jamiojala/orchestrator-mcp){ .md-button }
      </div>
    </div>
    <div class="omcp-hero__visual" aria-hidden="true">
      <span class="omcp-signal omcp-signal--alpha">Budget routing</span>
      <span class="omcp-signal omcp-signal--beta">Semantic cache</span>
      <span class="omcp-signal omcp-signal--gamma">Skill exports</span>
      <span class="omcp-signal omcp-signal--delta">Safe fallback</span>
      <span class="omcp-signal omcp-signal--epsilon">MCP-compatible</span>
    </div>
  </div>
</section>

<div class="omcp-trust-strip" aria-label="Supported clients and providers">
  <span>Codex</span>
  <span>Claude Code</span>
  <span>Kimi Code</span>
  <span>Ollama</span>
  <span>Gemini</span>
  <span>NVIDIA-backed models</span>
</div>

## Why it matters

Most agent setups are fragmented.

You use one model for repo-native implementation, another for long-form reasoning, another for multimodal review, and maybe Ollama for cheap local capacity. `orchestrator-mcp` turns that sprawl into one reusable local layer with routing, safety, caching, fallback logic, and observability.

<div class="omcp-triptych" markdown="1">
  <div>
    <p class="omcp-kicker">The stack</p>
    ### Different models win different moments

    Repo-native implementation, long-form reasoning, IDE-first iteration, multimodal review, and cheap local capacity rarely live in one client.
  </div>
  <div>
    <p class="omcp-kicker">The layer</p>
    ### Keep orchestration local and reusable

    Run one shared MCP surface across tools instead of rebuilding routing, safety rules, and prompt glue in every editor.
  </div>
  <div>
    <p class="omcp-kicker">The payoff</p>
    ### Spend less and lose less context

    Route by budget, cache repeated work, export portable skills, and keep fallback logic visible instead of buried in ad hoc prompts.
  </div>
</div>

<div class="omcp-feature-band" markdown="1">
  <div>
    **Local-first MCP server**  
    Shared orchestration surface for MCP-capable coding clients.
  </div>
  <div>
    **Portable skill marketplace**  
    Export standalone skill packs with `SKILL.md`, `skill.yaml`, and marketplace metadata.
  </div>
  <div>
    **Safety by default**  
    Secret redaction, malicious prompt blocking, release hygiene scanning, and model validation.
  </div>
  <div>
    **Cost-aware routing**  
    Fallback chains, budget pressure, local-first modes, and semantic caching.
  </div>
</div>

## Install in minutes

=== "Codex"

    ```bash
    codex mcp add orchestrator -- python -m orchestrator_mcp.cli serve
    ```

=== "Claude Code"

    ```bash
    claude mcp add orchestrator -- python -m orchestrator_mcp.cli serve
    ```

=== "Kimi Code"

    Use a local MCP server with `stdio` transport:

    - Command: `python`
    - Args: `-m orchestrator_mcp.cli serve`

Use the Python executable that installed the package. If your system uses `python3` instead of `python`, swap the command accordingly.

See the full [one-paste install guide](one-paste-installs.md).

## Use it two ways

<div class="omcp-paths" markdown="1">
  <div class="omcp-path">
    <p class="omcp-kicker">Path 01</p>
    ### Run the MCP server

    Shared routing, safety, caching, fallback logic, and observability for every client that can talk MCP.

    ```bash
    pip install "orchestrator-mcp[dashboard]"
    cp .env.example .env
    cp orchestrator-mcp.yaml.example orchestrator-mcp.yaml
    orchestrator-mcp doctor
    orchestrator-mcp serve
    ```
  </div>
  <div class="omcp-path">
    <p class="omcp-kicker">Path 02</p>
    ### Use only the skill marketplace

    Browse the catalog, inspect a pack, and export only the skills you want to reuse elsewhere.

    ```bash
    orchestrator-mcp skills list
    orchestrator-mcp skills show liquid-glass-enforcer
    orchestrator-mcp skills export liquid-glass-enforcer --to ./exported-skills
    ```
  </div>
</div>

## Portable marketplace, not lock-in

<div class="omcp-marketplace" markdown="1">
  <div>
    <p class="omcp-kicker">Marketplace highlight</p>
    ### Take the packs without taking the runtime

    The marketplace ships a 100-skill core catalog across 10 domains, plus curated first-party packs that already know how to travel between agent ecosystems.

    What you keep:

    - Backward-compatible MCP tools
    - Exportable `SKILL.md` packs
    - Rich marketplace metadata
    - GitHub Pages publishing baked in
  </div>
  <div>
    ```bash
    orchestrator-mcp skills list
    orchestrator-mcp skills show micro-frontend-orchestrator
    orchestrator-mcp skills export-category --category frontend --to ./exported-skills
    ```

    Start with the [marketplace](marketplace.md) for the catalog, or jump to [quickstart](quickstart.md) if you want the full local server.
  </div>
</div>

<div class="omcp-cta" markdown="1">
### Start with the surface you need today

Use the full runtime if you want shared routing and observability. Export only the marketplace if you just want portable skills.

[Open Quickstart](quickstart.md){ .md-button .md-button--primary }
[See one-paste installs](one-paste-installs.md){ .md-button }
[Read the marketplace guide](marketplace.md){ .md-button }
</div>
