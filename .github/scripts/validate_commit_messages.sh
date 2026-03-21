#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <base-ref> <head-ref>"
}

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi

base_ref="$1"
head_ref="$2"

if ! git rev-parse --verify "$base_ref" >/dev/null 2>&1; then
  echo "Base ref not found: $base_ref"
  exit 1
fi

if ! git rev-parse --verify "$head_ref" >/dev/null 2>&1; then
  echo "Head ref not found: $head_ref"
  exit 1
fi

pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?(!)?: .+'
release_pattern='^chore\(release\): bump version to [0-9]+\.[0-9]+\.[0-9]+( \[skip ci\])?$'
merge_pattern='^(Merge( branch| pull request)|Revert ")'

failures=0

while IFS= read -r commit; do
  [ -z "$commit" ] && continue
  subject=$(git log --format=%s -n 1 "$commit")

  if [[ "$subject" =~ $merge_pattern ]]; then
    echo "Skipping merge/revert-style commit: $subject"
    continue
  fi

  if [[ "$subject" =~ $pattern ]] || [[ "$subject" =~ $release_pattern ]]; then
    echo "✔ $commit $subject"
    continue
  fi

  echo "✖ $commit $subject"
  failures=$((failures + 1))
done < <(git rev-list --no-merges "${base_ref}..${head_ref}")

if [ "$failures" -gt 0 ]; then
  cat <<'EOM'

Commit message validation failed.
All contributor-authored commits, including Copilot and Codex commits, must follow Conventional Commits:
  type: description
  type(scope): description

Examples:
  feat(ui): add compatibility banner
  fix(parser): handle NaN browser versions
  chore(release): bump version to 26.0.25 [skip ci]
EOM
  exit 1
fi

echo "All checked commit messages follow Conventional Commits."
