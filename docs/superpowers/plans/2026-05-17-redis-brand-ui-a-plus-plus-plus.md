# Redis Brand UI A+++ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise `redis-brand-ui` from strong PR-ready guidance to A+++ while preserving the current visual treatment as applyable style profiles: current light, current dark, future light, and future dark.

**Architecture:** Keep `redis-brand-ui/SKILL.md` concise and use reference files for depth. Add one style-profile contract, one provenance reference, one UI quality checklist, and one machine-readable contrast registry that the validation script reads. The A+++ work adds optional future profiles beside the current profiles; it must not replace or silently rewrite the current Redis Brand UI treatment. Do not add a full design system, do not vendor brand assets, and do not invent Redis palette colors.

**Tech Stack:** Markdown skill references, Node.js script using built-in `fs`/`path`, Bash validation, WCAG contrast calculations.

---

## File Structure

Modify:

- `redis-brand-ui/SKILL.md`
  - Add a style profile selection rule with four stable IDs.
  - Replace remaining over-broad dark-mode wording.
  - Link source provenance and UI quality checklist.
  - Keep under 150 lines.

- `redis-brand-ui/references/colors.md`
  - Point documented ratios to machine-readable `contrast-pairs.json`.
  - Keep official brand colors separate from product extensions.

- `redis-brand-ui/references/components.md`
  - Upgrade interactive target size from `40px` to `44px`.
  - Keep explicit transition properties.

- `redis-brand-ui/references/dark-mode.md`
  - Make extension-token status impossible to miss.
  - Add validation status per token group.

- `redis-brand-ui/scripts/check-contrast.js`
  - Read `references/contrast-pairs.json`.
  - Check expected passing and expected failing pairs.
  - Fail on malformed hex, invalid expectation, or empty registry.

Create:

- `redis-brand-ui/references/style-profiles.md`
  - Four stable style IDs that agents can apply.
  - Clear contract that current profiles remain valid and future profiles are opt-in.

- `redis-brand-ui/references/source-of-truth.md`
  - Official vs extension classification.
  - Rules for using brand portal, official bundles, and product extensions.

- `redis-brand-ui/references/ui-quality-checklist.md`
  - Short final checklist agents must run before calling a Redis UI complete.

- `redis-brand-ui/references/contrast-pairs.json`
  - Single machine-readable contrast registry used by the script and referenced by docs.

Verification:

- `node redis-brand-ui/scripts/check-contrast.js`
- `bash scripts/validate-skills.sh`
- `rg -n "redis-brand-current-light|redis-brand-current-dark|redis-brand-future-light|redis-brand-future-dark" redis-brand-ui docs/superpowers/plans/2026-05-17-redis-brand-ui-a-plus-plus-plus.md`
- `rg -n "full dark palette|transition: all|transition-all|min-height: 40px|min-h-10|All values are derived|HeroUI|NextUI" redis-brand-ui`
- `wc -l redis-brand-ui/SKILL.md`

---

### Task 1: Style Profile Contract and Source Provenance

**Files:**
- Create: `redis-brand-ui/references/style-profiles.md`
- Create: `redis-brand-ui/references/source-of-truth.md`
- Modify: `redis-brand-ui/SKILL.md`

- [ ] **Step 1: Create style profile contract**

Create `redis-brand-ui/references/style-profiles.md` with exactly:

```markdown
# Redis Brand UI Style Profiles

Use this file to choose which Redis Brand UI treatment an agent should apply.

## Stable Profile IDs

| Profile ID | Mode | Status | Use when |
| --- | --- | --- | --- |
| `redis-brand-current-light` | Light | Current | The user wants the existing Redis Brand UI treatment, continuity with previous demos, or screenshot parity. |
| `redis-brand-current-dark` | Dark | Current | The user wants the existing dark treatment, continuity with previous demos, or screenshot parity. |
| `redis-brand-future-light` | Light | Future A+++ | The user wants the hardened profile with provenance labels, contrast registry checks, 44px controls, and stronger delivery guardrails. |
| `redis-brand-future-dark` | Dark | Future A+++ | The user wants the hardened dark profile with product-extension labels, contrast registry checks, 44px controls, and parity checks. |

## Rules

- Keep all four profile IDs stable.
- Do not replace `redis-brand-current-light` or `redis-brand-current-dark` when adding future guidance.
- Treat `redis-brand-future-light` and `redis-brand-future-dark` as opt-in hardened profiles until approved as default.
- When the user asks for current Redis Brand UI, apply a current profile.
- When the user asks for A+++, hardened, accessible, production-ready, or future Redis Brand UI, apply a future profile.
- When the user does not specify a profile, ask only if the choice materially changes the deliverable; otherwise use `redis-brand-current-light` for light UI and `redis-brand-current-dark` for dark UI.
```

