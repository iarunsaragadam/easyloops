# Merge Sort

## Problem Statement

Implement the merge sort algorithm to sort an array of integers in ascending order. Merge sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts both halves, and then merges the sorted halves back together.

Your task is to read a line of space-separated integers and output them in sorted order using the merge sort algorithm.

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers to be sorted
```

## Test Cases
**Input (`input.txt`):**
```
3 1 4 1 5 9 2 6
```

**Expected Output (`expected.txt`):**
```
1 1 2 3 4 5 6 9
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the divide-and-conquer paradigm
- Implement merge sort with O(n log n) time complexity
- Learn about stable sorting algorithms
- Practice recursive thinking and algorithm design
- Understand the merge operation for combining sorted arrays

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    line = input().strip()
    if not line:
        print()
        return
    
    numbers = list(map(int, line.split()))
    sorted_numbers = merge_sort(numbers)
    print(' '.join(map(str, sorted_numbers)))

def merge_sort(arr):
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Divide: split array into two halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Conquer: merge sorted halves
    return merge(left, right)

def merge(left, right):
    # Merge two sorted arrays into one sorted array
    # Your implementation here
    pass
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := strings.TrimSpace(scanner.Text())
    
    if line == "" {
        fmt.Println()
        return
    }
    
    // Parse input and call mergeSort
}

func mergeSort(arr []int) []int {
    // Implement merge sort recursively
}

func merge(left, right []int) []int {
    // Merge two sorted slices
}
```

## Constraints
- Array size: 1 ≤ n ≤ 100,000
- Element values: -10^9 ≤ arr[i] ≤ 10^9
- Time complexity requirement: O(n log n)
- Space complexity: O(n) auxiliary space is acceptable
- Algorithm must be stable (preserve relative order of equal elements)

## Hints
1. **Divide and Conquer**: Break the problem into smaller subproblems
   - Base case: What's the smallest array you can sort trivially?
   - Recursive case: How can you sort a larger array using smaller sorted arrays?

2. **The Merge Operation**: The key to merge sort is efficiently combining two sorted arrays
   - Use two pointers to traverse both arrays simultaneously
   - Compare elements and add the smaller one to the result
   - Don't forget to add remaining elements from either array

3. **Implementation Tips**:
   - Start with the merge function - it's easier to test independently
   - The recursive calls will handle the "divide" part automatically
   - Make sure to handle edge cases like empty arrays or single elements

4. **Performance Consideration**: Unlike bubble sort or selection sort (O(n²)), merge sort maintains O(n log n) performance even on worst-case inputs, making it suitable for large datasets
