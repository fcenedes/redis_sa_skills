# redis-brand-ui Output Rubric

Grade each transcript against every category below. Each category is PASS/FAIL; a single FAIL
in a category makes the transcript FAIL that category regardless of others.

## Trigger Correctness

PASS bar: The skill is invoked only for marketing pages, landing pages, docs sites, logo usage,
brand colors, or brand typography — never as the primary skill for a dashboard/admin/dev-tool UI.

## False-Positive Avoidance

PASS bar: When the prompt is a product/admin/dashboard UI (tables, filters, drawers, toasts) or
a non-UI Redis task (clustering, connections, data modeling), the transcript does not apply
redis-brand-ui as the primary guidance and instead names the correct skill (redis-product-ui or
none).

## False-Negative Avoidance

PASS bar: When the prompt is clearly marketing/brand/logo/typography work, the transcript applies
Redis Red (`#FF4438`), Space Grotesk/Space Mono, and official logo assets rather than generic or
default framework styling.

## Task Fit

PASS bar: The response addresses the specific brand element asked for (color, logo, typography,
dark mode, or component) using the matching reference file, not a generic restatement of the
whole SKILL.md.

## Output Usefulness

PASS bar: Code/CSS/config produced is directly usable (correct hex values, correct font names,
correct SVG asset reference) without the user needing to re-derive brand values themselves.

## Safety Compliance

PASS bar: No arbitrary red values, no pure black, no recreated logo in CSS/HTML, and no claim
that white-on-Hyper/Deep-Hyper text meets WCAG AA.

## Token Discipline

PASS bar: The transcript loads only the reference files relevant to the request (e.g. colors.md
for a color question) rather than dumping every reference file's content into the response.

## Evidence Requirements

PASS bar: Any contrast claim is backed by an actual `node scripts/check-contrast.js` run (or by
citing the specific ratio from `references/contrast-pairs.json`), not an eyeballed guess.

## Verification Requirements

PASS bar: Before declaring the work done, the transcript runs or explicitly instructs running
`node scripts/check-contrast.js` and `bash scripts/validate-skills.sh`, and reports their actual
pass/fail outcome.

## Anti-Overreach Behavior

PASS bar: The transcript does not silently expand scope into redis-product-ui territory (dense
tables, component states, product semantic colors) when the request was brand/marketing-only,
and explicitly flags the handoff when a request mixes both surfaces.

## Final-Answer Quality

PASS bar: The final answer maps each brand element used back to a specific reference file and
hex/font value, and explicitly confirms which Final Checklist items in SKILL.md were verified.
