# Test Cases for Range-based loops

## Test Case Structure
This question uses a 2-line input format with array elements.

### Input Format Pattern:
```
Line 1: n (number of elements)
Line 2: n space-separated integers
```

### Output Format Pattern:
```
Single integer (sum of all elements)
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
5
1 2 3 4 5
```
**Expected Output (`expected.txt`):**
```
15
```
**Description**: Basic test case with small positive integers. Tests fundamental range-based loop functionality and correct sum calculation (1+2+3+4+5=15).

## Test Case 2: Edge
**Input (`input2.txt`):**
```
1
42
```
**Expected Output (`expected2.txt`):**
```
42
```
**Description**: Edge case with single element array. Tests that the solution handles the minimal case correctly and doesn't require multiple elements.

## Test Case 3: Performance
**Input (`input3.txt`):**
```
1000
1 2 3 4 5 ... [continues to 1000]
```
**Expected Output (`expected3.txt`):**
```
500500
```
**Description**: Performance test case with 1000 elements (sum from 1 to 1000). Tests that range-based loop implementation is efficient enough for larger datasets. The expected result is the sum of integers 1 through 1000, which equals n*(n+1)/2 = 1000*1001/2 = 500500.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must contain a positive integer n (1 ≤ n ≤ 100,000)
2. Second line must contain exactly n space-separated integers
3. Each integer must be within range -1,000,000 ≤ value ≤ 1,000,000
4. No trailing spaces after the numbers
5. Input must end with a newline character

### Output Format Rules:
1. Output must be a single integer on one line
2. No leading or trailing whitespace except the final newline
3. Output must be the exact mathematical sum of all input elements
4. Handle potential integer overflow (sum may exceed individual element limits)

## Language-Specific Considerations
### Python Considerations:
- Use `for element in collection` syntax (range-based)
- Avoid `for i in range(len(collection))` syntax (index-based)
- Use `list(map(int, input().split()))` to parse space-separated integers
- `int()` conversion handles leading/trailing whitespace automatically
- Python handles arbitrary precision integers, so overflow isn't a concern

### Go Considerations:
- Use `for _, element := range collection` syntax (range-based)
- Avoid `for i := 0; i < len(collection); i++` syntax (index-based)
- Use `fmt.Scanf()` or buffer reading for input parsing
- Be aware of integer overflow limits (int64 max: 9,223,372,036,854,775,807)
- Consider using `int64` for sum accumulation to prevent overflow

### General Considerations:
- Range-based loops are more readable and less error-prone
- They eliminate index out-of-bounds errors
- Performance is typically equivalent or better than index-based loops
- Focus on element access rather than position/index access

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] First line contains valid positive integer n
- [ ] Second line contains exactly n space-separated integers
- [ ] All integers are within specified range
- [ ] Solution uses range-based loop syntax
- [ ] Output is correct mathematical sum
- [ ] No index-based loop constructs used
- [ ] Code follows language-specific best practices

## Automated Test Case Generation
```python
def generate_test_case(n_elements, min_val=-1000, max_val=1000):
    """Generate a test case with n_elements random integers"""
    import random
    
    numbers = [random.randint(min_val, max_val) for _ in range(n_elements)]
    input_content = f"{n_elements}\n{' '.join(map(str, numbers))}\n"
    expected_content = f"{sum(numbers)}\n"
    
    return input_content, expected_content

def generate_edge_cases():
    """Generate common edge cases"""
    cases = []
    
    # Single element
    cases.append(("1\n42\n", "42\n"))
    
    # All zeros
    cases.append(("3\n0 0 0\n", "0\n"))
    
    # Negative numbers
    cases.append(("4\n-5 -3 -1 -2\n", "-11\n"))
    
    # Mixed positive/negative
    cases.append(("4\n-10 5 -3 8\n", "0\n"))
    
    return cases

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted"""
    lines = input_content.strip().split('\n')
    
    # Check line count
    if len(lines) != 2:
        return False, "Input must have exactly 2 lines"
    
    # Validate first line (n)
    try:
        n = int(lines[0])
        if n <= 0:
            return False, "n must be positive"
    except ValueError:
        return False, "First line must be a valid integer"
    
    # Validate second line (numbers)
    try:
        numbers = list(map(int, lines[1].split()))
        if len(numbers) != n:
            return False, f"Expected {n} numbers, got {len(numbers)}"
    except ValueError:
        return False, "Second line must contain valid integers"
    
    # Validate expected output
    try:
        expected_sum = int(expected_content.strip())
        actual_sum = sum(numbers)
        if expected_sum != actual_sum:
            return False, f"Expected sum {actual_sum}, got {expected_sum}"
    except ValueError:
        return False, "Expected output must be a valid integer"
    
    return True, "Test case is valid"
```
