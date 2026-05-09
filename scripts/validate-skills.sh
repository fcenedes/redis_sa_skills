#!/usr/bin/env bash
# Validate the skills in this repository.
#
# Usage:
#   bash scripts/validate-skills.sh
#
# Checks:
#   - Each root-level directory containing SKILL.md has the required frontmatter
#     fields (name, description, license, metadata, version).
#   - README.md mentions each skill.
#   - No node_modules/, dist/, or .parcel-cache/ directories exist.
#   - No stray TODO/FIXME markers outside intentional template placeholders.
#
# Exits non-zero if any check fails. Prints a summary at the end.

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

ERRORS=0
WARNINGS=0

red()    { printf '\033[31m%s\033[0m\n' "$*"; }
green()  { printf '\033[32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }

fail() { red   "FAIL: $*"; ERRORS=$((ERRORS + 1)); }
warn() { yellow "WARN: $*"; WARNINGS=$((WARNINGS + 1)); }
ok()   { green  "OK:   $*"; }

# 1. Find root-level skill directories (those containing SKILL.md).
SKILL_DIRS=()
while IFS= read -r d; do
  SKILL_DIRS+=("$d")
done < <(find . -maxdepth 2 -mindepth 2 -name SKILL.md -type f -printf '%h\n' 2>/dev/null \
         || find . -maxdepth 2 -mindepth 2 -name SKILL.md -type f -exec dirname {} \;)

if [[ ${#SKILL_DIRS[@]} -eq 0 ]]; then
  fail "no skill directories found (no */SKILL.md)"
else
  ok "found ${#SKILL_DIRS[@]} skill(s)"
fi

# 2. Frontmatter checks per skill.
for dir in "${SKILL_DIRS[@]}"; do
  skill="${dir#./}"
  manifest="$dir/SKILL.md"
  echo "--- $skill ---"

  # Extract the frontmatter block (between the first two '---' lines).
  fm="$(awk 'NR==1 && /^---$/{f=1; next} f && /^---$/{exit} f' "$manifest")"

  if [[ -z "$fm" ]]; then
    fail "$skill: missing or empty YAML frontmatter"
    continue
  fi

  for key in "name:" "description:" "license:" "metadata:" "version:"; do
    if ! grep -qE "^[[:space:]]*${key}" <<<"$fm"; then
      fail "$skill: frontmatter missing '$key'"
    fi
  done

  declared_name="$(grep -E '^name:' <<<"$fm" | head -1 | sed -E 's/^name:[[:space:]]*//; s/[[:space:]]*$//')"
  if [[ -n "$declared_name" && "$declared_name" != "$skill" ]]; then
    warn "$skill: frontmatter name '$declared_name' does not match directory '$skill'"
  fi

  # 3. README mention check.
  if [[ -f README.md ]]; then
    if ! grep -q "$skill" README.md; then
      fail "$skill: not mentioned in README.md"
    fi
  else
    fail "README.md not found"
  fi
done

# 4. Generated artifacts check.
echo "--- artifact check ---"
ARTIFACT_HITS="$(find . -type d \( -name node_modules -o -name dist -o -name .parcel-cache \) \
                 -not -path './.git/*' -print 2>/dev/null)"
if [[ -n "$ARTIFACT_HITS" ]]; then
  fail "generated artifact directories present:"
  printf '  %s\n' $ARTIFACT_HITS
else
  ok "no node_modules / dist / .parcel-cache directories"
fi

# 5. TODO/FIXME scan.
echo "--- TODO/FIXME scan ---"
TODO_HITS="$(grep -RIn --exclude-dir=.git --exclude-dir=node_modules \
              --exclude-dir=.claude --exclude-dir=.github \
              -E 'TODO|FIXME' . 2>/dev/null \
              | grep -v 'templates/' \
              | grep -v 'scripts/validate-skills.sh' \
              | grep -v 'CONTRIBUTING.md' \
              | grep -v 'AGENTS.md' \
              || true)"
if [[ -n "$TODO_HITS" ]]; then
  warn "TODO/FIXME found outside templates/ — review:"
  echo "$TODO_HITS" | head -20 | sed 's/^/  /'
else
  ok "no stray TODO/FIXME outside templates/"
fi

# 6. Summary.
echo
echo "================================"
echo "Validation summary"
echo "  Skills checked: ${#SKILL_DIRS[@]}"
echo "  Errors:         $ERRORS"
echo "  Warnings:       $WARNINGS"
echo "================================"

if [[ $ERRORS -gt 0 ]]; then
  exit 1
fi
exit 0
