# Test Cases for Function Parameters and Arguments

## Test Case Structure
This question uses a 3-line input format for basic arithmetic operations.

### Input Format Pattern:
```
Line 1: Operation type (string: "add", "subtract", or "multiply")
Line 2: First number (integer)
Line 3: Second number (integer)
```

### Output Format Pattern:
```
Function called: calculate('[operation]', [num1], [num2])
Result: [calculated_result]
```

## Test Case 1: Basic Addition
**Input (`input.txt`):**
```
add
5
3
```
**Expected Output (`expected.txt`):**
```
Function called: calculate('add', 5, 3)
Result: 8
```

## Test Case 2: Subtraction with Larger Numbers
**Input (`input2.txt`):**
```
subtract
15
7
```
**Expected Output (`expected2.txt`):**
```
Function called: calculate('subtract', 15, 7)
Result: 8
```

## Test Case 3: Multiplication
**Input (`input3.txt`):**
```
multiply
6
9
```
**Expected Output (`expected3.txt`):**
```
Function called: calculate('multiply', 6, 9)
Result: 54
```

## Test Case 4: Addition with Zero
**Input (`input4.txt`):**
```
add
0
10
```
**Expected Output (`expected4.txt`):**
```
Function called: calculate('add', 0, 10)
Result: 10
```

## Test Case 5: Subtraction with Negative Result
**Input (`input5.txt`):**
```
subtract
5
8
```
**Expected Output (`expected5.txt`):**
```
Function called: calculate('subtract', 5, 8)
Result: -3
```

## Test Case 6: Multiplication with Negative Number
**Input (`input6.txt`):**
```
multiply
-4
3
```
**Expected Output (`expected6.txt`):**
```
Function called: calculate('multiply', -4, 3)
Result: -12
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Operation (line 1):** Must be exactly one of: "add", "subtract", "multiply"
2. **First number (line 2):** Integer between -1000 and 1000
3. **Second number (line 3):** Integer between -1000 and 1000
4. **No extra whitespace:** Input should be clean with no leading/trailing spaces

### Output Format Rules:
1. **Line 1 format:** `Function called: calculate('[operation]', [num1], [num2])`
   - Operation must be enclosed in single quotes
   - Numbers are displayed without quotes
   - Exact spacing and punctuation required
2. **Line 2 format:** `Result: [calculated_result]`
   - Single space after colon
   - Result is an integer (no decimal places)
3. **Exactly 2 output lines:** No extra blank lines or additional output

## Language-Specific Considerations

### Python Considerations:
- Use f-string formatting: `f"Function called: calculate('{operation}', {num1}, {num2})"`
- Integer input: `int(input())` for number conversion
- String input: `input().strip()` to remove any whitespace
- Function definition inside `solve()` function is allowed
- Make sure the `calculate` function returns an integer result

### Go Considerations:
- Use `fmt.Printf()` for formatted output with exact spacing
- String scanning: `scanner.Text()` for operation string
- Integer conversion: `strconv.Atoi(scanner.Text())` for numbers
- Function can be defined as a closure inside `solve()`
- Switch statement recommended for operation handling
- Format string: `"Function called: calculate('%s', %d, %d)\n"`

## Edge Cases to Consider

### Boundary Value Tests:
- **Zero values:** Test with 0 as one or both operands
- **Negative numbers:** Test subtraction that results in negative values  
- **Large values:** Test with numbers near the constraint limits (-1000, 1000)
- **Minimum difference:** Test subtraction with very close numbers

### Operation-Specific Edge Cases:
- **Addition:** Positive + Positive, Positive + Negative, Negative + Negative
- **Subtraction:** Larger - Smaller, Smaller - Larger (negative result), Same - Same (zero)
- **Multiplication:** By zero, by one, by negative numbers, negative × negative

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 3 lines
- [ ] Operation is one of the three valid strings
- [ ] Both numbers are valid integers within constraints
- [ ] Expected output has exactly 2 lines
- [ ] Function call line matches exact format with single quotes around operation
- [ ] Result line shows correct calculation
- [ ] No extra whitespace or blank lines in output
- [ ] Calculation is mathematically correct

## Automated Test Case Generation

```python
def generate_test_case(operation, num1, num2):
    """Generate a test case for the function parameters problem."""
    input_content = f"{operation}\n{num1}\n{num2}"
    
    # Calculate expected result
    if operation == "add":
        result = num1 + num2
    elif operation == "subtract":
        result = num1 - num2
    elif operation == "multiply":
        result = num1 * num2
    
    expected_content = f"Function called: calculate('{operation}', {num1}, {num2})\nResult: {result}"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the correct format."""
    lines = input_content.strip().split('\n')
    
    # Check input format
    if len(lines) != 3:
        return False, "Input must have exactly 3 lines"
    
    operation, num1_str, num2_str = lines
    
    # Validate operation
    if operation not in ["add", "subtract", "multiply"]:
        return False, f"Invalid operation: {operation}"
    
    # Validate numbers
    try:
        num1 = int(num1_str)
        num2 = int(num2_str)
        if not (-1000 <= num1 <= 1000) or not (-1000 <= num2 <= 1000):
            return False, "Numbers must be between -1000 and 1000"
    except ValueError:
        return False, "Numbers must be valid integers"
    
    # Check expected output format
    expected_lines = expected_content.strip().split('\n')
    if len(expected_lines) != 2:
        return False, "Expected output must have exactly 2 lines"
    
    # Validate function call line format
    expected_call = f"Function called: calculate('{operation}', {num1}, {num2})"
    if expected_lines[0] != expected_call:
        return False, f"Function call line format incorrect"
    
    # Validate result line
    if operation == "add":
        result = num1 + num2
    elif operation == "subtract":
        result = num1 - num2
    elif operation == "multiply":
        result = num1 * num2
    
    expected_result_line = f"Result: {result}"
    if expected_lines[1] != expected_result_line:
        return False, "Result line format or calculation incorrect"
    
    return True, "Test case is valid"

# Example usage:
# input_data, expected_data = generate_test_case("add", 10, 20)
# is_valid, message = validate_test_case(input_data, expected_data)
```
