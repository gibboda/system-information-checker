#!/usr/bin/env bash
set -euo pipefail

# Bump the patch version in version.txt, commit and push the change.
# This script is safe to run in CI or locally. It will create a commit
# with message containing [skip ci] to avoid retriggering the workflow.

FILE="version.txt"
if [ ! -f "$FILE" ]; then
  echo "0.1.0" > "$FILE"
fi

ver=$(cat "$FILE" | tr -d '[:space:]')
if ! echo "$ver" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "Invalid version format in $FILE: $ver"
  exit 1
fi

IFS='.' read -r major minor patch <<< "$ver"
patch=$((patch + 1))
new="${major}.${minor}.${patch}"
echo "$new" > "$FILE"

git add "$FILE"
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
if git commit -m "Bump version to ${new} [skip ci]"; then
  git push
else
  echo "No changes to commit."
fi
