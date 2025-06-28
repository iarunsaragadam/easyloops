# Tree Traversals

## Problem Statement

Given a binary tree represented in level-order format, implement three fundamental tree traversal algorithms: inorder, preorder, and postorder traversals.

Tree traversal is a fundamental operation in computer science that visits all nodes in a tree data structure. Each traversal method visits nodes in a different order, providing different perspectives on the tree's structure:

- **Inorder Traversal** (Left, Root, Right): Often used with Binary Search Trees to retrieve data in sorted order
- **Preorder Traversal** (Root, Left, Right): Useful for creating a copy of the tree or prefix expression evaluation
- **Postorder Traversal** (Left, Right, Root): Often used for deleting nodes or calculating directory sizes

This problem teaches fundamental tree algorithms and recursive thinking - essential skills for understanding more complex tree operations and data structures.

## Input Format

The input consists of 1 line:
```
Line 1: Space-separated values representing the binary tree in level-order format
        - Use integers for node values
        - Use "null" for missing nodes
        - Root node is the first value
```

## Output Format

Print exactly three lines:
```
Line 1: Inorder traversal (space-separated integers)
Line 2: Preorder traversal (space-separated integers) 
Line 3: Postorder traversal (space-separated integers)
```

If the tree is empty, print three empty lines.

## Test Cases

**Basic Test Case (`input.txt`):**
```
1 2 3 4 5
```

**Expected Output (`expected.txt`):**
```
4 2 5 1 3
1 2 4 5 3
4 5 2 3 1
```

**Edge Case (`input2.txt`):**
```
1
```

**Expected Output (`expected2.txt`):**
```
1
1
1
```

**Performance Test Case (`input3.txt`):**
```
1 2 3 4 null 5 6 7 null null null 8 9 null 10
```

**Expected Output (`expected3.txt`):**
```
7 10 4 2 1 5 3 8 6 9
1 2 4 7 10 3 5 6 8 9
10 7 4 2 5 8 9 6 3 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the three fundamental tree traversal algorithms
- Understand recursive problem-solving techniques
- Learn to build trees from level-order representation
- Practice handling edge cases (empty trees, single nodes)
- Develop intuition for when to use each traversal method
- Understand the relationship between tree structure and traversal order

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    line = input().strip()
    
    # Handle empty tree
    if line == "null" or line == "":
        print()
        print()
        print()
        return
    
    # Parse input and build tree
    tokens = line.split()
    nodes = []
    for token in tokens:
        if token.lower() == 'null':
            nodes.append(None)
        else:
            nodes.append(int(token))
    
    # Build tree from level-order representation
    root = build_tree(nodes)
    
    # Perform traversals
    inorder = inorder_traversal(root)
    preorder = preorder_traversal(root)
    postorder = postorder_traversal(root)
    
    # Output results
    print(' '.join(map(str, inorder)) if inorder else '')
    print(' '.join(map(str, preorder)) if preorder else '')
    print(' '.join(map(str, postorder)) if postorder else '')
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := strings.TrimSpace(scanner.Text())
    
    // Parse input and build tree
    root := buildTreeFromLevelOrder(line)
    
    // Perform traversals
    inorder := inorderTraversal(root)
    preorder := preorderTraversal(root)
    postorder := postorderTraversal(root)
    
    // Output results
    fmt.Println(strings.Join(inorder, " "))
    fmt.Println(strings.Join(preorder, " "))
    fmt.Println(strings.Join(postorder, " "))
}
```

## Constraints
- Tree can have up to 10,000 nodes
- Node values are integers in range [-1000, 1000]
- Time limit: 2 seconds
- Memory limit: 256 MB
- Solution must handle all three traversal types correctly

## Hints
- **Hint 1**: Start by defining a TreeNode class/struct with value, left, and right fields
- **Hint 2**: Build the tree from level-order using a queue-based approach
- **Hint 3**: Implement each traversal recursively - the pattern is straightforward once you understand the order
- **Hint 4**: For inorder: traverse left subtree, visit root, traverse right subtree
- **Hint 5**: For preorder: visit root, traverse left subtree, traverse right subtree  
- **Hint 6**: For postorder: traverse left subtree, traverse right subtree, visit root
- **Hint 7**: Handle the "null" keyword case-insensitively in your input parsing
- **Hint 8**: Use a queue to build the tree level by level, adding children as you encounter them
