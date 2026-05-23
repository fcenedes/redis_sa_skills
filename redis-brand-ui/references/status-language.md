# Redis Status and Meaning Labels

Redis Red is the brand accent. Use labels, icons, borders, and source/freshness copy to carry meaning. Do not build a full semantic color system inside this skill unless reviewers approve it later.

## Required Labels

| Label | Meaning | Preferred Treatment |
| --- | --- | --- |
| `Live` | Current data from an active source | Status pill plus source and freshness timestamp |
| `Sampled` | Subset of live or historical data | Neutral pill plus sample size or window |
| `Modeled` | Hypothetical or calculated scenario | Dashed outline or neutral pill plus source note |
| `Derived` | Computed from another source | Neutral pill plus source relationship |
| `Receipt` | Evidence that an event occurred | Timestamp, source, actor/system, command/result |
| `Source` | Origin of data | Source label close to metric/table/chart |
| `Approved` | Human or system approval completed | Approver/system and time |
| `Pending approval` | Approval requested but incomplete | Pending label plus next step |
| `Stale` | Older than expected freshness window | Timestamp and refresh/retry action |
| `Failed` | Operation could not complete | Failure label plus recovery action |

## Rules

- Pair color with text or icon; do not rely on color alone.
- Keep Redis Red for brand, selected Redis entities, active navigation, and primary actions.
- Use app-specific error treatment only for actual failures, blocked states, destructive actions, or security-relevant problems.
- Distinguish live data from modeled data in the visible label.
- Distinguish evidence from authority in the visible label.
- When adding non-brand state colors, label them as product UI extensions and verify contrast.

## DO NOT

- Do not use Redis Red for healthy, warning, pending, and failed states at the same time.
- Do not label derived output as approved or authoritative.
- Do not show stale or sampled data as live.
- Do not introduce green, amber, or error palettes as official Redis brand colors.
