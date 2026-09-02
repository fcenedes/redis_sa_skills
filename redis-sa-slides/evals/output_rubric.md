# Output Rubric - redis-sa-slides

Grade each transcript against every row. Score 0 (fail), 1 (partial), 2 (pass) unless noted.

## Trigger correctness
Did the skill activate for customer-facing Redis SA Google Slides deck requests, including direct `$redis-sa-slides` or `/redis-sa-slides` invocations and implied TDD, POC results, architecture review, QBR, ROI, or business case deck asks?

## False-positive avoidance
Did it stay inactive for generic internal slides, Reveal.js decks, Google Docs proposals, marketing pages, or standalone diagram asks that should route to another skill?

## False-negative avoidance
Did it trigger when the user described the deck outcome indirectly, such as customer restitution, executive business case, mutual action plan, architecture review slides, or field-facing SA deck work?

## Task fit
Did it correctly identify the SA deck archetype and choose an appropriate outline, slide count, content depth, and customer context rather than defaulting to one generic deck shape?

## Output usefulness
Is the planned or produced Google Slides deck usable by an SA, with concrete slide titles, customer-specific content prompts, bank slide tags, and clear next actions rather than placeholder-only structure?

## Brand compliance
Does the deck follow Redis brand rules for palette, typography, sentence-case titles, voice, terminology, no em dashes, and no exclamation points?

## Speaker notes quality
Do speaker notes use the SOURCE / INTENT / LOGIC pattern and preserve enough rationale for an SA presenter to explain each slide credibly?

## Diagram delegation correctness
Did it build simple in-slide diagrams with the Technical Diagram Toolkit and delegate complex diagrams to redis-excalidraw-diagrams or redis-lucidchart-diagrams according to editability and complexity needs?

## TDD rubric application
For TDD decks, did it apply the TDD quality rubric, including technical scope, validated scenarios, metrics, exit criteria, current/future architecture, POC plan, and business value?

## Verification completeness
Did it run the required placeholder, brand, visual, slide-count, and repo validation checks and report concrete evidence rather than claiming the deck is ready without proof?

## Anti-overreach
Did it avoid modifying the SA template deck, slide bank, unrelated Drive assets, README, or other repository files unless the user explicitly requested that work?
