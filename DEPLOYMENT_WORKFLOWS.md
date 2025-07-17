# Deployment Workflows

This document describes the GitHub Actions workflows for the Easyloops project.

## Workflow Overview

### 1. PR Checks (`pr-checks.yml`)

**Trigger**: Pull requests to main branch
**Purpose**: Quality assurance and testing based on changed files
**Actions**:

#### 🔍 **Change Detection**

- **Frontend Changes**: `src/`, `public/`, `package.json`, `e2e/`, config files
- **Backend Changes**: `functions/`, `firebase.json`, `judge0-docker/`, deployment scripts
- **Smart Filtering**: Only runs relevant tests based on what actually changed

#### 🧪 **Conditional Test Execution**

- **Frontend Tests** (only if frontend files changed):
  - ✅ **Linting**: ESLint checks
  - ✅ **Type Checking**: TypeScript validation
  - ✅ **Unit Tests**: Jest test suite
  - ✅ **E2E Tests**: Playwright end-to-end tests
  - ✅ **Build Verification**: Next.js build process

- **Backend Tests** (only if backend files changed):
  - ✅ **Linting**: ESLint checks for Cloud Functions
  - ✅ **Type Checking**: TypeScript validation
  - ✅ **Unit Tests**: Jest test suite (60+ tests)
  - ✅ **Build Verification**: TypeScript compilation

- **Summary Job**: Reports overall test status
- ❌ **No Deployments**: PRs never deploy to production

### 2. Firebase Hosting Deployment (`deploy-firebase.yml`)

**Trigger**:

- Push to main branch
- Only when frontend files change: `src/`, `public/`, `package.json`, etc.
- Excludes: `functions/**` changes
  **Purpose**: Deploy frontend application
  **Actions**:
- ✅ **Build**: Next.js application build
- ✅ **Deploy**: Firebase Hosting deployment
- ✅ **Verification**: Health check and smoke tests

### 3. Firebase Cloud Functions Deployment (`deploy-firebase-functions.yml`)

**Trigger**:

- Push to main branch
- Only when backend files change: `functions/`, `firebase.json`, `.firebaserc`
- Excludes: Frontend changes
  **Purpose**: Deploy Cloud Functions
  **Actions**:
- ✅ **Test**: Run all Cloud Functions tests
- ✅ **Build**: TypeScript compilation
- ✅ **Deploy**: Firebase Functions deployment
- ✅ **Verification**: API health checks and smoke tests

## Workflow Benefits

### 🚀 **Performance Optimizations**

- **Parallel Execution**: Frontend and backend tests run in parallel when both change
- **Conditional Jobs**: Only relevant tests run based on file changes
- **Faster Feedback**: Developers get quick feedback on their specific changes
- **Resource Efficiency**: No unnecessary test execution

### 🎯 **Targeted Testing**

- **Frontend Changes**: Only frontend tests run (linting, unit tests, E2E tests, build)
- **Backend Changes**: Only backend tests run (Cloud Functions tests, build)
- **Mixed Changes**: Both test suites run in parallel
- **No Changes**: No tests run (efficient for documentation-only PRs)

### 🔒 **Security & Quality**

- **No PR Deployments**: Production deployments only happen on main branch
- **Comprehensive Coverage**: All relevant tests run for changed components
- **Build Verification**: Ensures code compiles before deployment
- **Quality Gates**: Tests must pass before merge

## Usage Examples

### Frontend-Only PR

```yaml
# Changes: src/components/Button.tsx
# Runs: Frontend tests only (linting, unit tests, E2E tests, build)
# Skips: Backend tests
```

### Backend-Only PR

```yaml
# Changes: functions/src/services/code-execution.service.ts
# Runs: Backend tests only (Cloud Functions tests, build)
# Skips: Frontend tests
```

### Mixed PR

```yaml
# Changes: src/components/ + functions/src/
# Runs: Both frontend and backend tests in parallel
# Result: Faster overall execution
```

### Documentation PR

```yaml
# Changes: README.md, docs/
# Runs: No tests (efficient for docs-only changes)
```

## Configuration

### Environment Variables

All workflows use the same environment variables for consistency:

- `NEXT_PUBLIC_FIREBASE_*`: Frontend Firebase configuration
- `FIREBASE_SERVICE_ACCOUNT_*`: Backend Firebase configuration
- `JUDGE0_API_URL`: Judge0 API endpoint

### Dependencies

- **Node.js**: Version specified in `.nvmrc` for frontend, Node 18 for backend
- **Firebase CLI**: Latest version for deployments
- **Cache**: npm cache for faster dependency installation

## Monitoring & Notifications

### Success Notifications

- ✅ **PR Checks**: All relevant tests passed
- ✅ **Deployments**: Successful deployment with verification
- ✅ **Health Checks**: API endpoints responding correctly

### Failure Notifications

- ❌ **Test Failures**: Specific test failures with details
- ❌ **Build Failures**: Compilation errors with stack traces
- ❌ **Deployment Failures**: Deployment errors with rollback instructions

## Best Practices

1. **Always run tests locally** before pushing
2. **Use conventional commits** for automatic versioning
3. **Review PR checks** before requesting reviews
4. **Monitor deployment logs** for any issues
5. **Test in staging** before production deployment
