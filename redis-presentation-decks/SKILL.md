---
name: redis-presentation-decks
description: Create Redis-focused Reveal.js presentation decks for solution architecture, customer briefings, technical workshops, product narratives, QBRs, and sales engineering storytelling. Use when a user asks for Redis-branded slides, decks, or presentations that need Reveal.js HTML, speaker notes, charts, architecture flows, screenshot review, and overflow validation.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
  source: "Adapted from https://github.com/ryanbbrown/revealjs-skill"
---
# Redis Presentation Decks

Create polished Reveal.js decks that explain Redis systems with accurate technical evidence, Redis brand discipline, and presentation-ready visual QA.

## Required Workflow

1. **Clarify the deck job.** Identify audience, objective, presenter, time limit, delivery format, Redis products in scope, and whether the deck is executive, practitioner, workshop, or implementation review.
2. **Plan the story before HTML.** Build a slide outline with one message per slide, section dividers, speaker intent, and expected proof artifacts. For solution architecture decks, read [Redis deck patterns](references/redis-deck-patterns.md).
3. **Use the scaffold.** Generate the Reveal.js shell with `scripts/create-presentation.js`, then edit the deck HTML slide-by-slide. Do not hand-write the full Reveal.js boilerplate unless the scaffold cannot fit the request.
4. **Apply Redis brand defaults.** Use Redis Red `#FF4438`, primary text `#091A23`, secondary text `#163341`, muted text `#8A99A0`, Space Grotesk for body/H2/H3, and Space Mono for H1, code, commands, and compact technical labels.
5. **Make Redis evidence visible.** Use real commands, schemas, metrics, topology labels, or query fragments where they help the audience trust the architecture. Verify product-specific facts against current Redis docs or user-provided source material.
6. **Add speaker notes.** Include `<aside class="notes">` on all slides that need talk track, demo cues, objections, transitions, or timing guidance. Read [Reveal.js reference](references/revealjs-reference.md) for notes, fragments, code, and backgrounds.
7. **Validate charts before visual review.** Read [charts reference](references/charts.md) before adding Chart.js canvases. Run the chart checker when charts are present.
8. **Run overflow and screenshot review.** Run the overflow checker, export screenshots or PDF with Decktape, inspect every slide image, and revise until there is no clipping, unreadable text, bad contrast, or broken icon/chart rendering.

## Scaffold And Scripts

Resolve `<skill-dir>` to the folder containing this `SKILL.md`.

```bash
node <skill-dir>/scripts/create-presentation.js \
  --structure 1,1,d,3,1,d,1 \
  --title "Redis Solution Architecture" \
  --output deck/presentation.html
```

Useful scripts:

- `scripts/create-presentation.js`: generate a Redis-branded Reveal.js HTML scaffold and copy `references/base-styles.css` as `styles.css`.
- `scripts/check-charts.js`: validate `canvas[data-chart]` blocks for supported chart types, parseable JSON or CSV, datasets, and `maintainAspectRatio: false`.
- `scripts/check-overflow.js`: open the deck in Playwright Chromium and report slide content that exceeds slide bounds.

Install optional validation dependencies once when overflow checking is needed:

```bash
cd <skill-dir>
npm install
npx playwright install chromium
```

Run checks from the deck directory:

```bash
node <skill-dir>/scripts/check-charts.js presentation.html
node <skill-dir>/scripts/check-overflow.js presentation.html
npx decktape reveal "presentation.html?export" presentation.pdf --screenshots --screenshots-directory screenshots
```

Use `?export` when exporting so chart animations are disabled and screenshots capture final chart states.

## Redis Deck Requirements

- Use Redis Red for brand ownership, primary Redis components, active paths, and decisive emphasis. Do not flood every element with red.
- Use dark evidence blocks for `redis-cli`, JSON documents, Query Engine syntax, metrics, configs, and topology facts.
- Distinguish Redis Open Source, Redis Software, Redis Cloud, Redis Enterprise for Kubernetes, Redis Query Engine, RedisVL, LangCache, Streams, Cluster, Sentinel, and Active-Active when relevant.
- Show architecture behavior through layout: request path, cache hit/miss, write-through/write-behind, stream processing, vector retrieval, failover, replication, cluster sharding, and observability loops.
- Prefer source-backed numbers and short labels over generic claims. Add footnotes for benchmark conditions, customer-provided data, Redis docs, or assumptions.
- Use speaker notes for discovery context, objection handling, demo steps, and timing. Do not put presenter-only detail on the slide.

## Anti-Patterns

DO NOT:

- Use generic SaaS pitch-deck layouts when the request is a Redis technical or solution architecture deck.
- Use non-brand reds, pure black `#000000`, system fonts, or Space Mono for body paragraphs.
- Paste long paragraphs, API docs, or architecture prose onto slides. Convert detail into diagrams, evidence blocks, charts, or speaker notes.
- Show Redis as a vague box between app and database when Redis commands, data structures, modules, topology, or latency claims are central to the story.
- Include charts without `maintainAspectRatio: false` and a bounded flex/grid container.
- Deliver HTML based only on DOM inspection. Always inspect rendered screenshots for customer-facing decks.

## Reference Files

| File | Load When |
| --- | --- |
| [base-styles.css](references/base-styles.css) | The scaffold copies this into deck projects as the editable Redis Reveal.js theme. |
| [redis-deck-patterns.md](references/redis-deck-patterns.md) | Planning solution architecture stories, slide archetypes, Redis proof points, and anti-patterns. |
| [charts.md](references/charts.md) | Adding Chart.js visuals, KPI slides, latency/cost charts, or benchmark comparisons. |
| [revealjs-reference.md](references/revealjs-reference.md) | Using speaker notes, fragments, backgrounds, code highlighting, transitions, and exports. |

## Done Checklist

- Slide outline matches the audience and Redis use case.
- Redis brand tokens and typography are applied consistently.
- Technical slides include accurate Redis evidence where it matters.
- Speaker notes support the presenter rather than duplicating visible text.
- Chart checker passes when charts are present.
- Overflow checker passes.
- Every exported screenshot has been visually inspected and fixed.
