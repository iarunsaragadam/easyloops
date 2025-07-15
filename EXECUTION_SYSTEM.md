# Code Execution System - SOLID Architecture

## Overview

This document describes the restructured code execution system for EasyLoops, designed following SOLID principles to support both local (WASM) and cloud fallback execution per language.

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                    Code Execution System                       │
├─────────────────────────────────────────────────────────────────┤
│  CodeExecutionService                                           │
│  ├── CompositeExecutionStrategy (per language)                 │
│  │   ├── WasmBackend (primary)                                │
│  │   │   └── WasmManager                                       │
│  │   │       ├── PyodideRuntime (Python)                      │
│  │   │       ├── QuickJsRuntime (JS/TS)                       │
│  │   │       └── RubyRuntime (Ruby)                           │
│  │   └── Judge0Backend (fallback)                             │
│  └── Authentication & Submission Management                    │
└─────────────────────────────────────────────────────────────────┘
```

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

Each class has a single, well-defined responsibility:

- **`WasmRuntime`**: Manages a single WASM runtime (Python, JS, Ruby)
- **`WasmManager`**: Manages multiple WASM runtimes
- **`ExecutionBackend`**: Handles execution for a specific backend (WASM/Judge0)
- **`CompositeExecutionStrategy`**: Manages fallback between backends
- **`CodeExecutionService`**: Orchestrates the entire execution process

### 2. Open/Closed Principle (OCP)

The system is open for extension but closed for modification:

- New WASM runtimes can be added by implementing `WasmRuntime`
- New backends can be added by implementing `ExecutionBackend`
- New execution strategies can be added by implementing `ExecutionStrategy`

### 3. Liskov Substitution Principle (LSP)

All implementations are substitutable for their interfaces:

- Any `WasmRuntime` can be used in `WasmManager`
- Any `ExecutionBackend` can be used in `CompositeExecutionStrategy`
- Any `ExecutionStrategy` can be used in `CodeExecutionService`

### 4. Interface Segregation Principle (ISP)

Interfaces are focused and specific:

- `WasmRuntime` only defines WASM-specific methods
- `ExecutionBackend` only defines backend-specific methods
- `ExecutionStrategy` only defines strategy-specific methods

### 5. Dependency Inversion Principle (DIP)

High-level modules depend on abstractions, not concretions:

- `CodeExecutionService` depends on `ExecutionStrategy` interface
- `CompositeExecutionStrategy` depends on `ExecutionBackend` interface
- `WasmManager` depends on `WasmRuntime` interface

## Interface Definitions

### WasmRuntime Interface

```typescript
interface WasmRuntime {
  language: string;
  isLoaded(): boolean;
  load(): Promise<void>;
  execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult>;
}
```

### ExecutionBackend Interface

```typescript
interface ExecutionBackend {
  language: string;
  isAvailable(): boolean;
  requiresAuth(): boolean;
  execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult>;
}
```

### ExecutionStrategy Interface

```typescript
interface ExecutionStrategy {
  execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult>;
  isAvailable(): boolean;
  requiresAuth(): boolean;
}
```

## Implementation Details

### WASM Runtime Implementations

#### PyodideRuntime (Python)

- **Purpose**: Executes Python code using Pyodide WASM
- **Features**: 
  - Automatic Pyodide loading from CDN
  - Stdin/stdout handling
  - Error capture and reporting
  - Test case execution with normalization

#### QuickJsRuntime (JavaScript/TypeScript)

- **Purpose**: Executes JavaScript/TypeScript using QuickJS WASM
- **Features**:
  - Supports both JavaScript and TypeScript
  - Simple TypeScript transpilation
  - Context isolation per test case
  - Console.log capture

#### RubyRuntime (Ruby)

- **Purpose**: Placeholder for Ruby WASM execution
- **Status**: Not implemented (Ruby WASM is experimental)
- **Fallback**: Uses Judge0 backend

### Backend Implementations

#### WasmBackend

- **Purpose**: Wraps WasmManager for a specific language
- **Features**:
  - No authentication required
  - Fast local execution
  - Fallback on failure

#### Judge0Backend

- **Purpose**: Cloud execution using Judge0 API
- **Features**:
  - Requires authentication
  - Supports all major languages
  - Handles compilation and runtime errors
  - Polling-based result retrieval

### Strategy Implementation

#### CompositeExecutionStrategy

- **Purpose**: Manages multiple backends with fallback
- **Features**:
  - Tries backends in order
  - Automatic fallback on failure
  - Backend status monitoring
  - Runtime backend management

## Language Support Matrix

| Language   | WASM Support | Judge0 Support | Auth Required |
|------------|--------------|----------------|---------------|
| Python     | ✅ Primary   | ✅ Fallback    | No (WASM)     |
| JavaScript | ✅ Primary   | ✅ Fallback    | No (WASM)     |
| TypeScript | ✅ Primary   | ✅ Fallback    | No (WASM)     |
| Ruby       | ❌ Planned   | ✅ Primary     | Yes           |
| Go         | ❌ N/A       | ✅ Primary     | Yes           |
| C          | ❌ N/A       | ✅ Primary     | Yes           |
| C++        | ❌ N/A       | ✅ Primary     | Yes           |
| Java       | ❌ N/A       | ✅ Primary     | Yes           |
| Rust       | ❌ N/A       | ✅ Primary     | Yes           |

## Usage Examples

### Basic Usage

```typescript
// Initialize service
const service = new CodeExecutionService(user);

