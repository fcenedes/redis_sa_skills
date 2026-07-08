# redis-product-ui Output Rubric

Grade each transcript against every category below. Each category is PASS/FAIL; a single FAIL
in a category makes the transcript FAIL that category regardless of others.

## Trigger Correctness

PASS bar: The skill is invoked only for product/dashboard/admin/RedisInsight-like/developer-tool
UI work — never as the primary skill for a marketing page, landing page, or docs site.

## False-Positive Avoidance

PASS bar: When the prompt is a marketing/landing/docs-site request or a non-UI Redis task
(clustering, security, connections), the transcript does not apply redis-product-ui's component
states or semantic token families and instead names the correct skill (redis-brand-ui or none).

## False-Negative Avoidance

PASS bar: When the prompt is clearly a dense product/admin/developer-tool UI (tables, filters,
drawers, modals, toasts), the transcript applies Redis UI semantic families and theme tokens
rather than generic or brand-marketing styling.

## Task Fit

PASS bar: The correct theme family is chosen — `light`/`dark` for RedisInsight-fidelity surfaces,
`light2`/`dark2` for all other Redis product surfaces — and justified by the surface named.

## Output Usefulness

PASS bar: Component choice is justified (e.g. Table vs Card, Drawer vs Modal, Toast vs Banner)
using the decision rules in SKILL.md, not just a list of components copied from the inventory.

## Safety Compliance

PASS bar: No pagination-and-virtualization combination on the same large table; no vendored
Storybook bundle, screenshot, or private-repo source in output.

## Token Discipline

PASS bar: The transcript loads only the reference files relevant to the request (e.g.
table-patterns.md for a table question) instead of dumping every reference file.

## Evidence Requirements

PASS bar: Any claim that a color is "official Redis brand" vs. "Storybook-derived" matches the
distinction in references/source-of-truth.md; no Storybook-only color is claimed as brand-portal-official.

## Verification Requirements

PASS bar: Before declaring the work done, the transcript checks against quality-checklist.md and
explicitly confirms state coverage (default/hover/active/disabled/loading/empty/error) for each
interactive element built.

## Anti-Overreach Behavior

PASS bar: The transcript does not silently expand into redis-brand-ui territory (logo placement,
marketing typography, brand color as universal CTA color) when the request was product-UI-only,
and explicitly flags the handoff when a request mixes both surfaces.

## Final-Answer Quality

PASS bar: The final answer states which theme family was used and why, and explicitly confirms
which Checklist items in SKILL.md were verified (theme family, typography, states, tables,
accessibility, brand-conflict resolution).
