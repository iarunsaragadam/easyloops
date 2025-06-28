# Test Cases for Fibonacci Generator

## Test Case Structure
This question uses a single-line input format and multi-line output format.

### Input Format Pattern:
```
Line 1: A positive integer N (1 ≤ N ≤ 1000)
```

### Output Format Pattern:
```
N lines, each containing one Fibonacci number
Starting from F(0) = 0, F(1) = 1, F(2) = 1, etc.
```

## Comprehensive Test Case Categories

### Basic Test Cases (input1.txt - input30.txt)
Simple, straightforward cases to verify basic functionality:
- **input1.txt**: N = 1 (single Fibonacci number)
- **input2.txt**: N = 2 (first two Fibonacci numbers)
- **input3.txt**: N = 5 (small sequence)
- **input4.txt**: N = 10 (medium sequence)
- **input5.txt**: N = 15 (larger basic sequence)
- **input6.txt** to **input30.txt**: Various values from 3 to 25

### Edge Cases (input31.txt - input50.txt)
Boundary conditions and special cases:
- **input31.txt**: N = 1 (minimum valid input)
- **input32.txt**: N = 2 (two elements)
- **input33.txt**: N = 20 (boundary between small and medium)
- **input34.txt**: N = 50 (medium-large boundary)
- **input35.txt** to **input50.txt**: Various boundary values

### Performance Test Cases (input51.txt - input80.txt)
Large inputs that test generator efficiency:
- **input51.txt**: N = 100 (large sequence)
- **input52.txt**: N = 200 (very large sequence) 
- **input53.txt**: N = 500 (stress test)
- **input54.txt**: N = 1000 (maximum allowed input)
- **input55.txt** to **input80.txt**: Various large values from 75-999

### Complex Scenarios (input81.txt - input100.txt+)
Various intermediate values for comprehensive coverage:
- **input81.txt** to **input100.txt**: Random values across the range
- **input101.txt** to **input150.txt**: Additional coverage for all ranges

## Test Case Examples

### Test Case 1: Basic (N=5)
**Input (`input1.txt`):**
```
5
```
**Expected Output (`expected1.txt`):**
```
0
1
1
2
3
```

### Test Case 2: Edge (N=1)
**Input (`input2.txt`):**
```
1
```
**Expected Output (`expected2.txt`):**
```
0
```

### Test Case 3: Performance (N=100)
**Input (`input3.txt`):**
```
100
```
**Expected Output (`expected3.txt`):**
```
0
1
1
2
3
5
8
13
21
34
... (continues for 100 lines)
```

## Test Case Creation Rules

### Input Validation Rules:
1. Input must be a single positive integer N
2. 1 ≤ N ≤ 1000 (within constraints)
3. No leading/trailing whitespace except standard newline
4. No invalid characters (only digits)
5. No floating point numbers (integers only)

### Output Format Rules:
1. Exactly N lines of output
2. Each line contains one Fibonacci number
3. Numbers start from F(0) = 0
4. Each number on its own line (no extra spacing)
5. No trailing whitespace on lines
6. Standard newline after each number

## Language-Specific Considerations

### Python Considerations:
- Must use `yield` keyword to create generator function
- Generator should be infinite (no predetermined stop condition)
- Use `next()` function or iteration to get values from generator
- Large Fibonacci numbers handled correctly (Python has arbitrary precision integers)
- Memory efficiency: generator should not store all values

### Go Considerations:
- Go doesn't have built-in generators; use channels or iterators
- Channel-based approach with goroutines recommended
- Handle large integers (may need big.Int for very large Fibonacci numbers)
- Proper channel closing to prevent deadlocks
- Memory efficiency through streaming approach

### JavaScript Considerations:
- Use generator functions with `function*` syntax
- `yield` keyword for producing values
- Numbers may become imprecise for very large Fibonacci values (use BigInt if needed)
- Proper iteration with `for...of` or `next()` method

## Validation Checklist

### Input Validation:
- [ ] Input has exactly 1 line
- [ ] Input contains only a positive integer
- [ ] Integer is within valid range (1 ≤ N ≤ 1000)
- [ ] No extra whitespace or invalid characters

