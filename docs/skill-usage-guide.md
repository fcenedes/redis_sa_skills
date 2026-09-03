# Skill Usage Guide

Use this guide when you know the outcome you want but are unsure which skills to invoke, in what order, and what each skill authorizes the agent to do.

Skills are control surfaces, not decorations. Put requirements before plans, plans before routing, routing before dispatch, and evidence before completion claims.

## Sequence Rules

1. Define the desired behavior before execution.
   Use `agent-spec-writing` when the request changes requirements, product behavior, architecture contracts, acceptance criteria, or durable source-of-truth docs.

2. Reconcile delivered scope before follow-up work.
   Use `agent-capability-ledger` before readiness, "what remains?", cross-tranche, multi-repo, or follow-up planning. The ledger prevents agents from re-planning work that is already delivered or treating old claims as proof.

3. Write a file-backed plan before delegating.
   Use `agent-delegation-planning` when work will be handed to agents, subagents, Codex CLI, Claude Code, local models, or parallel workers. The plan owns task boundaries, file ownership, verification, audit, model choice, and commit policy.

4. Route from an existing plan.
   Use `agent-delegation-routing` after the plan exists. Routing chooses worker role, model, reasoning effort, command shape, fallback, and verification path. It does not create the plan.

5. Coordinate shared work through memory or tracker files.
   Use `agent-memory-coordination` when multiple workers need shared prompts, ownership maps, gate results, or strict integration handoff. Repo files remain source of truth; memory is a coordination cache.

6. Track plan state after work starts.
   Use `agent-plan-lifecycle` to resume, advance, promote, close, or archive delegated plans from evidence.

7. Apply Redis artifact skills at the delivery surface.
   Use `redis-brand-ui` for branded marketing chrome and official Redis visual identity. Use `redis-product-ui` for dashboards, admin tools, RedisInsight-like UI, Workbench plugin iframes, dense tables, drawers, filters, and product states. Use diagram, deck, or plugin skills for their specific artifact formats.

8. Verify with current-session evidence.
   A skill checklist is not passed because a worker says it passed. Completion needs file paths, commands, rendered outputs, browser checks, audit verdicts, or other current-session evidence.

## Authority Cheat Sheet

| Skill | Use when | Why it is in the sequence | What it permits | What it does not permit |
|---|---|---|---|---|
| `agent-spec-writing` | Requirements, deltas, source-of-truth docs, acceptance scenarios | Establishes what should be true before planning implementation | Write spec and requirement artifacts | Dispatch workers or implement the spec |
| `agent-capability-ledger` | Follow-up, readiness, audit, "what remains?", delivered-vs-missing scope | Prevents duplicate work and records proof class | Create or update ledger rows from repo evidence | Mark done from memory or chat claims |
| `agent-delegation-planning` | Multi-task, multi-file, multi-worker, delegated implementation | Turns scope into executable ownership and verification contracts | Write plan files, tracker, coordinator prompt, memory records when available | Start plan-only execution, commit, push, or expand scope without permission |
| `agent-delegation-routing` | Dispatching tasks from an existing plan | Picks the right worker, model, effort, command shape, and fallback | Recommend or perform scoped dispatch when execution is authorized | Route from chat-only plans, commit, push, or broaden ownership |
| `agent-memory-coordination` | Parallel workers, shared prompts, ownership maps, gate records | Keeps workers aligned without copying long prompts through chat | Read/write shared memory and coordinate disjoint worker ownership | Treat memory as source of truth or dispatch without an ownership plan |
| `agent-plan-lifecycle` | Resume, status, promotion, closure, archive | Separates task state, plan state, evidence, promotion, and archive | Update lifecycle records from evidence | Hide failed or unaudited work by archiving it |
| `redis-brand-ui` | Redis-branded marketing pages, sponsor slides, one-pagers, logo usage | Applies official visual identity where brand matters | Modify brand UI artifacts and run contrast checks | Own product dashboard patterns |
| `redis-product-ui` | Redis product UI, dashboards, admin tools, developer tools, plugin iframes | Applies Redis application patterns and dense operational UI behavior | Create product UI surfaces, states, tables, filters, drawers, modals | Replace official brand rules or build marketing pages |
| `redis-excalidraw-diagrams` | Redis architecture sketches or `.excalidraw` files | Produces rendered and visually checked technical diagrams | Create Redis Excalidraw JSON and render validation outputs | Skip render inspection or invent Redis facts |
| `redis-lucidchart-diagrams` | Lucidchart-editable architecture handoffs | Produces editable Lucid Standard Import sources | Generate and validate Lucid import source packages | Commit generated `.lucid` zips unless requested |

