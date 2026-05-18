# Redis Brand UI Reviewable Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the current `redis-brand-ui` skill so agents can deliver Redis-branded demos and applications faster, with better brand fidelity, accessibility, and product polish, without turning the skill into a new design system.

**Architecture:** Keep `redis-brand-ui/SKILL.md` as the short trigger and routing document under the repository guideline of roughly 150 lines. Preserve the existing brand layer for colors, typography, spacing, radius, logo rules, and dark mode; improve the weak spots with small, reviewable reference chapters and copy-ready recipes. Treat the rendered content on `brand.redis.io` and official Redis asset bundles as source material; do not promote page-code colors, invented semantics, or broad product-design theory to official Redis guidance.

**Tech Stack:** Markdown skill files, Bash repository validation, optional Node.js contrast helper, frontend guidance for CSS custom properties, Tailwind v4, React, Vitest, axe, and Playwright.

---

## Review Model

Each chapter below is intentionally independent. Reviewers can mark each chapter as:

- **Accept now:** implement this chapter in the next pass.
- **Accept with edits:** implement after updating the proposed text or scope.
- **Defer:** leave this out of the first upgrade.
- **Reject:** keep the current skill behavior for this area.

Default decision principle: keep the current Redis brand primitives unless a chapter corrects a factual issue, improves brand alignment, or adds a small reusable recipe that helps an agent ship a Redis demo/application faster.

## Improvement Principles

This is an evolutionary upgrade, not a redesign.

- **Brand first:** Use official Redis colors, type roles, logo assets, and asset naming as the baseline. Product extensions must be labeled as extensions.
- **Finesse over breadth:** Prefer fewer, sharper rules that improve visual quality: hierarchy, spacing, contrast, typography roles, restrained red usage, and exact asset use.
- **Recipes over frameworks:** Give agents ready-to-use patterns for common Redis demo/app surfaces instead of asking them to invent a design system.
- **Faster delivery:** Include copy-ready tokens, component treatments, and layout recipes that work for light/dark mode and reduce decision load.
- **No revolution:** Do not replace the current skill structure, do not introduce a full semantic palette without review, and do not make every Redis UI look like a marketing page.

Non-goals:

- Build a complete Redis product design system.
- Vendor official brand resources into this repo.
- Replace app-specific component libraries or icon systems.
- Invent unofficial Redis brand colors to solve product UI needs.

Recommended first review decision:

| Chapter | Recommendation | Reason |
| --- | --- | --- |
| Chapter 1: Accessibility and Contrast | Accept now | Current documented contrast claims are materially wrong and can lead agents to ship inaccessible UI. |
| Chapter 2: Demo and App Delivery Recipes | Accept now | Gives agents practical starting points for common Redis surfaces without creating a new framework. |
| Chapter 3: Status and Meaning Labels | Accept now | Prevents Redis Red from being overloaded and makes demos clearer without defining a full semantic color system. |
| Chapter 4: Data Visualization Finesse | Defer | Useful, but should stay recipe-level until reviewers approve any non-brand product colors. |
| Chapter 5: Product Microcopy Guardrails | Accept now | Supports trustworthy SA demos and operational interfaces without becoming a writing manual. |
| Chapter 6: Implementation Starter Snippets | Accept with edits | Useful if kept small and copy-ready in references; too much code in `SKILL.md` would violate repo style. |
| Chapter 7: Typography Alignment and Tracking | Accept now | Aligns the skill with the rendered typography guidance, including Geist as docs-specific typography. |
| Chapter 8: Logo Asset Guidance | Accept now | Makes the existing logo rule actionable in local repos. |
| Chapter 9: Validation | Accept now | Keeps quality gates explicit and repeatable. |
| Chapter 10: Icon and Illustration Assets | Accept with edits | Official bundles exist; guidance should help agents reuse them selectively, not make asset use mandatory. |

## File Structure

Modify:

- `redis-brand-ui/SKILL.md`
  - Keep concise.
  - Add links to any accepted new reference chapters.
  - Correct the primary button text guidance if Chapter 1 is accepted.

- `redis-brand-ui/references/colors.md`
  - Correct contrast ratios.
  - Add approved text/background pairings.
  - Add fallback treatments for Redis Red.

- `redis-brand-ui/references/dark-mode.md`
  - Correct dark muted text usage.
  - Add accessible dark-mode alternatives.

- `redis-brand-ui/references/components.md`
  - Update primary button guidance after contrast decision.
  - Add compact demo/application component treatments only if Chapter 2 is accepted.

- `redis-brand-ui/references/typography.md`
  - Align font roles with the brand portal.
  - Qualify negative letter-spacing for display/marketing use only.
  - Document Geist and Geist Mono as documentation-specific fonts, not default product UI fonts.

- `redis-brand-ui/references/logos.md`
  - Add local asset discovery and directory conventions.

Create if accepted:

- `redis-brand-ui/references/delivery-recipes.md`
  - Redis-branded demo/application recipes for dashboard, developer tool, documentation, and operational inspection surfaces.

- `redis-brand-ui/references/status-language.md`
  - Lightweight status, evidence, authority, freshness, and provenance labels.