### Output Validation:
- [ ] Output has exactly N lines
- [ ] Each line contains exactly one integer
- [ ] First number is 0 (F(0))
- [ ] Second number is 1 (F(1)) if N ≥ 2
- [ ] Sequence follows Fibonacci pattern: F(n) = F(n-1) + F(n-2)
- [ ] No extra whitespace or formatting

### Generator Implementation Validation:
- [ ] Solution uses generator/iterator pattern
- [ ] Memory usage is constant (O(1)) regardless of N
- [ ] Generator maintains state between calls
- [ ] No pre-computation of all values

## Automated Test Case Generation

```python
def fibonacci_generator():
    """Reference implementation for generating expected outputs"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def generate_test_case(n, filename_prefix):
    """Generate input and expected output files"""
    # Generate input file
    with open(f"{filename_prefix}.txt", "w") as f:
        f.write(f"{n}\n")
    
    # Generate expected output file
    fib_gen = fibonacci_generator()
    with open(f"expected{filename_prefix[5:]}.txt", "w") as f:
        for i in range(n):
            f.write(f"{next(fib_gen)}\n")

def validate_test_case(input_content, expected_content):
    """Validate that test case follows proper format"""
    # Validate input
    input_lines = input_content.strip().split('\n')
    if len(input_lines) != 1:
        return False, "Input must have exactly 1 line"
    
    try:
        n = int(input_lines[0])
        if n < 1 or n > 1000:
            return False, "N must be between 1 and 1000"
    except ValueError:
        return False, "Input must be a valid integer"
    
    # Validate expected output
    expected_lines = expected_content.strip().split('\n')
    if len(expected_lines) != n:
        return False, f"Expected output must have exactly {n} lines"
    
    # Validate Fibonacci sequence
    fib_gen = fibonacci_generator()
    for i, line in enumerate(expected_lines):
        try:
            expected_fib = next(fib_gen)
            actual_fib = int(line)
            if actual_fib != expected_fib:
                return False, f"Line {i+1}: expected {expected_fib}, got {actual_fib}"
        except ValueError:
            return False, f"Line {i+1} is not a valid integer"
    
    return True, "Test case is valid"

def generate_all_test_cases():
    """Generate comprehensive test suite"""
    test_cases = []
    
    # Basic cases (1-30)
    basic_values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    
    # Edge cases (31-50)  
    edge_values = [1, 2, 20, 50, 31, 32, 35, 40, 45, 49, 51, 33, 34, 36, 37, 38, 39, 41, 42, 43]
    
    # Performance cases (51-80)
    perf_values = [100, 200, 500, 1000, 75, 150, 300, 600, 800, 900, 99, 199, 299, 399, 499, 599, 699, 799, 899, 999, 101, 201, 301, 401, 501, 601, 701, 801, 901, 950]
    
    # Complex cases (81-150)
    import random
    random.seed(42)  # For reproducible test cases
    complex_values = random.sample(range(50, 1000), 70)
    
    all_values = basic_values + edge_values + perf_values + complex_values
    
    for i, n in enumerate(all_values, 1):
        generate_test_case(n, f"input{i}")
        test_cases.append(n)
    
    return test_cases
```

## Performance Expectations

### Memory Usage:
- **Generator Implementation**: O(1) memory usage regardless of N
- **Non-Generator Implementation**: O(N) memory usage (should timeout for large N)

### Time Complexity:
- **Optimal**: O(N) time complexity
- **Acceptable**: O(N) with generator efficiency
- **Unacceptable**: O(N²) or worse (pre-computing without generators)

### Test Case Timing:
- **Basic Cases (N ≤ 30)**: Should complete in < 0.1 seconds
- **Edge Cases (N ≤ 50)**: Should complete in < 0.2 seconds  
- **Performance Cases (N ≤ 1000)**: Should complete in < 1 second with generators
- **Performance Cases (N ≤ 1000)**: Should timeout (> 2 seconds) without generators
