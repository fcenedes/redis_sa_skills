#!/usr/bin/env python3
"""Validate and package a Lucid Standard Import source directory."""

from __future__ import annotations

import argparse
import json
import sys
import zipfile
from pathlib import Path


def iter_ids(value):
    if isinstance(value, dict):
        if isinstance(value.get("id"), str):
            yield value["id"]
        for child in value.values():
            yield from iter_ids(child)
    elif isinstance(value, list):
        for child in value:
            yield from iter_ids(child)


def validate_document(document: dict) -> list[str]:
    errors: list[str] = []
    if document.get("version") != 1:
        errors.append("document.version must be 1")
    pages = document.get("pages")
    if not isinstance(pages, list) or not pages:
        errors.append("document.pages must be a non-empty array")
        return errors

    ids = list(iter_ids(document))
    duplicates = sorted({item for item in ids if ids.count(item) > 1})
    if duplicates:
        errors.append("duplicate IDs: " + ", ".join(duplicates))

    shape_ids: set[str] = set()
    line_ids: set[str] = set()
    for page in pages:
        if not isinstance(page, dict):
            errors.append("each page must be an object")
            continue
        for shape in page.get("shapes", []):
            shape_id = shape.get("id")
            if isinstance(shape_id, str):
                shape_ids.add(shape_id)
            box = shape.get("boundingBox")
            if not isinstance(box, dict):
                errors.append(f"shape {shape_id or '<missing>'} missing boundingBox")
        for line in page.get("lines", []):
            line_id = line.get("id")
            if isinstance(line_id, str):
                line_ids.add(line_id)

    for page in pages:
        for line in page.get("lines", []):
            for endpoint_name in ("endpoint1", "endpoint2"):
                endpoint = line.get(endpoint_name, {})
                if endpoint.get("type") == "shapeEndpoint":
                    target = endpoint.get("shapeId")
                    if target not in shape_ids:
                        errors.append(f"line {line.get('id')} references missing shape {target}")
                if endpoint.get("type") == "lineEndpoint":
                    target = endpoint.get("lineId")
                    if target not in line_ids:
                        errors.append(f"line {line.get('id')} references missing line {target}")

    return errors


def package_source(source_dir: Path, output: Path | None) -> None:
    document_path = source_dir / "document.json"
    if not document_path.exists():
        raise SystemExit(f"missing {document_path}")

    document = json.loads(document_path.read_text(encoding="utf-8"))
    errors = validate_document(document)
    if errors:
        raise SystemExit("\n".join(errors))

    if output is None:
        print(f"valid Lucid Standard Import source: {document_path}")
        return

    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.write(document_path, "document.json")
        for optional_dir in ("data", "images"):
            root = source_dir / optional_dir
            if root.exists():
                for file_path in sorted(path for path in root.rglob("*") if path.is_file()):
                    archive.write(file_path, file_path.relative_to(source_dir).as_posix())
    print(f"wrote {output}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source_dir", type=Path)
    parser.add_argument("--output", type=Path, help="Optional .lucid zip output path")
    args = parser.parse_args()
    package_source(args.source_dir, args.output)
    return 0


if __name__ == "__main__":
    sys.exit(main())