- `redis-brand-ui/references/data-visualization.md`
  - Redis-friendly chart and diagram finesse guidance.

- `redis-brand-ui/references/product-microcopy.md`
  - UI copy guardrails for live, modeled, derived, pending, approved, evidence, and authority states.

- `redis-brand-ui/references/implementation-patterns.md`
  - Copy-ready Tailwind v4, CSS variable, React token, Vitest, axe, and Playwright starter snippets.

- `redis-brand-ui/references/asset-libraries.md`
  - Official icon and editorial illustration library discovery and usage guardrails.

- `redis-brand-ui/scripts/check-contrast.js`
  - Optional local contrast check for documented brand pairings.

Verification:

- `bash scripts/validate-skills.sh`
- `node redis-brand-ui/scripts/check-contrast.js` if Chapter 9 includes the optional script.

---

## Agent Fast Path

The upgraded skill should help an agent move from prompt to Redis-branded UI with a short, repeatable sequence:

1. Pick the closest recipe from `delivery-recipes.md`: demo landing, operational dashboard, developer tool, evidence/audit view, trace/dependency view, or documentation surface.
2. Apply the core brand tokens: Hyper, Deep Hyper, Midnight, Dusk tones, 5px radius, 8px spacing, Space Grotesk, and Space Mono for technical values.
3. Use Redis Red selectively: primary action, active navigation, Redis-owned element, or selected path.
4. Add source, freshness, and status labels from `status-language.md` for any operational data.
5. Use official Redis logo/mark filenames when assets are needed; use icon/illustration bundles only when the asset meaning matches the UI state.
6. Run the contrast checks and repository validator before calling the UI complete.

This fast path should appear in the main `SKILL.md` as a compact "For demos/apps" checklist if reviewers accept Chapters 1, 2, 3, 8, and 9.

---

## Brand Source Audit

The plan must distinguish confirmed Redis brand colors from implementation proposals. Inspect the rendered content at `https://brand.redis.io/document/4` before changing tokens. Use visible guideline text and visible palette swatches, not embedded page code, as the source of truth.

Confirmed in the rendered Redis brand portal content:

| Hex | Source Observation | Use in Plan |
| --- | --- | --- |
| `#FFFFFF` | `White` swatch | White |
| `#FF4438` | `Hyper` swatch | Signature brand red |
| `#EB352A` | `Deep Hyper` swatch | Deep brand red |
| `#091A23` | `Midnight` swatch | Primary dark tone |
| `#163341` | `Dusk` swatch | Deep blue tone |
| `#2D4754` | `Dusk 90%` swatch | Dusk tone |
| `#5C707A` | `Dusk 70%` swatch | Dusk tone |
| `#8A99A0` | `Dusk 50%` swatch | Dusk tone |
| `#B9C2C6` | `Dusk 30%` swatch | Dusk tone |

The rendered color page also identifies secondary highlighter colors by name: Violet, Sky Blue, and Yellow. Use their exact hex values only after reading them from the visible palette swatches.

Do not present these first-draft or code-derived colors as official Redis brand colors unless reviewers can point to them in the rendered brand portal content: `#CC2820`, `#0A1A23`, `#5A6A72`, `#8FA1AA`, `#2FB344`, `#D98A00`, `#7B61FF`, `#8AB4C7`, `#8A221C`.

Visible guideline notes that must influence the plan:

- The primary palette is driven by the signature brand color `Hyper`.
- `Midnight`, `Dusk`, and Dusk tones add nuance and depth.
- `Violet`, `Sky Blue`, and `Yellow` are secondary highlighter colors used sparingly as accents.
- The color legibility page says `Hyper` is reserved for prominent brand moments and is not for everyday body copy.
- The correct-usage examples include combinations such as `Hyper + Deep Hyper + White`, but this does not by itself mean normal-size UI labels on those colors pass accessibility requirements.

Official resource bundles inspected on 2026-05-17:

| Bundle | Contents Observed | Plan Use |
| --- | --- | --- |
| `Redis_LogoSuite_031225.zip` / `Redis_logo_kit.zip` | Digital `SVG`, `PNG`, `JPG`, and `AI` assets for `Redis_Logo_*_RGB` and `Redis_Mark_*_RGB`; print `CMYK` and `PMS` `AI` assets; `redis_logo_overview.pdf` | Use exact logo/mark filenames in Chapter 8. Do not copy the whole kit into this repo. |
| `Redis_Icon_library_031225.zip` | Generic Marketing Icons, Industry Icons, Product Feature Icons, Redis Proprietary Feature Icons; `SVG` and `PNG`; `48x48` and `64x64`; color folders such as `Hyper`, `Midnight`, `White`, and `Duotone` | Use only as optional asset-library guidance in Chapter 10. Do not treat every icon as suitable for product UI controls. |
| `Redis_Editorial_Illustration_library_031225.zip` | Built In-house, Product, and Themes illustration sets; `SVG` and `PNG`; includes product states such as `NoResults`, `SearchIndexNeeded`, `Success`, and `UserAgreement` | Use for empty/success/onboarding/product illustrations when a repo has access to official assets. Do not recreate these illustrations from memory. |

