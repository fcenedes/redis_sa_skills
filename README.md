# Redis SA Skills

A collection of agent skills for Redis solutions architecture built by Solution Architects.

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

### Engineering Lifecycle

| Skill | Description |
|-------|-------------|
| [source-driven-development](source-driven-development/SKILL.md) | Ground every framework decision in official documentation. DETECT→FETCH→IMPLEMENT→CITE workflow with source hierarchy, retrieval safety, and UNVERIFIED flagging. |
| [doubt-driven-development](doubt-driven-development/SKILL.md) | Subject every non-trivial decision to a fresh-context adversarial review. CLAIM→EXTRACT→DOUBT→RECONCILE→STOP with 4-tier classification and cross-model escalation. |
| [performance-optimization](performance-optimization/SKILL.md) | Measure-first performance optimization. MEASURE→IDENTIFY→FIX→VERIFY→GUARD with "neutral is a revert" policy, attempt ledger, and Redis benchmark commands. |
| [observability-and-instrumentation](observability-and-instrumentation/SKILL.md) | Instrument code so production behavior is visible and diagnosable. RED/USE frameworks, structured logging, two-severity alerting, and Redis redis_exporter integration. |
| [shipping-and-launch](shipping-and-launch/SKILL.md) | Ship to production with confidence. Pre-launch checklists, feature flag lifecycle, quantitative rollout thresholds (green/yellow/red), and rollback-plan-before-deploy gates. |
| [deprecation-and-migration](deprecation-and-migration/SKILL.md) | Manage deprecation and migration safely. Expand/Contract for schema changes, Strangler pattern, Zombie Code diagnosis, Churn Rule, and Redis version migration 6→7→8. |
| [ci-cd-and-automation](ci-cd-and-automation/SKILL.md) | Automate CI/CD pipelines with quality gates. Agent CI feedback loop, deployment strategies, test sharding, caching patterns, and GitHub Actions examples with Redis. |

### Testing & Browser Automation

| Skill | Description |
|-------|-------------|
| [playwright-test](playwright-test/SKILL.md) | Author and maintain reliable E2E/UI tests with `@playwright/test`: configs, fixtures, auth state, resilient locators, traces, CI tuning, and flake handling. |
| [playwright-cli-agent](playwright-cli-agent/SKILL.md) | Drive a real browser via Playwright CLI to inspect, operate, screenshot, reproduce UI bugs, and discover stable selectors before authoring tests. |

### RedisInsight

| Skill | Description |
|-------|-------------|
| [redis-insight-plugin](redis-insight-plugin/SKILL.md) | Build, deploy, and validate Redis Insight Workbench visualization plugins: manifests, activation methods, Parcel/Vite builds, iframe rendering, command parsing, Docker deployment, and `/api/plugins` verification. |

### Agent Coordination & Memory

| Skill | Description |
|-------|-------------|
| [agent-delegation-routing](agent-delegation-routing/SKILL.md) | Route coding work across Codex, Claude Code, local models, and CLI workers with specialist role presets, RTK-aware handoff, ownership, and verification. |
| [agent-delegation-planning](agent-delegation-planning/SKILL.md) | Write delegated coding plans with task/epic structure, required skills, token economy, task status tracking, model/reasoning budget, parallelization, audit, Playwright UI gates, cleanup, and verification. |
| [agent-spec-writing](agent-spec-writing/SKILL.md) | Write source-of-truth specs, requirement deltas, acceptance scenarios, and ADDED/MODIFIED/REMOVED change proposals before delegated implementation. |
| [agent-plan-lifecycle](agent-plan-lifecycle/SKILL.md) | Track, resume, promote, close, and archive delegated plans with plan-state gates, status boards, audit evidence, and ledger promotion records. |
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
# Install everything in this repo
npx skills add fcenedes/redis_sa_skills --all

# Agent delegation core in one command
npx skills add fcenedes/redis_sa_skills --skill agent-capability-ledger agent-delegation-planning agent-delegation-routing agent-spec-writing agent-plan-lifecycle

# Full agent coordination suite in one command
npx skills add fcenedes/redis_sa_skills --skill agent-capability-ledger agent-delegation-planning agent-delegation-routing agent-spec-writing agent-plan-lifecycle agent-memory-coordination agent-memory-docker

