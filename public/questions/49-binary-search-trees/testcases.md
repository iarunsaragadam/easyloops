# Test Cases for Binary Search Trees

## Test Case Structure
This question uses a single-line input format with space-separated integers to build a BST and output its in-order traversal.

### Input Format Pattern:
```
Line 1: Space-separated integers (or empty line)
```

### Output Format Pattern:
```
Space-separated integers in sorted order (or empty line for empty input)
```

## Test Case 1: Basic - Balanced Tree Construction
**Input (`input.txt`):**
```
5 3 7 2 4 6 8
```
**Expected Output (`expected.txt`):**
```
2 3 4 5 6 7 8
```
**Purpose**: Tests basic BST construction and in-order traversal with a well-balanced tree.

## Test Case 2: Edge Cases - Single Node and Duplicates
**Input (`input2.txt`):**
```
42 42 42 21 21 63 63
```
**Expected Output (`expected2.txt`):**
```
21 42 63
```
**Purpose**: Tests duplicate handling and ensures only unique values are stored in the BST.

## Test Case 3: Performance - Large Unbalanced Tree
**Input (`input3.txt`):**
```
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100
```
**Expected Output (`expected3.txt`):**
```
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100
```
**Purpose**: Tests performance with worst-case input (sorted sequence) that creates a highly unbalanced tree. Poor implementations may timeout.

## Test Case Creation Rules

### Input Validation Rules:
1. Input must be on a single line
2. Values must be space-separated integers
3. Empty input is valid and should produce empty output
4. Duplicate values are allowed in input but should be ignored during BST construction
5. Integer values can be positive, negative, or zero
6. No limit on number of input values (within memory constraints)

### Output Format Rules:
1. Output values must be space-separated integers
2. Values must be in ascending order (BST in-order traversal property)
3. Each unique value from input appears exactly once in output
4. Empty input produces empty output (single newline)
5. No trailing spaces after the last number
6. Single newline character at the end

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read the line and remove trailing whitespace
- Use `list(map(int, line.split()))` to parse space-separated integers
- Handle empty input with `if not line:` check
- Use recursion for tree operations (ensure Python recursion limit is adequate)
- Print with `print(' '.join(map(str, result)))` for proper formatting

### Go Considerations:
- Use `bufio.Scanner` or `fmt.Scanf` to read input line
- Use `strings.Fields()` and `strconv.Atoi()` to parse integers
- Handle empty input gracefully
- Implement pointer-based tree structure
- Use proper memory management for tree nodes
- Format output with `strings.Join()` and string conversion

## Additional Test Scenarios

### Edge Cases to Consider:
- **Empty Input**: No values provided
- **Single Value**: Only one integer
- **All Duplicates**: All values are the same
- **Already Sorted**: Input is in ascending order (worst case for BST)
- **Reverse Sorted**: Input is in descending order
- **Random Order**: Mixed positive and negative values
- **Large Input**: Stress test with many values

### Performance Characteristics:
- **Average Case**: O(n log n) time complexity for balanced trees
- **Worst Case**: O(n²) time complexity for completely unbalanced trees
- **Space Complexity**: O(n) for storing n unique values
- **Memory Usage**: Each node requires space for value and two pointers

## Validation Checklist
- [ ] Input has exactly 0 or 1 line (empty file or single line)
- [ ] All input values are valid integers
- [ ] Output contains only unique values from input
- [ ] Output values are in ascending sorted order
- [ ] Output format matches specification (space-separated, single line)
- [ ] Empty input produces empty output
- [ ] Duplicates in input are properly handled (ignored)
- [ ] Large inputs complete within reasonable time limits
- [ ] Memory usage is proportional to number of unique values

## Automated Test Case Generation
```python
def generate_test_case(size=10, min_val=-100, max_val=100, duplicates=True):
    """Generate a test case for BST problem"""
    import random
    
    if size == 0:
        return "", ""
    
    # Generate values with potential duplicates
    values = []
    for _ in range(size):
        values.append(random.randint(min_val, max_val))
    
    if not duplicates:
        values = list(set(values))
    
    input_content = ' '.join(map(str, values))
    
    # Generate expected output (sorted unique values)
    unique_sorted = sorted(set(values))
    expected_content = ' '.join(map(str, unique_sorted))
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate a BST test case"""
    if not input_content.strip():
        return expected_content.strip() == ""
    
    try:
        input_vals = list(map(int, input_content.split()))
        expected_vals = list(map(int, expected_content.split()))
        
        # Check if expected is sorted unique values from input
        unique_sorted = sorted(set(input_vals))
        return expected_vals == unique_sorted
    except:
        return False
```
