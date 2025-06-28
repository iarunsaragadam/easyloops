# Test Cases for Lambda functions/anonymous functions

## Test Case Structure
This question uses a 4-line input format to test various lambda function operations.

### Input Format Pattern:
```
Line 1: n (integer, number of elements)
Line 2: n space-separated integers
Line 3: operation_type (filter/map/sort/reduce)
Line 4: operation_parameter (specific operation)
```

### Output Format Pattern:
```
For filter/map/sort: space-separated integers
For reduce: single integer result
```

## Test Case 1: Basic Filter Operation
**Input (`input.txt`):**
```
5
1 2 3 4 5
filter
even
```
**Expected Output (`expected.txt`):**
```
2 4
```
**Description:** Tests basic lambda filtering to extract even numbers using `filter(lambda x: x % 2 == 0, numbers)`

## Test Case 2: Edge Case - Empty Result and Map Operation
**Input (`input2.txt`):**
```
6
-3 -1 5 -7 0 2
map
abs
```
**Expected Output (`expected2.txt`):**
```
3 1 5 7 0 2
```
**Description:** Tests lambda mapping with absolute values on mixed positive/negative numbers, including zero edge case

## Test Case 3: Complex Performance Test - Large Data with Reduce
**Input (`input3.txt`):**
```
1000
[1000 space-separated integers from 1 to 1000]
reduce
sum
```
**Expected Output (`expected3.txt`):**
```
500500
```
**Description:** Performance test with large dataset (1000 numbers) using reduce operation. Tests efficiency with lambda functions on large data.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a positive integer n (1 ≤ n ≤ 1000)
2. Second line must contain exactly n space-separated integers (-10,000 ≤ each ≤ 10,000)
3. Third line must be one of: "filter", "map", "sort", "reduce"
4. Fourth line must be a valid parameter for the specified operation

### Output Format Rules:
1. For filter/map/sort operations: output space-separated integers on one line
2. For reduce operations: output single integer result
3. Empty filter results should output empty line (no spaces)
4. Maintain integer precision for all calculations
5. No trailing spaces in output

### Operation-Specific Rules:
**Filter Operations:**
- "even": keep x where x % 2 == 0
- "odd": keep x where x % 2 != 0  
- "positive": keep x where x > 0
- "negative": keep x where x < 0
- "greater_N": keep x where x > N
- "less_N": keep x where x < N

**Map Operations:**
- "square": transform x to x²
- "double": transform x to 2x
- "abs": transform x to |x|
- "negate": transform x to -x
- "add_N": transform x to x + N
- "multiply_N": transform x to x × N

**Sort Operations:**
- "ascending": sort by value (ascending)
- "descending": sort by value (descending)
- "abs_ascending": sort by absolute value (ascending)
- "abs_descending": sort by absolute value (descending)
- "last_digit": sort by last digit (x % 10)
- "digit_sum": sort by sum of digits

**Reduce Operations:**
- "sum": sum all elements
- "product": multiply all elements
- "max": find maximum element
- "min": find minimum element
- "count_positive": count positive elements
- "count_even": count even elements

## Language-Specific Considerations

### Python Considerations:
- Use `filter(lambda x: condition, iterable)` for filtering
- Use `map(lambda x: transformation, iterable)` for mapping
- Use `sorted(iterable, key=lambda x: sort_key)` for sorting
- Use `functools.reduce(lambda x, y: operation, iterable)` for reducing
- Convert filter/map results to lists for output
- Handle empty results gracefully

### Go Considerations:
- Go doesn't have lambda functions like Python
- Use anonymous functions: `func(x int) bool { return x%2 == 0 }`
- Use function literals with sort.Slice for custom sorting
- Implement reduce functionality manually with loops
- Use interfaces for generic operations where needed

### JavaScript Considerations:
- Use `array.filter(x => condition)` for filtering
- Use `array.map(x => transformation)` for mapping
- Use `array.sort((a, b) => comparison)` for sorting
- Use `array.reduce((acc, x) => operation, initial)` for reducing

## Performance Test Case Details

### Test Case 3 Analysis:
- **Input Size**: 1000 integers (1 to 1000)
- **Operation**: Reduce sum using lambda function
- **Expected Complexity**: O(n) where n is the number of elements
- **Memory Usage**: O(n) for storing the input array
- **Time Limit**: Should complete within 0.1 seconds for efficient solutions
- **Inefficient Solutions**: Solutions with nested loops or redundant operations may timeout

### Performance Considerations:
- Lambda functions should not significantly impact performance
- Built-in functions (filter, map, reduce) are optimized
- Avoid creating unnecessary intermediate data structures
- For large datasets, memory usage should be considered

## Validation Checklist
- [ ] Input has exactly 4 lines
- [ ] First line is a valid integer n
- [ ] Second line has exactly n integers
- [ ] Third line is a valid operation type
- [ ] Fourth line is a valid parameter for the operation
- [ ] Output format matches expected pattern
- [ ] Edge cases (empty results, zero values) handled correctly
- [ ] Performance requirements met for large inputs
- [ ] Lambda functions used appropriately for the operation type

## Automated Test Case Generation
```python
import random
from functools import reduce

def generate_test_case(operation_type, parameter, n=None):
    """Generate a test case for lambda operations"""
    if n is None:
        n = random.randint(1, 100)
    
    # Generate random numbers
    numbers = [random.randint(-100, 100) for _ in range(n)]
    
    # Create input
    input_content = f"{n}\n{' '.join(map(str, numbers))}\n{operation_type}\n{parameter}"
    
    # Generate expected output
    expected = solve_lambda_operation(numbers, operation_type, parameter)
    
    return input_content, expected

def solve_lambda_operation(numbers, operation, parameter):
    """Solve the lambda operation to generate expected output"""
    if operation == "filter":
        if parameter == "even":
            result = list(filter(lambda x: x % 2 == 0, numbers))
        elif parameter == "odd":
            result = list(filter(lambda x: x % 2 != 0, numbers))
        # ... (implement all filter operations)
        return " ".join(map(str, result))
    
    elif operation == "map":
        if parameter == "square":
            result = list(map(lambda x: x * x, numbers))
        elif parameter == "abs":
            result = list(map(lambda x: abs(x), numbers))
        # ... (implement all map operations)
        return " ".join(map(str, result))
    
    # ... (implement sort and reduce operations)

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted"""
    lines = input_content.strip().split('\n')
    
    # Check format
    assert len(lines) == 4, "Input must have exactly 4 lines"
    
    n = int(lines[0])
    numbers = list(map(int, lines[1].split()))
    operation = lines[2]
    parameter = lines[3]
    
    # Validate constraints
    assert 1 <= n <= 1000, "n must be between 1 and 1000"
    assert len(numbers) == n, "Number count must match n"
    assert all(-10000 <= x <= 10000 for x in numbers), "Numbers must be in range"
    assert operation in ["filter", "map", "sort", "reduce"], "Invalid operation type"
    
    return True
```