- [ ] **Step 2: Create source provenance reference**

Create `redis-brand-ui/references/source-of-truth.md` with exactly:

```markdown
# Redis Brand UI Source of Truth

Use this file to decide whether guidance is official Redis brand material or implementation guidance for agents.

## Official Redis Brand Sources

Treat these as source-of-truth inputs:

- Rendered Redis brand portal pages at `https://brand.redis.io/`.
- Official Redis logo assets from the brand portal or approved Redis logo kit.
- Official Redis asset bundles when the user provides them or the target repository already has approved access.

Official brand guidance includes:

- Core visible brand colors such as `Hyper` (`#FF4438`), `Deep Hyper` (`#EB352A`), `Midnight` (`#091A23`), Dusk tones, and white.
- Typography roles for TT Trailers, Space Grotesk, Space Mono, and Geist as shown in the rendered typography guidance.
- Logo and mark usage rules and official asset filenames.
- Color/type legibility guidance from the rendered brand portal.

## Product Extension Guidance

Treat these as implementation guidance, not official Redis brand palette additions:

- Demo and application delivery recipes.
- Status and meaning labels.
- App dark-mode extension tokens.
- Button treatments created to satisfy accessibility where a literal brand-red filled button would fail normal-text contrast.
- Component-library theme mappings.

## Rules

