#!/usr/bin/env bash
# Prepare a deployment commit without changing the working tree or current index.
set -euo pipefail
project_root="$(git rev-parse --show-toplevel)"
test -f "$project_root/dist/index.html"
pages_tmp="$(mktemp -d)"
trap 'rm -rf "$pages_tmp"' EXIT
pages_parent=()
pages_remote="$(git ls-remote --heads origin refs/heads/gh-pages)"
if [[ -n "$pages_remote" ]]; then
  git fetch --no-tags origin refs/heads/gh-pages
  pages_parent=(-p "$(git rev-parse FETCH_HEAD)")
fi
GIT_INDEX_FILE="$pages_tmp/index" git --work-tree="$project_root/dist" add --all
pages_tree="$(GIT_INDEX_FILE="$pages_tmp/index" git write-tree)"
printf 'Publish Hats & Handicrafts website\n' | git commit-tree "$pages_tree" "${pages_parent[@]}"
