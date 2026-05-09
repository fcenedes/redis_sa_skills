# Agent Instructions

This repository is for Redis SA skills: solution architecture, demos, workshops, RedisInsight plugins, troubleshooting, and field-engineering workflows.

## Operating Rules

- Use [RTK](rtk-cli/SKILL.md) for noisy shell output when available (`rtk git status`, `rtk grep`, `rtk read`, `rtk test ...`).
- Keep `SKILL.md` files concise. Prefer under ~150 lines.
- Put long material in `references/`. Put copy-ready files in `templates/`. Put helper scripts in `scripts/`.

## Skill Requirements

Every skill in this repo must have:

- `SKILL.md` at the skill root.
- YAML frontmatter with at minimum:
  - `name`
  - `description` (clear, trigger-focused)
  - `license`
  - `metadata.author`
  - `metadata.version`
- Imperative instructions ("Do X", "Use Y").
- Explicit `DO NOT` guardrails for anti-patterns.
- A final checklist agents can run through before declaring the task done.

## Do Not Vendor

Do not vendor or copy external skill repositories into this repo. Reference them externally instead:

- Do not duplicate Redis official `redis-development`. Reference [`redis/agent-skills`](https://github.com/redis/agent-skills) instead.
- Do not vendor Superpowers. Reference it as an external recommended plugin (`/plugin install superpowers@claude-plugins-official`).
- Do not vendor `find-skills`, `skill-creator`, `frontend-design`, `vercel-react-best-practices`, `web-design-guidelines`, or `github-actions-docs`. Reference them in the README and let users install them via the Agent Skills CLI.

## Supported Agents

Primary supported agents for documentation:

- Claude Code
- Codex
- Agent Skills CLI

Do not add Cursor-specific instructions unless explicitly requested.

### Codex

- Repository skills may live in `.agents/skills/`.
- Invoke skills with `$skill-name`.
- Use `AGENTS.md` for repo-level instructions.
- Do not create `CODEX.md`.

### Claude Code

- Skills can be invoked with slash commands when installed.
- Keep README examples compatible with Claude Code where possible.
- For external recommendations use `/plugin install <name>@<marketplace>`.

### Agent Skills CLI

- Install pattern: `npx skills add <owner>/<repo> --skill <skill-name>`.
- Discovery: `npx skills add vercel-labs/skills --skill find-skills`.
- Authoring: `npx skills add anthropics/skills --skill skill-creator`.

## Repository Hygiene

Do not commit generated artifacts:

- `node_modules/`
- `dist/`
- `.parcel-cache/`
- screenshots
- binary build outputs
- editor settings or local IDE config

Run `bash scripts/validate-skills.sh` before opening a PR. The script checks frontmatter fields, README cross-references, and the absence of generated artifacts and stray TODO/FIXME markers.

## Scope

Keep this repo focused on:

- Redis SA workflows
- Redis demos and workshops
- RedisInsight Workbench plugins
- Redis troubleshooting and operations
- Visualization (decks, diagrams, brand)
- Compact agent communication and tooling (`rtk-cli`, `caveman`, Playwright skills)

For general Redis development best practices (data modeling, key naming, TTL strategy, vector search, security, observability, performance), use [`redis/agent-skills`](https://github.com/redis/agent-skills). For general engineering methodology (planning, TDD, debugging, code review), use Superpowers.
