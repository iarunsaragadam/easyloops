# Test Cases for Function Calculator - Function Pointers/References

## Test Case Structure
This question uses a multi-line input format where the first line specifies the number of operations, followed by operation specifications.

### Input Format Pattern:
```
Line 1: n (number of operations, 1 ≤ n ≤ 1000)
Lines 2 to n+1: operation_name operand1 operand2
```

### Output Format Pattern:
```
Line 1 to n: result of each operation
```

## Test Case Categories

### Basic Test Cases (input1.txt to input30.txt)
- Simple arithmetic operations with positive integers
- Each operation type (ADD, SUB, MUL, DIV, POW, MOD) tested individually
- Small operand values to verify basic functionality
- Mixed operations to test function pointer switching

### Edge Cases (input31.txt to input60.txt)
- Division by zero scenarios (DIV x 0, MOD x 0)
- Operations with zero operands
- Operations with negative numbers
- Invalid operation names
- Single operation cases (n=1)
- Maximum operations cases (n=1000)

### Performance Test Cases (input61.txt to input90.txt)
- Large number of operations (500-1000 operations)
- Large operand values (close to ±1,000,000)
- Repeated operations to test function pointer efficiency
- Mixed large calculations

### Complex Scenarios (input91.txt to input100.txt)
- Combinations of edge cases
- Floating-point precision testing
- Mixed valid and invalid operations
- Boundary value testing

## Detailed Test Case Examples

### Test Case 1: Basic Operations
**Input (`input1.txt`):**
```
5
ADD 10 5
SUB 20 8
MUL 7 6
DIV 15 3
POW 2 4
```
**Expected Output (`expected1.txt`):**
```
15
12
42
5
16
```

### Test Case 2: Edge Cases
**Input (`input2.txt`):**
```
6
DIV 10 0
MOD 15 0
DIV 22 7
MOD 17 5
INVALID_OP 5 3
ADD 0 0
```
**Expected Output (`expected2.txt`):**
```
ERROR
ERROR
3.142857
2
INVALID
0
```

### Test Case 3: Negative Numbers
**Input (`input3.txt`):**
```
4
ADD -5 3
SUB 10 -4
MUL -7 -8
DIV -20 4
```
**Expected Output (`expected3.txt`):**
```
-2
14
56
-5
```

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a positive integer n (1 ≤ n ≤ 1000)
2. Each operation line must have exactly 3 space-separated parts
3. Operation names must be: ADD, SUB, MUL, DIV, POW, MOD (case-sensitive)
4. Operands must be integers in range [-1,000,000, 1,000,000]
5. Invalid operation names should be handled gracefully

### Output Format Rules:
1. Integer results printed as integers (no decimal point)
2. Floating-point results formatted with minimal decimal places
3. Division/Modulo by zero results in "ERROR"
4. Invalid operations result in "INVALID"
5. Each result on a separate line
6. No trailing whitespace

## Language-Specific Considerations

### Python Considerations:
- Use dictionary to store function references: `operations = {"ADD": add_func}`
- Handle float formatting: remove trailing zeros from division results
- Integer division should produce float if result is not whole number

### Go Considerations:
- Define function type: `type Operation func(int, int) interface{}`
- Use map for function storage: `operations := map[string]Operation{"ADD": addFunc}`
- Handle type conversion between int and float results

### JavaScript Considerations:
- Use object to store function references: `const operations = {ADD: addFunc}`
- Handle division precision with parseFloat() and proper rounding

## Performance Requirements
- **Time Complexity**: O(n) where n is number of operations
- **Space Complexity**: O(1) excluding input storage
- Function pointer lookup should be O(1) average case
- Large test cases (n=1000) should complete within 1 second

## Validation Checklist
- [ ] Each input file has exactly n+1 lines
- [ ] First line is valid integer in range [1, 1000]
- [ ] Each operation line has exactly 3 parts
- [ ] All operands are valid integers
- [ ] Expected outputs match actual results from working solution
- [ ] Edge cases (division by zero) properly handled
- [ ] Invalid operations return "INVALID"
- [ ] Floating-point results properly formatted
- [ ] Performance test cases complete within time limit

## Automated Test Case Generation
```python
def generate_basic_test_case(num_ops):
    """Generate basic test case with mixed operations"""
    operations = ["ADD", "SUB", "MUL", "DIV", "POW", "MOD"]
    test_input = [str(num_ops)]
    
    for i in range(num_ops):
        op = operations[i % len(operations)]
        a = random.randint(1, 100)
        b = random.randint(1, 10) if op in ["DIV", "MOD"] else random.randint(1, 100)
        test_input.append(f"{op} {a} {b}")
    
    return "\n".join(test_input)

def generate_edge_test_case():
    """Generate edge case with division by zero and invalid ops"""
    return """4
DIV 10 0
MOD 5 0
INVALID_OP 1 2
ADD -100 200"""

def validate_test_case(input_content, expected_content):
    """Validate test case format and correctness"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate format
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    # Validate each operation line
    for i in range(1, n + 1):
        parts = lines[i].split()
        assert len(parts) == 3, f"Line {i} should have 3 parts"
        assert parts[1].lstrip('-').isdigit(), f"Invalid operand1: {parts[1]}"
        assert parts[2].lstrip('-').isdigit(), f"Invalid operand2: {parts[2]}"
    
    return True
```

## Error Handling Test Cases
Special test cases that verify proper error handling:

1. **Division by Zero**: DIV and MOD operations with second operand = 0
2. **Invalid Operations**: Non-existent operation names
3. **Large Numbers**: Test integer overflow behavior
4. **Malformed Input**: Test robustness (handled by input validation)

These test cases ensure the function pointer implementation gracefully handles all edge cases while maintaining performance.
