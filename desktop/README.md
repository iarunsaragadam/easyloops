# CodeQuest Desktop Application

A standalone desktop application for solving programming problems in Go and Python with offline execution and judging.

## 🚀 Features

- **Offline Code Execution**: Run Go and Python code locally without internet connection
- **Built-in Code Editor**: Monaco Editor with syntax highlighting and IntelliSense
- **Problem Library**: Curated collection of programming problems with varying difficulty levels
- **Real-time Testing**: Instant feedback with test case results and performance metrics
- **Progress Tracking**: Track your solving progress and coding statistics
- **Cross-platform**: Available for Windows, macOS, and Linux
- **Lightweight**: Single installer file, no CLI setup required

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Rust + Tauri
- **Code Editor**: Monaco Editor (VS Code engine)
- **State Management**: Zustand
- **Database**: SQLite (for local data storage)
- **Code Execution**: Wasmtime (WASI runtime)
- **Build System**: Tauri CLI

## 📋 Requirements

### Development Requirements

- Node.js 16+ and npm
- Rust 1.70+ and Cargo
- System dependencies for Tauri development

### For Users

- No requirements! Just download and run the installer.

## 🏗️ Development Setup

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd desktop
```

### 2. Install Frontend Dependencies

```bash
cd apps/desktop/frontend
npm install
```

### 3. Install Tauri CLI

```bash
npm install -g @tauri-apps/cli
```

### 4. Development Mode

```bash
# Start the development server
npm run tauri dev
```

This will:

- Start the React dev server on http://localhost:1420
- Launch the Tauri development window
- Enable hot reloading for both frontend and backend changes

## 🏭 Building for Production

### Build for Current Platform

```bash
cd apps/desktop/frontend
npm run tauri build
```

### Build for All Platforms (with GitHub Actions)

The repository includes GitHub Actions workflows for automated cross-platform builds:

- **Windows**: `.exe` installer
- **macOS**: `.dmg` installer
- **Linux**: `.AppImage` portable executable

Builds are triggered on:

- Pushes to `main` branch
- Pull requests
- Manual workflow dispatch

## 📁 Project Structure

```
desktop/
├── apps/
│   └── desktop/
│       ├── frontend/          # React frontend
│       │   ├── src/
│       │   │   ├── components/    # React components
│       │   │   ├── store/         # Zustand state management
│       │   │   ├── api/           # Tauri API interface
│       │   │   └── styles.css     # Application styles
│       │   ├── package.json
│       │   └── vite.config.ts
│       └── src-tauri/         # Rust backend
│           ├── src/
│           │   ├── main.rs        # Main application entry
│           │   ├── database.rs    # SQLite operations
│           │   ├── judge.rs       # Code evaluation logic
│           │   └── wasm_runner.rs # Code execution engine
│           ├── Cargo.toml
│           └── tauri.conf.json
├── problems/                  # Problem definitions
│   └── problem_list.json
└── README.md
```

## 🧩 Adding Problems

Problems are defined in JSON format in `problems/problem_list.json`:

```json
{
  "id": "unique-problem-id",
  "title": "Problem Title",
  "description": "Detailed problem description with examples",
  "difficulty": "Easy|Medium|Hard",
  "test_cases": [
    {
      "input": "sample input",
      "expected_output": "expected output"
    }
  ]
}
```

## 🎯 Usage

### For End Users

1. **Download**: Get the installer for your platform from the releases page
2. **Install**: Run the installer (no admin rights required)
3. **Launch**: Start CodeQuest from your applications menu
4. **Solve**: Choose a problem and start coding!

### Navigation

- **Problems Tab**: Browse and search available problems
- **Progress Tab**: View your solving statistics and history
- **Code Editor**: Write, test, and submit solutions
- **Test Results**: See detailed feedback for each test case

### Supported Languages

- **Python 3.9+**: Full standard library support
- **Go 1.19+**: Standard library and common packages

## 🔧 Configuration

### Problem Difficulty Levels

- **Easy**: Basic syntax and logic problems
- **Medium**: Algorithmic problems requiring data structures
- **Hard**: Complex algorithms and optimization challenges

### Performance Targets

- **Cold Start**: < 3 seconds
- **Memory Usage**: < 150MB during execution
- **Installer Size**: ≤ 80MB (Windows), ≤ 90MB (macOS)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

### Development Guidelines

- Follow Rust best practices for backend code
- Use TypeScript and functional components for frontend
- Write comprehensive tests for new features
- Update documentation for any API changes

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**

- Ensure Node.js 16+ is installed
- Check if port 1420 is available
- Run `npm install` in the frontend directory

**Build fails on Windows**

- Install Visual Studio Build Tools
- Ensure Windows SDK is available

**Build fails on macOS**

- Install Xcode Command Line Tools: `xcode-select --install`
- Check macOS version compatibility

**Build fails on Linux**

- Install required system dependencies:
  ```bash
  sudo apt update
  sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
  ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - For the excellent desktop app framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - For the powerful code editor
- [Wasmtime](https://wasmtime.dev/) - For the WebAssembly runtime
- [Judge0](https://judge0.com/) - For inspiration on code execution and judging

## 📈 Roadmap

- [ ] Add more programming languages (JavaScript, C++, Java)
- [ ] Implement competitive programming contest mode
- [ ] Add code templates and snippets
- [ ] Integrate with online judge platforms
- [ ] Add collaborative problem-solving features
- [ ] Implement custom test case creation
- [ ] Add performance profiling and analysis tools

---

**Happy Coding! 🎉**
