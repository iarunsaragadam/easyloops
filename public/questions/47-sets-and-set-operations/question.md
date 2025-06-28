# Sets and Set Operations

## Problem Statement

Write a program that performs basic set operations on two sets of integers. Given two sets A and B, your program should compute and output the union, intersection, and differences between the sets.

This problem simulates a common real-world scenario where you need to analyze relationships between different collections of data, such as finding common elements between two datasets, combining datasets, or identifying unique elements.

## Input Format

The input consists of 2 lines:
```
Line 1: Space-separated integers representing set A (may be empty)
Line 2: Space-separated integers representing set B (may be empty)
```

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand fundamental set operations (union, intersection, difference)
- Practice working with Python sets or similar data structures
- Learn to handle edge cases with empty sets
- Understand set theory concepts in programming context
- Practice parsing and formatting output consistently

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    # Read input
    line1 = input().strip()
    line2 = input().strip()
    
    # Parse sets (handle empty sets)
    set_a = set(map(int, line1.split())) if line1 else set()
    set_b = set(map(int, line2.split())) if line2 else set()
    
    # Perform operations
    union = set_a | set_b
    intersection = set_a & set_b
    diff_a_b = set_a - set_b
    diff_b_a = set_b - set_a
    
    # Output results (sorted)
    print(' '.join(map(str, sorted(union))) if union else '')
    print(' '.join(map(str, sorted(intersection))) if intersection else '')
    print(' '.join(map(str, sorted(diff_a_b))) if diff_a_b else '')
    print(' '.join(map(str, sorted(diff_b_a))) if diff_b_a else '')
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    
    // Read first line
    var setA, setB map[int]bool
    setA = make(map[int]bool)
    setB = make(map[int]bool)
    
    if scanner.Scan() {
        line := scanner.Text()
        if line != "" {
            for _, numStr := range strings.Fields(line) {
                num, _ := strconv.Atoi(numStr)
                setA[num] = true
            }
        }
    }
    
    // Read second line
    if scanner.Scan() {
        line := scanner.Text()
        if line != "" {
            for _, numStr := range strings.Fields(line) {
                num, _ := strconv.Atoi(numStr)
                setB[num] = true
            }
        }
    }
    
    // Perform operations and output
    // Implementation details for union, intersection, differences
}
```

## Constraints
- Each set can contain 0 to 1000 integers
- Integer values are in range -1000 to 1000
- Output should be sorted in ascending order
- Empty sets should produce empty lines in output
- Duplicate integers in input should be treated as single elements (set property)

## Hints
- Use set data structures for efficient operations
- Handle empty input lines carefully
- Remember that sets automatically handle duplicates
- Sort output for consistent results
- Consider edge cases: empty sets, identical sets, disjoint sets
