# Test Cases for Linked lists (singly)

## Test Case Structure
This question uses a 1-line input format where space-separated integers represent the linked list values.

### Input Format Pattern:
```
Line 1: Space-separated integers (or empty line for empty list)
```

### Output Format Pattern:
```
Space-separated integers in reversed order (or empty line for empty list)
```

## Test Case 1: Basic - Multiple Elements
**Input (`input.txt`):**
```
1 2 3 4 5
```
**Expected Output (`expected.txt`):**
```
5 4 3 2 1
```
**Description**: Tests basic reversal functionality with a medium-sized list.

## Test Case 2: Edge - Single Element
**Input (`input2.txt`):**
```
42
```
**Expected Output (`expected2.txt`):**
```
42
```
**Description**: Tests edge case where the list has only one element (should remain unchanged).

## Test Case 3: Performance - Large List
**Input (`input3.txt`):**
```
Large list with 1000 elements (1 through 1000)
```
**Expected Output (`expected3.txt`):**
```
Large list with 1000 elements (1000 through 1 in reverse)
```
**Description**: Tests performance with a large input to ensure O(n) time complexity.

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be on a single line
2. Elements must be space-separated integers
3. Empty input represents an empty linked list
4. Each integer must be within the range [-10^9, 10^9]
5. Maximum 100,000 elements allowed

### Output Format Rules:
1. Output must be on a single line
2. Elements must be space-separated integers in reversed order
3. Empty input should produce empty output
4. No trailing spaces or newlines except the final newline
5. Integers should be formatted without leading zeros (except for 0 itself)

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read and clean the input line
- Handle empty input with `if not line:` check
- Use `list(map(int, line.split()))` to parse integers
- Use `" ".join(map(str, values))` to format output
- Consider using list slicing `[::-1]` for reversal

### Go Considerations:
- Use `bufio.Scanner` to read input line
- Use `strings.Fields()` to split space-separated values
- Use `strconv.Atoi()` to convert strings to integers
- Handle empty input by checking if line is empty after trimming
- Use `strings.Join()` to format output

## Validation Checklist
- [ ] Input has exactly 1 line (or empty for empty list)
- [ ] All elements are valid integers within constraints
- [ ] Output matches expected reversal
- [ ] Empty input produces empty output
- [ ] Single element input produces same single element output
- [ ] Large inputs complete within reasonable time (< 1 second)
- [ ] No trailing spaces in output
- [ ] Solution handles edge cases gracefully

## Automated Test Case Generation
```python
import random

def generate_test_case(size=None):
    """Generate a test case for linked list reversal"""
    if size is None:
        size = random.randint(0, 100)
    
    if size == 0:
        return "", ""
    
    values = [random.randint(-1000, 1000) for _ in range(size)]
    input_content = " ".join(map(str, values))
    expected_content = " ".join(map(str, reversed(values)))
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted"""
    # Check input format
    if input_content.strip() == "":
        return expected_content.strip() == ""
    
    try:
        values = list(map(int, input_content.strip().split()))
        expected_values = list(map(int, expected_content.strip().split()))
        return expected_values == list(reversed(values))
    except ValueError:
        return False

# Example usage for additional test cases:
# Basic tests: [1, 2, 3], [10], [], [-1, -2, -3]
# Edge cases: [0], [1000000], [-1000000], large alternating positive/negative
# Performance: 10000+ elements, all same value, sorted/reverse sorted
```

## Additional Test Scenarios to Consider
1. **Empty List**: Input with no elements
2. **Single Element**: Various single values (positive, negative, zero)
3. **Two Elements**: Minimal case for actual reversal
4. **Duplicate Elements**: Lists with repeated values
5. **Negative Numbers**: Mix of positive and negative values
6. **Large Numbers**: Values near the constraint limits
7. **Sorted Lists**: Already sorted (ascending/descending) lists
8. **Random Lists**: Unordered sequences
9. **Performance Tests**: Lists with 10,000+ elements
10. **Boundary Values**: Testing with constraint limits (0, 100,000 elements)
