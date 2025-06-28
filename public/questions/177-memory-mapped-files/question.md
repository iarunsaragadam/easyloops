# Memory-mapped Files Simulation

## Problem Statement

Implement a simulation of memory-mapped file operations. Memory-mapped files allow programs to access files as if they were in memory, providing efficient random access to file data without explicit read/write system calls.

Your program should simulate a file system that supports the following operations:
1. **READ**: Read a sequence of bytes from a specific offset
2. **WRITE**: Write values to specific positions in the file  
3. **SUM**: Calculate the sum of bytes in a given range (useful for checksums)

The simulated file initially contains byte values equal to their position indices (0, 1, 2, 3, ..., file_size-1).

## Input Format

The input consists of multiple lines:
```
Line 1: file_size (size of the simulated file in bytes)
Line 2: num_operations (number of operations to perform)
Line 3 to 2+num_operations: operation specifications
```

### Operation Formats:
- `READ start_offset length` - Read `length` bytes starting from `start_offset`
- `WRITE start_offset value1 value2 ...` - Write values starting at `start_offset`
- `SUM start_offset length` - Calculate sum of `length` bytes from `start_offset`

## Test Cases
**Input (`input.txt`):**
```
10
3
READ 2 4
WRITE 5 100 101
SUM 0 10
```

**Expected Output (`expected.txt`):**
```
2 3 4 5
WRITE_OK
235
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand memory-mapped file concepts and benefits
- Practice implementing efficient file access patterns
- Learn about bounds checking and error handling in file operations
- Experience with simulating system-level operations
- Understand random access vs sequential access performance implications

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    import sys
    lines = sys.stdin.read().strip().split('\n')
    file_size = int(lines[0])
    num_operations = int(lines[1])
    
    # Initialize file content (position = value initially)
    file_content = list(range(file_size))
    
    for i in range(num_operations):
        operation = lines[2 + i].split()
        op_type = operation[0]
        
        if op_type == "READ":
            # Implement READ logic
            pass
        elif op_type == "WRITE":
            # Implement WRITE logic
            pass
        elif op_type == "SUM":
            # Implement SUM logic
            pass
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    
    scanner.Scan()
    fileSize, _ := strconv.Atoi(scanner.Text())
    
    scanner.Scan()
    numOps, _ := strconv.Atoi(scanner.Text())
    
    // Initialize file content
    fileContent := make([]int, fileSize)
    for i := 0; i < fileSize; i++ {
        fileContent[i] = i
    }
    
    // Process operations
    for i := 0; i < numOps; i++ {
        scanner.Scan()
        parts := strings.Split(scanner.Text(), " ")
        // Handle READ, WRITE, SUM operations
    }
}
```

## Constraints
- 1 ≤ file_size ≤ 100,000
- 1 ≤ num_operations ≤ 1,000
- All byte values are between 0 and 255
- Operations must handle bounds checking properly
- READ and SUM operations on invalid ranges should output "ERROR: Out of bounds"
- WRITE operations on invalid ranges should output "ERROR: Out of bounds"
- Valid WRITE operations should output "WRITE_OK"

## Hints
- Initialize the file content with values equal to position indices
- For WRITE operations, ensure written values stay within byte range (0-255)
- Bounds checking is crucial: verify start position and length don't exceed file size
- READ should output space-separated byte values
- SUM should output the total as a single integer
- Memory-mapped files in real systems provide direct memory access to file data for performance
