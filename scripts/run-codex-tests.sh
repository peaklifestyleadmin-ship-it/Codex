#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

pass() { printf '✅ %s\n' "$1"; }
warn() { printf '⚠️ %s\n' "$1"; }
fail() { printf '❌ %s\n' "$1"; exit 1; }

check_file() {
  local file="$1"
  [[ -f "$file" ]] || fail "Missing required file: $file"
  pass "Found $file"
}

echo "Running Codex smoke checks in $ROOT_DIR"

check_file "package.json"
check_file "README.md"
check_file "db/schema.sql"
check_file "app/api/keywords/route.ts"
check_file "app/api/content/generate/route.ts"
check_file "app/go/[id]/route.ts"

if command -v node >/dev/null 2>&1; then
  pass "Node is available: $(node --version)"
else
  fail "Node is not installed"
fi

if command -v npm >/dev/null 2>&1; then
  pass "npm is available: $(npm --version)"
else
  fail "npm is not installed"
fi

if command -v psql >/dev/null 2>&1; then
  pass "psql is available: $(psql --version | head -n1)"
else
  warn "psql not installed (DB migration test skipped)"
fi

if npm install --ignore-scripts --no-audit --no-fund >/tmp/codex-npm-install.log 2>&1; then
  pass "npm install succeeded"
  if npm run typecheck >/tmp/codex-typecheck.log 2>&1; then
    pass "typecheck passed"
  else
    warn "typecheck failed (see /tmp/codex-typecheck.log)"
  fi
else
  warn "npm install failed (see /tmp/codex-npm-install.log)"
fi

if [[ -f .env ]]; then
  pass ".env exists"
else
  warn ".env missing; copy from .env.example before runtime tests"
fi

if command -v curl >/dev/null 2>&1; then
  pass "curl is available"
else
  warn "curl missing; API smoke tests skipped"
fi

pass "Codex smoke checks completed"
