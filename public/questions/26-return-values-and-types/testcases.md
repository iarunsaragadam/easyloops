# Test Cases for Return Values and Types

## Test Case Structure
This question uses a single-line input format for mathematical operations with type-specific return values.

### Input Format Pattern:
```
Line 1: operation number1 number2
```

### Output Format Pattern:
- **Integer operations** (`add`, `sub`, `mul`, `mod`): Output integer result
- **Float operations** (`div`): Output float with 6 decimal places
- **Boolean operations** (`eq`, `ne`, `lt`, `le`, `gt`, `ge`): Output `true` or `false`
- **Error cases**: Output `ERROR: <description>`

## Comprehensive Test Coverage: 158+ Test Cases

### Basic Test Cases (input1.txt to input50.txt):
Fundamental operations for each category:

**Integer Operations Examples:**
- `add 5 3` → `8`
- `sub 10 4` → `6`
- `mul 7 6` → `42`
- `mod 17 5` → `2`

**Float Operations Examples:**
- `div 10 3` → `3.333333`
- `div 15 6` → `2.500000`
- `div 7 2` → `3.500000`

**Boolean Operations Examples:**
- `eq 5 5` → `true`
- `ne 3 7` → `true`
- `lt 4 9` → `true`
- `le 5 5` → `true`
- `gt 8 3` → `true`
- `ge 6 6` → `true`

### Edge Test Cases (input51.txt to input100.txt):
Boundary conditions and special scenarios:

**Zero Handling:**
- `add 0 5` → `5`
- `mul 0 100` → `0`
- `div 0 5` → `0.000000`

**Division by Zero:**
- `div 7 0` → `ERROR: Division by zero`
- `mod 5 0` → `ERROR: Division by zero`

**Negative Numbers:**
- `add -5 3` → `-2`
- `sub -10 -4` → `-6`
- `div -15 3` → `-5.000000`
- `lt -5 -3` → `true`

**Decimal Inputs:**
- `add 2.5 3.7` → `6` (converted to int)
- `div 7.5 2.5` → `3.000000`
- `eq 3.0 3` → `true`

### Performance Test Cases (input101.txt to input130.txt):
Large numbers and computationally intensive cases:

**Large Number Operations:**
- `mul 999999 999999` → `999998000001`
- `add 1000000 1000000` → `2000000`
- `div 1000000 3` → `333333.333333`

**Precision Tests:**
- `div 1 3` → `0.333333`
- `div 2 3` → `0.666667`
- `div 1 7` → `0.142857`

### Error Test Cases (input131.txt to input158.txt):
Invalid operations and malformed inputs:

**Invalid Operations:**
- `invalid 5 3` → `ERROR: Unknown operation`
- `ADD 5 3` → `ERROR: Unknown operation` (case sensitive)
- `pow 2 3` → `ERROR: Unknown operation`

**Malformed Input:**
- Invalid number formats would trigger `ERROR: Invalid numbers`
- Wrong argument counts would trigger `ERROR: Invalid input format`

## Test Case Distribution Summary:
- **Total Test Cases**: 158+ comprehensive test cases
- **Integer Operations**: 40+ cases (add, sub, mul, mod)
- **Float Operations**: 29+ cases (div with various scenarios)
- **Boolean Operations**: 60+ cases (all 6 comparison operators)
- **Error Cases**: 11+ cases (invalid operations, division by zero)
- **Edge Cases**: 20+ cases (zero, negatives, decimals, large numbers)

## Test Case Creation Rules

### Input Validation Rules:
1. Input must have exactly 3 space-separated tokens
2. First token must be a valid operation name
3. Second and third tokens must be valid numbers (can be integers or floats)
4. Operations are case-sensitive (lowercase only)

### Output Format Rules:
1. **Integer results**: Print as whole number with no decimal point
2. **Float results**: Print with exactly 6 decimal places using `.6f` format
3. **Boolean results**: Print as lowercase `true` or `false`
4. **Error messages**: Start with `ERROR:` followed by space and description
5. No trailing whitespace or extra newlines

### Performance Considerations:
- Large number operations should complete within reasonable time
- Memory usage should be minimal for single-operation processing
- No complex algorithms required - direct mathematical operations

