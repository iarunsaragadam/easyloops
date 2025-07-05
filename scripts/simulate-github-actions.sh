#!/bin/bash
# Script to simulate GitHub Actions locally

set -e

echo "=== 🚀 Simulating GitHub Actions locally ==="

# Check if we're in a CI environment
if [[ "$CI" == "true" ]]; then
  echo "Already in CI environment, running full pipeline..."
  ./scripts/run-ci-local.sh
else
  echo "Running in local environment, simulating CI pipeline..."
  
  # Set CI environment variable
  export CI=true
  
  # Run the same steps as GitHub Actions
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
fi 