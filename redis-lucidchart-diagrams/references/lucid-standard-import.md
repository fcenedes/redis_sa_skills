# Lucid Standard Import Reference

Use this reference when creating Lucidchart-editable import sources.

## Official Sources

- Standard Import overview: https://developer.lucid.co/docs/overview-si
- Standard Import reference: https://developer.lucid.co/docs/reference-si
- Shapes: https://developer.lucid.co/docs/shapes-si
- Standard library: https://developer.lucid.co/docs/standard-library-si
- Lines: https://developer.lucid.co/docs/lines-si
- Export options: https://help.lucid.co/hc/en-us/articles/16324571257492-Export-or-print-a-Lucid-document
- Import troubleshooting: https://help.lucid.co/hc/en-us/articles/21381214243604-Troubleshooting-Import-diagrams-into-Lucidchart

## Standard Import Shape

Lucid Standard Import uses a `.lucid` extension, but the file is a ZIP. The ZIP must contain `document.json`; optional folders include `/data` for CSV and `/images` for image assets.

Minimal source folder:

```text
diagram-source/
└── document.json
```

Optional import package:

```text
diagram.lucid
├── document.json
├── data/
│   └── records.csv
└── images/
    └── logo.png
```

## Document Skeleton

```json
{
  "version": 1,
  "pages": [
    {
      "id": "page1",
      "title": "Architecture",
      "shapes": [],
      "lines": []
    }
  ],
  "documentSettings": {
    "units": "px"
  }
}
```

Every page, shape, line, group, and layer ID must be unique.

## Shapes

Use native editable shapes from supported libraries. The safest base types are:

- `rectangle` for blocks, containers, evidence panels, and swimlanes.
- `text` for free labels and section titles.
- `stickyNote` only for workshop notes, not final architecture components.

Common shape fields:

```json
{
  "id": "redis_context",
  "type": "rectangle",
  "boundingBox": { "x": 520, "y": 240, "w": 360, "h": 190 },
  "style": {
    "fill": { "type": "color", "color": "#FF4438" },
    "stroke": { "color": "#A31B14", "width": 2, "style": "solid" },
    "rounding": 12,
    "textColor": "#091A23"
  },
  "text": "Redis Context Layer",
  "zIndex": 10
}
```

Lucid supports raw HTML text formatting. Keep it conservative:

```json
"text": "<p><b>Redis Context Layer</b></p><p>Live state + evidence</p>"
```

## Lines

Use `elbow` for architecture workflows. Connect lines to shape endpoints so Lucid users can move shapes later.

```json
{
  "id": "line_app_to_redis",
  "lineType": "elbow",
  "endpoint1": {
    "type": "shapeEndpoint",
    "style": "none",
    "shapeId": "app",
    "position": { "x": 1, "y": 0.5 }
  },
  "endpoint2": {
    "type": "shapeEndpoint",
    "style": "arrow",
    "shapeId": "redis_context",
    "position": { "x": 0, "y": 0.5 }
  },
  "stroke": { "color": "#596873", "width": 2, "style": "solid" }
}
```

## Validation Notes

- Import fidelity can vary as Lucid evolves. Keep source simple and use common fields.
- Lucid import favors functional fidelity over pixel-perfect visual fidelity.
- Exported CSV is shape data, not a complete visual source of truth.
- Do not store OAuth tokens or customer-sensitive data in `document.json`.
