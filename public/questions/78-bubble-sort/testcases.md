# Test Cases for Bubble Sort Algorithm

## Test Case Structure
This question uses a single-line input format containing space-separated integers.

### Input Format Pattern:
```
Line 1: Space-separated integers (may be empty)
```

### Output Format Pattern:
```
Space-separated integers sorted in ascending order
```

## Test Case Categories (102 Total)

### Basic Test Cases (Cases 1-30)
Simple arrays of various sizes to verify correctness:
- **Cases 1-10**: Small arrays (3-10 elements) with mixed positive integers
- **Cases 11-20**: Medium arrays (10-20 elements) with various patterns
- **Cases 21-30**: Arrays with mixed positive/negative numbers

**Example - Test Case 1:**
```
Input: 5 2 8 1 9
Output: 1 2 5 8 9
```

### Edge Cases (Cases 31-57)
Boundary conditions and special scenarios:
- **Case 31**: Empty input
- **Cases 32-38**: Single elements (positive, negative, zero)
- **Cases 39-45**: Two elements (sorted, unsorted, equal)
- **Cases 46-49**: Already sorted arrays
- **Cases 50-53**: Reverse sorted arrays  
- **Cases 54-57**: All identical elements

**Example - Test Case 31 (Empty Input):**
```
Input: (empty line)
Output: (empty line)
```

**Example - Test Case 50 (Reverse Sorted):**
```
Input: 5 4 3 2 1
Output: 1 2 3 4 5
```

### Performance Test Cases (Cases 58-82)
Large arrays that test algorithm efficiency:
- **Cases 58-62**: Worst case - reverse sorted large arrays (100-1000 elements)
- **Cases 63-67**: Random large arrays (100-1000 elements)
- **Cases 68-72**: Nearly sorted with minimal disorder
- **Cases 73-77**: Arrays with many duplicate values
- **Cases 78-82**: Mixed positive/negative large arrays

**Performance Goal**: These cases will timeout O(n³) algorithms but should pass with proper O(n²) bubble sort implementation.

### Complex Scenarios (Cases 83-102)
Advanced patterns and combinations:
- **Cases 83-87**: Alternating patterns and special sequences
- **Cases 88-92**: Clustered values and geometric progressions
- **Cases 93-97**: Multiple duplicates scattered throughout
- **Cases 98-102**: Complex mixed patterns with various edge cases

## Test Case Creation Rules

### Input Validation Rules:
1. Input may be empty (test case 31)
2. Input may contain negative numbers, zero, and positive numbers
3. Maximum array size: 1000 elements for performance testing
4. Integer range: -1,000,000 to 1,000,000
5. Elements are space-separated on a single line

### Output Format Rules:
1. Output sorted integers in ascending order, space-separated
2. Empty input produces empty output
3. Single element produces that element
4. No trailing spaces or extra newlines
5. Maintain integer precision (no decimal points)

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read and clean input
- Handle empty input with conditional checks
- Use `list(map(int, line.split()))` for parsing integers
- Join output with `' '.join(map(str, sorted_array))`
- Implement proper bubble sort with nested loops

### Go Considerations:
- Use `bufio.Scanner` for input reading
- Handle empty strings after trimming whitespace
- Use `strings.Fields()` for splitting input
- Convert strings to integers with `strconv.Atoi()`
- Implement bubble sort with proper type handling

### JavaScript Considerations:
- Use `readline` or process.stdin for input
- Handle empty input and whitespace properly
- Split and parse integers with `map(Number)`
- Join output arrays with space separator
- Implement bubble sort with proper comparisons

## Performance Expectations

### Time Complexity Requirements:
- **Best Case**: O(n) with early termination optimization
- **Average Case**: O(n²) 
- **Worst Case**: O(n²)
- **Space Complexity**: O(1) additional space

### Test Case Performance Targets:
- **Basic Cases (1-30)**: Should complete instantly
- **Edge Cases (31-57)**: Should complete instantly  
- **Performance Cases (58-82)**: Should complete within 1-2 seconds
- **Complex Cases (83-102)**: Should complete within 1-2 seconds

### Algorithm Requirements:
- Must implement actual bubble sort algorithm
- Cannot use built-in sorting functions
- Should include optimization for early termination when no swaps occur
- Must handle all edge cases properly

## Validation Checklist
- [ ] All 102 test cases have corresponding input/output files
- [ ] Empty input case handled correctly
- [ ] Single element cases work properly
- [ ] Already sorted arrays are handled efficiently
- [ ] Reverse sorted arrays produce correct output
- [ ] Large arrays complete within time limits
- [ ] All expected outputs generated from verified bubble sort implementation
- [ ] Input parsing handles edge cases (empty, single element)
- [ ] Output formatting matches specification exactly
- [ ] Performance cases will timeout inefficient algorithms

## Automated Test Case Generation
The test cases were generated using a verified bubble sort implementation:

```python
def bubble_sort(arr):
    """Reference bubble sort implementation for generating expected outputs"""
    n = len(arr)
    if n <= 1:
        return arr
    
    arr = arr.copy()
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

def validate_test_case(input_content, expected_content):
    """Validate that expected output matches bubble sort result"""
    if not input_content.strip():
        return expected_content.strip() == ""
    
    numbers = list(map(int, input_content.strip().split()))
    sorted_numbers = bubble_sort(numbers)
    expected_result = ' '.join(map(str, sorted_numbers))
    
    return expected_content.strip() == expected_result
```

This ensures all expected outputs are mathematically correct and consistent.
