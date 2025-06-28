# Test Cases for Profiling and Benchmarking

## Test Case Structure

This question uses a **single-line input format** containing space-separated integers representing an array to analyze for duplicate elements. Students implement two different algorithms (naive O(n²) and optimized O(n)) and compare their performance.

**Total Test Cases**: 133 comprehensive test cases (input1.txt to input133.txt with corresponding expected1.txt to expected133.txt)

### Input Format Pattern:
```
Line 1: space-separated integers (array elements)
```

### Output Format Pattern:
```
Duplicates: <sorted list of duplicate numbers>
Naive Time: <execution_time>ms
Optimized Time: <execution_time>ms
Faster: <algorithm_name>
Speedup: <ratio>x
```

## Test Case Categories

### Basic Test Cases (input1.txt - input30.txt)
- **Purpose**: Simple, straightforward scenarios that demonstrate core functionality
- **Characteristics**: Small arrays (5-20 elements), clear duplicate patterns
- **Examples**: 
  - Arrays with 2-3 different duplicates
  - Single duplicate scenarios
  - Multiple duplicate scenarios
- **Learning Focus**: Basic algorithm correctness and output format

### Edge Test Cases (input31.txt - input59.txt)  
- **Purpose**: Boundary conditions and special cases
- **Characteristics**: Unusual but valid inputs that test algorithm robustness
- **Examples**:
  - All elements identical
  - Minimum size arrays (2 elements)
  - Negative numbers and zero
  - Large numbers (up to ±2,147,483,647)
  - Mixed positive/negative arrays
- **Learning Focus**: Handling edge conditions and input validation

### Performance Test Cases (input60.txt - input84.txt)
- **Purpose**: Demonstrate clear performance differences between O(n²) and O(n) algorithms
- **Characteristics**: Larger arrays (50-1000 elements) designed to show timing differences
- **Examples**:
  - Arrays with 100, 200, 500, 1000 elements
  - Many duplicates to stress nested loop algorithm
  - Worst-case patterns for naive approach
- **Learning Focus**: Understanding algorithm complexity and performance measurement

### Complex Test Cases (input85.txt - input113.txt)
- **Purpose**: Realistic scenarios with intricate duplicate patterns
- **Characteristics**: Medium to large arrays with complex duplicate distributions
- **Examples**:
  - Arrays with many different duplicates
  - Mathematical sequences (arithmetic, Fibonacci, powers)
  - Random complex patterns with controlled duplicate ratios
- **Learning Focus**: Real-world algorithm application and pattern recognition

### Corner Test Cases (input114.txt - input133.txt)
- **Purpose**: Unusual but valid inputs that test algorithm limits
- **Characteristics**: Extreme values and uncommon patterns
- **Examples**:
  - Single duplicate in very large array
  - Almost all elements duplicated
  - Palindrome-like patterns
  - Extreme integer values
- **Learning Focus**: Algorithm robustness and edge case handling

## Sample Test Cases

### Test Case 1: Basic Array with Multiple Duplicates

**Input (`input1.txt`):**
```
1 2 3 2 4 5 3 6
```
**Expected Output (`expected1.txt`):**
```
Duplicates: 2 3
Naive Time: 0.008ms
Optimized Time: 0.003ms
Faster: Optimized
Speedup: 2.61x
```

### Test Case 31: Edge Case - All Same Elements

**Input (`input31.txt`):** *(example)*
```
5 5 5 5 5
```
**Expected Output (`expected31.txt`):** *(example)*
```
Duplicates: 5
Naive Time: 0.005ms
Optimized Time: 0.002ms
Faster: Optimized
Speedup: 2.50x
```

### Test Case 70: Performance Test - Large Array

