# Test Cases for Error Propagation

## Test Case Structure
This question uses a single-line input format containing a mathematical expression.

### Input Format Pattern:
```
Line 1: operand1 operator operand2
```

### Output Format Pattern:
```
RESULT: {value}     # For successful calculations
ERROR: {error_type} # For error conditions
```

## Error Types
- `INVALID_FORMAT`: Wrong number of parts in expression
- `INVALID_NUMBER`: Non-numeric operands
- `INVALID_OPERATOR`: Unsupported operator
- `DIVISION_BY_ZERO`: Division by zero attempted
- `UNKNOWN_ERROR`: Unexpected error

## Test Case Categories

### Basic Calculations (Test Cases 1-25)
**Purpose**: Test basic arithmetic operations with valid inputs

**Input (`input1.txt`):**
```
10 + 5
```
**Expected Output (`expected1.txt`):**
```
RESULT: 15
```

**Input (`input2.txt`):**
```
20 - 8
```
**Expected Output (`expected2.txt`):**
```
RESULT: 12
```

**Input (`input3.txt`):**
```
6 * 7
```
**Expected Output (`expected3.txt`):**
```
RESULT: 42
```

### Division by Zero Errors (Test Cases 26-35)
**Purpose**: Test division by zero error handling

**Input (`input26.txt`):**
```
10 / 0
```
**Expected Output (`expected26.txt`):**
```
ERROR: DIVISION_BY_ZERO
```

**Input (`input27.txt`):**
```
-5 / 0
```
**Expected Output (`expected27.txt`):**
```
ERROR: DIVISION_BY_ZERO
```

### Invalid Format Errors (Test Cases 36-50)
**Purpose**: Test input format validation

**Input (`input36.txt`):**
```
10 +
```
**Expected Output (`expected36.txt`):**
```
ERROR: INVALID_FORMAT
```

**Input (`input37.txt`):**
```
+ 5
```
**Expected Output (`expected37.txt`):**
```
ERROR: INVALID_FORMAT
```

**Input (`input38.txt`):**
```
10 + 5 + 3
```
**Expected Output (`expected38.txt`):**
```
ERROR: INVALID_FORMAT
```

### Invalid Number Errors (Test Cases 51-65)
**Purpose**: Test numeric validation

**Input (`input51.txt`):**
```
abc + 5
```
**Expected Output (`expected51.txt`):**
```
ERROR: INVALID_NUMBER
```

**Input (`input52.txt`):**
```
10 + xyz
```
**Expected Output (`expected52.txt`):**
```
ERROR: INVALID_NUMBER
```

### Invalid Operator Errors (Test Cases 66-75)
**Purpose**: Test operator validation

**Input (`input66.txt`):**
```
10 % 3
```
**Expected Output (`expected66.txt`):**
```
ERROR: INVALID_OPERATOR
```

**Input (`input67.txt`):**
```
10 ^ 2
```
**Expected Output (`expected67.txt`):**
```
ERROR: INVALID_OPERATOR
```

### Floating Point Operations (Test Cases 76-90)
**Purpose**: Test decimal number handling

**Input (`input76.txt`):**
```
10.5 + 2.3
```
**Expected Output (`expected76.txt`):**
```
RESULT: 12.80
```

**Input (`input77.txt`):**
```
15.75 / 3
```
**Expected Output (`expected77.txt`):**
```
RESULT: 5.25
```

### Edge Cases (Test Cases 91-100)
**Purpose**: Test boundary conditions and special values

**Input (`input91.txt`):**
```
-10 + 5
```
**Expected Output (`expected91.txt`):**
```
RESULT: -5
```

