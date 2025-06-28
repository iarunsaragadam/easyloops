# Arrays - Declaration and Initialization

## Problem Statement

Write a program that demonstrates array declaration and initialization concepts by reading an array from input and displaying information about it. This exercise will help you understand how to work with arrays, from creating them to accessing their elements.

Your program should:

1. Read the size of an array (n) from the first line
2. If n > 0, read n space-separated integers from the second line to initialize the array
3. Display the array size and contents
4. Show basic array operations:
   - Access to first element (if array is not empty)
   - Access to last element (if array is not empty)  
   - Calculate and display the sum of all elements
5. Handle the special case of empty arrays (n = 0)

This problem focuses on fundamental array concepts including declaration, initialization, element access, and basic operations that are essential for programming.

## Input Format

The input consists of 1 or 2 lines:
```
Line 1: n (integer) - the size of the array (0 ≤ n ≤ 1000)
Line 2: n space-separated integers (only if n > 0) - the array elements
```

## Test Cases
**Input (`input1.txt`):**
```
5
1 2 3 4 5
```

**Expected Output (`expected1.txt`):**
```
Array size: 5
Array elements: [1, 2, 3, 4, 5]
First element: 1
Last element: 5
Array sum: 15
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand array declaration and initialization syntax
- Learn how to read array elements from input
- Practice array element access using indices
- Implement basic array operations (sum, first/last element access)
- Handle edge cases like empty arrays
- Develop familiarity with array data structure fundamentals

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    # Read array size
    n = int(input().strip())
    
    # Read array elements (if any)
    if n > 0:
        elements = list(map(int, input().strip().split()))
    else:
        elements = []
    
    # Display array information
    print(f"Array size: {n}")
    print(f"Array elements: {elements}")
    
    # Handle array operations based on size
    if n > 0:
        print(f"First element: {elements[0]}")
        print(f"Last element: {elements[-1]}")
        print(f"Array sum: {sum(elements)}")
    else:
        print("Empty array")
        print("No elements to display")
        print("Array sum: 0")
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    elements := make([]int, n)
    if n > 0 {
        for i := 0; i < n; i++ {
            fmt.Scanf("%d", &elements[i])
        }
    }
    
    fmt.Printf("Array size: %d\n", n)
    fmt.Printf("Array elements: %v\n", elements)
    
    if n > 0 {
        fmt.Printf("First element: %d\n", elements[0])
        fmt.Printf("Last element: %d\n", elements[n-1])
        
        sum := 0
        for _, val := range elements {
            sum += val
        }
        fmt.Printf("Array sum: %d\n", sum)
    } else {
        fmt.Println("Empty array")
        fmt.Println("No elements to display")
        fmt.Println("Array sum: 0")
    }
}
```

## Constraints
- 0 ≤ n ≤ 1000 (array size)
- -1000 ≤ array elements ≤ 1000
- Output format must match exactly (including spacing and punctuation)
- Handle empty arrays (n = 0) without reading a second line
- Time complexity should be O(n) where n is the array size
- Space complexity should be O(n) for storing the array

## Hints
- Remember that array indices typically start from 0 in most programming languages
- When n = 0, don't attempt to read the second line of input
- Use appropriate data structures: lists in Python, slices in Go
- Pay attention to the exact output format including brackets and spacing
- Consider edge cases: empty arrays, single-element arrays, negative numbers
- The sum operation provides practice with array traversal
