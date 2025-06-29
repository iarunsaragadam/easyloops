# Go Language Integration for EasyLoops

This document describes how Go language support is implemented in EasyLoops.

## Overview

The Go integration allows users to write, execute, and test Go code directly in the EasyLoops platform. It uses the local Go compiler installed on the server rather than containerization for better performance and compatibility with various platforms.

## Features

- **Go Language Support**: Write and execute Go code in the browser
- **Input Support**: Pass input to Go programs for interactive execution
- **Test Cases**: Run Go code against test cases
- **Authentication**: Go language access is restricted to authenticated users
- **Syntax Highlighting**: Full syntax highlighting for Go code

## Implementation Details

### API Endpoint

The Go execution is handled by a Next.js API route at `/api/execute/go`. This endpoint:

1. Receives Go code and optional input from the client
2. Creates a temporary directory to store the code and input
3. Executes the Go code using the local Go compiler
4. Returns the output or any errors that occurred during execution

### Code Execution Flow

1. User submits Go code through the UI
2. The code is sent to the API endpoint
3. A temporary directory is created for execution
4. The Go code is written to a file in this directory
5. If input is provided, it's written to an input file
6. The Go compiler runs the code
7. Output and/or errors are returned to the client
8. The temporary directory is cleaned up

### Input Handling

The Go execution supports input via stdin. When input is provided:

- The input is written to a file
- The Go program reads from stdin using the `cat input.txt | go run main.go` pattern

### Error Handling

The integration provides user-friendly error messages for:

- Compilation errors
- Runtime errors
- Timeout errors (execution limited to 10 seconds)

## Testing

You can test the Go execution using:

1. The main EasyLoops interface with Go selected as the language
2. The test page at `/test-go-with-input.html`

## Requirements

For the server:

- Go compiler installed and available in the system PATH
- Node.js and Next.js for the API routes

## Limitations

- Execution is limited to 10 seconds to prevent infinite loops
- External packages beyond the Go standard library are not supported
- File I/O operations are restricted to the temporary execution directory

## Future Improvements

- Support for custom Go modules and dependencies
- Enhanced test case support for Go programs
- Performance optimizations for faster execution

## Example Go Code

```go
package main

import (
	"fmt"
	"bufio"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// Read the number of rows
	scanner.Scan()
	n, _ := strconv.Atoi(scanner.Text())

	// Outer loop: iterate through rows (1 to n)
	for i := 1; i <= n; i++ {
		// Inner loop: print stars for current row
		for j := 0; j < i; j++ {
			fmt.Print("*")
		}
		fmt.Println() // Move to next line after each row
	}
}
```

### Example Input

```
5
```

### Expected Output

```
*
**
***
****
*****
```
