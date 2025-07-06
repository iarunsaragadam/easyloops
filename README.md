# EasyLoops React 🔄

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0.html)
[![GitHub issues](https://img.shields.io/badge/github-issues-orange)](https://github.com/username/easyloops-react/issues)
[![GitHub stars](https://img.shields.io/badge/github-stars-yellow)](https://github.com/username/easyloops-react/stargazers)
[![GitHub forks](https://img.shields.io/badge/github-forks-blue)](https://github.com/username/easyloops-react/network)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://easyloops.web.app)

**EasyLoops React** is a comprehensive interactive programming education platform built with Next.js and React. It provides hands-on learning experiences for programmers of all levels, covering over 200 programming concepts from basic variable declarations to advanced algorithms and system programming.

🌐 **Live Demo**: [https://easyloops.web.app](https://easyloops.web.app)

## 🎯 Project Mission

Our mission is to democratize programming education by making it:

- **Accessible**: Free and open-source for everyone
- **Interactive**: Learn by doing with real code examples
- **Comprehensive**: From absolute beginners to advanced developers
- **Modern**: Built with cutting-edge web technologies
- **Community-Driven**: Powered by contributions from developers worldwide

## 🌟 Why EasyLoops?

In a world where programming education is often expensive, fragmented, or inaccessible, EasyLoops bridges the gap by:

1. **Breaking Down Barriers**: Completely free, no paywalls or premium features
2. **Progressive Learning**: Structured curriculum that builds knowledge step-by-step
3. **Real-World Application**: Practical exercises that mirror industry scenarios
4. **Multi-Language Support**: Learn concepts that apply across programming languages
5. **Community-Powered**: Continuously improved by developers for developers

## 🚀 Features

- **200+ Programming Exercises**: Comprehensive coverage from basics to advanced topics
- **Interactive Code Editor**: Built-in Monaco Editor with syntax highlighting and IntelliSense
- **Multi-Language Support**: Python (local execution), Go (API execution), JavaScript, Java, C++, and more
- **Real-time Code Execution**: Execute code with test cases and instant feedback
- **Authentication**: Firebase-based authentication for Go language access
- **Progressive Learning Path**: Structured curriculum from beginner to expert level
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Test-Driven Learning**: Each exercise includes comprehensive test cases
- **Hint System**: Contextual hints to guide learning without giving away solutions
- **Progress Tracking**: Monitor your learning journey and achievements
- **Community Features**: Share solutions and learn from others
- **Test Coverage**: Comprehensive testing with Jest and Playwright

## 📚 Learning Topics Covered

### 🔰 Fundamentals (Levels 1-40)

- Variable declarations and data types
- Operators (arithmetic, comparison, logical)
- Control structures (if/else, loops, switch)
- Functions and scope
- Arrays and strings
- Basic I/O operations

### 🚀 Intermediate Concepts (Levels 41-120)

- Object-oriented programming
- Data structures (stacks, queues, linked lists, trees)
- File I/O operations and error handling
- Exception handling and debugging
- Regular expressions and pattern matching
- Memory management concepts

### 🎯 Advanced Topics (Levels 121-200)

- Advanced algorithms (sorting, searching, graph traversal)
- Design patterns (Singleton, Factory, Observer, etc.)
- Concurrency and threading
- System programming and low-level operations
- Performance optimization and profiling
- Database integration and network programming
- Functional programming concepts
- Distributed systems patterns

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Code Editor**: Monaco Editor
- **Testing**: Jest, React Testing Library, Playwright
- **Authentication**: Firebase
- **Code Execution**: Pyodide (Python), Custom API (Go)
- **Deployment**: Firebase Hosting, Vercel
- **Package Manager**: npm
- **Development Tools**: ESLint, Prettier, Turbopack

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

## 🤖 AI-Powered Development

**Want to contribute 10x faster?** EasyLoops embraces modern AI development tools!

### Why AI Development?

- **Create exercises** in 15 minutes instead of 2-3 hours
- **Generate test cases** in 5 minutes instead of 1-2 hours
- **Write documentation** in 5 minutes instead of 1 hour

### Supported Tools

- **Cursor IDE** (Recommended for beginners)
- **GitHub Copilot** (Perfect for VS Code users)
- **Windsurf** (Collaborative AI development)
- **ChatGPT/Claude** (Planning and content generation)

**📖 [Complete AI Development Guide →](AI_DEVELOPMENT.md)**

_Even if you've never used AI for coding before, our step-by-step guide will have you contributing in minutes!_

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

# Run specific test suites
npm run test:exercises    # Test exercise validation
npm run test:components   # Test React components
npm run test:utils        # Test utility functions
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
│   │   ├── ui/          # Basic UI components
│   │   ├── exercises/   # Exercise-specific components
│   │   ├── editor/      # Code editor components
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
│   ├── questions/       # Programming exercises (200+ topics)
│   │   ├── 01-variable-declaration/
│   │   ├── 02-data-types/
│   │   └── ...          # Organized by difficulty and topic
│   └── testcases/       # Test case files
├── scripts/             # Build and utility scripts
├── docs/                # Documentation
├── .github/             # GitHub templates and workflows
└── README.md           # You are here!
```

## 📱 Deployment

The project is configured for easy deployment on multiple platforms:

### Firebase (Production)

```bash
npm run build
firebase deploy
```

### Vercel (Alternative)

```bash
npm run build
# Connect to Vercel for automatic deployments
```

### Docker (Self-hosted)

```bash
docker build -t easyloops-react .
docker run -p 3000:3000 easyloops-react
```

### macOS Desktop App (Tauri)

The project includes a Tauri configuration for a native desktop build.

#### Prerequisites for Tauri Development

1. **Install Rust and Cargo** (Rust's package manager):

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
   source "$HOME/.cargo/env"
   ```

2. **Verify installation**:

   ```bash
   rustc --version
   cargo --version
   rustup --version
   ```

3. **Install Xcode Command Line Tools** (macOS only):
   ```bash
   xcode-select --install
   ```

#### Running the Tauri App

```bash
npm run tauri:dev   # run the desktop app in development
npm run tauri:build # build a `.app` bundle
```

**Note**: The first run may take several minutes as it downloads and compiles Rust dependencies.

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
- 🤖 **AI-Assisted Development**: Use AI tools to contribute 10x faster!

## 🌟 Community

- **GitHub Discussions**: [Join the conversation](https://github.com/username/easyloops-react/discussions)
- **Discord**: [Join our Discord server](https://discord.gg/easyloops) (Coming soon)
- **Twitter**: [@EasyLoopsReact](https://twitter.com/easyloopsreact) (Coming soon)

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

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