// Execute code
const result = await service.executeCode(
  'print("Hello, World!")',
  testCases,
  'python'
);

// Execute and submit
const { result, submission } = await service.executeAndSubmit(
  'print("Hello, World!")',
  testCases,
  'python',
  'question-id'
);
```

### Advanced Usage

```typescript
// Custom WASM manager
const customWasmManager = new WasmManager([
  new PyodideRuntime(),
  new QuickJsRuntime('javascript'),
]);

const service = new CodeExecutionService(
  user,
  'https://custom-judge0.com',
  customWasmManager
);

// Check language availability
const available = service.isLanguageAvailable('python');
const requiresAuth = service.requiresAuth('python');

// Get detailed status
const status = service.getLanguageStatus();
const wasmStatus = service.getWasmStatus();
```

## Testing Strategy

### Unit Tests

Each component is tested independently:

1. **WasmRuntime Tests**:
   - Load behavior
   - Execute behavior
   - Error handling
   - Mock external dependencies

2. **WasmManager Tests**:
   - Runtime registration
   - Dispatch logic
   - Error handling
   - Status reporting

3. **CompositeExecutionStrategy Tests**:
   - Fallback behavior
   - Backend management
   - Error propagation
   - Status aggregation

4. **CodeExecutionService Tests**:
   - Language registration
   - Execution modes
   - Authentication logic
   - Submission creation

### Integration Tests

Test interactions between components:

1. **End-to-end execution flow**
2. **Fallback scenarios**
3. **Error recovery**
4. **Performance benchmarks**

## Performance Characteristics

### WASM Execution

- **Latency**: ~100-500ms (after loading)
- **Throughput**: High (local execution)
- **Memory**: Isolated per runtime
- **Security**: Sandboxed execution

### Judge0 Execution

- **Latency**: ~1-5s (network + compilation)
- **Throughput**: Limited by API rate limits
- **Memory**: Server-side isolation
- **Security**: Full system isolation

## Security Considerations

### WASM Security

- **Sandbox**: WebAssembly provides memory isolation
- **Network**: No network access from WASM
- **File System**: No file system access
- **CPU**: Time limits enforced by browser

### Judge0 Security

- **Authentication**: Required for execution
- **Rate Limiting**: Prevents abuse
- **Resource Limits**: Memory and CPU constraints
- **Network Isolation**: No network access during execution

## Future Enhancements

### Planned Features

1. **WebAssembly Improvements**:
   - C/C++ compilation to WASM
   - Rust WASM runtime
   - Go WASM runtime (experimental)

2. **Performance Optimizations**:
   - Runtime caching
   - Parallel test execution
   - Result streaming

3. **Enhanced Security**:
   - Stricter sandboxing
   - Resource monitoring
   - Audit logging

4. **Developer Experience**:
   - Better error messages
   - Debugging support
   - Performance profiling

### Extension Points

The system is designed to be extensible:

1. **New Runtimes**: Implement `WasmRuntime` interface
2. **New Backends**: Implement `ExecutionBackend` interface
3. **New Strategies**: Implement `ExecutionStrategy` interface
4. **Custom Managers**: Create specialized `WasmManager` variants

## Migration Guide

### From Old System

1. **Update imports**:
   ```typescript
   // Old
   import { CodeExecutionService } from './CodeExecutionService';
   
   // New
   import { CodeExecutionService } from './execution';
   ```

2. **Update constructor**:
   ```typescript
   // Old
   new CodeExecutionService(pyodideManager, user);
   
   // New
   new CodeExecutionService(user);
   ```

3. **Update hooks**:
   ```typescript
   // Old
   const { executeCode } = useCodeExecution(pyodideManager);
   
   // New
   const { executeCode } = useCodeExecution();
   ```

### Testing Migration

1. **Update test imports**
2. **Mock new dependencies**
3. **Update test scenarios**
4. **Add new test cases**

## Troubleshooting

### Common Issues

1. **WASM Loading Failures**:
   - Check network connectivity
   - Verify CDN availability
   - Clear browser cache

2. **Judge0 Execution Failures**:
   - Verify API key configuration
   - Check rate limits
   - Confirm user authentication

3. **Fallback Not Working**:
   - Check backend availability
   - Verify error handling
   - Review logs for details

### Debug Tools

1. **Language Status**: `service.getLanguageStatus()`
2. **WASM Status**: `service.getWasmStatus()`
3. **Backend Status**: `strategy.getBackendStatus()`

## Conclusion

The new execution system provides a robust, extensible, and maintainable architecture that follows SOLID principles. It supports both local WASM execution for fast feedback and cloud fallback for comprehensive language support, while maintaining security and performance.

The system is designed to be production-ready with comprehensive error handling, testing, and monitoring capabilities.