## Recipe: Build A Redis Demo

Use this when the deliverable is a customer-facing or field-engineering demo, especially one with UI, diagrams, or delegated implementation.

| Step | Skill | Purpose |
|---:|---|---|
| 1 | `agent-spec-writing` | Capture demo goal, target audience, acceptance scenarios, data paths, live-vs-mocked boundaries, and non-goals. |
| 2 | `agent-capability-ledger` | Use only for a follow-up or existing demo. Classify what is already delivered, partial, missing, blocked, or superseded. |
| 3 | `agent-delegation-planning` | Create the file-backed implementation plan, owners, gates, browser checks, audit task, and token-economy choices. |
| 4 | `agent-delegation-routing` | Route implementation, UI, diagram, verifier, and auditor tasks to the cheapest sufficient workers. |
| 5 | `agent-memory-coordination` | Use when more than one worker runs. Store compact prompt/status pointers and enforce disjoint file ownership. |
| 6 | `redis-brand-ui` and/or `redis-product-ui` | Apply brand identity for marketing/demo chrome; apply product UI patterns for dashboards, tools, and plugin surfaces. |
| 7 | `playwright-cli-agent` then `playwright-test` | Inspect the running demo, capture browser evidence, then add or fix durable UI/E2E tests. |
| 8 | `agent-plan-lifecycle` | Promote verified work into docs, ledger, memory pointers, and archive records when the plan is complete. |

Default prompt:

```text
Use /agent-spec-writing first to define the Redis demo behavior and acceptance checks. If this is follow-up work, reconcile /agent-capability-ledger before planning. Then use /agent-delegation-planning, /agent-delegation-routing, and /agent-memory-coordination for delegated implementation with strict file ownership, current-session verification, and an auditor task. Use /redis-brand-ui for branded shell work and /redis-product-ui for product/dashboard surfaces.
```

## Recipe: Create A Deal-Winning Feature

Use this when the request is strategically important, ambiguous, or likely to span discovery, product design, implementation, verification, and executive/customer-facing artifacts.

| Step | Skill | Purpose |
|---:|---|---|
| 1 | `brainstorming` from Superpowers, when installed | Explore intent, constraints, options, and user-approved design before implementation. |
| 2 | `agent-memory-coordination` | Search relevant project/customer memory and repo docs for prior decisions, constraints, blockers, and ownership boundaries. |
| 3 | `agent-spec-writing` | Turn the approved design into durable requirements, acceptance scenarios, compatibility impact, non-goals, and unresolved decisions. |
| 4 | `agent-capability-ledger` | Create or reconcile capability rows so delivery can be tracked by status and proof class. |
| 5 | `agent-delegation-planning` | Split work into ownership areas with exact gates, audit tasks, model choices, and commit policy. |
| 6 | `redis-product-ui` | Use when the feature has a product, dashboard, admin, developer-tool, or RedisInsight-like UI surface. |
| 7 | `redis-brand-ui` | Use only for branded shell, landing, one-pager, or customer-facing visual identity around the feature. |
| 8 | `agent-delegation-routing` | Dispatch implementation, verification, UI, performance, docs, and audit roles from the plan. |
| 9 | `agent-plan-lifecycle` | Resume, verify, audit, promote, and archive the plan with evidence. |

Escalate early if product strategy, security posture, public API contract, customer promise, or architecture boundary is undecided. Do not delegate those decisions to bounded implementors.

Default prompt:

```text
Use /brainstorming to shape the feature concept before implementation. Then write a durable spec with /agent-spec-writing, reconcile capability tracking with /agent-capability-ledger, and create an executable plan with /agent-delegation-planning. Use /redis-product-ui for the application surface, /redis-brand-ui only for brand chrome, /agent-delegation-routing for worker dispatch, and /agent-memory-coordination for shared prompt/status ownership. Require independent verification and an auditor verdict before claiming completion.
```

## Recipe: Document Demo Architecture

Use this when the goal is explanation, onboarding, or customer handoff for an existing or planned demo.

| Step | Skill | Purpose |
|---:|---|---|
| 1 | `documentation-writer` or `create-readme`, when installed | Choose the document type: how-to, explanation, tutorial, reference, or README. Define audience, goal, and scope. |
| 2 | `agent-spec-writing` | Use only if documentation changes durable requirements, source-of-truth architecture, acceptance scenarios, or behavior contracts. |
| 3 | `redis-excalidraw-diagrams` | Create a rendered, visually inspected `.excalidraw` technical diagram for repo-native or lightweight sharing. |
| 4 | `redis-lucidchart-diagrams` | Create editable Lucid Standard Import source when the SA or customer needs Lucidchart handoff. |
| 5 | `redis-presentation-decks` or `redis-sa-slides` | Use when the architecture explanation belongs in a Redis presentation or Google Slides deck. |
| 6 | `agent-plan-lifecycle` | Use only if the documentation belongs to a delegated plan that needs promotion or closure. |

