# System Calls - File System Operations Simulator

## Problem Statement

Implement a file system operations simulator that processes a sequence of system calls and manages file descriptors. Your simulator must handle file operations including opening, reading, writing, closing files, and listing open file descriptors.

In Unix-like operating systems, file descriptors are integer handles that represent open files. Your task is to simulate this behavior by tracking file descriptors and their associated state.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of operations)
Next N lines: OPERATION arguments
```

### Supported Operations:
- **OPEN filename mode** - Opens a file with the specified mode and returns a file descriptor
- **READ fd num_bytes** - Reads the specified number of bytes from the file descriptor
- **WRITE fd data** - Writes data to the file descriptor
- **CLOSE fd** - Closes the file descriptor
- **LIST** - Lists all currently open file descriptors

### File Modes:
- `r` - Read only
- `w` - Write only  
- `rw` - Read and write

## Test Cases
**Input (`input1.txt`):**
```
7
OPEN file1.txt w
WRITE 3 hello world
READ 3 5
CLOSE 3
OPEN file2.txt r
LIST
CLOSE 4
```

**Expected Output (`expected1.txt`):**
```
OPENED file1.txt AS FD 3
WRITTEN 11 BYTES TO FD 3
ERROR: FD 3 NOT READABLE
CLOSED FD 3 (file1.txt)
OPENED file2.txt AS FD 4
FD 4: file2.txt (r)
CLOSED FD 4 (file2.txt)
```

**Additional Test Cases:** This question includes 100+ comprehensive test cases (input1.txt through input106.txt) covering basic operations, edge cases, performance scenarios, and complex usage patterns. See `testcases.md` for detailed documentation.

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand system call concepts and file descriptors
- Practice state management and error handling
- Learn about file operations and access modes
- Implement efficient data structures for tracking resources
- Handle edge cases in system programming

## Implementation Guidelines

### Key Requirements:
1. **File Descriptor Assignment**: Start from FD 3 (0,1,2 are reserved for stdin/stdout/stderr)
2. **Mode Validation**: Enforce read/write permissions based on file mode
3. **Error Handling**: Return appropriate error messages for invalid operations
4. **Resource Tracking**: Maintain state of all open file descriptors

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    open_files = {}  # fd -> file_info
    next_fd = 3
    
    for _ in range(n):
        line = input().strip()
        parts = line.split()
        operation = parts[0]
        
        if operation == "OPEN":
            # Handle file opening
            pass
        elif operation == "READ":
            # Handle reading from file descriptor
            pass
        elif operation == "WRITE":
            # Handle writing to file descriptor
            pass
        elif operation == "CLOSE":
            # Handle closing file descriptor
            pass
        elif operation == "LIST":
            # List all open file descriptors
            pass
```

### Go Example Structure:
```go
func solve() {
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    openFiles := make(map[int]FileInfo)
    nextFD := 3
    
    for i := 0; i < n; i++ {
        scanner.Scan()
        parts := strings.Fields(scanner.Text())
        operation := parts[0]
        
        switch operation {
        case "OPEN":
            // Handle file opening
        case "READ":
            // Handle reading
        case "WRITE":
            // Handle writing
        case "CLOSE":
            // Handle closing
        case "LIST":
            // List open files
        }
    }
}
```

## Constraints
- 1 ≤ N ≤ 100,000 (number of operations)
- File descriptors start from 3 and increment sequentially
- Filename length ≤ 100 characters
- Data length for WRITE operations ≤ 1000 characters
- Maximum 1000 simultaneously open file descriptors
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- Use a hash map/dictionary to efficiently track file descriptors
- Consider what information you need to store for each open file
- Handle error cases: invalid file descriptors, permission violations
- For LIST operation, output file descriptors in ascending order
- Reading from an empty file or beyond EOF should return "EOF"
- File content persists within the same file descriptor until closed