## Language-Specific Considerations

### Python Considerations:
- Use `float()` for number parsing to handle both integers and decimals
- Convert to `int()` for integer operations to avoid floating-point precision issues
- Use `f"{result:.6f}"` for 6-decimal float formatting
- Use `str(boolean).lower()` for boolean output formatting

### Go Considerations:
- Use `strconv.ParseFloat(s, 64)` for number parsing
- Use `fmt.Printf("%.6f\n", result)` for float formatting
- Use `fmt.Printf("%d\n", int(result))` for integer formatting
- Boolean formatting: `fmt.Println(strings.ToLower(strconv.FormatBool(result)))`

### JavaScript Considerations:
- Use `parseFloat()` for number parsing
- Use `Math.floor()` or `parseInt()` for integer operations
- Use `toFixed(6)` for float formatting
- Convert boolean to string and use `.toLowerCase()`

## Validation Checklist
- [ ] Input has exactly 3 space-separated parts
- [ ] Operation is one of the 11 valid operations
- [ ] Numbers can be parsed as floating-point values
- [ ] Integer operations return whole numbers
- [ ] Float operations return 6 decimal places
- [ ] Boolean operations return lowercase true/false
- [ ] Error cases return appropriate error messages
- [ ] Division by zero is handled for both `div` and `mod`
- [ ] Large numbers are handled correctly
- [ ] Negative numbers work in all operations
- [ ] All 158+ test cases are validated and working

## Automated Test Case Generation
```python
def generate_test_case(operation, num1, num2):
    """Generate a test case for the given operation and numbers."""
    input_content = f"{operation} {num1} {num2}"
    
    # Calculate expected output based on operation
    if operation in ["add", "sub", "mul", "mod"]:
        # Integer operations
        if operation == "add":
            result = int(num1 + num2)
        elif operation == "sub":
            result = int(num1 - num2)
        elif operation == "mul":
            result = int(num1 * num2)
        elif operation == "mod":
            if num2 == 0:
                result = "ERROR: Division by zero"
            else:
                result = int(num1 % num2)
        expected_content = str(result)
    elif operation == "div":
        # Float operation
        if num2 == 0:
            expected_content = "ERROR: Division by zero"
        else:
            result = num1 / num2
            expected_content = f"{result:.6f}"
    elif operation in ["eq", "ne", "lt", "le", "gt", "ge"]:
        # Boolean operations
        if operation == "eq":
            result = num1 == num2
        elif operation == "ne":
            result = num1 != num2
        elif operation == "lt":
            result = num1 < num2
        elif operation == "le":
            result = num1 <= num2
        elif operation == "gt":
            result = num1 > num2
        elif operation == "ge":
            result = num1 >= num2
        expected_content = str(result).lower()
    else:
        expected_content = "ERROR: Unknown operation"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the correct format."""
    parts = input_content.strip().split()
    
    # Check input format
    if len(parts) != 3:
        return False, "Input must have exactly 3 parts"
    
    operation = parts[0]
    valid_operations = ["add", "sub", "mul", "div", "mod", "eq", "ne", "lt", "le", "gt", "ge"]
    
    if operation not in valid_operations:
        # Should expect error output
        return expected_content.startswith("ERROR:"), "Invalid operation should return error"
    
    try:
        float(parts[1])
        float(parts[2])
    except ValueError:
        # Should expect error output
        return expected_content.startswith("ERROR:"), "Invalid numbers should return error"
    
    # Check expected output format
    if expected_content.startswith("ERROR:"):
        return True, "Valid error format"
    elif operation in ["add", "sub", "mul", "mod"]:
        return expected_content.isdigit() or (expected_content.startswith('-') and expected_content[1:].isdigit()), "Integer result expected"
    elif operation == "div":
        try:
            float(expected_content)
            return '.' in expected_content, "Float result expected"
        except ValueError:
            return False, "Invalid float format"
    elif operation in ["eq", "ne", "lt", "le", "gt", "ge"]:
        return expected_content in ["true", "false"], "Boolean result expected"
    
    return True, "Valid test case"
```
