# Memory optimization

## Problem Statement

You are given an array of integers. Your task is to remove all duplicate elements while preserving the original order of first occurrences. The challenge is to implement this efficiently with optimal space complexity.

**The Problem**: Given an array, remove duplicates and return the modified array with only the first occurrence of each element, maintaining the original order.

**Memory Optimization Challenge**: While a naive approach might use additional data structures like hash sets (requiring O(n) extra space), you should strive for a memory-optimized solution that minimizes space usage.

**Real-world Context**: This problem simulates scenarios in data processing where memory is limited, such as:
- Processing large datasets on memory-constrained devices
- Streaming data deduplication
- Embedded systems programming
- Cache-friendly algorithm design

## Input Format

The input consists of 2 lines:
```
Line 1: n (number of elements, 0 ≤ n ≤ 100,000)
Line 2: n space-separated integers (-1,000,000 ≤ each integer ≤ 1,000,000)
```

Note: If n = 0, there is no second line and output should be empty.

## Test Cases
**Input (`input1.txt`):**
```
5
1 2 2 3 1
```

**Expected Output (`expected1.txt`):**
```
1 2 3
```

**Input (`input2.txt`):**
```
4
5 5 5 5
```

**Expected Output (`expected2.txt`):**
```
5
```

**Input (`input21.txt`):**
```
0
```

**Expected Output (`expected21.txt`):**
```

```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅
6. Test with multiple cases: `for i in {1..100}; do cat input$i.txt | python solution.py > output$i.txt && diff output$i.txt expected$i.txt; done`

## Learning Objectives
- Understand space-time complexity tradeoffs in algorithm design
- Master in-place array manipulation techniques
- Learn two-pointer algorithms for memory optimization
- Develop awareness of cache-friendly programming patterns
- Practice optimizing algorithms for constrained memory environments

## Implementation Guidelines

### Approach 1: Naive Solution (Not Memory Optimized)
```python
def solve():
    n = int(input().strip())
    if n == 0:
        return
    arr = list(map(int, input().strip().split()))
    
    seen = set()  # O(n) extra space
    result = []
    for num in arr:
        if num not in seen:
            seen.add(num)
            result.append(num)
    
    print(' '.join(map(str, result)))
```

### Approach 2: Memory Optimized Solution
```python
def solve():
    n = int(input().strip())
    if n == 0:
        return
    arr = list(map(int, input().strip().split()))
    
    # Two-pointer in-place modification - O(1) extra space
    write_idx = 1
    for read_idx in range(1, len(arr)):
        # Check if current element is duplicate
        is_duplicate = False
        for check_idx in range(write_idx):
            if arr[read_idx] == arr[check_idx]:
                is_duplicate = True
                break
        
        if not is_duplicate:
            arr[write_idx] = arr[read_idx]
            write_idx += 1
    
    print(' '.join(map(str, arr[:write_idx])))
```

### Go Example Structure:
```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    if n == 0 {
        return
    }
    
    scanner.Scan()
    parts := strings.Fields(scanner.Text())
    arr := make([]int, n)
    
    for i, part := range parts {
        arr[i], _ = strconv.Atoi(part)
    }
    
    // Memory optimized approach
    writeIdx := 1
    for readIdx := 1; readIdx < len(arr); readIdx++ {
        isDuplicate := false
        for checkIdx := 0; checkIdx < writeIdx; checkIdx++ {
            if arr[readIdx] == arr[checkIdx] {
                isDuplicate = true
                break
            }
        }
        
        if !isDuplicate {
            arr[writeIdx] = arr[readIdx]
            writeIdx++
        }
    }
    
    result := make([]string, writeIdx)
    for i := 0; i < writeIdx; i++ {
        result[i] = strconv.Itoa(arr[i])
    }
    fmt.Println(strings.Join(result, " "))
}

func main() {
    solve()
}
```

## Constraints
- 0 ≤ n ≤ 100,000 (array size)
- -1,000,000 ≤ each integer ≤ 1,000,000
- Time limit: 2 seconds
- Memory limit: 256 MB
- Output format must match exactly (space-separated integers, single newline at end)
- For n = 0, output should be empty (just a newline)

## Hints
- **Hint 1**: Consider the space-time complexity tradeoff. A hash set gives O(n) time but uses O(n) space. Can you achieve better space complexity?
- **Hint 2**: Think about in-place modification. You can use two pointers: one for reading, one for writing unique elements.
- **Hint 3**: For each element, check if it already exists in the portion of the array you've already processed.
- **Hint 4**: The performance test cases include large arrays with many duplicates. An O(n²) time solution is acceptable for the memory optimization focus, but be mindful of the time constraints.
- **Hint 5**: Edge cases to consider: empty array, all elements the same, no duplicates, single element.
