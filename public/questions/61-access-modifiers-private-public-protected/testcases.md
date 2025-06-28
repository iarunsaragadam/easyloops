# Test Cases for Access modifiers (private, public, protected)

## Test Case Structure
This question uses a multi-line input format to demonstrate access modifiers in a Student Grade Management System.

### Input Format Pattern:
```
Line 1: Student/Teacher name (string)
Line 2: ID number (string) 
Line 3: User type ("student" or "teacher")
Line 4: Number of operations (integer n)
Next n lines: Operations in format "operation_name [parameter]"
```

### Output Format Pattern:
```
operation_result: value
...
```

## Test Case 1: Basic Student Operations
**Input (`input.txt`):**
```
Alice Smith
12345
student
5
name
id
add_grade 85
gpa
verify_key key_12345
```
**Expected Output (`expected.txt`):**
```
name: Alice Smith
id: 12345
add_grade: success
gpa: 85.0
verify_key: success
```

## Test Case 2: Teacher Operations with Multiple Grades
**Input (`input2.txt`):**
```
Bob Johnson
T001
teacher
6
name
id
add_grade 92
add_grade 88
gpa
verify_key key_T001
```
**Expected Output (`expected2.txt`):**
```
name: Bob Johnson
id: T001
add_grade: success
add_grade: success
gpa: 90.0
verify_key: success
```

## Test Case 3: Complex Operations with Invalid Cases
**Input (`input3.txt`):**
```
Carol Davis
99999
student
8
name
id
add_grade 95
add_grade 105
add_grade 78
add_grade 92
gpa
verify_key wrong_key
```
**Expected Output (`expected3.txt`):**
```
name: Carol Davis
id: 99999
add_grade: success
add_grade: invalid
add_grade: success
add_grade: success
gpa: 88.33
verify_key: failed
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Name**: Non-empty string, max 100 characters, can contain spaces and letters
2. **ID**: Non-empty string, max 50 characters, alphanumeric
3. **User Type**: Exactly "student" or "teacher" (lowercase)
4. **Operations Count**: Integer between 1 and 20
5. **Grade Values**: Integers, valid range 0-100 for success, outside range for "invalid"
6. **Secret Keys**: Format "key_[ID]" for correct key, anything else for failure

### Output Format Rules:
1. **Name Output**: "name: [actual_name]"
2. **ID Output**: "id: [actual_id]" 
3. **Grade Addition**: "add_grade: success" or "add_grade: invalid"
4. **GPA Output**: "gpa: [calculated_gpa]" (rounded to 2 decimal places)
5. **Key Verification**: "verify_key: success" or "verify_key: failed"
6. **No trailing whitespace** on output lines
7. **Exact format matching** required for comparison

## Language-Specific Considerations

### Python Considerations:
- Use single underscore `_` for protected members (e.g., `self._grades`)
- Use double underscore `__` for private members (e.g., `self.__secret_key`)
- Python doesn't enforce access control, but follows naming conventions
- Use `super().__init__()` for proper inheritance
- Round GPA to 2 decimal places using `round(value, 2)`
- Handle division by zero when calculating GPA of empty grades list

### Go Considerations:
- Use capitalized names for public members (e.g., `Name`, `StudentID`)
- Use lowercase names for private members (e.g., `grades`, `secretKey`)
- Go enforces access control at package level
- Use embedded structs for inheritance-like behavior
- Format floating point numbers to 2 decimal places using `fmt.Sprintf("%.2f", value)`
- Handle empty slices when calculating average

## Performance Requirements
- **Time Complexity**: O(n) where n is number of operations
- **Space Complexity**: O(g) where g is number of grades stored
- **Memory Usage**: Should handle up to 20 operations efficiently
- **Grade Storage**: Should efficiently store and calculate averages

## Edge Cases to Test
1. **Empty Grades List**: GPA calculation with no grades (should return 0.0)
2. **Invalid Grades**: Grades outside 0-100 range (should return "invalid")
3. **Wrong Secret Key**: Any key not matching "key_[ID]" format (should return "failed")
4. **Single Grade**: GPA calculation with only one grade
5. **Maximum Grades**: Multiple grade additions and average calculation
6. **Special Characters**: Names and IDs with various valid characters

## Validation Checklist
- [ ] Input format matches specification exactly
- [ ] All operations are supported and handled correctly
- [ ] GPA calculations are accurate and rounded to 2 decimal places
- [ ] Access modifier concepts are properly demonstrated
- [ ] Secret key generation and verification works correctly
- [ ] Error handling for invalid grades is implemented
- [ ] Inheritance between Student and Teacher classes works properly
- [ ] Output format matches expected format exactly

## Automated Test Case Generation
```python
def generate_test_case(name, id_num, user_type, operations):
    """Generate a test case with given parameters."""
    input_lines = [name, id_num, user_type, str(len(operations))]
    input_lines.extend(operations)
    return "\n".join(input_lines)

def validate_test_case(input_content, expected_content):
    """Validate that test case follows the required format."""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Validate input format
    assert len(input_lines) >= 4, "Input must have at least 4 lines"
    assert input_lines[2] in ["student", "teacher"], "User type must be 'student' or 'teacher'"
    assert input_lines[3].isdigit(), "Operations count must be integer"
    
    operations_count = int(input_lines[3])
    assert len(input_lines) == 4 + operations_count, "Operations count must match actual operations"
    
    # Validate expected output format
    for line in expected_lines:
        assert ":" in line, "Each output line must contain ':'"
    
    return True

def create_comprehensive_test_suite():
    """Create a comprehensive set of test cases covering all scenarios."""
    test_cases = []
    
    # Basic student test
    test_cases.append(generate_test_case(
        "Alice Smith", "12345", "student",
        ["name", "id", "add_grade 85", "gpa", "verify_key key_12345"]
    ))
    
    # Teacher with multiple grades
    test_cases.append(generate_test_case(
        "Bob Johnson", "T001", "teacher", 
        ["name", "id", "add_grade 92", "add_grade 88", "gpa", "verify_key key_T001"]
    ))
    
    # Complex case with invalid operations
    test_cases.append(generate_test_case(
        "Carol Davis", "99999", "student",
        ["name", "id", "add_grade 95", "add_grade 105", "add_grade 78", "add_grade 92", "gpa", "verify_key wrong_key"]
    ))
    
    return test_cases
```
