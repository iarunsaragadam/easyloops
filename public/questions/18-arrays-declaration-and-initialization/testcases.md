# Test Cases for Arrays - Declaration and Initialization

## Test Case Structure
This question uses a variable input format (1 or 2 lines depending on array size).

### Input Format Pattern:
```
Line 1: n (integer) - array size (0 ≤ n ≤ 1000)
Line 2: n space-separated integers (only if n > 0) - array elements
```

### Output Format Pattern:
```
Array size: n
Array elements: [element1, element2, ...]
First element: first_value (or "Empty array" if n=0)
Last element: last_value (or "No elements to display" if n=0)
Array sum: sum_value
```

## Test Case Categories (100+ Test Cases)

### Basic Test Cases (input1.txt to input25.txt)
Simple arrays with positive integers, demonstrating fundamental concepts.

### Edge Cases (input26.txt to input50.txt)
Boundary conditions including empty arrays, single elements, and special values.

### Performance Test Cases (input51.txt to input75.txt)
Large arrays to test algorithm efficiency and memory usage.

### Complex Scenarios (input76.txt to input100.txt)
Arrays with negative numbers, mixed values, and various combinations.

## Sample Test Cases

### Test Case 1: Basic Array (input1.txt)
**Input:**
```
5
1 2 3 4 5
```
**Expected Output (expected1.txt):**
```
Array size: 5
Array elements: [1, 2, 3, 4, 5]
First element: 1
Last element: 5
Array sum: 15
```

### Test Case 26: Empty Array (input26.txt)
**Input:**
```
0
```
**Expected Output (expected26.txt):**
```
Array size: 0
Array elements: []
Empty array
No elements to display
Array sum: 0
```

### Test Case 27: Single Element (input27.txt)
**Input:**
```
1
42
```
**Expected Output (expected27.txt):**
```
Array size: 1
Array elements: [42]
First element: 42
Last element: 42
Array sum: 42
```

### Test Case 51: Large Array (input51.txt)
**Input:**
```
1000
1 2 3 4 5 6 7 8 9 10 ... (1000 consecutive integers)
```
**Expected Output (expected51.txt):**
```
Array size: 1000
Array elements: [1, 2, 3, 4, 5, ...]
First element: 1
Last element: 1000
Array sum: 500500
```

### Test Case 76: Negative Numbers (input76.txt)
**Input:**
```
4
-10 -5 0 5
```
**Expected Output (expected76.txt):**
```
Array size: 4
Array elements: [-10, -5, 0, 5]
First element: -10
Last element: 5
Array sum: -10
```

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain a single non-negative integer n (0 ≤ n ≤ 1000)
2. If n > 0, second line must contain exactly n space-separated integers
3. If n = 0, there should be no second line
4. Each integer must be in range [-1000, 1000]
5. No leading/trailing whitespace except single newlines

### Output Format Rules:
1. Line 1: "Array size: {n}"
2. Line 2: "Array elements: [{comma-separated elements}]"
3. Line 3: "First element: {value}" OR "Empty array"
4. Line 4: "Last element: {value}" OR "No elements to display"  
5. Line 5: "Array sum: {sum}"
6. Each line ends with exactly one newline character
7. Array elements displayed with Python list formatting (brackets, commas, spaces)

## Language-Specific Considerations

### Python Considerations:
- Use `int(input().strip())` to read the array size
- Use `list(map(int, input().strip().split()))` to read array elements
- Display arrays using Python's default list representation
- Handle empty arrays without attempting to read second line

### Go Considerations:
- Use `fmt.Scanf("%d", &n)` to read array size
- Use loops with `fmt.Scanf("%d", &elements[i])` for array elements
- Format output to match Python list representation: `[1, 2, 3]`
- Handle empty arrays with `make([]int, 0)` or nil slice

### JavaScript Considerations:
- Use `parseInt(input.trim())` for array size
- Use `input.trim().split(' ').map(Number)` for array elements
- Ensure output matches exact format with brackets and commas
- Handle empty arrays as empty JavaScript arrays

## Validation Checklist

When creating test cases, ensure:
- [ ] Input has correct number of lines (1 if n=0, 2 if n>0)
- [ ] Array size n is within bounds [0, 1000]
- [ ] All array elements are within bounds [-1000, 1000]
- [ ] Second line has exactly n space-separated integers (if n>0)
- [ ] Expected output follows exact format specification
- [ ] Output has exactly 5 lines
- [ ] Array sum is mathematically correct
- [ ] First and last elements are correctly identified
- [ ] Empty array cases handled properly

## Performance Considerations

### Time Complexity Requirements:
- Reading input: O(n)
- Calculating sum: O(n)
- Total complexity: O(n)

### Space Complexity Requirements:
- Array storage: O(n)
- Additional variables: O(1)
- Total complexity: O(n)

### Performance Test Guidelines:
- Test cases with n=1000 should complete within 1 second
- Memory usage should be reasonable for arrays up to 1000 elements
- Avoid algorithms with O(n²) or worse complexity

## Automated Test Case Generation

```python
import random

def generate_basic_test_case(case_num, n, start_val=1):
    """Generate basic test case with consecutive integers"""
    if n == 0:
        input_content = "0\n"
        expected_content = """Array size: 0
Array elements: []
Empty array
No elements to display
Array sum: 0
"""
    else:
        elements = list(range(start_val, start_val + n))
        input_content = f"{n}\n{' '.join(map(str, elements))}\n"
        array_sum = sum(elements)
        expected_content = f"""Array size: {n}
Array elements: {elements}
First element: {elements[0]}
Last element: {elements[-1]}
Array sum: {array_sum}
"""
    
    return input_content, expected_content

def generate_random_test_case(case_num, n, min_val=-1000, max_val=1000):
    """Generate test case with random values"""
    if n == 0:
        return generate_basic_test_case(case_num, 0)
    
    elements = [random.randint(min_val, max_val) for _ in range(n)]
    input_content = f"{n}\n{' '.join(map(str, elements))}\n"
    array_sum = sum(elements)
    expected_content = f"""Array size: {n}
Array elements: {elements}
First element: {elements[0]}
Last element: {elements[-1]}
Array sum: {array_sum}
"""
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate test case format and correctness"""
    lines = input_content.strip().split('\n')
    
    # Validate input format
    if len(lines) == 0:
        return False, "Empty input"
    
    try:
        n = int(lines[0])
    except ValueError:
        return False, "First line must be an integer"
    
    if n < 0 or n > 1000:
        return False, "Array size must be between 0 and 1000"
    
    if n == 0:
        if len(lines) != 1:
            return False, "Empty array should have only one input line"
    else:
        if len(lines) != 2:
            return False, f"Array of size {n} should have exactly 2 input lines"
        
        try:
            elements = list(map(int, lines[1].split()))
        except ValueError:
            return False, "Second line must contain space-separated integers"
        
        if len(elements) != n:
            return False, f"Expected {n} elements, got {len(elements)}"
        
        for elem in elements:
            if elem < -1000 or elem > 1000:
                return False, "Array elements must be between -1000 and 1000"
    
    # Validate expected output format
    expected_lines = expected_content.strip().split('\n')
    if len(expected_lines) != 5:
        return False, "Expected output must have exactly 5 lines"
    
    return True, "Valid test case"
```
