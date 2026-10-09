#!/bin/bash
#
# MAKE RELEASE
# ------------
# Builds dist/pipeline-os.zip: a clean copy of the kit for customers to download.
#
# Run it from the pipeline-os folder with:   bash maintainers/make-release.sh
#
# What it does:
#   1. Checks the files that ship are still blank templates, so nobody's real deals,
#      business notes or setup progress can go out by mistake. Stops if not.
#   2. Copies the kit into a temporary folder called "Pipeline OS", leaving out this
#      maintainers folder, git history, old builds, backups and computer clutter.
#   3. Checks the copy is complete and the data file is valid.
#   4. Zips it as dist/pipeline-os.zip, replacing any older one.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
STAGE="$(mktemp -d "${TMPDIR:-/tmp}/pipeline-os-build.XXXXXX")"
trap 'rm -rf "$STAGE"' EXIT
NAME="Pipeline OS"
OUT="$STAGE/$NAME"

fail() { echo "RELEASE STOPPED: $1" >&2; exit 1; }

# ---------- 1. Is everything that ships still a blank template? ----------
python3 - "$ROOT" <<'PYEOF' || fail "the files above contain real data. Restore them with: git checkout -- apps/pipeline/data context setup/progress.md CLAUDE.md"
import json, sys, pathlib, re
root = pathlib.Path(sys.argv[1])
problems = []
data = json.loads((root / "apps/pipeline/data/pipeline.json").read_text())
for key in ("deals", "people", "calls", "suggestions", "activity"):
    if data.get(key):
        problems.append("apps/pipeline/data/pipeline.json has " + key + " in it")
if (data.get("checkIn") or {}).get("lastRunAt"):
    problems.append("apps/pipeline/data/pipeline.json has a check-in in it")
settings = data.get("settings", {})
if any(settings.get(k) for k in ("yourName", "businessName")):
    problems.append("apps/pipeline/data/pipeline.json has a name in its settings")
if settings.get("salesSetUp"):
    problems.append("apps/pipeline/data/pipeline.json says sales are set up")
for f in sorted((root / "context").glob("*.md")):
    if f.name != "README.md" and "Status: not filled in yet" not in f.read_text():
        problems.append(f"{f.relative_to(root)} has been filled in")
if [f.name for f in (root / "skills-to-upload").iterdir() if f.name not in ("README.md", ".DS_Store")]:
    problems.append("skills-to-upload/ has someone's own skills in it")
if "(Claude fills this in during setup)" not in (root / "skills-to-upload/README.md").read_text():
    problems.append("skills-to-upload/README.md lists someone's own skills")
if "Setup status: not started" not in (root / "setup/progress.md").read_text():
    problems.append("setup/progress.md is not blank")
# The shipped permissions never include a tool that sends, deletes or posts (setup adds the one
# send tool the person agrees to, in their own settings.local.json)
perms = json.loads((root / ".claude/settings.json").read_text()).get("permissions", {}).get("allow", [])
if any(re.search(r"send|delete|trash|post|forward|reply", p, re.I) and p.startswith("mcp__") for p in perms):
    problems.append(".claude/settings.json pre-approves a tool that sends, deletes or posts")
if (data.get("settings") or {}).get("claudeSends"):
    problems.append("apps/pipeline/data/pipeline.json has Claude emails switched on")
if "Setup: not done yet" not in (root / "CLAUDE.md").read_text():
    problems.append("CLAUDE.md says setup is done")
for p in problems:
    print("  - " + p, file=sys.stderr)
sys.exit(1 if problems else 0)
PYEOF

# ---------- 2. Copy, leaving out what customers don't need ----------
mkdir -p "$OUT" "$DIST"
rsync -a \
  --exclude '.git' --exclude '.gitignore' --exclude 'dist' --exclude 'maintainers' \
  --exclude '.claude/launch.json' --exclude '.claude/settings.local.json' --exclude '.claude/.cc-writes' \
  --exclude '*.backup.json' --exclude 'apps/home/data' --exclude '.DS_Store' --exclude '._*' --exclude 'Thumbs.db' --exclude 'desktop.ini' \
  "$ROOT/" "$OUT/"
# Claude Code can leave empty .claude folders around the kit while it works; only the top one ships
find "$OUT" -mindepth 2 -type d -name .claude -empty -prune -exec rm -rf {} +

# ---------- 3. Checks ----------
for f in "START-HERE.md" "CLAUDE.md" "Open Pipeline.html" "apps/pipeline/index.html" "apps/pipeline/data/pipeline.json" "apps/pipeline/menu.json" "apps/pipeline/home-boxes.js" "apps/pipeline/claude-jobs.json" "apps/pipeline/CLAUDE.md" "apps/pipeline/ATTACH-CLAUDE.md" "apps/pipeline/app/app.js" "apps/pipeline/app/drawer.js" "apps/pipeline/app/confetti.js" "setup/progress.md" ".claude/skills/README.md" ".claude/settings.json" ".claude/skills/update-a-deal/SKILL.md" ".claude/skills/qualify-a-deal/SKILL.md" ".claude/skills/pipeline-check-in/SKILL.md" "setup/scripts/save-key.sh" "setup/scripts/start-task-list.sh" "apps/server/server.js" "apps/server/server.py" "setup/connections/README.md" "toolkit.json" "ATTACHING.md" "apps/installed.json" "apps/shared/catalogue.json" "apps/shared/VERSION" "apps/shared/sidebar.css" "apps/shared/js/sidebar.js" "apps/shared/js/theme.js" "apps/shared/js/braindump.js" ".claude/skills/sort-brain-dump/SKILL.md" "apps/shared/images/claude-icon.png" "apps/home/index.html" "apps/home/home.js" "apps/home/home.css" "apps/shared/fonts/Figtree-Variable.woff2" "context/sales.md" "setup/pipeline-01-your-customers.md" "setup/pipeline-02-first-run.md" "setup/pipeline-03-check-ins.md" "setup/06-build-your-skills.md" "setup/09-check-and-hand-over.md" "skills-to-upload/README.md"; do
  [ -e "$OUT/$f" ] || fail "missing $f"
done
for f in apps/pipeline/data/pipeline.json apps/pipeline/menu.json apps/pipeline/claude-jobs.json toolkit.json apps/installed.json apps/shared/catalogue.json; do
  python3 -c 'import json,sys; json.load(open(sys.argv[1]))' "$OUT/$f" || fail "$f is not valid"
done
# A fresh download lists only Pipeline OS, and no test tool ever ships
python3 -c 'import json,sys; t=json.load(open(sys.argv[1]))["tools"]; sys.exit(0 if [x["id"] for x in t]==["pipeline"] else 1)' "$OUT/apps/installed.json" || fail "apps/installed.json must list only Pipeline OS"
[ ! -e "$OUT/apps/test-tool" ] || fail "the test tool is in the release"
if grep -rIl $'—' "$OUT" >/dev/null 2>&1; then fail "an em dash slipped in: $(grep -rIl $'—' "$OUT" | head -3)"; fi
SKILLS=$(find "$OUT/.claude/skills" -name SKILL.md | wc -l | tr -d ' ')

# ---------- 4. Zip (COPYFILE_DISABLE stops macOS adding hidden ._ files) ----------
rm -f "$DIST/pipeline-os.zip"
(cd "$STAGE" && COPYFILE_DISABLE=1 zip -rqX "$DIST/pipeline-os.zip" "$NAME")
echo "Built dist/pipeline-os.zip ($(du -h "$DIST/pipeline-os.zip" | cut -f1 | tr -d ' '), $SKILLS skills)"
