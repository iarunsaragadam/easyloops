# Queue implementation and usage

## Problem Statement

Implement a queue operations simulator that processes a series of queue operations. A queue is a First In, First Out (FIFO) data structure where elements are added to the rear and removed from the front.

You need to support the following operations:
- **ENQUEUE value**: Add an integer value to the rear of the queue
- **DEQUEUE**: Remove and return the front element from the queue
- **FRONT**: Return the front element without removing it
- **SIZE**: Return the current number of elements in the queue
- **EMPTY**: Return "true" if the queue is empty, "false" otherwise

For operations on an empty queue:
- **DEQUEUE** and **FRONT** should return "EMPTY"
- **SIZE** should return 0
- **EMPTY** should return "true"

## Input Format

The input consists of multiple lines:
```
Line 1: Number of operations N (1 ≤ N ≤ 1000)
Next N lines: Each line contains one operation in the format described above
```

## Test Cases
**Input (`input.txt`):**
```
6
ENQUEUE 10
ENQUEUE 20
FRONT
DEQUEUE
SIZE
EMPTY
```

**Expected Output (`expected.txt`):**
```
10
10
1
false
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand queue data structure and FIFO principle
- Implement basic queue operations (enqueue, dequeue, front, size, empty)
- Handle edge cases with empty queues
- Practice command processing and string parsing
- Learn about linear data structures and their operations

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    queue = []  # Use list as queue
    n = int(input())
    
    for _ in range(n):
        operation = input().split()
        
        if operation[0] == "ENQUEUE":
            value = int(operation[1])
            queue.append(value)  # Add to rear
        elif operation[0] == "DEQUEUE":
            if queue:
                print(queue.pop(0))  # Remove from front
            else:
                print("EMPTY")
        # Handle other operations...
```

### Go Example Structure:
```go
func solve() {
    var queue []int
    var n int
    fmt.Scanf("%d", &n)
    
    for i := 0; i < n; i++ {
        var op string
        fmt.Scanf("%s", &op)
        
        switch op {
        case "ENQUEUE":
            var value int
            fmt.Scanf("%d", &value)
            queue = append(queue, value)
        case "DEQUEUE":
            if len(queue) > 0 {
                fmt.Println(queue[0])
                queue = queue[1:]
            } else {
                fmt.Println("EMPTY")
            }
        // Handle other operations...
        }
    }
}
```

## Constraints
- 1 ≤ N ≤ 1000 (number of operations)
- -1000 ≤ value ≤ 1000 (for ENQUEUE operations)
- Queue size will not exceed 1000 elements at any time
- Operation names are guaranteed to be valid
- ENQUEUE operations will always include a valid integer value

## Hints
- Use an array/list to implement the queue
- For Python: `list.append()` adds to rear, `list.pop(0)` removes from front
- For Go: use slice operations to add/remove elements
- Remember to check if queue is empty before DEQUEUE/FRONT operations
- The queue follows FIFO: first element added is first element removed
- Keep track of the queue state throughout all operations
