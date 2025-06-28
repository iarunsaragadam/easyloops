# Quick Sort Implementation

## Problem Statement

Implement the Quick Sort algorithm to sort an array of integers in ascending order.

Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted.

This problem challenges you to implement one of the most important sorting algorithms in computer science, widely used in practice due to its average-case O(n log n) performance and in-place sorting capability.

**Example:**
- Input: `[5, 2, 8, 1, 9]`
- Output: `[1, 2, 5, 8, 9]`

**Real-world applications:**
- Database query optimization
- Operating system task scheduling
- Large-scale data processing systems
- Programming language standard libraries

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers representing the array to sort
```

**Note:** Empty input represents an empty array.

## Output Format

Print the sorted array as space-separated integers on a single line.
For empty input, print an empty line.

## Test Cases

**Basic Test Case (`input1.txt`):**
```
5 2 8 1 9
```

**Expected Output (`expected1.txt`):**
```
1 2 5 8 9
```

**Edge Case - Empty Array (`input26.txt`):**
```

```

**Expected Output (`expected26.txt`):**
```

```

**Edge Case - Single Element (`input5.txt`):**
```
42
```

**Expected Output (`expected5.txt`):**
```
42
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the Quick Sort divide-and-conquer algorithm
- Understand partitioning techniques and pivot selection strategies
- Learn to implement recursive sorting algorithms efficiently
- Practice handling edge cases (empty arrays, single elements, duplicates)
- Understand time complexity analysis: O(n log n) average, O(n²) worst case
- Explore optimization techniques to avoid worst-case scenarios
- Develop skills in array manipulation and index management

## Implementation Guidelines

### Core Algorithm Steps:
1. **Base Case**: Arrays with 0 or 1 elements are already sorted
2. **Choose Pivot**: Select an element as the pivot (last element is common)
3. **Partition**: Rearrange array so elements ≤ pivot come before elements > pivot
4. **Recursively Sort**: Apply Quick Sort to sub-arrays on both sides of pivot
5. **Combine**: No explicit combine step needed (sorting happens in-place)

### Python Example Structure:
```python
def solve():
    line = input().strip()
    if not line:
        print()  # Handle empty array
        return
    
    numbers = list(map(int, line.split()))
    
    def quicksort(arr, low, high):
        if low < high:
            # Partition and get pivot index
            pi = partition(arr, low, high)
            
            # Recursively sort elements before and after partition
            quicksort(arr, low, pi - 1)
            quicksort(arr, pi + 1, high)
    
    def partition(arr, low, high):
        # Implementation details here
        pass
    
    quicksort(numbers, 0, len(numbers) - 1)
    print(' '.join(map(str, numbers)))
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := strings.TrimSpace(scanner.Text())
    
    if line == "" {
        fmt.Println()  // Handle empty array
        return
    }
    
    strNums := strings.Fields(line)
    numbers := make([]int, len(strNums))
    for i, s := range strNums {
        numbers[i], _ = strconv.Atoi(s)
    }
    
    quickSort(numbers, 0, len(numbers)-1)
    
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
- **Array size**: 0 ≤ n ≤ 100,000 elements
- **Element range**: -1,000,000 ≤ elements ≤ 1,000,000
- **Time limit**: 2 seconds
- **Memory limit**: 256 MB
- **Implementation requirement**: Must use Quick Sort algorithm (not built-in sort)

## Hints
- **Hint 1**: Start with the base case - arrays with 0 or 1 elements are already sorted
- **Hint 2**: The partition function is key - it rearranges elements around the pivot
- **Hint 3**: Common pivot choices are first, last, or middle element. Last element is often simplest
- **Hint 4**: After partitioning, the pivot is in its final sorted position
- **Hint 5**: Use Lomuto or Hoare partition schemes - Lomuto is easier to understand
- **Hint 6**: For large arrays, consider iterative implementation to avoid stack overflow
- **Hint 7**: Median-of-three pivot selection can improve performance on partially sorted arrays
- **Hint 8**: Handle edge cases: empty arrays, single elements, and arrays with all identical elements
- **Hint 9**: The performance test cases include large arrays that will timeout O(n²) bubble sort solutions
- **Hint 10**: Remember that Quick Sort modifies the array in-place - no extra array needed
