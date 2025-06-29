# CodeQuest Desktop

A standalone desktop application for solving programming problems in Python and Go, built with Tauri, React, and Monaco Editor.

## Features

- 🎯 **Offline-First**: Works completely offline with embedded runtimes and problems
- 💻 **VS Code-like Editor**: Monaco Editor with syntax highlighting, themes, and IntelliSense
- 🏃 **Code Execution**: Run Python and Go code using WASI runtimes (Wasmtime)
- 📊 **Progress Tracking**: Local SQLite database tracks submissions and progress
- 🎨 **Modern UI**: Dark theme with responsive design
- 🔄 **Auto-save**: Code automatically saves every 5 seconds to localStorage
- 📱 **Cross-platform**: Available for Windows, macOS, and Linux

## Tech Stack

### Backend (Rust)
- **Tauri**: Native desktop shell
- **Wasmtime**: WebAssembly runtime for code execution
- **SQLite**: Local database for submissions and progress
- **Tokio**: Async runtime

### Frontend (TypeScript/React)
- **React**: UI framework
- **Monaco Editor**: Code editor with VS Code features
- **Zustand**: State management
- **React Router**: Navigation
- **Vite**: Build tool

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React UI      │◄──►│  Tauri Commands  │◄──►│  Rust Backend   │
│                 │    │                  │    │                 │
│ - Monaco Editor │    │ - run_code       │    │ - WASM Runner   │
│ - Problem List  │    │ - load_problems  │    │ - Judge System  │
│ - Progress      │    │ - submit_solution│    │ - SQLite DB     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Directory Structure

```
desktop/
├── apps/desktop/
│   ├── src-tauri/          # Rust backend
│   │   ├── src/
│   │   │   ├── main.rs
│   │   │   ├── database.rs
│   │   │   ├── wasm_runner.rs
│   │   │   └── judge.rs
│   │   ├── runtimes/       # WASM runtime binaries
│   │   │   ├── python/
│   │   │   └── go/
│   │   └── Cargo.toml
│   ├── frontend/           # React frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   └── utils/
│   │   └── package.json
│   └── tauri.conf.json
├── problems/               # Problem definitions
│   └── problem_list.json
└── README.md
```

## Development Setup

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Node.js](https://nodejs.org/) (18+)
- [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd desktop
   ```

2. **Install frontend dependencies**
   ```bash
   cd apps/desktop/frontend
   npm install
   ```

3. **Install Tauri CLI**
   ```bash
   cargo install tauri-cli
   ```

### Development

1. **Start development server**
   ```bash
   cd apps/desktop
   cargo tauri dev
   ```

   This will:
   - Start the Vite dev server (frontend)
   - Build the Rust backend
   - Launch the desktop app with hot-reload

2. **Build for production**
   ```bash
   cd apps/desktop
   cargo tauri build
   ```

   This creates installers in `src-tauri/target/release/bundle/`

## Usage

### Running Problems

1. **Browse Problems**: Start with the problem list showing difficulty levels
2. **Select Problem**: Click on a problem to open the editor
3. **Choose Language**: Select Python or Go from the dropdown
4. **Write Code**: Use the Monaco editor with syntax highlighting
5. **Run Tests**: Click "Run Code" to execute against test cases
6. **Submit**: Click "Submit" when all tests pass

### Features

- **Auto-save**: Code saves automatically every 5 seconds
- **Language Switching**: Switch between Python and Go
- **Test Results**: View detailed execution results
- **Progress Tracking**: See your solved problems and statistics

## Configuration

### Adding Problems

Edit `problems/problem_list.json`:

```json
{
  "id": "problem-id",
  "title": "Problem Title",
  "description": "Problem description in markdown",
  "difficulty": "Easy|Medium|Hard",
  "test_cases": [
    {
      "input": "input string",
      "expected_output": "expected output"
    }
  ]
}
```

### Runtime Configuration

- **Memory Limit**: 128 MB per execution
- **Time Limit**: 2 seconds per test case
- **Fuel Limit**: 1,000,000 instructions via Wasmtime

## Security

- **Sandboxed Execution**: WASM provides memory and capability isolation
- **No Network Access**: Code execution is completely offline
- **Filesystem Isolation**: Limited to working directory only
- **Resource Limits**: CPU time and memory usage capped

## Build Targets

### Supported Platforms

- **Windows**: `.exe` installer (NSIS)
- **macOS**: `.dmg` installer  
- **Linux**: `.AppImage` and `.deb` packages

### Build Commands

```bash
# Windows
cargo tauri build --target x86_64-pc-windows-msvc

# macOS
cargo tauri build --target x86_64-apple-darwin
cargo tauri build --target aarch64-apple-darwin

# Linux
cargo tauri build --target x86_64-unknown-linux-gnu
```

## Performance Targets

- **Installer Size**: ≤ 80 MB Windows, ≤ 90 MB macOS
- **Cold Start**: ≤ 3 seconds on 2019 quad-core laptop
- **Memory Usage**: ≤ 150 MB idle
- **Test Execution**: ≤ 2 seconds per test case

## Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/name`
3. **Make changes with tests**
4. **Run checks**: `cargo clippy` and `npm run lint`
5. **Submit pull request**

## Roadmap

### MVP (Current)
- [x] Basic problem solving interface
- [x] Python and Go support
- [x] Local progress tracking
- [x] Cross-platform builds

### Future Enhancements
- [ ] WASI runtime integration for real code execution
- [ ] Python.wasm and TinyGo integration
- [ ] Language server protocol support
- [ ] More problem categories
- [ ] Contest mode
- [ ] Cloud sync (optional)

## License

MIT License - see LICENSE file for details

## Troubleshooting

### Common Issues

1. **Build fails on Windows**
   - Install Visual Studio Build Tools
   - Ensure WebView2 is installed

2. **Monaco Editor not loading**
   - Check network connectivity during development
   - Verify Vite dev server is running

3. **Code execution fails**
   - Currently using simulation mode
   - Full WASM integration pending

### Getting Help

- Check the [Issues](../../issues) page
- Review Tauri [documentation](https://tauri.app/)
- Join the community discussions

---

Built with ❤️ using Tauri, React, and Rust
