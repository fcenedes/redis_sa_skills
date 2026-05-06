# Redis Excalidraw Color Palette

This file is the single source of truth for Redis Excalidraw diagram colors. Do not invent one-off colors in diagram JSON.

## Shape Colors

Colors encode semantic ownership and behavior.

| Semantic Purpose | Fill | Stroke | Use For |
| --- | --- | --- | --- |
| Redis primary | `#FFE8E6` | `#FF4438` | Redis databases, shards, Query Engine, Streams, Redis-owned services |
| Redis emphasis | `#FF4438` | `#8A221C` | Hero Redis node, active path, critical command or write path |
| Application | `#E8F1F5` | `#163341` | App services, API gateways, workers, clients |
| Data object | `#F5F7F8` | `#2D4754` | Keys, hashes, JSON documents, stream entries, vector records |
| Query/search | `#E8F7F1` | `#0B6B45` | Redis Query Engine, vector indexes, filters, search results |
| Stream/event | `#FFF2CC` | `#B7791F` | Streams timelines, consumer groups, event logs, pending entries |
| Replication/cluster | `#E9EDFF` | `#3446A3` | Replicas, shards, hash slots, failover, cross-node traffic |
| Cloud/network | `#F0ECFF` | `#6E49CB` | Redis Cloud, regions, VPCs, private endpoints, Active-Active |
| Observability | `#E6F7FF` | `#0E7490` | Metrics, alerts, dashboards, traces, logs |
| Decision | `#FFF7D6` | `#B45309` | Cache hit/miss, routing choices, failover decisions |
| Warning/risk | `#FFE3E0` | `#CC2820` | Hot keys, memory pressure, stale reads, failover caveats |
| Success/output | `#DDF8EA` | `#087A46` | Responses, successful writes, recovered state |

## Text Colors

| Level | Color | Use For |
| --- | --- | --- |
| Title | `#091A23` | Diagram title, section headings |
| Subtitle | `#163341` | Secondary headings, lane labels |
| Body/detail | `#2D4754` | Notes, annotations, labels |
| Muted | `#8A99A0` | Non-critical metadata and timestamps, 14px+ only |
| On Redis Red | `#FFFFFF` | Text inside `#FF4438` shapes |
| On dark evidence | `#FFFFFF` | Main text inside evidence blocks |

Never use pure black (`#000000`). Use `#091A23` for primary text.

## Evidence Artifact Colors

Use dark evidence blocks for concrete commands, payloads, metrics, and configuration.

| Artifact | Background | Primary Text | Accent |
| --- | --- | --- | --- |
| Redis CLI command | `#091A23` | `#FFFFFF` | `#FF4438` |
| JSON/hash document | `#091A23` | `#DDF8EA` | `#8BE8B6` |
| Query/index syntax | `#091A23` | `#E8F7F1` | `#7DD3A7` |
| Metrics/logs | `#091A23` | `#E6F7FF` | `#67D7F0` |
| Config/topology | `#091A23` | `#F0ECFF` | `#B7A8FF` |

## Lines And Arrows

| Element | Color |
| --- | --- |
| Main Redis write path | `#FF4438` |
| Read path | `#163341` |
| Replication or cluster bus | `#3446A3` |
| Stream/event flow | `#B7791F` |
| Query/vector flow | `#0B6B45` |
| Observability export | `#0E7490` |
| Structural dividers | `#B9C2C6` |

## Canvas

| Property | Value |
| --- | --- |
| Background | `#FFFFFF` |
| Grid size | `20` |
| Default roughness | `0` |
| Default opacity | `100` |

## Anti-Patterns

- Do not use Tailwind defaults such as `red-500`, `gray-900`, or arbitrary brand approximations.
- Do not make every element Redis Red; reserve red for Redis ownership and emphasis.
- Do not use gradients, shadows, or translucent fills for technical meaning.
- Do not use muted text for required labels, command names, or metrics.
