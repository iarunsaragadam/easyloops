# Test Cases for Selection Sort

## Test Case Structure
This question uses a single-line input format containing space-separated integers.

### Input Format Pattern:
```
Line 1: space-separated integers (e.g., "5 2 8 1 9")
```

### Output Format Pattern:
```
Line 1: space-separated integers in ascending order (e.g., "1 2 5 8 9")
```

## Test Case 1: Basic Sorting
**Input (`input.txt`):**
```
5 2 8 1 9
```
**Expected Output (`expected.txt`):**
```
1 2 5 8 9
```
**Purpose:** Tests basic sorting functionality with a small unsorted array.

## Test Case 2: Edge Case - Single Element
**Input (`input2.txt`):**
```
1
```
**Expected Output (`expected2.txt`):**
```
1
```
**Purpose:** Tests edge case with single element array (should remain unchanged).

## Test Case 3: Performance Test - Reverse Sorted
**Input (`input3.txt`):**
```
10 9 8 7 6 5 4 3 2 1
```
**Expected Output (`expected3.txt`):**
```
1 2 3 4 5 6 7 8 9 10
```
**Purpose:** Tests worst-case scenario for selection sort with reverse-sorted array.

## Test Case Creation Rules

### Input Validation Rules:
1. Input must contain at least one integer
2. Integers must be space-separated on a single line
3. Each integer must be within the range -10⁹ to 10⁹
4. No leading or trailing spaces (except line terminator)
5. Array length should not exceed 1000 elements

### Output Format Rules:
1. Output must be a single line of space-separated integers
2. Integers must be sorted in ascending order
3. Same number of elements as input
4. No leading or trailing spaces (except line terminator)
5. Preserve all original values (no duplicates removed)

## Additional Test Scenarios

### Duplicate Elements:
- Input: `3 1 3 2 1`
- Output: `1 1 2 3 3`
- Purpose: Ensures algorithm handles duplicate values correctly

### Already Sorted:
- Input: `1 2 3 4 5`
- Output: `1 2 3 4 5`
- Purpose: Tests best-case scenario (algorithm should still work correctly)

### Negative Numbers:
- Input: `-5 -1 -10 0 3`
- Output: `-10 -5 -1 0 3`
- Purpose: Ensures correct handling of negative integers

### Large Numbers:
- Input: `1000000000 -1000000000 0`
- Output: `-1000000000 0 1000000000`
- Purpose: Tests boundary values within constraints

## Performance Considerations

### Time Complexity: O(n²)
- Selection sort always performs n² comparisons regardless of input order
- Performance test case with reverse-sorted array demonstrates worst-case behavior
- Inefficient for large datasets but educational for understanding basic sorting

### Space Complexity: O(1)
- In-place sorting algorithm requiring only constant extra space
- No additional arrays or data structures needed beyond input storage

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read the line and remove trailing newline
- Parse with `list(map(int, line.split()))` for integer conversion
- Handle empty input gracefully (though not expected in valid test cases)
- Use tuple unpacking for elegant swapping: `arr[i], arr[j] = arr[j], arr[i]`

### Go Considerations:
- Use `bufio.Scanner` for reading input
- Parse integers with `strconv.Atoi()` and handle potential errors
- Use `strings.Fields()` to split space-separated values
- Format output with proper spacing using `fmt.Print()` and `fmt.Println()`

### JavaScript Considerations:
- Use `readline` interface for input processing
- Parse with `line.split(' ').map(Number)`
- Handle integer parsing and validate numeric inputs
- Join output array with spaces: `result.join(' ')`

## Validation Checklist
- [ ] Input has exactly 1 line with space-separated integers
- [ ] Output has exactly 1 line with space-separated integers
- [ ] Output contains same number of elements as input
- [ ] Output elements are sorted in ascending order
- [ ] All original values are preserved (including duplicates)
- [ ] Algorithm demonstrates O(n²) time complexity behavior
- [ ] Edge cases (single element, duplicates, negatives) are handled correctly
- [ ] Performance test case reveals algorithm inefficiency for large inputs

## Automated Test Case Generation

```python
import random

def generate_basic_test_case(size=5):
    """Generate a basic test case with random integers"""
    numbers = random.sample(range(1, 100), size)
    input_content = " ".join(map(str, numbers))
    expected_content = " ".join(map(str, sorted(numbers)))
    return input_content, expected_content

def generate_edge_test_case():
    """Generate edge case test cases"""
    cases = [
        # Single element
        ("1", "1"),
        # Duplicates
        ("3 3 3", "3 3 3"),
        # Already sorted
        ("1 2 3", "1 2 3"),
        # Reverse sorted
        ("3 2 1", "1 2 3"),
        # With negatives
        ("-1 5 -3", "-3 -1 5")
    ]
    return cases

def generate_performance_test_case(size=10):
    """Generate performance test case with reverse-sorted array"""
    numbers = list(range(size, 0, -1))  # Reverse sorted
    input_content = " ".join(map(str, numbers))
    expected_content = " ".join(map(str, sorted(numbers)))
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the required format"""
    # Validate input format
    try:
        input_numbers = list(map(int, input_content.strip().split()))
        expected_numbers = list(map(int, expected_content.strip().split()))
    except ValueError:
        return False, "Invalid number format"
    
    # Check same length
    if len(input_numbers) != len(expected_numbers):
        return False, "Input and output have different lengths"
    
    # Check if expected is sorted version of input
    if sorted(input_numbers) != expected_numbers:
        return False, "Expected output is not sorted version of input"
    
    # Check constraints
    if len(input_numbers) > 1000:
        return False, "Array too large (max 1000 elements)"
    
    for num in input_numbers:
        if abs(num) > 10**9:
            return False, "Number exceeds constraints"
    
    return True, "Valid test case"
```

## Testing Strategy

1. **Basic Functionality**: Verify algorithm sorts correctly
2. **Edge Cases**: Test boundary conditions and special inputs
3. **Performance**: Ensure algorithm exhibits expected O(n²) behavior
4. **Correctness**: Validate output format and content accuracy
5. **Robustness**: Test with various input patterns and sizes
