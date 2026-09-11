#!/usr/bin/env python3
"""Structural validator for agent-spec-writing change deltas.

usage: validate-change-delta.py SPEC

Exit 0: no structural error and the document declares `- Errors: 0`.
Exit 1: at least one error (validator-found or document-declared).
Exit 2: usage or I/O error.

Mechanical checks only. Semantic checks are attestations in
references/spec-quality-gate.md. Output sections: ERRORS, WARNINGS, REVIEW
(numeric tokens a human must classify as derived, cited, (measure), or exempt).
The unfilled template is not a valid delta and is expected to fail.
"""
import argparse
import re
import sys
from collections import defaultdict

REQ = r"REQ-[0-9A-Za-z]+(?:-[0-9A-Za-z]+)*"
REQ_RE = re.compile(rf"(?<![\w-])({REQ})(?![\w-])")
REQ_HEADING_RE = re.compile(rf"^### ({REQ}): \S")
SECTION_RE = re.compile(r"^## (.+?)\s*$")
FENCE_RE = re.compile(r"^\s*(`{3,}|~{3,})")
BACKTICK_RE = re.compile(r"`[^`]*`")
URL_RE = re.compile(r"https?://\S+")
FILELINE_RE = re.compile(r"[\w./-]+\.\w+:\d+(?:-\d+)?")
DATE_RE = re.compile(r"\b\d{4}-\d{2}-\d{2}\b")
RFC_RE = re.compile(r"\bRFC ?\d+\b")
DID_RE = re.compile(r"\bD-\d+\b")
UNIT = r"(?:ns|us|µs|ms|s|min|h|d|B|KB|MB|GB|KiB|MiB|GiB|%|rps|qps|ops|req/s|km|m|attempts?|retries|bytes?|bits?|nanoseconds?|microseconds?|milliseconds?|seconds?|minutes?|hours?|days?|percent|entities|requests|records|rows|items)"
NUM_RE = re.compile(rf"(?<![\w.])-?\d*\.?\d+(?:\s?{UNIT})?(?![\w])")
PLACEHOLDER_RE = re.compile(r"<[A-Za-z][A-Za-z0-9_.-]*(?: [^<>]*)?>|REQ-<")
WEASEL_RE = re.compile(
    r"\b(should|may|might|typically|sufficient|acceptable|probably|likely|"
    r"roughly|reasonable|approximately|appropriate|as appropriate|adequate|"
    r"fast|robust|etc\.?)\b"
)
RFC_TERM_RE = re.compile(r"\b(MUST|SHOULD|MAY|SHALL|REQUIRED|RECOMMENDED|OPTIONAL)\b")
LATER_RE = re.compile(
    rf"retarget|(after|once|when) {REQ} (lands|ships|is (done|merged|implemented))",
    re.IGNORECASE,
)
FIELD_RE = re.compile(r"^- ([A-Za-z][A-Za-z /()-]*?(?:, if any)?):(.*)$")
PIPE_SPLIT_RE = re.compile(r"(?<!\\)\|")
LABELS = [
    "1 numbers", "2 weasel", "3 units", "4 primitives", "5 interactions",
    "6 consistency", "7 decisions", "8 later-clauses", "9 interoperability",
    "10 dag", "11 slots", "12 assumptions", "13 sections",
]
RESULT_RE = re.compile(r"^(pass|\d+ fixed) \((?P<detail>[^()]*\S[^()]*)\)$")
SLOTS_COMMON = [
    "Source", "Depends on", "Baseline row", "Evidence checked",
    "Impacted files/components", "Contract shape", "Acceptance scenarios",
    "Constraints", "Failure mode", "Rollback", "Observability",
    "Compatibility impact", "Verification", "Handoff task, if any",
]
SLOTS_BY_SECTION = {
    "ADDED": SLOTS_COMMON + ["Rationale"],
    "MODIFIED": SLOTS_COMMON + ["Previous behavior", "New behavior", "Why", "Migration", "Supersedes"],
    "REMOVED": SLOTS_COMMON + ["Removed behavior", "Why"],
}
LIST_FIELDS = {"Depends on"}
REQUIRED_SECTIONS = [
    "Summary", "Baseline (REQ-00)", "ADDED", "MODIFIED", "REMOVED", "SUPERSEDED",
    "DEFERRED", "Dependency DAG", "Cross-REQ Interactions", "Non-Goals",
    "Assumptions", "Open Decisions", "Test Strategy", "Security",
    "Consumer Rollback", "Validation Report", "Execution Handoff",
    "Revision History",
]
TABLE_SECTIONS = {
    "SUPERSEDED", "DEFERRED", "Cross-REQ Interactions", "Assumptions",
    "Open Decisions", "Test Strategy", "Revision History",
}
HEADER_FIELDS = ["Source of truth", "Units used in this document", "Standards cited", "Author", "Date", "Revision"]


