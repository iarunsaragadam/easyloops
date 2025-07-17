# Deployment Workflows

This document describes the GitHub Actions workflows for the Easyloops project.

## Workflow Overview

### 1. PR Checks (`pr-checks.yml`)

**Trigger**: Pull requests to main branch
**Purpose**: Quality assurance and testing
**Actions**:

- ✅ **Frontend Tests**: Linting, type checking, unit tests, build verification
- ✅ **Backend Tests**: Cloud Functions linting, unit tests, build verification
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
- ✅ **Verify**: Site accessibility check

### 3. Firebase Cloud Functions Deployment (`deploy-firebase-functions.yml`)

**Trigger**:

- Push to main branch
- Only when backend files change: `functions/`, `firebase.json`, `.firebaserc`
- PRs: Only run tests, no deployment
  **Purpose**: Deploy backend Cloud Functions
  **Actions**:
- ✅ **Test**: Linting, unit tests, build verification
- ✅ **Deploy**: Cloud Functions deployment (main branch only)
- ✅ **Verify**: Health checks and API endpoint verification

## Deployment Strategy

### 🚫 PR Workflows (No Deployments)

- **PR Checks**: Only run tests and quality checks
- **No Production Deployments**: PRs never deploy to live environment
- **Quality Gate**: Ensures code quality before merge

### ✅ Main Branch Deployments

- **Path-Based Triggers**: Only deploy when relevant files change
- **Frontend Changes**: Trigger hosting deployment only
- **Backend Changes**: Trigger functions deployment only
- **Separate Concerns**: Hosting and functions deploy independently

### 🔄 Deployment Flow

```
PR Created → PR Checks (test only) → Merge to Main →
├── Frontend Changes → Deploy Hosting
└── Backend Changes → Deploy Functions
```

## Environment Variables

### Frontend (Hosting)

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Backend (Cloud Functions)

- `JUDGE0_BASE_URL`
- `JUDGE0_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_SERVICE_ACCOUNT`

## Verification

### Hosting Verification

- ✅ HTTP 200 response from main site
- ✅ Site accessible at `https://elloloop-easyloops.web.app`

### Functions Verification

- ✅ Health endpoint: `/health`
- ✅ Languages endpoint: `/getLanguages`
- ✅ All endpoints return correct status codes and responses

## Best Practices

1. **No PR Deployments**: PRs only test, never deploy
2. **Path-Based Triggers**: Deploy only when relevant files change
3. **Separate Frontend/Backend**: Independent deployment pipelines
4. **Verification**: Always verify deployments succeed
5. **Rollback Ready**: Failed deployments don't affect production

## Troubleshooting

### Common Issues

- **Deployment not triggered**: Check if changed files match path filters
- **Functions not responding**: Check environment variables and Judge0 service
- **Hosting not accessible**: Check Firebase project configuration

### Manual Deployment

If needed, workflows can be triggered manually via GitHub Actions UI with proper branch selection.
