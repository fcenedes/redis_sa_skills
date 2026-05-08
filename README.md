# Redis SA Skills

A collection of agent skills for Redis solutions architecture by [fcenedes](https://github.com/fcenedes).

## Available Skills

| Skill | Description |
|-------|-------------|
| [redis-brand-ui](redis-brand-ui/SKILL.md) | Apply Redis official brand guidelines to frontend UI implementations. Covers colors, typography, components, dark mode, and HeroUI/NextUI theme configuration. |
| [redis-presentation-decks](redis-presentation-decks/SKILL.md) | Create Redis-focused Reveal.js decks for solution architecture, customer briefings, technical workshops, product narratives, QBRs, and sales engineering storytelling. |
| [redis-excalidraw-diagrams](redis-excalidraw-diagrams/SKILL.md) | Create Redis-focused Excalidraw architecture diagrams for caching, vector search, Redis Query Engine, Streams, replication, clustering, observability, and Redis Cloud systems. |
| [playwright-test](playwright-test/SKILL.md) | Author and maintain reliable E2E/UI tests with `@playwright/test`: configs, fixtures, auth state, resilient locators, traces, CI tuning, and flake handling. |

## Installation

Install skills using the Agent Skills CLI:

```bash
npx skills add fcenedes/redis_sa_skills --skill redis-brand-ui
npx skills add fcenedes/redis_sa_skills --skill redis-presentation-decks
npx skills add fcenedes/redis_sa_skills --skill redis-excalidraw-diagrams
npx skills add fcenedes/redis_sa_skills --skill playwright-test
```

Or add to your project manually by copying the skill directory into your `.agents/skills/` folder.

## Usage Examples

After installing a skill, ask your agent for the Redis artifact you need:

```text
Use redis-presentation-decks to create a Redis Cloud vector search architecture deck for a technical workshop.
Use redis-excalidraw-diagrams to draw a Redis Streams consumer group architecture with commands, acknowledgements, and observability paths.
Use playwright-test to add E2E coverage for the login flow.
```

## Versioning

Versioning is per skill through `metadata.version` in each `SKILL.md`. This repository does not currently use an archive-level version manifest.

| Skill | Version |
|-------|---------|
| redis-brand-ui | 1.0.0 |
| redis-presentation-decks | 1.0.0 |
| redis-excalidraw-diagrams | 1.0.0 |
| playwright-test | 1.0.0 |

## Skill Structure

Each skill follows the [Agent Skills](https://agentskills.io) specification:

```
skill-name/
├── SKILL.md              # Core rules and instructions (YAML frontmatter + markdown)
├── references/           # Optional detailed reference files
├── scripts/              # Optional helper scripts
└── package.json          # Optional helper dependencies
```

## Contributing

When adding a new skill:

1. Create a directory with a descriptive kebab-case name
2. Add a `SKILL.md` with valid YAML frontmatter (`name`, `description`, `license`, `metadata.version`)
3. Write instructions in imperative voice — tell agents *what to do*, not just what exists
4. Include anti-pattern guardrails (`DO NOT` rules)
5. Split detailed values into `references/` files, keep `SKILL.md` under ~150 lines
