---
name: deprecation-and-migration
description: Manage deprecation and migration safely. Use when removing old systems, APIs, or features. Use when migrating users between implementations, Redis versions, or caching patterns. Enforces deprecation decision framework, Expand/Contract for schema changes, and Zombie Code diagnosis.
license: MIT
metadata:
  author: redis
  version: "1.0.0"
---

# Deprecation and Migration

Code is a liability. Every line has maintenance cost, security surface, and
cognitive load. Deprecation is how you manage that cost. Migration is how you
move consumers off the liability without breaking them.

Load [migration-patterns](references/migration-patterns.md) for worked examples,
checklists, and templates.

## When to Use

- Removing old systems, APIs, libraries, or internal services.
- Migrating between implementations, Redis versions, or cloud providers.
- Sunsetting features that no longer justify their maintenance cost.
- Changing key schemas, data models, or cache patterns in production.

## Deprecation Decision

Answer these five questions before deprecating anything:

1. **Unique value?** Does this component provide something no other component provides?
2. **How many consumers?** List every caller, integration, and downstream dependency.
3. **Replacement exists?** Is the alternative production-ready, documented, and tested?
4. **Migration cost per consumer?** Estimate hours per consumer to switch. Multiply by consumer count.
5. **Cost of NOT deprecating?** Security debt, maintenance hours, incident risk, opportunity cost.

If questions 1-3 all favor deprecation and question 4 is bounded, proceed. If
question 5 is high and growing, proceed even when question 4 is painful.

## Compulsory vs Advisory

| Type | Removal date | Migration required | Owner responsibility |
|---|---|---|---|
| **Compulsory** | Set and published | Yes, before deadline | Provide migration tooling and support |
| **Advisory** | None | Recommended, not forced | Document the alternative; monitor adoption |

Start advisory. Escalate to compulsory when security debt, incident cost, or
maintenance burden crosses a threshold you define in the announcement.

## The Churn Rule

If you own the infrastructure, you own the migration. Do not push migration cost
onto consumers and call it "deprecation." Provide tooling, codemods, adapters, or
migration scripts. The team that breaks the contract fixes the callers.

## Migration Patterns

Use the pattern that matches your constraint. See [references](references/migration-patterns.md)
for worked examples.

| Pattern | Mechanism | Best for |
|---|---|---|
| **Strangler** | Run old+new in parallel; shift traffic incrementally | Services, APIs, large rewrites |
| **Adapter** | Old interface backed by new implementation | Libraries, SDKs, internal APIs |
| **Feature Flag** | Switch consumers one at a time | Gradual rollouts, risk-sensitive migrations |
| **Expand/Contract** | Add new → dual-write + backfill → drop old | DB schemas, key schemas, config formats |

Expand/Contract rule: **never combine add and drop in the same deploy.** Separate
them by at least one successful deploy cycle.

## Zombie Code

Code is a zombie when it meets three or more of these criteria:

- No meaningful commits in 6+ months.
- Active consumers still depend on it.
- No assigned maintainer or owner.
- Failing tests that nobody fixes.
- No documentation or stale documentation.

Response: assign an owner within 2 weeks or begin compulsory deprecation. There
is no third option.

## Redis-Specific Migration

- **Version migration (6→7→8)**: Check breaking changes in ACLs, command
  renames, module API changes, and replication protocol. Run `redis-cli INFO`
  comparison before and after. See [references](references/migration-patterns.md)
  for the version checklist.
- **OSS→Redis Cloud**: Migrate with `redis-cli --rdb` or RIOT. Verify ACLs,
  persistence config, and module compatibility post-migration.
- **Cache pattern migration** (aside→through): Dual-write during transition.
  Validate hit rates before cutting over.
- **Key schema migration**: Use `SCAN` + `RENAME` or `COPY` (Redis 6.2+).
  Never use `KEYS` in production. Batch with pipeline, throttle to avoid
  blocking.

## Common Rationalizations

| Rationalization | Why it is dangerous |
|---|---|
| "It still works, why remove it?" | Working unmaintained code accumulates security debt silently |
| "Nobody has complained" | Absence of complaints is not evidence of health |
| "We might need it later" | Keep the git history; delete the running code |
| "It is too risky to migrate" | Risk grows with time; migrate now while you understand it |
| "We do not have time" | You have time for incidents caused by unmaintained code? |
| "The old version is battle-tested" | Battle-tested without patches means battle-vulnerable |
| "Just one more release on the old system" | One more becomes twelve more |
| "Consumers should migrate themselves" | See the Churn Rule above |
| "We will deprecate after the next feature" | Deprecation deferred is deprecation denied |

## Red Flags

- Deprecation announced but no removal date set after 90 days.
- Migration tooling does not exist but consumers are told to migrate.
- Expand/Contract steps combined into a single deploy.
- Zombie code identified but no owner assigned and no deprecation started.
- Consumer count unknown at decision time.

## Verification

Each item must be proved by evidence, not by memory.

- [ ] Deprecation decision answered all five questions with data.
- [ ] Compulsory deprecations have a published removal date and migration tooling.
- [ ] Migration pattern matches the constraint (schema, service, library).
- [ ] Expand/Contract steps are in separate deploys with validation between them.
- [ ] Consumer inventory is complete and each consumer has a migration path.
- [ ] Zombie code has an assigned owner or an active deprecation ticket.
- [ ] Redis version migration ran INFO comparison before and after.

## DO NOT

- Do not deprecate without answering the five decision questions.
- Do not combine schema add and drop in the same deploy.
- Do not push migration cost onto consumers without providing tooling.
- Do not announce deprecation without a replacement that is production-ready.
- Do not use `KEYS` for production key migration; use `SCAN`.
- Do not leave zombie code without an owner or a deprecation plan.
- Do not skip dual-write validation when migrating cache patterns.