Repository hygiene for all downloaded resources:

- Do not commit bulk zips, `.DS_Store`, `__MACOSX`, print `AI` files, PDFs, or large binary assets unless a reviewer explicitly approves that asset for the repo.
- Prefer web `SVG` assets for implementation examples.
- Keep any copied brand assets in a deliberate repo-local asset directory, not in generated folders such as `dist/`.

---

## Chapter 1: Accessibility and Contrast

**Decision Scope:** Correct inaccurate contrast claims and define accessible pairings. This chapter can ship without any other chapter.

**Files:**

- Modify: `redis-brand-ui/SKILL.md`
- Modify: `redis-brand-ui/references/colors.md`
- Modify: `redis-brand-ui/references/dark-mode.md`
- Modify: `redis-brand-ui/references/components.md`

### Proposed Changes

- Correct the contrast documentation without inventing new brand colors.
- Keep the rendered brand guidance visible in the skill:
  - `Hyper` (`#FF4438`) is the signature brand red.
  - `Deep Hyper` (`#EB352A`) is part of the visible primary palette.
  - The legibility page says `Hyper` is for prominent brand moments, not everyday body copy.
- Mark `#091A23` text on `#FF4438` as a contrast-safe pairing made from visible official colors, but not an automatically approved brand pattern for primary buttons. Require reviewer approval before recommending it for primary buttons.
- Remove `#CC2820`, `#0A1A23`, `#5A6A72`, `#8FA1AA`, and `#8A221C` from Chapter 1 because they were not confirmed in the rendered brand portal content.
- Correct documented ratios:
  - `#FFFFFF` on `#FF4438`: about `3.42:1`, not AA for normal text.
  - `#FFFFFF` on `#EB352A`: about `4.14:1`, not AA for normal text.
  - `#091A23` on `#FF4438`: about `5.18:1`, AA for normal text but requires brand-pattern approval for primary buttons.
  - `#8A99A0` on white: about `2.94:1`, not AA for normal text.
  - `#5C707A` on `#091A23`: about `3.42:1`, acceptable only for large or non-critical text.
- Add a concise accessibility matrix in `colors.md`.

### Proposed Text for `redis-brand-ui/SKILL.md`

Replace the current primary button line:

```markdown
- Primary buttons: `#FF4438` background, white text, `5px` border-radius.
```

With:

```markdown
- Primary buttons: use visible Redis palette colors only. `Hyper` (`#FF4438`) and `Deep Hyper` (`#EB352A`) are brand reds, but white normal-size text on either is below WCAG AA. Use them for prominent brand moments, large labels, icon accents, or reviewed component-specific treatments.
```

Add this color rule under `### Colors`:

```markdown
- Check text/background contrast before shipping. Redis Red is the brand accent, but white normal-size text on `#FF4438` and `#EB352A` does not meet WCAG AA.
```

### Proposed Text for `colors.md`

Replace the `## Accessibility Requirements` section with:

```markdown
## Accessibility Requirements

Use WCAG contrast checks for every text/background pairing. These ratios are the documented baseline for Redis brand tokens:

| Foreground | Background | Ratio | Safe Use |
| --- | --- | ---: | --- |
| `#091A23` | `#FFFFFF` | `17.74:1` | Normal text, large text, icons |
| `#163341` | `#FFFFFF` | `13.26:1` | Normal text, large text, icons |
| `#FFFFFF` | `#091A23` | `17.74:1` | Normal text, large text, icons |
| `#FFFFFF` | `#163341` | `13.26:1` | Normal text, large text, icons |
| `#FFFFFF` | `#2D4754` | `8.36:1` | Normal text, large text, icons |
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
```

### Proposed Text for `dark-mode.md`

Add this before the dark palette table:

```markdown
The Redis brand portal includes a `Color & type legibility` matrix for light and dark color pairings, including which combinations are suitable for large text and small text. Use that rendered matrix as the source of truth for dark/light text-background combinations. Treat any full application dark-mode theme tokens as product UI extensions unless each token and use case is confirmed against the matrix.
```

### Acceptance Criteria

- `colors.md` no longer claims white on `#FF4438` passes AA for normal text.
- `components.md` identifies the visible palette limitation instead of silently replacing it with invented colors.
- `dark-mode.md` uses the official color/type legibility matrix for dark/light pairings and labels any full app-theme tokens as product extensions.
- The main `SKILL.md` remains under roughly 150 lines.

---

## Chapter 2: Demo and App Delivery Recipes

**Decision Scope:** Add Redis-branded recipes that help agents quickly build polished demos, RedisInsight plugins, dashboards, documentation tools, and field-engineering applications. This is not a new design system; it is a set of starting points.

**Files:**

- Create: `redis-brand-ui/references/delivery-recipes.md`
- Modify: `redis-brand-ui/SKILL.md`
- Modify: `redis-brand-ui/references/components.md`

### Proposed `delivery-recipes.md`

