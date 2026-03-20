---
name: redis-brand-ui
description: Apply Redis official brand guidelines to frontend UI implementations. Use this skill when building Redis-branded web interfaces, creating marketing pages, styling dashboards, or implementing any UI that must follow the Redis visual identity. Covers colors, typography, components, and dark mode.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# Redis Brand UI Guidelines

Actionable rules for implementing the Redis visual identity in frontend applications. All values are derived from the official Redis brand portal (https://brand.redis.io).

## When to Apply

Use these guidelines when:
- Building any UI that carries the Redis brand
- Creating marketing pages, landing pages, or documentation sites
- Styling dashboards, admin panels, or developer tools for Redis products
- Implementing components in React, Next.js, or any web framework
- Configuring Tailwind CSS or HeroUI/NextUI themes for Redis projects

## Core Rules

### Colors
- Use `#FF4438` (Redis Red) as the primary action color for buttons, links, and CTAs.
- Use `#091A23` for primary text and `#163341` for secondary text. Never use pure black (`#000`).
- Use `#FFFFFF` for page backgrounds. Use `#B9C2C6` sparingly for tertiary backgrounds.
- See [colors reference](references/colors.md) for the full palette, CSS variables, and Tailwind config.

### Typography
- Import **Space Grotesk** (weights 300–700) for all body text, headings H2–H3, and UI labels.
- Import **Space Mono** for code blocks, navigation labels, and H1 headings only.
- Never use system fonts or other typefaces in Redis-branded interfaces.
- See [typography reference](references/typography.md) for font imports, sizes, and Tailwind config.

### Components
- Primary buttons: `#FF4438` background, white text, `5px` border-radius.
- Secondary buttons: transparent background, `#163341` border, dark text.
- All interactive elements: `transition: all 0.2s ease-in-out`.
- Use `8px` as the base grid unit for all spacing.
- See [components reference](references/components.md) for full button/card/form specs and HeroUI theme.

### Dark Mode
- Maintain Redis Red (`#FF4438`) as the primary accent in dark mode.
- Invert background/text relationships — dark backgrounds with light text.
- Never reduce the prominence of the Redis Red brand color in dark contexts.
- See [dark mode reference](references/dark-mode.md) for the full dark palette and CSS setup.

## Anti-Pattern Guardrails

**DO NOT:**
- Use arbitrary red values (`#FF0000`, `#E53E3E`, `red-500`). Always use `#FF4438`.
- Use pure black (`#000000`) for text or backgrounds. Use `#091A23` instead.
- Mix Space Mono into body copy or long-form text — it is for code and nav only.
- Use Space Grotesk for code blocks — always use Space Mono.
- Use border-radius values other than `5px` for standard components.
- Use spacing values that aren't multiples of `8px`.
- Omit hover/focus states on interactive elements.
- Use Tailwind's default color palette names (`red-500`, `gray-900`) — use the custom Redis token names.

## Reference Files

| File | Contents |
|------|----------|
| [colors](references/colors.md) | Full palette, CSS custom properties, Tailwind extend config, accessibility notes |
| [typography](references/typography.md) | Google Fonts imports, heading/body styles, font family config |
| [components](references/components.md) | Buttons, cards, forms, React examples, HeroUI/NextUI theme object |
| [dark-mode](references/dark-mode.md) | Dark palette, `prefers-color-scheme` setup, Tailwind dark variants |

## Quick Start Checklist

1. Add Google Fonts imports for Space Grotesk and Space Mono
2. Configure CSS custom properties from [colors](references/colors.md)
3. Extend Tailwind theme with Redis tokens from reference files
4. Apply component patterns from [components](references/components.md)
5. Implement dark mode using [dark-mode](references/dark-mode.md) mappings

