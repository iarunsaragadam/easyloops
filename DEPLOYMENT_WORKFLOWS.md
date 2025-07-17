# Deployment Workflows

This document describes the GitHub Actions workflows for the Easyloops project.

## Workflow Overview

### 1. PR Frontend Tests (`pr-frontend-tests.yml`)

**Trigger**: Pull requests to main branch with frontend file changes
**Paths**: `src/`, `public/`, `package.json`, `e2e/`, config files
**Purpose**: Quality assurance for frontend changes
**Actions**:

- ✅ **Linting**: ESLint checks
- ✅ **Type Checking**: TypeScript validation
- ✅ **Unit Tests**: Jest test suite
- ✅ **E2E Tests**: Playwright end-to-end tests
- ✅ **Build Verification**: Next.js build process
- ❌ **No Deployments**: PRs never deploy to production

### 2. PR Backend Tests (`pr-backend-tests.yml`)

**Trigger**: Pull requests to main branch with backend file changes
**Paths**: `functions/`, `firebase.json`, `judge0-docker/`, deployment scripts
**Purpose**: Quality assurance for backend changes
**Actions**:

- ✅ **Linting**: ESLint checks for Cloud Functions
- ✅ **Type Checking**: TypeScript validation
- ✅ **Unit Tests**: Jest test suite (60+ tests)
- ✅ **Build Verification**: TypeScript compilation
- ❌ **No Deployments**: PRs never deploy to production

### 3. Firebase Hosting Deployment (`deploy-firebase.yml`)

**Trigger**:

- Push to main branch
- Only when frontend files change: `src/`, `public/`, `package.json`, `e2e/`, config files
- Excludes: `functions/**` changes
  **Purpose**: Deploy frontend application
  **Actions**:
- ✅ **Build**: Next.js application build
- ✅ **Deploy**: Firebase Hosting deployment
- ✅ **Verification**: Health check and smoke tests

### 4. Firebase Cloud Functions Deployment (`deploy-firebase-functions.yml`)

**Trigger**:

- Push to main branch
- Only when backend files change: `functions/`, `firebase.json`, `judge0-docker/`, deployment scripts
- Excludes: Frontend changes
  **Purpose**: Deploy Cloud Functions
  **Actions**:
- ✅ **Test**: Run all Cloud Functions tests
- ✅ **Build**: TypeScript compilation
- ✅ **Deploy**: Firebase Functions deployment
- ✅ **Verification**: API health checks and smoke tests

## Workflow Benefits

### 🚀 **Performance Optimizations**

- **Path-Based Triggers**: Only relevant workflows run based on file changes
- **Separate Concerns**: Frontend and backend workflows are completely independent
- **Faster Feedback**: Developers get quick feedback on their specific changes
- **Resource Efficiency**: No unnecessary workflow execution

### 🎯 **Targeted Execution**

- **Frontend Changes**: Only `pr-frontend-tests.yml` runs
- **Backend Changes**: Only `pr-backend-tests.yml` runs
- **Mixed Changes**: Both PR workflows run in parallel
- **Infrastructure Changes**: No tests run (efficient for workflow-only changes)

### 🔒 **Security & Quality**

- **No PR Deployments**: Production deployments only happen on main branch
- **Comprehensive Coverage**: All relevant tests run for changed components
- **Build Verification**: Ensures code compiles before deployment
- **Quality Gates**: Tests must pass before merge

## Usage Examples

### Frontend-Only PR

```yaml
# Changes: src/components/Button.tsx
# Runs: pr-frontend-tests.yml only
# Skips: pr-backend-tests.yml
```

### Backend-Only PR

```yaml
# Changes: functions/src/services/code-execution.service.ts
# Runs: pr-backend-tests.yml only
# Skips: pr-frontend-tests.yml
```

### Mixed PR

```yaml
# Changes: src/components/ + functions/src/
# Runs: Both pr-frontend-tests.yml and pr-backend-tests.yml in parallel
# Result: Faster overall execution
```

### Infrastructure PR

```yaml
# Changes: .github/workflows/, README.md, docs/
# Runs: No workflows (efficient for infrastructure changes)
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

- ✅ **PR Tests**: All relevant tests passed
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

## Workflow Structure

```
PR Created → Path Detection → Conditional Workflow Execution
├── Frontend Changes → pr-frontend-tests.yml
├── Backend Changes → pr-backend-tests.yml
└── Mixed Changes → Both workflows (parallel)

Main Branch Push → Path Detection → Conditional Deployment
├── Frontend Changes → deploy-firebase.yml
└── Backend Changes → deploy-firebase-functions.yml
```
