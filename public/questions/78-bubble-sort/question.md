# Bubble Sort Algorithm

## Problem Statement

Implement the bubble sort algorithm to sort an array of integers in ascending order.

Bubble sort is one of the simplest sorting algorithms to understand and implement. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements "bubble" to the top of the list.

**Key Characteristics:**
- **Time Complexity**: O(n²) in average and worst case, O(n) in best case (when array is already sorted)
- **Space Complexity**: O(1) - it sorts in-place
- **Stability**: Stable (maintains relative order of equal elements)
- **In-place**: Yes, only requires a constant amount of additional memory

**Real-world Context**: While bubble sort is inefficient for large datasets, it's an excellent educational tool for understanding basic sorting concepts and algorithm optimization techniques.

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers to be sorted (may be empty)
```

## Output Format

Print a single line containing the sorted integers in ascending order, separated by spaces.
- If the input is empty, print an empty line
- If there's only one number, print that number
- For multiple numbers, print them sorted in ascending order

## Test Cases

**Basic Test Case (`input1.txt`):**
```
5 2 8 1 9
```

**Expected Output (`expected1.txt`):**
```
1 2 5 8 9
```

**Edge Case - Empty Input (`input31.txt`):**
```

```

**Expected Output (`expected31.txt`):**
```

```

**Edge Case - Single Element (`input33.txt`):**
```
1
```

**Expected Output (`expected33.txt`):**
```
1
```

**Performance Test Case (`input58.txt`):**
```
Large array with 956 elements in reverse order...
```

**Expected Output (`expected58.txt`):**
```
Sorted array with 956 elements in ascending order...
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅
6. Test with more cases: `cat input31.txt | python solution.py` (should handle empty input)

## Learning Objectives
- Master the bubble sort algorithm and understand its mechanics
- Learn about algorithm time and space complexity analysis
- Practice implementing nested loops and conditional swapping
- Understand the concept of algorithm optimization (early termination)
- Learn to handle edge cases (empty input, single elements, already sorted arrays)
- Compare efficiency of different sorting approaches
- Develop skills in reading formatted input and producing formatted output

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Read input
    line = input().strip()
    
    # Handle empty input
    if not line:
        print()
        return
    
    # Parse input
    numbers = list(map(int, line.split()))
    
    # Bubble sort algorithm
    n = len(numbers)
    for i in range(n):
        # Optimization: if no swaps occur, array is sorted
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            if numbers[j] > numbers[j + 1]:
                # Swap elements
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                swapped = True
        
        # Early termination if array is sorted
        if not swapped:
            break
    
    # Output result
    print(' '.join(map(str, numbers)))
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    input := strings.TrimSpace(scanner.Text())
    
    // Handle empty input
    if input == "" {
        fmt.Println()
        return
    }
    
    // Parse input
    parts := strings.Fields(input)
    numbers := make([]int, len(parts))
    for i, part := range parts {
        numbers[i], _ = strconv.Atoi(part)
    }
    
    // Bubble sort algorithm
    n := len(numbers)
    for i := 0; i < n; i++ {
        swapped := false
        
        for j := 0; j < n-i-1; j++ {
            if numbers[j] > numbers[j+1] {
                numbers[j], numbers[j+1] = numbers[j+1], numbers[j]
                swapped = true
            }
        }
        
        if !swapped {
            break
        }
    }
    
    // Output result
    result := make([]string, len(numbers))
    for i, num := range numbers {
        result[i] = strconv.Itoa(num)
    }
    fmt.Println(strings.Join(result, " "))
}
```

## Constraints
- Input may contain 0 to 1,000 integers
- Each integer is in the range -1,000,000 to 1,000,000
- Time limit: 2 seconds (bubble sort should handle arrays up to ~1000 elements)
- Memory limit: 256 MB
- Your solution must implement bubble sort algorithm (not built-in sort functions)

## Hints
- **Hint 1**: Start by reading the input carefully - handle the empty input case first
- **Hint 2**: The basic bubble sort uses nested loops: outer loop for passes, inner loop for comparisons
- **Hint 3**: In each pass, the largest unsorted element "bubbles up" to its correct position
- **Hint 4**: Optimize with a flag to detect when no swaps occur (array is sorted)
- **Hint 5**: The inner loop can go one less iteration in each pass since the largest elements are already in place
- **Hint 6**: Test your solution with edge cases: empty input, single element, already sorted, reverse sorted
- **Hint 7**: For performance test cases, ensure your implementation includes the early termination optimization
