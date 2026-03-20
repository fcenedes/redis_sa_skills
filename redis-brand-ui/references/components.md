# Redis Brand Components

## Design Tokens

All components share these foundational values:

```css
/* Shared component tokens */
--redis-radius: 5px;
--redis-transition: all 0.2s ease-in-out;
--redis-spacing-unit: 8px;  /* Base grid unit — all spacing is multiples of 8px */
```

## Button Variants

### Primary Button

Red background, white text. Use for primary CTAs and form submissions.

```css
.btn-primary {
  background-color: var(--redis-red);
  color: #FFFFFF;
  border: none;
  border-radius: var(--redis-radius);
  padding: 12px 24px; /* 1.5 × 3 grid units */
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--redis-transition);
}
.btn-primary:hover {
  background-color: var(--redis-red-hover);
}
.btn-primary:active {
  background-color: var(--redis-red-dark);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--redis-red);
  outline-offset: 2px;
}
```

Tailwind: `bg-redis-red text-white font-redis-body font-semibold rounded-[5px] px-6 py-3 hover:bg-redis-red-hover active:bg-redis-red-dark transition-all duration-200 ease-in-out`

### Secondary Button

Outlined, transparent background. Use for secondary actions alongside a primary button.

```css
.btn-secondary {
  background-color: transparent;
  color: var(--redis-text-primary);
  border: 1px solid var(--redis-border-primary);
  border-radius: var(--redis-radius);
  padding: 12px 24px;
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

Tailwind: `bg-transparent text-redis-text border border-redis-border font-redis-body font-semibold rounded-[5px] px-6 py-3 hover:bg-redis-bg-tertiary transition-all duration-200 ease-in-out`

### Tertiary Button

Subtle, no border. Use for less prominent actions like "Cancel" or inline links.

```css
.btn-tertiary {
  background-color: transparent;
  color: var(--redis-text-link);
  border: none;
  border-radius: var(--redis-radius);
  padding: 12px 24px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--redis-transition);
}
.btn-tertiary:hover {
  color: var(--redis-red);
  background-color: var(--redis-red-50);
}
```

Tailwind: `text-redis-text-link font-redis-body font-medium rounded-[5px] px-6 py-3 hover:text-redis-red hover:bg-redis-red-50 transition-all duration-200 ease-in-out`

## React Component Examples

```tsx
// Redis-branded button component (Tailwind)
interface RedisButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const variantClasses = {
  primary: 'bg-redis-red text-white hover:bg-redis-red-hover active:bg-redis-red-dark',
  secondary: 'bg-transparent text-redis-text border border-redis-border hover:bg-redis-bg-tertiary',
  tertiary: 'text-redis-text-link hover:text-redis-red hover:bg-redis-red-50',
};

export function RedisButton({ variant = 'primary', className, ...props }: RedisButtonProps) {
  return (
    <button
      className={`font-redis-body font-semibold rounded-[5px] px-6 py-3 transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-redis-red focus-visible:outline-offset-2 ${variantClasses[variant]} ${className ?? ''}`}
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

## Form Input Styling

```css
.redis-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--redis-border-secondary);
  border-radius: var(--redis-radius);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: var(--redis-text-primary);
  background-color: var(--redis-bg-primary);
  transition: var(--redis-transition);
}
.redis-input:focus {
  border-color: var(--redis-red);
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 68, 56, 0.2);
}
.redis-input::placeholder {
  color: var(--redis-text-muted);
}
```

Tailwind: `w-full px-4 py-2.5 border border-redis-border-secondary rounded-[5px] font-redis-body text-redis-text bg-white placeholder:text-redis-text-muted focus:border-redis-red focus:ring-2 focus:ring-redis-red/20 focus:outline-none transition-all duration-200 ease-in-out`

## HeroUI / NextUI Theme Configuration

Use this theme object when configuring HeroUI (formerly NextUI):

```ts
// heroui.config.ts or nextui.config.ts
import { heroui } from "@heroui/react";

export default {
  plugins: [
    heroui({
      themes: {
        "redis-light": {
          extend: "light",
          colors: {
            primary: {
              50: "#FFE8E6",
              100: "#FFD1CC",
              200: "#FFA399",
              300: "#FF7566",
              400: "#FF4438",
              500: "#FF4438",
              600: "#EB352A",
              700: "#CC2820",
              800: "#8A221C",
              900: "#5C1713",
              DEFAULT: "#FF4438",
              foreground: "#FFFFFF",
            },
            focus: "#FF4438",
          },
        },
        "redis-dark": {
          extend: "dark",
          colors: {
            primary: {
              50: "#5C1713",
              100: "#8A221C",
              200: "#CC2820",
              300: "#EB352A",
              400: "#FF4438",
              500: "#FF4438",
              600: "#FF7566",
              700: "#FFA399",
              800: "#FFD1CC",
              900: "#FFE8E6",
              DEFAULT: "#FF4438",
              foreground: "#FFFFFF",
            },
            focus: "#FF4438",
          },
        },
      },
    }),
  ],
};
```

Apply the theme in your app root:

```tsx
<HeroUIProvider theme="redis-light">
  <App />
</HeroUIProvider>
```

## Anti-Patterns

- **NEVER** use `border-radius` values other than `5px` (`rounded-[5px]`) for standard components.
- **NEVER** omit `transition` on interactive elements — all buttons and inputs must animate.
- **NEVER** skip `:focus-visible` styles — they are required for keyboard accessibility.
- **NEVER** use padding/margin values that aren't multiples of 8px (the grid unit).