```markdown
# Redis Demo and App Delivery Recipes

Use these recipes when an agent needs to ship a Redis-branded demo or application quickly. Start from the closest recipe, then adapt the data and components. Keep the core Redis brand primitives from `SKILL.md`.

## Shared Style Defaults

- Use Space Grotesk for UI text and Space Mono only for commands, keys, IDs, timestamps, ports, hashes, and CLI output.
- Use Redis Red / `Hyper` for brand accents, selected Redis entities, active navigation, and one primary action.
- Use Midnight and Dusk tones for structure, labels, borders, and hierarchy.
- Use 5px radius and 8px spacing units.
- Prefer compact, scannable layouts over decorative hero sections for tools and dashboards.
- In dark mode, keep contrast verified against the Redis color/type legibility matrix.

## Finesse Rules

- Create hierarchy with type weight, spacing, and Dusk tones before adding more color.
- Keep red accents intentional: one primary action, one selected path, or one brand moment per view.
- Keep surfaces flat and purposeful; use cards for repeated items, modals, or framed tools, not every section.
- Align controls, metric labels, and timestamps to make dense data easy to scan.
- Use official illustrations for empty/setup/success states, not as decorative filler.
- Make light and dark mode feel like the same product: same layout, same hierarchy, adjusted contrast.

## Recipe: Demo Landing + Live Panel

Best for workshops, customer demos, and proof-of-concept apps.

- Top area: Redis logo, concise demo title, one-sentence purpose, primary action.
- Main area: live status strip, key metric, recent command/result, and next action.
- Supporting area: architecture summary, dataset/source, setup state, and reset/replay control.
- Use an official Redis illustration only when it explains the demo or empty/setup state.
- Avoid oversized marketing copy once the user is inside the working demo.

## Recipe: Operational Dashboard

- Put the highest-risk state, primary metric, and next action in the first viewport.
- Use a status strip, compact metric row, event table, and inspection panel before adding charts.
- Put source and freshness near operational metrics.
- Use colored borders, icons, and labels for state; do not flood panels with state color.
- Keep Redis Red for active selection or the primary Redis path.

## Recipe: Developer Tool

- First viewport: connection/database selector, command or query input, result preview, and execution state.
- Use Space Mono for commands, keys, IDs, and output snippets.
- Keep destructive actions visually separate from Redis Red primary actions.
- Show copy, retry, export, and reset affordances near the result they affect.

## Recipe: Evidence or Audit View

- Use a table or vertical timeline with timestamp, actor, source, command, and result.
- Keep evidence rows neutral; use Redis Red only for selection, Redis-owned source, or primary emphasis.
- Make freshness, sampling, and derivation visible in row labels.
- Prefer row expansion over nested cards.

## Recipe: Trace or Dependency View

- Use a left rail, compact event rows, and clear time ordering.
- Distinguish source-of-truth nodes from derived nodes with labels and line style, not color alone.
- Use Redis Red for Redis systems or selected paths, not every edge.
- Do not imply causality unless the UI has evidence for it.

## Recipe: Documentation or Developer Education Surface

- Use the Geist guidance only for documentation surfaces aligned with the Redis brand portal.
- Keep examples executable and short.
- Put command, explanation, and expected result close together.
- Use official icons or illustrations sparingly to orient the reader, not to decorate dense technical content.

## Empty, Loading, Error, Warning, and Degraded States

- Empty: say what data is missing and the next action.
- Loading: show the operation or source being loaded.
- Error: state what failed, the source, and the retry or recovery action.
- Warning: explain the degraded capability and whether data is still safe to use.
- Degraded: mark what is live, stale, sampled, or unavailable.

## DO NOT

- Do not use a marketing hero as the first screen of a tool unless the requested deliverable is a landing page.
- Do not make every active, warning, error, and selected state Redis Red.
- Do not hide source, freshness, or confidence for operational data.
- Do not use cards inside cards for dashboard sections.
- Do not introduce a separate design system before applying the recipes above.
```

### Proposed `SKILL.md` Addition

Add one reference row:

```markdown
| delivery-recipes | Fast Redis demo/app recipes for dashboards, developer tools, docs, traces, and audit views |
```

Add one component rule:

```markdown
- For demos and applications, start from [delivery recipes](references/delivery-recipes.md) before inventing a new layout.
```

### Acceptance Criteria

- The new reference file is Redis-specific, concise, and recipe-based.
- The main skill points agents to product guidance without growing beyond the concise target.
- RedisInsight plugin and demo use cases are explicitly covered.
- Agents can pick one recipe and start implementation without needing a separate design pass.

---

## Chapter 3: Status and Meaning Labels

**Decision Scope:** Add lightweight labels and treatments so Redis Red remains a brand accent rather than a universal status color. Keep this chapter focused on clarity, not a full semantic color system.

**Files:**

- Create: `redis-brand-ui/references/status-language.md`
- Modify: `redis-brand-ui/SKILL.md`
- Modify: `redis-brand-ui/references/colors.md`

### Proposed `status-language.md`

