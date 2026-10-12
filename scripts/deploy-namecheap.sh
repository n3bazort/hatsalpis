#!/usr/bin/env bash
set -euo pipefail
: "${DEPLOY_HOST:?Missing hosting server hostname}"
: "${DEPLOY_USER:?Missing cPanel username}"
: "${DEPLOY_PORT:?Missing SSH port}"
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ ]]
[[ "$DEPLOY_USER" =~ ^[a-zA-Z0-9_]+$ ]]
[[ "$DEPLOY_PORT" =~ ^[0-9]+$ ]]
test -s dist/index.html
test -d dist/assets
test -d dist/images
destination="${DEPLOY_USER}@${DEPLOY_HOST}:/home/${DEPLOY_USER}/public_html/"
export RSYNC_RSH="ssh -p ${DEPLOY_PORT} -o BatchMode=yes -o StrictHostKeyChecking=yes"
# Explicit allowlist: never upload WordPress, .htaccess, or arbitrary root files.
# No --delete: preserve store, hosting files, and older hashed assets for open tabs.
options=(-rt --perms --chmod=D755,F644 --delay-updates)
rsync "${options[@]}" \
  --include='/assets/***' --include='/images/***' --include='/licenses/***' \
  --include='/favicon.svg' --include='/creditos-fotograficos.html' \
  --include='/FUENTES-FOTOGRAFICAS.md' --exclude='*' dist/ "$destination"
# Switch HTML only after all referenced assets are uploaded successfully.
rsync "${options[@]}" dist/index.html "$destination"
