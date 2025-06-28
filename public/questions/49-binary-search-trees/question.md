# Binary Search Trees

## Problem Statement

Build a Binary Search Tree (BST) from a sequence of integers and output the in-order traversal of the resulting tree.

A Binary Search Tree is a binary tree where for each node:
- All values in the left subtree are less than the node's value
- All values in the right subtree are greater than the node's value
- Both left and right subtrees are also binary search trees

The in-order traversal visits nodes in the following order: left subtree → root → right subtree. For a BST, this produces values in sorted order.

**Note**: Duplicate values should be ignored (not inserted into the tree).

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated integers to insert into the BST
```

## Test Cases
**Input (`input.txt`):**
```
5 3 7 2 4 6 8
```

**Expected Output (`expected.txt`):**
```
2 3 4 5 6 7 8
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand Binary Search Tree properties and structure
- Implement BST insertion maintaining tree properties
- Practice tree traversal algorithms (in-order)
- Learn how BST in-order traversal produces sorted output
- Handle edge cases like empty input and duplicate values
- Understand tree-based data structure fundamentals

## Implementation Guidelines

### Approach:
1. **Define BST Node Structure**: Create a node class with value, left, and right pointers
2. **Implement BST Insertion**: Insert values maintaining BST property (left < root < right)
3. **Handle Duplicates**: Skip duplicate values during insertion
4. **Implement In-order Traversal**: Recursively visit left → root → right
5. **Output Result**: Print the traversal result as space-separated values

### Python Example Structure:
```python
class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def solve():
    line = input().strip()
    if not line:
        print()
        return
    
    values = list(map(int, line.split()))
    # Build BST and perform in-order traversal
    # Print result
```

### Go Example Structure:
```go
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func solve() {
    // Read input
    // Build BST
    // Perform in-order traversal
    // Print result
}
```

## Constraints
- Input contains 0 to 10,000 integers
- Integer values range from -10,000 to 10,000
- Empty input should produce empty output
- Time complexity should be O(n log n) average case for balanced tree
- Space complexity should be O(n) for storing the tree

## Hints
- **Start Simple**: Handle the base case of empty input first
- **BST Property**: When inserting, compare with current node: go left if smaller, right if larger
- **Recursion**: Both insertion and traversal can be implemented recursively
- **Duplicates**: Check if value already exists before inserting, or simply skip equal values
- **In-order**: Remember the order is left → root → right for each subtree
- **Edge Cases**: Consider single element, all same elements, already sorted input, and reverse sorted input
