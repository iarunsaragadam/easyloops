# Counting Sort Algorithm

## Problem Statement

Implement the counting sort algorithm to sort an array of non-negative integers. Counting sort is a non-comparison based sorting algorithm that works by counting occurrences of each distinct element, then using this information to place elements in their correct sorted positions.

Given an array of `n` integers where each integer is in the range `[0, k]`, sort the array using counting sort and return the sorted result.

**Example:**
- Input array: `[4, 2, 2, 8, 3]` with `k = 9`
- Output: `[2, 2, 3, 4, 8]`

The algorithm should run in `O(n + k)` time complexity, making it very efficient when `k` is not significantly larger than `n`.

## Input Format

The input consists of 2 lines:
```
Line 1: n k (array size and maximum value)
Line 2: n space-separated integers (array elements, each in range [0, k])
```

## Test Cases
**Input (`input.txt`):**
```
5 9
4 2 2 8 3
```

**Expected Output (`expected.txt`):**
```
2 2 3 4 8
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand counting sort algorithm and its applications
- Learn non-comparison based sorting techniques
- Practice array manipulation and counting techniques
- Understand time and space complexity trade-offs
- Master stable sorting algorithm implementation

## Implementation Guidelines

### Algorithm Steps:
1. **Count Phase**: Create a counting array to store frequency of each element
2. **Accumulate Phase**: Modify counting array to store actual positions
3. **Place Phase**: Build result array by placing elements at correct positions
4. **Maintain Stability**: Process input array from right to left for stable sorting

### Python Example Structure:
```python
def solve():
    n, k = map(int, input().split())
    arr = list(map(int, input().split()))
    
    # Create counting array of size k+1
    count = [0] * (k + 1)
    
    # Count occurrences of each element
    for num in arr:
        count[num] += 1
    
    # Convert counts to positions
    for i in range(1, k + 1):
        count[i] += count[i - 1]
    
    # Build result array (process backwards for stability)
    result = [0] * n
    for i in range(n - 1, -1, -1):
        result[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    
    print(' '.join(map(str, result)))
```

### Go Example Structure:
```go
func solve() {
    var n, k int
    fmt.Scan(&n, &k)
    
    arr := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Scan(&arr[i])
    }
    
    // Implement counting sort logic here
    count := make([]int, k+1)
    
    // Count occurrences
    for _, num := range arr {
        count[num]++
    }
    
    // Convert to positions
    for i := 1; i <= k; i++ {
        count[i] += count[i-1]
    }
    
    // Build result
    result := make([]int, n)
    for i := n - 1; i >= 0; i-- {
        result[count[arr[i]]-1] = arr[i]
        count[arr[i]]--
    }
    
    // Print result
    for i, num := range result {
        if i > 0 {
            fmt.Print(" ")
        }
        fmt.Print(num)
    }
    fmt.Println()
}
```

## Constraints
- `1 ≤ n ≤ 100,000` (array size)
- `0 ≤ k ≤ 1,000` (maximum element value)
- `0 ≤ arr[i] ≤ k` for all elements in the array
- Time Limit: 2 seconds
- Memory Limit: 256 MB

## Hints
- **Hint 1**: Think about how you can count occurrences of each number without comparing elements
- **Hint 2**: Use an auxiliary array of size `k+1` to store counts for each possible value
- **Hint 3**: Transform the count array to store cumulative positions rather than just frequencies
- **Hint 4**: Process the original array backwards when building the result to maintain stability
- **Hint 5**: Remember that counting sort works best when `k` is not much larger than `n`
- **Hint 6**: The algorithm should run in `O(n + k)` time - avoid nested loops over the input array
