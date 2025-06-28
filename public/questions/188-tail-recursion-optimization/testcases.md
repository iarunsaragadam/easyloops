# Test Cases for Tail Recursion Optimization - Fibonacci Sequence

## Test Case Structure
This question uses a 1-line input format for calculating the nth Fibonacci number efficiently using tail recursion optimization.

### Input Format Pattern:
```
Line 1: Non-negative integer n (0 ≤ n ≤ 100)
```

### Output Format Pattern:
```
Single integer: F(n) - the nth Fibonacci number
```

## Test Case Categories

### Basic Test Cases (input1.txt to input25.txt)
These test fundamental functionality and small Fibonacci numbers:

**Test Case 1 - Base Case Zero:**
- **Input (`input1.txt`):** `0`
- **Expected Output (`expected1.txt`):** `0`
- **Description:** Tests F(0) = 0 base case

**Test Case 2 - Base Case One:**
- **Input (`input2.txt`):** `1`
- **Expected Output (`expected2.txt`):** `1`
- **Description:** Tests F(1) = 1 base case

**Test Case 3 - Small Value:**
- **Input (`input3.txt`):** `2`
- **Expected Output (`expected3.txt`):** `1`
- **Description:** Tests first recursive case F(2) = F(1) + F(0) = 1

**Test Case 4 - Small Sequence:**
- **Input (`input4.txt`):** `5`
- **Expected Output (`expected4.txt`):** `5`
- **Description:** Tests F(5) = 5 (0,1,1,2,3,5)

**Test Case 5 - Medium Small:**
- **Input (`input5.txt`):** `10`
- **Expected Output (`expected5.txt`):** `55`
- **Description:** Tests F(10) = 55

### Edge Cases (input26.txt to input40.txt)
These test boundary conditions and special values:

**Test Case 26 - Large Safe Value:**
- **Input (`input26.txt`):** `30`
- **Expected Output (`expected26.txt`):** `832040`
- **Description:** Tests relatively large value that naive recursion can still handle

**Test Case 27 - Performance Threshold:**
- **Input (`input27.txt`):** `35`
- **Expected Output (`expected27.txt`):** `9227465`
- **Description:** Tests value where naive recursion becomes noticeably slow

### Performance Test Cases (input41.txt to input70.txt)
These test cases will timeout with naive O(2^n) recursive solutions:

**Test Case 41 - Timeout Naive (40):**
- **Input (`input41.txt`):** `40`
- **Expected Output (`expected41.txt`):** `102334155`
- **Description:** Will timeout with naive recursion (>10 seconds), fast with tail recursion

**Test Case 42 - Timeout Naive (45):**
- **Input (`input42.txt`):** `45`
- **Expected Output (`expected42.txt`):** `1134903170`
- **Description:** Will definitely timeout with naive recursion, demonstrates optimization benefit

**Test Case 43 - Large Value:**
- **Input (`input43.txt`):** `50`
- **Expected Output (`expected43.txt`):** `12586269025`
- **Description:** Large Fibonacci number, impossible with naive recursion

### Complex Scenarios (input71.txt to input100.txt)
These test various middle-range and edge values:

**Test Case 71 - Mid Range:**
- **Input (`input71.txt`):** `25`
- **Expected Output (`expected71.txt`):** `75025`
- **Description:** Medium complexity case

**Test Case 100 - Maximum Value:**
- **Input (`input100.txt`):** `100`
- **Expected Output (`expected100.txt`):** `354224848179261915075`
- **Description:** Tests maximum constraint value

## Test Case Creation Rules

### Input Validation Rules:
1. **Range Check:** Input must be non-negative integer (0 ≤ n ≤ 100)
2. **Format Check:** Single integer on one line
3. **No Leading/Trailing Whitespace:** Input should be clean integer
4. **Performance Requirement:** Solution must handle all values within time limit

### Output Format Rules:
1. **Single Integer:** Output exactly one integer on one line
2. **No Extra Output:** No additional text, formatting, or whitespace
3. **Correct Calculation:** Must match mathematical definition of Fibonacci sequence
4. **Large Numbers:** Handle large integers correctly (Python handles automatically)

## Language-Specific Considerations

### Python Considerations:
- **Recursion Limit:** Python has default recursion limit (~1000), sufficient for n ≤ 100
- **Integer Handling:** Python automatically handles arbitrarily large integers
- **Tail Recursion:** Python doesn't optimize tail recursion, but still demonstrates concept
- **Performance:** Focus on algorithm efficiency rather than language optimization

### Go Considerations:
- **Integer Overflow:** Use `int64` or `big.Int` for large Fibonacci numbers
- **Recursion Depth:** Go can handle required recursion depth for n ≤ 100
- **Memory Management:** Go's garbage collector handles recursive call cleanup
- **Type Conversion:** Ensure proper integer type handling

### JavaScript Considerations:
- **Number Precision:** Use BigInt for large Fibonacci numbers (n > 78)
- **Recursion Limits:** Browser/Node.js recursion limits are sufficient
- **Performance:** V8 engine optimizations may help with tail recursion

## Performance Requirements

### Time Complexity Targets:
- **Acceptable:** O(n) recursive or O(n) iterative solutions
- **Optimal:** O(log n) matrix exponentiation (advanced)
- **Unacceptable:** O(2^n) naive recursive solutions

### Timeout Test Cases:
- **n ≥ 35:** Will timeout naive recursive solutions (exponential time)
- **n ≥ 40:** Definitely timeout naive solutions
- **n ≥ 45:** Impossible with naive recursion in reasonable time

### Memory Considerations:
- **Stack Space:** O(n) for recursive solutions acceptable
- **Heap Space:** O(1) for iterative solutions preferred
- **Large Integers:** Language-dependent big integer handling

## Validation Checklist
- [ ] Input has exactly 1 line with single integer
- [ ] Input value is between 0 and 100 inclusive
- [ ] Output is single integer with no extra formatting
- [ ] Expected output matches mathematical Fibonacci definition
- [ ] Performance test cases (n ≥ 40) will timeout naive O(2^n) solutions
- [ ] All test cases run successfully with tail recursive solution
- [ ] Test cases cover base cases, normal cases, and edge cases
- [ ] Large number handling is correct for target programming languages

## Automated Test Case Generation

```python
def fibonacci_reference(n):
    """Reference implementation for generating expected outputs"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def generate_test_case(n, case_num):
    """Generate input and expected output files"""
    input_content = str(n)
    expected_content = str(fibonacci_reference(n))
    
    with open(f'input{case_num}.txt', 'w') as f:
        f.write(input_content + '\n')
    
    with open(f'expected{case_num}.txt', 'w') as f:
        f.write(expected_content + '\n')

def validate_test_case(input_content, expected_content):
    """Validate that test case is correctly formatted"""
    # Validate input
    lines = input_content.strip().split('\n')
    if len(lines) != 1:
        return False, "Input must have exactly 1 line"
    
    try:
        n = int(lines[0])
        if n < 0 or n > 100:
            return False, "Input must be between 0 and 100"
    except ValueError:
        return False, "Input must be a valid integer"
    
    # Validate expected output
    expected_lines = expected_content.strip().split('\n')
    if len(expected_lines) != 1:
        return False, "Expected output must have exactly 1 line"
    
    try:
        expected_result = int(expected_lines[0])
        actual_result = fibonacci_reference(n)
        if expected_result != actual_result:
            return False, f"Expected {actual_result}, got {expected_result}"
    except ValueError:
        return False, "Expected output must be a valid integer"
    
    return True, "Valid test case"
```
