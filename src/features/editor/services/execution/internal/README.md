# Internal Execution System

This directory contains internal implementation details for the code execution system.

## Structure

```
internal/
├── logger.ts                    # Structured logging utility

├── wasm-runtimes/              # WASM-based language runtime implementations
│   ├── index.ts               # Clean exports for internal use
│   ├── PyodideRuntime.ts      # Python execution via Pyodide WASM
│   ├── QuickJsRuntime.ts      # JavaScript/TypeScript execution via QuickJS WASM
│   └── RubyRuntime.ts         # Ruby execution via Ruby WASM
└── README.md                  # This file
```

## WASM Runtimes

The `wasm-runtimes/` directory contains language-specific WASM runtime implementations:

- **PyodideRuntime**: Python execution using Pyodide WASM
- **QuickJsRuntime**: JavaScript/TypeScript execution using QuickJS WASM
- **RubyRuntime**: Ruby execution using Ruby WASM

These runtimes are internal implementation details and should only be accessed through:

- `WasmManager` - for runtime management
- `WasmBackend` - for execution strategy
- `CodeExecutionService` - for public API access

## Future Expansion

This structure allows for future expansion with other execution strategies:

```
internal/
├── wasm-runtimes/             # Current WASM-based runtimes
├── judge0-runtimes/           # Future Judge0-based runtimes
├── docker-runtimes/           # Future Docker-based runtimes
├── cloud-runtimes/            # Future cloud-based runtimes
└── ...
```

## Logging

All execution engines use the structured logger for consistent logging throughout the execution pipeline. Logs include:

- Initialization and loading events
- Code execution progress
- Test case processing
- Error handling with context
- Performance metrics
