# Contributing

Thanks for contributing to Redis SA Skills. This repo is for Redis SA, demos, workshops, RedisInsight plugins, troubleshooting, and field-engineering workflows. For general Redis development skills, contribute to [`redis/agent-skills`](https://github.com/redis/agent-skills) instead. For general engineering methodology, see Superpowers.

## Skill Structure

Each skill is a top-level kebab-case directory:

```
<skill-name>/
├── SKILL.md              # Core rules and instructions (YAML frontmatter + markdown)
├── references/           # Optional detailed reference files
├── templates/            # Optional copy-ready files (configs, source stubs, etc.)
├── scripts/              # Optional helper scripts (must be executable)
└── package.json          # Optional helper dependencies
```

Keep `SKILL.md` under ~150 lines. Move long material into `references/`.

## SKILL.md Frontmatter

Required YAML keys:

```yaml
---
name: <skill-name>
description: <clear, trigger-focused description>
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---
```

Write instructions in imperative voice ("Do X", "Use Y"). Include explicit `DO NOT` guardrails and a final checklist.

## Versioning

Versioning is per skill via `metadata.version`. Bump the patch version for fixes, the minor version for additive changes, and the major version for breaking changes. Update the [Versioning](README.md#versioning) table in the README in the same PR.

## README Updates

When you add or rename a skill, update each of these sections in `README.md`:

1. [Available Skills](README.md#available-skills) table.
2. [Installation](README.md#installation) command block.
3. [Usage Examples](README.md#usage-examples) block.
4. [Versioning](README.md#versioning) table.

## Repository Hygiene

Do not commit:

- `node_modules/`
- `dist/`
- `.parcel-cache/`
- screenshots
- binary build outputs
- vendored copies of external skill repositories
- editor or local IDE config

Do not vendor external repositories. Reference them in the README:

- Redis development best practices: [`redis/agent-skills`](https://github.com/redis/agent-skills).
- General engineering methodology: Superpowers.
- Skill discovery: `find-skills` from `vercel-labs/skills`.
- Skill authoring: `skill-creator` from `anthropics/skills`.
- Frontend/UI: `frontend-design`, `vercel-react-best-practices`, `web-design-guidelines`.
- GitHub Actions: `github-actions-docs` from `xixu-me/skills`.

## Supported Agents

Documentation in this repo targets:

- Claude Code
- Codex
- Agent Skills CLI

Do not add Cursor-specific guidance unless explicitly requested. Codex repo-level instructions live in [`AGENTS.md`](AGENTS.md); do not create a `CODEX.md`.

## Validation

Run before opening a PR:

```bash
bash scripts/validate-skills.sh
```

The script checks:

- Each top-level skill directory has a `SKILL.md`.
- Frontmatter contains `name`, `description`, `license`, `metadata`, `version`.
- Each skill is mentioned in `README.md`.
- No `node_modules/`, `dist/`, or `.parcel-cache/` directories were committed.
- No stray `TODO` / `FIXME` outside intentional template placeholders.

Fix every reported issue before requesting review.

## Pull Request Checklist

- One skill per PR when possible.
- Frontmatter complete and validated.
- README updated in all four sections.
- `references/` used for detail; `SKILL.md` short.
- `DO NOT` guardrails present.
- Final checklist present.
- `scripts/validate-skills.sh` passes.
- No vendored external skills, no generated artifacts.
