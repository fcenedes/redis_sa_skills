# Redis Brand Components

## Design Tokens

All components share these foundational values:

```css
/* Shared component tokens */
--redis-radius: 5px;
--redis-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
--redis-spacing-unit: 8px;  /* Base grid unit — all spacing is multiples of 8px */
```

## Button Variants

### Primary Button

Use a high-contrast filled button with a Redis Red accent for normal-size labels. White normal-size text on `Hyper` (`#FF4438`) or `Deep Hyper` (`#EB352A`) is below WCAG AA, so reserve filled red buttons for large/bold labels, icon-only accents, or reviewed component-specific treatments.

```css
.btn-primary {
  background-color: var(--redis-text-primary);
  color: #FFFFFF;
  border: 1px solid var(--redis-text-primary);
  border-left: 4px solid var(--redis-hyper);
  border-radius: var(--redis-radius);
  padding: 8px 24px; /* 1 × 3 grid units */
  min-height: 44px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--redis-transition);
}
.btn-primary:hover {
  background-color: var(--redis-text-secondary);
}
.btn-primary:active {
  background-color: var(--redis-text-primary);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--redis-hyper);
  outline-offset: 2px;
}
```

Tailwind: `min-h-11 bg-redis-text text-white border border-redis-text border-l-4 border-l-redis-hyper font-redis-body font-semibold rounded-[5px] px-6 py-2 hover:bg-redis-text-secondary transition-colors duration-200 ease-in-out`

Reviewed red treatment for large labels only: `min-h-11 bg-redis-hyper text-white text-xl font-semibold rounded-[5px] px-6 py-2`. Do not use this for normal-size button text without brand/design approval.

### Secondary Button

Outlined, transparent background. Use for secondary actions alongside a primary button.

```css
.btn-secondary {
  background-color: transparent;
  color: var(--redis-text-primary);
  border: 1px solid var(--redis-border-primary);
  border-radius: var(--redis-radius);
  padding: 8px 24px;
  min-height: 44px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--redis-transition);
}
.btn-secondary:hover {
  background-color: var(--redis-bg-tertiary);
  border-color: var(--redis-text-primary);
}
```

Tailwind: `min-h-11 bg-transparent text-redis-text border border-redis-border font-redis-body font-semibold rounded-[5px] px-6 py-2 hover:bg-redis-bg-tertiary transition-colors duration-200 ease-in-out`

### Tertiary Button

Subtle, no border. Use for less prominent actions like "Cancel" or inline links.

```css
.btn-tertiary {
  background-color: transparent;
  color: var(--redis-text-link);
  border: none;
  border-radius: var(--redis-radius);
  padding: 8px 24px;
  min-height: 44px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--redis-transition);
}
.btn-tertiary:hover {
  color: var(--redis-hyper);
  text-decoration: underline;
}
```

Tailwind: `min-h-11 text-redis-text-link font-redis-body font-medium rounded-[5px] px-6 py-2 hover:text-redis-hyper hover:underline transition-colors duration-200 ease-in-out`

## React Component Examples

```tsx
// Redis-branded button component (Tailwind)
interface RedisButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const variantClasses = {
  primary: 'bg-redis-text text-white border border-redis-text border-l-4 border-l-redis-hyper hover:bg-redis-text-secondary',
  secondary: 'bg-transparent text-redis-text border border-redis-border hover:bg-redis-bg-tertiary',
  tertiary: 'text-redis-text-link hover:text-redis-hyper hover:underline',
};

export function RedisButton({ variant = 'primary', className, ...props }: RedisButtonProps) {
  return (
    <button
      className={`min-h-11 font-redis-body font-semibold rounded-[5px] px-6 py-2 transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-redis-hyper focus-visible:outline-offset-2 ${variantClasses[variant]} ${className ?? ''}`}
      {...props}
    />
  );
}
```

## Card / Panel Pattern

```tsx
export function RedisCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-redis-border-secondary rounded-[5px] p-6 ${className ?? ''}`}>
      {children}
    </div>
  );
}
```

## Demo and App Layouts

For Redis demos, dashboards, developer tools, traces, and audit views, start from [delivery recipes](delivery-recipes.md). Keep Redis Red selective: one primary action, one selected Redis path, or one brand moment per view.

Use [status language](status-language.md) for live, sampled, modeled, derived, stale, pending, approved, evidence, and failed states. Pair status color with labels or icons; do not rely on color alone.

## Form Input Styling

```css
.redis-input {
  width: 100%;
  padding: 8px 16px;
  min-height: 44px;
  border: 1px solid var(--redis-border-secondary);
  border-radius: var(--redis-radius);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: var(--redis-text-primary);
  background-color: var(--redis-bg-primary);
  transition: var(--redis-transition);
}
.redis-input:focus {
  border-color: var(--redis-hyper);
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 68, 56, 0.2);
}
.redis-input::placeholder {
  color: var(--redis-text-muted);
}
```

Tailwind: `min-h-11 w-full px-4 py-2 border border-redis-border-secondary rounded-[5px] font-redis-body text-redis-text bg-white placeholder:text-redis-text-muted focus:border-redis-hyper focus:ring-2 focus:ring-redis-hyper/20 focus:outline-none transition-colors duration-200 ease-in-out`

## Lightweight Theme Configuration

Use this theme object when configuring component libraries that accept design tokens:

```ts
export const redisTheme = {
  radius: "5px",
  transition:
    "color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  light: {
    primary: "#091A23",
    primaryForeground: "#FFFFFF",
    focus: "#FF4438",
    border: "#163341",
  },
  dark: {
    primary: "#F0F4F5",
    primaryForeground: "#091A23",
    focus: "#FF4438",
    border: "#2D4754",
  },
};
```

Map these tokens into the target library's theme API. Do not assume a library-specific token name without checking its docs.

## Anti-Patterns

- **NEVER** use `border-radius` values other than `5px` (`rounded-[5px]`) for standard components.
- **NEVER** omit `transition` on interactive elements — all buttons and inputs must animate.
- **NEVER** animate every CSS property at once; it can animate layout and create jank.
- **NEVER** skip `:focus-visible` styles — they are required for keyboard accessibility.
- **NEVER** use padding/margin values that aren't multiples of 8px (the grid unit).
- **NEVER** ship buttons or inputs below `44px` target height.
- **NEVER** claim normal-size white text on `#FF4438` or `#EB352A` meets WCAG AA.
