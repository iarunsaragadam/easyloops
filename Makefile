# EasyLoops Makefile
# Unified development, testing, and CI commands

.PHONY: \
  help install ci-install install-playwright \
  lint typecheck test test-smart \
  test-e2e test-e2e-p0 test-e2e-p1 test-e2e-p2 test-e2e-pr \
  test-all ci-test clean dev build start \
  backend-install backend-test backend-lint backend-clean

# --------------------------------------------------------------------
# 📚 Help
# --------------------------------------------------------------------
help:
	@echo "EasyLoops Commands"
	@echo "=================="
	@echo ""
	@echo "Frontend:"
	@echo "  install             - Install frontend dependencies"
	@echo "  ci-install          - Clean install for CI (npm ci)"
	@echo "  install-playwright  - Install Playwright browsers"
	@echo "  lint                - Run ESLint"
	@echo "  typecheck           - Run TypeScript type checks"
	@echo "  test                - Run all unit tests"
	@echo "  test-smart          - Run only impacted unit tests (from src/)"
	@echo "  test-e2e            - Run all E2E tests"
	@echo "  test-e2e-p0         - Run critical E2E tests"
	@echo "  test-e2e-p1         - Run important E2E tests"
	@echo "  test-e2e-p2         - Run nice-to-have E2E tests"
	@echo "  test-e2e-pr         - Run P0 + P1 E2E tests (for PRs)"
	@echo "  test-all            - Run lint + typecheck + unit + e2e tests"
	@echo ""
	@echo "CI:"
	@echo "  ci-test             - Run lint + typecheck + smart unit tests"
	@echo ""
	@echo "App:"
	@echo "  dev                 - Start frontend dev server"
	@echo "  build               - Build frontend app"
	@echo "  start               - Start production server"
	@echo ""
	@echo "Backend (functions/):"
	@echo "  backend-install     - Install backend deps"
	@echo "  backend-test        - Run backend unit tests"
	@echo "  backend-lint        - Run backend linter"
	@echo "  backend-clean       - Clean backend build artifacts"
	@echo ""
	@echo "Utilities:"
	@echo "  clean               - Clean frontend build artifacts and cache"

# --------------------------------------------------------------------
# 📦 Frontend Setup
# --------------------------------------------------------------------
install:
	npm install

ci-install:
	npm ci

install-playwright:
	npx playwright install --with-deps

# --------------------------------------------------------------------
# 🧹 Code Quality
# --------------------------------------------------------------------
lint:
	npm run lint

typecheck:
	npm run typecheck

# --------------------------------------------------------------------
# 🧪 Unit & Smart Tests
# --------------------------------------------------------------------
test:
	npm test

test-smart:
	@echo "Running smart tests for changed frontend files..."
	@CHANGED=$$(git diff --name-only origin/main...HEAD | grep -E '^src/.*\.(ts|tsx)$$' || true); \
	if [ -n "$$CHANGED" ]; then \
		echo "Changed frontend files:"; echo "$$CHANGED"; \
		npx jest --passWithNoTests --findRelatedTests $$CHANGED; \
	else \
		echo "No relevant frontend file changes detected."; \
	fi

# --------------------------------------------------------------------
# 🎭 E2E Tests (Playwright)
# --------------------------------------------------------------------
test-e2e:
	npm run test:e2e

test-e2e-p0:
	TEST_PRIORITY=P0 npx playwright test --grep "@P0"

test-e2e-p1:
	TEST_PRIORITY=P1 npx playwright test --grep "@P1"

test-e2e-p2:
	TEST_PRIORITY=P2 npx playwright test --grep "@P2"

test-e2e-pr: test-e2e-p0 test-e2e-p1

# --------------------------------------------------------------------
# 🧪 Full Test Suite
# --------------------------------------------------------------------
test-all: lint typecheck test test-e2e

# --------------------------------------------------------------------
# 🏗️ CI Test Suite
# --------------------------------------------------------------------
ci-test: lint typecheck test-smart

# --------------------------------------------------------------------
# ⚙️ App Lifecycle
# --------------------------------------------------------------------
dev:
	npm run dev

build:
	npm run build

start:
	npm start

# --------------------------------------------------------------------
# 🧼 Clean (Frontend)
# --------------------------------------------------------------------
clean:
	rm -rf .next coverage playwright-report test-results node_modules/.cache
	npm run clean 2>/dev/null || true

# --------------------------------------------------------------------
# 🔧 Backend (functions/)
# --------------------------------------------------------------------
backend-install:
	cd functions && npm ci

backend-test:
	cd functions && npm test

backend-lint:
	cd functions && npm run lint

backend-clean:
	cd functions && rm -rf node_modules coverage dist
