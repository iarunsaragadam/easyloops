# Test Cases for Basic Exception Handling

## Test Case Structure
This question uses a 2-line input format for safe division operations.

### Input Format Pattern:
```
Line 1: numerator (number or invalid input)
Line 2: denominator (number or invalid input)
```

### Output Format Pattern:
```
Result: X.XX
OR
Error: [specific error message]
```

## Test Case 1: Basic Division
**Input (`input.txt`):**
```
10
2
```
**Expected Output (`expected.txt`):**
```
Result: 5.00
```

## Test Case 2: Division by Zero
**Input (`input2.txt`):**
```
15
0
```
**Expected Output (`expected2.txt`):**
```
Error: Cannot divide by zero
```

## Test Case 3: Invalid Input Format
**Input (`input3.txt`):**
```
abc
5
```
**Expected Output (`expected3.txt`):**
```
Error: Invalid number format
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Valid Numbers**: Can be integers or floating-point numbers (positive, negative, or zero)
2. **Invalid Numbers**: Non-numeric strings that cannot be converted to numbers
3. **Edge Cases**: Division by zero, very large numbers, very small numbers
4. **Format**: Exactly 2 lines of input

### Output Format Rules:
1. **Success Format**: "Result: X.XX" where X.XX is the result formatted to 2 decimal places
2. **ValueError Format**: "Error: Invalid number format" for non-numeric input
3. **ZeroDivisionError Format**: "Error: Cannot divide by zero" for division by zero
4. **General Error Format**: "Error: Unexpected error occurred" for any other errors
5. **Line Endings**: Each output should end with a newline character

## Language-Specific Considerations

### Python Considerations:
- Use `float()` for number conversion to handle both integers and decimals
- Use `try-except` blocks with specific exception types
- Format output using f-strings: `f"Result: {result:.2f}"`
- Handle `ValueError` for invalid conversions and `ZeroDivisionError` for division by zero

### Go Considerations:
- Use `strconv.ParseFloat()` for number conversion
- Check error return values explicitly instead of exceptions
- Use `fmt.Printf("Result: %.2f\n", result)` for formatting
- Handle conversion errors and manually check for zero denominator

## Additional Test Case Examples

### Test Case 4: Negative Numbers
**Input:**
```
-15
-3
```
**Expected Output:**
```
Result: 5.00
```

### Test Case 5: Decimal Numbers
**Input:**
```
7.5
2.5
```
**Expected Output:**
```
Result: 3.00
```

### Test Case 6: Invalid Denominator
**Input:**
```
10
xyz
```
**Expected Output:**
```
Error: Invalid number format
```

### Test Case 7: Large Numbers
**Input:**
```
1000000
1000
```
**Expected Output:**
```
Result: 1000.00
```

### Test Case 8: Small Result
**Input:**
```
1
3
```
**Expected Output:**
```
Result: 0.33
```

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] All valid number inputs produce correctly formatted results
- [ ] Division by zero is handled with correct error message
- [ ] Invalid number formats are handled with correct error message
- [ ] Results are formatted to exactly 2 decimal places
- [ ] Error messages match exactly as specified
- [ ] Both positive and negative numbers work correctly
- [ ] Both integer and decimal inputs work correctly

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate random test cases for basic exception handling."""
    test_type = random.choice(['valid', 'zero_division', 'invalid_input'])
    
    if test_type == 'valid':
        # Generate valid division
        numerator = random.uniform(-1000, 1000)
        denominator = random.uniform(-1000, 1000)
        if denominator == 0:  # Avoid accidental zero
            denominator = 1
        
        input_content = f"{numerator}\n{denominator}\n"
        result = numerator / denominator
        expected_content = f"Result: {result:.2f}\n"
        
    elif test_type == 'zero_division':
        # Generate division by zero
        numerator = random.uniform(-1000, 1000)
        denominator = 0
        
        input_content = f"{numerator}\n{denominator}\n"
        expected_content = "Error: Cannot divide by zero\n"
        
    else:  # invalid_input
        # Generate invalid input
        invalid_strings = ['abc', 'xyz', '12a', 'a23', '!@#', '']
        numerator = random.choice(invalid_strings)
        denominator = random.uniform(-1000, 1000)
        
        input_content = f"{numerator}\n{denominator}\n"
        expected_content = "Error: Invalid number format\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate a test case for basic exception handling."""
    lines = input_content.strip().split('\n')
    
    # Check input format
    if len(lines) != 2:
        return False, "Input must have exactly 2 lines"
    
    # Check expected output format
    expected = expected_content.strip()
    if expected.startswith("Result:"):
        # Check result format
        try:
            result_part = expected.split(": ")[1]
            float_val = float(result_part)
            # Check if formatted to 2 decimal places
            formatted = f"{float_val:.2f}"
            if result_part != formatted:
                return False, "Result not formatted to 2 decimal places"
        except:
            return False, "Invalid result format"
    elif expected.startswith("Error:"):
        # Check error message format
        valid_errors = [
            "Error: Invalid number format",
            "Error: Cannot divide by zero", 
            "Error: Unexpected error occurred"
        ]
        if expected not in valid_errors:
            return False, f"Invalid error message: {expected}"
    else:
        return False, "Output must start with 'Result:' or 'Error:'"
    
    return True, "Valid test case"
```
