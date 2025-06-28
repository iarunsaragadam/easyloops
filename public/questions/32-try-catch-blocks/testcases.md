# Test Cases for Try-catch blocks

## Test Case Structure
This question uses a single-line input format for a Safe Calculator that demonstrates exception handling.

### Input Format Pattern:
```
Line 1: operation operand1 operand2
```

### Output Format Pattern:
```
result_number
or
ERROR: specific_error_message
```

## Test Case Categories

### Category 1: Basic Operations (input1-30, expected1-30)
Valid mathematical operations that should produce correct numerical results.

**Example - Test Case 1: Basic Addition**
**Input (`input1.txt`):**
```
ADD 10 5
```
**Expected Output (`expected1.txt`):**
```
15
```

**Example - Test Case 2: Basic Subtraction**
**Input (`input2.txt`):**
```
SUB 20 8
```
**Expected Output (`expected2.txt`):**
```
12
```

### Category 2: Error Handling Cases (input31-60, expected31-60)
Various error conditions that should trigger specific exception handling.

**Example - Test Case 31: Division by Zero**
**Input (`input31.txt`):**
```
DIV 10 0
```
**Expected Output (`expected31.txt`):**
```
ERROR: Division by zero
```

**Example - Test Case 32: Invalid Number Format**
**Input (`input32.txt`):**
```
ADD abc 5
```
**Expected Output (`expected32.txt`):**
```
ERROR: Invalid number format
```

### Category 3: Complex Scenarios (input61-90, expected61-90)
Edge cases and complex input combinations.

**Example - Test Case 61: Unknown Operation**
**Input (`input61.txt`):**
```
POWER 2 3
```
**Expected Output (`expected61.txt`):**
```
ERROR: Unknown operation. Supported: ADD, SUB, MUL, DIV
```

### Category 4: Corner Cases (input91-100+, expected91-100+)
Unusual but valid inputs and boundary conditions.

**Example - Test Case 91: Case Insensitive Operation**
**Input (`input91.txt`):**
```
add 5 3
```
**Expected Output (`expected91.txt`):**
```
8
```

## Test Case Creation Rules

### Input Validation Rules:
1. Input must contain exactly 3 space-separated parts: operation operand1 operand2
2. Operations must be one of: ADD, SUB, MUL, DIV (case-insensitive)
3. Operands must be valid numbers (integers or floats)
4. Division by zero must be explicitly handled
5. Invalid formats should trigger appropriate error messages

### Output Format Rules:
1. Successful calculations: Print the numerical result
2. Whole numbers: Print without decimal places (e.g., "15" not "15.0")
3. Floating point: Print with up to 6 decimal places, trailing zeros removed
4. Error cases: Print "ERROR: " followed by specific error message
5. Error messages must be exact matches for test validation

### Error Message Standards:
- Division by zero: "ERROR: Division by zero"
- Invalid numbers: "ERROR: Invalid number format"
- Unknown operation: "ERROR: Unknown operation. Supported: ADD, SUB, MUL, DIV"
- Invalid format: "ERROR: Invalid input format. Expected: operation operand1 operand2"
- No input: "ERROR: No input provided"
- Unexpected errors: "ERROR: Unexpected error - [details]"

## Language-Specific Considerations

### Python Considerations:
- Use `try-except` blocks for exception handling
- Handle `ValueError` for number parsing errors
- Handle `ZeroDivisionError` for division by zero
- Handle `EOFError` for missing input
- Use `float()` for number parsing to handle both integers and floats
- Format output to remove unnecessary decimals

### Go Considerations:
- Use `if err != nil` pattern for error checking
- Handle `strconv.ParseFloat` errors for number parsing
- Explicitly check for division by zero before calculation
- Use `fmt.Scanln` or `bufio.Scanner` for input reading
- Handle EOF and other input errors appropriately

### JavaScript Considerations:
- Use `try-catch` blocks for exception handling
- Handle `NaN` results from `parseFloat` for invalid numbers
- Check for division by zero explicitly
- Use `process.stdin` for input in Node.js environment

## Validation Checklist
- [ ] Input contains exactly one line with three space-separated parts
- [ ] Operation is one of the four supported types (case-insensitive)
- [ ] Operands can be parsed as valid numbers
- [ ] Division by zero cases are handled properly
- [ ] Error messages match exactly the expected format
- [ ] Floating point precision is consistent (6 decimal places max)
- [ ] Whole numbers are displayed without decimals
- [ ] All exception paths are covered in test cases

## Automated Test Case Generation

```python
def generate_basic_test_cases():
    """Generate basic operation test cases"""
    operations = ['ADD', 'SUB', 'MUL', 'DIV']
    test_cases = []
    
    for i, op in enumerate(operations):
        # Generate multiple cases per operation
        for j in range(5):
            a, b = generate_random_operands()
            if op == 'DIV':
                b = ensure_nonzero(b)  # Avoid division by zero in basic cases
            test_cases.append((f"{op} {a} {b}", calculate_result(op, a, b)))
    
    return test_cases

def generate_error_test_cases():
    """Generate error condition test cases"""
    error_cases = [
        ("DIV 5 0", "ERROR: Division by zero"),
        ("ADD abc 5", "ERROR: Invalid number format"),
        ("POWER 2 3", "ERROR: Unknown operation. Supported: ADD, SUB, MUL, DIV"),
        ("ADD 5", "ERROR: Invalid input format. Expected: operation operand1 operand2"),
        ("", "ERROR: No input provided")
    ]
    return error_cases

def validate_test_case(input_content, expected_content):
    """Validate that test case follows format rules"""
    # Check input format
    parts = input_content.strip().split()
    if len(parts) != 3:
        return False, "Invalid input format"
    
    # Check operation validity
    if parts[0].upper() not in ['ADD', 'SUB', 'MUL', 'DIV']:
        # Should be error case
        return expected_content.startswith("ERROR:")
    
    # Validate expected output format
    if expected_content.startswith("ERROR:"):
        return True, "Valid error case"
    else:
        try:
            float(expected_content.strip())
            return True, "Valid numeric result"
        except ValueError:
            return False, "Invalid numeric result format"
```
