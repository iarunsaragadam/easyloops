# Test Cases for Quick Sort

## Test Case Structure
This question uses a single-line input format with space-separated integers representing an array to sort.

### Input Format Pattern:
```
Line 1: Space-separated integers (e.g., "5 2 8 1 9")
Empty line for empty array
```

### Output Format Pattern:
```
Space-separated integers in ascending order (e.g., "1 2 5 8 9")
Empty line for empty array
```

## Test Case Categories (100+ Test Cases)

### Category 1: Basic Test Cases (Cases 1-25)
Simple arrays with various sizes and patterns to verify correctness.

**Example - Test Case 1:**
- **Input (`input1.txt`):** `5 2 8 1 9`
- **Expected Output (`expected1.txt`):** `1 2 5 8 9`

**Example - Test Case 2:**
- **Input (`input2.txt`):** `1 2 3 4 5`
- **Expected Output (`expected2.txt`):** `1 2 3 4 5`

**Example - Test Case 3:**
- **Input (`input3.txt`):** `5 4 3 2 1`
- **Expected Output (`expected3.txt`):** `1 2 3 4 5`

### Category 2: Edge Cases (Cases 26-50)
Boundary conditions and special scenarios.

**Example - Test Case 26:**
- **Input (`input26.txt`):** `` (empty)
- **Expected Output (`expected26.txt`):** `` (empty)

**Example - Test Case 27:**
- **Input (`input27.txt`):** `42`
- **Expected Output (`expected27.txt`):** `42`

**Example - Test Case 30:**
- **Input (`input30.txt`):** `-5 -2 -8 -1`
- **Expected Output (`expected30.txt`):** `-8 -5 -2 -1`

### Category 3: Performance Test Cases (Cases 51-75)
Large arrays designed to timeout inefficient O(n²) algorithms.

**Characteristics:**
- Array sizes: 5,000 to 10,000 elements
- Include worst-case scenarios for Quick Sort
- Test algorithmic efficiency

### Category 4: Complex Scenarios (Cases 76-100)
Advanced test cases with specific patterns and edge combinations.

**Example scenarios:**
- Arrays with many duplicate elements
- Mixed positive/negative numbers
- Mountain and valley patterns
- Alternating sequences

## Test Case Creation Rules

### Input Validation Rules:
1. **Format**: Single line with space-separated integers
2. **Empty Array**: Represented by empty line
3. **Range**: Elements between -1,000,000 and 1,000,000
4. **Size**: Arrays up to 100,000 elements for performance tests
5. **Duplicates**: Allowed and tested extensively

### Output Format Rules:
1. **Sorting Order**: Ascending (smallest to largest)
2. **Separator**: Single space between numbers
3. **Line Ending**: Single newline character
4. **Empty Output**: Empty line for empty input
5. **Consistency**: Each input file has corresponding expected output

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read the line
- Handle empty input gracefully with empty string check
- Use `list(map(int, line.split()))` to parse integers
- Print with `' '.join(map(str, sorted_array))`

### Go Considerations:
- Use `bufio.Scanner` for input reading
- Handle empty lines with `strings.TrimSpace()`
- Parse integers with `strconv.Atoi()`
- Format output with proper spacing

## Performance Requirements

### Time Complexity Expectations:
- **O(n log n)** average case for Quick Sort
- **O(n²)** worst case (should still pass with optimizations)
- Performance test cases will **timeout** bubble sort O(n²) solutions

### Memory Requirements:
- **In-place sorting** preferred (O(1) extra space)
- **O(log n)** recursion stack space acceptable
- Large test cases fit within 256 MB memory limit

## Validation Checklist

- [ ] All 100+ input files have corresponding expected output files
- [ ] Input format is consistent (space-separated integers or empty line)
- [ ] Output format matches exactly (space-separated, ascending order)
- [ ] Edge cases covered: empty, single element, duplicates, negatives
- [ ] Performance cases include large arrays (5K-10K elements)
- [ ] Expected outputs generated from verified working solution
- [ ] No trailing whitespace in output files
- [ ] Test cases cover all complexity scenarios

## Automated Test Case Generation

The test cases were generated using the following systematic approach:

```python
def generate_test_cases():
    # Category 1: Basic cases (25)
    # - Small random arrays
    # - Already sorted arrays  
    # - Reverse sorted arrays
    # - Arrays with duplicates
    
    # Category 2: Edge cases (25)  
    # - Empty arrays
    # - Single elements
    # - All negative numbers
    # - All same elements
    
    # Category 3: Performance cases (25)
    # - Large random arrays (5K-10K)
    # - Large mostly-sorted arrays
    # - Large reverse-sorted arrays
    # - Large arrays with duplicates
    
    # Category 4: Complex scenarios (25+)
    # - Mountain/valley patterns
    # - Alternating sequences
    # - Mixed positive/negative
    # - Controlled duplicate distributions
```

## Test Coverage Summary

| Category | Count | Size Range | Purpose |
|----------|-------|------------|---------|
| Basic | 25 | 0-20 elements | Verify correctness |
| Edge | 25 | 0-10 elements | Boundary conditions |
| Performance | 25 | 5K-10K elements | Algorithm efficiency |
| Complex | 25+ | 50-1K elements | Advanced scenarios |

**Total: 100+ comprehensive test cases ensuring thorough validation of Quick Sort implementations.**