# Token efficiency
npx skills add fcenedes/redis_sa_skills --skill caveman
npx skills add fcenedes/redis_sa_skills --skill rtk-cli

# Visualization & brand
npx skills add fcenedes/redis_sa_skills --skill redis-brand-ui
npx skills add fcenedes/redis_sa_skills --skill redis-product-ui
npx skills add fcenedes/redis_sa_skills --skill redis-presentation-decks
npx skills add fcenedes/redis_sa_skills --skill redis-excalidraw-diagrams
npx skills add fcenedes/redis_sa_skills --skill redis-lucidchart-diagrams

# Engineering lifecycle
npx skills add fcenedes/redis_sa_skills --skill source-driven-development
npx skills add fcenedes/redis_sa_skills --skill doubt-driven-development
npx skills add fcenedes/redis_sa_skills --skill performance-optimization
npx skills add fcenedes/redis_sa_skills --skill observability-and-instrumentation
npx skills add fcenedes/redis_sa_skills --skill shipping-and-launch
npx skills add fcenedes/redis_sa_skills --skill deprecation-and-migration
npx skills add fcenedes/redis_sa_skills --skill ci-cd-and-automation

# Testing & browser automation
npx skills add fcenedes/redis_sa_skills --skill playwright-test
npx skills add fcenedes/redis_sa_skills --skill playwright-cli-agent

# RedisInsight
npx skills add fcenedes/redis_sa_skills --skill redis-insight-plugin

# Agent coordination & memory
npx skills add fcenedes/redis_sa_skills --skill agent-delegation-routing
npx skills add fcenedes/redis_sa_skills --skill agent-delegation-planning
npx skills add fcenedes/redis_sa_skills --skill agent-spec-writing
npx skills add fcenedes/redis_sa_skills --skill agent-plan-lifecycle
npx skills add fcenedes/redis_sa_skills --skill agent-capability-ledger
npx skills add fcenedes/redis_sa_skills --skill agent-memory-docker
npx skills add fcenedes/redis_sa_skills --skill agent-memory-coordination
```

Or add to your project manually by copying the skill directory into your `.agents/skills/` folder.

## Usage Examples

For ordered recipes that explain which skills to invoke first, why they appear,
and what each one permits, see [Skill Usage Guide](docs/skill-usage-guide.md).

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
Use agent-spec-writing to turn product behavior into a source-of-truth change delta with ADDED, MODIFIED, REMOVED, SUPERSEDED, and DEFERRED sections.
Use agent-plan-lifecycle to resume an anchored plan, report current state, promote audited work into the capability ledger, and write an archive record.
Use agent-capability-ledger before a follow-up readiness plan to classify done, partial, missing, blocked, and superseded capabilities, then generate delta tasks only.
Use agent-memory-docker to create a shared local memory stack and configure Codex, Claude Code, and Claude Desktop.
Use agent-memory-docker to install the default shared-memory policy for every new Codex and Claude Code session.
Use agent-memory-coordination to dispatch Track H/I/J workers from saved memory prompts with strict file ownership and a final integration gate.
Use source-driven-development to verify that all Redis client API calls in this file reference current official documentation.
Use doubt-driven-development to adversarially review the caching strategy before shipping to production.
Use performance-optimization to profile the Redis pipeline batch and verify the optimization reduced p99 latency.
Use observability-and-instrumentation to add structured logging and redis_exporter metrics to the order service.
Use shipping-and-launch to create a staged rollout plan with quantitative thresholds for the new search feature.
Use deprecation-and-migration to plan the Redis 6→7 migration with Expand/Contract for the session schema.
Use ci-cd-and-automation to set up GitHub Actions with Redis service containers and quality gate pipeline.
```

## Suggested Skill Combinations

