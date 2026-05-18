# Redis Logo Usage Guidelines

## Official Logo Source

- Download from: [brand.redis.io/document/18](https://brand.redis.io/document/18) (requires brand portal access)
- The Redis logo is a trademark — do NOT redistribute logo files in public repos
- Always download official assets from the brand portal

## Logo Variants

- **Logo** (full Redis logo) — Use for headers, marketing pages, docs, and branded app shells.
- **Mark** (icon only) — Use for favicons, app icons, and compact spaces.
- Official digital SVG variants observed in the logo kit: `Red`, `Midnight`, `Black`, and `White` RGB.

## Local Asset Discovery

Before adding Redis logo assets, search the target repository for existing official files:

```bash
rg --files | rg -i 'Redis_(Logo|Mark)_(Red|Midnight|Black|White)_(RGB|CMYK|PMS)\.(svg|png|jpg|ai)$|redis_logo_overview\.pdf$'
```

Official digital SVG filenames observed in `Redis_logo_kit/01_Digital/SVG`:

| Asset Family | Official SVG Filenames |
| --- | --- |
| Full Redis logo | `Redis_Logo_Red_RGB.svg`, `Redis_Logo_Midnight_RGB.svg`, `Redis_Logo_Black_RGB.svg`, `Redis_Logo_White_RGB.svg` |
| Redis mark | `Redis_Mark_Red_RGB.svg`, `Redis_Mark_Midnight_RGB.svg`, `Redis_Mark_Black_RGB.svg`, `Redis_Mark_White_RGB.svg` |

Preferred repo-local paths when adding approved web assets:

| Asset | Preferred Path |
| --- | --- |
| Full red logo SVG | `public/brand/Redis_Logo_Red_RGB.svg` |
| Full midnight logo SVG | `public/brand/Redis_Logo_Midnight_RGB.svg` |
| Full white logo SVG | `public/brand/Redis_Logo_White_RGB.svg` |
| Red mark SVG | `public/brand/Redis_Mark_Red_RGB.svg` |
| Midnight mark SVG | `public/brand/Redis_Mark_Midnight_RGB.svg` |
| White mark SVG | `public/brand/Redis_Mark_White_RGB.svg` |
| Favicon SVG | `public/favicon.svg` copied from an official `Redis_Mark_*_RGB.svg` |

## Clear Space Rules

- Follow the rendered Redis brand portal or `redis_logo_overview.pdf` for clear-space rules.
- Do not keep unverified numeric clear-space rules as facts.

## Minimum Sizes

- Follow the rendered Redis brand portal or `redis_logo_overview.pdf` for minimum-size rules.
- Do not keep unverified numeric minimum-size rules as facts.

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
- NEVER vendor the full logo kit. Use only the specific approved web SVG assets needed by the repo.
- NEVER commit `.DS_Store`, `__MACOSX`, bulk zips, PDFs, print files, or generated asset folders.

## Favicon Guidance

- Use an official Redis mark for favicons
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
import redisLogo from '@/assets/Redis_Logo_Red_RGB.svg';
import redisIcon from '@/assets/Redis_Mark_Red_RGB.svg';

// Full logo for headers
<img src={redisLogo} alt="Redis" height={32} className="h-8 w-auto" />

// Mark for small contexts
<img src={redisIcon} alt="Redis" height={24} className="h-6 w-6" />
```
