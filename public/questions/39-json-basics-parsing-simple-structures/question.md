# JSON basics (parsing simple structures)

## Problem Statement

Write a program that parses a JSON string containing personal information and extracts specific fields. This is a fundamental skill for working with APIs, configuration files, and data exchange formats.

Your program should:
1. Read a JSON string from input containing person data
2. Parse the JSON to extract name, age, and city information
3. Handle missing fields gracefully with default values
4. Output the information in a specific formatted structure

This problem teaches you the basics of JSON parsing, data extraction, and error handling - essential skills for modern programming.

## Input Format

The input consists of 1 line:
```
Line 1: A JSON string containing person data with fields like "name", "age", "city"
```

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand JSON format and structure
- Learn to parse JSON strings into data structures
- Practice accessing dictionary/object fields safely
- Handle missing data with default values
- Implement basic error handling for invalid JSON
- Format output according to specifications

## Implementation Guidelines
### Python Example Structure:
```python
import json

def solve():
    # Read JSON string from input
    json_string = input().strip()
    
    # Parse JSON and extract fields
    data = json.loads(json_string)
    name = data.get("name", "Unknown")
    age = data.get("age", 0)
    city = data.get("city", "Unknown")
    
    # Format and print output
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"City: {city}")
```

### Go Example Structure:
```go
import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
    City string `json:"city"`
}

func solve() {
    var jsonString string
    fmt.Scanln(&jsonString)
    
    var person Person
    json.Unmarshal([]byte(jsonString), &person)
    
    if person.Name == "" { person.Name = "Unknown" }
    if person.City == "" { person.City = "Unknown" }
    
    fmt.Printf("Name: %s\n", person.Name)
    fmt.Printf("Age: %d\n", person.Age)
    fmt.Printf("City: %s\n", person.City)
}
```

## Constraints
- JSON string will be valid format (no syntax errors in basic test cases)
- Name and city fields, if present, will be non-empty strings
- Age field, if present, will be a non-negative integer
- Input JSON may contain additional fields that should be ignored
- Missing fields should use default values: "Unknown" for strings, 0 for age
- Output format must match exactly: "Name: X", "Age: Y", "City: Z"

## Hints
- Use `json.loads()` in Python or `json.Unmarshal()` in Go to parse JSON
- Use `.get()` method in Python or struct tags in Go to safely access fields
- Default values help handle incomplete data gracefully
- The JSON might have extra fields - only extract what you need
- Pay attention to exact output formatting including spaces and colons