```markdown
# Redis Status and Meaning Labels

Redis Red is the brand accent. Use labels, icons, borders, and source/freshness copy to carry meaning. Do not build a full semantic color system inside this skill unless reviewers approve it later.

## Required Labels

| Label | Meaning | Preferred Treatment |
| --- | --- | --- |
| `Live` | Current data from an active source | Status pill plus source and freshness timestamp |
| `Sampled` | Subset of live or historical data | Neutral pill plus sample size or window |
| `Modeled` | Hypothetical or calculated scenario | Dashed outline or neutral pill plus source note |
| `Derived` | Computed from another source | Neutral pill plus source relationship |
| `Receipt` | Evidence that an event occurred | Timestamp, source, actor/system, command/result |
| `Source` | Origin of data | Source label close to metric/table/chart |
| `Approved` | Human or system approval completed | Explicit approver/system and time |
| `Pending approval` | Approval requested but incomplete | Pending label plus next step |
| `Stale` | Older than expected freshness window | Timestamp and refresh/retry action |
| `Failed` | Operation could not complete | Failure label plus recovery action |

## Rules

- Pair color with text or icon; do not rely on color alone.
- Keep Redis Red for brand, selected Redis entities, active navigation, and primary actions.
- Use app-specific error treatment only for actual failures, blocked states, destructive actions, or security-relevant problems.
- Distinguish live data from modeled data in the visible label.
- Distinguish evidence from authority in the visible label.
- When adding non-brand state colors, label them as product UI extensions and verify contrast.

## DO NOT

- Do not use Redis Red for healthy, warning, pending, and failed states at the same time.
- Do not label derived output as approved or authoritative.
- Do not show stale or sampled data as live.
- Do not introduce green/amber/error palettes as official Redis brand colors.
```

### Proposed `colors.md` Addition

Add this section after color usage rules:

```markdown
## Brand Color vs Product Meaning

Redis Red identifies the Redis brand, selected Redis entities, active navigation, and primary actions. It does not mean error by default. Use `status-language.md` for labels that distinguish live, sampled, modeled, derived, stale, pending, approved, evidence, source, and failed states.
```

### Acceptance Criteria

- Agents have clear rules for brand color versus product meaning.
- The file gives enough labels to make SA demos and operational tools trustworthy without defining a broad design system.
- State meaning does not depend on color alone.

---

## Chapter 4: Data Visualization Finesse

**Decision Scope:** Add small chart and diagram rules that improve Redis visual polish without inventing a full palette. This chapter is deferred until reviewers decide whether any product-semantic colors beyond the visible Redis brand palette are allowed.

**Files:**

- Create: `redis-brand-ui/references/data-visualization.md`
- Modify: `redis-brand-ui/SKILL.md`

### Proposed `data-visualization.md`

```markdown
# Redis Data Visualization Finesse

Use this guidance for Redis-branded dashboards, charts, diagrams, coverage maps, flow views, and provenance visuals. Keep Redis Red selective and make labels do the work.

## Palette Roles

| Role | Color | Use |
| --- | --- | --- |
| Redis Brand | `Hyper` / `#FF4438` | Redis-owned series, selected item, primary highlight |
| Deep Brand | `Deep Hyper` / `#EB352A` | Secondary Redis-owned highlight |
| Ink | `Midnight` / `#091A23` | Labels, axes, high-emphasis marks |
| Neutral | `Dusk` and Dusk tones | Secondary series, grid, neutral traces |
| Highlighter accents | Violet, Sky Blue, Yellow | Sparse accents only; use exact visible swatch hex values after review |
| Semantic product states | Reviewer-approved product extension tokens | Healthy, warning, failed, pending, derived, modeled states |

## Fast Chart Defaults

- Use Redis Red for the primary Redis series only.
- Use Dusk tones and the visible highlighter colors for additional series.
- Do not invent green, amber, or violet state tokens and call them Redis brand colors.
- Use labels, markers, or patterns when more than four categories appear.
- Keep gridlines quiet and labels high contrast.
- Put the key takeaway near the chart, not in a separate paragraph.

## Sequential Scales

- Use light neutral to strong Redis Red for Redis intensity maps.
- Do not put normal-size white labels on light or mid red cells.
- Use a separate legend with numeric thresholds.

## Product Semantic Scales

- If healthy/warning/failed states require green, amber, or error red, define them as product UI extensions outside the official Redis brand palette.
- Pair semantic color with labels or icons.

## Heatmaps

- Keep cell labels dark unless the cell background is verified dark enough for white text.
- Provide hover or table fallback for exact values.

## State Diagrams and Flows

- Use Redis Red for Redis systems or selected paths.
- Use line style for provenance: solid for observed, dashed for modeled, dotted for optional.
- Label edge meaning directly.

## DO NOT

- Do not use Redis Red for every chart series.
- Do not use color as the only distinction in provenance or diff views.
- Do not invent rainbow palettes that fight the Redis brand.
```

### Acceptance Criteria

- Chart guidance is usable without external design docs.
- Palette choices are state-aware and accessible enough for implementation checks.
- The reference does not duplicate the `redis-excalidraw-diagrams` skill; it only covers UI and dashboard visualization.

---

## Chapter 5: Product Microcopy Guardrails

**Decision Scope:** Add copy rules that prevent agents from overclaiming evidence, authority, freshness, and approval.

**Files:**

- Create: `redis-brand-ui/references/product-microcopy.md`
- Modify: `redis-brand-ui/SKILL.md`

### Proposed `product-microcopy.md`

```markdown
# Redis Product Microcopy Guardrails

