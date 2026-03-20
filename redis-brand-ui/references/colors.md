# Redis Brand Colors

## CSS Custom Properties

Add this `:root` block to your global stylesheet:

```css
:root {
  /* Primary Brand */
  --redis-red: #FF4438;
  --redis-red-hover: #EB352A;
  --redis-red-dark: #8A221C;

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

  /* Redis Red Scale (for HeroUI/component libraries) */
  --redis-red-50: #FFE8E6;
  --redis-red-100: #FFD1CC;
  --redis-red-200: #FFA399;
  --redis-red-300: #FF7566;
  --redis-red-400: #FF4438;
  --redis-red-500: #FF4438;
  --redis-red-600: #EB352A;
  --redis-red-700: #CC2820;
  --redis-red-800: #8A221C;
  --redis-red-900: #5C1713;
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
          red: {
            DEFAULT: '#FF4438',
            hover: '#EB352A',
            dark: '#8A221C',
            50: '#FFE8E6',
            100: '#FFD1CC',
            200: '#FFA399',
            300: '#FF7566',
            400: '#FF4438',
            500: '#FF4438',
            600: '#EB352A',
            700: '#CC2820',
            800: '#8A221C',
            900: '#5C1713',
          },
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
|-------|---------|-----------------|
| `redis-red` | Primary buttons, CTAs, active states, brand accents | `bg-redis-red text-white` |
| `redis-red-hover` | Hover state for primary buttons and links | `hover:bg-redis-red-hover` |
| `redis-red-dark` | Active/pressed states, dark emphasis | `active:bg-redis-red-dark` |
| `redis-text` | Headings, primary body text | `text-redis-text` |
| `redis-text-secondary` | Subheadings, secondary content | `text-redis-text-secondary` |
| `redis-text-link` | Hyperlinks, interactive text | `text-redis-text-link` |
| `redis-text-muted` | Captions, placeholders, disabled text | `text-redis-text-muted` |
| `redis-bg-tertiary` | Section dividers, subtle backgrounds | `bg-redis-bg-tertiary` |
| `redis-border` | Input borders, card outlines | `border-redis-border` |

## Accessibility Requirements

- **Primary text** (`#091A23`) on white background: contrast ratio **15.6:1** ✅ (WCAG AAA)
- **Secondary text** (`#163341`) on white: contrast ratio **12.1:1** ✅ (WCAG AAA)
- **Muted text** (`#8A99A0`) on white: contrast ratio **3.1:1** ⚠️ (WCAG AA for large text only)
- **White text on Redis Red** (`#FF4438`): contrast ratio **4.0:1** ✅ (WCAG AA)
- **Never use muted text** (`#8A99A0`) for body copy or critical information — only for decorative or supplementary labels at 14px+ size.
- **Link text** (`#2D4754`) on white: contrast ratio **8.5:1** ✅ (WCAG AAA)

## Anti-Patterns

- **NEVER** use Tailwind defaults like `red-500`, `red-600` — always use `redis-red`, `redis-red-hover`.
- **NEVER** use `#000000` for text — use `redis-text` (`#091A23`).
- **NEVER** use arbitrary red hex values — always reference the Redis red scale tokens.
- **NEVER** apply `redis-text-muted` to text smaller than 14px or to required form labels.

