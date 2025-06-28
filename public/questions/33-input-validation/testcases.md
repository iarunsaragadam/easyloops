# Test Cases for Input Validation

## Test Case Structure

This question uses a **3-line input format** where each line represents user registration information that needs to be validated against specific criteria.

### Input Format Pattern:
```
Line 1: Full name (string, 2-50 chars, letters and spaces only, no leading/trailing spaces)
Line 2: Age (string that should convert to integer, 13-120 range)
Line 3: Email address (string, basic email format validation)
```

### Output Format Pattern:
```
VALID                                    (if all inputs are valid)
ERROR: [specific error message]          (if any input is invalid)
```

## Test Case 1: Basic Valid Input
**Input (`input.txt`):**
```
John Doe
25
john.doe@email.com
```
**Expected Output (`expected.txt`):**
```
VALID
```
**Description:** Tests standard valid inputs that meet all validation criteria.

## Test Case 2: Name Length Validation (Too Short)
**Input (`input2.txt`):**
```
J
25
john.doe@email.com
```
**Expected Output (`expected2.txt`):**
```
ERROR: Name must be 2-50 characters
```
**Description:** Tests name validation with input that's too short (1 character).

## Test Case 3: Age Range Validation (Too High)
**Input (`input3.txt`):**
```
Maria Elena Rodriguez Gonzalez Smith Johnson
150
invalid.email.format
```
**Expected Output (`expected3.txt`):**
```
ERROR: Age must be between 13 and 120
```
**Description:** Tests age validation with value above maximum (also tests that name length 43 chars is within limit, but age error comes first).

## Additional Test Scenarios

### Name Validation Test Cases:
1. **Too Long Name (51+ characters)**
   - Input: Name with 51 characters
   - Expected: `ERROR: Name must be 2-50 characters`

2. **Leading/Trailing Spaces**
   - Input: ` John Doe ` (with spaces)
   - Expected: `ERROR: Name cannot have leading or trailing spaces`

3. **Invalid Characters (Numbers)**
   - Input: `John123`
   - Expected: `ERROR: Name can only contain letters and spaces`

4. **Invalid Characters (Special chars)**
   - Input: `John-Doe` or `John_Doe`
   - Expected: `ERROR: Name can only contain letters and spaces`

### Age Validation Test Cases:
1. **Non-Integer Age**
   - Input: `twenty-five`
   - Expected: `ERROR: Age must be a valid integer`

2. **Age Too Low**
   - Input: `12`
   - Expected: `ERROR: Age must be between 13 and 120`

3. **Negative Age**
   - Input: `-5`
   - Expected: `ERROR: Age must be between 13 and 120`

4. **Floating Point Age**
   - Input: `25.5`
   - Expected: `ERROR: Age must be a valid integer`

### Email Validation Test Cases:
1. **No @ Symbol**
   - Input: `johndoe.email.com`
   - Expected: `ERROR: Invalid email format`

2. **Multiple @ Symbols**
   - Input: `john@doe@email.com`
   - Expected: `ERROR: Invalid email format`

3. **No Domain Extension**
   - Input: `john@email`
   - Expected: `ERROR: Invalid email format`

4. **Empty Local Part**
   - Input: `@email.com`
   - Expected: `ERROR: Invalid email format`

5. **Empty Domain**
   - Input: `john@.com`
   - Expected: `ERROR: Invalid email format`

## Test Case Creation Rules

### Input Validation Rules:
1. **Name validation (checked first):**
   - Length: 2-50 characters
   - Characters: Only letters (a-z, A-Z) and spaces
   - No leading or trailing spaces
   - Error messages:
     - `ERROR: Name must be 2-50 characters`
     - `ERROR: Name cannot have leading or trailing spaces`
     - `ERROR: Name can only contain letters and spaces`

