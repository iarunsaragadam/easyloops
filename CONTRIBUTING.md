# Contributing to EasyLoops React 🤝

Thank you for your interest in contributing to EasyLoops React! This guide will help you understand how to contribute effectively to our open-source educational platform.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [AI-Powered Development](#ai-powered-development-recommended)
- [Development Workflow](#development-workflow)
- [Contribution Types](#contribution-types)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)
- [Recognition](#recognition)

## 📜 Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@easyloops.dev](mailto:conduct@easyloops.dev).

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Basic understanding** of React, Next.js, and TypeScript

### Setting Up Your Development Environment

#### 1. Fork the Repository

1. Visit the [EasyLoops React repository](https://github.com/username/easyloops-react)
2. Click the **"Fork"** button in the top-right corner
3. This creates a copy of the repository in your GitHub account

#### 2. Clone Your Fork

```bash
# Clone your fork (replace 'your-username' with your GitHub username)
git clone https://github.com/your-username/easyloops-react.git

# Navigate to the project directory
cd easyloops-react

# Add the original repository as upstream
git remote add upstream https://github.com/username/easyloops-react.git

# Verify remotes
git remote -v
```

#### 3. Install Dependencies

```bash
# Install project dependencies
npm install

# Start the development server
npm run dev
```

#### 4. Verify Setup

- Open [http://localhost:3000](http://localhost:3000)
- You should see the EasyLoops React application running

## 🤖 AI-Powered Development (Recommended!)

**Want to contribute 10x faster?** We strongly encourage using AI development tools to accelerate your contributions!

### 🚀 Why Use AI Tools?

| Traditional Method | With AI Tools | Time Saved |
|-------------------|---------------|------------|
| Create programming exercise: 2-3 hours | 15-30 minutes | **80-90%** |
| Write comprehensive tests: 1-2 hours | 5-10 minutes | **90-95%** |
| Generate documentation: 1 hour | 5-10 minutes | **85-90%** |
| Debug and fix issues: 30-60 minutes | 5-15 minutes | **70-80%** |

### 🎯 Supported Tools

- **🔥 Cursor IDE** (Recommended for beginners)
- **💡 GitHub Copilot** (Great for VS Code users)
- **🌊 Windsurf** (Collaborative AI development)
- **🧠 ChatGPT/Claude** (Planning and content generation)

### 📖 Complete Guide

**👉 [Read our comprehensive AI Development Guide](AI_DEVELOPMENT.md) to learn:**
- Step-by-step tool setup (2-3 minutes)
- Create your first exercise in 15 minutes
- Real examples with actual prompts
- Success stories from other contributors
- Troubleshooting common issues

**Even if you've never used AI for coding before, you'll be amazed at what you can accomplish!**

## 🔄 Development Workflow

### Keeping Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updates to your fork
git push origin main
```

### Creating a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description

# Or for documentation
git checkout -b docs/documentation-update
```

### Branch Naming Conventions

- **Features**: `feature/feature-name`
- **Bug fixes**: `fix/bug-description`
- **Documentation**: `docs/documentation-topic`
- **Refactoring**: `refactor/component-name`
- **Tests**: `test/test-description`

## 🎯 Contribution Types

### 1. Bug Reports

**Before submitting a bug report:**
- Check if the issue already exists in [GitHub Issues](https://github.com/username/easyloops-react/issues)
- Try to reproduce the bug with the latest version
- Gather relevant information (browser, OS, steps to reproduce)

**Bug Report Template:**
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 95, Firefox 93]
- Node.js version: [e.g., 18.17.0]
```

### 2. Feature Requests

**Before submitting a feature request:**
- Check [GitHub Discussions](https://github.com/username/easyloops-react/discussions) for similar ideas
- Consider if the feature aligns with the project's educational goals
- Think about the implementation complexity

**Feature Request Template:**
```markdown
**Feature Description**
A clear description of the proposed feature.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like to see this implemented?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other relevant information.
```

### 3. Code Contributions

#### Types of Code Contributions:

**🐛 Bug Fixes**
- Fix existing functionality
- Improve error handling
- Performance optimizations

**✨ New Features**
- Add new programming exercises
- Implement new UI components
- Enhance existing functionality

**📝 Documentation**
- Update README files
- Add code comments
- Create tutorials

**🧪 Tests**
- Add unit tests
- Improve test coverage
- Add integration tests

**♻️ Refactoring**
- Improve code structure
- Update dependencies
- Code cleanup

### 4. Educational Content

**Adding New Programming Exercises:**

1. **Choose a Topic**: Select from our roadmap or propose new topics
2. **Create Exercise Structure**:
   ```
   public/questions/XXX-topic-name/
   ├── problem.md          # Problem description
   ├── solution.js         # Reference solution
   ├── testcases.json      # Test cases
   ├── hints.md            # Helpful hints
   └── explanation.md      # Detailed explanation
   ```

3. **Exercise Guidelines**:
   - Clear problem statement
   - Progressive difficulty
   - Multiple test cases
   - Comprehensive explanations
   - Language-agnostic when possible

## 📏 Coding Standards

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Check code style
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable names

```typescript
// ✅ Good
interface ProgrammingExercise {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
}

// ❌ Bad
interface Exercise {
  id: any;
  data: any;
}
```

### React/Next.js Guidelines

- Use functional components with hooks
- Implement proper error boundaries
- Follow Next.js best practices
- Use TypeScript for all components

```tsx
// ✅ Good
interface Props {
  exercise: ProgrammingExercise;
  onComplete: (result: boolean) => void;
}

const ExerciseCard: React.FC<Props> = ({ exercise, onComplete }) => {
  // Component implementation
};

// ❌ Bad
const ExerciseCard = (props: any) => {
  // Implementation
};
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components
│   └── exercises/       # Exercise-specific components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── constants/           # Application constants
```

### Commit Message Guidelines

Follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```bash
# Format
<type>[optional scope]: <description>

# Examples
feat: add binary search exercise
fix: resolve editor syntax highlighting issue
docs: update contribution guidelines
refactor: improve exercise loading performance
test: add unit tests for utility functions
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 📤 Submitting Changes

### 1. Prepare Your Changes

```bash
# Make sure your branch is up to date
git checkout main
git pull upstream main
git checkout your-branch-name
git rebase main

# Run tests and linting
npm run test
npm run lint
npm run build
```

### 2. Create a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin your-branch-name
   ```

2. **Create Pull Request**:
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill out the PR template

### 3. Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test addition

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for changes
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🔍 Review Process

### What to Expect

1. **Automated Checks**: GitHub Actions will run tests and linting
2. **Code Review**: Maintainers will review your changes
3. **Feedback**: You may receive suggestions for improvements
4. **Approval**: Once approved, your PR will be merged

### Review Criteria

- **Functionality**: Does it work as expected?
- **Code Quality**: Is the code clean and maintainable?
- **Testing**: Are there adequate tests?
- **Documentation**: Is documentation updated?
- **Performance**: Does it impact performance?
- **Accessibility**: Is it accessible to all users?

### Responding to Feedback

- Be open to suggestions
- Ask questions if feedback is unclear
- Make requested changes promptly
- Engage in constructive discussion

## 🎉 Recognition

### Contributors

All contributors are recognized in:
- [Contributors page](https://github.com/username/easyloops-react/graphs/contributors)
- Project README
- Release notes for significant contributions

### Contribution Levels

- **First-time contributors**: Welcome and guidance
- **Regular contributors**: Increased review priority
- **Core contributors**: Invitation to join the core team
- **Maintainers**: Full project access and responsibilities

## 📚 Additional Resources

### Documentation
- [Project Wiki](https://github.com/username/easyloops-react/wiki)
- [API Documentation](docs/api.md)
- [Architecture Guide](docs/architecture.md)

### Communication
- [GitHub Discussions](https://github.com/username/easyloops-react/discussions)
- [Discord Server](https://discord.gg/easyloops)
- [Twitter](https://twitter.com/easyloopsreact)

### Learning Resources
- [React Documentation](https://reactjs.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## ❓ Getting Help

### Where to Get Help

1. **GitHub Discussions**: General questions and ideas
2. **GitHub Issues**: Bug reports and feature requests
3. **Discord**: Real-time chat with the community
4. **Email**: [support@easyloops.dev](mailto:support@easyloops.dev)

### Good First Issues

Look for issues labeled with:
- `good first issue`: Perfect for newcomers
- `help wanted`: Community assistance needed
- `documentation`: Documentation improvements
- `beginner friendly`: Simple fixes or additions

---

## 🙏 Thank You

Thank you for contributing to EasyLoops React! Your contributions help make programming education more accessible and engaging for learners worldwide.

**Happy Coding!** 🚀

---

*This document is living and evolving. If you have suggestions for improvements, please open an issue or submit a pull request.*