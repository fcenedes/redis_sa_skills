# Redis Brand Typography

## Google Fonts Imports

Add both imports to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

Or via CSS `@import`:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
```

## Font Family Rules

Use the rendered Redis typography guidance as the source of truth:

| Font | Use For | Notes |
| --- | --- | --- |
| TT Trailers | Expressive display headlines and brand texture | Use only when the official font is available and licensed in the target environment. Keep display use short and intentional. |
| Space Grotesk | Body text, subheads, UI copy, forms, tables, buttons, and product surfaces | Default Redis UI font. Weights 300-700. |
| Space Mono | Code, Redis commands, keys, identifiers, timestamps, technical labels, diagrams, and monospace UI elements | Do not use for paragraphs, navigation, general links, or long-form reading. Do not default all H1s to Space Mono. |
| Geist / Geist Mono | Redis documentation and developer documentation surfaces | Use only for documentation surfaces aligned with the brand portal Geist guidance. Do not make Geist the default Redis product UI font. |

If TT Trailers is unavailable, use Space Grotesk for display headings rather than substituting an unrelated display face.

**NEVER** use Space Mono for body text or paragraphs — it reduces readability at length. **NEVER** use Space Grotesk for code snippets — always use Space Mono.

## Heading & Text Styles

Use negative letter-spacing only for approved display or marketing compositions. For product UI, dashboards, tables, forms, sidebars, compact panels, and tool surfaces, keep `letter-spacing: 0` unless the official brand composition specifically requires otherwise.

```css
/* H1 - Space Grotesk default for product UI */
h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;    /* 40px */
  line-height: 1.2;
  letter-spacing: 0;
  color: var(--redis-text-primary);
}

/* Display heading - only for approved marketing/brand compositions */
.display-heading {
  font-family: 'TT Trailers', 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

/* H2 — Space Grotesk, semibold */
h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1.75rem;   /* 28px */
  line-height: 1.3;
  color: var(--redis-text-primary);
}

/* H3 — Space Grotesk, medium */
h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;   /* 20px */
  line-height: 1.4;
  color: var(--redis-text-primary);
}

/* Body — Space Grotesk, regular */
body {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 400;
  font-size: 1rem;      /* 16px */
  line-height: 1.6;
  color: var(--redis-text-primary);
}

/* Caption / Small - Space Grotesk, readable */
.caption {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;  /* 14px */
  line-height: 1.5;
  color: var(--redis-text-secondary);
}

/* Navigation - Space Grotesk by default */
nav a {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;  /* 14px */
  letter-spacing: 0;
  color: var(--redis-text-link);
}

/* Code — Space Mono */
code, pre {
  font-family: 'Space Mono', monospace;
  font-weight: 400;
  font-size: 0.875rem;  /* 14px */
  line-height: 1.6;
}

/* Links — Space Grotesk, underlined */
a {
  font-family: 'Space Grotesk', sans-serif;
  color: var(--redis-text-link);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease-in-out;
}
a:hover {
  color: var(--redis-hyper);
}
```

## Tailwind CSS Configuration

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'redis-body': ['"Space Grotesk"', 'sans-serif'],
        'redis-mono': ['"Space Mono"', 'monospace'],
      },
    },
  },
};
```

Usage in markup:

```html
<h1 class="font-redis-body text-4xl font-bold">Page Title</h1>
<h2 class="font-redis-body text-2xl font-semibold">Section Heading</h2>
<p class="font-redis-body text-base">Body copy uses Space Grotesk.</p>
<code class="font-redis-mono text-sm">redis-cli PING</code>
<nav class="font-redis-body text-sm font-medium">Navigation</nav>
```

## Anti-Patterns

- **NEVER** set `font-family: sans-serif` or use system font stacks — always specify Space Grotesk.
- **NEVER** use Space Mono for paragraphs, descriptions, or any long-form reading.
- **NEVER** use weights outside the imported range (e.g., 800, 900 for Space Grotesk).
- **NEVER** omit the Google Fonts import — the fonts are not system fonts and will fall back incorrectly.
