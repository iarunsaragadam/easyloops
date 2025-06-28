# Array traversal and modification

## Problem Statement

Write a program that doubles every element in an array of integers. This problem demonstrates fundamental array traversal techniques and how to modify array elements during iteration.

Given an array of n integers, your program should create a new array where each element is twice the value of the corresponding element in the original array.

For example:
- If the input array is [1, 2, 3], the output should be [2, 4, 6]
- If the input array is [-2, 0, 5], the output should be [-4, 0, 10]
- If the input array is empty (n=0), the output should be empty

This problem helps you practice:
- Reading arrays from input
- Iterating through array elements
- Applying transformations to each element
- Outputting modified arrays

## Input Format

The input consists of 2 lines:
```
Line 1: Integer n (0 ≤ n ≤ 100,000) - the number of elements
Line 2: n space-separated integers (if n > 0) - the array elements
```

Note: If n = 0, there will be no second line.

## Test Cases
**Input (`input.txt`):**
```
3
1 2 3
```

**Expected Output (`expected.txt`):**
```
2 4 6
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master basic array traversal patterns
- Practice reading and writing arrays from/to standard input/output
- Understand how to modify array elements systematically
- Learn to handle edge cases like empty arrays
- Develop efficient iteration techniques
- Apply mathematical transformations to array elements

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input())
    if n == 0:
        print()  # Empty output for empty array
        return
    
    arr = list(map(int, input().split()))
    
    # Method 1: Using list comprehension (Pythonic)
    doubled = [x * 2 for x in arr]
    
    # Method 2: Using traditional loop
    # doubled = []
    # for element in arr:
    #     doubled.append(element * 2)
    
    print(' '.join(map(str, doubled)))
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    if n == 0 {
        fmt.Println()
        return
    }
    
    arr := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Scanf("%d", &arr[i])
    }
    
    // Double each element
    for i := 0; i < n; i++ {
        arr[i] *= 2
    }
    
    // Output the result
    for i, val := range arr {
        if i > 0 {
            fmt.Print(" ")
        }
        fmt.Print(val)
    }
    fmt.Println()
}
```

## Constraints
- 0 ≤ n ≤ 100,000
- -1,000,000 ≤ array elements ≤ 1,000,000
- Time complexity: O(n)
- Space complexity: O(n) for storing the result
- Output elements will fit in 32-bit signed integers

## Hints
- Handle the edge case where n = 0 (empty array) first
- Read the number of elements before reading the array
- Remember that multiplying by 2 is the same as adding the number to itself
- Use appropriate data structures for your chosen language (list in Python, slice in Go)
- When outputting, separate elements with single spaces and end with a newline
