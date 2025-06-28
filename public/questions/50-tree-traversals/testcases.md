# Test Cases for Tree Traversals

## Test Case Structure
This question uses a 1-line input format with level-order tree representation.

### Input Format Pattern:
```
Line 1: Space-separated values representing binary tree in level-order
        - Integers for node values
        - "null" for missing nodes
        - Example: "1 2 3 null 4" represents tree with root 1, left child 2, right child 3, and node 2 has right child 4
```

### Output Format Pattern:
```
Line 1: Inorder traversal (space-separated integers)
Line 2: Preorder traversal (space-separated integers)
Line 3: Postorder traversal (space-separated integers)
```

## Test Case 1: Basic Binary Tree
**Input (`input.txt`):**
```
1 2 3 4 5
```
**Expected Output (`expected.txt`):**
```
4 2 5 1 3
1 2 4 5 3
4 5 2 3 1
```
**Description**: Complete binary tree with 5 nodes. Tests basic traversal algorithms.

## Test Case 2: Single Node (Edge Case)
**Input (`input2.txt`):**
```
1
```
**Expected Output (`expected2.txt`):**
```
1
1
1
```
**Description**: Simplest possible tree with one node. Tests base case handling.

## Test Case 3: Complex Unbalanced Tree (Performance)
**Input (`input3.txt`):**
```
1 2 3 4 null 5 6 7 null null null 8 9 null 10
```
**Expected Output (`expected3.txt`):**
```
7 10 4 2 1 5 3 8 6 9
1 2 4 7 10 3 5 6 8 9
10 7 4 2 5 8 9 6 3 1
```
**Description**: Unbalanced tree with null nodes, tests proper tree construction and traversal.

## Test Case Creation Rules

### Input Validation Rules:
1. Input must be valid level-order representation
2. Node values must be integers in range [-1000, 1000]
3. Use "null" (case-insensitive) for missing nodes
4. Tree must have at most 10,000 nodes
5. Root node cannot be null (unless empty tree)

### Output Format Rules:
1. Each traversal result on separate line
2. Space-separated integers with no trailing spaces
3. Empty line for empty traversal result
4. Exactly three output lines regardless of tree size

### Edge Cases to Test:
- Empty tree (input: "null")
- Single node tree
- Left-skewed tree (only left children)
- Right-skewed tree (only right children)
- Complete binary tree
- Tree with scattered null nodes

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read input line
- Handle "null" case-insensitively with `token.lower() == 'null'`
- Use list comprehensions for efficient traversal result collection
- Consider using `collections.deque` for queue operations in tree building

### Go Considerations:
- Use `bufio.Scanner` for input reading
- Handle null parsing with string comparison
- Use slices for dynamic arrays
- Consider using buffered I/O for large trees

## Performance Considerations:
- Tree building: O(n) time and space complexity
- Each traversal: O(n) time, O(h) space where h is tree height
- Total solution: O(n) time, O(n) space
- Should handle trees with 10,000 nodes efficiently

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Handles "null" values correctly (case-insensitive)
- [ ] Builds tree structure correctly from level-order input
- [ ] Inorder traversal: Left → Root → Right
- [ ] Preorder traversal: Root → Left → Right  
- [ ] Postorder traversal: Left → Right → Root
- [ ] Outputs exactly 3 lines
- [ ] Handles empty tree case
- [ ] Handles single node case
- [ ] No trailing spaces in output
- [ ] Performance acceptable for large inputs

## Common Mistakes to Avoid:
1. **Tree Building**: Not handling null nodes correctly in level-order construction
2. **Traversal Order**: Mixing up the order of operations in recursive calls
3. **Output Format**: Adding extra spaces or newlines
4. **Edge Cases**: Not handling empty trees or single nodes
5. **Input Parsing**: Case-sensitive null checking
6. **Memory**: Creating inefficient tree structures

## Automated Test Case Generation
```python
def generate_test_case(nodes):
    """Generate test case from list of node values/None"""
    # Convert to input format
    input_line = []
    for node in nodes:
        if node is None:
            input_line.append("null")
        else:
            input_line.append(str(node))
    
    # Build tree and get expected output
    root = build_tree_from_level_order(nodes)
    inorder = inorder_traversal(root)
    preorder = preorder_traversal(root)
    postorder = postorder_traversal(root)
    
    return {
        'input': ' '.join(input_line),
        'expected': '\n'.join([
            ' '.join(map(str, inorder)) if inorder else '',
            ' '.join(map(str, preorder)) if preorder else '',
            ' '.join(map(str, postorder)) if postorder else ''
        ])
    }

def validate_test_case(input_content, expected_content):
    """Validate that test case produces correct output"""
    # Parse input and generate expected output
    # Compare with provided expected output
    # Return validation result
    pass
```
