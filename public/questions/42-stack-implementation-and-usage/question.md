# Stack implementation and usage

## Problem Statement

Implement a stack data structure and process a series of operations on it. A stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (called the "top").

Your task is to process a sequence of stack operations and output the results for operations that produce output.

## Input Format

The input consists of multiple lines:
```
Line 1: Number of operations n (1 ≤ n ≤ 100,000)
Next n lines: Commands in one of the following formats:
  - push X: Push integer X onto the stack
  - pop: Remove and return the top element
  - peek: Return the top element without removing it
  - isEmpty: Check if the stack is empty
  - size: Return the current number of elements in the stack
```

## Test Cases
**Input (`input.txt`):**
```
7
push 10
push 20
size
peek
pop
isEmpty
pop
```

**Expected Output (`expected.txt`):**
```
2
20
20
false
10
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand stack data structure and LIFO principle
- Implement basic stack operations (push, pop, peek)
- Handle edge cases like operations on empty stacks
- Practice command processing and conditional output
- Learn when to use stacks in real-world applications

## Implementation Guidelines

### Key Operations to Implement:
- **push X**: Add element X to the top of the stack
- **pop**: Remove and return the top element (output "empty" if stack is empty)
- **peek**: Return the top element without removing it (output "empty" if stack is empty)
- **isEmpty**: Return "true" if stack is empty, "false" otherwise
- **size**: Return the current number of elements

### Python Example Structure:
```python
def solve():
    n = int(input())
    stack = []  # Python list as stack
    
    for _ in range(n):
        command = input().strip().split()
        operation = command[0]
        
        if operation == "push":
            value = int(command[1])
            stack.append(value)
        elif operation == "pop":
            # Handle pop operation
            pass
        # ... handle other operations
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scan(&n)
    
    stack := make([]int, 0) // slice as stack
    
    for i := 0; i < n; i++ {
        var operation string
        fmt.Scan(&operation)
        
        switch operation {
        case "push":
            var value int
            fmt.Scan(&value)
            stack = append(stack, value)
        case "pop":
            // Handle pop operation
        }
    }
}
```

## Constraints
- 1 ≤ n ≤ 100,000 (number of operations)
- -10^9 ≤ X ≤ 10^9 (values for push operations)
- Time complexity: O(1) per operation
- Space complexity: O(n) where n is maximum stack size

## Hints
- Use an array or list to implement the stack
- Remember that stack operations should be O(1) time complexity
- Handle edge cases: popping from empty stack, peeking at empty stack
- Only output results for operations that require output (pop, peek, isEmpty, size)
- Python lists and Go slices work well as stacks with append/pop operations
