# EasyLoops React 🔄

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/badge/github-issues-orange)](https://github.com/username/easyloops-react/issues)
[![GitHub stars](https://img.shields.io/badge/github-stars-yellow)](https://github.com/username/easyloops-react/stargazers)
[![GitHub forks](https://img.shields.io/badge/github-forks-blue)](https://github.com/username/easyloops-react/network)

**EasyLoops React** is a comprehensive interactive programming education platform built with Next.js and React. It provides hands-on learning experiences for programmers of all levels, covering over 200 programming concepts from basic variable declarations to advanced algorithms and system programming.

## 🚀 Features

- **200+ Programming Exercises**: Comprehensive coverage from basics to advanced topics
- **Interactive Code Editor**: Built-in Monaco Editor for seamless coding experience
- **Multi-Language Support**: Python (local execution), Go (API execution), and more
- **Real-time Code Execution**: Execute code with test cases and instant feedback
- **Authentication**: Firebase-based authentication for Go language access
- **Progressive Learning Path**: Structured curriculum from beginner to expert level
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Test Coverage**: Comprehensive testing with Jest and Playwright

## 📚 Learning Topics Covered

### Fundamentals

- Variable declarations and data types
- Operators (arithmetic, comparison, logical)
- Control structures (if/else, loops, switch)
- Functions and scope
- Arrays and strings

### Intermediate Concepts

- Object-oriented programming
- Data structures (stacks, queues, linked lists)
- File I/O operations
- Exception handling
- Regular expressions

### Advanced Topics

- Algorithms (sorting, searching, graph traversal)
- Design patterns
- Concurrency and threading
- System programming
- Performance optimization
- Database integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Testing**: Jest, React Testing Library, Playwright
- **Authentication**: Firebase
- **Code Execution**: Pyodide (Python), Custom API (Go)
- **Deployment**: Vercel/Firebase
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git

### Installation

1. **Fork the repository** (see [Contributing Guidelines](CONTRIBUTING.md))

2. **Clone your fork**:

   ```bash
   git clone https://github.com/your-username/easyloops-react.git
   cd easyloops-react
   ```

3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Browse Topics**: Navigate through the organized learning path
2. **Practice Coding**: Use the interactive code editor to solve problems
3. **Test Solutions**: Run your code and see instant feedback
4. **Track Progress**: Monitor your learning journey
5. **Contribute**: Add new exercises or improve existing ones

## 🧪 Testing

### Unit Tests

- **Framework**: Jest with React Testing Library
- **Coverage**: 80% threshold for branches, functions, lines, and statements
- **Location**: `src/**/__tests__/` and `src/**/*.test.{ts,tsx}`

### E2E Tests

- **Framework**: Playwright
- **Location**: `e2e/` directory
- **Browsers**: Chromium, Firefox, WebKit

### Running Tests

```bash
# Unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

## 🛠️ Development

### Available Scripts

#### Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server

#### Testing

- `npm test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run test:all` - Run all tests (lint, typecheck, unit, e2e)

#### Code Quality

- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run ci-local` - Run full CI pipeline locally

#### Deployment

- `npm run deploy:firebase` - Deploy to Firebase
- `npm run deploy:firebase:full` - Build and deploy to Firebase

### Git Hooks

The project uses Husky for Git hooks:

- **Pre-commit**: Runs lint-staged, type checking, and tests
- **Commit-msg**: Validates commit message format (conventional commits)

To skip hooks temporarily:

```bash
SKIP_HOOKS=1 git commit -m "your message"
```

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

Examples:
- feat(auth): add login functionality
- fix(api): handle null response
- docs: update README
- test: add unit tests for service layer
```

Types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

## 📁 Project Structure

```
easyloops-react/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # Reusable React components
│   │   ├── __tests__/   # Component tests
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   │   ├── __tests__/   # Hook tests
│   │   └── ...
│   ├── services/        # Business logic services
│   │   ├── __tests__/   # Service tests
│   │   └── ...
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── constants/       # Application constants
├── public/
│   ├── questions/       # Programming exercises and test cases
│   └── testcases/       # Test case files
├── scripts/             # Build and utility scripts
├── docs/                # Documentation
└── .github/             # GitHub templates and workflows
```

## 📱 Deployment

The project is configured for easy deployment on multiple platforms:

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Firebase

```bash
npm run deploy:firebase
```

### Environment Variables

Required environment variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding new features, improving documentation, or creating new programming exercises, your contributions are valuable.

### How to Contribute

1. **Read our [Contributing Guidelines](CONTRIBUTING.md)** - Essential reading for all contributors
2. **Check out [Good First Issues](https://github.com/username/easyloops-react/labels/good%20first%20issue)** - Perfect for new contributors
3. **Join our [Discussions](https://github.com/username/easyloops-react/discussions)** - Connect with the community

### Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Report it in our [Issues](https://github.com/username/easyloops-react/issues)
- 💡 **Feature Requests**: Have an idea? Share it with us
- 📝 **Documentation**: Help improve our docs
- 🔧 **Code Contributions**: Fix bugs or add new features
- 🎓 **Educational Content**: Create new programming exercises
- 🌐 **Translations**: Help make the platform accessible globally

## 🌟 Community

- **GitHub Discussions**: [Join the conversation](https://github.com/username/easyloops-react/discussions)
- **Discord**: [Join our Discord server](https://discord.gg/easyloops) (Coming soon)
- **Twitter**: [@EasyLoopsReact](https://twitter.com/easyloopsreact) (Coming soon)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all our [contributors](https://github.com/username/easyloops-react/graphs/contributors)
- Inspired by the open-source education community
- Built with amazing tools from the React and Next.js ecosystems

## 📞 Support

- **Bug Reports**: [GitHub Issues](https://github.com/username/easyloops-react/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/username/easyloops-react/discussions)
- **Documentation**: [Project Wiki](https://github.com/username/easyloops-react/wiki)

---

**Made with ❤️ by the EasyLoops community**

[🔝 Back to top](#easyloops-react-)
