# Redis Brand Colors

## CSS Custom Properties

Add this `:root` block to your global stylesheet:

```css
:root {
  /* Primary Brand */
  --redis-hyper: #FF4438;
  --redis-deep-hyper: #EB352A;

  /* Text */
  --redis-text-primary: #091A23;
  --redis-text-secondary: #163341;
  --redis-text-link: #2D4754;
  --redis-text-muted: #8A99A0;

  /* Backgrounds */
  --redis-bg-primary: #FFFFFF;
  --redis-bg-secondary: #FFFFFF;
  --redis-bg-tertiary: #B9C2C6;

  /* Borders */
  --redis-border-primary: #163341;
  --redis-border-secondary: #2D4754;
}
```

## Tailwind CSS Configuration

Extend your `tailwind.config.js` (or `.ts`):

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        redis: {
          hyper: '#FF4438',
          'deep-hyper': '#EB352A',
        },
        'redis-text': {
          DEFAULT: '#091A23',
          secondary: '#163341',
          link: '#2D4754',
          muted: '#8A99A0',
        },
        'redis-bg': {
          DEFAULT: '#FFFFFF',
          secondary: '#FFFFFF',
          tertiary: '#B9C2C6',
        },
        'redis-border': {
          DEFAULT: '#163341',
          secondary: '#2D4754',
        },
      },
    },
  },
};
```

## Usage Rules

| Token | Use For | Example Classes |
| --- | --- | --- |
| redis-hyper | Brand accents, active/hover states, prominent moments, reviewed CTAs | bg-redis-hyper |
| redis-deep-hyper | Brand red variant, hover accents, large-text treatments | hover:bg-redis-deep-hyper |
| redis-text | Headings, primary body text | text-redis-text |
| redis-text-secondary | Subheadings, secondary content | text-redis-text-secondary |
| redis-text-link | Default hyperlinks and interactive text | text-redis-text-link |
| redis-text-muted | Decorative metadata, placeholders, disabled text | text-redis-text-muted |
| redis-bg-tertiary | Section dividers, subtle backgrounds | bg-redis-bg-tertiary |
| redis-border | Input borders, card outlines | border-redis-border |

## Accessibility Requirements

Use WCAG contrast checks for every text/background pairing. These ratios are the documented baseline for visible Redis brand tokens:

| Foreground | Background | Ratio | Safe Use |
| --- | --- | ---: | --- |
| `#091A23` | `#FFFFFF` | `17.74:1` | Normal text, large text, icons |
| `#163341` | `#FFFFFF` | `13.26:1` | Normal text, large text, icons |
| `#FFFFFF` | `#091A23` | `17.74:1` | Normal text, large text, icons |
| `#FFFFFF` | `#163341` | `13.26:1` | Normal text, large text, icons |
| `#FFFFFF` | `#2D4754` | `9.81:1` | Normal text, large text, icons |
| `#091A23` | `#FF4438` | `5.18:1` | Contrast-safe pairing made from official colors; needs brand-pattern approval for primary buttons |
| `#FFFFFF` | `#FF4438` | `3.42:1` | Large/bold text only; not normal button labels |
| `#FFFFFF` | `#EB352A` | `4.14:1` | Large/bold text only; below AA for normal text |
| `#8A99A0` | `#FFFFFF` | `2.94:1` | Decorative or disabled text only |
| `#5C707A` | `#091A23` | `3.42:1` | Large or non-critical text only |

Required treatments:

- Do not invent darker reds to solve contrast. Use confirmed Redis brand colors only.
- Use outlined buttons, dark text on white, large labels, icons, or non-text Redis Red accents when filled `Hyper` or `Deep Hyper` would fail normal-text contrast.
- Escalate to Redis brand/design reviewers if a component requires normal-size white text on a red filled surface, because the visible official reds do not pass AA for that use.
- Do not use muted text for body copy, required labels, errors, warnings, or operational state.

## Brand Color vs Product Meaning

Redis Red identifies the Redis brand, selected Redis entities, active navigation, and primary actions. It does not mean error by default. Use [status language](status-language.md) for labels that distinguish live, sampled, modeled, derived, stale, pending, approved, evidence, source, and failed states.

## Anti-Patterns

- **NEVER** use Tailwind defaults like `red-500`, `red-600` — always use confirmed Redis tokens such as `redis-hyper`.
- **NEVER** use `#000000` for text — use `redis-text` (`#091A23`).
- **NEVER** use arbitrary red hex values or generated red scales.
- **NEVER** apply `redis-text-muted` to body copy, readable captions, required labels, or operational state. Use `redis-text-secondary` instead.
