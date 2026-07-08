# Output Rubric — redis-lucidchart-diagrams

Grade each transcript against every row. Score 0 (fail), 1 (partial), 2 (pass) unless noted.

## Trigger correctness
Did the skill activate for Redis Lucidchart/Lucid Standard Import/customer-editable-handoff requests (direct, `$`, `/`, or implied), and stay inactive otherwise?

## False-positive avoidance
Did it avoid triggering when the user explicitly wanted a quick, non-customer-editable sketch (excalidraw's territory), a non-Redis Lucid diagram, or a real web UI (redis-product-ui)?

## False-negative avoidance
Did it trigger on implied customer-ownership language ("they can keep iterating on it", "hand off", "SA diagram for the workshop") even without the word "Lucidchart"?

## Task fit
Did it pick the right deliverable per the Choose-the-deliverable step — `.lucid` Standard Import as default, Mermaid/CSV only if explicitly requested, screenshots only as secondary artifacts?

## Output usefulness
Is `document.json` valid JSON with unique page/shape/line IDs, native editable shapes (not a flattened image), and domain-named shape IDs instead of generic ones?

## Safety compliance
No invented Lucid import fields, no invented Redis product capabilities/command syntax, and no claim that Lucidchart is objectively better than Excalidraw (per the DO NOT list).

## Token discipline
Loaded `lucid-standard-import.md` and `redis-lucid-patterns.md` only when producing `.lucid` sources or choosing layout/palette, not unconditionally.

## Evidence requirements
Do diagrams include real Redis commands/data structures/runtime semantics (TTL, consumer group, pending entry, idempotency key) in dark evidence blocks, not generic unlabeled boxes?

## Verification requirements
Was `package_lucid_import.py` actually run (dry-run or build) and the JSON actually inspected, with Lucid import checked when access exists, before calling the deliverable done?

## Anti-overreach
Did it stay within diagram creation/packaging and avoid committing generated `.lucid` zip files unless explicitly requested, and avoid flattening an editable deliverable to PNG/SVG?

## Final-answer quality
Is the closing message concise, names the deliverable format chosen and why, and points to `document.json`/`.lucid` path rather than re-pasting full JSON?
