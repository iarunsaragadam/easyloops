# Test Cases for Recursive Problem Solving

## Test Case Structure
This question uses a 1-line input format for the Fibonacci sequence calculation.

### Input Format Pattern:
```
Line 1: A non-negative integer n (0 ≤ n ≤ 35)
```

### Output Format Pattern:
```
A single integer representing the nth Fibonacci number
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
5
```
**Expected Output (`expected.txt`):**
```
5
```

**Explanation**: F(5) = F(4) + F(3) = 3 + 2 = 5. This tests basic recursive functionality with a moderate input.

## Test Case 2: Edge
**Input (`input2.txt`):**
```
0
```
**Expected Output (`expected2.txt`):**
```
0
```

**Explanation**: Tests the base case F(0) = 0. This verifies the recursive function handles the smallest valid input correctly.

## Test Case 3: Complex
**Input (`input3.txt`):**
```
30
```
**Expected Output (`expected3.txt`):**
```
832040
```

**Explanation**: Performance test case that will be noticeably slow with naive recursion but still computable within time limits. Tests if the solution correctly handles larger inputs and demonstrates the exponential time complexity of the naive recursive approach.

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be a single non-negative integer
2. Input must be within range [0, 35] to ensure reasonable execution time
3. No leading/trailing whitespace in input files
4. Input must be followed by a single newline character

### Output Format Rules:
1. Output must be a single integer (the Fibonacci result)
2. No leading/trailing whitespace except final newline
3. No additional formatting or text
4. Must match expected output exactly

## Language-Specific Considerations
### Python Considerations:
- Use `int(input().strip())` to read integer input
- Python's recursion limit (default ~1000) won't be an issue for n ≤ 35
- Use `print(result)` for output (automatically adds newline)
- Be careful with integer overflow (not an issue for F(35))

### Go Considerations:
- Use `fmt.Scan(&n)` to read integer input
- Go doesn't have built-in recursion depth limits like Python
- Use `fmt.Println(result)` for output
- Go's int type is sufficient for F(35)

## Validation Checklist
- [ ] Input has exactly 1 line containing a valid integer
- [ ] Input integer is in range [0, 35]
- [ ] Output contains exactly one integer
- [ ] Output format matches expected exactly (including newline)
- [ ] Solution uses recursive approach (no loops or memoization)
- [ ] Base cases (n=0, n=1) are handled correctly
- [ ] Recursive case correctly implements F(n) = F(n-1) + F(n-2)
- [ ] Performance test case (n=30) completes within time limit

## Automated Test Case Generation
```python
def generate_test_case():
    """Generate additional test cases for Fibonacci sequence"""
    import random
    
    # Generate random test case within valid range
    n = random.randint(0, 35)
    
    # Calculate expected Fibonacci number
    def fibonacci(num):
        if num <= 0:
            return 0
        elif num == 1:
            return 1
        else:
            return fibonacci(num - 1) + fibonacci(num - 2)
    
    expected = fibonacci(n)
    
    input_content = f"{n}\n"
    expected_content = f"{expected}\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted"""
    try:
        # Validate input
        lines = input_content.strip().split('\n')
        if len(lines) != 1:
            return False, "Input must have exactly one line"
        
        n = int(lines[0])
        if n < 0 or n > 35:
            return False, "Input must be in range [0, 35]"
        
        # Validate expected output
        expected_lines = expected_content.strip().split('\n')
        if len(expected_lines) != 1:
            return False, "Output must have exactly one line"
        
        expected_result = int(expected_lines[0])
        
        # Calculate actual Fibonacci value
        def fibonacci(num):
            if num <= 0:
                return 0
            elif num == 1:
                return 1
            else:
                return fibonacci(num - 1) + fibonacci(num - 2)
        
        actual_result = fibonacci(n)
        
        if expected_result != actual_result:
            return False, f"Expected F({n}) = {actual_result}, got {expected_result}"
        
        return True, "Test case is valid"
        
    except ValueError:
        return False, "Input or output contains non-integer values"
    except Exception as e:
        return False, f"Validation error: {str(e)}"
```
