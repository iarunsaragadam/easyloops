# Test Cases for Basic recursion

## Test Case Structure
This question uses a 1-line input format for factorial calculation.

### Input Format Pattern:
```
Line 1: Non-negative integer n (0 ≤ n ≤ 20)
```

### Output Format Pattern:
```
n! (factorial result as integer)
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
5
```
**Expected Output (`expected.txt`):**
```
120
```
**Description:** Tests standard factorial calculation (5! = 120)

## Test Case 2: Edge
**Input (`input2.txt`):**
```
0
```
**Expected Output (`expected2.txt`):**
```
1
```
**Description:** Tests edge case where 0! = 1 by mathematical definition

## Test Case 3: Complex
**Input (`input3.txt`):**
```
15
```
**Expected Output (`expected3.txt`):**
```
1307674368000
```
**Description:** Tests larger factorial that requires efficient recursive implementation

## Test Case Creation Rules

### Input Validation Rules:
1. Input must be a single non-negative integer
2. Integer must be in range 0 ≤ n ≤ 20
3. No leading/trailing whitespace in meaningful content
4. Input represents the number for which factorial should be calculated

### Output Format Rules:
1. Output must be a single integer (the factorial result)
2. No additional formatting, spaces, or text
3. Result must be mathematically correct
4. No trailing newlines beyond the single result line

## Language-Specific Considerations

### Python Considerations:
- Use `int(input().strip())` to read the integer
- Implement recursive function with proper base case handling
- Python handles large integers automatically
- Use `print(result)` for output without additional formatting
- Ensure recursive calls don't exceed maximum recursion depth

### Go Considerations:
- Use `strconv.Atoi()` to convert input string to integer
- Implement recursive function with proper return type (int or int64)
- Use `fmt.Println(result)` for output
- Consider integer overflow for very large factorials
- Ensure proper error handling for input conversion

### JavaScript Considerations:
- Use `parseInt()` to convert input to integer
- JavaScript numbers have precision limits for very large factorials
- Consider using BigInt for larger factorial calculations
- Implement proper base case handling in recursive function

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 1 line
- [ ] Input is a valid non-negative integer
- [ ] Input is within the range 0 ≤ n ≤ 20
- [ ] Expected output is mathematically correct factorial
- [ ] Output contains only the result integer
- [ ] Test covers different categories: basic, edge, performance
- [ ] Recursive solution will work within typical call stack limits
- [ ] Both base cases (0 and 1) are covered
- [ ] Performance test cases validate recursive efficiency

## Test Case Categories (100+ cases total)

### Basic Test Cases (1-30):
- Small factorials: 1!, 2!, 3!, 4!, 5!, 6!, 7!, 8!, 9!, 10!
- Common factorial values students should memorize
- Incremental progression to build confidence

### Edge Cases (31-50):
- Base cases: 0!, 1!
- Boundary values that test recursive termination
- Cases that validate proper base case implementation

### Performance Test Cases (51-80):
- Larger factorials: 12!, 15!, 18!, 20!
- Values that test recursive call stack efficiency
- Cases that would timeout with poor recursive implementation

### Complex Scenarios (81-100+):
- Mix of all ranges to ensure comprehensive coverage
- Random distribution across the valid input range
- Validation that solution handles all edge cases correctly

## Automated Test Case Generation

```python
def generate_test_case(n):
    """Generate a test case for factorial of n"""
    if not (0 <= n <= 20):
        raise ValueError("n must be between 0 and 20")
    
    import math
    expected = math.factorial(n)
    
    input_content = str(n)
    expected_content = str(expected)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate a factorial test case"""
    try:
        # Validate input
        n = int(input_content.strip())
        if not (0 <= n <= 20):
            return False, "Input out of valid range"
        
        # Validate expected output
        expected_result = int(expected_content.strip())
        import math
        correct_result = math.factorial(n)
        
        if expected_result != correct_result:
            return False, f"Expected {correct_result}, got {expected_result}"
        
        return True, "Valid test case"
    
    except ValueError as e:
        return False, f"Invalid format: {e}"
```
