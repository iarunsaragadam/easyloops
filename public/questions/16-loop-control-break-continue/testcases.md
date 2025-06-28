# Test Cases for Loop control (break, continue)

## Test Case Structure
This question uses a multi-line input format where each line contains a single integer, terminated by a negative number.

### Input Format Pattern:
```
Line 1: First integer
Line 2: Second integer
...
Line n: Negative integer (termination signal)
```

### Output Format Pattern:
```
Single integer: sum of odd positive numbers
```

## Test Case 1: Basic (Mixed Odd/Even Numbers)
**Input (`input.txt`):**
```
1
3
5
-1
```
**Expected Output (`expected.txt`):**
```
9
```
**Purpose**: Tests basic functionality with a mix of odd numbers (1, 3, 5) and proper termination. Expected sum: 1 + 3 + 5 = 9. Demonstrates both `continue` (skipping even numbers, though none present) and `break` (on -1).

## Test Case 2: Edge (Only Even Numbers)
**Input (`input2.txt`):**
```
2
4
6
8
-1
```
**Expected Output (`expected2.txt`):**
```
0
```
**Purpose**: Tests the edge case where all numbers before termination are even. All numbers should be skipped using `continue`, resulting in sum = 0. Verifies that `continue` works correctly and `break` still functions properly.

## Test Case 3: Performance (Large Mixed Sequence)
**Input (`input3.txt`):**
```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
-1
```
**Expected Output (`expected3.txt`):**
```
625
```
**Purpose**: Tests performance with a larger sequence (50 numbers). Sum of odd numbers 1-49: 1+3+5+...+49 = 625. Ensures the loop control statements work efficiently with larger inputs and that the algorithm maintains O(n) performance.

## Test Case Creation Rules
### Input Validation Rules:
1. **Multi-line integer input**: Each line contains exactly one integer
2. **Termination requirement**: Input must end with exactly one negative number
3. **Range validation**: -1000 ≤ n ≤ 1000 for reasonable testing scope
4. **No empty lines**: Each line should contain a valid integer
5. **Proper termination**: The negative number should be the last line

### Output Format Rules:
1. **Single integer output**: Output must be exactly one line containing a single integer
2. **No leading/trailing whitespace**: Output should be clean integer without extra spaces
3. **Correct calculation**: Sum must equal the sum of all odd positive numbers in the input
4. **Zero handling**: If no odd positive numbers exist, output should be 0
5. **Newline requirement**: Output must end with exactly one newline character

## Language-Specific Considerations
### Python Considerations:
- Use `int(input())` to read each integer
- Handle potential `EOFError` if input ends unexpectedly
- Use `while True:` for the infinite loop
- Ensure proper indentation for `break` and `continue` statements

### Go Considerations:
- Use `fmt.Scanf("%d", &n)` to read integers
- Use `for {` for the infinite loop construct
- Handle input/output with proper formatting
- Ensure proper variable declaration and scope

### JavaScript Considerations:
- Use `readline()` or appropriate input method
- Handle string-to-integer conversion properly
- Implement proper loop control with `break` and `continue`
- Ensure proper variable scoping with `let` or `const`

## Validation Checklist
- [ ] Input follows multi-line integer format
- [ ] Input terminates with exactly one negative number
- [ ] Output contains exactly one integer (the sum)
- [ ] Break statement correctly terminates on negative input
- [ ] Continue statement correctly skips even numbers
- [ ] Odd positive numbers are correctly summed
- [ ] Edge case of all even numbers produces output 0
- [ ] Performance is acceptable for sequences up to 1000 numbers

## Automated Test Case Generation
```python
def generate_test_case(num_integers=10, include_evens=True, include_odds=True):
    """
    Generate a test case for loop control problem.
    
    Args:
        num_integers: Number of integers before termination
        include_evens: Whether to include even numbers
        include_odds: Whether to include odd numbers
    
    Returns:
        tuple: (input_content, expected_output)
    """
    import random
    
    numbers = []
    expected_sum = 0
    
    for _ in range(num_integers):
        if include_odds and include_evens:
            n = random.randint(1, 100)
        elif include_odds:
            n = random.randint(1, 50) * 2 - 1  # generate odd
        elif include_evens:
            n = random.randint(1, 50) * 2      # generate even
        else:
            n = 1  # fallback
            
        numbers.append(n)
        if n % 2 == 1:  # odd number
            expected_sum += n
    
    # Add termination number
    numbers.append(-1)
    
    input_content = '\n'.join(map(str, numbers)) + '\n'
    expected_content = str(expected_sum) + '\n'
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """
    Validate a test case for correctness.
    
    Args:
        input_content: Input file content
        expected_content: Expected output file content
    
    Returns:
        tuple: (is_valid, error_message)
    """
    try:
        lines = input_content.strip().split('\n')
        numbers = [int(line) for line in lines]
        
        # Check termination
        if numbers[-1] >= 0:
            return False, "Input must end with negative number"
        
        # Calculate expected sum
        expected_sum = sum(n for n in numbers[:-1] if n % 2 == 1)
        actual_output = int(expected_content.strip())
        
        if expected_sum != actual_output:
            return False, f"Expected sum {expected_sum}, got {actual_output}"
        
        return True, "Valid test case"
    
    except Exception as e:
        return False, f"Validation error: {e}"
```
