# Redis Lucid Patterns

Use these patterns to keep Redis Lucidchart diagrams clear, editable, and customer-ready.

## Palette

Use the same practical Redis diagram palette as Excalidraw outputs:

| Purpose | Fill | Stroke | Text |
|---|---:|---:|---:|
| Redis-owned component | `#FF4438` | `#A31B14` | `#091A23` |
| Redis evidence / commands | `#091A23` | `#596873` | `#FFFFFF` |
| Application / agent role | `#F5F7F8` | `#B8C4CB` | `#091A23` |
| Live state | `#E7F7EF` | `#2E8B57` | `#0D3B24` |
| Durable memory / source of truth | `#EAF1FF` | `#4B6FB3` | `#10233F` |
| Warning / degraded | `#FFF4D6` | `#B7791F` | `#432B05` |
| Boundary / lane | `#FFFFFF` | `#D5DCE0` | `#091A23` |

## Layout Patterns

- **Context layer hub**: Put Redis in the center. Feed it with static context, durable context, and live events. Fan out to coordinators, workers, reviewers, and dashboards.
- **Swimlane ownership**: Use lanes for User/Coordinator, Redis Context Layer, Workers, Evidence/Review. Put cross-lane arrows only where state changes hands.
- **Streams timeline**: Use a horizontal timeline for `XADD`, consumer groups, `XREADGROUP`, processing, `XACK`, and replay.
- **Search retrieval**: Show Redis Search as a query/read path from context history to ranked prior decisions or evidence.
- **Task queue**: Show `LIST` or `ZSET` as a queue between coordinator and workers when the diagram is about delegation.

## Evidence Blocks

Keep examples short and copyable:

```text
HSET task:10 state running owner codex
XADD ctx:events * task 10 status DONE
FT.SEARCH idx:context '@topic:{routing}'
```

Prefer one evidence block per concept. Avoid wall-of-code shapes.

## Text Fit

- Use 1-4 words for titles.
- Use 2-4 short lines for descriptions.
- Use explicit line breaks in labels before import.
- Increase shape width before decreasing font size.
- Keep command blocks wide enough for the longest command.