Use precise UI labels in Redis dashboards, demos, plugins, and operational tools. Keep copy short enough for real components.

## Required Distinctions

| Say | When It Means |
| --- | --- |
| `Live` | The UI is connected to a current source and data is fresh within the displayed window. |
| `Sampled` | The UI shows a subset of live or historical data. |
| `Modeled` | The UI shows a hypothetical or calculated scenario. |
| `Derived` | The UI shows output computed from another source. |
| `Receipt` | The UI shows evidence that something occurred. |
| `Source` | The UI identifies the origin of the data. |
| `Approved` | A human or system approval has completed. |
| `Pending approval` | Approval has been requested but not completed. |
| `Stale` | Data is older than the expected freshness window. |

## Rules

- Put source and freshness near operational metrics.
- Use verbs that match system capability: `Queued`, `Applied`, `Synced`, `Sampled`, `Estimated`, `Approved`.
- State uncertainty directly when data is modeled, sampled, stale, or derived.
- Use Redis command names exactly and format them in Space Mono.
- Prefer labels that fit in compact UI: `Live`, `Stale`, `Sampled`, `Modeled`, `Derived`, `Pending approval`.
- Put longer explanation in tooltips, table expansion, or details panels.

## DO NOT

- Do not call a receipt an approval.
- Do not call modeled data live.
- Do not call derived state the source state.
- Do not hide stale, sampled, or partial data behind confident labels.
- Do not use marketing claims inside operational status messages.
```

### Acceptance Criteria

- The copy guidance is short, concrete, and Redis-operational.
- It helps dashboards and demos remain trustworthy.
- It does not become a general writing-style guide.

---

## Chapter 6: Implementation Starter Snippets

**Decision Scope:** Add a small starter-kit reference so agents can implement Redis tokens quickly. Keep snippets in a reference file, not in `SKILL.md`.

**Files:**

- Create: `redis-brand-ui/references/implementation-patterns.md`
- Modify: `redis-brand-ui/SKILL.md`

### Proposed `implementation-patterns.md`

````markdown
# Redis Brand Implementation Starter Snippets

Use these snippets when implementing Redis-branded web interfaces. Copy only the pieces needed by the target app.

## CSS Variables

```css
:root {
  --redis-red: #FF4438;
  --redis-deep-hyper: #EB352A;
  --redis-red-text: #091A23;
  --redis-text-primary: #091A23;
  --redis-text-secondary: #163341;
  --redis-bg-primary: #FFFFFF;
  --redis-radius: 5px;
  --redis-spacing-unit: 8px;
}
```

## Tailwind v4 CSS-First Tokens

```css
@theme {
  --color-redis-red: #FF4438;
  --color-redis-deep-hyper: #EB352A;
  --color-redis-red-text: #091A23;
  --color-redis-text: #091A23;
  --color-redis-text-secondary: #163341;
  --radius-redis: 5px;
  --font-redis-body: "Space Grotesk", sans-serif;
  --font-redis-mono: "Space Mono", monospace;
}
```

## React Token Usage

```tsx
type RedisButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function RedisButton({ variant = "primary", className = "", ...props }: RedisButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-redis-red text-redis-red-text hover:bg-[#EB352A]"
      : "border border-redis-text-secondary text-redis-text bg-transparent";

  return (
    <button
      className={`rounded-redis px-6 py-3 font-redis-body font-semibold transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redis-red ${classes} ${className}`}
      {...props}
    />
  );
}
```

## Vitest Contrast Assertion

```ts
import { describe, expect, it } from "vitest";

function luminance(hex: string) {
  const values = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((value) => parseInt(value, 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));

  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

function contrast(foreground: string, background: string) {
  const first = luminance(foreground);
  const second = luminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("Redis brand contrast", () => {
  it("keeps normal button text readable on Redis Red", () => {
    expect(contrast("#091A23", "#FF4438")).toBeGreaterThanOrEqual(4.5);
  });
});
```

## Playwright Visual Check

```ts
import { expect, test } from "@playwright/test";

test("Redis primary button uses accessible text color", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: /deploy|save|run|apply/i }).first();
  await expect(button).toBeVisible();
  await expect(button).toHaveCSS("background-color", "rgb(255, 68, 56)");
  await expect(button).toHaveCSS("color", "rgb(9, 26, 35)");
});
```
````

### Acceptance Criteria

- Snippets remain reference material and do not bloat `SKILL.md`.
- Tailwind v4 guidance is CSS-first.
- Testing examples verify concrete Redis token behavior.

---

## Chapter 7: Typography Alignment and Tracking

**Decision Scope:** Align the skill with the rendered Redis typography guidance and qualify negative letter-spacing so product UI remains readable.

**Files:**

- Modify: `redis-brand-ui/references/typography.md`
- Modify: `redis-brand-ui/SKILL.md`

### Proposed Changes

Replace the current font-family rules with:

```markdown
## Font Family Rules

Use the rendered Redis typography guidance as the source of truth:

