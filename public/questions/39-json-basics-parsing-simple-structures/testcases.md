# Test Cases for JSON basics (parsing simple structures)

## Test Case Structure
This question uses a 1-line input format containing a JSON string.

### Input Format Pattern:
```
Line 1: JSON string containing person data with fields like "name", "age", "city"
```

### Output Format Pattern:
```
Name: [name_value]
Age: [age_value]
City: [city_value]
```

## Test Case 1: Basic - Complete Data
**Purpose**: Test with all required fields present
**Input (`input.txt`):**
```
{"name": "Alice", "age": 25, "city": "New York"}
```
**Expected Output (`expected.txt`):**
```
Name: Alice
Age: 25
City: New York
```

## Test Case 2: Edge - Missing Fields
**Purpose**: Test handling of missing fields with default values
**Input (`input2.txt`):**
```
{"name": "Bob"}
```
**Expected Output (`expected2.txt`):**
```
Name: Bob
Age: 0
City: Unknown
```

## Test Case 3: Complex - Extra Fields & Special Characters
**Purpose**: Test with additional fields and international characters
**Input (`input3.txt`):**
```
{"name": "Maria García", "age": 45, "city": "São Paulo", "country": "Brazil", "occupation": "Engineer", "email": "maria@example.com"}
```
**Expected Output (`expected3.txt`):**
```
Name: Maria García
Age: 45
City: São Paulo
```

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be a valid JSON string on a single line
2. JSON must contain at least one field
3. If "name" field exists, it should be a non-empty string
4. If "age" field exists, it should be a non-negative integer
5. If "city" field exists, it should be a non-empty string
6. Additional fields in JSON should be ignored

### Output Format Rules:
1. Output must have exactly 3 lines in the specified format
2. Missing name field should default to "Unknown"
3. Missing age field should default to 0
4. Missing city field should default to "Unknown"
5. Format: "Name: {value}" with exactly one space after colon
6. Format: "Age: {value}" with exactly one space after colon
7. Format: "City: {value}" with exactly one space after colon

## Language-Specific Considerations
### Python Considerations:
- Use `json.loads()` to parse JSON string
- Use `.get()` method for safe field access with defaults
- Handle potential JSONDecodeError for invalid JSON
- Use f-strings or format() for output formatting
- Ensure proper string encoding for international characters

### Go Considerations:
- Use `encoding/json` package for JSON parsing
- Define struct with appropriate json tags
- Handle missing fields with default values
- Use `json.Unmarshal()` for parsing
- Ensure proper UTF-8 handling for international characters

## Validation Checklist
- [ ] Input has exactly 1 line containing valid JSON
- [ ] Output has exactly 3 lines in specified format
- [ ] Missing fields use correct default values
- [ ] Extra fields in JSON are properly ignored
- [ ] International characters are handled correctly
- [ ] Output format matches exactly (spaces, colons, case)

## Automated Test Case Generation
```python
import json
import random

def generate_test_case():
    """Generate a random test case for JSON parsing"""
    names = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "Gabriel", "Hannah", "Igor", "Julia"]
    cities = ["New York", "London", "Paris", "Tokyo", "Sydney", "Toronto", "Berlin", "Moscow", "Beijing", "Mumbai"]
    
    # Randomly decide which fields to include
    include_name = random.choice([True, True, True, False])  # 75% chance
    include_age = random.choice([True, True, False])  # 66% chance  
    include_city = random.choice([True, True, False])  # 66% chance
    
    data = {}
    if include_name:
        data["name"] = random.choice(names)
    if include_age:
        data["age"] = random.randint(18, 80)
    if include_city:
        data["city"] = random.choice(cities)
    
    # Add some random extra fields occasionally
    if random.random() < 0.3:
        data["country"] = random.choice(["USA", "UK", "France", "Japan", "Australia"])
    if random.random() < 0.2:
        data["occupation"] = random.choice(["Engineer", "Teacher", "Doctor", "Artist", "Manager"])
    
    return json.dumps(data)

def validate_test_case(input_content, expected_content):
    """Validate that test case input/output pair is correct"""
    try:
        # Parse input JSON
        data = json.loads(input_content.strip())
        
        # Extract expected values
        name = data.get("name", "Unknown")
        age = data.get("age", 0)
        city = data.get("city", "Unknown")
        
        # Generate expected output
        expected_lines = [
            f"Name: {name}",
            f"Age: {age}",
            f"City: {city}"
        ]
        expected_output = "\n".join(expected_lines)
        
        # Compare with provided expected output
        return expected_output.strip() == expected_content.strip()
    except:
        return False

# Generate performance test case with large JSON
def generate_performance_test():
    """Generate a test case with a large JSON object"""
    data = {
        "name": "Performance Tester",
        "age": 30,
        "city": "Test City"
    }
    
    # Add many extra fields to test parsing performance
    for i in range(1000):
        data[f"field_{i}"] = f"value_{i}"
    
    return json.dumps(data)
```
