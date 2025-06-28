# Test Cases for Memory-mapped Files Simulation

## Test Case Structure
This question uses a multi-line input format with a variable number of operations.

### Input Format Pattern:
```
Line 1: file_size (integer)
Line 2: num_operations (integer) 
Line 3 to 2+num_operations: operation specifications
```

### Output Format Pattern:
Each operation produces one output line:
- READ: space-separated byte values or "ERROR: Out of bounds"
- WRITE: "WRITE_OK" or "ERROR: Out of bounds"  
- SUM: integer sum or "ERROR: Out of bounds"

## Test Case 1: Basic Operations
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

**Description**: Tests basic READ, WRITE, and SUM operations on a 10-byte file. Initial file contains [0,1,2,3,4,5,6,7,8,9]. After WRITE operation, it becomes [0,1,2,3,4,100,101,7,8,9], so SUM 0 10 = 0+1+2+3+4+100+101+7+8+9 = 235.

## Test Case 2: Edge Cases and Error Handling
**Input (`input2.txt`):**
```
5
4
READ 0 5
READ 3 3
WRITE 10 50
SUM -1 2
```
**Expected Output (`expected2.txt`):**
```
0 1 2 3 4
ERROR: Out of bounds
ERROR: Out of bounds
ERROR: Out of bounds
```

**Description**: Tests boundary conditions and error handling. File size is 5 bytes [0,1,2,3,4]. READ 3 3 tries to read from position 3 with length 3, which would access positions 3,4,5 but position 5 is out of bounds. WRITE 10 and SUM -1 also trigger bounds errors.

## Test Case 3: Complex Operations with Large Data
**Input (`input3.txt`):**
```
1000
5
READ 995 5
WRITE 0 255 254 253
SUM 998 2
READ 0 3
```
**Expected Output (`expected3.txt`):**
```
995 996 997 998 999
WRITE_OK
1997
255 254 253
```

**Description**: Tests performance with larger file size (1000 bytes) and multiple operations. Initial file has values [0,1,2,...,999]. After WRITE 0 255 254 253, first three bytes become [255,254,253,3,4,...,999]. SUM 998 2 calculates 998+999=1997.

## Test Case Creation Rules
### Input Validation Rules:
1. file_size must be positive integer (1 ≤ file_size ≤ 100,000)
2. num_operations must be positive integer (1 ≤ num_operations ≤ 1,000)
3. Operation formats must match: READ/WRITE/SUM followed by valid parameters
4. All numeric parameters must be valid integers
5. WRITE values should be in range 0-255 (byte values)

### Output Format Rules:
1. READ operations output space-separated integers or error message
2. WRITE operations output "WRITE_OK" or error message
3. SUM operations output single integer or error message
4. Error message format: "ERROR: Out of bounds"
5. No trailing spaces or extra newlines

## Language-Specific Considerations
### Python Considerations:
- Use `sys.stdin.read().strip().split('\n')` for multi-line input
- Initialize file content with `list(range(file_size))`
- Use `map(int, values)` to convert string parameters to integers
- Handle bounds checking with proper comparison operators
- Use modulo operator for byte value constraints: `value % 256`

### Go Considerations:
- Use `bufio.NewScanner(os.Stdin)` for line-by-line reading
- Initialize slice with `make([]int, fileSize)`
- Use `strings.Split()` to parse operation parameters
- Use `strconv.Atoi()` for string to integer conversion
- Implement proper error handling for out-of-bounds access

## Validation Checklist
- [ ] Input has correct number of lines (2 + num_operations)
- [ ] file_size is positive and within constraints
- [ ] num_operations matches actual number of operation lines
- [ ] All operations follow correct format (READ/WRITE/SUM + parameters)
- [ ] Bounds checking implemented correctly
- [ ] WRITE operations handle byte value constraints
- [ ] Output format matches exactly (spaces, newlines, error messages)
- [ ] Performance acceptable for large inputs (file_size up to 100,000)

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    
    # Generate random file size and operations
    file_size = random.randint(10, 100)
    num_operations = random.randint(1, 10)
    
    operations = []
    for _ in range(num_operations):
        op_type = random.choice(['READ', 'write', 'sum'])
        if op_type == 'read':
            start = random.randint(0, file_size - 1)
            length = random.randint(1, min(10, file_size - start))
            operations.append(f"READ {start} {length}")
        elif op_type == 'write':
            start = random.randint(0, file_size - 1)
            num_values = random.randint(1, min(5, file_size - start))
            values = [random.randint(0, 255) for _ in range(num_values)]
            operations.append(f"WRITE {start} " + " ".join(map(str, values)))
        else:  # sum
            start = random.randint(0, file_size - 1)
            length = random.randint(1, min(10, file_size - start))
            operations.append(f"SUM {start} {length}")
    
    input_content = f"{file_size}\n{num_operations}\n" + "\n".join(operations) + "\n"
    return input_content

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split('\n')
    file_size = int(lines[0])
    num_operations = int(lines[1])
    
    # Validate input format
    assert len(lines) == 2 + num_operations, "Incorrect number of input lines"
    assert 1 <= file_size <= 100000, "File size out of range"
    assert 1 <= num_operations <= 1000, "Number of operations out of range"
    
    # Validate each operation format
    for i in range(num_operations):
        parts = lines[2 + i].split()
        assert parts[0] in ['READ', 'write', 'sum'], f"Invalid operation: {parts[0]}"
        assert len(parts) >= 3, "Insufficient operation parameters"
    
    # Validate output format
    output_lines = expected_content.strip().split('\n')
    assert len(output_lines) == num_operations, "Output line count mismatch"
```
