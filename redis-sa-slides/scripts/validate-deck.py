#!/usr/bin/env python3
"""Validate text-extracted redis-sa-slides deck content."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable


PLACEHOLDER_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("placeholder TODO marker", re.compile(r"\[TODO:", re.IGNORECASE)),
    ("placeholder lorem ipsum text", re.compile(r"Lorem ipsum", re.IGNORECASE)),
    ("placeholder percentage", re.compile(r"\bXX%")),
    ("placeholder revenue amount", re.compile(r"\$XXM\b")),
    ("placeholder presenter name", re.compile(r"\bFirstname Lastname\b")),
    ("placeholder presenter name", re.compile(r"\bPresenter name\b", re.IGNORECASE)),
    ("placeholder title text", re.compile(r"\bTitle text here\b", re.IGNORECASE)),
    ("placeholder section tag", re.compile(r"\bSection tag example\b", re.IGNORECASE)),
    (
        "instruction badge left in content",
        re.compile(
            r"\[(?:INSTRUCTION|INSTRUCTIONS|GUIDANCE|NOTE TO|SPEAKER NOTE|"
            r"DELETE|REMOVE|PLACEHOLDER|EXAMPLE|DRAFT)[^\]]*\]",
            re.IGNORECASE,
        ),
    ),
)

# Brand rule: use "fast" — flag these substitutes as warnings.
FAST_SYNONYMS: tuple[str, ...] = ("quick", "rapid", "real-time", "agile")
_FAST_SYNONYM_RE = re.compile(
    r"\b(" + "|".join(re.escape(w) for w in FAST_SYNONYMS) + r")\b",
    re.IGNORECASE,
)

# Font names permitted by the Redis brand guidelines.
_PERMITTED_FONTS = {"space grotesk", "space mono"}
_FONT_REF_RE = re.compile(r"[Ff]ont:\s*([A-Za-z][A-Za-z0-9 ]+)")

# Retired cube graphic — best-effort detection in extracted text.
_CUBE_REF_RE = re.compile(
    r'(?:\[cube\]|alt=["\']?(?:Redis )?cube["\']?|\bredis cube\b|\bcube graphic\b)',
    re.IGNORECASE,
)

# Known permitted content-gap patterns (used with --allow-reported-gaps).
PERMITTED_GAP_PATTERNS: tuple[str, ...] = (
    "customer logo",
    "need metric",
    "customer name",
    "customer domain",
    "meeting date",
    "presenter",
    "confidentiality",
)
_PERMITTED_GAP_RE = re.compile(
    r"\[TODO:\s*(" + "|".join(re.escape(p) for p in PERMITTED_GAP_PATTERNS) + r")\s*\]",
    re.IGNORECASE,
)

SIGNIFICANT_SHORT_WORDS = {
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "from",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "per",
    "the",
    "to",
    "vs",
    "with",
}

KNOWN_PROPER_OR_BRAND_WORDS = {
    "AI",
    "API",
    "APIs",
    "AWS",
    "Azure",
    "CE",
    "CRDT",
    "GCP",
    "JSON",
    "KPI",
    "KPIs",
    "POC",
    "QBR",
    "RAG",
    "RDI",
    "Redis",
    "RedisInsight",
    "SA",
    "SAs",
    "TCO",
    "TDD",
    "TTL",
}


@dataclass(frozen=True)
class Finding:
    file: str
    line: int
    issue: str
    severity: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate text-extracted redis-sa-slides deck content.",
        epilog=(
            "Best-effort checks for font names and retired cube graphics "
            "depend on text extraction including metadata."
        ),
    )
    parser.add_argument(
        "input",
        nargs="?",
        default="-",
        help="Text file to validate, or '-' for stdin. Defaults to stdin.",
    )
    parser.add_argument(
        "--format",
        choices=("json", "jsonl"),
        default="json",
        help="Output format for findings. Defaults to json.",
    )
    parser.add_argument(
        "--allow-reported-gaps",
        action="store_true",
        default=False,
        help=(
            "Do not flag [TODO: ...] markers that match known permitted "
            "gap patterns (e.g. 'customer logo', 'need metric')."
        ),
    )
    return parser.parse_args()


def read_input(path_arg: str) -> tuple[str, list[str]]:
    if path_arg == "-":
        return "stdin", sys.stdin.read().splitlines()

    path = Path(path_arg)
    return str(path), path.read_text(encoding="utf-8").splitlines()


def is_title_case_violation(line: str) -> bool:
    stripped = line.strip()
    if not stripped or len(stripped) > 90:
        return False
    if stripped.startswith(("[SA-BANK:", "SOURCE:", "INTENT:", "LOGIC:")):
        return False
    if stripped.endswith((".", "?", "!", ",", ";")):
        return False

    words = re.findall(r"[A-Za-z][A-Za-z0-9'/-]*", stripped)
    if len(words) < 3:
        return False

    scored_words = [
        word
        for word in words
        if word.lower() not in SIGNIFICANT_SHORT_WORDS
        and word not in KNOWN_PROPER_OR_BRAND_WORDS
        and not word.isupper()
    ]
    if len(scored_words) < 3:
        return False

    title_cased = sum(1 for word in scored_words if word[:1].isupper())
    return title_cased >= 3 and title_cased / len(scored_words) >= 0.65


def _is_metadata_line(line: str) -> bool:
    """Return True for SA-BANK tags and metadata prefixes that are exempt from brand word checks."""
    stripped = line.strip()
    return stripped.startswith(("[SA-BANK:", "SOURCE:", "INTENT:", "LOGIC:"))


def validate_lines(
    source_name: str,
    lines: Iterable[str],
    *,
    allow_reported_gaps: bool = False,
) -> list[Finding]:
    findings: list[Finding] = []

    for line_no, line in enumerate(lines, start=1):
        for issue, pattern in PLACEHOLDER_PATTERNS:
            if pattern.search(line):
                # When allow_reported_gaps is set, skip permitted TODO patterns.
                if (
                    allow_reported_gaps
                    and issue == "placeholder TODO marker"
                    and _PERMITTED_GAP_RE.search(line)
                ):
                    continue
                findings.append(Finding(source_name, line_no, issue, "error"))

        if "\u2014" in line:
            findings.append(
                Finding(source_name, line_no, "brand violation: use comma, colon, or parentheses instead of em dash", "error")
            )
        if "!" in line:
            findings.append(
                Finding(source_name, line_no, "brand violation: replace exclamation points with periods", "error")
            )
        if is_title_case_violation(line):
            findings.append(
                Finding(source_name, line_no, "brand violation: use sentence case for titles", "warning")
            )

        # Finding 5: forbidden synonyms of "fast" (skip metadata lines).
        if not _is_metadata_line(line):
            for match in _FAST_SYNONYM_RE.finditer(line):
                word = match.group(1)
                findings.append(
                    Finding(
                        source_name,
                        line_no,
                        f"brand violation: use 'fast' instead of '{word}'",
                        "warning",
                    )
                )

        # Finding 6a: best-effort non-permitted font detection.
        for font_match in _FONT_REF_RE.finditer(line):
            font_name = font_match.group(1).strip()
            if font_name.lower() not in _PERMITTED_FONTS:
                findings.append(
                    Finding(
                        source_name,
                        line_no,
                        f"brand violation: non-permitted font '{font_name}'",
                        "warning",
                    )
                )

        # Finding 6b: best-effort retired cube graphic detection.
        if _CUBE_REF_RE.search(line):
            findings.append(
                Finding(
                    source_name,
                    line_no,
                    "brand violation: retired Redis cube graphic detected",
                    "warning",
                )
            )

    return findings


def emit_findings(findings: list[Finding], output_format: str) -> None:
    records = [asdict(finding) for finding in findings]
    if output_format == "jsonl":
        for record in records:
            print(json.dumps(record, ensure_ascii=False))
        return

    print(json.dumps(records, ensure_ascii=False, indent=2))


def main() -> int:
    args = parse_args()
    source_name, lines = read_input(args.input)
    findings = validate_lines(
        source_name, lines, allow_reported_gaps=args.allow_reported_gaps
    )
    emit_findings(findings, args.format)
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
