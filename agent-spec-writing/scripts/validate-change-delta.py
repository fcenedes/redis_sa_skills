#!/usr/bin/env python3
"""Structural validator for agent-spec-writing change deltas.

Usage: validate-change-delta.py <spec.md> [--template-check]

Exit 0 when no errors. Exit 1 when any error. Exit 2 on usage error.
Mechanical checks only; semantic checks stay in spec-quality-gate.md as
reviewer attestations. Output sections: ERRORS, WARNINGS, REVIEW (numeric
tokens and other items a human must classify).
"""
import re
import sys
from collections import defaultdict

REQ = r"REQ-[0-9A-Za-z]+(?:-[0-9A-Za-z]+)*"
REQ_RE = re.compile(rf"\b({REQ})\b")
HEADING_RE = re.compile(rf"^### ({REQ}):")
SECTION_RE = re.compile(r"^## (.+?)\s*$")
BACKTICK_RE = re.compile(r"`[^`]*`")
URL_RE = re.compile(r"https?://\S+")
FILELINE_RE = re.compile(r"[\w./-]+\.\w+:\d+(?:-\d+)?")
DATE_RE = re.compile(r"\b\d{4}-\d{2}-\d{2}\b")
RFC_RE = re.compile(r"\bRFC ?\d+\b")
DID_RE = re.compile(r"\bD-\d+\b")
NUM_RE = re.compile(r"(?<![\w.])-?\d*\.?\d+(?![\w])")
PLACEHOLDER_RE = re.compile(r"<[A-Za-z][^<>]* [^<>]*>|<[a-z]+>|REQ-<")
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
LABELS = [
    "1 numbers", "2 weasel", "3 units", "4 primitives", "5 interactions",
    "6 consistency", "7 decisions", "8 later-clauses", "9 interoperability",
    "10 dag", "11 slots", "12 assumptions", "13 sections",
]
RESULT_RE = re.compile(r"^(pass|\d+ fixed)( \(.*\))?$|^n/a: .+$")
SLOTS_COMMON = [
    "Depends on:", "Baseline row:", "Evidence checked:",
    "Impacted files/components:", "Contract shape:", "Acceptance scenarios:",
    "Constraints:", "Failure mode:", "Rollback:", "Observability:",
    "Compatibility impact:", "Verification:", "Handoff task, if any:",
]
SLOTS_BY_SECTION = {
    "ADDED": SLOTS_COMMON + ["Source:", "Rationale:"],
    "MODIFIED": SLOTS_COMMON + ["Source:", "Previous behavior:", "New behavior:", "Why:", "Migration:", "Supersedes:"],
    "REMOVED": SLOTS_COMMON + ["Source:", "Removed behavior:", "Why:"],
}
REQUIRED_SECTIONS = [
    "Summary", "Baseline (REQ-00)", "ADDED", "MODIFIED", "REMOVED", "SUPERSEDED",
    "DEFERRED", "Dependency DAG", "Cross-REQ Interactions", "Non-Goals",
    "Assumptions", "Open Decisions", "Test Strategy", "Security",
    "Consumer Rollback", "Validation Report", "Execution Handoff",
    "Revision History",
]


