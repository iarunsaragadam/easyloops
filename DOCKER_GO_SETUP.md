# Go Code Execution with Local Compiler

This project uses the local Go compiler to execute Go code securely. The implementation creates temporary files for Go code execution and cleans up afterward.

## How It Works

1. **API Endpoint**: The frontend sends Go code to the `/api/execute/go/` Next.js API route
2. **Temporary Files**: The API creates a temporary directory and saves the Go code to a file
3. **Local Execution**: The code is executed using the local Go compiler
4. **Result Processing**: The output is captured and returned to the frontend
5. **Cleanup**: Temporary files are removed after execution

## Prerequisites

- Go compiler installed on the server/development machine
- Next.js API routes enabled

## Setup Instructions

1. **Ensure Go is installed**:

```bash
go version
```

2. **Configure Next.js**:

Make sure your `next.config.js` doesn't have `output: 'export'` as this prevents API routes from working.

## Security Considerations

- **Resource Limits**: The execution has a 10-second timeout
- **Cleanup**: Temporary files are automatically removed after execution
- **Authentication**: Go execution requires user authentication

## Implementation Details

### API Route

The Go execution is handled by the `/api/execute/go/` API route, which:

1. Receives Go code from the frontend
2. Creates a temporary directory
3. Writes the code to a file
4. Executes the code with the local Go compiler
5. Returns the output to the frontend

### Frontend Integration

The frontend uses the `useGoExecution` hook to send code to the API and handle the results.

## Limitations

- **Test Cases**: Currently doesn't support test case execution
- **Input Handling**: Limited support for stdin input
- **File System Access**: No access to the file system beyond the temporary directory

## Future Improvements

- Add support for test cases
- Implement stdin input handling
- Add resource limits (memory, CPU)
- Support for multiple files and imports
