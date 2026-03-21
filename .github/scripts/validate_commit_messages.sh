#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <base-ref> <head-ref>  (validates commits in range)"
  echo "       $0 <single-ref>           (validates single commit)"
}

if [ "$#" -eq 1 ]; then
  single_ref="$1"
  if ! git rev-parse --verify "$single_ref" >/dev/null 2>&1; then
    echo "Ref not found: $single_ref"
    exit 1
  fi
  commit_source() { echo "$single_ref"; }
elif [ "$#" -eq 2 ]; then
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
  commit_source() { git rev-list "${base_ref}..${head_ref}"; }
else
  usage
  exit 1
fi

pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?(!)?: .+'
release_pattern='^chore\(release\): bump version to [0-9]+\.[0-9]+\.[0-9]+ \[skip ci\]$'
merge_pattern='^Merge( branch| pull request)'

failures=0

while IFS= read -r commit; do
  [ -z "$commit" ] && continue
  subject=$(git log --format=%s -n 1 "$commit")

  if [[ "$subject" =~ $merge_pattern ]]; then
    echo "Skipping merge commit: $subject"
    continue
  fi

  if [[ "$subject" =~ ^chore\(release\): ]]; then
    if [[ "$subject" =~ $release_pattern ]]; then
      echo "✔ $commit $subject"
    else
      echo "✖ $commit $subject (release commits must be: 'chore(release): bump version to X.Y.Z [skip ci]')"
      failures=$((failures + 1))
    fi
    continue
  fi

  if [[ "$subject" =~ $pattern ]]; then
    echo "✔ $commit $subject"
    continue
  fi

  echo "✖ $commit $subject"
  failures=$((failures + 1))
done < <(commit_source)

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
