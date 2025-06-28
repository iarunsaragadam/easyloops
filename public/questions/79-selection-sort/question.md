# Selection Sort

## Problem Statement

Implement the selection sort algorithm to sort an array of integers in ascending order.

Selection sort is a simple comparison-based sorting algorithm that works by dividing the input list into two parts: a sorted subarray (initially empty) and an unsorted subarray (initially the entire list). The algorithm repeatedly finds the minimum element from the unsorted subarray and moves it to the end of the sorted subarray.

This problem teaches you fundamental sorting concepts and helps you understand how basic sorting algorithms work. Although selection sort is not the most efficient sorting algorithm (O(n²) time complexity), it's educational and demonstrates important algorithmic concepts like invariants and in-place sorting.

The algorithm works as follows:
1. Find the minimum element in the unsorted array
2. Swap it with the first element of the unsorted array
3. Move the boundary between sorted and unsorted subarrays one position to the right
4. Repeat until the entire array is sorted

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers representing the array to be sorted
```

## Output Format

Print a single line containing the sorted array with elements separated by spaces.

## Test Cases

**Basic Test Case (`input.txt`):**
```
5 2 8 1 9
```

**Expected Output (`expected.txt`):**
```
1 2 5 8 9
```

**Edge Case (`input2.txt`):**
```
1
```

**Expected Output (`expected2.txt`):**
```
1
```

**Performance Test Case (`input3.txt`):**
```
10 9 8 7 6 5 4 3 2 1
```

**Expected Output (`expected3.txt`):**
```
1 2 3 4 5 6 7 8 9 10
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the selection sort algorithm and its implementation
- Learn about comparison-based sorting techniques
- Practice implementing algorithms with O(n²) time complexity
- Understand the concept of in-place sorting
- Master the technique of finding minimum elements in arrays
- Learn about algorithm invariants and loop structure design

## Implementation Guidelines

### Algorithm Steps:
1. Read the input array from a single line
2. Implement the selection sort algorithm:
   - For each position i from 0 to n-1:
     - Find the minimum element in positions i to n-1
     - Swap the minimum element with element at position i
3. Output the sorted array

### Python Example Structure:
```python
def solve():
    # Read input
    line = input().strip()
    numbers = list(map(int, line.split()))
    
    # Implement selection sort
    n = len(numbers)
    for i in range(n):
        # Find minimum element in remaining array
        min_idx = i
        for j in range(i + 1, n):
            if numbers[j] < numbers[min_idx]:
                min_idx = j
        
        # Swap minimum element with first element
        numbers[i], numbers[min_idx] = numbers[min_idx], numbers[i]
    
    # Output sorted array
    print(" ".join(map(str, numbers)))
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
    line := scanner.Text()
    
    // Parse input
    parts := strings.Fields(line)
    numbers := make([]int, len(parts))
    for i, part := range parts {
        numbers[i], _ = strconv.Atoi(part)
    }
    
    // Implement selection sort
    n := len(numbers)
    for i := 0; i < n; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if numbers[j] < numbers[minIdx] {
                minIdx = j
            }
        }
        numbers[i], numbers[minIdx] = numbers[minIdx], numbers[i]
    }
    
    // Output sorted array
    for i, num := range numbers {
        if i > 0 {
            fmt.Print(" ")
        }
        fmt.Print(num)
    }
    fmt.Println()
}
```

## Constraints
- 1 ≤ array length ≤ 1000
- -10⁹ ≤ array elements ≤ 10⁹
- Input contains only valid integers
- Array elements are separated by single spaces

## Hints
- Start by understanding the basic idea: repeatedly find the minimum and move it to the correct position
- The key insight is maintaining a sorted portion at the beginning and an unsorted portion at the end
- Use nested loops: outer loop for position, inner loop to find minimum
- Remember to swap elements, not just compare them
- Test with edge cases like arrays with one element or already sorted arrays
- For debugging, try printing the array after each swap to see the algorithm in action
