# Doubly Linked Lists

## Problem Statement

Implement a doubly linked list that supports various operations. A doubly linked list is a linear data structure where each node contains data and two pointers: one pointing to the next node and another pointing to the previous node. This allows for efficient insertion and deletion at both ends, as well as bidirectional traversal.

You will be given a series of operations to perform on an initially empty doubly linked list. Process each operation and output the results as specified.

## Input Format

The input consists of multiple lines, each containing an operation:
```
Operation_Name [value]
```

**Supported Operations:**
- `INSERT_FRONT value` - Insert value at the front of the list
- `INSERT_BACK value` - Insert value at the back of the list  
- `DELETE_FRONT` - Remove and return the front element
- `DELETE_BACK` - Remove and return the back element
- `FIND value` - Find the 0-indexed position of value (returns "NOT_FOUND" if not present)
- `PRINT_FORWARD` - Print all elements from front to back
- `PRINT_BACKWARD` - Print all elements from back to front
- `SIZE` - Print the current size of the list

## Output Format

For operations that produce output (DELETE_FRONT, DELETE_BACK, FIND, PRINT_FORWARD, PRINT_BACKWARD, SIZE):
- Print the result on a new line
- If the list is empty when performing DELETE_FRONT, DELETE_BACK, PRINT_FORWARD, or PRINT_BACKWARD, output "EMPTY"
- FIND returns the 0-indexed position or "NOT_FOUND"
- PRINT operations separate elements with spaces
- SIZE returns the number of elements

## Test Cases
**Input (`input1.txt`):**
```
INSERT_FRONT 3
INSERT_BACK 6
PRINT_FORWARD
```

**Expected Output (`expected1.txt`):**
```
3 6
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand doubly linked list structure and operations
- Implement efficient insertion and deletion at both ends (O(1) time complexity)
- Practice bidirectional traversal of linked structures
- Handle edge cases like empty lists and single-element lists
- Understand the advantages of doubly linked lists over singly linked lists

## Implementation Guidelines

### Key Concepts:
1. **Node Structure**: Each node needs `value`, `next`, and `prev` pointers
2. **Head and Tail Pointers**: Maintain references to both ends for O(1) operations
3. **Edge Cases**: Handle operations on empty lists and single-element lists carefully
4. **Pointer Management**: Always update both `next` and `prev` pointers when modifying the list

### Python Example Structure:
```python
class DoublyLinkedListNode:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

def solve():
    dll = DoublyLinkedList()
    # Process operations and output results
    pass
```

### Go Example Structure:
```go
type Node struct {
    Value int
    Next  *Node
    Prev  *Node
}

type DoublyLinkedList struct {
    Head *Node
    Tail *Node
    Size int
}

func solve() {
    // Implementation here
}
```

## Constraints
- 1 ≤ Number of operations ≤ 100,000
- -1,000,000 ≤ values ≤ 1,000,000
- All operations are valid (no invalid operation names)
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- Start by implementing the basic node structure and list class
- For INSERT_FRONT and INSERT_BACK, remember to handle the case when the list is empty
- When deleting nodes, be careful to update both head/tail pointers and the prev/next links
- For FIND operation, traverse from head to tail counting positions
- PRINT_FORWARD traverses from head using `next` pointers
- PRINT_BACKWARD traverses from tail using `prev` pointers
- Keep track of the size to make the SIZE operation O(1)
