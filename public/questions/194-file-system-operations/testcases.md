# Test Cases for File System Operations Simulator

## Test Case Structure

This question uses a multi-line input format where the first line contains the number of operations, followed by file system commands.

### Input Format Pattern:
```
Line 1: N (number of operations)
Line 2 to N+1: Commands in format "COMMAND [arguments]"
```

### Output Format Pattern:
```
One line of output per command, showing either:
- Success message for operations (mkdir, touch, rm, cd)
- Query results (pwd, ls, find, size, count)
- Error messages for invalid operations
```

## Test Case Categories (100+ Total Test Cases)

### Basic Test Cases (input1.txt - input25.txt)
Simple operations to verify core functionality:

**Test Case 1: Basic Directory Operations**
- pwd, mkdir, ls, cd operations
- Verify directory creation and navigation

**Test Case 2: Basic File Operations** 
- touch, rm operations on files
- Verify file creation and deletion

**Test Case 3: Path Resolution**
- Absolute and relative paths
- Current directory (".") and parent ("..") navigation

**Test Cases 4-25: Individual command testing**
- Each command tested in isolation
- Various valid argument combinations

### Edge Cases (input26.txt - input50.txt)
Boundary conditions and special scenarios:

**Test Case 26: Empty Directory Operations**
- ls on empty directories
- rm on empty vs non-empty directories

**Test Case 27: Root Directory Special Cases**
- Operations on root "/"
- Attempting to remove root
- cd to root from various locations

**Test Case 28: Invalid Path Handling**
- Non-existent directories/files
- Invalid path formats
- Operations on wrong types (file vs directory)

**Test Case 29: Path Resolution Edge Cases**
- Multiple consecutive "/" in paths
- Paths ending with "/"
- ".." beyond root directory

**Test Cases 30-50: More edge cases**
- Long path names
- Special characters in names
- Deeply nested structures

### Performance Test Cases (input51.txt - input75.txt)
Large inputs that test algorithmic efficiency:

**Test Case 51: Deep Directory Structure**
- Create deeply nested directories (50+ levels)
- Test path resolution performance

**Test Case 52: Wide Directory Structure**
- Create directories with many children (100+ per level)
- Test ls and find operations

**Test Case 53: Large File Count**
- Create 500+ files across directory structure
- Test count and find operations

**Test Case 54: Mixed Operations at Scale**
- 800+ operations mixing all command types
- Test overall system performance

**Test Cases 55-75: Performance variations**
- Different combinations of large structures
- Stress testing specific operations

### Complex Scenarios (input76.txt - input100.txt)
Multiple edge cases combined:

**Test Case 76: Complete File System Simulation**
- Create complex directory structure
- Navigate through various paths
- Perform searches and calculations
- Clean up with removals

**Test Case 77: Path Resolution Marathon**
- Extensive use of "." and ".." in paths
- Complex relative path navigation
- Mixed absolute and relative operations

**Test Case 78: Error Recovery Testing**
- Invalid operations mixed with valid ones
- System should continue functioning after errors

**Test Cases 79-100: Advanced scenarios**
- Real-world usage patterns
- Complex combinations of operations
- Stress testing error handling

## Test Case Creation Rules

### Input Validation Rules:
1. **Operation count**: 1 ≤ N ≤ 1000
2. **Command format**: Valid command followed by correct number of arguments
3. **Path format**: Valid file system paths (no null characters, proper separators)
4. **Name validation**: Alphanumeric, dots, hyphens, underscores only
5. **Path length**: Maximum 1000 characters per path

### Output Format Rules:
1. **Success messages**: Consistent format "Operation 'path' completed"
2. **Error messages**: Descriptive error with command context
3. **Query results**: Clean, formatted output
4. **List output**: Space-separated items, alphabetically sorted
5. **Find output**: One path per line, sorted alphabetically
6. **Numeric output**: Plain integers for count/size operations

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to handle input properly
- Dictionary for efficient child node lookup
- Recursive functions for tree traversal
- String manipulation for path resolution
- Exception handling for invalid operations

### Go Considerations:
- Use maps for children nodes
- Pointer management for parent-child relationships
- String manipulation with `strings` package
- Error handling with appropriate return values
- Scanner for reading multi-line input

### JavaScript Considerations:
- Object properties for children nodes
- Proper handling of reference vs value semantics
- Array methods for sorting and filtering
- String methods for path manipulation

## Validation Checklist

- [ ] Each test case has exactly N+1 lines (N operations + count)
- [ ] All commands are valid and properly formatted
- [ ] Paths follow file system naming conventions
- [ ] Expected outputs match reference solution exactly
- [ ] Error cases produce appropriate error messages
- [ ] Performance cases stress-test the implementation
- [ ] Edge cases cover boundary conditions
- [ ] Complex scenarios test real-world usage

## Automated Test Case Generation

```python
def generate_basic_test_case(operations_count=10):
    """Generate basic test case with simple operations"""
    import random
    
    commands = []
    commands.append("pwd")  # Start with current directory
    
    # Generate random valid operations
    for i in range(operations_count - 1):
        cmd_type = random.choice(["mkdir", "touch", "ls", "cd"])
        if cmd_type == "mkdir":
            path = f"dir_{i}"
            commands.append(f"mkdir {path}")
        elif cmd_type == "touch":
            path = f"file_{i}.txt"
            commands.append(f"touch {path}")
        elif cmd_type == "ls":
            commands.append("ls")
        elif cmd_type == "cd":
            commands.append("cd ..")
    
    return commands

def generate_performance_test_case(depth=50, width=20):
    """Generate performance test case with deep/wide structure"""
    commands = []
    
    # Create deep directory structure
    path = ""
    for i in range(depth):
        path += f"/level_{i}"
        commands.append(f"mkdir {path}")
    
    # Create wide structure at each level
    for level in range(depth):
        base_path = "/".join([f"level_{i}" for i in range(level + 1)])
        for j in range(width):
            commands.append(f"mkdir {base_path}/dir_{j}")
            commands.append(f"touch {base_path}/file_{j}.txt")
    
    # Add search operations
    commands.append("find file_0.txt")
    commands.append("count files")
    commands.append("size /")
    
    return [str(len(commands))] + commands

def validate_test_case(input_content, expected_content):
    """Validate test case format and content"""
    lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Check operation count matches
    n = int(lines[0])
    if len(lines) != n + 1:
        return False, "Operation count doesn't match actual commands"
    
    # Validate each command format
    valid_commands = ['pwd', 'mkdir', 'touch', 'rm', 'ls', 'cd', 'find', 'size', 'count']
    for i, line in enumerate(lines[1:], 1):
        parts = line.split()
        if not parts or parts[0] not in valid_commands:
            return False, f"Invalid command on line {i+1}: {line}"
    
    # Check expected output length
    if len(expected_lines) != n:
        return False, "Expected output length doesn't match operation count"
    
    return True, "Test case is valid"
```

## Performance Requirements

### Time Complexity Targets:
- **Path resolution**: O(path_length) per operation
- **Directory listing**: O(children_count) 
- **Find operation**: O(total_nodes) worst case
- **Size calculation**: O(subtree_nodes)
- **Count operation**: O(total_nodes)

### Space Complexity Targets:
- **Overall space**: O(total_nodes) for the tree structure
- **Path resolution**: O(path_depth) for recursion stack

### Performance Test Criteria:
- Solutions with O(n²) path resolution should timeout
- Inefficient tree traversal (repeated full scans) should timeout
- Linear string concatenation for paths should be acceptable
- Proper tree structure required for good performance
