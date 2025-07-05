# EasyLoops React

A modern React application for practicing programming problems with support for multiple languages including Python and Go.

## Features

- **Multi-language Support**: Python (local execution), Go (API execution), and more
- **Real-time Code Execution**: Execute code with test cases
- **Authentication**: Firebase-based authentication for Go language access
- **Responsive Design**: Works on desktop and mobile devices
- **Test Coverage**: Comprehensive testing with Jest and Playwright

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Testing**: Jest, React Testing Library, Playwright
- **Authentication**: Firebase
- **Code Execution**: Pyodide (Python), Custom API (Go)

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd easyloops-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

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

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── __tests__/         # Component tests
│   └── ...
├── hooks/                  # Custom React hooks
│   ├── __tests__/         # Hook tests
│   └── ...
├── services/               # Business logic services
│   ├── __tests__/         # Service tests
│   └── ...
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── constants/              # Application constants
```

## Testing

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

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

## CI/CD Pipeline

The project includes GitHub Actions workflows:

- **Pipeline**: Runs on push to main and pull requests
- **Tests**: Linting, type checking, unit tests, E2E tests
- **Build**: Production build on main branch
- **Deployment**: Firebase hosting deployment

## Code Quality

### ESLint

- Next.js recommended configuration
- Custom rules for code quality

### Prettier

- Automatic code formatting
- Integrated with lint-staged

### TypeScript

- Strict type checking
- No implicit any types

## Deployment

### Firebase Hosting

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

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm run test:all`
5. Commit your changes: `git commit -m "feat: add your feature"`
6. Push to the branch: `git push origin feature/your-feature`
7. Create a Pull Request

## License

This project is licensed under the MIT License.
