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

| Font | Use For | Weights |
|------|---------|---------|
| **Space Grotesk** | Body text, H2, H3, buttons, form labels, UI copy | 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) |
| **Space Mono** | H1 headings, navigation labels, code blocks, monospace UI elements | 400 (Regular), 700 (Bold) |

**NEVER** use Space Mono for body text or paragraphs — it reduces readability at length.
**NEVER** use Space Grotesk for code snippets — always use Space Mono.

## Heading & Text Styles

```css
/* H1 — Space Mono, bold */
h1 {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;    /* 40px */
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--redis-text-primary);
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

/* Caption / Small — Space Grotesk, light */
.caption {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 300;
  font-size: 0.875rem;  /* 14px */
  line-height: 1.5;
  color: var(--redis-text-muted);
}

/* Navigation — Space Mono */
nav a {
  font-family: 'Space Mono', monospace;
  font-weight: 400;
  font-size: 0.875rem;  /* 14px */
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  color: var(--redis-red);
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
<h1 class="font-redis-mono text-4xl font-bold">Page Title</h1>
<h2 class="font-redis-body text-2xl font-semibold">Section Heading</h2>
<p class="font-redis-body text-base">Body copy uses Space Grotesk.</p>
<code class="font-redis-mono text-sm">redis-cli PING</code>
<nav class="font-redis-mono text-sm uppercase tracking-wider">Navigation</nav>
```

## Anti-Patterns

- **NEVER** set `font-family: sans-serif` or use system font stacks — always specify Space Grotesk.
- **NEVER** use Space Mono for paragraphs, descriptions, or any long-form reading.
- **NEVER** use weights outside the imported range (e.g., 800, 900 for Space Grotesk).
- **NEVER** omit the Google Fonts import — the fonts are not system fonts and will fall back incorrectly.

