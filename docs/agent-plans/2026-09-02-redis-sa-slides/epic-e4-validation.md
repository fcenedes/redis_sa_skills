# Epic E4: Validation, evals, and repo integration

## Objective

Create validation script, eval files, update README.md, and run repo validation. Final quality gate for the skill.

## Dependencies

- E1+E2+E3 complete (validates the full skill)

## Task E4.T1: Write validate-deck.py

- Objective: create a validation script that checks a Google Slides deck for placeholder remnants and brand violations
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: medium
- Why this is sufficient: bounded Python script with clear requirements from spec QA checklist
- Owned files: `redis-sa-slides/scripts/validate-deck.py`
- Forbidden files: all other skill directories
- Inputs: design spec QA Checklist + brand rules
- Steps:
  1. Create `redis-sa-slides/scripts/` directory
  2. Write `validate-deck.py` that:
     - Accepts a text-extracted deck content (stdin or file arg)
     - Checks for placeholder patterns: `[TODO:`, `Lorem ipsum`, `XX%`, `$XXM`, `Firstname Lastname`, `Presenter name`, `Title text here`, `Section tag example`, instruction badges
     - Checks for brand violations: em dashes (`—`), exclamation points in content, title case violations
     - Reports findings as structured output: file, line, issue, severity
     - Exits 0 if clean, 1 if issues found
  3. Make executable: `chmod +x`
- Verify with:
  ```bash
  ls redis-sa-slides/scripts/validate-deck.py
  python3 redis-sa-slides/scripts/validate-deck.py --help 2>&1 | head -5  # should show usage
  echo "This is great! Redis is the best—" | python3 redis-sa-slides/scripts/validate-deck.py -  # should flag ! and —
  ```
- Done evidence: script exists, detects test violations

## Task E4.T2: Write eval files

- Objective: create output rubric and trigger queries matching existing eval patterns
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: low
- Why this is sufficient: structured files following existing pattern from redis-excalidraw-diagrams/evals/
- Owned files: `redis-sa-slides/evals/output_rubric.md`, `redis-sa-slides/evals/trigger_queries.json`
- Forbidden files: all other skill directories
- Inputs:
  - Pattern: `redis-excalidraw-diagrams/evals/output_rubric.md` (11 criteria)
  - Pattern: `redis-excalidraw-diagrams/evals/trigger_queries.json` (11 queries)
  - Design spec acceptance criteria
- Steps:
  1. Create `redis-sa-slides/evals/` directory
  2. Write `output_rubric.md` with 11 criteria scored 0/1/2:
     - Trigger correctness, false-positive avoidance, false-negative avoidance
     - Task fit (SA deck type correctly identified)
     - Output usefulness (deck is usable, not just generated)
     - Brand compliance (palette, voice, typography)
     - Speaker notes quality
     - Diagram delegation correctness
     - TDD rubric application (when applicable)
     - Verification completeness
     - Anti-overreach (doesn't modify bank/template)
  3. Write `trigger_queries.json` with 12 queries:
     - 7 should-trigger: "build a TDD deck for Acme", "create POC results slides", "make architecture review for customer X", "/redis-sa-slides", "$redis-sa-slides", "QBR deck for next week", "ROI business case slides"
     - 5 should-not-trigger: "make a quick internal team slide", "create a Reveal.js presentation", "draw a Redis architecture diagram", "write a Google Doc proposal", "build a marketing landing page"
- Verify with:
  ```bash
  ls redis-sa-slides/evals/output_rubric.md
  ls redis-sa-slides/evals/trigger_queries.json
  python3 -c "import json; d=json.load(open('redis-sa-slides/evals/trigger_queries.json')); print(len(d))"  # ≥ 12
  ```
- Done evidence: both files exist, trigger_queries.json parses as valid JSON with ≥12 entries

## Task E4.T3: Update README.md and run validation

- Objective: add redis-sa-slides to README.md in all 4 required sections, run validate-skills.sh
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: medium
- Why this is sufficient: structured README updates from existing patterns + validation run
- Escalation trigger: validate-skills.sh fails for reasons beyond redis-sa-slides
- Owned files: `README.md` (redis-sa-slides entries only)
- Forbidden files: all other skill directories, README entries for other skills
- Inputs: existing README.md structure, CONTRIBUTING.md requirements
- Steps:
  1. Add to Available Skills table: `redis-sa-slides` with description
  2. Add to Installation command block
  3. Add to Usage Examples with 2-3 examples
  4. Add to Versioning table: `redis-sa-slides | 1.0.0`
  5. Run `bash scripts/validate-skills.sh` and verify redis-sa-slides passes
- Verify with:
  ```bash
  grep -c 'redis-sa-slides' README.md  # ≥ 4 (one per section)
  bash scripts/validate-skills.sh 2>&1 | grep -i 'redis-sa-slides'
  bash scripts/validate-skills.sh 2>&1 | tail -5  # check exit status
  ```
- Done evidence: README.md has 4+ mentions, validate-skills.sh passes

## Task E4.AUDIT: Audit full skill delivery

- Objective: independently verify the complete redis-sa-slides skill against the design spec
- Worker role: Auditor
- Preferred worker/provider: Claude Code (fresh-context agent)
- Requested model/model class: Opus-class
- Requested reasoning effort: medium
- Why this is sufficient: verification against well-defined acceptance criteria, not architecture judgment
- Escalation trigger: spec ambiguity that blocks verification
- Inputs:
  - source of truth: `docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md`
  - changed files: entire `redis-sa-slides/` directory + README.md changes
  - verification evidence from E1-E4 tasks
- Gates:
  1. Spec compliance: AC-1 through AC-10 from design spec
  2. Repo compliance: CONTRIBUTING.md requirements (frontmatter, SKILL.md under 150 lines, references for detail, DO NOT guardrails, final checklist)
  3. Validation: `bash scripts/validate-skills.sh` passes
  4. No secrets: `grep -rE '(token|key|secret|password)=' redis-sa-slides/ --include='*.md' | grep -v 'TODO\|example\|placeholder'` returns nothing
  5. No generated artifacts: `find redis-sa-slides/ -name '*.png' -o -name '*.jpg' -o -name '*.svg' | wc -l` returns 0
  6. Cross-references: every file in `references/` is linked from SKILL.md Reference Index
  7. Brand accuracy: palette hex codes match redis-slides source exactly
- Verdict: APPROVED / NOT APPROVED / BLOCKED
- Findings format: file/line, gate, issue, required fix
- Done evidence:
  - audit verdict
  - gate pass/fail for each of the 7 gates
  - validate-skills.sh output
  - residual risks or explicit none
