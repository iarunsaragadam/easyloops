# Test Cases for Maximum Subarray Sum - Dynamic Programming

## Test Case Structure
This question uses a 2-line input format to test dynamic programming concepts effectively.

### Input Format Pattern:
```
Line 1: Integer N (array size)
Line 2: N space-separated integers (array elements)
```

### Output Format Pattern:
```
Single integer: maximum subarray sum
```

## Test Case 1: Basic - Classic Example
**Input (`input.txt`):**
```
9
-2 1 -3 4 -1 2 1 -5 4
```
**Expected Output (`expected.txt`):**
```
6
```
**Purpose**: Tests the fundamental algorithm with a mix of positive and negative numbers. The optimal subarray is `[4, -1, 2, 1]` with sum 6. This is the classic example used to teach Kadane's algorithm.

## Test Case 2: Edge - All Negative Numbers
**Input (`input2.txt`):**
```
4
-2 -3 -1 -5
```
**Expected Output (`expected2.txt`):**
```
-1
```
**Purpose**: Tests the edge case where all numbers are negative. The algorithm should return the single largest (least negative) element. This case often trips up incorrect implementations that assume positive sums.

## Test Case 3: Performance - All Positive Numbers
**Input (`input3.txt`):**
```
5
1 2 3 4 5
```
**Expected Output (`expected3.txt`):**
```
15
```
**Purpose**: Tests performance with all positive numbers where the entire array is the optimal subarray. Also validates that the algorithm correctly handles simple cases. Sum = 1+2+3+4+5 = 15.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain a single positive integer N (1 ≤ N ≤ 100,000)
2. Second line must contain exactly N space-separated integers
3. Each integer must be in range [-1,000, 1,000]
4. No empty arrays or invalid input formats

### Output Format Rules:
1. Output must be a single integer on one line
2. No trailing spaces or additional formatting
3. Result must be the mathematically correct maximum subarray sum
4. For all-negative arrays, output the single largest element

## Algorithm Performance Expectations

### Efficient Solution (Expected):
- **Time Complexity**: O(n) using Kadane's algorithm
- **Space Complexity**: O(1) 
- **Performance**: Should handle N=100,000 easily within time limits

### Inefficient Solutions (Should Timeout):
- **Brute Force**: O(n³) - checking all possible subarrays
- **Improved Brute Force**: O(n²) - still too slow for large inputs
- These approaches will timeout on performance test cases

## Language-Specific Considerations

### Python Considerations:
- Use `int(input())` to read the array size
- Use `list(map(int, input().split()))` to read the array
- Integer overflow is not a concern in Python
- Watch out for empty list edge cases

### Go Considerations:
- Use `fmt.Scan()` to read input values
- Handle integer overflow considerations if using smaller int types
- Implement a `max()` function as it's not built-in for integers
- Pre-allocate slice with known size for efficiency

### JavaScript Considerations:
- Use `parseInt()` for input parsing
- Be careful with array creation and initialization
- Number type can handle the required range safely

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] First line contains a valid positive integer N
- [ ] Second line contains exactly N integers
- [ ] All integers are within the specified range
- [ ] Output is a single integer
- [ ] Algorithm demonstrates dynamic programming concepts
- [ ] Solution handles edge cases (all negative, single element, all positive)
- [ ] Performance is acceptable for large inputs (O(n) time complexity)

## Educational Value Assessment
- [ ] Problem teaches optimal substructure concept
- [ ] Problem demonstrates state transition decisions
- [ ] Problem shows the power of DP vs brute force approaches
- [ ] Problem has clear real-world applications
- [ ] Problem difficulty is appropriate for the medium level

## Automated Test Case Generation
```python
def generate_test_case(n, min_val=-1000, max_val=1000):
    """Generate a random test case for maximum subarray sum"""
    import random
    arr = [random.randint(min_val, max_val) for _ in range(n)]
    return n, arr

def kadane_algorithm(arr):
    """Reference implementation for generating expected outputs"""
    if not arr:
        return 0
    
    max_ending_here = max_so_far = arr[0]
    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted and solved"""
    lines = input_content.strip().split('\n')
    if len(lines) != 2:
        return False, "Input must have exactly 2 lines"
    
    try:
        n = int(lines[0])
        arr = list(map(int, lines[1].split()))
        
        if len(arr) != n:
            return False, f"Array length {len(arr)} doesn't match declared size {n}"
        
        expected = int(expected_content.strip())
        actual = kadane_algorithm(arr)
        
        if expected != actual:
            return False, f"Expected {expected}, but correct answer is {actual}"
        
        return True, "Test case is valid"
    except Exception as e:
        return False, f"Invalid format: {str(e)}"
```

## Common Student Mistakes to Watch For
1. **Off-by-one errors** in array indexing
2. **Forgetting the all-negative case** - returning 0 instead of the largest element
3. **Integer overflow** in languages with fixed-size integers
4. **Implementing O(n²) or O(n³) solutions** that timeout on large inputs
5. **Incorrect handling of single-element arrays**
6. **Not understanding the DP state transition** - when to extend vs. start new
