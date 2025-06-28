# Test Cases for Sets and Set Operations

## Test Case Structure
This question uses a **2-line input format** representing two sets of integers.

### Input Format Pattern:
```
Line 1: Space-separated integers for set A (may be empty)
Line 2: Space-separated integers for set B (may be empty)
```

### Output Format Pattern:
```
Line 1: Union A ∪ B (sorted, space-separated)
Line 2: Intersection A ∩ B (sorted, space-separated)
Line 3: Difference A - B (sorted, space-separated)
Line 4: Difference B - A (sorted, space-separated)
```

## Test Case 1: Basic Overlapping Sets
**Input (`input.txt`):**
```
1 2 3 4
3 4 5 6
```
**Expected Output (`expected.txt`):**
```
1 2 3 4 5 6
3 4
1 2
5 6
```
**Explanation:**
- Union: {1, 2, 3, 4, 5, 6}
- Intersection: {3, 4} (common elements)  
- A - B: {1, 2} (elements only in A)
- B - A: {5, 6} (elements only in B)

## Test Case 2: Edge Case - One Empty Set
**Input (`input2.txt`):**
```
1 2 3

```
**Expected Output (`expected2.txt`):**
```
1 2 3


1 2 3
```
**Explanation:**
- Union: {1, 2, 3} (all elements from non-empty set)
- Intersection: {} (empty, no common elements)
- A - B: {1, 2, 3} (all elements from A)
- B - A: {} (empty, B has no elements)

## Test Case 3: Performance Case - Large Sets with Duplicates
**Input (`input3.txt`):**
```
1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12 12 13 13 14 14 15 15
10 10 11 11 12 12 13 13 14 14 15 15 16 16 17 17 18 18 19 19 20 20 21 21 22 22 23 23 24 24 25 25
```
**Expected Output (`expected3.txt`):**
```
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
10 11 12 13 14 15
1 2 3 4 5 6 7 8 9
16 17 18 19 20 21 22 23 24 25
```
**Explanation:**
- Tests duplicate handling (sets automatically remove duplicates)
- Tests performance with larger input sizes
- Tests overlapping ranges

## Test Case Creation Rules
### Input Validation Rules:
1. Each line may be empty or contain space-separated integers
2. Integers should be in range -1000 to 1000
3. Duplicates in input are allowed (sets handle deduplication)
4. Both lines must be present (may be empty)

### Output Format Rules:
1. Exactly four lines of output
2. Each line contains space-separated integers in ascending order
3. Empty sets produce empty lines (no spaces)
4. No trailing spaces on any line

## Language-Specific Considerations
### Python Considerations:
- Use `set()` data structure for efficient operations
- Use `|` for union, `&` for intersection, `-` for difference
- Handle empty input lines with `if line.strip()` checks
- Use `sorted()` for consistent output ordering

### Go Considerations:
- Use `map[int]bool` to simulate sets
- Manually implement set operations using loops
- Handle empty lines carefully when parsing
- Sort results using `sort.Ints()` before output

## Validation Checklist
- [ ] Input has exactly 2 lines (may be empty)
- [ ] Output has exactly 4 lines
- [ ] All output integers are sorted in ascending order
- [ ] Empty sets produce empty output lines
- [ ] Duplicates in input are properly handled (deduplicated)
- [ ] Set operations are mathematically correct
- [ ] Edge cases (empty sets, identical sets, disjoint sets) work correctly

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random test case for sets operations"""
    # Generate random sets
    set_a_size = random.randint(0, 20)
    set_b_size = random.randint(0, 20)
    
    # Create sets with some overlap potential
    range_start = random.randint(-50, 0)
    range_end = random.randint(range_start + 10, range_start + 100)
    
    set_a = set(random.randint(range_start, range_end) for _ in range(set_a_size))
    set_b = set(random.randint(range_start, range_end) for _ in range(set_b_size))
    
    # Format input
    input_line1 = ' '.join(map(str, sorted(set_a))) if set_a else ''
    input_line2 = ' '.join(map(str, sorted(set_b))) if set_b else ''
    
    # Compute expected output
    union = set_a | set_b
    intersection = set_a & set_b
    diff_a_b = set_a - set_b
    diff_b_a = set_b - set_a
    
    # Format output
    output_lines = [
        ' '.join(map(str, sorted(union))) if union else '',
        ' '.join(map(str, sorted(intersection))) if intersection else '',
        ' '.join(map(str, sorted(diff_a_b))) if diff_a_b else '',
        ' '.join(map(str, sorted(diff_b_a))) if diff_b_a else ''
    ]
    
    return f"{input_line1}\n{input_line2}", '\n'.join(output_lines)

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted"""
    input_lines = input_content.strip().split('\n')
    output_lines = expected_content.strip().split('\n')
    
    # Check input format
    if len(input_lines) != 2:
        return False, "Input must have exactly 2 lines"
    
    # Check output format  
    if len(output_lines) != 4:
        return False, "Output must have exactly 4 lines"
    
    # Validate input parsing
    for i, line in enumerate(input_lines):
        if line.strip():  # Non-empty line
            try:
                numbers = list(map(int, line.split()))
                if not all(-1000 <= n <= 1000 for n in numbers):
                    return False, f"Line {i+1} contains numbers outside range [-1000, 1000]"
            except ValueError:
                return False, f"Line {i+1} contains invalid integers"
    
    # Validate output sorting
    for i, line in enumerate(output_lines):
        if line.strip():  # Non-empty line
            try:
                numbers = list(map(int, line.split()))
                if numbers != sorted(numbers):
                    return False, f"Output line {i+1} is not sorted"
            except ValueError:
                return False, f"Output line {i+1} contains invalid integers"
    
    return True, "Test case is valid"
```