def strip_code(text):
    return BACKTICK_RE.sub("`x`", text)


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    path = argv[1]
    template_check = "--template-check" in argv
    lines = open(path, encoding="utf-8").read().splitlines()
    errors, warnings, review = [], [], []

    def err(n, msg):
        errors.append(f"{path}:{n}: {msg}")

    def warn(n, msg):
        warnings.append(f"{path}:{n}: {msg}")

    # --- sections and REQ blocks -------------------------------------------
    sections = {}
    cur_section = None
    section_start = {}
    for i, line in enumerate(lines, 1):
        m = SECTION_RE.match(line)
        if m:
            cur_section = m.group(1)
            sections[cur_section] = []
            section_start[cur_section] = i
        elif cur_section:
            sections[cur_section].append((i, line))
    for s in REQUIRED_SECTIONS:
        if s not in sections:
            err(1, f"missing section '## {s}'")

    reqs = {}          # id -> dict(line, section, body=[(n,line)])
    order_in_doc = []
    cur = None
    cur_section = None
    for i, line in enumerate(lines, 1):
        m = SECTION_RE.match(line)
        if m:
            cur_section = m.group(1)
            cur = None
            continue
        h = HEADING_RE.match(line)
        if h:
            rid = h.group(1)
            if rid in reqs:
                err(i, f"duplicate heading {rid} (first at line {reqs[rid]['line']})")
                cur = None
                continue
            reqs[rid] = {"line": i, "section": cur_section, "body": []}
            order_in_doc.append(rid)
            cur = rid
            continue
        if line.startswith("### ") or line.startswith("## "):
            cur = None
            continue
        if cur:
            reqs[cur]["body"].append((i, line))
    if not reqs:
        err(1, "no '### REQ-' headings found")
    for rid, r in reqs.items():
        if r["section"] not in SLOTS_BY_SECTION:
            err(r["line"], f"{rid} sits under '{r['section']}', expected ADDED, MODIFIED, or REMOVED")

    # --- header fields ------------------------------------------------------
    header = "\n".join(lines[: section_start.get("Summary", 40)])
    for field in ("Revision:", "Units used in this document:", "Standards cited:", "Author:", "Date:"):
        if field not in header:
            err(1, f"header field '{field}' missing before '## Summary'")
    standards = re.search(r"^Standards cited:(.*)$", header, re.M)
    standards_text = standards.group(1) if standards else ""

    # --- placeholders -------------------------------------------------------
    for i, line in enumerate(lines, 1):
        clean = strip_code(line)
        if PLACEHOLDER_RE.search(clean):
            err(i, f"unresolved placeholder: {clean.strip()[:90]}")

    # --- per-REQ slots and Depends on ---------------------------------------
    deps = {}
    for rid, r in reqs.items():
        body_text = [l for _, l in r["body"]]
        joined = "\n".join(body_text)
        required = SLOTS_BY_SECTION.get(r["section"], SLOTS_COMMON)
        for slot in required:
            if not any(l.strip().startswith(f"- {slot}") for l in body_text):
                err(r["line"], f"{rid} missing slot '- {slot}'")
        dep_lines = [(n, l) for n, l in r["body"] if l.strip().startswith("- Depends on:")]
        if len(dep_lines) != 1:
            err(r["line"], f"{rid} has {len(dep_lines)} 'Depends on:' fields, expected exactly 1")
            deps[rid] = set()
        else:
            n, l = dep_lines[0]
            val = l.split(":", 1)[1].strip()
            if val == "none":
                deps[rid] = set()
            else:
                ids = set(REQ_RE.findall(val))
                leftover = REQ_RE.sub("", val).replace(",", "").strip()
                if not ids or leftover:
                    err(n, f"{rid} Depends on must be 'none' or REQ ids only, got '{val}'")
                deps[rid] = ids
        if not any(re.match(r"^\s*Then:", l) for l in body_text):
            err(r["line"], f"{rid} has no 'Then:' line")
        for n, l in r["body"]:
            if re.match(r"^\s*-\s*Handoff task, if any:", l):
                val = l.split(":", 1)[1].strip()
                if len(val) > 120 or re.search(r"\b(owner|model|step 1|steps:)\b", val, re.I):
                    err(n, f"{rid} Handoff task must be a title only")
        # weasel (unquoted, lowercase)
        for n, l in r["body"]:
            clean = strip_code(l)
            for m in WEASEL_RE.finditer(clean):
                err(n, f"{rid} weasel word '{m.group(0)}' (unquoted)")
            if RFC_TERM_RE.search(clean) and "2119" not in standards_text:
                err(n, f"{rid} uses an RFC 2119 keyword but 'Standards cited:' lacks RFC 2119")
            if LATER_RE.search(clean):
                warn(n, f"{rid} sequencing clause; failure if it changes the final target: {clean.strip()[:80]}")
        # numeric tokens for human classification
        for n, l in r["body"]:
            t = URL_RE.sub(" ", l)
            t = FILELINE_RE.sub(" ", t)
            t = DATE_RE.sub(" ", t)
            t = RFC_RE.sub(" ", t)
            t = REQ_RE.sub(" ", t)
            t = DID_RE.sub(" ", t)
            nums = [m.group(0) for m in NUM_RE.finditer(t)]
            if nums:
                review.append(f"{path}:{n}: {rid} numeric {nums}: {l.strip()[:100]}")

    # --- REQ token resolution ------------------------------------------------
    known = set(reqs) | {"REQ-00"}
    for i, line in enumerate(lines, 1):
        for tok in REQ_RE.findall(line):
            if tok not in known and not HEADING_RE.match(line):
                err(i, f"unknown requirement id {tok}")

    # --- DAG ----------------------------------------------------------------
    field_edges = {(d, r) for r, ds in deps.items() for d in ds}
    dag_edges = set()
    derived = []
    for n, l in sections.get("Dependency DAG", []):
        m = re.match(rf"^\s*({REQ})\s*->\s*({REQ})\s*$", l)
        if m:
            dag_edges.add((m.group(1), m.group(2)))
        if l.startswith("Derived order:"):
            derived = REQ_RE.findall(l)
    if "Dependency DAG" in sections:
        for e in sorted(field_edges - dag_edges):
            err(section_start["Dependency DAG"], f"edge {e[0]} -> {e[1]} in Depends on fields but not in DAG section")
        for e in sorted(dag_edges - field_edges):
            err(section_start["Dependency DAG"], f"edge {e[0]} -> {e[1]} in DAG section but not in any Depends on field")
        # cycle check + topological validity (Kahn)
        indeg = {r: 0 for r in reqs}
        adj = defaultdict(set)
        for d, r in field_edges:
            if d in indeg and r in indeg:
                adj[d].add(r)
                indeg[r] += 1
        ready = sorted(r for r, k in indeg.items() if k == 0)
        seen = 0
        indeg2 = dict(indeg)
        while ready:
            x = ready.pop(0)
            seen += 1
            for y in sorted(adj[x]):
                indeg2[y] -= 1
                if indeg2[y] == 0:
                    ready.append(y)
        if seen != len(reqs):
            err(section_start["Dependency DAG"], "dependency graph has a cycle")
        if set(derived) != set(reqs):
            err(section_start["Dependency DAG"], f"Derived order must list every REQ exactly once; got {derived}")
        else:
            pos = {r: i for i, r in enumerate(derived)}
            for d, r in field_edges:
                if d in pos and r in pos and pos[d] > pos[r]:
                    err(section_start["Dependency DAG"], f"Derived order places {r} before its dependency {d}")

    # --- Open Decisions ids and Assumptions dispositions ---------------------
    dids = set()
    for n, l in sections.get("Open Decisions", []):
        if l.startswith("|") and not l.startswith("|--") and "| ID |" not in l:
            cells = [c.strip() for c in l.strip("|").split("|")]
            if cells and cells[0] and cells[0] != "ID":
                if not re.fullmatch(r"D-\d+", cells[0]):
                    err(n, f"Open Decisions first column must be an id D-<n>, got '{cells[0]}'")
                elif cells[0] in dids:
                    err(n, f"duplicate decision id {cells[0]}")
                else:
                    dids.add(cells[0])
    for n, l in sections.get("Assumptions", []):
        if l.startswith("|") and not l.startswith("|--") and "| Class |" not in l:
            cells = [c.strip() for c in l.strip("|").split("|")]
            if len(cells) >= 3 and cells[0] not in ("Assumption", "none"):
                cls, disp = cells[1], cells[2]
                if cls not in ("Verified", "Verification step", "Decision"):
                    err(n, f"Assumption class '{cls}' invalid")
                if cls == "Decision":
                    ids = DID_RE.findall(disp)
                    if not ids or any(d not in dids for d in ids):
                        err(n, f"Decision assumption must point to an existing Open Decisions id, got '{disp}'")
                if cls == "Verified" and not REQ_RE.search(disp):
                    err(n, "Verified assumption must point to the REQ holding the citation")
                if cls == "Verification step" and not re.search(r"Test Strategy|Baseline", disp):
                    err(n, "Verification-step assumption must point to a Test Strategy or Baseline row")

    # --- Test Strategy row per non-deferred REQ -------------------------------
    ts_text = "\n".join(l for _, l in sections.get("Test Strategy", []))
    deferred_text = "\n".join(l for _, l in sections.get("DEFERRED", []))
    for rid in reqs:
        if rid not in ts_text and rid not in deferred_text:
            err(section_start.get("Test Strategy", 1), f"Test Strategy has no row for {rid}")

    # --- Validation Report ----------------------------------------------------
    vr = sections.get("Validation Report", [])
    vr_text = "\n".join(l for _, l in vr)
    for label in LABELS:
        m = re.search(rf"^\s*-\s*{re.escape(label)}:\s*(.*)$", vr_text, re.M)
        if not m:
            err(section_start.get("Validation Report", 1), f"gate label '{label}' missing")
        elif not RESULT_RE.match(m.group(1).strip()):
            err(section_start.get("Validation Report", 1), f"gate '{label}' result '{m.group(1).strip()}' not in grammar pass (detail) | N fixed (detail) | n/a: family")
    m = re.search(r"^- Errors:\s*(\S+)", vr_text, re.M)
    if not m:
        err(section_start.get("Validation Report", 1), "'- Errors:' line missing")
    elif not re.fullmatch(r"\d+", m.group(1)):
        err(section_start.get("Validation Report", 1), f"'- Errors:' must be an integer, got '{m.group(1)}'")
    rows = [l for _, l in sections.get("Revision History", []) if l.startswith("|") and not l.startswith("|--") and "Revision |" not in l]
    if not rows:
        err(section_start.get("Revision History", 1), "Revision History has no row")

    # --- output -------------------------------------------------------------
    if template_check:
        # Running against the unfilled template: placeholders are expected.
        errors = [e for e in errors if "unresolved placeholder" not in e]
    for title, items in (("ERRORS", errors), ("WARNINGS", warnings), ("REVIEW", review)):
        print(f"== {title} ({len(items)})")
        for it in items:
            print("  " + it)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
