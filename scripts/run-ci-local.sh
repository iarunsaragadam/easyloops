#!/bin/bash
# Script to run CI tasks locally in the same order as GitHub Actions

# Set -e to exit immediately if any command fails
set -e

# Set CI environment variable to true to simulate CI environment
export CI=true

echo "=== 🔍 Running lint checks ==="
npm run lint

echo "=== ⚙️ Running type checking ==="
npm run typecheck

echo "=== 🧪 Running unit and integration tests ==="
npm test

echo "=== 🎭 Running E2E tests ==="
npx playwright install --with-deps
npm run test:e2e

echo "=== ✅ All tests passed successfully! ===" 