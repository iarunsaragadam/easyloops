# Insertion Sort

## Problem Statement

Implement the insertion sort algorithm to sort a list of integers in ascending order.

Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It works by taking elements from the unsorted portion and inserting them into their correct position in the sorted portion of the array.

The algorithm is particularly efficient for small datasets and has the advantage of being stable (maintaining the relative order of equal elements) and sorting in-place (requiring only O(1) additional memory).

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers to be sorted
```

## Test Cases
**Input (`input.txt`):**
```
5 2 8 1 9
```

**Expected Output (`expected.txt`):**
```
1 2 5 8 9
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the insertion sort algorithm and its mechanics
- Learn about stable sorting algorithms
- Practice in-place sorting techniques
- Analyze time and space complexity (O(n²) worst case, O(n) best case, O(1) space)
- Understand when insertion sort is most effective (small datasets, nearly sorted data)

## Implementation Guidelines

### Algorithm Steps:
1. Start with the second element (index 1) as the first element is already "sorted"
2. Compare the current element with the previous elements
3. Shift all larger elements one position to the right
4. Insert the current element in its correct position
5. Repeat for all remaining elements

### Python Example Structure:
```python
def solve():
    line = input().strip()
    if not line:
        print()
        return
    
    numbers = list(map(int, line.split()))
    
    # Implement insertion sort here
    for i in range(1, len(numbers)):
        key = numbers[i]
        j = i - 1
        while j >= 0 and numbers[j] > key:
            numbers[j + 1] = numbers[j]
            j -= 1
        numbers[j + 1] = key
    
    print(' '.join(map(str, numbers)))
```

### Go Example Structure:
```go
package main

import (
    "fmt"
    "strconv"
    "strings"
)

func solve() {
    var line string
    fmt.Scanln(&line)
    
    if line == "" {
        fmt.Println()
        return
    }
    
    parts := strings.Fields(line)
    numbers := make([]int, len(parts))
    
    for i, part := range parts {
        numbers[i], _ = strconv.Atoi(part)
    }
    
    // Implement insertion sort here
    for i := 1; i < len(numbers); i++ {
        key := numbers[i]
        j := i - 1
        for j >= 0 && numbers[j] > key {
            numbers[j+1] = numbers[j]
            j--
        }
        numbers[j+1] = key
    }
    
    // Print result
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
- Input contains between 0 and 1000 integers
- Each integer is between -1000 and 1000
- Numbers are separated by single spaces
- Empty input should produce empty output
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Hint 1**: Think of how you would sort a hand of playing cards - you pick up cards one by one and insert each into its correct position among the cards you've already sorted
- **Hint 2**: The algorithm works by maintaining a sorted portion at the beginning of the array and an unsorted portion at the end
- **Hint 3**: For each element in the unsorted portion, find its correct position in the sorted portion by comparing with elements from right to left
- **Hint 4**: Don't forget to handle edge cases like empty input, single element, already sorted arrays, and reverse sorted arrays
- **Hint 5**: Insertion sort performs best on nearly sorted data - it can run in O(n) time in the best case
