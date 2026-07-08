# Output Rubric — playwright-test

Grade each run on the following dimensions. Each item is a 1-2 line yes/no or graded check.

## Trigger Correctness
- Did the skill activate for spec authoring, config edits, fixture/auth work, flaky-test/CI debugging, or trace review, and NOT for live manual browser exploration?

## False-Positive Avoidance
- Did the skill decline to activate for "explore/reproduce/screenshot the live app" prompts, deferring to `playwright-cli-agent` instead of writing a test nobody asked for?

## False-Negative Avoidance
- Did the skill activate for implicit test-authoring asks (e.g. "add coverage for X", "fix this failing test") even when the prompt never says "Playwright" explicitly?

## Task Fit
- Does the solution match what was asked — a new/fixed spec, a config change, or a fixture — without silently expanding scope into unrelated refactors?

## Output Usefulness
- Is the produced test/config immediately runnable (`rtk npx playwright test <file>`) without the user having to fill in placeholders the skill should have resolved?

## Safety Compliance
- Are third-party calls mocked via `page.route` rather than hitting real external services during test runs?

## Token Discipline
- Are noisy commands (`playwright test`, `npm run build`) run through `rtk`, while interactive commands (`--ui`, `codegen`, `show-report`, `show-trace`) are run raw as instructed?

## Evidence Requirements
- Does the response show the actual test run output/exit status rather than just asserting "tests should pass"?

## Verification Requirements
- Was the narrowest test/file run and confirmed passing before broadening to the full suite, per the Workflow section?

## Anti-Overreach
- Did the skill avoid inventing a parallel fixture/config pattern when one already existed, and avoid adding `data-testid` when a semantic locator was available?

## Final-Answer Quality
- Does the final message state which locators, waits, and mocking strategy were used, and confirm every Final Checklist box is genuinely satisfied (not just asserted)?
