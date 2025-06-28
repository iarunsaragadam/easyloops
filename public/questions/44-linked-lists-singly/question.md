# Linked lists (singly)

## Problem Statement

You are given a singly linked list represented as a sequence of integers. Your task is to reverse the linked list and return the reversed sequence.

In a singly linked list, each node contains data and a reference to the next node. Reversing means changing the direction of the links so that the last node becomes the first, the second-to-last becomes the second, and so on.

For this problem, you'll work with the values of the linked list directly, reading them as space-separated integers and outputting the reversed sequence.

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers representing the linked list values (or empty line for empty list)
```

## Test Cases
**Input (`input.txt`):**
```
1 2 3 4 5
```

**Expected Output (`expected.txt`):**
```
5 4 3 2 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the concept of singly linked lists
- Learn how to reverse a linked list conceptually
- Practice handling edge cases (empty lists, single elements)
- Implement iterative algorithms for linked list operations
- Work with sequential data structures

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    # Read input
    line = input().strip()
    
    # Handle empty input
    if not line:
        print("")
        return
    
    # Parse values
    values = list(map(int, line.split()))
    
    # Reverse the values (implement your logic here)
    # For a real linked list, you'd reverse the pointers
    reversed_values = # Your implementation
    
    # Output result
    print(" ".join(map(str, reversed_values)))
```

### Go Example Structure:
```go
func solve() {
    // Read input
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := strings.TrimSpace(scanner.Text())
    
    // Handle empty input
    if line == "" {
        fmt.Println("")
        return
    }
    
    // Parse and reverse values
    // Your implementation here
}
```

## Constraints
- 0 ≤ number of elements ≤ 100,000
- -10^9 ≤ each element value ≤ 10^9
- Time complexity: O(n) where n is the number of elements
- Space complexity: O(1) extra space (not counting input/output)

## Hints
- **Hint 1**: Think about what "reversing" means - the first element becomes last, second becomes second-to-last, etc.
- **Hint 2**: For this text-based version, you can work with the values directly using array/list operations.
- **Hint 3**: Consider edge cases: what happens with an empty list? What about a single element?
- **Hint 4**: In a real linked list implementation, you'd need to change the `next` pointers of each node.
- **Hint 5**: The simplest approach is to collect all values and reverse them, but try to think about how you'd do this with actual linked list nodes.
