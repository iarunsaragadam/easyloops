# Dynamic Arrays/Lists

## Problem Statement

Write a program that simulates a dynamic array (also known as a resizable array or list) and performs various operations on it. Dynamic arrays are fundamental data structures that can grow and shrink during runtime, unlike static arrays with fixed sizes.

Your program should process a sequence of operations on a dynamic array and output the results of each operation. This problem will help you understand how dynamic arrays work internally and practice common array operations.

**Operations to support:**
1. **ADD x** - Add element x to the end of the array
2. **REMOVE** - Remove the last element from the array
3. **GET i** - Get the element at index i (0-indexed)
4. **SIZE** - Get the current size of the array
5. **PRINT** - Print all elements in the array

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations, 1 ≤ n ≤ 1000)
Lines 2 to n+1: operations in the format described above
```

## Test Cases
**Input (`input.txt`):**
```
8
ADD 10
ADD 20
SIZE
PRINT
GET 1
REMOVE
SIZE
PRINT
```

**Expected Output (`expected.txt`):**
```
Added 10
Added 20
Size: 2
Array: 10 20
Element at index 1: 20
Removed 20
Size: 1
Array: 10
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand dynamic arrays/lists and how they differ from static arrays
- Practice common array operations: insertion, deletion, access, and traversal
- Learn about dynamic memory allocation and resizing concepts
- Handle edge cases like empty arrays and out-of-bounds access
- Understand time complexity of different array operations

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    dynamic_array = []
    
    for _ in range(n):
        operation = input().strip().split()
        cmd = operation[0]
        
        if cmd == "ADD":
            value = int(operation[1])
            dynamic_array.append(value)
            print(f"Added {value}")
        elif cmd == "REMOVE":
            if dynamic_array:
                removed = dynamic_array.pop()
                print(f"Removed {removed}")
            else:
                print("Error: Array is empty")
        # ... handle other operations
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scan(&n)
    
    dynamicArray := make([]int, 0)
    
    for i := 0; i < n; i++ {
        var cmd string
        fmt.Scan(&cmd)
        
        switch cmd {
        case "ADD":
            var value int
            fmt.Scan(&value)
            dynamicArray = append(dynamicArray, value)
            fmt.Printf("Added %d\n", value)
        case "REMOVE":
            if len(dynamicArray) > 0 {
                removed := dynamicArray[len(dynamicArray)-1]
                dynamicArray = dynamicArray[:len(dynamicArray)-1]
                fmt.Printf("Removed %d\n", removed)
            } else {
                fmt.Println("Error: Array is empty")
            }
        // ... handle other operations
        }
    }
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of operations)
- -1000 ≤ element values ≤ 1000
- 0 ≤ index values < current array size
- Array size will not exceed 1000 elements at any point
- All operations are guaranteed to be valid format-wise

## Hints
- Use built-in dynamic array structures (list in Python, slice in Go, Array in JavaScript)
- Always check if the array is empty before removing elements
- Handle out-of-bounds access gracefully with error messages
- Remember that array indices are 0-based
- Consider the time complexity: ADD is O(1) amortized, REMOVE is O(1), GET is O(1), SIZE is O(1), PRINT is O(n)
