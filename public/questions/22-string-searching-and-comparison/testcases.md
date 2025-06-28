# Test Cases for String searching and comparison

## Test Case Structure
This question uses a 2-line input format with comprehensive output covering multiple string operations.

### Input Format Pattern:
```
Line 1: Text string (the string to search within)
Line 2: Pattern string (the string to search for)
```

### Output Format Pattern:
```
Line 1: "YES" or "NO" - Case-sensitive substring search result
Line 2: "YES" or "NO" - Exact equality check result
Line 3: "YES" or "NO" - Case-insensitive equality check result
Line 4: Integer - Position of first occurrence (case-sensitive, -1 if not found)
Line 5: "YES" or "NO" - Case-insensitive substring search result
```

## Test Case Categories

### Basic Test Cases (input1.txt - input25.txt)
Simple, straightforward cases demonstrating core functionality.

**Example - Test Case 1: Basic substring found**
**Input (`input1.txt`):**
```
Hello World
World
```
**Expected Output (`expected1.txt`):**
```
YES
NO
NO
6
YES
```

**Example - Test Case 2: Identical strings**
**Input (`input2.txt`):**
```
hello
hello
```
**Expected Output (`expected2.txt`):**
```
YES
YES
YES
0
YES
```

### Edge Test Cases (input26.txt - input50.txt)
Boundary conditions, empty patterns, case differences, and special scenarios.

**Example - Test Case 26: Case sensitivity**
**Input (`input26.txt`):**
```
Hello
hello
```
**Expected Output (`expected26.txt`):**
```
NO
NO
YES
-1
YES
```

**Example - Test Case 27: Pattern not found**
**Input (`input27.txt`):**
```
Programming
xyz
```
**Expected Output (`expected27.txt`):**
```
NO
NO
NO
-1
NO
```

### Performance Test Cases (input51.txt - input75.txt)
Large inputs testing algorithm efficiency and time limits.

**Example - Test Case 51: Large text with small pattern**
- Text: 50,000 characters
- Pattern: Small substring that appears near the end
- Tests efficient string searching algorithms

### Complex Scenarios (input76.txt - input100.txt)
Multiple edge cases combined, special characters, repeated patterns.

**Example - Test Case 76: Multiple occurrences**
**Input (`input76.txt`):**
```
abcabcabc
abc
```
**Expected Output (`expected76.txt`):**
```
YES
NO
NO
0
YES
```

## Test Case Creation Rules

### Input Validation Rules:
1. Text string length: 1 ≤ length ≤ 100,000 characters
2. Pattern string length: 1 ≤ length ≤ 1,000 characters
3. Both strings contain printable ASCII characters (space to ~)
4. No leading/trailing whitespace except single newline at end
5. Each input file has exactly 2 lines

### Output Format Rules:
1. Exactly 5 lines of output
2. Lines 1, 2, 3, 5: Must be either "YES" or "NO" (uppercase)
3. Line 4: Integer representing position (-1 if not found)
4. No extra whitespace or formatting
5. Single newline character at end of each line

## Language-Specific Considerations

### Python Considerations:
- Use `input().rstrip('\n\r')` to read strings (preserve whitespace, remove only line endings)
- Use `string.find(substring)` for position finding (returns -1 if not found)
- Use `substring in string` for containment checking
- Use `string.lower()` for case-insensitive operations
- Handle Unicode characters properly if present
- Whitespace in patterns should be preserved as it's significant for matching

### Go Considerations:
- Use `bufio.Scanner` for reading input lines
- Use `strings.Contains()` for substring checking
- Use `strings.Index()` for position finding (returns -1 if not found)
- Use `strings.ToLower()` for case conversion
- Import necessary packages: `strings`, `bufio`, `os`

### JavaScript Considerations:
- Use `require('fs').readFileSync(0, 'utf8').trim().split('\n')` for input
- Use `string.includes(substring)` for containment checking
- Use `string.indexOf(substring)` for position finding
- Use `string.toLowerCase()` for case conversion
- Handle potential undefined behavior with proper error checking

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] Text length is within bounds (1-100,000)
- [ ] Pattern length is within bounds (1-1,000)
- [ ] Output has exactly 5 lines
- [ ] YES/NO answers are uppercase and exact
- [ ] Position is correct integer (-1 for not found)
- [ ] Case-sensitive operations work correctly
- [ ] Case-insensitive operations work correctly
- [ ] All test cases cover different scenarios
- [ ] Performance cases complete within time limits
- [ ] Expected outputs generated from verified solution

## Automated Test Case Generation

```python
def generate_basic_test_case(text, pattern):
    """Generate a basic test case for string searching and comparison"""
    input_content = f"{text}\n{pattern}"
    
    # Calculate expected outputs
    contains_sensitive = pattern in text
    exactly_equal = text == pattern
    case_insensitive_equal = text.lower() == pattern.lower()
    position = text.find(pattern)
    contains_insensitive = pattern.lower() in text.lower()
    
    expected_content = (
        f"{'YES' if contains_sensitive else 'NO'}\n"
        f"{'YES' if exactly_equal else 'NO'}\n"
        f"{'YES' if case_insensitive_equal else 'NO'}\n"
        f"{position}\n"
        f"{'YES' if contains_insensitive else 'NO'}"
    )
    
    return input_content, expected_content

def generate_performance_test_case(text_length, pattern_length):
    """Generate a performance test case with specified lengths"""
    import random
    import string
    
    # Generate large text
    text = ''.join(random.choices(string.ascii_letters + string.digits + ' ', k=text_length))
    
    # Generate pattern that appears in text
    start_pos = random.randint(0, max(0, text_length - pattern_length))
    pattern = text[start_pos:start_pos + pattern_length]
    
    return generate_basic_test_case(text, pattern)

def validate_test_case(input_content, expected_content):
    """Validate that test case is correctly formatted"""
    try:
        # Check input format
        input_lines = input_content.strip().split('\n')
        if len(input_lines) != 2:
            return False, "Input must have exactly 2 lines"
        
        text, pattern = input_lines[0], input_lines[1]
        
        if not (1 <= len(text) <= 100000):
            return False, "Text length must be between 1 and 100,000"
        
        if not (1 <= len(pattern) <= 1000):
            return False, "Pattern length must be between 1 and 1,000"
        
        # Check expected output format
        expected_lines = expected_content.strip().split('\n')
        if len(expected_lines) != 5:
            return False, "Expected output must have exactly 5 lines"
        
        # Validate YES/NO answers
        for i in [0, 1, 2, 4]:
            if expected_lines[i] not in ["YES", "NO"]:
                return False, f"Line {i+1} must be 'YES' or 'NO'"
        
        # Validate position (line 4, index 3)
        try:
            position = int(expected_lines[3])
            if position < -1:
                return False, "Position must be >= -1"
        except ValueError:
            return False, "Position must be a valid integer"
        
        return True, "Valid test case"
        
    except Exception as e:
        return False, f"Validation error: {str(e)}"

def verify_expected_output(text, pattern, expected_output):
    """Verify that expected output matches actual algorithm results"""
    lines = expected_output.strip().split('\n')
    
    # Check each result
    contains_sensitive = pattern in text
    exactly_equal = text == pattern
    case_insensitive_equal = text.lower() == pattern.lower()
    position = text.find(pattern)
    contains_insensitive = pattern.lower() in text.lower()
    
    expected_results = [
        "YES" if contains_sensitive else "NO",
        "YES" if exactly_equal else "NO", 
        "YES" if case_insensitive_equal else "NO",
        str(position),
        "YES" if contains_insensitive else "NO"
    ]
    
    return lines == expected_results
```
