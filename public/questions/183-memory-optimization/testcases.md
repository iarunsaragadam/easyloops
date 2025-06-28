# Test Cases for Memory optimization

## Test Case Structure
This question uses a 2-line input format for non-empty arrays and 1-line format for empty arrays.

### Input Format Pattern:
```
Line 1: n (number of elements, 0 ≤ n ≤ 100,000)
Line 2: n space-separated integers (only present if n > 0)
```

### Output Format Pattern:
```
Space-separated unique integers in original order, followed by newline
Empty line if input array is empty
```

## Test Case Categories (100+ Total Cases)

### Basic Test Cases (Cases 1-20)
Simple, straightforward inputs to verify correctness:

## Test Case 1: Basic
**Input (`input1.txt`):**
```
5
1 2 2 3 1
```
**Expected Output (`expected1.txt`):**
```
1 2 3
```
**Description:** Standard case with duplicates - verifies basic deduplication logic.

## Test Case 2: All Same Elements
**Input (`input2.txt`):**
```
4
5 5 5 5
```
**Expected Output (`expected2.txt`):**
```
5
```
**Description:** All elements identical - tests edge case of maximum duplicates.

## Test Case 3: No Duplicates
**Input (`input3.txt`):**
```
4
1 2 3 4
```
**Expected Output (`expected3.txt`):**
```
1 2 3 4
```
**Description:** No duplicates present - verifies algorithm doesn't modify when unnecessary.

## Test Case 4: Single Element
**Input (`input4.txt`):**
```
1
7
```
**Expected Output (`expected4.txt`):**
```
7
```
**Description:** Single element - tests minimal input case.

### Edge Test Cases (Cases 21-40)
Boundary conditions, empty inputs, special cases:

## Test Case 21: Empty Array
**Input (`input21.txt`):**
```
0
```
**Expected Output (`expected21.txt`):**
```

```
**Description:** Empty array - tests n=0 case with no second line.

## Test Case 22: Large Duplicates
**Input (`input22.txt`):**
```
50
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
```
**Expected Output (`expected22.txt`):**
```
1
```
**Description:** Many identical elements - stresses duplicate detection.

## Test Case 26: Negative Numbers
**Input (`input26.txt`):**
```
5
-1 -2 -1 -3 -2
```
**Expected Output (`expected26.txt`):**
```
-1 -2 -3
```
**Description:** Negative numbers - ensures algorithm handles negative values correctly.

### Performance Test Cases (Cases 41-70)
Large inputs that timeout with poor algorithms:

## Test Case 41: Large Array with Many Duplicates
**Input (`input41.txt`):**
```
1500
[1500 integers with many duplicates]
```
**Expected Output (`expected41.txt`):**
```
[Deduplicated result]
```
**Description:** Large array with significant duplication - tests performance with O(n²) acceptable time complexity but should demonstrate memory optimization benefits.

### Complex Scenario Test Cases (Cases 71-90)
Multiple edge cases combined:

## Test Case 71: Fibonacci Pattern with Duplicates
**Input (`input71.txt`):**
```
[Size varies]
[Fibonacci-like sequence with intentional duplicates]
```
**Expected Output (`expected71.txt`):**
```
[Deduplicated Fibonacci-like sequence]
```
**Description:** Mathematical pattern with duplicates - tests algorithm on structured data.

### Corner Test Cases (Cases 91-100+)
Unusual but valid inputs:

## Test Case 91: Maximum Size Minimal Duplicates
**Input (`input91.txt`):**
```
1000
[1000 mostly unique integers with few duplicates]
```
**Expected Output (`expected91.txt`):**
```
[Nearly complete array with few elements removed]
```
**Description:** Large array with minimal duplication - tests performance on nearly unique data.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain single non-negative integer n (0 ≤ n ≤ 100,000)
2. If n > 0, second line must contain exactly n space-separated integers
3. If n = 0, input consists of only the first line
4. Each integer must be in range [-1,000,000, 1,000,000]
5. No leading/trailing whitespace except single newline at end of each line

### Output Format Rules:
1. Output unique integers in order of first occurrence
2. Space-separated format with single space between integers
3. Single newline at end of output
4. Empty output (just newline) for empty input array
5. No leading/trailing spaces in output line

### Performance Requirements:
1. Memory-optimized solution should use O(1) extra space (excluding input array)
2. Time complexity O(n²) is acceptable for memory optimization focus
3. Large test cases should complete within 2 seconds
4. Memory usage should not exceed 256 MB

## Language-Specific Considerations

### Python Considerations:
- Use `int(input().strip())` to read n
- Use `list(map(int, input().strip().split()))` to read array
- Handle empty array case by checking n == 0 before reading second line
- Use `print(' '.join(map(str, result)))` for output
- Python's list operations are memory-efficient for in-place modifications

### Go Considerations:
- Use `bufio.Scanner` for efficient input reading
- Use `strconv.Atoi()` for string to integer conversion
- Use `strings.Fields()` to split input line
- Handle empty array case by checking n == 0
- Use `strings.Join()` with `strconv.Itoa()` for output formatting
- Go's slice operations support efficient in-place modifications