**Input (`input92.txt`):**
```
0 * 1000
```
**Expected Output (`expected92.txt`):**
```
RESULT: 0
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Format**: Must be exactly 3 space-separated parts: `operand1 operator operand2`
2. **Operands**: Must be valid numbers (integers or floats, positive or negative)
3. **Operators**: Must be one of: `+`, `-`, `*`, `/`
4. **Spacing**: Single spaces between parts (multiple spaces should still work)

### Output Format Rules:
1. **Success format**: `RESULT: {value}` where value is the calculated result
2. **Error format**: `ERROR: {error_type}` using predefined error types
3. **Number formatting**: 
   - Integers display without decimal point
   - Floats display with exactly 2 decimal places
4. **No trailing whitespace** in output

## Language-Specific Considerations

### Python Considerations:
- Use `float()` for numeric conversion to handle both integers and decimals
- Use `try-except` blocks for error handling
- Consider using `split()` to parse the input
- Format floats using `:.2f` for 2 decimal places
- Check if result equals `int(result)` to determine integer display

### Go Considerations:
- Use `strconv.ParseFloat()` for numeric conversion
- Use `strings.Fields()` to split input
- Handle errors explicitly with Go's error return pattern
- Use `fmt.Printf()` with appropriate format specifiers
- Check for integer values by comparing `result == float64(int(result))`

### JavaScript Considerations:
- Use `parseFloat()` for numeric conversion
- Use `split()` method to parse input
- Handle `NaN` values appropriately
- Use `Number.isInteger()` to check for integer results
- Format floats using `toFixed(2)` for 2 decimal places

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 1 line
- [ ] Expression follows the `operand1 operator operand2` format
- [ ] Test covers specific error type or calculation scenario
- [ ] Expected output uses correct format (`RESULT:` or `ERROR:`)
- [ ] Numeric results are formatted correctly (integer vs. 2 decimal places)
- [ ] Error messages use exact predefined error types
- [ ] Test case has educational value for error propagation concepts
- [ ] Input is realistic and meaningful for learning

## Performance Considerations

For this easy-level question, performance is not a primary concern. However, consider:

- **Time Complexity**: O(1) - constant time for parsing and calculation
- **Space Complexity**: O(1) - only storing a few variables
- **Input Size**: Single line with at most 3 parts, very manageable
- **Edge Cases**: Focus on error handling rather than performance optimization

## Automated Test Case Generation

```python
import random

def generate_basic_test_case():
    """Generate basic arithmetic test cases"""
    operators = ['+', '-', '*', '/']
    operand1 = random.randint(1, 100)
    operator = random.choice(operators)
    operand2 = random.randint(1, 100) if operator != '/' else random.randint(1, 100)
    
    input_content = f"{operand1} {operator} {operand2}"
    
    # Calculate expected result
    if operator == '+':
        result = operand1 + operand2
    elif operator == '-':
        result = operand1 - operand2
    elif operator == '*':
        result = operand1 * operand2
    elif operator == '/':
        result = operand1 / operand2
    
    # Format output
    if result == int(result):
        expected_content = f"RESULT: {int(result)}"
    else:
        expected_content = f"RESULT: {result:.2f}"
    
    return input_content, expected_content

def generate_error_test_case(error_type):
    """Generate specific error condition test cases"""
    if error_type == "DIVISION_BY_ZERO":
        operand1 = random.randint(1, 100)
        return f"{operand1} / 0", "ERROR: DIVISION_BY_ZERO"
    
    elif error_type == "INVALID_FORMAT":
        cases = [
            f"{random.randint(1, 100)} +",
            f"+ {random.randint(1, 100)}",
            f"{random.randint(1, 100)} + {random.randint(1, 100)} + {random.randint(1, 100)}",
            f"{random.randint(1, 100)}"
        ]
        return random.choice(cases), "ERROR: INVALID_FORMAT"
    
    elif error_type == "INVALID_NUMBER":
        invalid_numbers = ["abc", "xyz", "12abc", "3.14.15", ""]
        operand1 = random.choice([str(random.randint(1, 100)), random.choice(invalid_numbers)])
        operand2 = random.choice([str(random.randint(1, 100)), random.choice(invalid_numbers)])
        operator = random.choice(['+', '-', '*', '/'])
        
        # Ensure at least one operand is invalid
        if operand1.replace('.', '').replace('-', '').isdigit() and operand2.replace('.', '').replace('-', '').isdigit():
            operand1 = random.choice(invalid_numbers)
        
        return f"{operand1} {operator} {operand2}", "ERROR: INVALID_NUMBER"
    
    elif error_type == "INVALID_OPERATOR":
        invalid_ops = ['%', '^', '&', '|', '>', '<', '=', '//']
        operand1 = random.randint(1, 100)
        operand2 = random.randint(1, 100)
        operator = random.choice(invalid_ops)
        return f"{operand1} {operator} {operand2}", "ERROR: INVALID_OPERATOR"

def validate_test_case(input_content, expected_content):
    """Validate a test case pair"""
    # Check input format
    if not input_content.strip():
        return False, "Empty input"
    
    # Check expected output format
    if not (expected_content.startswith("RESULT:") or expected_content.startswith("ERROR:")):
        return False, "Invalid output format"
    
    # Additional validation logic here...
    return True, "Valid test case"
```
