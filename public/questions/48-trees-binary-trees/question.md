# Trees (binary trees)

## Problem Statement

Calculate the height (maximum depth) of a binary tree. The height of a binary tree is the number of edges in the longest path from the root node to any leaf node. This is a fundamental problem that helps you understand tree structure, recursion, and tree traversal concepts.

Given a binary tree represented as a level-order array, calculate and return its height.

**Tree Height Definition:**
- An empty tree has height 0
- A tree with only a root node has height 1  
- For any other tree, height = 1 + max(height of left subtree, height of right subtree)

**Examples:**
```
Tree: [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7
Height: 3 (root -> 20 -> 15 or root -> 20 -> 7)

Tree: [1]
  1
Height: 1

Tree: [null] (empty tree)
Height: 0
```

## Input Format

The input consists of 1 line:
```
Line 1: Binary tree in level-order array format [val1,val2,val3,null,null,val4,val5,...]
```

- Values are comma-separated and enclosed in square brackets
- `null` represents missing nodes
- Tree nodes contain integer values

## Test Cases
**Input (`input.txt`):**
```
[3,9,20,null,null,15,7]
```

**Expected Output (`expected.txt`):**
```
3
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand binary tree structure and representation
- Learn recursive tree traversal techniques
- Practice calculating tree properties (height/depth)
- Master tree construction from array representation
- Develop intuition for tree-based problem solving
- Understand the relationship between tree height and algorithm complexity

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    # Parse input: [3,9,20,null,null,15,7]
    line = input().strip()
    line = line.strip('[]')
    arr = [x.strip() for x in line.split(',')]
    
    # Build tree from array
    root = build_tree_from_array(arr)
    
    # Calculate height
    height = calculate_height(root)
    print(height)

def build_tree_from_array(arr):
    # Build binary tree from level-order representation
    pass

def calculate_height(root):
    # Recursive height calculation
    if not root:
        return 0
    return 1 + max(calculate_height(root.left), calculate_height(root.right))
```

### Go Example Structure:
```go
func solve() {
    var input string
    fmt.Scanln(&input)
    
    // Parse input and build tree
    root := buildTreeFromArray(input)
    
    // Calculate height
    height := calculateHeight(root)
    fmt.Printf("%d\n", height)
}

func calculateHeight(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return 1 + max(calculateHeight(root.Left), calculateHeight(root.Right))
}
```

## Constraints
- 0 ≤ number of nodes ≤ 10,000
- -1000 ≤ node values ≤ 1000
- Input follows valid level-order representation format
- Time complexity target: O(n) where n is number of nodes
- Space complexity: O(h) where h is tree height (recursion stack)
- Output must be a single integer on one line

## Hints
- **Hint 1**: Think recursively - the height of a tree is 1 plus the maximum height of its subtrees
- **Hint 2**: Handle the base case carefully - what's the height of an empty tree?
- **Hint 3**: To build the tree from array, use a queue-based level-order construction approach
- **Hint 4**: Remember that `null` in the input represents missing nodes, not nodes with value 0
- **Hint 5**: The level-order array representation fills levels from left to right
