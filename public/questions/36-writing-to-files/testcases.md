# Test Cases for File Operations Simulator

## Test Case Structure
This question uses a multi-line input format with file operation commands.

### Input Format Pattern:
```
Line 1: n (number of operations)
Lines 2 to n+1: file operation commands
```

### Output Format Pattern:
```
One line per operation showing the result:
- WRITE: filename (X chars)
- APPEND: filename (X total chars) 
- CREATE: filename
- READ: filename = content
- ERROR: Invalid command
```

## Test Case Categories

### Basic Test Cases (input1.txt to input30.txt)
Simple file operations to verify basic functionality:

**Test Case 1: Basic Write Operations**
**Input (`input1.txt`):**
```
3
write file1.txt Hello
write file2.txt World
read file1.txt
```
**Expected Output (`expected1.txt`):**
```
WRITE: file1.txt (5 chars)
WRITE: file2.txt (5 chars)
READ: file1.txt = Hello
```

**Test Case 2: Append Operations**
**Input (`input2.txt`):**
```
4
write log.txt Start
append log.txt ing
append log.txt Application
read log.txt
```
**Expected Output (`expected2.txt`):**
```
WRITE: log.txt (5 chars)
APPEND: log.txt (8 total chars)
APPEND: log.txt (19 total chars)
READ: log.txt = StartingApplication
```

### Edge Cases (input31.txt to input60.txt)
Boundary conditions and special scenarios:

**Test Case 31: Empty Content**
**Input (`input31.txt`):**
```
3
write empty.txt
append empty.txt
read empty.txt
```
**Expected Output (`expected31.txt`):**
```
WRITE: empty.txt (0 chars)
APPEND: empty.txt (0 total chars)
READ: empty.txt = 
```

**Test Case 32: Non-existent File Read**
**Input (`input32.txt`):**
```
1
read missing.txt
```
**Expected Output (`expected32.txt`):**
```
READ: missing.txt = FILE_NOT_FOUND
```

### Performance Test Cases (input61.txt to input90.txt)
Large inputs that test efficiency:

**Test Case 61: Many Write Operations**
**Input (`input61.txt`):**
```
1000
write file1.txt content1
write file2.txt content2
...
(1000 write operations)
```
**Expected Output (`expected61.txt`):**
```
WRITE: file1.txt (8 chars)
WRITE: file2.txt (8 chars)
...
(1000 corresponding outputs)
```

### Complex Scenarios (input91.txt to input100.txt)
Multiple operations on same files, mixed commands:

**Test Case 91: File Overwriting**
**Input (`input91.txt`):**
```
5
write data.txt First
append data.txt Second
write data.txt Third
append data.txt Fourth
read data.txt
```
**Expected Output (`expected91.txt`):**
```
WRITE: data.txt (5 chars)
APPEND: data.txt (11 total chars)
WRITE: data.txt (5 chars)
APPEND: data.txt (10 total chars)
READ: data.txt = ThirdFourth
```

## Test Case Creation Rules

### Input Validation Rules:
1. Number of operations must be between 1 and 1000
2. Filenames must be 1-50 characters, alphanumeric + dots + underscores
3. Content can be 0-1000 characters per operation
4. Commands must be: write, append, create, or read
5. Total content per file should not exceed 10000 characters

### Output Format Rules:
1. WRITE operations show filename and character count
2. APPEND operations show filename and total character count after append
3. CREATE operations show just the filename
4. READ operations show filename = content (or FILE_NOT_FOUND)
5. Invalid commands show "ERROR: Invalid command"

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read lines cleanly
- Use `line.split(' ', 2)` to split command from content properly
- Handle empty content cases with `parts[2] if len(parts) > 2 else ""`
- Use dictionary to track file contents: `files = {}`

### Go Considerations:
- Use `strings.SplitN(line, " ", 3)` for proper command parsing
- Use `make(map[string]string)` for file tracking
- Handle scanner properly with `scanner.Scan()` and `scanner.Text()`
- Use `strings.ToLower()` for command normalization

### JavaScript Considerations:
- Use `readline` module for input reading
- Split with `line.split(/\s+/, 3)` for command parsing
- Use `Map` or plain object for file storage
- Handle async input reading properly

## Validation Checklist
- [ ] Input has valid number of operations (1-1000)
- [ ] All commands are valid (write/append/create/read)
- [ ] Filenames are valid format
- [ ] Content length is within limits
- [ ] Output format matches exactly
- [ ] Edge cases handled (empty content, missing files)
- [ ] Performance cases test algorithm efficiency

## Automated Test Case Generation
```python
def generate_basic_test_case(case_num):
    """Generate basic test cases with simple operations"""
    operations = [
        f"write file{case_num}.txt content{case_num}",
        f"read file{case_num}.txt"
    ]
    return f"{len(operations)}\n" + "\n".join(operations)

def generate_performance_test_case(num_ops):
    """Generate performance test with many operations"""
    operations = []
    for i in range(num_ops):
        operations.append(f"write file{i}.txt content{i}")
    return f"{num_ops}\n" + "\n".join(operations)

def validate_test_case(input_content, expected_content):
    """Validate test case format and consistency"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate number of operations
    if n != len(lines) - 1:
        return False, "Operation count mismatch"
    
    # Validate each command
    for i in range(1, n + 1):
        parts = lines[i].split(' ', 2)
        if parts[0] not in ['write', 'append', 'create', 'read']:
            return False, f"Invalid command: {parts[0]}"
    
    return True, "Valid test case"
```