def strip_code(text):
    return BACKTICK_RE.sub("`x`", text)


def is_sentinel_scalar(v):
    return bool(re.fullmatch(r"n/a: \S.*", v))


def is_sentinel_line(v):
    return v.strip() == "none" or is_sentinel_scalar(v.strip())


def parse_table(rows):
    """rows: list of (lineno, line). Returns (header_cells, data_rows[(lineno, cells)], sentinel_line or None, errors)."""
    header, data, sentinel, errs = None, [], None, []
    for n, l in rows:
        s = l.strip()
        if not s:
            continue
        if s.startswith("|"):
            cells = [c.strip() for c in PIPE_SPLIT_RE.split(s.strip("|"))]
            if all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
                continue
            if header is None:
                header = cells
            else:
                if len(cells) != len(header):
                    errs.append((n, f"row has {len(cells)} cells, header has {len(header)}"))
                data.append((n, cells))
        elif is_sentinel_line(s):
            sentinel = (n, s)
    return header, data, sentinel, errs


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spec", help="path to the change delta")
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0
    path = args.spec
    try:
        raw = open(path, encoding="utf-8").read()
    except (OSError, UnicodeDecodeError) as e:
        print(f"error: cannot read {path}: {e}")
        return 2
    lines = raw.replace("\r\n", "\n").split("\n")
    errors, warnings, review = [], [], []

    def err(n, msg):
        errors.append(f"{path}:{n}: {msg}")

    def warn(n, msg):
        warnings.append(f"{path}:{n}: {msg}")

    # ---- first pass: fence state, sections, REQ blocks -----------------------
    in_fence = None
    fenced = [False] * (len(lines) + 1)
    sections = {}          # name -> list[(n, line, fenced)]
    section_line = {}
    cur_section = None
    reqs = {}              # id -> {line, section, body:[(n,line,fenced)]}
    cur_req = None
    for i, line in enumerate(lines, 1):
        m = FENCE_RE.match(line)
        if m:
            tok = m.group(1)[0]
            if in_fence is None:
                in_fence = tok
            elif in_fence == tok:
                in_fence = None
            fenced[i] = True
            if cur_section:
                sections[cur_section].append((i, line, True))
            if cur_req:
                reqs[cur_req]["body"].append((i, line, True))
            continue
        fenced[i] = in_fence is not None
        if not fenced[i]:
            sm = SECTION_RE.match(line)
            if sm:
                name = sm.group(1)
                if name in sections:
                    err(i, f"duplicate section '## {name}' (first at line {section_line[name]})")
                    name = f"{name}#dup{i}"
                sections[name] = []
                section_line[name] = i
                cur_section = name
                cur_req = None
                continue
            if line.startswith("### REQ-"):
                hm = REQ_HEADING_RE.match(line)
                if not hm:
                    err(i, f"malformed REQ heading (expected '### REQ-<seg>(-<seg>)*: <title>'): {line[:80]}")
                    cur_req = None
                    continue
                rid = hm.group(1)
                if rid in reqs:
                    err(i, f"duplicate heading {rid} (first at line {reqs[rid]['line']})")
                    cur_req = None
                    continue
                reqs[rid] = {"line": i, "section": cur_section, "body": []}
                cur_req = rid
                continue
        if cur_section:
            sections[cur_section].append((i, line, fenced[i]))
        if cur_req:
            reqs[cur_req]["body"].append((i, line, fenced[i]))
    if in_fence is not None:
        err(len(lines), "unclosed code fence")

    for s in REQUIRED_SECTIONS:
        if s not in sections:
            err(1, f"missing section '## {s}'")
    if not reqs:
        err(1, "no '### REQ-' headings found")
    for rid, r in reqs.items():
        if r["section"] not in SLOTS_BY_SECTION:
            err(r["line"], f"{rid} sits under '{r['section']}', expected ADDED, MODIFIED, or REMOVED")

    # ---- header ---------------------------------------------------------------
    hdr_end = section_line.get("Summary", min(len(lines), 40))
    header_lines = lines[: hdr_end - 1]
    header = {}
    for n, l in enumerate(header_lines, 1):
        m = re.match(r"^([A-Za-z][A-Za-z /,()-]*):(.*)$", l)
        if m:
            header[m.group(1).strip()] = (n, m.group(2).strip())
    for f in HEADER_FIELDS:
        if f not in header:
            err(1, f"header field '{f}:' missing before '## Summary'")
        elif not header[f][1]:
            err(header[f][0], f"header field '{f}:' is empty")
    standards_text = header.get("Standards cited", (0, ""))[1]

    # ---- placeholders (outside fences and backticks) --------------------------
    for i, line in enumerate(lines, 1):
        if fenced[i]:
            continue
        clean = strip_code(line)
        if PLACEHOLDER_RE.search(clean):
            err(i, f"unresolved placeholder: {clean.strip()[:90]}")

    # ---- per-REQ fields --------------------------------------------------------
    deps = {}
    for rid, r in reqs.items():
        fields = {}            # label -> (n, value, nested_count)
        last = None
        for n, l, f in r["body"]:
            if f:
                if last:
                    fields[last][2] += 1
                continue
            fm = FIELD_RE.match(l)
            if fm:
                label, value = fm.group(1).strip(), fm.group(2).strip()
                if label in fields:
                    err(n, f"{rid} duplicate field '{label}:'")
                fields[label] = [n, value, 0]
                last = label
            elif l.strip() and last and (l.startswith("  ") or l.startswith("\t")):
                fields[last][2] += 1
        required = SLOTS_BY_SECTION.get(r["section"], SLOTS_COMMON)
        for slot in required:
            if slot not in fields:
                err(r["line"], f"{rid} missing slot '- {slot}:'")
                continue
            n, v, nested = fields[slot]
            if slot == "Acceptance scenarios":
                if nested == 0:
                    err(n, f"{rid} Acceptance scenarios has no nested Given/When/Then")
            elif slot in LIST_FIELDS:
                pass
            else:
                if not v and nested == 0:
                    err(n, f"{rid} slot '{slot}:' is empty")
                elif v == "none":
                    err(n, f"{rid} slot '{slot}:' uses 'none'; scalar slots take a value or 'n/a: <reason>'")
                elif re.fullmatch(r"n/a\.?", v, re.I):
                    err(n, f"{rid} slot '{slot}:' bare n/a; write 'n/a: <reason>'")
        # Depends on
        if "Depends on" in fields:
            n, v, _ = fields["Depends on"]
            if v == "none":
                deps[rid] = set()
            else:
                ids = REQ_RE.findall(v)
                leftover = REQ_RE.sub("", v).replace(",", "").strip()
                if not ids or leftover:
                    err(n, f"{rid} Depends on must be 'none' or REQ ids only, got '{v}'")
                if len(ids) != len(set(ids)):
                    err(n, f"{rid} Depends on lists an id twice")
                deps[rid] = set(ids)
        else:
            deps[rid] = set()
        # Then present
        if not any((not f) and re.match(r"^\s*Then:\s*\S", l) for n, l, f in r["body"]):
            err(r["line"], f"{rid} has no non-empty 'Then:' line")
        # prose lint on unfenced text
        for n, l, f in r["body"]:
            if f:
                continue
            clean = strip_code(l)
            for m in WEASEL_RE.finditer(clean):
                err(n, f"{rid} weasel word '{m.group(0)}' (unquoted)")
            if RFC_TERM_RE.search(clean) and "2119" not in standards_text:
                err(n, f"{rid} uses an RFC 2119 keyword but 'Standards cited:' lacks RFC 2119")
            if LATER_RE.search(clean):
                warn(n, f"{rid} sequencing clause; failure if it changes the final target: {clean.strip()[:80]}")
        # numeric tokens (fenced code included: constants in commands are claims)
        for n, l, f in r["body"]:
            t = URL_RE.sub(" ", l)
            t = FILELINE_RE.sub(" ", t)
            t = DATE_RE.sub(" ", t)
            t = RFC_RE.sub(" ", t)
            t = REQ_RE.sub(" ", t)
            t = DID_RE.sub(" ", t)
            nums = [m.group(0).strip() for m in NUM_RE.finditer(t)]
            if nums:
                review.append(f"{path}:{n}: {rid} numeric {nums}: {l.strip()[:100]}")

    # ---- REQ token resolution ---------------------------------------------------
    known = set(reqs) | {"REQ-00"}
    for i, line in enumerate(lines, 1):
        if fenced[i] and not (cur_section == "Dependency DAG"):
            pass
        for tok in REQ_RE.findall(strip_code(line) if not fenced[i] else line):
            if tok not in known and not line.startswith("### REQ-"):
                err(i, f"unknown requirement id {tok}")

    # ---- required sections non-empty ------------------------------------------
    for s in REQUIRED_SECTIONS:
        if s not in sections or s in ("ADDED", "MODIFIED", "REMOVED"):
            continue
        content = [(n, l) for n, l, f in sections[s] if l.strip()]
        if s in TABLE_SECTIONS:
            header_cells, data, sentinel, terrs = parse_table([(n, l) for n, l, f in sections[s] if not f])
            for n, e in terrs:
                err(n, f"{s}: {e}")
            if not data and not sentinel:
                err(section_line[s], f"section '## {s}' has no data row and no 'none' / 'n/a: <reason>' line")
        else:
            body = [l for n, l in content if not l.startswith("|")]
            if not body:
                err(section_line[s], f"section '## {s}' is empty")
    for s in ("ADDED", "MODIFIED", "REMOVED"):
        if s in sections and not any(r["section"] == s for r in reqs.values()):
            if not any(is_sentinel_line(l) for n, l, f in sections[s] if not f):
                err(section_line[s], f"section '## {s}' has no REQ and no 'none' line")

    # ---- DAG --------------------------------------------------------------------
    field_edges = {(d, r) for r, ds in deps.items() for d in ds}
    dag_edges, derived, derived_line = set(), None, None
    if "Dependency DAG" in sections:
        for n, l, f in sections["Dependency DAG"]:
            m = re.match(rf"^\s*({REQ})\s*->\s*({REQ})\s*$", l)
            if m:
                e = (m.group(1), m.group(2))
                if e in dag_edges:
                    err(n, f"duplicate DAG edge {e[0]} -> {e[1]}")
                dag_edges.add(e)
            if not f and l.startswith("Derived order:"):
                derived_line = n
                val = l.split(":", 1)[1].strip()
                if not re.fullmatch(rf"{REQ}(?:\s*,\s*{REQ})*", val) and not re.fullmatch(rf"{REQ}(?:\s+{REQ})*", val):
                    err(n, "Derived order must contain only REQ ids separated by commas or spaces; put prose on another line")
                derived = REQ_RE.findall(val)
        dl = section_line["Dependency DAG"]
        for e in sorted(field_edges - dag_edges):
            err(dl, f"edge {e[0]} -> {e[1]} in Depends on fields but not in DAG section")
        for e in sorted(dag_edges - field_edges):
            err(dl, f"edge {e[0]} -> {e[1]} in DAG section but not in any Depends on field")
        indeg = {r: 0 for r in reqs}
        adj = defaultdict(set)
        for d, r in field_edges:
            if d in indeg and r in indeg:
                adj[d].add(r)
                indeg[r] += 1
        ready = sorted(r for r, k in indeg.items() if k == 0)
        seen = 0
        while ready:
            x = ready.pop(0)
            seen += 1
            for y in sorted(adj[x]):
                indeg[y] -= 1
                if indeg[y] == 0:
                    ready.append(y)
        if seen != len(reqs):
            err(dl, "dependency graph has a cycle")
        if derived is None:
            err(dl, "'Derived order:' line missing")
        else:
            if len(derived) != len(set(derived)):
                err(derived_line, f"Derived order repeats an id: {derived}")
            if set(derived) != set(reqs):
                err(derived_line, f"Derived order must list every REQ exactly once; missing {sorted(set(reqs)-set(derived))}, extra {sorted(set(derived)-set(reqs))}")
            pos = {r: i for i, r in enumerate(derived)}
            for d, r in field_edges:
                if d in pos and r in pos and pos[d] > pos[r]:
                    err(derived_line, f"Derived order places {r} before its dependency {d}")

    # ---- Open Decisions / Assumptions -----------------------------------------
    dids = set()
    if "Open Decisions" in sections:
        h, data, sentinel, _ = parse_table([(n, l) for n, l, f in sections["Open Decisions"] if not f])
        if h and h[0] != "ID":
            err(section_line["Open Decisions"], f"Open Decisions first column must be 'ID', got '{h[0]}'")
        for n, cells in data:
            if not re.fullmatch(r"D-\d+", cells[0]):
                err(n, f"Open Decisions id must be D-<n>, got '{cells[0]}'")
            elif cells[0] in dids:
                err(n, f"duplicate decision id {cells[0]}")
            else:
                dids.add(cells[0])
            if any(not c for c in cells):
                err(n, f"Open Decisions row {cells[0]} has an empty cell")
    if "Assumptions" in sections:
        h, data, sentinel, _ = parse_table([(n, l) for n, l, f in sections["Assumptions"] if not f])
        for n, cells in data:
            if len(cells) < 3:
                err(n, "Assumptions row needs Assumption | Class | Disposition")
                continue
            text, cls, disp = cells[0], cells[1], cells[2]
            if not text or not disp:
                err(n, "Assumptions row has an empty cell")
            if cls not in ("Verified", "Verification step", "Decision"):
                err(n, f"Assumption class '{cls}' invalid")
            elif cls == "Decision":
                ids = DID_RE.findall(disp)
                if not ids or any(d not in dids for d in ids):
                    err(n, f"Decision assumption must point to an existing Open Decisions id, got '{disp}'")
            elif cls == "Verified" and not REQ_RE.search(disp):
                err(n, "Verified assumption must point to the REQ holding the citation")
            elif cls == "Verification step" and not re.search(r"Test Strategy|Baseline", disp):
                err(n, "Verification-step assumption must point to a Test Strategy or Baseline row")

    # ---- Test Strategy: exact first-column ids ---------------------------------
    if "Test Strategy" in sections:
        h, data, sentinel, _ = parse_table([(n, l) for n, l, f in sections["Test Strategy"] if not f])
        ts_ids = []
        for n, cells in data:
            if not REQ_RE.fullmatch(cells[0]):
                err(n, f"Test Strategy first column must be one REQ id, got '{cells[0]}'")
            else:
                ts_ids.append(cells[0])
            if any(not c for c in cells):
                err(n, f"Test Strategy row {cells[0]} has an empty cell")
        dupes = {x for x in ts_ids if ts_ids.count(x) > 1}
        for d in sorted(dupes):
            err(section_line["Test Strategy"], f"Test Strategy has multiple rows for {d}")
        deferred_ids = set()
        if "DEFERRED" in sections:
            _, drows, _, _ = parse_table([(n, l) for n, l, f in sections["DEFERRED"] if not f])
            for n, cells in drows:
                deferred_ids |= set(REQ_RE.findall(" ".join(cells)))
        for rid in reqs:
            if rid not in ts_ids and rid not in deferred_ids:
                err(section_line["Test Strategy"], f"Test Strategy has no row for {rid}")

    # ---- Validation Report ------------------------------------------------------
    declared_errors = None
    if "Validation Report" in sections:
        vr = [(n, l) for n, l, f in sections["Validation Report"] if not f]
        vl = section_line["Validation Report"]
        vr_text = "\n".join(l for n, l in vr)
        for label in LABELS:
            m = re.search(rf"^[ \t]*-[ \t]*{re.escape(label)}:[ \t]*(.*)$", vr_text, re.M)
            if not m:
                err(vl, f"gate label '{label}' missing")
                continue
            res = m.group(1).strip()
            if res.startswith("n/a"):
                err(vl, f"gate '{label}' is n/a; all thirteen checks apply to a change delta")
            elif not RESULT_RE.match(res):
                err(vl, f"gate '{label}' result '{res}' not in grammar 'pass (<detail>)' | 'N fixed (<detail>)' with non-empty detail")
        m = re.search(r"^- Errors:[ \t]*(.*)$", vr_text, re.M)
        if not m:
            err(vl, "'- Errors:' line missing")
        elif not re.fullmatch(r"\d+", m.group(1).strip()):
            err(vl, f"'- Errors:' must be an integer, got '{m.group(1).strip()}'")
        else:
            declared_errors = int(m.group(1))
        for fld in ("Warnings", "Info"):
            fm = re.search(rf"^- {fld}:[ \t]*(.*)$", vr_text, re.M)
            nested = re.search(rf"^- {fld}:[ \t]*\n([ \t]+- .+)", vr_text, re.M)
            if not fm:
                err(vl, f"'- {fld}:' line missing")
            elif not fm.group(1).strip() and not nested:
                err(vl, f"'- {fld}:' is empty; write 'none' or list items")
    if declared_errors is not None and declared_errors > 0:
        err(section_line.get("Validation Report", 1), f"document declares Errors: {declared_errors}; not shippable until 0")

    # ---- output -------------------------------------------------------------------
    for title, items in (("ERRORS", errors), ("WARNINGS", warnings), ("REVIEW", review)):
        print(f"== {title} ({len(items)})")
        for it in items:
            print("  " + it)
    print(f"SUMMARY errors={len(errors)} warnings={len(warnings)} review={len(review)} declared_errors={declared_errors}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
