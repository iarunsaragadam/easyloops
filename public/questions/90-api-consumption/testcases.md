# Test Cases for API Consumption

## Test Case Structure
This question uses JSON API response processing with variable input format.

### Input Format Pattern:
```
Line 1: N (number of JSON responses)
Next N lines: JSON strings representing API responses
```

### Output Format Pattern:
```
Department: <department_name> | Count: <user_count> | Average Age: <average_age>
```
Output is sorted alphabetically by department name.

## Test Case 1: Basic Scenario
**Input (`input.txt`):**
```
3
{"users": [{"name": "Alice Johnson", "age": 28, "department": "Engineering"}, {"name": "Bob Smith", "age": 32, "department": "Marketing"}]}
{"users": [{"name": "Carol Davis", "age": 30, "department": "Engineering"}, {"name": "David Wilson", "age": 35, "department": "Sales"}]}
{"users": [{"name": "Eva Brown", "age": 27, "department": "Marketing"}]}
```
**Expected Output (`expected.txt`):**
```
Department: Engineering | Count: 2 | Average Age: 29.0
Department: Marketing | Count: 2 | Average Age: 29.5
Department: Sales | Count: 1 | Average Age: 35.0
```

**Test Case Purpose**: Validates basic JSON parsing, data aggregation, and statistical calculation across multiple API responses.

## Test Case 2: Edge Cases
**Input (`input2.txt`):**
```
2
{"users": []}
{"invalid": "json", "missing": "users"}
```
**Expected Output (`expected2.txt`):**
```
```

**Test Case Purpose**: Tests error handling for empty user arrays and malformed JSON responses. Should produce no output when no valid users are found.

## Test Case 3: Large Dataset
**Input (`input3.txt`):**
```
1
{"users": [{"name": "User1", "age": 25, "department": "Engineering"}, {"name": "User2", "age": 30, "department": "Engineering"}, {"name": "User3", "age": 35, "department": "Marketing"}, {"name": "User4", "age": 40, "department": "Marketing"}, {"name": "User5", "age": 45, "department": "Sales"}, {"name": "User6", "age": 50, "department": "Sales"}, {"name": "User7", "age": 28, "department": "HR"}, {"name": "User8", "age": 33, "department": "HR"}, {"name": "User9", "age": 38, "department": "Finance"}, {"name": "User10", "age": 43, "department": "Finance"}]}
```
**Expected Output (`expected3.txt`):**
```
Department: Engineering | Count: 2 | Average Age: 27.5
Department: Finance | Count: 2 | Average Age: 40.5
Department: HR | Count: 2 | Average Age: 30.5
Department: Marketing | Count: 2 | Average Age: 37.5
Department: Sales | Count: 2 | Average Age: 47.5
```

**Test Case Purpose**: Tests performance with larger datasets and validates sorting of multiple departments.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a positive integer N
2. Each subsequent line should be a valid JSON string
3. JSON responses must contain "users" array (may be empty)
4. Each user must have "name", "age", and "department" fields
5. Age must be a positive number
6. Department must be a non-empty string

### Output Format Rules:
1. One line per department with users
2. Format: "Department: <name> | Count: <count> | Average Age: <avg>"
3. Average age rounded to 1 decimal place
4. Departments sorted alphabetically
5. No output if no valid users found

### Edge Cases to Consider:
- Empty JSON responses (`{"users": []}`)
- Malformed JSON strings
- Missing required fields in user objects
- Invalid data types (non-numeric ages, etc.)
- Special characters in department names
- Very large numbers of users or responses

## Language-Specific Considerations

### Python Considerations:
- Use `json.loads()` for JSON parsing
- Handle `json.JSONDecodeError` for malformed JSON
- Use `defaultdict` for efficient grouping
- Format floats with `:.1f` for consistent output

### Go Considerations:
- Use `encoding/json` package for parsing
- Handle unmarshaling errors gracefully
- Use `sort.Strings()` for department sorting
- Format floats with `%.1f` in printf

### JavaScript Considerations:
- Use `JSON.parse()` with try-catch for error handling
- Use `Object.keys().sort()` for ordered output
- Use `toFixed(1)` for decimal formatting

## Performance Characteristics

### Time Complexity: O(U + D log D)
- U = total number of users across all responses
- D = number of unique departments
- Linear time for processing users, logarithmic for sorting departments

### Space Complexity: O(U + D)
- Storage for all user data and department statistics

### Expected Performance:
- Should handle 100 JSON responses with 1000 users each
- Should complete within 2 seconds on modern hardware
- Memory usage should remain under 256 MB

## Validation Checklist
- [ ] JSON parsing works correctly
- [ ] Handles malformed JSON gracefully
- [ ] Aggregates users across multiple responses
- [ ] Calculates correct average ages
- [ ] Sorts departments alphabetically
- [ ] Formats output exactly as specified
- [ ] Handles edge cases (empty arrays, missing fields)
- [ ] Performance meets requirements

## Common Pitfalls
1. **JSON Parsing Errors**: Not handling malformed JSON
2. **Type Errors**: Not validating data types of age fields
3. **Division by Zero**: When calculating averages for empty departments
4. **Sorting**: Forgetting to sort departments alphabetically
5. **Formatting**: Incorrect decimal places in average age
6. **Case Sensitivity**: Department name comparison issues

## Automated Test Case Generation
```python
import json
import random

def generate_test_case(num_responses=3, users_per_response=5):
    departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"]
    names = ["Alice", "Bob", "Carol", "David", "Eva", "Frank", "Grace"]
    
    responses = []
    for _ in range(num_responses):
        users = []
        for _ in range(random.randint(1, users_per_response)):
            user = {
                "name": random.choice(names) + " " + random.choice(names),
                "age": random.randint(22, 65),
                "department": random.choice(departments)
            }
            users.append(user)
        responses.append({"users": users})
    
    return responses

def validate_test_case(input_content, expected_content):
    # Parse input and verify format
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    assert len(lines) == n + 1, "Input format mismatch"
    
    for i in range(1, n + 1):
        json.loads(lines[i])  # Validate JSON format
    
    # Validate expected output format
    if expected_content.strip():
        for line in expected_content.strip().split('\n'):
            assert line.startswith("Department: "), "Output format error"
            assert " | Count: " in line, "Output format error"
            assert " | Average Age: " in line, "Output format error"
```