| Font | Use For | Notes |
| --- | --- | --- |
| TT Trailers | Expressive display headlines and brand texture | Use only when the official font is available and licensed in the target environment. Keep display use short and intentional. |
| Space Grotesk | Primary workhorse for body text, subheads, UI copy, forms, tables, buttons, and product surfaces | Default Redis UI font. |
| Space Mono | Code, Redis commands, keys, identifiers, timestamps, technical labels, CTA/link treatments, diagrams, and monospace UI elements | Do not use for paragraphs or long-form reading. Do not default all H1s to Space Mono. |
| Geist / Geist Mono | Redis documentation and developer documentation surfaces | Use only for documentation surfaces aligned with the brand portal Geist guidance. Do not make Geist the default Redis product UI font. |

If TT Trailers is unavailable, use Space Grotesk for display headings rather than substituting an unrelated display face.
```

Add this under `## Heading & Text Styles`:

```markdown
Use negative letter-spacing only for approved display or marketing compositions. For product UI, dashboards, tables, forms, sidebars, compact panels, and tool surfaces, keep `letter-spacing: 0` unless the official brand composition specifically requires otherwise.
```

Change the H1 example from Space Mono to Space Grotesk unless the page is an approved brand/display composition:

```css
/* H1 - Space Grotesk default for product UI */
h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  letter-spacing: 0;
}
```

Add a display exception:

```css
/* Display heading - only for approved marketing/brand compositions */
.display-heading {
  font-family: 'TT Trailers', 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}
```

### Acceptance Criteria

- `typography.md` no longer says H1 headings are generally Space Mono.
- TT Trailers, Space Grotesk, Space Mono, and Geist have separate documented roles.
- Geist is scoped to Redis documentation/developer documentation surfaces.
- Product UI defaults to `letter-spacing: 0`.
- Marketing/display exceptions remain possible but explicit.

---

## Chapter 8: Logo Asset Guidance

**Decision Scope:** Make the existing "never recreate the logo" rule actionable in local repositories.

**Files:**

- Modify: `redis-brand-ui/references/logos.md`
- Modify: `redis-brand-ui/SKILL.md`

### Proposed Text for `logos.md`

````markdown
## Local Asset Discovery

Before adding a Redis logo, search the target repository for existing official assets:

```bash
rg --files | rg -i 'Redis_(Logo|Mark)_(Red|Midnight|Black|White)_(RGB|CMYK|PMS)\.(svg|png|jpg|ai)$|redis_logo_overview\.pdf$'
```

Official digital logo kit filenames observed in `Redis_logo_kit/01_Digital/SVG`:

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

Rules:

- Use `Logo` for the full Redis logo asset family and `Mark` for compact icon contexts. Do not call the asset a `cube` unless the rendered Redis brand portal uses that term in the relevant guideline.
- Reuse official repo-local Redis SVGs when present. Prefer preserving the official `Redis_Logo_*_RGB` and `Redis_Mark_*_RGB` filenames.
- If official assets are missing, instruct the user to obtain them from the Redis brand portal or approved brand kit rather than recreating them.
- Do not trace, redraw, approximate, or rebuild the Redis logo in CSS, HTML, canvas, SVG primitives, or icon libraries.
- Do not vendor the full logo kit. For web implementation examples, prefer only the specific `SVG` assets needed by the repo.
- Keep logo files out of generated artifact directories such as `dist/`.
- If clear-space or minimum-size rules are needed, verify them from the rendered brand portal or `redis_logo_overview.pdf`; do not keep unverified numeric rules as facts.
````

### Acceptance Criteria

- Agents know how to find local Redis assets.
- Guidance uses filenames that exist in the official logo kit.
- The skill still forbids recreated logos.
- The guidance works for typical Vite, Next.js, and static web apps.

---

## Chapter 9: Validation and Quality Gates

**Decision Scope:** Add repeatable validation around skill shape and contrast claims.

**Files:**

- Optional create: `redis-brand-ui/scripts/check-contrast.js`
- Modify: `redis-brand-ui/SKILL.md`
- Existing validation: `scripts/validate-skills.sh`

### Proposed `check-contrast.js`

```js
#!/usr/bin/env node

const pairs = [
  ["#091A23", "#FFFFFF", 4.5, "primary text on white"],
  ["#163341", "#FFFFFF", 4.5, "secondary text on white"],
  ["#2D4754", "#FFFFFF", 4.5, "Dusk 90 on white"],
  ["#091A23", "#FF4438", 4.5, "normal text on Redis Red"],
];

function luminance(hex) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((value) => parseInt(value, 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));

  return (lighter + 0.05) / (darker + 0.05);
}

let failures = 0;

for (const [foreground, background, minimum, label] of pairs) {
  const ratio = contrast(foreground, background);
  const pass = ratio >= minimum;
  const status = pass ? "PASS" : "FAIL";
  console.log(`${status} ${label}: ${ratio.toFixed(2)}:1`);

  if (!pass) failures += 1;
}

process.exitCode = failures === 0 ? 0 : 1;
```

### Proposed Validation Commands

Run:

```bash
bash scripts/validate-skills.sh
```

Expected:

```text
Validation summary
  Errors:         0
```

If the optional script is accepted, run:

