# Binary Search

## Problem Statement

Implement the binary search algorithm to find a target value in a sorted array. Binary search is an efficient algorithm that works by repeatedly dividing the search space in half, comparing the target with the middle element, and eliminating half of the remaining elements.

Given a sorted array of integers and a target value, return the index of the target value if found. If the target is not found, return -1.

**Real-world context**: Binary search is fundamental in computer science and is used in many applications including database indexing, finding elements in sorted data structures, and implementing efficient search operations in libraries and frameworks.

## Input Format

The input consists of 3 lines:
```
Line 1: n (size of the array, 0 ≤ n ≤ 100,000)
Line 2: n space-separated integers in sorted order (only present if n > 0)
Line 3: target (the integer value to search for)
```

## Test Cases
**Input (`input.txt`):**
```
7
1 3 5 7 9 11 13
7
```

**Expected Output (`expected.txt`):**
```
3
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the binary search algorithm and its O(log n) time complexity
- Learn when binary search can be applied (sorted data requirement)
- Practice implementing divide-and-conquer algorithms
- Understand the difference between binary search and linear search performance
- Learn to handle edge cases like empty arrays and single elements
- Practice working with array indices and bounds checking

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input())
    if n == 0:
        arr = []
    else:
        arr = list(map(int, input().split()))
    target = int(input())
    
    # Implement binary search here
    # Return index if found, -1 if not found
    left, right = 0, n - 1
    
    while left <= right:
        mid = (left + right) // 2
        # Your logic here
        pass
    
    print(result)
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scan(&n)
    
    arr := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Scan(&arr[i])
    }
    
    var target int
    fmt.Scan(&target)
    
    // Implement binary search here
    left, right := 0, n-1
    result := -1
    
    for left <= right {
        mid := (left + right) / 2
        // Your logic here
    }
    
    fmt.Println(result)
}
```

## Constraints
- 0 ≤ n ≤ 100,000 (array size)
- Array elements are sorted in ascending order
- Array elements and target are in the range [-10^9, 10^9]
- Time complexity should be O(log n)
- Space complexity should be O(1)

## Hints
- Start by understanding the basic idea: compare target with middle element
- If target equals middle element, you found it!
- If target is less than middle element, search the left half
- If target is greater than middle element, search the right half
- Be careful with the loop condition: `left <= right`
- Use `mid = (left + right) // 2` to avoid integer overflow
- Handle edge cases: empty array (n=0), single element array
- Test your solution with targets that are found, not found, at boundaries