Default prompt:

```text
Use /documentation-writer to classify this as an architecture explanation for Redis SAs and customer stakeholders. Use /redis-excalidraw-diagrams for a rendered repo-native architecture diagram, or /redis-lucidchart-diagrams if the handoff must be Lucidchart-editable. Use /agent-spec-writing only if the documentation updates source-of-truth requirements or acceptance scenarios.
```

## Recipe: Build A RedisInsight Workbench Plugin

| Step | Skill | Purpose |
|---:|---|---|
| 1 | `agent-spec-writing` | Define command support, activation method, data contract, UI states, and validation scenarios. |
| 2 | `redis-insight-plugin` | Build or modify the plugin manifest, package, activation wiring, Redis command parsing, deployment, and `/api/plugins` verification. |
| 3 | `redis-product-ui` | Apply RedisInsight-like product UI patterns inside the plugin iframe. |
| 4 | `playwright-cli-agent` | Inspect plugin activation and browser behavior in a running RedisInsight instance. |
| 5 | `playwright-test` | Add durable plugin smoke or E2E tests after selectors and behavior are known. |
| 6 | `agent-delegation-planning` and `agent-delegation-routing` | Use only when the plugin work is multi-file, multi-worker, or needs independent audit. |

## Recipe: Run Follow-Up Readiness Work

| Step | Skill | Purpose |
|---:|---|---|
| 1 | `agent-capability-ledger` | Classify delivered, partial, missing, blocked, superseded, and stale-proof capabilities from repo evidence. |
| 2 | `agent-memory-coordination` | Search memory for prior gate results and blockers, then treat repo evidence as authoritative. |
| 3 | `agent-delegation-planning` | Generate delta tasks only from missing, partial, blocked, stale-proof, or newly requested rows. |
| 4 | `agent-delegation-routing` | Dispatch repair, verifier, and auditor tasks with explicit ownership. |
| 5 | `agent-plan-lifecycle` | Promote audited results back into ledger, docs, and archive records. |

Do not generate broad new plans from old chat summaries. If a proof was skipped because Redis, browser, Docker, credentials, or another live prerequisite was unavailable, record it as skipped.

## Choosing Diagram And Presentation Skills

| Need | Use | Reason |
|---|---|---|
| Lightweight repo-native architecture sketch | `redis-excalidraw-diagrams` | Produces versionable `.excalidraw` JSON and rendered PNG validation. |
| Customer-editable architecture diagram | `redis-lucidchart-diagrams` | Produces Lucid Standard Import source that imports as editable shapes. |
| Reveal.js HTML deck | `redis-presentation-decks` | Best for web-native technical presentations with validation scripts. |
| Google Slides customer deck | `redis-sa-slides` | Best for SA decks using the shared slide bank, customer logos, and Google Slides workflow. |
| Product/admin/demo UI | `redis-product-ui` | Best for dense operator workflows, tables, filters, inspectors, and stateful UI. |
| Brand page or visual identity | `redis-brand-ui` | Best for Redis official colors, typography, logos, and contrast checks. |

## Anti-Patterns

- Do not start with `agent-delegation-routing` when no file-backed plan exists.
- Do not use `agent-memory-coordination` as a substitute for specs, plans, ledgers, or tracker files.
- Do not use `redis-brand-ui` as the only guidance for dashboards, admin panels, developer tools, or RedisInsight plugin iframes.
- Do not use `redis-product-ui` as the primary guidance for marketing pages, landing pages, sponsor slides, or logo rules.
- Do not create both Excalidraw and Lucidchart diagrams unless the deliverable needs both a repo-native draft and a customer-editable handoff.
- Do not claim work is done from a worker report alone. Re-run or inspect verification evidence in the current session.
- Do not commit generated artifacts such as screenshots, binary exports, `.lucid` zips, `node_modules/`, `dist/`, or `.parcel-cache/`.

## Final Check

Before handing work to agents, confirm:

- The source of truth is named.
- The skill sequence is explicit.
- Each skill has a reason to appear.
- Each delegated task has owned files, forbidden files, exact steps, verification, and audit expectations.
- External skills are marked as external and installed before use.
- Skipped live or browser proof is recorded as skipped, not passed.
