# Test Cases for Linear Search

## Test Case Structure
This question uses a 2-line input format where the first line contains the array elements and the second line contains the target value.

### Input Format Pattern:
```
Line 1: Space-separated integers (the array to search)
Line 2: A single integer (the target value to find)
```

### Output Format Pattern:
```
Single integer: 0-based index of target if found, -1 if not found
```

## Test Case 1: Basic Search - Target Found
**Input (`input.txt`):**
```
5 2 8 6 1 9 4
6
```
**Expected Output (`expected.txt`):**
```
3
```
**Description:** Basic case where target (6) is found at index 3 in a medium-sized array.

## Test Case 2: Edge Case - Target Not Found
**Input (`input2.txt`):**
```
10 20 30 40 50
25
```
**Expected Output (`expected2.txt`):**
```
-1
```
**Description:** Target (25) is not present in the array, should return -1.

## Test Case 3: Performance Case - Large Array
**Input (`input3.txt`):**
```
1 2 3 4 5 6 7 8 9 10 ... 1000
1000
```
**Expected Output (`expected3.txt`):**
```
999
```
**Description:** Performance test with 1000 elements where target is at the end (worst case for linear search).

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain at least 1 integer (non-empty array)
2. All array elements must be valid integers within the constraint range
3. Second line must contain exactly 1 integer (the target)
4. Array size should be within constraint limits (1 ≤ n ≤ 100,000)

### Output Format Rules:
1. Output must be a single integer
2. Output must be either a valid 0-based index or -1
3. If target appears multiple times, return the index of the first occurrence
4. No trailing whitespace or additional characters

### Test Case Categories:

#### Basic Test Cases:
- Target found at beginning, middle, and end of array
- Arrays of different sizes (small, medium, large)
- Positive and negative numbers
- Target found vs. target not found

#### Edge Cases:
- Single element array (target found/not found)
- Array with duplicate elements
- Target is the minimum/maximum element
- Array with all same elements
- Array with negative numbers, zero, positive numbers

#### Performance Test Cases:
- Large arrays (1000+ elements) with target at the end (worst case)
- Large arrays with target at the beginning (best case)
- Large arrays with target not found
- Arrays that test the O(n) time complexity

#### Complex Scenarios:
- Arrays with duplicate targets (should return first occurrence)
- Mixed positive/negative numbers with zero
- Arrays with extreme values (within constraint limits)

## Language-Specific Considerations

### Python Considerations:
- Use `list(map(int, input().split()))` to parse the array
- Use `int(input())` to read the target
- Handle empty input gracefully
- Use `range(len(arr))` for index-based iteration

### Go Considerations:
- Use `fmt.Scan()` or `bufio.Scanner` for input parsing
- Handle space-separated integers correctly
- Use proper error handling for input parsing
- Implement bounds checking for array access

### JavaScript Considerations:
- Use `readline` interface for input reading
- Parse integers correctly with `parseInt()`
- Handle array splitting and mapping properly

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] First line contains space-separated integers
- [ ] Second line contains a single integer
- [ ] Array is non-empty (at least 1 element)
- [ ] All numbers are within constraint limits
- [ ] Expected output is correct (manually verified)
- [ ] Test case covers specific scenario (basic/edge/performance)
- [ ] Output format is exactly as specified (single integer)

## Automated Test Case Generation
```python
def generate_test_case(case_type="basic", size=10):
    """Generate test cases for linear search"""
    import random
    
    if case_type == "basic":
        # Generate random array with target present
        arr = [random.randint(1, 100) for _ in range(size)]
        target_index = random.randint(0, size-1)
        target = arr[target_index]
        return arr, target, target_index
    
    elif case_type == "not_found":
        # Generate array without target
        arr = [random.randint(1, 100) for _ in range(size)]
        target = max(arr) + 1  # Ensure target is not in array
        return arr, target, -1
    
    elif case_type == "performance":
        # Generate large array with target at end (worst case)
        arr = list(range(1, size+1))
        target = size
        return arr, target, size-1

def validate_test_case(input_content, expected_content):
    """Validate test case format and correctness"""
    lines = input_content.strip().split('\n')
    
    # Check input format
    if len(lines) != 2:
        return False, "Input must have exactly 2 lines"
    
    try:
        # Parse array
        arr = list(map(int, lines[0].split()))
        if len(arr) == 0:
            return False, "Array must not be empty"
        
        # Parse target
        target = int(lines[1])
        
        # Check expected output
        expected = int(expected_content.strip())
        
        # Validate expected output
        actual_index = -1
        for i, val in enumerate(arr):
            if val == target:
                actual_index = i
                break
        
        if actual_index != expected:
            return False, f"Expected {expected}, but correct answer is {actual_index}"
        
        return True, "Test case is valid"
    
    except ValueError:
        return False, "Invalid integer format in input"

def performance_test(solution_func, test_cases):
    """Test solution performance with various input sizes"""
    import time
    
    for size in [100, 1000, 10000]:
        # Generate worst-case scenario (target at end)
        arr = list(range(1, size+1))
        target = size
        
        start_time = time.time()
        result = solution_func(arr, target)
        end_time = time.time()
        
        print(f"Size {size}: {end_time - start_time:.4f}s, Result: {result}")
```

## Expected Time Complexity Analysis
- **Linear Search**: O(n) time complexity
- **Best Case**: O(1) - target is at the first position
- **Average Case**: O(n/2) - target is in the middle
- **Worst Case**: O(n) - target is at the end or not present
- **Space Complexity**: O(1) - only uses constant extra space

Solutions with worse than O(n) time complexity (like nested loops) should timeout on performance test cases.
