# Test Cases for Counting Sort Algorithm

## Test Case Structure
This question uses a 2-line input format for counting sort implementation.

### Input Format Pattern:
```
Line 1: n k (array size and maximum value)
Line 2: n space-separated integers (array elements in range [0, k])
```

### Output Format Pattern:
```
Single line: n space-separated integers (sorted array)
```

## Test Case 1: Basic Sorting
**Input (`input.txt`):**
```
5 9
4 2 2 8 3
```
**Expected Output (`expected.txt`):**
```
2 2 3 4 8
```
**Purpose**: Tests basic counting sort functionality with mixed elements and duplicates.

## Test Case 2: Edge Cases
**Input (`input2.txt`):**
```
1 5
3
```
**Expected Output (`expected2.txt`):**
```
3
```
**Purpose**: Tests single element array (minimum size edge case).

## Test Case 3: Performance Test
**Input (`input3.txt`):**
```
50000 100
[Large array with 50,000 elements, values 0-100]
```
**Expected Output (`expected3.txt`):**
```
[Sorted array of 50,000 elements]
```
**Purpose**: Tests performance with large input that would timeout O(n²) algorithms but runs efficiently with O(n+k) counting sort.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain exactly 2 integers: n (1 ≤ n ≤ 100,000) and k (0 ≤ k ≤ 1,000)
2. Second line must contain exactly n space-separated integers
3. All array elements must be in range [0, k]
4. No negative numbers allowed
5. Array size n must match the count of elements in second line

### Output Format Rules:
1. Single line containing n space-separated integers
2. Elements must be in non-decreasing order
3. All original elements must be preserved (stable sort)
4. No trailing spaces at end of line
5. Single newline character at end

### Algorithm Efficiency Requirements:
- **Time Complexity**: O(n + k) - Linear in input size plus range
- **Space Complexity**: O(k) - Additional space for counting array
- **Stability**: Must preserve relative order of equal elements
- **In-place**: Not required (counting sort uses additional space)

## Language-Specific Considerations

### Python Considerations:
- Use `input().split()` and `map(int, ...)` for efficient input parsing
- List comprehensions can make code more readable
- Use `' '.join(map(str, result))` for output formatting
- Be careful with 0-indexed vs 1-indexed arrays

### Go Considerations:
- Use `fmt.Scan()` for input parsing
- Preallocate slices with `make()` for better performance
- Handle space-separated output correctly
- Use efficient integer conversion methods

### JavaScript Considerations:
- Use `readline` interface for input handling
- `parseInt()` for string to integer conversion
- `Array.join(' ')` for output formatting
- Be aware of array initialization differences

## Advanced Test Scenarios

### Edge Case Categories:
1. **Minimum Size**: Single element arrays
2. **Maximum Range**: k = 1000 with sparse data
3. **Dense Range**: k = 10 with many duplicates
4. **All Same**: Array with identical elements
5. **Already Sorted**: Pre-sorted input
6. **Reverse Sorted**: Worst-case input for comparison sorts
7. **All Zeros**: Boundary case with minimum values
8. **All Max**: Boundary case with maximum values

### Performance Test Categories:
1. **Large Sparse**: n = 100,000, k = 1000, few duplicates
2. **Large Dense**: n = 50,000, k = 100, many duplicates
3. **Wide Range**: n = 10,000, k = 1000, uniform distribution
4. **Narrow Range**: n = 100,000, k = 10, highly repetitive

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] First line contains valid n and k values
- [ ] Second line contains exactly n integers
- [ ] All integers are in range [0, k]
- [ ] Output is single line with n space-separated integers
- [ ] Output array is sorted in non-decreasing order
- [ ] All original elements are preserved
- [ ] Algorithm runs in O(n + k) time
- [ ] Solution handles edge cases correctly
- [ ] Large test cases complete within time limit

## Automated Test Case Generation
```python
import random

def generate_basic_test_case(n, k):
    """Generate basic test case with random elements"""
    arr = [random.randint(0, k) for _ in range(n)]
    return f"{n} {k}\n{' '.join(map(str, arr))}"

def generate_edge_test_case():
    """Generate edge case test scenarios"""
    cases = [
        (1, 0, [0]),  # Single element, minimum value
        (1, 1000, [500]),  # Single element, mid range
        (2, 1, [1, 0]),  # Two elements, reverse order
        (10, 0, [0] * 10),  # All zeros
        (5, 5, [5, 5, 5, 5, 5])  # All maximum values
    ]
    return cases

def generate_performance_test_case(n, k):
    """Generate large test case for performance testing"""
    arr = [random.randint(0, k) for _ in range(n)]
    return f"{n} {k}\n{' '.join(map(str, arr))}"

def validate_test_case(input_content, expected_content):
    """Validate input format and expected output correctness"""
    lines = input_content.strip().split('\n')
    if len(lines) != 2:
        return False, "Input must have exactly 2 lines"
    
    try:
        n, k = map(int, lines[0].split())
        arr = list(map(int, lines[1].split()))
    except ValueError:
        return False, "Invalid integer format"
    
    if len(arr) != n:
        return False, f"Array length {len(arr)} doesn't match n={n}"
    
    if not all(0 <= x <= k for x in arr):
        return False, f"Elements must be in range [0, {k}]"
    
    expected_arr = list(map(int, expected_content.strip().split()))
    if sorted(arr) != expected_arr:
        return False, "Expected output doesn't match sorted input"
    
    return True, "Valid test case"
```

## Common Implementation Mistakes to Test
1. **Off-by-one errors**: Array indexing and range boundaries
2. **Stability issues**: Not processing array backwards
3. **Range errors**: Not handling k+1 size for counting array
4. **Memory errors**: Not allocating enough space for counting array
5. **Integer overflow**: With very large arrays (test with constraints)
6. **Input parsing**: Incorrectly reading n, k, or array elements