- Do not call a product extension an official Redis brand rule.
- Do not promote colors found only in page code, generated scales, or examples to official Redis palette tokens.
- Do not solve contrast by inventing darker Redis reds.
- When official guidance and implementation convenience conflict, state the conflict and choose the accessible implementation.
- When brand approval is required, say so directly instead of implying approval.
```

- [ ] **Step 3: Update `SKILL.md` provenance wording**

In `redis-brand-ui/SKILL.md`, replace the opening paragraph with:

```markdown
Actionable rules for implementing the Redis visual identity in frontend applications. Core brand colors, typography roles, and logo guidance derive from the official Redis brand portal ([https://brand.redis.io](https://brand.redis.io)); delivery recipes, status labels, app dark-mode tokens, and component treatments are implementation guidance and must be treated as product extensions unless official brand guidance says otherwise.
```

- [ ] **Step 4: Add `SKILL.md` style profile rule**

In `redis-brand-ui/SKILL.md`, add this subsection after the `## When to Apply` bullet list and before `## Core Rules`:

```markdown
## Style Profiles

Choose one stable profile before styling:

- `redis-brand-current-light` for the current light treatment.
- `redis-brand-current-dark` for the current dark treatment.
- `redis-brand-future-light` for the optional A+++ light treatment.
- `redis-brand-future-dark` for the optional A+++ dark treatment.

Do not remove or overwrite current profiles when adding future guidance. See [style profiles](references/style-profiles.md).
```

- [ ] **Step 5: Update `SKILL.md` reference table**

Add these rows after `dark-mode`:

```markdown
| [Style profiles](references/style-profiles.md) | Four stable applyable style IDs for current and future light/dark UI |
| [Source of truth](references/source-of-truth.md) | Official brand sources vs product extension guidance |
```

- [ ] **Step 6: Verify profile and source language**

Run:

```bash
rg -n "redis-brand-current-light|redis-brand-current-dark|redis-brand-future-light|redis-brand-future-dark|source-of-truth|product extensions" redis-brand-ui/SKILL.md redis-brand-ui/references/style-profiles.md redis-brand-ui/references/source-of-truth.md
! rg -n "All values are derived|official Redis palette additions" redis-brand-ui/SKILL.md redis-brand-ui/references/style-profiles.md redis-brand-ui/references/source-of-truth.md
```

Expected:

```text
redis-brand-ui/SKILL.md: no "All values are derived" match
redis-brand-ui/SKILL.md: contains all four stable profile IDs
redis-brand-ui/references/style-profiles.md: contains all four stable profile IDs
redis-brand-ui/SKILL.md: opening paragraph includes "product extensions"
redis-brand-ui/references/source-of-truth.md: contains official source and product extension sections
```

- [ ] **Step 7: Commit task**

Run:

```bash
git add redis-brand-ui/SKILL.md redis-brand-ui/references/style-profiles.md redis-brand-ui/references/source-of-truth.md
git commit -m "docs: add Redis brand style profiles"
```

Expected: commit succeeds.

---

### Task 2: Premium Component Target Size and Transition Rules

**Files:**
- Modify: `redis-brand-ui/SKILL.md`
- Modify: `redis-brand-ui/references/components.md`

- [ ] **Step 1: Update `SKILL.md` component rules**

In `redis-brand-ui/SKILL.md`, ensure the Components section includes these two bullets:

```markdown
- All interactive elements: transition only color, background, border, shadow, and transform properties.
- Buttons and inputs must use at least a `44px` target height for touch-friendly UI.
```

- [ ] **Step 2: Update component target sizes**

In `redis-brand-ui/references/components.md`, replace every `min-height: 40px;` with:

```css
min-height: 44px;
```

Replace every Tailwind `min-h-10` example with:

```text
min-h-11
```

- [ ] **Step 3: Keep explicit transition token**

Confirm the design token remains:

```css
--redis-transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
```

- [ ] **Step 4: Update component anti-patterns**

Add this anti-pattern to `redis-brand-ui/references/components.md`:

```markdown
- **NEVER** animate every CSS property at once; it can animate layout and create jank.
- **NEVER** ship buttons or inputs below `44px` target height.
```

- [ ] **Step 5: Verify component quality**

Run:

```bash
rg -n "44px|min-h-11|animate every CSS property" redis-brand-ui/SKILL.md redis-brand-ui/references/components.md
! rg -n "transition: all|transition-all|min-height: 40px|min-h-10" redis-brand-ui/SKILL.md redis-brand-ui/references/components.md
```

Expected:

```text
No matches for transition-all
No matches for min-height: 40px
No matches for min-h-10
Matches for 44px, min-h-11, and animate every CSS property exist
```

- [ ] **Step 6: Commit task**

Run:

```bash
git add redis-brand-ui/SKILL.md redis-brand-ui/references/components.md
git commit -m "docs: tighten Redis UI component quality"
```

Expected: commit succeeds.

---

### Task 3: Data-Driven Contrast Registry

**Files:**
- Create: `redis-brand-ui/references/contrast-pairs.json`
- Modify: `redis-brand-ui/scripts/check-contrast.js`
- Modify: `redis-brand-ui/references/colors.md`
- Modify: `redis-brand-ui/references/dark-mode.md`

- [ ] **Step 1: Create contrast registry**

Create `redis-brand-ui/references/contrast-pairs.json` with exactly:

```json
[
  {
    "label": "primary text on white",
    "foreground": "#091A23",
    "background": "#FFFFFF",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "official-core"
  },
  {
    "label": "secondary text on white",
    "foreground": "#163341",
    "background": "#FFFFFF",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "official-core"
  },
  {
    "label": "white text on Midnight",
    "foreground": "#FFFFFF",
    "background": "#091A23",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "official-core"
  },
  {
    "label": "white text on Dusk",
    "foreground": "#FFFFFF",
    "background": "#163341",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "official-core"
  },
  {
    "label": "white text on Dusk 90",
    "foreground": "#FFFFFF",
    "background": "#2D4754",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "official-core"
  },
  {
    "label": "normal text on Hyper",
    "foreground": "#091A23",
    "background": "#FF4438",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "official-core-needs-brand-pattern-approval"
  },
  {
    "label": "white normal text on Hyper",
    "foreground": "#FFFFFF",
    "background": "#FF4438",
    "minimum": 4.5,
    "shouldPass": false,
    "source": "official-core-known-fail"
  },
  {
    "label": "white normal text on Deep Hyper",
    "foreground": "#FFFFFF",
    "background": "#EB352A",
    "minimum": 4.5,
    "shouldPass": false,
    "source": "official-core-known-fail"
  },
  {
    "label": "muted text on white",
    "foreground": "#8A99A0",
    "background": "#FFFFFF",
    "minimum": 4.5,
    "shouldPass": false,
    "source": "official-core-known-fail"
  },
  {
    "label": "Dusk 70 on Midnight",
    "foreground": "#5C707A",
    "background": "#091A23",
    "minimum": 4.5,
    "shouldPass": false,
    "source": "official-core-known-fail"
  },
  {
    "label": "dark mode primary text on dark bg",
    "foreground": "#F0F4F5",
    "background": "#0A1A23",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "product-extension"
  },
  {
    "label": "dark mode secondary text on dark bg",
    "foreground": "#C8D1D5",
    "background": "#0A1A23",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "product-extension"
  },
  {
    "label": "dark mode link text on panel bg",
    "foreground": "#8AB4C7",
    "background": "#122A35",
    "minimum": 4.5,
    "shouldPass": true,
    "source": "product-extension"
  },
  {
    "label": "dark mode muted text on dark bg",
    "foreground": "#5A6A72",
    "background": "#0A1A23",
    "minimum": 4.5,
    "shouldPass": false,
    "source": "product-extension-known-fail"
  }
]
```

- [ ] **Step 2: Replace contrast script with registry reader**

Replace `redis-brand-ui/scripts/check-contrast.js` with exactly:

```js
#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const registryPath = path.join(__dirname, "..", "references", "contrast-pairs.json");
const pairs = JSON.parse(fs.readFileSync(registryPath, "utf8"));

function assertValidPair(pair, index) {
  const hexPattern = /^#[0-9A-Fa-f]{6}$/;

  if (!pair || typeof pair !== "object") {
    throw new Error(`Pair ${index} must be an object`);
  }

  for (const key of ["label", "foreground", "background", "source"]) {
    if (typeof pair[key] !== "string" || pair[key].length === 0) {
      throw new Error(`Pair ${index} missing string field: ${key}`);
    }
  }

  if (!hexPattern.test(pair.foreground)) {
    throw new Error(`Pair ${pair.label} has invalid foreground: ${pair.foreground}`);
  }

  if (!hexPattern.test(pair.background)) {
    throw new Error(`Pair ${pair.label} has invalid background: ${pair.background}`);
  }

  if (typeof pair.minimum !== "number" || pair.minimum <= 0) {
    throw new Error(`Pair ${pair.label} has invalid minimum: ${pair.minimum}`);
  }

  if (typeof pair.shouldPass !== "boolean") {
    throw new Error(`Pair ${pair.label} has invalid shouldPass: ${pair.shouldPass}`);
  }
}

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

if (!Array.isArray(pairs) || pairs.length === 0) {
  throw new Error("Contrast registry must contain at least one pair");
}

let failures = 0;

pairs.forEach((pair, index) => {
  assertValidPair(pair, index);

  const ratio = contrast(pair.foreground, pair.background);
  const pass = ratio >= pair.minimum;
  const expected = pair.shouldPass ? pass : !pass;
  const status = expected ? "PASS" : "FAIL";
  const expectation = pair.shouldPass ? `>= ${pair.minimum}:1` : `< ${pair.minimum}:1`;

  console.log(`${status} ${pair.label}: ${ratio.toFixed(2)}:1 expected ${expectation} [${pair.source}]`);

  if (!expected) failures += 1;
});

process.exitCode = failures === 0 ? 0 : 1;
```

- [ ] **Step 3: Update `colors.md` contrast intro**

In `redis-brand-ui/references/colors.md`, replace:

```markdown
Use WCAG contrast checks for every text/background pairing. These ratios are the documented baseline for visible Redis brand tokens:
```

With:

```markdown
Use WCAG contrast checks for every text/background pairing. These ratios are mirrored in `contrast-pairs.json` and verified by `redis-brand-ui/scripts/check-contrast.js`:
```

- [ ] **Step 4: Update `dark-mode.md` verification wording**

In `redis-brand-ui/references/dark-mode.md`, replace:

```markdown
The dark values below are app/product extension tokens for implementation convenience, not official Redis palette additions. Use them only after checking the specific text/background pairing against the brand legibility matrix and local contrast tests.
```

With:

```markdown
The dark values below are app/product extension tokens for implementation convenience, not official Redis palette additions. Use them only after checking the specific text/background pairing against the brand legibility matrix and `contrast-pairs.json`.
```

- [ ] **Step 5: Verify contrast registry**

Run:

```bash
node redis-brand-ui/scripts/check-contrast.js
```

Expected output contains:

```text
PASS primary text on white
PASS white normal text on Hyper
PASS dark mode link text on panel bg
PASS dark mode muted text on dark bg
```

The command must exit with status 0.

- [ ] **Step 6: Commit task**

Run:

```bash
git add redis-brand-ui/references/contrast-pairs.json redis-brand-ui/scripts/check-contrast.js redis-brand-ui/references/colors.md redis-brand-ui/references/dark-mode.md
git commit -m "test: make Redis brand contrast checks data-driven"
```

Expected: commit succeeds.

---

### Task 4: A+++ Agent UI Quality Checklist

**Files:**
- Create: `redis-brand-ui/references/ui-quality-checklist.md`
- Modify: `redis-brand-ui/SKILL.md`

- [ ] **Step 1: Create UI quality checklist**

Create `redis-brand-ui/references/ui-quality-checklist.md` with exactly:

```markdown
# Redis UI Quality Checklist

Run this checklist before calling a Redis-branded UI complete.

## Required Checks

- **Style profile:** One stable profile ID is named and applied: `redis-brand-current-light`, `redis-brand-current-dark`, `redis-brand-future-light`, or `redis-brand-future-dark`.
- **Source provenance:** Official brand colors, type roles, and logo assets come from the Redis brand portal or approved Redis bundles; product extensions are labeled as extensions.
- **Contrast:** `node redis-brand-ui/scripts/check-contrast.js` passes, and every new text/background pairing is checked.
- **Red restraint:** Hyper is used for one primary action, active/hover state, selected Redis path, or brand moment, not every state.
- **Status meaning:** Operational data shows source, freshness, and state labels such as `Live`, `Sampled`, `Modeled`, `Derived`, `Stale`, or `Failed`.
- **Typography:** Space Grotesk is default UI text; Space Mono is limited to commands, keys, IDs, timestamps, code, and technical labels.
- **Touch targets:** Buttons and inputs have at least `44px` target height.
- **Logo assets:** Redis logos and marks use official `Redis_Logo_*_RGB.svg` or `Redis_Mark_*_RGB.svg` files; no recreated logo primitives.
- **Light/dark parity:** Light and dark modes keep the same hierarchy and pass contrast checks for visible text.
- **Layout polish:** No nested cards for dashboard sections; dense tools use recipes from `delivery-recipes.md`.
- **Repository validation:** `bash scripts/validate-skills.sh` passes with 0 errors and 0 warnings.
```

- [ ] **Step 2: Link checklist in `SKILL.md` reference table**

Add this row after `Status language`:

```markdown
| [UI quality checklist](references/ui-quality-checklist.md) | Final A+++ checks before calling a Redis UI complete |
```

- [ ] **Step 3: Link checklist in `SKILL.md` quick start**

Replace the last quick-start item with:

```markdown
7. Run the [UI quality checklist](references/ui-quality-checklist.md), `node redis-brand-ui/scripts/check-contrast.js`, and `bash scripts/validate-skills.sh`
```

- [ ] **Step 4: Verify checklist references**

Run:

```bash
rg -n "UI quality checklist|44px|Red restraint|Source provenance|redis-brand-current-light|redis-brand-future-dark" redis-brand-ui/SKILL.md redis-brand-ui/references/ui-quality-checklist.md
```

Expected: all phrases appear, including one current profile ID and one future profile ID.

- [ ] **Step 5: Commit task**

Run:

```bash
git add redis-brand-ui/SKILL.md redis-brand-ui/references/ui-quality-checklist.md
git commit -m "docs: add Redis UI quality checklist"
```

Expected: commit succeeds.

---

### Task 5: Final A+++ Validation

**Files:**
- Verify all `redis-brand-ui/**`
- Verify `docs/superpowers/plans/2026-05-17-redis-brand-ui-a-plus-plus-plus.md`

- [ ] **Step 1: Run contrast validation**

Run:

```bash
node redis-brand-ui/scripts/check-contrast.js
```

Expected:

```text
All rows print PASS
Exit code 0
```

- [ ] **Step 2: Run repository validation**

Run:

```bash
bash scripts/validate-skills.sh
```

Expected:

```text
Validation summary
  Errors:         0
  Warnings:       0
```

- [ ] **Step 3: Run A+++ regression scan**

Run:

```bash
rg -n "redis-brand-current-light|redis-brand-current-dark|redis-brand-future-light|redis-brand-future-dark" redis-brand-ui docs/superpowers/plans/2026-05-17-redis-brand-ui-a-plus-plus-plus.md
```

Expected:

```text
All four profile IDs appear in redis-brand-ui/SKILL.md and redis-brand-ui/references/style-profiles.md.
```

- [ ] **Step 4: Run anti-regression scan**

Run:

```bash
! rg -n "full dark palette|transition: all|transition-all|min-height: 40px|min-h-10|All values are derived|HeroUI|NextUI" redis-brand-ui
```

Expected:

```text
No matches
```

- [ ] **Step 5: Verify skill length**

Run:

```bash
wc -l redis-brand-ui/SKILL.md
```

Expected: `redis-brand-ui/SKILL.md` is below 150 lines.

- [ ] **Step 6: Review changed files**

Run:

```bash
git diff --stat
git diff -- redis-brand-ui/SKILL.md redis-brand-ui/references/style-profiles.md redis-brand-ui/references/source-of-truth.md redis-brand-ui/references/ui-quality-checklist.md redis-brand-ui/references/contrast-pairs.json redis-brand-ui/references/colors.md redis-brand-ui/references/components.md redis-brand-ui/references/dark-mode.md redis-brand-ui/scripts/check-contrast.js
```

Expected:

```text
Diff shows only A+++ hardening changes: four stable style profiles, provenance, 44px targets, data-driven contrast, dark-mode extension clarity, checklist links.
```

- [ ] **Step 7: Commit final plan file if not already committed**

Run:

```bash
git add docs/superpowers/plans/2026-05-17-redis-brand-ui-a-plus-plus-plus.md
git commit -m "docs: plan Redis Brand UI A+++ hardening"
```

Expected: commit succeeds if the plan file is not already committed. If Git reports nothing to commit for this file, continue.

---

## Self-Review

Spec coverage:

- Four stable applyable style profiles are covered by Task 1.
- Source traceability is covered by Task 1.
- Touch-target and transition quality are covered by Task 2.
- Data-driven contrast validation is covered by Task 3.
- UI self-check quality gate is covered by Task 4.
- Final validation is covered by Task 5.

Placeholder scan:

- No unresolved placeholder markers or placeholder implementation text is present.
- Every created file has exact content.
- Every verification command has expected output.

Type and naming consistency:

- Style profile IDs are consistently `redis-brand-current-light`, `redis-brand-current-dark`, `redis-brand-future-light`, and `redis-brand-future-dark`.
- `contrast-pairs.json` is the sole registry name.
- `check-contrast.js` reads from `references/contrast-pairs.json`.
- Product extension language is consistent across `SKILL.md`, `style-profiles.md`, `source-of-truth.md`, and `dark-mode.md`.
- Component target height is consistently `44px` / `min-h-11`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-17-redis-brand-ui-a-plus-plus-plus.md`. Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
