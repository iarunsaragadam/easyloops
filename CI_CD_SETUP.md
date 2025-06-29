# CI/CD Pipeline Setup Documentation

## Overview

This project now includes a comprehensive CI/CD pipeline that runs on every pull request and push to main/develop branches. The pipeline ensures code quality, security, and maintainability through automated checks.

## Pipeline Components

### 🔍 **Quality Checks**

1. **ESLint** - Code linting and style enforcement
2. **TypeScript** - Type checking
3. **Prettier** - Code formatting (coming soon)
4. **Unit Tests** - Jest + React Testing Library
5. **Test Coverage** - Coverage reports and thresholds

### 🏗️ **Build & Deploy**

1. **Build Verification** - Ensures the application builds successfully
2. **Static Analysis** - SonarCloud integration for code quality metrics
3. **Performance** - Lighthouse CI for performance monitoring
4. **Security** - npm audit for dependency vulnerabilities

### 🔄 **Automation**

1. **Dependency Updates** - Weekly automated dependency updates
2. **Coverage Reports** - Codecov integration
3. **Artifact Storage** - Build artifacts stored for 7 days

## Configuration Files

### Core Configuration
- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/dependency-update.yml` - Automated dependency updates
- `jest.config.js` - Jest testing configuration
- `jest.setup.js` - Jest global setup and mocks

### Quality Tools
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration
- `lighthouserc.js` - Lighthouse CI configuration
- `sonar-project.properties` - SonarCloud configuration

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Quality Assurance
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues automatically
npm run type-check      # Run TypeScript type checking

# Testing
npm run test            # Run tests in watch mode
npm run test:ci         # Run tests with coverage (CI mode)
npm run test:coverage   # Run tests with coverage report
```

## Coverage Thresholds

Current coverage thresholds (gradually increase these as you add more tests):

- **Statements**: 3%
- **Branches**: 0%
- **Functions**: 5%
- **Lines**: 3%

### Recommended Progression
1. **Phase 1** (Current): 3-5% coverage to establish baseline
2. **Phase 2**: Increase to 20-30% with more component tests
3. **Phase 3**: Target 50-70% for critical paths
4. **Phase 4**: Aim for 80%+ for production-ready applications

## Pipeline Workflow

### On Pull Request
1. **Lint & Format Check** - Ensures code follows style guidelines
2. **Type Check** - Validates TypeScript types
3. **Unit Tests** - Runs all tests with coverage
4. **Build Verification** - Ensures application builds successfully
5. **Security Audit** - Checks for vulnerable dependencies
6. **Performance Check** - Lighthouse CI analysis
7. **Code Quality** - SonarCloud analysis

### Required Checks
All jobs must pass for a PR to be mergeable:
- ✅ Linting passes
- ✅ Type checking passes  
- ✅ All tests pass
- ✅ Coverage thresholds met
- ✅ Build succeeds
- ✅ No critical security vulnerabilities

## Setting Up External Services

### 1. Codecov (Optional but Recommended)
1. Go to [codecov.io](https://codecov.io)
2. Connect your GitHub repository
3. Add `CODECOV_TOKEN` to repository secrets

### 2. SonarCloud (Optional)
1. Go to [sonarcloud.io](https://sonarcloud.io)
2. Import your repository
3. Add `SONAR_TOKEN` to repository secrets
4. Update `sonar-project.properties` with your project details

### 3. Lighthouse CI (Optional)
1. The current setup uses temporary public storage
2. For persistent storage, set up a Lighthouse CI server
3. Add `LHCI_GITHUB_APP_TOKEN` if using GitHub App

## Test Examples

### Utility Function Test
```typescript
// src/utils/__tests__/formatters.test.ts
import { formatQuestionName } from '../formatters';

describe('formatQuestionName', () => {
  it('should format question ID correctly', () => {
    expect(formatQuestionName('01-variable-declaration')).toBe('Variable Declaration');
  });
});
```

### Component Test
```typescript
// src/components/__tests__/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('should render the title', () => {
    render(<Header {...mockProps} />);
    expect(screen.getByText('🧠 EasyLoops')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Writing Tests
- Test behavior, not implementation
- Use descriptive test names
- Keep tests focused and isolated
- Mock external dependencies
- Aim for good coverage of critical paths

### 2. Code Quality
- Run `npm run lint:fix` before committing
- Fix TypeScript errors immediately
- Keep functions small and focused
- Use meaningful variable names
- Add JSDoc comments for complex functions

### 3. Pull Request Process
- Ensure all CI checks pass before requesting review
- Include test updates with feature changes
- Keep PRs focused and reasonably sized
- Update documentation when needed

## Troubleshooting

### Common Issues

**Tests failing locally but not in CI:**
- Check Node.js version compatibility
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

**Coverage threshold failures:**
- Add more tests or adjust thresholds in `jest.config.js`
- Run `npm run test:coverage` to see detailed coverage report

**Build failures:**
- Check for TypeScript errors: `npm run type-check`
- Ensure all imports are correct
- Check for missing dependencies

**ESLint failures:**
- Run `npm run lint:fix` to auto-fix issues
- Check `.eslintrc` configuration for custom rules

### Getting Help
1. Check the Actions tab for detailed error logs
2. Review the specific job that failed
3. Run the same commands locally to reproduce issues
4. Check this documentation for configuration details

## Future Enhancements

### Planned Additions
- [ ] Prettier integration for code formatting
- [ ] End-to-end testing with Playwright
- [ ] Bundle size analysis
- [ ] Visual regression testing
- [ ] Automated changelog generation
- [ ] Release automation
- [ ] Docker integration
- [ ] Deployment automation

### Performance Monitoring
- Bundle size tracking
- Core Web Vitals monitoring
- Lighthouse performance budgets
- Performance regression detection

This CI/CD setup provides a solid foundation for maintaining code quality and catching issues early in the development process.