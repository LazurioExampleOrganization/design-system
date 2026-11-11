#!/bin/sh
# Vendors the Impeccable design skill (https://github.com/pbakaus/impeccable,
# Apache-2.0) for Codex (.agents/) and Claude Code (.claude/), pinned to one
# tag, straight from the upstream repository: a sparse checkout of the tag, no
# installer and no package code runs. Run from the repository root:
#
#   sh app/v1/scripts/vendor-impeccable.sh            # the pinned tag below
#   sh app/v1/scripts/vendor-impeccable.sh 4.8.0      # an update; review the diff
#
# The skill's engine binary (scripts/bin/) is not part of the tag; its launcher
# downloads it on first use and checks its sha256. Hooks are not installed.
set -eu
version=${1:-4.7.0}
[ -d .git ] || [ -f .git ] || { echo "run from the repository root" >&2; exit 1; }
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
git clone -q --depth 1 --branch "skill-v$version" --filter=blob:none --sparse \
	https://github.com/pbakaus/impeccable.git "$tmp/upstream"
(
	cd "$tmp/upstream"
	git sparse-checkout set --no-cone "/.agents/skills/impeccable/" "/.claude/skills/impeccable/" \
		"/.claude/agents/" /LICENSE /NOTICE.md
)
commit=$(git -C "$tmp/upstream" rev-parse HEAD)
grep -q "version: $version" "$tmp/upstream/.agents/skills/impeccable/SKILL.md" ||
	{ echo "the tag does not hold skill version $version" >&2; exit 1; }

rm -rf .agents/skills/impeccable .claude/skills/impeccable .claude/agents/impeccable-*.md
mkdir -p .agents/skills .claude/skills .claude/agents
cp -R "$tmp/upstream/.agents/skills/impeccable" .agents/skills/
cp -R "$tmp/upstream/.claude/skills/impeccable" .claude/skills/
cp "$tmp"/upstream/.claude/agents/impeccable-*.md .claude/agents/
for dir in .agents/skills/impeccable .claude/skills/impeccable; do
	cp "$tmp/upstream/LICENSE" "$dir/LICENSE"
	cp "$tmp/upstream/NOTICE.md" "$dir/NOTICE.md"
	printf '{\n  "source": "https://github.com/pbakaus/impeccable",\n  "tag": "skill-v%s",\n  "commit": "%s",\n  "license": "Apache-2.0",\n  "vendored_by": "app/v1/scripts/vendor-impeccable.sh"\n}\n' \
		"$version" "$commit" > "$dir/VENDOR.json"
done
echo "Impeccable $version ($commit) vendored"
