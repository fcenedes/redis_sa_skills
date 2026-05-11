# Redis SA Skills

A collection of agent skills for Redis solutions architecture by [fcenedes](https://github.com/fcenedes).

## Available Skills

| Skill | Description |
|-------|-------------|
| [redis-brand-ui](redis-brand-ui/SKILL.md) | Apply Redis official brand guidelines to frontend UI implementations. Covers colors, typography, components, dark mode, and HeroUI/NextUI theme configuration. |
| [redis-presentation-decks](redis-presentation-decks/SKILL.md) | Create Redis-focused Reveal.js decks for solution architecture, customer briefings, technical workshops, product narratives, QBRs, and sales engineering storytelling. |
| [redis-excalidraw-diagrams](redis-excalidraw-diagrams/SKILL.md) | Create Redis-focused Excalidraw architecture diagrams for caching, vector search, Redis Query Engine, Streams, replication, clustering, observability, and Redis Cloud systems. |
| [redis-insight-plugin](redis-insight-plugin/SKILL.md) | Build, deploy, and validate Redis Insight Workbench visualization plugins: manifests, activation methods, Parcel/Vite builds, iframe rendering, command parsing, Docker deployment, and `/api/plugins` verification. |
| [rtk-cli](rtk-cli/SKILL.md) | Use RTK (Rust Token Killer) wrappers for noisy shell output — git, file inspection, logs, builds, tests, Docker, package managers — to keep terminal output and token cost compact. |

## Installation

Install skills using the Agent Skills CLI:

```bash
npx skills add fcenedes/redis_sa_skills --skill redis-brand-ui
npx skills add fcenedes/redis_sa_skills --skill redis-presentation-decks
npx skills add fcenedes/redis_sa_skills --skill redis-excalidraw-diagrams
npx skills add fcenedes/redis_sa_skills --skill redis-insight-plugin
npx skills add fcenedes/redis_sa_skills --skill rtk-cli
```

Or add to your project manually by copying the skill directory into your `.agents/skills/` folder.

## Usage Examples

After installing a skill, ask your agent for the Redis artifact you need:

```text
Use redis-presentation-decks to create a Redis Cloud vector search architecture deck for a technical workshop.
Use redis-excalidraw-diagrams to draw a Redis Streams consumer group architecture with commands, acknowledgements, and observability paths.
Use redis-insight-plugin to create an external Parcel Redis Insight plugin for XRANGE.
Use rtk-cli to inspect this repo and summarize the diff.
```

## Versioning

Versioning is per skill through `metadata.version` in each `SKILL.md`. This repository does not currently use an archive-level version manifest.

| Skill | Version |
|-------|---------|
| redis-brand-ui | 1.0.0 |
| redis-presentation-decks | 1.0.0 |
| redis-excalidraw-diagrams | 1.0.0 |
| redis-insight-plugin | 1.0.0 |
| rtk-cli | 1.0.0 |

## Skill Structure

Each skill follows the [Agent Skills](https://agentskills.io) specification:

```
skill-name/
├── SKILL.md              # Core rules and instructions (YAML frontmatter + markdown)
├── references/           # Optional detailed reference files
├── scripts/              # Optional helper scripts
└── package.json          # Optional helper dependencies
```

## Recommended External Skills

This repo focuses on Redis SA, demos, workshops, RedisInsight plugins, troubleshooting, and field-engineering workflows. For general-purpose engineering and Redis development best practices, install these external skills alongside this repo. Do not vendor or copy them into this repository.

### 1. Superpowers

[Superpowers](https://github.com/claude-plugins/superpowers) is a general software engineering methodology plugin for coding agents. Use it for:

- brainstorming
- specification refinement
- planning
- executing plans
- test-driven development
- systematic debugging
- subagent-driven development
- code review
- skill authoring

Claude Code installation:

```text
/plugin install superpowers@claude-plugins-official
```

Codex installation:

```text
Open /plugins
Search for Superpowers
Select Install Plugin
```

Positioning:

- Use Superpowers for general disciplined software engineering workflow.
- Use this repo for Redis SA, Redis demos, RedisInsight plugins, Redis troubleshooting, and field-engineering workflows.
- Do not copy Superpowers skills into this repo.

### 2. Skill Discovery

```bash
npx skills add vercel-labs/skills --skill find-skills
```

Use `find-skills` for:

- finding existing skills before creating new ones
- avoiding duplicate work
- checking whether a community skill already exists

### 3. Skill Creation

```bash
npx skills add anthropics/skills --skill skill-creator
```

Use `skill-creator` for:

- creating new skills
- improving SKILL.md descriptions
- moving long content into references
- deciding when a skill should include scripts or templates

### 4. Frontend and UI Skills

```bash
npx skills add anthropics/skills --skill frontend-design
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

Use these for:

- Redis demos
- RedisInsight plugins
- dashboards
- customer-facing UI
- polished frontend design
- React conventions
- avoiding generic AI-looking UI

### 5. GitHub Actions and Repo Automation

```bash
npx skills add xixu-me/skills --skill github-actions-docs
```

Use for:

- GitHub Actions workflows
- CI checks
- release automation
- validation workflows

### 6. Redis Official Skills

Redis maintains an official agent skills repository:

https://github.com/redis/agent-skills

Install with the Agent Skills CLI:

```bash
npx skills add redis/agent-skills
```

For Claude Code plugin usage:

```text
/plugin marketplace add redis/agent-skills
/plugin install redis-development@redis
```

For Codex:

- use the Agent Skills CLI when appropriate:

  ```bash
  npx skills add redis/agent-skills
  ```

- or use Codex plugin installation if available in the current environment.

Use `redis-development` for:

- Redis data modeling
- Redis data structures
- key naming
- TTL and expiration strategy
- Redis Query Engine
- RedisVL and vector search
- semantic caching
- Streams and Pub/Sub
- clustering and replication
- connection handling
- Redis security
- Redis observability
- performance optimization

Positioning:

- Use `redis/agent-skills` for general Redis development best practices.
- Use `fcenedes/redis_sa_skills` for Redis SA, demo, workshop, visualization, troubleshooting, RedisInsight plugin, and workflow-specific skills.
- Do not duplicate `redis-development` in this repository.

## Codex Usage

Codex can use repository-local skills from:

```text
.agents/skills/
```

Codex can explicitly invoke skills with:

```text
$skill-name
```

Examples:

```text
$rtk-cli inspect this repo and summarize the diff.
$playwright-test add E2E coverage for the login flow.
$playwright-cli-agent reproduce this UI bug in the browser.
$redis-insight-plugin create a Redis Insight Workbench plugin for XRANGE.
$caveman ultra, summarize this failing test output.
```

Codex uses [`AGENTS.md`](AGENTS.md) for repository-level instructions and `.agents/skills/` for repository-local skills. Do not create a `CODEX.md` file.

## Recommended Agent Stack

External:

- Superpowers
- `redis-development` from `redis/agent-skills`
- `find-skills`
- `skill-creator`
- `frontend-design`
- `vercel-react-best-practices`
- `web-design-guidelines`
- `github-actions-docs`

This repo:

- `rtk-cli`
- `caveman`
- `playwright-cli-agent`
- `playwright-test`
- `redis-insight-plugin`
- `redis-discovery-workshop`
- `redis-demo-builder`
- `redis-vector-search-rag`
- `redis-performance-troubleshooting`
- `redis-cloud-sizing`
- `redis-streams-architecture`
- `redis-enterprise-migration`
- `redis-observability-runbook`
- `redis-brand-ui`
- `redis-presentation-decks`
- `redis-excalidraw-diagrams`

Some of the skills above ship in this repo today; others are planned. See the [Available Skills](#available-skills) table for what is currently shipped on `main`, and open pull requests for skills landing imminently.

## Suggested Skill Combinations

General disciplined coding:

- Superpowers + `rtk-cli` + `caveman`

Redis app development:

- `redis-development` from `redis/agent-skills` + `redis-performance-troubleshooting`

Customer discovery:

- `redis-discovery-workshop` + `redis-presentation-decks` + `redis-excalidraw-diagrams`

Demo creation:

- `redis-demo-builder` + `redis-brand-ui` + `playwright-cli-agent` + `playwright-test`

RedisInsight plugin:

- `redis-insight-plugin` + `playwright-cli-agent` + `playwright-test` + `rtk-cli`

Vector search and RAG:

- `redis-development` from `redis/agent-skills` + `redis-vector-search-rag` + `redis-demo-builder`

Operations:

- `redis-observability-runbook` + `redis-performance-troubleshooting`

Compact agent workflow:

- `rtk-cli` + `caveman`

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for skill structure rules, supported agents, and validation steps. Quick reference when adding a new skill:

1. Create a directory with a descriptive kebab-case name.
2. Add a `SKILL.md` with valid YAML frontmatter (`name`, `description`, `license`, `metadata.author`, `metadata.version`).
3. Write instructions in imperative voice — tell agents *what to do*, not just what exists.
4. Include anti-pattern guardrails (`DO NOT` rules).
5. Split detailed values into `references/` files; keep `SKILL.md` under ~150 lines.
6. Update the [Available Skills](#available-skills) table, [Installation](#installation), [Usage Examples](#usage-examples), and [Versioning](#versioning) tables.
7. Run `bash scripts/validate-skills.sh` and fix any reported issues before opening a PR.