| Workflow | Skills |
|----------|--------|
| General disciplined coding | Superpowers + `rtk-cli` + `caveman` |
| Redis app development | `redis-development` (redis/agent-skills) + `rtk-cli` |
| Customer discovery | `redis-presentation-decks` + `redis-excalidraw-diagrams` or `redis-lucidchart-diagrams` |
| Demo creation | `redis-brand-ui` + `playwright-cli-agent` + `playwright-test` |
| Product UI demo | `redis-product-ui` + `playwright-cli-agent` + `playwright-test` |
| RedisInsight plugin | `redis-insight-plugin` + `redis-product-ui` + `playwright-cli-agent` + `playwright-test` + `rtk-cli` |
| Shared local agent memory | `agent-memory-docker` + `rtk-cli` |
| Delegated agent work | `agent-spec-writing` + `agent-capability-ledger` + `agent-delegation-planning` + `agent-delegation-routing` + `agent-plan-lifecycle` + `agent-memory-coordination` + `rtk-cli` + `caveman` |
| Parallel agent coordination | `agent-capability-ledger` + `agent-memory-coordination` + `agent-delegation-routing` + `agent-plan-lifecycle` + Superpowers + `rtk-cli` |
| Production readiness | `shipping-and-launch` + `observability-and-instrumentation` + `ci-cd-and-automation` + `performance-optimization` |
| Safe migration | `deprecation-and-migration` + `doubt-driven-development` + `shipping-and-launch` |
| High-confidence delivery | `source-driven-development` + `doubt-driven-development` + `playwright-test` |
| Compact agent workflow | `rtk-cli` + `caveman` |

## Roadmap

Skills in this repo today are listed under [Available Skills](#available-skills). Planned skills:

| Theme | Planned Skills |
|-------|---------------|
| Customer engagement | `redis-discovery-workshop`, `redis-demo-builder` |
| Redis architecture | `redis-vector-search-rag`, `redis-streams-architecture`, `redis-cloud-sizing` |
| Operations | `redis-performance-troubleshooting`, `redis-cloud-operations-runbook` |

See open PRs for skills landing imminently.

## Versioning

Versioning is per skill through `metadata.version` in each `SKILL.md`. No archive-level version manifest.

| Skill | Version |
|-------|---------|
| caveman | 1.0.0 |
| rtk-cli | 1.1.0 |
| redis-brand-ui | 1.1.0 |
| redis-product-ui | 1.2.0 |
| redis-presentation-decks | 1.0.0 |
| redis-excalidraw-diagrams | 1.0.0 |
| redis-lucidchart-diagrams | 1.0.0 |
| playwright-test | 1.0.0 |
| playwright-cli-agent | 1.1.0 |
| redis-insight-plugin | 1.1.0 |
| agent-delegation-routing | 1.2.1 |
| agent-delegation-planning | 1.2.1 |
| agent-spec-writing | 1.3.0 |
| agent-plan-lifecycle | 1.0.0 |
| agent-capability-ledger | 1.0.1 |
| agent-memory-docker | 1.1.0 |
| agent-memory-coordination | 1.1.1 |
| source-driven-development | 1.0.0 |
| doubt-driven-development | 1.0.0 |
| performance-optimization | 1.0.0 |
| observability-and-instrumentation | 1.0.0 |
| shipping-and-launch | 1.0.0 |
| deprecation-and-migration | 1.0.0 |
| ci-cd-and-automation | 1.0.0 |

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

Codex can invoke installed skills with `$skill-name`. For local development,
sync or copy this repo's skill directories into `.agents/skills/`; [`AGENTS.md`](AGENTS.md)
provides repo-level instructions.

```text
$rtk-cli inspect this repo and summarize the diff.
$playwright-test add E2E coverage for the login flow.
$playwright-cli-agent reproduce this UI bug in the browser.
$redis-insight-plugin create a Redis Insight Workbench plugin for XRANGE.
$caveman ultra, summarize this failing test output.
```

## Claude Code Usage

Claude Code can invoke installed skills with slash commands. For local
development, copy skills into `.claude/skills/` or symlink them from
`.agents/skills/` so Codex and Claude share the same installed copies.

```text
/rtk-cli inspect this repo and summarize the diff.
/playwright-test add E2E coverage for the login flow.
/playwright-cli-agent reproduce this UI bug in the browser.
/redis-insight-plugin create a Redis Insight Workbench plugin for XRANGE.
/agent-delegation-planning write an executable delegated plan for this change.
```

For authoring rules, supported agents, and validation steps, see
[`CONTRIBUTING.md`](CONTRIBUTING.md).
