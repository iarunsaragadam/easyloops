# Test Cases for Binary Search

## Test Case Structure
This question uses a 3-line input format for binary search implementation.

### Input Format Pattern:
```
Line 1: n (array size, 0 ≤ n ≤ 100,000)
Line 2: n space-separated integers in sorted order (only if n > 0)
Line 3: target (integer to search for)
```

### Output Format Pattern:
```
Single integer: index of target (0-based) or -1 if not found
```

## Test Case 1: Basic - Target Found
**Input (`input.txt`):**
```
7
1 3 5 7 9 11 13
7
```
**Expected Output (`expected.txt`):**
```
3
```
**Description**: Standard case with target found at index 3 in a sorted array.

## Test Case 2: Edge - Empty Array
**Input (`input2.txt`):**
```
0
5
```
**Expected Output (`expected2.txt`):**
```
-1
```
**Description**: Edge case with empty array - should return -1 regardless of target.

## Test Case 3: Performance - Large Array
**Input (`input3.txt`):**
```
50000
[Large sorted array from 0 to 99998 in steps of 2]
50000
```
**Expected Output (`expected3.txt`):**
```
25000
```
**Description**: Performance test with 50,000 elements. Binary search should handle this efficiently in O(log n) time, while linear search would timeout.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a non-negative integer n (0 ≤ n ≤ 100,000)
2. If n > 0, second line must contain exactly n space-separated integers
3. Array must be sorted in non-decreasing order
4. Third line must be a single integer (target value)
5. All integers must be in range [-10^9, 10^9]

### Output Format Rules:
1. Single integer on one line
2. Return 0-based index if target is found
3. Return -1 if target is not found
4. No trailing spaces or extra newlines

## Language-Specific Considerations
### Python Considerations:
- Use `int(input())` to read integers
- Use `list(map(int, input().split()))` for arrays
- Handle empty array case when n=0
- Use integer division `//` for mid calculation

### Go Considerations:
- Use `fmt.Scan()` to read input values
- Create slice with `make([]int, n)`
- Handle empty slice case when n=0
- Use integer division `/` for mid calculation

## Validation Checklist
- [ ] Input has exactly 3 lines (or 2 lines if n=0)
- [ ] Array size n matches actual array length
- [ ] Array is sorted in non-decreasing order
- [ ] All values are within specified ranges
- [ ] Output is single integer (-1 or valid index)
- [ ] Expected output matches working solution
- [ ] Performance test cases require O(log n) algorithm

## Automated Test Case Generation
```python
def generate_basic_test_case():
    """Generate a basic test case with target found"""
    import random
    n = random.randint(5, 20)
    arr = sorted(random.sample(range(1, 100), n))
    target_idx = random.randint(0, n-1)
    target = arr[target_idx]
    return n, arr, target, target_idx

def generate_edge_test_case():
    """Generate edge cases"""
    cases = [
        (0, [], 5, -1),  # Empty array
        (1, [10], 10, 0),  # Single element found
        (1, [10], 5, -1),  # Single element not found
    ]
    return random.choice(cases)

def generate_performance_test_case():
    """Generate large test case for performance testing"""
    n = 50000
    arr = list(range(0, n*2, 2))  # Even numbers
    target = arr[n//2]  # Target in middle
    expected = n//2
    return n, arr, target, expected

def validate_test_case(input_content, expected_content):
    """Validate that test case follows rules"""
    lines = input_content.strip().split('\n')
    
    # Check number of lines
    n = int(lines[0])
    if n == 0:
        assert len(lines) == 2, "Empty array should have 2 lines"
    else:
        assert len(lines) == 3, "Non-empty array should have 3 lines"
        
        # Check array is sorted
        arr = list(map(int, lines[1].split()))
        assert len(arr) == n, "Array length must match n"
        assert arr == sorted(arr), "Array must be sorted"
    
    # Check expected output format
    expected = expected_content.strip()
    assert expected.lstrip('-').isdigit(), "Expected output must be integer"
    
    return True
```

## Additional Test Scenarios to Consider
1. **Boundary Cases**: Target at first/last position
2. **Duplicate Elements**: How to handle arrays with duplicates
3. **Large Numbers**: Test with values near integer limits
4. **Not Found Cases**: Target smaller/larger than all elements
5. **Single Element**: Both found and not found cases
6. **Two Elements**: Minimum non-trivial case
7. **Power of 2 Sizes**: Arrays with sizes 2^k for clean binary divisions
