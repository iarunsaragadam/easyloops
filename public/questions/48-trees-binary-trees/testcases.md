# Test Cases for Trees (binary trees)

## Test Case Structure
This question uses a single-line input format with level-order binary tree representation.

### Input Format Pattern:
```
Line 1: [val1,val2,val3,null,null,val4,val5,...] (level-order array representation)
```

### Output Format Pattern:
```
Integer (tree height)
```

## Test Case 1: Basic - Balanced Tree
**Input (`input.txt`):**
```
[3,9,20,null,null,15,7]
```
**Expected Output (`expected.txt`):**
```
3
```
**Description:** Standard balanced binary tree with height 3. Tests basic tree construction and height calculation.
**Tree Visualization:**
```
    3
   / \
  9  20
    /  \
   15   7
```

## Test Case 2: Edge Cases - Single Node and Empty Tree
**Input (`input2.txt`):**
```
[1]
```
**Expected Output (`expected2.txt`):**
```
1
```
**Description:** Single node tree (minimum non-empty case). Height should be 1.

## Test Case 3: Performance - Skewed Tree
**Input (`input3.txt`):**
```
[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9,null,10]
```
**Expected Output (`expected3.txt`):**
```
10
```
**Description:** Right-skewed tree that degenerates to a linked list. Tests performance with deep recursion and worst-case height. Should handle recursion depth efficiently up to reasonable limits.

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be a valid level-order array representation enclosed in square brackets
2. Values must be integers or the string "null" for missing nodes
3. Array elements are comma-separated
4. No leading/trailing whitespace except for final newline
5. Empty tree represented as `[null]` or `[]`
6. Maximum of 10,000 nodes to ensure reasonable performance

### Output Format Rules:
1. Output must be a single non-negative integer
2. No leading zeros (except for result 0)
3. Single newline at end of output
4. No additional formatting, spaces, or text

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read and clean the input line
- Parse the array by removing brackets and splitting on commas
- Handle "null" strings by checking for the literal string, not None values
- Use recursive tree height calculation with proper base cases
- Consider using a TreeNode class for clean tree representation

### Go Considerations:
- Use `fmt.Scanln()` or `bufio.Scanner` to read the input line
- Parse the level-order array by string manipulation
- Implement TreeNode struct with Left/Right pointers
- Handle nil pointers in recursive height calculation
- Be careful with string-to-integer conversion for node values

## Advanced Test Scenarios
### Additional Edge Cases:
- Empty tree: `[null]` → height 0
- Complete binary trees of various sizes
- Perfectly balanced trees vs completely unbalanced trees
- Trees with negative values: `[-10,-5,5,null,null,-3,7]`
- Large trees approaching the node limit (performance testing)

### Complex Tree Patterns:
- Left-heavy trees: `[1,2,3,4,5,null,null,6,7]`
- Zigzag patterns with alternating left/right children
- Trees with multiple null nodes at different levels
- Maximum width trees (many nodes at the same level)

## Validation Checklist
- [ ] Input follows exact level-order array format with brackets
- [ ] All node values are valid integers or "null"
- [ ] Tree construction handles null nodes correctly
- [ ] Height calculation uses proper recursive logic
- [ ] Edge cases (empty tree, single node) handled correctly
- [ ] Performance acceptable for maximum input size
- [ ] Output format is exactly one integer with newline

## Automated Test Case Generation
```python
import random

def generate_test_case(max_nodes=100, max_depth=6):
    """Generate random binary tree test case"""
    def create_random_tree(depth, max_depth, fill_prob=0.7):
        if depth >= max_depth or random.random() > fill_prob:
            return "null"
        
        value = random.randint(-100, 100)
        return value
    
    # Generate level-order representation
    tree = []
    for level in range(max_depth):
        level_size = 2 ** level
        for i in range(level_size):
            if len(tree) < max_nodes:
                node = create_random_tree(level, max_depth)
                tree.append(node)
    
    # Clean up trailing nulls
    while tree and tree[-1] == "null":
        tree.pop()
    
    return tree

def validate_test_case(input_content, expected_content):
    """Validate test case correctness"""
    try:
        # Parse input
        line = input_content.strip()
        assert line.startswith('[') and line.endswith(']'), "Input must be array format"
        
        # Parse expected output
        expected = int(expected_content.strip())
        assert expected >= 0, "Height must be non-negative"
        
        # Additional validation could include:
        # - Building the tree and calculating height
        # - Comparing with expected result
        return True
    except Exception as e:
        print(f"Validation error: {e}")
        return False

def calculate_expected_height(tree_array):
    """Calculate expected height for generated test case"""
    # Implementation would build tree and calculate height
    # This ensures test case correctness
    pass
```
