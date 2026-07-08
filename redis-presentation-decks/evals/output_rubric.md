# redis-presentation-decks Output Rubric

Grade each transcript against every category below. Each category is PASS/FAIL; a single FAIL
in a category makes the transcript FAIL that category regardless of others.

## Trigger Correctness

PASS bar: The skill is invoked only for Redis-related Reveal.js deck work — never for generic
slide requests with no Redis product/architecture content, and never as a way to produce
`.pptx`/Google Slides output.

## False-Positive Avoidance

PASS bar: When the prompt has no Redis content (generic icebreaker deck, unrelated trivia) or
asks for a non-Reveal.js deliverable (.pptx, Google Slides, standalone diagram), the transcript
does not apply this skill's brand/evidence workflow and names the correct alternative (pptx
skill, redis-excalidraw-diagrams, or none).

## False-Negative Avoidance

PASS bar: When the prompt clearly asks for a Redis solution architecture, customer, QBR, or
workshop deck, the transcript uses `scripts/create-presentation.js` to scaffold rather than
hand-writing Reveal.js boilerplate from scratch.

## Task Fit

PASS bar: The specific ask (chart, speaker notes, architecture flow, overflow fix) is handled
using the matching reference file (charts.md, revealjs-reference.md, redis-deck-patterns.md),
not a generic restatement of the whole workflow.

## Output Usefulness

PASS bar: Generated HTML uses real Redis evidence (commands, schemas, metrics, topology labels)
rather than a vague "Redis" box, and speaker notes support the presenter without duplicating
visible slide text.

## Safety Compliance

PASS bar: No non-brand red, no pure black, no system fonts for body text, no Space Mono in body
paragraphs; every chart canvas has `maintainAspectRatio: false` in a bounded container.

## Token Discipline

PASS bar: The transcript loads only the reference files relevant to the current step (e.g.
charts.md only when adding/fixing a chart) rather than dumping every reference file's content.

## Evidence Requirements

PASS bar: Product-specific facts (numbers, benchmarks, topology claims) are verified against
current Redis docs or user-provided source material, with footnotes for benchmark conditions or
assumptions, not invented figures.

## Verification Requirements

PASS bar: Before declaring a chart or layout fix done, the transcript runs
`node scripts/check-charts.js` and/or `node scripts/check-overflow.js` as applicable and reports
the actual pass/fail result; before final delivery, exported screenshots are visually inspected,
not just generated.

## Anti-Overreach Behavior

PASS bar: The transcript does not silently produce a `.pptx`/Google Slides file, does not build
generic SaaS pitch-deck layouts for a technical Redis story, and does not skip the outline/story
step to jump straight to HTML.

## Final-Answer Quality

PASS bar: The final answer confirms which Done Checklist items in SKILL.md were verified (brand
tokens, speaker notes, chart checker, overflow checker, screenshot inspection) and states the
exact commands run, not just "looks good."
