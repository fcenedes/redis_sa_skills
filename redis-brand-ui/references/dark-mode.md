# Redis Brand Dark Mode

## Design Principles

1. **Redis Red stays Redis Red.** The primary brand color `#FF4438` does not change in dark mode.
2. **Invert the luminance relationship** — swap light backgrounds for dark ones, dark text for light.
3. **Preserve hierarchy** — primary, secondary, and muted text must remain visually distinct.
4. **Maintain contrast ratios** — all text must meet WCAG AA (4.5:1 for body, 3:1 for large text).

## Dark Mode Color Palette

| Token | Light Value | Dark Value | Usage |
|-------|------------|------------|-------|
| `--redis-red` | `#FF4438` | `#FF4438` | Unchanged — primary accent |
| `--redis-red-hover` | `#EB352A` | `#FF7566` | Lighter hover in dark contexts |
| `--redis-text-primary` | `#091A23` | `#F0F4F5` | Primary text |
| `--redis-text-secondary` | `#163341` | `#C8D1D5` | Secondary text |
| `--redis-text-link` | `#2D4754` | `#8AB4C7` | Link text |
| `--redis-text-muted` | `#8A99A0` | `#5A6A72` | Muted/caption text |
| `--redis-bg-primary` | `#FFFFFF` | `#0A1A23` | Page background |
| `--redis-bg-secondary` | `#FFFFFF` | `#122A35` | Card/panel background |
| `--redis-bg-tertiary` | `#B9C2C6` | `#1C3A47` | Subtle section background |
| `--redis-border-primary` | `#163341` | `#2D4754` | Primary borders |
| `--redis-border-secondary` | `#2D4754` | `#3D5764` | Secondary borders |

## CSS Custom Properties with `prefers-color-scheme`

```css
:root {
  /* Light mode (default) — values from colors.md */
  --redis-red: #FF4438;
  --redis-red-hover: #EB352A;
  --redis-text-primary: #091A23;
  --redis-text-secondary: #163341;
  --redis-text-link: #2D4754;
  --redis-text-muted: #8A99A0;
  --redis-bg-primary: #FFFFFF;
  --redis-bg-secondary: #FFFFFF;
  --redis-bg-tertiary: #B9C2C6;
  --redis-border-primary: #163341;
  --redis-border-secondary: #2D4754;
}

@media (prefers-color-scheme: dark) {
  :root {
    --redis-red-hover: #FF7566;
    --redis-text-primary: #F0F4F5;
    --redis-text-secondary: #C8D1D5;
    --redis-text-link: #8AB4C7;
    --redis-text-muted: #5A6A72;
    --redis-bg-primary: #0A1A23;
    --redis-bg-secondary: #122A35;
    --redis-bg-tertiary: #1C3A47;
    --redis-border-primary: #2D4754;
    --redis-border-secondary: #3D5764;
  }
}
```

## Class-Based Dark Mode (for Tailwind `class` strategy)

If using `darkMode: 'class'` in Tailwind:

```css
.dark {
  --redis-red-hover: #FF7566;
  --redis-text-primary: #F0F4F5;
  --redis-text-secondary: #C8D1D5;
  --redis-text-link: #8AB4C7;
  --redis-text-muted: #5A6A72;
  --redis-bg-primary: #0A1A23;
  --redis-bg-secondary: #122A35;
  --redis-bg-tertiary: #1C3A47;
  --redis-border-primary: #2D4754;
  --redis-border-secondary: #3D5764;
}
```

## Tailwind `dark:` Variant Mappings

When CSS custom properties are not used, apply dark overrides inline:

```html
<!-- Example: Card with dark mode -->
<div class="bg-white dark:bg-[#122A35] border-redis-border dark:border-[#2D4754] rounded-[5px] p-6">
  <h2 class="text-redis-text dark:text-[#F0F4F5]">Title</h2>
  <p class="text-redis-text-secondary dark:text-[#C8D1D5]">Description</p>
  <a class="text-redis-text-link dark:text-[#8AB4C7] hover:text-redis-red">Link</a>
</div>

<!-- Example: Primary button (no change needed — red stays red) -->
<button class="bg-redis-red text-white hover:bg-redis-red-hover dark:hover:bg-[#FF7566]">
  Get Started
</button>
```

**Prefer CSS custom properties** over inline `dark:` overrides — they keep markup cleaner and are easier to maintain.

## Anti-Patterns

- **NEVER** darken or desaturate Redis Red in dark mode — it must remain `#FF4438`.
- **NEVER** use pure black (`#000000`) as a dark background — use `#0A1A23` (derived from the brand palette).
- **NEVER** invert the Redis Red scale for decorative use — the scale order reversal is only for HeroUI theme config.
- **NEVER** skip contrast checks — dark mode text colors must meet WCAG AA against their background.
- **NEVER** forget to test dark mode — toggle between modes to verify all components render correctly.