2. **Age validation (checked second):**
   - Must be convertible to integer
   - Range: 13-120 (inclusive)
   - Error messages:
     - `ERROR: Age must be a valid integer`
     - `ERROR: Age must be between 13 and 120`

3. **Email validation (checked third):**
   - Basic email format: user@domain.extension
   - Must contain exactly one @ symbol
   - Domain must have at least one dot
   - Extension must be at least 2 characters
   - Error message: `ERROR: Invalid email format`

### Output Format Rules:
1. **Validation order**: Name → Age → Email (stop at first error)
2. **Success output**: Exactly `VALID`
3. **Error output**: Exactly `ERROR: [specific message]`
4. **Case sensitivity**: Error messages must match exactly
5. **No extra whitespace**: Output should have no trailing spaces or extra newlines

## Language-Specific Considerations

### Python Considerations:
- Use `re.match()` for pattern validation
- Use `int()` conversion with try/except for age validation
- Use `strip()` method to check for leading/trailing spaces
- Use `len()` for string length validation
- Email regex pattern: `r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'`

### Go Considerations:
- Use `regexp` package for pattern matching
- Use `strconv.Atoi()` for integer conversion
- Use `strings.TrimSpace()` to check for whitespace
- Use `len()` for string length validation
- Handle errors appropriately for type conversions

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 3 lines (name, age, email)
- [ ] Expected output is either "VALID" or starts with "ERROR: "
- [ ] Error messages match the exact format specified
- [ ] Test cases cover all validation rules
- [ ] Validation order is respected (name first, then age, then email)
- [ ] Edge cases are included (boundary values, invalid formats)
- [ ] Test cases are realistic and educational

## Performance Considerations

- **Time Complexity**: O(n) where n is the length of the input strings
- **Space Complexity**: O(1) additional space for validation
- **Edge Cases**: This problem focuses on correctness rather than performance
- **Scalability**: Input validation is typically fast, no performance test cases needed

## Automated Test Case Generation

```python
import re
import random

def generate_test_case():
    """Generate random test cases for input validation"""
    
    # Valid components
    first_names = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana"]
    last_names = ["Doe", "Smith", "Johnson", "Williams", "Brown", "Davis"]
    domains = ["email.com", "test.org", "example.net", "mail.co.uk"]
    
    # Test case types
    test_types = [
        "valid",
        "name_too_short", "name_too_long", "name_spaces", "name_invalid_chars",
        "age_invalid", "age_too_low", "age_too_high",
        "email_no_at", "email_multiple_at", "email_no_domain", "email_invalid"
    ]
    
    test_type = random.choice(test_types)
    
    if test_type == "valid":
        name = f"{random.choice(first_names)} {random.choice(last_names)}"
        age = random.randint(13, 120)
        email = f"{name.lower().replace(' ', '.')}@{random.choice(domains)}"
        expected = "VALID"
    
    elif test_type == "name_too_short":
        name = "J"
        age = 25
        email = "j@email.com"
        expected = "ERROR: Name must be 2-50 characters"
    
    elif test_type == "name_too_long":
        name = "A" * 51
        age = 25
        email = "long@email.com"
        expected = "ERROR: Name must be 2-50 characters"
    
    # Add more test type implementations...
    
    input_content = f"{name}\n{age}\n{email}\n"
    return input_content, expected

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the correct format"""
    lines = input_content.strip().split('\n')
    
    # Check input format
    if len(lines) != 3:
        return False, "Input must have exactly 3 lines"
    
    # Check output format
    expected = expected_content.strip()
    if not (expected == "VALID" or expected.startswith("ERROR: ")):
        return False, "Output must be 'VALID' or start with 'ERROR: '"
    
    return True, "Test case is valid"

# Example usage
input_data, expected_output = generate_test_case()
is_valid, message = validate_test_case(input_data, expected_output)
print(f"Generated test case: {is_valid} - {message}")
```

This comprehensive test case structure ensures thorough validation of input validation concepts and provides students with clear examples of defensive programming practices.
