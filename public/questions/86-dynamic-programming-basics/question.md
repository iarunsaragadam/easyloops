# Maximum Subarray Sum - Dynamic Programming

## Problem Statement

You are given an array of integers (which may include negative numbers). Your task is to find the maximum sum of any contiguous subarray within this array.

This is a classic dynamic programming problem that demonstrates the fundamental concepts of optimal substructure and efficient state transitions. In real-world applications, this problem appears in financial analysis (finding the best time period for maximum profit), signal processing, and data analysis.

For example:
- Given array `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`, the maximum subarray is `[4, -1, 2, 1]` with sum `6`
- Given array `[-1, -2, -3, -4]`, the maximum subarray is `[-1]` with sum `-1` (single element)
- Given array `[1, 2, 3, 4, 5]`, the maximum subarray is the entire array with sum `15`

## Input Format

The input consists of 2 lines:
```
Line 1: An integer N (1 ≤ N ≤ 100,000) - the size of the array
Line 2: N space-separated integers (-1,000 ≤ each integer ≤ 1,000) - the array elements
```

## Output Format

Print a single integer: the maximum sum of any contiguous subarray.

## Test Cases

**Basic Test Case (`input.txt`):**
```
9
-2 1 -3 4 -1 2 1 -5 4
```

**Expected Output (`expected.txt`):**
```
6
```

**Edge Case (`input2.txt`):**
```
4
-2 -3 -1 -5
```

**Expected Output (`expected2.txt`):**
```
-1
```

**Performance Test Case (`input3.txt`):**
```
5
1 2 3 4 5
```

**Expected Output (`expected3.txt`):**
```
15
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the fundamental concepts of dynamic programming
- Learn to identify optimal substructure in problems
- Practice the technique of maintaining optimal solutions at each step
- Develop intuition for when to extend existing solutions vs. starting fresh
- Master the difference between O(n) and O(n³) approaches to the same problem

## Implementation Guidelines

This problem can be solved using **Kadane's Algorithm**, a classic dynamic programming approach:

1. **Key Insight**: At each position, decide whether to extend the existing subarray or start a new one
2. **State Definition**: `max_ending_here` = maximum sum ending at current position
3. **Transition**: `max_ending_here = max(current_element, max_ending_here + current_element)`
4. **Result**: Keep track of the maximum value seen so far

### Python Example Structure:
```python
def solve():
    n = int(input())
    arr = list(map(int, input().split()))
    
    # Initialize DP variables
    max_ending_here = max_so_far = arr[0]
    
    # Process each element
    for i in range(1, n):
        # Key DP decision: extend or start new
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    print(max_so_far)
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
    
    maxEndingHere := arr[0]
    maxSoFar := arr[0]
    
    for i := 1; i < n; i++ {
        maxEndingHere = max(arr[i], maxEndingHere + arr[i])
        maxSoFar = max(maxSoFar, maxEndingHere)
    }
    
    fmt.Println(maxSoFar)
}
```

## Constraints
- 1 ≤ N ≤ 100,000 (array size)
- -1,000 ≤ array elements ≤ 1,000
- Time limit: 1 second
- Memory limit: 256 MB

## Hints
1. **Start Simple**: What if the array had only positive numbers? What if it had only one element?
2. **Think Recursively**: At each position, you have two choices - include the current element in the existing subarray or start a new subarray from here
3. **Avoid Brute Force**: A naive O(n³) solution checking all possible subarrays will timeout on large inputs
4. **Dynamic Programming Pattern**: This problem exhibits optimal substructure - the optimal solution to the whole problem depends on optimal solutions to subproblems
5. **Edge Case**: When all numbers are negative, the answer is the largest (least negative) single element
