# Test Cases for CSV file handling

## Test Case Structure
This question uses a **multi-line input format** where the first line is the number of records, second line is the target city, and subsequent lines contain CSV data.

### Input Format Pattern:
```
Line 1: Number of people (n) - integer
Line 2: Target city to count - string  
Next n lines: Person data in CSV format "name,age,city"
```

### Output Format Pattern:
```
<count of people from target city>
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
5
New York
Alice,25,New York
Bob,30,Los Angeles
Charlie,35,New York
Diana,28,Chicago
Eve,22,New York
```
**Expected Output (`expected.txt`):**
```
3
```

## Test Case 2: Edge - Case Insensitive Matching
**Input (`input2.txt`):**
```
3
tokyo
John,25,Tokyo
Jane,30,TOKYO
Mike,35,New York
```
**Expected Output (`expected2.txt`):**
```
2
```

## Test Case 3: Complex - No Matches Found
**Input (`input3.txt`):**
```
4
Paris
John,25,London
Jane,30,Berlin
Mike,35,Madrid
Sarah,40,Rome
```
**Expected Output (`expected3.txt`):**
```
0
```

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer (number of people)
2. Second line must be a non-empty string (target city)
3. Each subsequent line must follow CSV format: "name,age,city"
4. Number of data lines must match the count in line 1
5. Names and cities can contain letters, spaces, and basic punctuation
6. Ages must be positive integers

### Output Format Rules:
1. Output must be a single integer (count of matches)
2. Count can be 0 if no matches found
3. No trailing spaces or additional characters
4. Newline at end of output

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read and clean input lines
- Use `line.split(',')` to parse CSV data
- Use `str.lower()` for case-insensitive comparison
- Handle potential whitespace in CSV fields with `strip()`

### Go Considerations:
- Use `bufio.Scanner` to read input lines
- Use `strings.Split()` to parse CSV data
- Use `strings.ToLower()` for case-insensitive comparison
- Use `strings.TrimSpace()` to handle whitespace

### JavaScript Considerations:
- Use `readline` or similar to read input
- Use `split(',')` to parse CSV data
- Use `toLowerCase()` for case-insensitive comparison
- Use `trim()` to handle whitespace

## Validation Checklist
- [ ] Input has correct number of lines (n + 2)
- [ ] First line is a valid positive integer
- [ ] Second line is a non-empty string (target city)
- [ ] Each data line has exactly 3 CSV fields
- [ ] Output is a single non-negative integer
- [ ] Case-insensitive matching works correctly
- [ ] Handles edge cases (no matches, all matches)

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random test case for CSV file handling"""
    cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
              "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]
    names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", 
             "Henry", "Ivy", "Jack", "Kate", "Liam", "Maya", "Noah"]
    
    n = random.randint(1, 20)
    target_city = random.choice(cities)
    
    # Ensure at least one match for variety
    guaranteed_match = random.choice([True, False])
    
    people = []
    for i in range(n):
        name = random.choice(names)
        age = random.randint(18, 80)
        
        if i == 0 and guaranteed_match:
            # Guarantee at least one match
            city = target_city
        else:
            city = random.choice(cities)
        
        people.append(f"{name},{age},{city}")
    
    # Generate input
    input_lines = [str(n), target_city] + people
    
    # Calculate expected output
    count = sum(1 for person in people 
                if person.split(',')[2].strip().lower() == target_city.lower())
    
    return '\n'.join(input_lines), str(count)

def validate_test_case(input_content, expected_content):
    """Validate a test case for correctness"""
    lines = input_content.strip().split('\n')
    
    # Check minimum lines
    if len(lines) < 2:
        return False, "Input must have at least 2 lines"
    
    # Validate first line (number of people)
    try:
        n = int(lines[0])
        if n <= 0:
            return False, "Number of people must be positive"
    except ValueError:
        return False, "First line must be a valid integer"
    
    # Check total lines
    if len(lines) != n + 2:
        return False, f"Expected {n + 2} lines, got {len(lines)}"
    
    # Validate target city (second line)
    target_city = lines[1].strip()
    if not target_city:
        return False, "Target city cannot be empty"
    
    # Validate CSV data lines
    for i in range(2, len(lines)):
        parts = lines[i].split(',')
        if len(parts) != 3:
            return False, f"Line {i + 1} must have exactly 3 CSV fields"
        
        # Check age is numeric
        try:
            age = int(parts[1].strip())
            if age <= 0:
                return False, f"Age must be positive on line {i + 1}"
        except ValueError:
            return False, f"Age must be a valid integer on line {i + 1}"
    
    # Validate expected output
    try:
        expected_count = int(expected_content.strip())
        if expected_count < 0:
            return False, "Expected count must be non-negative"
    except ValueError:
        return False, "Expected output must be a valid integer"
    
    return True, "Test case is valid"
```
