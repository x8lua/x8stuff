#!/usr/bin/env bash
set -euo pipefail

mkdir -p public

if [ -f app ]; then
  git mv app public/app.backup 2>/dev/null || mv app public/app.backup
fi

find . -maxdepth 1 -type f \( -name '*.html' -o -name '*.mp3' \) -print0 | while IFS= read -r -d '' file; do
  name="${file#./}"
  git mv "$file" "public/$name" 2>/dev/null || mv "$file" "public/$name"
done

for dir in CL PPT api application bday eclass ex logs pics sentinel sentinel2 shit; do
  if [ -e "$dir" ]; then
    git mv "$dir" "public/$dir" 2>/dev/null || mv "$dir" "public/$dir"
  fi
done

echo "Static files moved into public/. Review with: git status"
