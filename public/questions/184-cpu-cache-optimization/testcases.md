# Test Cases for CPU Cache Optimization

## Test Case Structure
This question uses a multi-line input format representing a matrix.

### Input Format Pattern:
```
Line 1: N M (matrix dimensions)
Next N lines: M space-separated integers
```

### Output Format Pattern:
```
integer (sum of all matrix elements)
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
3 3
1 2 3
4 5 6
7 8 9
```
**Expected Output (`expected.txt`):**
```
45
```
*Simple 3x3 matrix to verify basic functionality. Sum: 1+2+3+4+5+6+7+8+9 = 45*

## Test Case 2: Edge Cases
**Input (`input2.txt`):**
```
1 1
42
```
**Expected Output (`expected2.txt`):**
```
42
```
*Single element matrix to test edge case handling.*

## Test Case 3: Performance Test
**Input (`input3.txt`):**
```
100 100
[100x100 matrix with random values 1-100]
```
**Expected Output (`expected3.txt`):**
```
[sum of all elements]
```
*Large matrix to test cache optimization. Inefficient column-wise traversal will be significantly slower than row-wise traversal.*

## Test Case Creation Rules
### Input Validation Rules:
1. First line must contain exactly two positive integers N and M
2. Must have exactly N subsequent lines
3. Each line must contain exactly M space-separated integers
4. Matrix elements must be valid integers within range [-1000, 1000]

### Output Format Rules:
1. Single integer on one line
2. No trailing spaces or extra newlines
3. Result must fit in 32-bit signed integer

## Language-Specific Considerations
### Python Considerations:
- Use `input().split()` to read matrix dimensions and elements efficiently
- Process rows sequentially for better cache locality
- Avoid storing entire matrix if only calculating sum
- Use built-in `sum()` function for row sums when possible

### Go Considerations:
- Use `bufio.Scanner` for efficient line reading
- Parse integers with `strconv.Atoi`
- Access matrix elements in row-major order
- Avoid unnecessary memory allocations

### Cache Optimization Notes:
- **Good**: Row-by-row traversal (cache-friendly)
- **Bad**: Column-by-column traversal (cache-unfriendly)
- **Reason**: Matrix elements are stored contiguously in row-major order in memory

## Validation Checklist
- [ ] Input has valid matrix dimensions on first line
- [ ] Matrix has exactly N rows and M columns
- [ ] All elements are valid integers
- [ ] Output is a single integer
- [ ] Solution handles edge cases (1x1, single row, single column)
- [ ] Performance test passes within time limits using efficient traversal

## Automated Test Case Generation
```python
import random

def generate_test_case(n=None, m=None, seed=42):
    """Generate a random matrix test case."""
    random.seed(seed)
    
    if n is None:
        n = random.randint(1, 10)
    if m is None:
        m = random.randint(1, 10)
    
    # Generate input
    input_lines = [f"{n} {m}"]
    total_sum = 0
    
    for i in range(n):
        row = []
        for j in range(m):
            val = random.randint(-100, 100)
            row.append(val)
            total_sum += val
        input_lines.append(" ".join(map(str, row)))
    
    input_content = "\n".join(input_lines) + "\n"
    expected_content = f"{total_sum}\n"
    
    return input_content, expected_content

def generate_performance_case(n=100, m=100, seed=42):
    """Generate large matrix for performance testing."""
    return generate_test_case(n, m, seed)

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted."""
    lines = input_content.strip().split('\n')
    
    # Validate dimensions line
    n, m = map(int, lines[0].split())
    assert n >= 1 and m >= 1, "Invalid dimensions"
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    # Validate matrix content and calculate expected sum
    calculated_sum = 0
    for i in range(1, n + 1):
        row = list(map(int, lines[i].split()))
        assert len(row) == m, f"Row {i} has {len(row)} elements, expected {m}"
        calculated_sum += sum(row)
    
    # Validate expected output
    expected_sum = int(expected_content.strip())
    assert calculated_sum == expected_sum, f"Sum mismatch: calculated {calculated_sum}, expected {expected_sum}"
```