### JavaScript Considerations:
- Use `require('fs').readFileSync(0, 'utf8').trim().split('\n')` for input
- Use `parseInt()` for string to number conversion
- Use `split(' ').map(Number)` to parse integer array
- Handle empty array case appropriately
- Use `console.log(result.join(' '))` for output

## Validation Checklist
- [ ] Input has 1 line (if n=0) or 2 lines (if n>0)
- [ ] First line contains valid integer n within bounds
- [ ] Second line (if present) contains exactly n integers
- [ ] All integers are within specified range
- [ ] Output maintains original order of first occurrences
- [ ] Output format matches specification exactly
- [ ] Algorithm demonstrates memory optimization principles
- [ ] Performance test cases complete within time limits
- [ ] Edge cases (empty, single element, all duplicates) handled correctly

## Memory Optimization Focus

### Space Complexity Analysis:
- **Naive Approach**: O(n) extra space using hash set or dictionary
- **Optimized Approach**: O(1) extra space using in-place modification
- **Justification**: The optimized approach demonstrates key memory optimization principles

### Performance Trade-offs:
- **Time**: O(n²) vs O(n) - acceptable trade-off for memory optimization
- **Space**: O(1) vs O(n) - significant memory savings for large datasets
- **Cache Efficiency**: In-place operations are more cache-friendly

### Educational Value:
- Students learn to analyze space-time trade-offs
- Understanding of when memory optimization is crucial
- Practical experience with in-place algorithm techniques
- Appreciation for memory constraints in real-world systems

## Automated Test Case Generation
```python
def generate_test_case(case_type="basic", size_range=(5, 20), duplicate_factor=0.3):
    """
    Generate test case based on specified parameters
    
    Args:
        case_type: "basic", "edge", "performance", "complex", "corner"
        size_range: tuple of (min_size, max_size)
        duplicate_factor: probability of introducing duplicates (0.0 to 1.0)
    
    Returns:
        tuple: (input_content, expected_content)
    """
    import random
    
    if case_type == "edge" and random.random() < 0.1:
        # 10% chance of empty array for edge cases
        return "0\n", "\n"
    
    size = random.randint(*size_range)
    
    if case_type == "performance":
        size = random.randint(500, 2000)
        unique_count = max(1, int(size * (1 - duplicate_factor)))
    elif case_type == "corner":
        size = random.randint(700, 1000)
        unique_count = random.randint(50, 200)
    else:
        unique_count = max(1, int(size * (1 - duplicate_factor)))
    
    # Generate array with controlled duplicates
    arr = []
    for _ in range(size):
        arr.append(random.randint(1, unique_count))
    
    # Generate expected output
    seen = set()
    result = []
    for num in arr:
        if num not in seen:
            seen.add(num)
            result.append(num)
    
    input_content = f"{size}\n{' '.join(map(str, arr))}\n"
    expected_content = ' '.join(map(str, result)) + '\n' if result else '\n'
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """
    Validate test case format and correctness
    
    Args:
        input_content: string content of input file
        expected_content: string content of expected output file
    
    Returns:
        bool: True if test case is valid
    """
    lines = input_content.strip().split('\n')
    
    # Validate input format
    if len(lines) < 1:
        return False
    
    try:
        n = int(lines[0])
        if n < 0 or n > 100000:
            return False
        
        if n == 0:
            if len(lines) != 1:
                return False
            return expected_content == '\n'
        
        if len(lines) != 2:
            return False
        
        arr = list(map(int, lines[1].split()))
        if len(arr) != n:
            return False
        
        # Validate integer ranges
        for num in arr:
            if num < -1000000 or num > 1000000:
                return False
        
        # Validate expected output
        if expected_content.strip():
            expected_nums = list(map(int, expected_content.strip().split()))
            
            # Check that expected output is correct deduplication
            seen = set()
            correct_result = []
            for num in arr:
                if num not in seen:
                    seen.add(num)
                    correct_result.append(num)
            
            return expected_nums == correct_result
        else:
            # Empty expected output only valid for empty input
            return n == 0
        
    except (ValueError, IndexError):
        return False
    
    return True

# Example usage for batch generation
def generate_batch_test_cases(count=100):
    """Generate a batch of test cases for comprehensive testing"""
    cases = []
    
    # Basic cases (20%)
    for i in range(int(count * 0.2)):
        cases.append(generate_test_case("basic", (3, 15), 0.3))
    
    # Edge cases (20%)
    for i in range(int(count * 0.2)):
        cases.append(generate_test_case("edge", (0, 20), 0.5))
    
    # Performance cases (30%)
    for i in range(int(count * 0.3)):
        cases.append(generate_test_case("performance", (500, 2000), 0.7))
    
    # Complex cases (20%)
    for i in range(int(count * 0.2)):
        cases.append(generate_test_case("complex", (100, 500), 0.4))
    
    # Corner cases (10%)
    remaining = count - len(cases)
    for i in range(remaining):
        cases.append(generate_test_case("corner", (700, 1000), 0.6))
    
    return cases
```
