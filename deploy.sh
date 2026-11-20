#!/usr/bin/env bash
set -e

echo "=== 1. Navigating to portfolio directory ==="
cd "/home/thamizh/portfolio"

echo "=== 2. Initializing Git Repository ==="
if [ ! -d ".git" ]; then
  git init -b main
fi

git config user.name "tamilarasanhq"
git config user.email "tamilarasanhq@gmail.com"

echo "=== 3. Staging and Committing Files ==="
git add -A
git commit -m "feat: complete identity-driven editorial portfolio with BRIDGE engine & DevJournal" || echo "Already committed"

echo "=== 4. Creating GitHub Remote (if not present) ==="
if ! git remote | grep -q "origin"; then
  # Try using GitHub CLI if authenticated
  if command -v gh &> /dev/null && gh auth status &> /dev/null; then
    echo "Creating remote repository via gh CLI..."
    gh repo create tamilarasan-portfolio --public --source=. --remote=origin --push || true
  else
    echo "gh CLI not ready; creating via default remote origin..."
    git remote add origin https://github.com/TamilarasanHQ/tamilarasan-portfolio.git || true
  fi
fi

echo "=== 5. Pushing to GitHub (main) ==="
git push -u origin main || true

echo "=== 6. Deploying to Vercel ==="
if command -v vercel &> /dev/null; then
  echo "Deploying production build via Vercel CLI..."
  vercel --prod --yes
elif command -v npx &> /dev/null; then
  echo "Deploying via npx vercel..."
  npx vercel --prod --yes
else
  echo "Vercel CLI not found. Install with: npm i -g vercel"
fi

echo "=== Deployment Completed! ==="
