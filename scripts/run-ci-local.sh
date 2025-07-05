#!/bin/bash

# Run CI pipeline locally
echo "🚀 Running CI pipeline locally..."

# Check Node.js version
echo "🔍 Checking Node.js version..."
npm run check-node || { echo "❌ Node.js version check failed"; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm ci || { echo "❌ Dependency installation failed"; exit 1; }

# Run linting
echo "🔍 Running linting..."
npm run lint || { echo "❌ Linting failed"; exit 1; }

# Run type checking
echo "🔄 Running type checking..."
npm run typecheck || { echo "❌ Type checking failed"; exit 1; }

# Run unit tests
echo "🧪 Running unit tests..."
npm test || { echo "❌ Unit tests failed"; exit 1; }

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install --with-deps || { echo "❌ Playwright installation failed"; exit 1; }

# Run E2E tests
echo "🧪 Running E2E tests..."
npm run test:e2e || { echo "❌ E2E tests failed"; exit 1; }

echo "✅ CI pipeline completed successfully!" 