```bash
node redis-brand-ui/scripts/check-contrast.js
```

Expected:

```text
PASS primary text on white: 17.74:1
PASS secondary text on white: 13.26:1
PASS Dusk 90 on white: 8.36:1
PASS normal text on Redis Red: 5.18:1
```

### Acceptance Criteria

- Repository validation remains the required PR gate.
- Contrast claims can be checked locally if reviewers approve the helper script.
- No generated artifacts are added.

---

## Chapter 10: Icon and Illustration Assets

**Decision Scope:** Add optional guidance for using official Redis icon and editorial illustration libraries without mixing them into logo rules. This chapter can be reviewed independently from Chapter 8.

**Files:**

- Create: `redis-brand-ui/references/asset-libraries.md`
- Modify: `redis-brand-ui/SKILL.md`

### Proposed `asset-libraries.md`

````markdown
# Redis Asset Libraries

Use official Redis asset libraries when a target repository already has access to them or the user provides approved downloads. Do not recreate official icons or editorial illustrations from memory.

## Icon Library

Observed official bundle structure:

```text
Redis_Icon_library_031225/
  Generic Marketing Icons/
  Industry Icons/
  Product Feature Icons/
  Redis Proprietary Feature Icons/
```

The bundle includes `SVG` and `PNG` formats, `48x48` and `64x64` sizes, and color variants such as `Hyper`, `Midnight`, `White`, and `Duotone`.

Rules:

- Use official SVG icons for marketing, product-feature, and Redis proprietary feature illustrations.
- Prefer interface icon libraries already used by the app, such as `lucide-react`, for routine controls like save, search, close, filter, undo, and settings.
- Do not use Redis marketing icons as semantic status icons unless the icon name and context match the state.
- Keep icon filenames intact where possible, for example `icon-submillisecond-latency-48-hyper.svg`.
- Do not commit bulk icon libraries, `.DS_Store`, or `__MACOSX` folders.

## Editorial Illustration Library

Observed official bundle structure:

```text
Redis_Editorial_Illustration_library_031225/
  Built In-house/
  Product/
  Themes/
```

The `Product` folder includes state-oriented illustrations such as:

- `Redis_EditorialIllustration_Product_NoResults_Spot_20241028.svg`
- `Redis_EditorialIllustration_Product_SearchIndexNeeded_Spot_20241028.svg`
- `Redis_EditorialIllustration_Product_Success_Spot_20241028.svg`
- `Redis_EditorialIllustration_Product_UserAgreement_Spot_20241028.svg`

Rules:

- Use product illustrations for empty, success, onboarding, agreement, and setup-required states when the state matches the filename.
- Do not use editorial hero illustrations inside dense operational dashboards unless the surface has an onboarding, empty, or educational purpose.
- Prefer SVG for web UI when the target app can safely render it; use PNG only when raster assets are required.
- Do not generate substitute illustrations that imitate official Redis editorial art.
````

### Acceptance Criteria

- Logo guidance remains limited to logo and mark usage.
- Icon and illustration guidance is optional and does not require vendoring the full asset libraries.
- Product UI control icons are still allowed to come from the app's normal icon library.

---

## Suggested Implementation Order

1. Chapter 1: Accessibility and Contrast.
2. Chapter 2: Demo and App Delivery Recipes.
3. Chapter 3: Status and Meaning Labels.
4. Chapter 5: Product Microcopy Guardrails.
5. Chapter 8: Logo Asset Guidance.
6. Chapter 7: Typography Alignment and Tracking.
7. Chapter 10: Icon and Illustration Assets.
8. Chapter 4: Data Visualization Finesse.
9. Chapter 6: Implementation Starter Snippets.
10. Chapter 9: Validation and Quality Gates.

This order fixes correctness first, then adds the highest-leverage delivery recipes, then adds polish and implementation support.

## Self-Review

Spec coverage:

- Contrast and WCAG concerns are covered by Chapter 1 and Chapter 9.
- Demo/application delivery recipes are covered by Chapter 2.
- Status and product meaning labels are covered by Chapter 3.
- Data visualization finesse is covered by Chapter 4.
- Product microcopy guardrails are covered by Chapter 5.
- Modern implementation starter snippets are covered by Chapter 6.
- Typography roles, Geist scope, and negative letter-spacing are covered by Chapter 7.
- Local asset guidance is covered by Chapter 8.
- Icon and illustration assets are covered by Chapter 10.
- Repo validation is covered by Chapter 9.

Placeholder scan:

- The plan avoids unresolved placeholder markers and unspecified implementation steps.
- Each proposed created file includes concrete content.
- Each validation command includes expected output.

Type and naming consistency:

- Reference filenames use kebab-case and live under `redis-brand-ui/references/`.
- The optional script path is consistently `redis-brand-ui/scripts/check-contrast.js`.
- Redis token names are consistent across chapters.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-17-redis-brand-ui-reviewable-upgrade.md`. Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per accepted chapter, review between chapters, fast iteration.
2. **Inline Execution** - Execute accepted chapters in this session using executing-plans, with checkpoints after each chapter.

Before execution, collect reviewer decisions for each chapter using the review model at the top of this plan.
