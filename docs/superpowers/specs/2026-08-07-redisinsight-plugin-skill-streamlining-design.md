# RedisInsight Plugin Skill Streamlining Design

Date: 2026-08-07
Status: Approved direction; implementation pending

## Objective

Streamline `redis-insight-plugin` so Redis solution architects retain a useful
standalone-plugin workflow without maintaining a second copy of RedisInsight's
fast-changing internal engineering rules.

The local skill will become a hybrid adapter:

- Route internal RedisInsight contributions to the checked-out repository's
  `.ai/skills` as the authority.
- Keep the durable external Parcel plugin workflow, deployment templates,
  security constraints, and runtime verification locally.
- Keep a compact product-readiness audit distilled from RedisInsight PRs
  [#5922](https://github.com/redis/RedisInsight/pull/5922),
  [#5970](https://github.com/redis/RedisInsight/pull/5970), and
  [#5995](https://github.com/redis/RedisInsight/pull/5995).

Supporting evidence is recorded in
[`docs/research/2026-08-07-redisinsight-plugin-productization.md`](../../research/2026-08-07-redisinsight-plugin-productization.md).

## Authority Model

The skill must make the repository boundary the first decision.

### Internal RedisInsight contribution

When the current checkout is `redis/RedisInsight` and the plugin will live
under `redisinsight/ui/src/packages/`, agents must load the checked-out:

- `.ai/skills/redis-insight-plugin`
- `.ai/skills/frontend`
- `.ai/skills/code-quality`
- `.ai/skills/testing`
- `.ai/skills/e2e-testing`
- `.ai/skills/type-check-baselines`
- Redis UI component skill exposed by that checkout

Those skills override local internal guidance when they conflict. The local
skill must not duplicate their folder conventions, commands, component APIs,
package-manager choices, or current Playwright layout.

If the upstream files cannot be read, the agent must report that limitation
and use the local product-readiness audit as a fallback. It must not claim full
repository-convention compliance from the fallback alone.

### External standalone plugin

When the plugin ships outside RedisInsight, the local skill remains
authoritative for Parcel bundling, manifest construction, iframe activation,
local product styling, deployment, `/api/plugins` verification, and browser
smoke testing. External plugins must not import RedisInsight monorepo internals.

## Local Skill Structure

### `SKILL.md`

Keep `SKILL.md` concise and routing-oriented:

1. Identify internal versus external delivery.
2. Route internal work to upstream skills and the local readiness audit.
3. Route external work to the existing local references and templates.
4. Preserve authority, security, `DO NOT`, and evidence-based final checklist
   sections.

Remove duplicated internal implementation detail from `SKILL.md` when the
upstream skill owns it. Do not replace the local skill with a bare URL because
external/customer plugin work still needs a usable offline workflow.

### Product-readiness reference

Add one compact reference page for cross-cutting release gates that remain
useful even as upstream file layouts change:

- Host-convention confirmation before feature polish.
- Parser and response matrices derived from command modifiers.
- E2E collection, isolation, fixtures, and page-object checks.
- React/ReactDOM deduplication and light/dark theme verification.
- Package-scoped typecheck and baseline discipline.
- Packaging parity across every supported build path, including Unix and
  Windows when working in RedisInsight.

Geodata-specific examples may illustrate a failure class but must not become
the general rule. Prefer observable predicates such as "a modifier changes the
response shape" or "a build script copies static plugins."

### Existing references and templates

Retain external-plugin references and templates when they remain valid.
Internal guidance that merely repeats upstream rules should be reduced to a
pointer or removed. No upstream skill files will be vendored into this repo.

## Workflow

1. Inspect the repository path and intended delivery target.
2. Select internal or external authority before scaffolding.
3. For internal work, load the upstream skill set, inspect a current sibling
   package, and use the local readiness audit only as an additional gate.
4. For external work, follow the local three-phase iframe/React/visualization
   workflow and deployment references.
5. Derive tests from every changed manifest, parser, visualization, E2E, or
   packaging surface.
6. Finish only with evidence from commands or file reads performed in the
   current session.

## Failure and Drift Handling

- If upstream and local instructions conflict for internal work, upstream wins.
- If a referenced upstream skill was renamed, discover the current sibling
  skill from `.ai/skills/`; do not silently use a stale GitHub snapshot.
- If E2E tests pass but the file is outside active Playwright `testDir` paths,
  the result is not valid evidence; prove collection explicitly.
- If packaging changes, verify every platform-specific copy/install path
  touched by RedisInsight rather than assuming Unix and Windows are equivalent.
- If a broad typecheck fails because of a recorded repository baseline, run
  the package-scoped check and follow the upstream baseline skill. Do not
  refresh a baseline solely to make CI green.

## Skill Verification Strategy

Follow the `writing-skills` RED-GREEN-REFACTOR workflow during implementation.

### RED: baseline scenarios

Run fresh-agent scenarios against the current local skill and record whether
agents:

1. Treat local internal guidance as authoritative inside RedisInsight.
2. Miss upstream sibling skills or import raw `@redis-ui/*` packages.
3. Accept an E2E test without proving it is collected.
4. Verify only one packaging platform.
5. Test only one happy-path response despite modifier-dependent shapes.

At least one baseline must demonstrate each guidance gap before editing the
skill for that gap.

### GREEN: focused edits

Make the smallest routing and readiness-reference changes that correct the
observed failures. Re-run the same scenarios with the edited skill loaded.

### REFACTOR and repository validation

- Close only loopholes observed in testing.
- Keep `SKILL.md` near the repository's preferred 150-line target by moving
  operational detail into the new reference.
- Verify frontmatter, imperative instructions, explicit `DO NOT` guardrails,
  reference links, and the final checklist.
- Run `bash scripts/validate-skills.sh` and inspect its actual output.
- Run `git diff --check` and ensure no generated artifacts were added.

## Acceptance Criteria

- Internal RedisInsight requests are routed to the checked-out upstream plugin
  skill and required sibling skills before implementation.
- External standalone requests still receive complete local Parcel, manifest,
  deployment, and runtime-verification guidance.
- The local skill does not vendor or restate volatile upstream conventions.
- Product-readiness checks cover parser matrices, active and isolated E2E
  execution, theme/runtime integrity, typecheck baselines, and release parity.
- Baseline and post-change agent scenarios demonstrate the intended routing and
  verification behavior.
- Repository validation completes without new errors or generated artifacts.

## Non-Goals

- Reproducing RedisInsight's entire `.ai/skills` directory.
- Turning the local skill into a geodata-specific implementation guide.
- Changing RedisInsight application code or plugin APIs.
- Removing standalone external-plugin support.
- Pinning volatile internal commands or layouts when the checked-out upstream
  skill can provide them.