**Input (`input70.txt`):** *(example - 200 elements)*
```
[Large array with 200 elements containing many duplicates]
```
**Expected Output (`expected70.txt`):** *(example)*
```
Duplicates: [Multiple duplicate numbers]
Naive Time: 0.850ms
Optimized Time: 0.015ms
Faster: Optimized
Speedup: 56.67x
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Array Length**: Must contain at least 2 elements (minimum case for duplicates)
2. **Duplicate Requirement**: Must contain at least one duplicate element
3. **Element Range**: Elements should be within reasonable integer range (-2,147,483,648 to 2,147,483,647)
4. **Format**: Single line with space-separated integers only
5. **Size Distribution**: 
   - Basic: 5-20 elements
   - Edge: 2-30 elements  
   - Performance: 50-1000 elements
   - Complex: 30-100 elements
   - Corner: Variable (2-200 elements)

### Output Format Rules:
1. **Duplicates Line**: Must start with "Duplicates: " followed by sorted ascending list of unique duplicate numbers
2. **Timing Lines**: Must show "Naive Time: " and "Optimized Time: " with time in milliseconds to 3 decimal places
3. **Comparison Lines**: Must show "Faster: " followed by either "Naive" or "Optimized"
4. **Speedup Line**: Must show "Speedup: " followed by ratio to 2 decimal places with "x" suffix
5. **No Extra Output**: No debug messages or additional lines

## Language-Specific Considerations

### Python Considerations:
- Use `time.perf_counter()` for high-precision timing measurements
- Use `set()` for O(1) lookup operations in optimized algorithm
- Handle floating-point precision in timing calculations
- Use `sorted()` to ensure duplicate numbers are in ascending order
- Handle very small timing values that might round to zero

### Go Considerations:
- Use `time.Now()` and `time.Since()` for timing measurements
- Use `map[int]bool` for efficient lookups in optimized algorithm
- Handle time conversion to milliseconds properly
- Use `sort.Ints()` to sort duplicate numbers before output
- Consider goroutine overhead for very small inputs

### Timing Accuracy Notes:
- Timing values may vary between runs due to system load
- The key learning objective is understanding the relative performance difference
- Focus on teaching the algorithmic complexity concepts rather than exact timing values
- Performance differences become more apparent with larger input sizes

## Validation Checklist

- [ ] All 133 input files contain valid arrays with duplicates
- [ ] All 133 expected output files follow exact format specification
- [ ] Input has space-separated integers on a single line
- [ ] Output shows duplicates in sorted ascending order
- [ ] Output includes timing measurements for both algorithms
- [ ] Output identifies which algorithm is faster (usually "Optimized")
- [ ] Output calculates speedup ratio correctly
- [ ] No extra debug output or formatting issues
- [ ] Both naive and optimized algorithms produce the same duplicate list
- [ ] Performance test cases show clear speedup with larger inputs
- [ ] Edge cases handle boundary conditions properly
- [ ] Corner cases test algorithm robustness

## Test Case Distribution Summary

| Category | Range | Count | Purpose |
|----------|--------|-------|----------|
| Basic | input1-input30 | 30 | Core functionality |
| Edge | input31-input59 | 29 | Boundary conditions |
| Performance | input60-input84 | 25 | Algorithm complexity |
| Complex | input85-input113 | 29 | Real-world patterns |
| Corner | input114-input133 | 20 | Robustness testing |
| **Total** | **input1-input133** | **133** | **Comprehensive coverage** |

## Automated Test Case Generation

```python
import random

def generate_test_case(size=10, max_val=100, duplicate_ratio=0.3):
    """Generate a test case with specified parameters"""
    # Create base array
    base_size = int(size * (1 - duplicate_ratio))
    base_array = random.sample(range(1, max_val + 1), base_size)
    
    # Add duplicates
    duplicate_count = size - base_size
    duplicates = random.choices(base_array, k=duplicate_count)
    
    # Combine and shuffle
    result = base_array + duplicates
    random.shuffle(result)
    
    return result

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted"""
    # Parse input
    try:
        numbers = list(map(int, input_content.strip().split()))
        if len(numbers) < 2:
            return False, "Array must have at least 2 elements"
        
        # Check for duplicates
        if len(set(numbers)) == len(numbers):
            return False, "Array must contain at least one duplicate"
            
    except ValueError:
        return False, "Input must contain only integers"
    
    # Validate expected output format
    lines = expected_content.strip().split('\n')
    if len(lines) != 5:
        return False, "Expected output must have exactly 5 lines"
    
    required_prefixes = [
        "Duplicates: ",
        "Naive Time: ",
        "Optimized Time: ",
        "Faster: ",
        "Speedup: "
    ]
    
    for i, prefix in enumerate(required_prefixes):
        if not lines[i].startswith(prefix):
            return False, f"Line {i+1} must start with '{prefix}'"
    
    return True, "Valid test case"
```
