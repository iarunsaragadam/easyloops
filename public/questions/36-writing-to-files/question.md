# File Operations Simulator

## Problem Statement

Create a program that simulates file writing and reading operations. Your program will process a series of file operation commands and output the results of each operation.

This problem teaches fundamental concepts of file handling including writing content to files, appending data, creating files, and reading file contents. While the program simulates these operations (for compatibility with testing systems), it demonstrates the key concepts used in real file I/O operations.

Your program should handle the following commands:
- **write** `<filename>` `<content>` - Write content to a file (overwrites existing content)
- **append** `<filename>` `<content>` - Append content to an existing file (or create if doesn't exist)
- **create** `<filename>` - Create an empty file
- **read** `<filename>` - Read and display the current content of a file

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations, 1 ≤ n ≤ 1000)
Lines 2 to n+1: file operation commands
```

Each command follows one of these formats:
- `write filename content` - Write content to filename
- `append filename content` - Append content to filename  
- `create filename` - Create empty filename
- `read filename` - Read content from filename

## Test Cases
**Input (`input1.txt`):**
```
4
write data.txt Hello World
append data.txt !
create empty.txt
read data.txt
```

**Expected Output (`expected1.txt`):**
```
WRITE: data.txt (11 chars)
APPEND: data.txt (12 total chars)
CREATE: empty.txt
READ: data.txt = Hello World!
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand file writing operations and their behavior
- Learn about file creation, writing, and appending modes
- Practice string manipulation and command parsing
- Understand file state management in memory
- Learn to handle different file operation scenarios

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Read number of operations
    n = int(input().strip())
    
    # Dictionary to track file contents
    files = {}
    
    for _ in range(n):
        line = input().strip()
        parts = line.split(' ', 2)  # Split into command, filename, content
        command = parts[0].lower()
        
        if command == "write":
            filename = parts[1]
            content = parts[2] if len(parts) > 2 else ""
            files[filename] = content
            print(f"WRITE: {filename} ({len(content)} chars)")
        
        # Implement other commands...
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    scanner.Scan() // consume newline
    
    files := make(map[string]string)
    
    for i := 0; i < n; i++ {
        scanner.Scan()
        line := scanner.Text()
        parts := strings.SplitN(line, " ", 3)
        command := strings.ToLower(parts[0])
        
        if command == "write" {
            filename := parts[1]
            content := ""
            if len(parts) > 2 {
                content = parts[2]
            }
            files[filename] = content
            fmt.Printf("WRITE: %s (%d chars)\n", filename, len(content))
        }
        
        // Implement other commands...
    }
}
```

## Constraints

- Number of operations: 1 ≤ n ≤ 1000
- Filename length: 1 ≤ length ≤ 50 characters
- Content length: 0 ≤ length ≤ 1000 characters per operation
- Total content per file: ≤ 10000 characters
- Filenames contain only alphanumeric characters, dots, and underscores
- Content may contain any printable ASCII characters including spaces

## Hints

- Use a dictionary/map to store file contents in memory
- Split input commands carefully - content may contain spaces
- Handle edge cases like empty content or non-existent files
- For read operations, check if file exists before reading
- Remember that write overwrites while append adds to existing content
