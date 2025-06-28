# Test Cases for Insertion Sort

## Test Case Structure
This question uses a single-line input format with space-separated integers.

### Input Format Pattern:
```
Line 1: Space-separated integers (e.g., "5 2 8 1 9")
```

### Output Format Pattern:
```
Space-separated integers in ascending order (e.g., "1 2 5 8 9")
```

## Test Case 1: Basic - Mixed Order Array
**Input (`input.txt`):**
```
5 2 8 1 9
```
**Expected Output (`expected.txt`):**
```
1 2 5 8 9
```
**Description**: Basic test case with a small array of unsorted integers in random order.

## Test Case 2: Edge Cases - Single Element and Empty Input
**Input (`input2.txt`):**
```
42
```
**Expected Output (`expected2.txt`):**
```
42
```
**Description**: Edge case testing single element array. Also tests boundary conditions.

## Test Case 3: Performance - Large Reverse Sorted Array
**Input (`input3.txt`):**
```
100 99 98 97 96 95 94 93 92 91 90 89 88 87 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
```
**Expected Output (`expected3.txt`):**
```
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100
```
**Description**: Performance test case with 100 elements in reverse order (worst case for insertion sort). This tests O(n²) time complexity and should timeout inefficient algorithms.

## Test Case Categories

### Basic Test Cases (Fundamental Functionality):
- **Mixed Order**: Random arrangement of numbers
- **Already Sorted**: Best case scenario (O(n) time)
- **Reverse Sorted**: Worst case scenario (O(n²) time)
- **Duplicates**: Arrays with repeated elements
- **Negative Numbers**: Include negative integers

### Edge Cases (Boundary Conditions):
- **Empty Input**: Handle empty string gracefully
- **Single Element**: Array with only one number
- **Two Elements**: Minimal sorting scenario
- **All Same**: Array where all elements are identical
- **Large Numbers**: Test with maximum constraint values

### Performance Test Cases (Algorithm Efficiency):
- **Large Arrays**: Test with maximum input size (1000 elements)
- **Worst Case Pattern**: Reverse sorted large arrays
- **Best Case Pattern**: Already sorted large arrays
- **Random Large**: Large arrays with random order

### Complex Scenarios (Multiple Conditions):
- **Mixed Positive/Negative**: Combination of positive and negative numbers
- **Large Range**: Numbers spanning the full constraint range (-1000 to 1000)
- **Partial Sort**: Nearly sorted arrays with few out-of-place elements

## Test Case Creation Rules

### Input Validation Rules:
1. Input must contain only integers separated by single spaces
2. Each integer must be between -1000 and 1000 (inclusive)
3. Total number of integers must be between 0 and 1000
4. Empty input is valid and should produce empty output
5. No leading or trailing spaces in input

### Output Format Rules:
1. Output must contain integers separated by single spaces
2. Output must be in ascending order (non-decreasing)
3. Output must preserve all input numbers (no additions or deletions)
4. No leading or trailing spaces in output
5. Empty input produces empty output (just newline)

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to handle potential whitespace
- Handle empty input gracefully with empty string check
- Use `list(map(int, line.split()))` for parsing
- Join output with `' '.join(map(str, numbers))`

### Go Considerations:
- Use `strings.Fields()` to split input properly
- Handle empty input by checking string length
- Use `strconv.Atoi()` for string to integer conversion
- Format output with proper spacing

## Performance Expectations

### Time Complexity Analysis:
- **Best Case**: O(n) - when array is already sorted
- **Average Case**: O(n²) - random order arrays
- **Worst Case**: O(n²) - when array is reverse sorted

### Space Complexity: O(1) - in-place sorting algorithm

### Performance Test Criteria:
- Test Case 3 (reverse sorted 100 elements) should complete within time limit for proper insertion sort
- Inefficient algorithms (like repeated linear search) should timeout on large test cases
- Already sorted arrays should complete very quickly

## Validation Checklist
- [ ] Input has exactly 1 line (or empty for edge case)
- [ ] All numbers are within range [-1000, 1000]
- [ ] Output is correctly sorted in ascending order
- [ ] Output contains exactly the same numbers as input
- [ ] Empty input produces empty output
- [ ] Single element input produces same element as output
- [ ] Large inputs complete within time constraints
- [ ] Negative numbers are handled correctly
- [ ] Duplicate numbers are preserved

## Automated Test Case Generation
```python
import random

def generate_basic_test_case():
    """Generate a basic mixed-order test case"""
    size = random.randint(5, 20)
    numbers = random.sample(range(-50, 51), size)
    return numbers

def generate_edge_case():
    """Generate edge cases"""
    cases = [
        [],  # empty
        [42],  # single element
        [1, 2],  # two elements
        [5, 5, 5, 5],  # all same
        [-10, -5, 0, 5, 10]  # mix of negative/positive
    ]
    return random.choice(cases)

def generate_performance_case():
    """Generate worst-case performance test"""
    size = random.randint(50, 100)
    return list(range(size, 0, -1))  # reverse sorted

def validate_test_case(input_numbers, expected_output):
    """Validate that expected output is correct"""
    if not input_numbers:
        return expected_output == []
    
    sorted_input = sorted(input_numbers)
    return sorted_input == expected_output
```
