# Redis SA Skills

A collection of agent skills for Redis solutions architecture by [fcenedes](https://github.com/fcenedes).

## Available Skills

| Skill | Description |
|-------|-------------|
| [redis-brand-ui](redis-brand-ui/SKILL.md) | Apply Redis official brand guidelines to frontend UI implementations. Covers colors, typography, components, dark mode, and HeroUI/NextUI theme configuration. |

## Installation

Install skills using the Agent Skills CLI:

```bash
npx skills add fcenedes/redis_sa_skills --skill redis-brand-ui
```

Or add to your project manually by copying the skill directory into your `.agents/skills/` folder.

## Skill Structure

Each skill follows the [Agent Skills](https://agentskills.io) specification:

```
skill-name/
├── SKILL.md              # Core rules and instructions (YAML frontmatter + markdown)
└── references/           # Detailed reference files
    ├── colors.md
    ├── typography.md
    ├── components.md
    └── dark-mode.md
```

## Contributing

When adding a new skill:

1. Create a directory with a descriptive kebab-case name
2. Add a `SKILL.md` with valid YAML frontmatter (`name`, `description`, `license`, `metadata`)
3. Write instructions in imperative voice — tell agents *what to do*, not just what exists
4. Include anti-pattern guardrails (`DO NOT` rules)
5. Split detailed values into `references/` files, keep `SKILL.md` under ~150 lines
