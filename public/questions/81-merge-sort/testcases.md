# Test Cases for Merge Sort

## Test Case Structure
This question uses a **1-line input format** with space-separated integers.

### Input Format Pattern:
```
Line 1: Space-separated integers (e.g., "3 1 4 1 5")
```

### Output Format Pattern:
```
Space-separated integers in ascending order (e.g., "1 1 3 4 5")
```

## Test Case 1: Basic - Mixed Unsorted Array
**Input (`input.txt`):**
```
3 1 4 1 5 9 2 6
```
**Expected Output (`expected.txt`):**
```
1 1 2 3 4 5 6 9
```
**Purpose**: Tests basic sorting functionality with duplicate elements and mixed positive integers.

## Test Case 2: Edge - Already Sorted Array
**Input (`input2.txt`):**
```
1 2 3 4 5
```
**Expected Output (`expected2.txt`):**
```
1 2 3 4 5
```
**Purpose**: Tests algorithm efficiency on best-case input (already sorted). Merge sort should still be O(n log n).

## Test Case 3: Performance - Large Random Array
**Input (`input3.txt`):**
```
[100 randomly shuffled integers from 1-100]
```
**Expected Output (`expected3.txt`):**
```
[Same 100 integers sorted: 1 2 3 ... 100]
```
**Purpose**: Tests performance with larger input. This case will timeout O(n²) algorithms like bubble sort but should complete quickly with merge sort's O(n log n) complexity.

## Test Case Creation Rules

### Input Validation Rules:
1. Input must be a single line of space-separated integers
2. Each integer must be parseable by `int()` function
3. Array can be empty (edge case)
4. Integers can be negative, zero, or positive
5. Duplicate values are allowed and must be preserved (stable sort)

### Output Format Rules:
1. Output must be space-separated integers on a single line
2. Numbers must be in non-decreasing order (ascending)
3. All input numbers must appear in output (no elements lost)
4. Stable sort property: equal elements maintain relative order from input

## Language-Specific Considerations

### Python Considerations:
- Use `input().split()` to parse space-separated integers
- Convert strings to integers with `map(int, line.split())`
- Handle empty input gracefully
- Use list slicing for divide operations: `arr[:mid]` and `arr[mid:]`
- Join output with `' '.join(map(str, result))`

### Go Considerations:
- Use `strings.Fields()` or `strings.Split()` to parse input
- Convert strings to integers with `strconv.Atoi()`
- Handle slice operations for divide step
- Use slices for efficient memory management in merge operation

## Additional Test Scenarios

### Edge Cases to Consider:
1. **Empty input**: `""` → `""`
2. **Single element**: `"42"` → `"42"`
3. **Two elements (sorted)**: `"1 2"` → `"1 2"`
4. **Two elements (reverse)**: `"2 1"` → `"1 2"`
5. **All same elements**: `"5 5 5 5"` → `"5 5 5 5"`
6. **Negative numbers**: `"-3 -1 -2"` → `"-3 -2 -1"`
7. **Mixed positive/negative**: `"-1 3 0 -2"` → `"-2 -1 0 3"`

### Performance Test Cases:
1. **Reverse sorted array**: Tests worst-case for some algorithms
2. **Large random array**: Tests time complexity scalability
3. **Many duplicates**: Tests stability and handling of equal elements

## Validation Checklist
- [ ] Input parsing handles all integer formats (negative, zero, positive)
- [ ] Empty input produces empty output
- [ ] Single element input works correctly  
- [ ] Algorithm maintains stability (equal elements keep relative order)
- [ ] Output format matches expected (space-separated, single line)
- [ ] Large inputs complete within reasonable time (< 1 second for 100 elements)
- [ ] Memory usage is reasonable (O(n) auxiliary space is acceptable)

## Performance Expectations
- **Time Complexity**: O(n log n) for all cases
- **Space Complexity**: O(n) auxiliary space for merge operations
- **Stability**: Must preserve relative order of equal elements
- **Large Input Performance**: Should handle 100+ elements easily

## Automated Test Case Generation
```python
def generate_test_case(size=10):
    import random
    numbers = [random.randint(-100, 100) for _ in range(size)]
    input_content = ' '.join(map(str, numbers)) + '\n'
    expected_content = ' '.join(map(str, sorted(numbers))) + '\n'
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    # Validate input format
    input_line = input_content.strip()
    if input_line:
        numbers = list(map(int, input_line.split()))
    else:
        numbers = []
    
    # Validate expected output
    expected_line = expected_content.strip()
    if expected_line:
        expected_numbers = list(map(int, expected_line.split()))
    else:
        expected_numbers = []
    
    # Check correctness
    assert sorted(numbers) == expected_numbers, "Output doesn't match sorted input"
    assert len(numbers) == len(expected_numbers), "Output length doesn't match input"
```
