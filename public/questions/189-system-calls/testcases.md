# Test Cases for System Calls - File System Operations Simulator

## Test Case Structure
This question uses a multi-line input format for file system operations simulation.

### Input Format Pattern:
```
Line 1: N (number of operations)
Next N lines: OPERATION arguments
```

### Supported Operations:
- **OPEN filename mode** - Opens file with specified mode, returns file descriptor
- **READ fd num_bytes** - Reads specified bytes from file descriptor  
- **WRITE fd data** - Writes data to file descriptor
- **CLOSE fd** - Closes file descriptor
- **LIST** - Lists all open file descriptors

### Output Format Pattern:
```
OPENED filename AS FD fd_number
WRITTEN num_bytes BYTES TO FD fd_number  
READ: data_content
ERROR: FD fd_number NOT OPEN
ERROR: FD fd_number NOT READABLE/WRITABLE
CLOSED FD fd_number (filename)
FD fd_number: filename (mode)
NO OPEN FILES
EOF
```

## Test Case Categories (100+ Test Cases)

### Basic Test Cases (input1.txt - input25.txt)
Simple, straightforward file operations to verify core functionality.

**Example - Test Case 1 (`input1.txt`):**
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

**Example - Test Case 2 (`input2.txt`):**
```
4
OPEN file.txt rw
WRITE 3 hello
READ 3 5
CLOSE 3
```
**Expected Output (`expected2.txt`):**
```
OPENED file.txt AS FD 3
WRITTEN 5 BYTES TO FD 3
READ: hello
CLOSED FD 3 (file.txt)
```

### Edge Cases (input26.txt - input50.txt)
Boundary conditions, error scenarios, and special cases.

**Key Edge Cases:**
- Invalid file descriptor operations
- Permission violations (read from write-only, write to read-only)
- Double close attempts
- Operations on empty file lists
- Zero-byte reads
- Reading from empty files
- Large read requests on small files

### Performance Test Cases (input51.txt - input80.txt)
Large inputs designed to test algorithmic efficiency and timeout poor implementations.

**Performance Characteristics:**
- Up to 50 simultaneously open files
- Up to 500 operations per test case
- Large data writes (100+ characters)
- Extensive LIST operations
- Tests that will timeout O(n²) solutions using inefficient data structures

### Complex Scenarios (input81.txt - input106.txt)
Multiple edge cases combined and realistic usage patterns.

**Complex Features:**
- Interleaved read/write operations
- Mixed file modes (r, w, rw)
- Sequential file operations with intermediate closures
- Multiple phases: open → operate → close
- Stress testing file descriptor management

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain valid integer N (1 ≤ N ≤ 100,000)
2. Each operation line must follow format: OPERATION arguments
3. File descriptors are integers starting from 3
4. Filenames are strings without spaces (≤ 100 characters)
5. File modes must be 'r', 'w', or 'rw'
6. Data for WRITE operations can contain spaces (≤ 1000 characters)
7. num_bytes for READ operations must be non-negative integers

### Output Format Rules:
1. Each operation produces exactly one output line
2. File descriptors are assigned sequentially starting from 3
3. Error messages use exact format: "ERROR: FD {fd} NOT {CONDITION}"
4. LIST output shows file descriptors in ascending order
5. No trailing spaces or extra whitespace
6. EOF returned when reading beyond available content
7. Empty LIST shows "NO OPEN FILES"

### Algorithm Performance Requirements:
- **Efficient Solutions**: O(1) average time per operation using hash maps
- **Poor Solutions**: O(n) per operation using linear search through lists
- **Test Case Design**: Large test cases will timeout O(n²) total complexity

## Language-Specific Considerations

### Python Considerations:
- Use dictionaries for O(1) file descriptor lookup
- Handle string parsing with split() and join()
- Use f-strings for consistent output formatting
- Consider memory efficiency for large data writes

### Go Considerations:
- Use maps for efficient file descriptor tracking
- Handle string tokenization with strings.Fields()
- Use fmt.Printf for formatted output
- Manage memory carefully with large operations

### Data Structure Recommendations:
- **HashMap/Dictionary**: file_descriptor → file_info
- **File Info Structure**: filename, mode, content, position
- **Sequential FD Assignment**: increment counter starting from 3

## Validation Checklist
- [ ] Input format matches specification (N followed by N operations)
- [ ] All file descriptors assigned sequentially from 3
- [ ] Error handling for invalid file descriptors
- [ ] Permission checking (read/write mode validation)
- [ ] LIST operation outputs in ascending FD order
- [ ] Output format exactly matches expected patterns
- [ ] Performance test cases include 50+ files and 500+ operations
- [ ] Edge cases cover all error conditions
- [ ] Complex scenarios test realistic usage patterns
- [ ] All test cases have been verified with working solution

## Automated Test Case Generation

```python
def generate_test_case():
    """
    Generate a random test case with specified characteristics.
    Returns tuple (input_text, expected_output)
    """
    operations = []
    num_ops = random.randint(5, 20)
    open_fds = []
    next_fd = 3
    
    for i in range(num_ops):
        operation_type = random.choice(['OPEN', 'READ', 'WRITE', 'CLOSE', 'LIST'])
        
        if operation_type == 'OPEN':
            filename = f"file{random.randint(1, 100)}.txt"
            mode = random.choice(['r', 'w', 'rw'])
            operations.append(f"OPEN {filename} {mode}")
            open_fds.append((next_fd, mode))
            next_fd += 1
            
        elif operation_type == 'READ' and open_fds:
            fd, mode = random.choice(open_fds)
            if 'r' in mode:
                num_bytes = random.randint(1, 20)
                operations.append(f"READ {fd} {num_bytes}")
                
        elif operation_type == 'WRITE' and open_fds:
            fd, mode = random.choice(open_fds)
            if 'w' in mode:
                data = f"data{random.randint(1, 100)}"
                operations.append(f"WRITE {fd} {data}")
                
        elif operation_type == 'CLOSE' and open_fds:
            fd, mode = random.choice(open_fds)
            operations.append(f"CLOSE {fd}")
            open_fds.remove((fd, mode))
            
        elif operation_type == 'LIST':
            operations.append("LIST")
    
    input_text = f"{len(operations)}\n" + "\n".join(operations)
    return input_text

def validate_test_case(input_content, expected_content):
    """
    Validate a test case by running it through the solution.
    Returns True if the expected output matches actual output.
    """
    # Run solution with input and compare with expected
    actual_output = run_solution(input_content)
    return actual_output.strip() == expected_content.strip()
```

## Performance Testing Strategy

### Time Complexity Analysis:
- **Target**: O(n) total time for n operations
- **Efficient**: O(1) average per operation with hash map lookup
- **Inefficient**: O(k) per operation with linear search (k = open files)
- **Worst Case**: O(n²) total time will timeout on large test cases

### Test Case Distribution:
- **Small** (1-10 operations): 40 test cases
- **Medium** (11-50 operations): 40 test cases  
- **Large** (51-500 operations): 26 test cases
- **Edge cases distributed across all sizes**

### Memory Requirements:
- **Efficient**: O(k) space for k open files
- **Maximum**: 1000 open files × 1000 chars/file = 1MB content storage
- **Reasonable**: Most test cases under 100KB total memory
