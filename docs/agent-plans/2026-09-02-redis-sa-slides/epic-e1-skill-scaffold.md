# Epic E1: Skill scaffold

## Objective

Create `redis-sa-slides/SKILL.md` with valid frontmatter, authority model, required workflow, constraints, verification checklist, and reference index. Under 150 lines.

## Task E1.T1: Write SKILL.md

- Objective: create `redis-sa-slides/SKILL.md` with full skill definition
- Required skills:
  - `writing-skills`: skill authoring patterns, frontmatter, structure
  - `caveman`: compressed prose for worker report
- Worker role: Implementor
- Preferred worker/provider: Claude Code
- Requested model/model class: Sonnet-class
- Requested reasoning effort: medium
- Why this is sufficient: bounded single-file write from a complete spec; no ambiguity
- Escalation trigger: SKILL.md exceeds 150 lines after first pass
- Owned files: `redis-sa-slides/SKILL.md`
- Forbidden files: all other skill directories, `README.md`
- Inputs:
  - Design spec: `docs/superpowers/specs/2026-09-02-redis-sa-slides-design.md`
  - Pattern: existing `redis-excalidraw-diagrams/SKILL.md` (108 lines, good size reference)
  - Frontmatter requirements: `CONTRIBUTING.md` and `AGENTS.md`
- Steps:
  1. Create `redis-sa-slides/` directory
  2. Write `SKILL.md` with YAML frontmatter:
     ```yaml
     name: redis-sa-slides
     description: Build customer-facing SA decks (TDD, POC plans, architecture reviews, QBRs, ROI/TCO) in Google Slides from a curated slide bank on Google Drive. Use when an SA needs a Redis-branded presentation with customer logo, architecture diagrams, value scorecards, or phased implementation slides.
     license: MIT
     metadata:
       author: redis
       version: "1.0.0"
     ```
  3. Write sections: Authority, Required Workflow (10-step from spec), Customer Logo Flow, Diagram Decision Tree (brief — detail in reference), Brand Rules (brief — detail in reference), Constraints/DO NOT, Verification checklist, Reference Index table
  4. Keep under 150 lines by moving detail to reference files
- Verify with:
  ```bash
  # File exists
  ls redis-sa-slides/SKILL.md
  # Frontmatter valid
  grep -c '^name:' redis-sa-slides/SKILL.md
  grep -c '^description:' redis-sa-slides/SKILL.md
  grep -c '^license:' redis-sa-slides/SKILL.md
  grep 'version:' redis-sa-slides/SKILL.md
  # Line count
  wc -l redis-sa-slides/SKILL.md  # must be ≤ 150
  # Has required sections
  grep -c '## Authority' redis-sa-slides/SKILL.md
  grep -c '## Required Workflow' redis-sa-slides/SKILL.md
  grep -c '## DO NOT' redis-sa-slides/SKILL.md
  grep -c '## Verification' redis-sa-slides/SKILL.md
  grep -c '## Reference Index' redis-sa-slides/SKILL.md
  ```
- Output format: file path + line count
- Done evidence: SKILL.md exists, ≤150 lines, all 5 required sections present, frontmatter valid
- Commit allowed: no (coordinator commits after audit)
