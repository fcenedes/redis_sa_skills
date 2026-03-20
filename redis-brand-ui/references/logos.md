# Redis Logo Usage Guidelines

## Official Logo Source

- Download from: [brand.redis.io/document/18](https://brand.redis.io/document/18) (requires brand portal access)
- The Redis logo is a trademark — do NOT redistribute logo files in public repos
- Always download official assets from the brand portal

## Logo Variants

- **Cube mark** (icon only) — Use for favicons, app icons, small spaces (min 24px)
- **Wordmark** (text only) — Use for inline text references
- **Lockup** (cube + wordmark) — Use for headers, marketing pages, docs (min 80px wide)
- Each available in: full color (Redis Red `#FF4438`), white (for dark backgrounds), dark (`#091A23`, for light backgrounds)

## Clear Space Rules

- Minimum clear space = 25% of logo height on all sides
- In CSS: `padding` equal to 25% of the logo's rendered height

## Minimum Sizes

- Cube mark: 24px digital, 10mm print
- Lockup: 80px wide digital

## Color Background Rules

- Full color logo on white/light backgrounds
- White logo on dark or colored backgrounds
- Dark logo on very light backgrounds where red lacks contrast
- NEVER place logo on busy/patterned backgrounds

## Anti-Patterns

- NEVER stretch, skew, or rotate the logo
- NEVER add drop shadows, glows, or gradients
- NEVER recolor to non-brand colors
- NEVER modify spacing between mark and wordmark
- NEVER recreate the logo in CSS/HTML — always use the SVG asset
- NEVER use outdated logo versions

## Favicon Guidance

- Use cube mark only for favicons
- Provide sizes: 16x16, 32x32, 180x180 (Apple touch icon)
- HTML link tags example:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## React Usage Example

```tsx
// Import your downloaded logo asset
import redisLogo from '@/assets/redis-lockup-color.svg';
import redisIcon from '@/assets/redis-mark-color.svg';

// Full lockup for headers
<img src={redisLogo} alt="Redis" height={32} className="h-8 w-auto" />

// Cube mark for small contexts
<img src={redisIcon} alt="Redis" height={24} className="h-6 w-6" />
```

