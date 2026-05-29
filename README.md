# Redis SA Skills

A collection of agent skills for Redis solutions architecture by [fcenedes](https://github.com/fcenedes).

## Available Skills

### Token Efficiency

| Skill | Description |
|-------|-------------|
| [caveman](caveman/SKILL.md) | Ultra-compressed communication mode for coding agents. Cuts filler from prose, reviews, commits, and summaries while preserving technical accuracy, code, commands, and safety warnings. 60–80% fewer output tokens. |
| [rtk-cli](rtk-cli/SKILL.md) | Rust Token Killer CLI wrappers for noisy shell output — git diffs, test runs, logs, builds, directory listings, Docker, package managers. Filters and compresses command output to reduce token cost 60–90%. |

### Visualization & Brand

| Skill | Description |
|-------|-------------|
| [redis-brand-ui](redis-brand-ui/SKILL.md) | Apply Redis official brand guidelines to frontend UI implementations. Covers colors, typography, components, dark mode, and HeroUI/NextUI theme configuration. |
| [redis-product-ui](redis-product-ui/SKILL.md) | Build Redis product, dashboard, admin, RedisInsight-like, developer-tool, prototype, and demo UIs using Redis UI Storybook-derived application patterns, tokens, component states, and layouts. |
| [redis-presentation-decks](redis-presentation-decks/SKILL.md) | Create Redis-focused Reveal.js presentation decks for solution architecture, customer briefings, technical workshops, product narratives, QBRs, and sales engineering storytelling. |
| [redis-excalidraw-diagrams](redis-excalidraw-diagrams/SKILL.md) | Create Redis-focused Excalidraw architecture diagrams for caching, vector search, Redis Search, Streams, replication, clustering, observability, and Redis Cloud systems. |
| [redis-lucidchart-diagrams](redis-lucidchart-diagrams/SKILL.md) | Create Redis-focused Lucidchart architecture diagrams, Lucid Standard Import sources, customer workshop visuals, and editable SA handoff files. |

### Testing & Browser Automation

| Skill | Description |
|-------|-------------|
| [playwright-test](playwright-test/SKILL.md) | Author and maintain reliable E2E/UI tests with `@playwright/test`: configs, fixtures, auth state, resilient locators, traces, CI tuning, and flake handling. |
| [playwright-cli-agent](playwright-cli-agent/SKILL.md) | Drive a real browser via Playwright CLI to inspect, operate, screenshot, reproduce UI bugs, and discover stable selectors before authoring tests. |

### RedisInsight

| Skill | Description |
|-------|-------------|
| [redis-insight-plugin](redis-insight-plugin/SKILL.md) | Build, deploy, and validate Redis Insight Workbench visualization plugins: manifests, activation methods, Parcel/Vite builds, iframe rendering, command parsing, Docker deployment, and `/api/plugins` verification. |

### Agent Memory

| Skill | Description |
|-------|-------------|
| [agent-delegation-routing](agent-delegation-routing/SKILL.md) | Route coding work across Codex, Claude Code, local models, and CLI workers with specialist role presets, RTK-aware handoff, ownership, and verification. |
| [agent-delegation-planning](agent-delegation-planning/SKILL.md) | Write delegated coding plans with task/epic structure, required skills, token economy, task status tracking, model/reasoning budget, parallelization, audit, Playwright UI gates, cleanup, and verification. |
| [agent-capability-ledger](agent-capability-ledger/SKILL.md) | Track delivered, partial, missing, blocked, superseded, and proven capabilities before follow-up plans so agents generate delta work instead of redoing old scope. |
| [agent-memory-docker](agent-memory-docker/SKILL.md) | Run a portable local Agent Memory Server Docker stack with Redis 8, then connect Codex, Claude Code, and Claude Desktop to the same shared memory. |
| [agent-memory-coordination](agent-memory-coordination/SKILL.md) | Coordinate parallel agents through shared `agent_memory` prompts, strict file ownership, integration passes, and verification gates. |

## Recommended External Skills

This repo covers Redis SA, demos, workshops, RedisInsight plugins, troubleshooting, and field-engineering workflows. For general-purpose engineering and Redis development best practices, install these external skills alongside this repo. Do not vendor or copy them into this repository.

| Theme | Skill | Install |
|-------|-------|---------|
| Engineering methodology | [Superpowers](https://github.com/claude-plugins/superpowers) | `/plugin install superpowers@claude-plugins-official` |
| Redis development | [`redis-development`](https://github.com/redis/agent-skills) | `npx skills add redis/agent-skills` |
| Skill discovery | `find-skills` | `npx skills add vercel-labs/skills --skill find-skills` |
| Skill creation | `skill-creator` | `npx skills add anthropics/skills --skill skill-creator` |
| Frontend design | `frontend-design` | `npx skills add anthropics/skills --skill frontend-design` |
| React best practices | `vercel-react-best-practices` | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| Web design guidelines | `web-design-guidelines` | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| GitHub Actions | `github-actions-docs` | `npx skills add xixu-me/skills --skill github-actions-docs` |

### Superpowers

General software engineering methodology for coding agents: brainstorming, planning, TDD, debugging, subagent-driven development, code review, and skill authoring.

Claude Code: `/plugin install superpowers@claude-plugins-official`
Codex: Open `/plugins` → Search "Superpowers" → Install Plugin

### Redis Official Skills

Redis maintains an official agent skills repository at [redis/agent-skills](https://github.com/redis/agent-skills). Use `redis-development` for Redis data modeling, data structures, key naming, TTL strategy, Redis Search, RedisVL, vector search, semantic caching, Streams, Pub/Sub, clustering, replication, connection handling, security, observability, and performance optimization.

```bash
npx skills add redis/agent-skills
```

Claude Code: `/plugin marketplace add redis/agent-skills` then `/plugin install redis-development@redis`

### Positioning

- **Superpowers** — general disciplined software engineering workflow
- **redis/agent-skills** — Redis development best practices
- **fcenedes/redis_sa_skills** (this repo) — Redis SA, demos, workshops, visualization, troubleshooting, RedisInsight plugins, field-engineering workflows

Do not duplicate external skills into this repository.

## Installation

Install skills using the Agent Skills CLI:

```bash
# Token efficiency
npx skills add fcenedes/redis_sa_skills --skill caveman
npx skills add fcenedes/redis_sa_skills --skill rtk-cli

# Visualization & brand
npx skills add fcenedes/redis_sa_skills --skill redis-brand-ui
npx skills add fcenedes/redis_sa_skills --skill redis-product-ui
npx skills add fcenedes/redis_sa_skills --skill redis-presentation-decks
npx skills add fcenedes/redis_sa_skills --skill redis-excalidraw-diagrams
npx skills add fcenedes/redis_sa_skills --skill redis-lucidchart-diagrams

# Testing & browser automation
npx skills add fcenedes/redis_sa_skills --skill playwright-test
npx skills add fcenedes/redis_sa_skills --skill playwright-cli-agent

# RedisInsight
npx skills add fcenedes/redis_sa_skills --skill redis-insight-plugin

# Agent Memory
npx skills add fcenedes/redis_sa_skills --skill agent-delegation-routing
npx skills add fcenedes/redis_sa_skills --skill agent-delegation-planning
npx skills add fcenedes/redis_sa_skills --skill agent-capability-ledger
npx skills add fcenedes/redis_sa_skills --skill agent-memory-docker
npx skills add fcenedes/redis_sa_skills --skill agent-memory-coordination
```

Or add to your project manually by copying the skill directory into your `.agents/skills/` folder.

## Usage Examples

After installing a skill, ask your agent for the Redis artifact you need:

```text
Use redis-presentation-decks to create a Redis Cloud vector search architecture deck for a technical workshop.
Use redis-product-ui to build a RedisInsight-like key inspection dashboard with light/dark mode, filters, tables, drawers, and toast feedback.
Use redis-excalidraw-diagrams to draw a Redis Streams consumer group architecture with commands, acknowledgements, and observability paths.
Use redis-lucidchart-diagrams to create a Lucidchart-editable Redis agent orchestration layer using Standard Import source.
Use playwright-test to add E2E coverage for the login flow.
Use playwright-cli-agent to open the local app, reproduce the dashboard bug, and capture screenshots.
Use caveman ultra and summarize this failing test output.
Use redis-insight-plugin with redis-product-ui to create an external Parcel Redis Insight plugin for XRANGE using RedisInsight light/dark product styling.
Use rtk-cli to inspect this repo and summarize the diff.
Use agent-delegation-planning to write an executable delegated plan with required skills, token budget, task tracking, audit, Playwright UI gates, ownership, and verification.
Use agent-delegation-routing to split a multi-agent coding task into coordinator, implementor, verifier, and Qwen worker contracts.
Use agent-capability-ledger before a follow-up readiness plan to classify done, partial, missing, blocked, and superseded capabilities, then generate delta tasks only.
Use agent-memory-docker to create a shared local memory stack and configure Codex, Claude Code, and Claude Desktop.
Use agent-memory-docker to install the default shared-memory policy for every new Codex and Claude Code session.
Use agent-memory-coordination to dispatch Track H/I/J workers from saved memory prompts with strict file ownership and a final integration gate.
```

## Suggested Skill Combinations

| Workflow | Skills |
|----------|--------|
| General disciplined coding | Superpowers + `rtk-cli` + `caveman` |
| Redis app development | `redis-development` (redis/agent-skills) + `redis-performance-troubleshooting` |
| Customer discovery | `redis-discovery-workshop` + `redis-presentation-decks` + `redis-excalidraw-diagrams` or `redis-lucidchart-diagrams` |
| Demo creation | `redis-demo-builder` + `redis-brand-ui` + `playwright-cli-agent` + `playwright-test` |
| Product UI demo | `redis-product-ui` + `redis-brand-ui` + `playwright-cli-agent` + `playwright-test` |
| RedisInsight plugin | `redis-insight-plugin` + `redis-product-ui` + `playwright-cli-agent` + `playwright-test` + `rtk-cli` |
| Shared local agent memory | `agent-memory-docker` + `rtk-cli` |
| Delegated agent work | `agent-capability-ledger` + `agent-delegation-planning` + `agent-delegation-routing` + `agent-memory-coordination` + `rtk-cli` + `caveman` |
| Parallel agent coordination | `agent-capability-ledger` + `agent-memory-coordination` + `agent-delegation-routing` + Superpowers + `rtk-cli` |
| Vector search and RAG | `redis-development` (redis/agent-skills) + `redis-vector-search-rag` + `redis-demo-builder` |
| Operations | `redis-observability-runbook` + `redis-performance-troubleshooting` |
| Compact agent workflow | `rtk-cli` + `caveman` |

## Roadmap

Skills in this repo today are listed under [Available Skills](#available-skills). Planned skills:

| Theme | Planned Skills |
|-------|---------------|
| Customer engagement | `redis-discovery-workshop`, `redis-demo-builder` |
| Redis architecture | `redis-vector-search-rag`, `redis-streams-architecture`, `redis-cloud-sizing` |
| Operations | `redis-performance-troubleshooting`, `redis-observability-runbook`, `redis-enterprise-migration` |

See open PRs for skills landing imminently.

## Versioning

Versioning is per skill through `metadata.version` in each `SKILL.md`. No archive-level version manifest.

| Skill | Version |
|-------|---------|
| caveman | 1.0.0 |
| rtk-cli | 1.0.0 |
| redis-brand-ui | 1.0.0 |
| redis-product-ui | 1.0.0 |
| redis-presentation-decks | 1.0.0 |
| redis-excalidraw-diagrams | 1.0.0 |
| redis-lucidchart-diagrams | 1.0.0 |
| playwright-test | 1.0.0 |
| playwright-cli-agent | 1.0.0 |
| redis-insight-plugin | 1.0.0 |
| agent-delegation-routing | 1.0.0 |
| agent-delegation-planning | 1.0.0 |
| agent-capability-ledger | 1.0.0 |
| agent-memory-docker | 1.0.0 |
| agent-memory-coordination | 1.1.1 |

## Skill Structure

Each skill follows the [Agent Skills](https://agentskills.io) specification:

```
skill-name/
├── SKILL.md              # Core rules and instructions (YAML frontmatter + markdown)
├── references/           # Optional detailed reference files
├── scripts/              # Optional helper scripts
└── package.json          # Optional helper dependencies
```

## Codex Usage

Codex uses repository-local skills from `.agents/skills/` and [`AGENTS.md`](AGENTS.md) for repo-level instructions. Invoke skills with `$skill-name`:

```text
$rtk-cli inspect this repo and summarize the diff.
$playwright-test add E2E coverage for the login flow.
$playwright-cli-agent reproduce this UI bug in the browser.
$redis-insight-plugin create a Redis Insight Workbench plugin for XRANGE.
$caveman ultra, summarize this failing test output.
```

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for skill structure rules, supported agents, and validation steps. Quick reference when adding a new skill:

1. Create a directory with a descriptive kebab-case name.
2. Add a `SKILL.md` with valid YAML frontmatter (`name`, `description`, `license`, `metadata.author`, `metadata.version`).
3. Write instructions in imperative voice — tell agents *what to do*, not just what exists.
4. Include anti-pattern guardrails (`DO NOT` rules).
5. Split detailed values into `references/` files; keep `SKILL.md` under ~150 lines.
6. Update the [Available Skills](#available-skills) table, [Installation](#installation), [Usage Examples](#usage-examples), and [Versioning](#versioning) tables.
7. Run `bash scripts/validate-skills.sh` and fix any reported issues before opening a PR.
