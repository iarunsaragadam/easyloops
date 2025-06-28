# Test Cases for Iterator Patterns: Spiral Matrix Iterator

## Test Case Structure
This question uses a multi-line input format for matrix data.

### Input Format Pattern:
```
Line 1: rows cols (matrix dimensions)
Lines 2 to rows+1: cols integers per line (matrix elements)
```

### Output Format Pattern:
```
Single line: space-separated integers in spiral order
```

## Test Case 1: Basic - Square Matrix (3×3)
**Input (`input.txt`):**
```
3 3
1 2 3
4 5 6
7 8 9
```
**Expected Output (`expected.txt`):**
```
1 2 3 6 9 8 7 4 5
```
**Purpose**: Tests basic spiral traversal on a standard 3×3 matrix.

## Test Case 2: Edge - Single Element Matrix (1×1)
**Input (`input2.txt`):**
```
1 1
42
```
**Expected Output (`expected2.txt`):**
```
42
```
**Purpose**: Tests the simplest case with only one element.

## Test Case 3: Performance - Larger Rectangular Matrix (4×5)
**Input (`input3.txt`):**
```
4 5
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
```
**Expected Output (`expected3.txt`):**
```
1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12
```
**Purpose**: Tests larger rectangular matrix with multiple spiral layers and ensures proper iterator performance.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain exactly two positive integers (rows and cols)
2. Must have exactly `rows` additional lines after the first line
3. Each matrix row must contain exactly `cols` integers
4. Matrix dimensions must be reasonable: 1 ≤ rows, cols ≤ 1000
5. Matrix elements must be valid integers in range [-10^9, 10^9]
6. No empty lines or trailing spaces in input

### Output Format Rules:
1. Output must be a single line containing space-separated integers
2. Elements must be in correct spiral order (clockwise from outside to inside)
3. No trailing spaces or newlines at the end
4. All elements from the input matrix must appear exactly once in output
5. Order must follow: right → down → left → up for each spiral layer

### Algorithm Verification:
1. **Right traversal**: Move from left boundary to right boundary on top row
2. **Down traversal**: Move from top boundary to bottom boundary on right column
3. **Left traversal**: Move from right boundary to left boundary on bottom row (if valid)
4. **Up traversal**: Move from bottom boundary to top boundary on left column (if valid)
5. **Boundary updates**: Shrink boundaries after each complete direction

## Language-Specific Considerations

### Python Considerations:
- Must implement `__iter__()` method returning self
- Must implement `__next__()` method returning next element
- Must raise `StopIteration` when no more elements available
- Use proper exception handling for matrix bounds
- Consider memory efficiency for large matrices
- Follow Python naming conventions (snake_case)

### Go Considerations:
- Implement iterator pattern using struct with methods
- Use `HasNext()` and `Next()` methods for iteration control
- Handle panic conditions gracefully for invalid access
- Use slices for dynamic array handling
- Follow Go naming conventions (PascalCase for exported, camelCase for internal)
- Consider using channels for advanced iterator implementations

### JavaScript Considerations:
- Implement iterator protocol using `Symbol.iterator`
- Return object with `next()` method that returns `{value, done}`
- Handle edge cases in `next()` method implementation
- Use proper array indexing and bounds checking

## Validation Checklist
- [ ] Matrix dimensions match first line specification
- [ ] All matrix rows have correct number of elements
- [ ] Output contains all input elements exactly once
- [ ] Output follows correct spiral order
- [ ] Iterator properly implements language-specific iterator protocol
- [ ] Edge cases (1×1, single row, single column) handled correctly
- [ ] Performance acceptable for large matrices (up to 1000×1000)
- [ ] No memory leaks or excessive memory usage
- [ ] Proper error handling for invalid inputs

## Automated Test Case Generation

```python
def generate_test_case(rows, cols, start_value=1):
    """Generate a test case with specified dimensions."""
    # Create matrix with sequential values
    matrix = []
    value = start_value
    for i in range(rows):
        row = []
        for j in range(cols):
            row.append(value)
            value += 1
        matrix.append(row)
    
    # Generate input format
    input_lines = [f"{rows} {cols}"]
    for row in matrix:
        input_lines.append(" ".join(map(str, row)))
    
    # Generate expected output using reference solution
    expected_output = compute_spiral_order(matrix)
    
    return "\n".join(input_lines), " ".join(map(str, expected_output))

def compute_spiral_order(matrix):
    """Reference implementation for computing spiral order."""
    if not matrix or not matrix[0]:
        return []
    
    rows, cols = len(matrix), len(matrix[0])
    result = []
    
    top, bottom = 0, rows - 1
    left, right = 0, cols - 1
    
    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        
        # Down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        
        # Left (if still valid)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        
        # Up (if still valid)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    
    return result

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted and solvable."""
    lines = input_content.strip().split('\n')
    
    # Validate input format
    if len(lines) < 1:
        return False, "Input must have at least one line"
    
    try:
        rows, cols = map(int, lines[0].split())
    except:
        return False, "First line must contain two integers"
    
    if len(lines) != rows + 1:
        return False, f"Expected {rows + 1} lines, got {len(lines)}"
    
    # Validate matrix format
    matrix = []
    for i in range(1, rows + 1):
        try:
            row = list(map(int, lines[i].split()))
            if len(row) != cols:
                return False, f"Row {i} has {len(row)} elements, expected {cols}"
            matrix.append(row)
        except:
            return False, f"Row {i} contains invalid integers"
    
    # Validate expected output
    expected_elements = expected_content.strip().split()
    if len(expected_elements) != rows * cols:
        return False, f"Expected output has {len(expected_elements)} elements, should have {rows * cols}"
    
    # Verify spiral order is correct
    computed_spiral = compute_spiral_order(matrix)
    expected_spiral = list(map(int, expected_elements))
    
    if computed_spiral != expected_spiral:
        return False, "Expected output does not match correct spiral order"
    
    return True, "Test case is valid"
```

## Additional Test Cases for Comprehensive Coverage

### Edge Cases to Include:
1. **Single Row Matrix**: `1 5` matrix to test horizontal-only traversal
2. **Single Column Matrix**: `5 1` matrix to test vertical-only traversal  
3. **Large Square Matrix**: `100 100` matrix for performance testing
4. **Maximum Rectangular**: `1 1000` and `1000 1` for stress testing
5. **Negative Numbers**: Matrix with negative integers
6. **Zero Elements**: Matrix containing zeros
7. **Large Numbers**: Matrix with numbers near integer limits

### Performance Benchmarks:
- **Small matrices** (≤ 10×10): Should complete in < 1ms
- **Medium matrices** (≤ 100×100): Should complete in < 100ms  
- **Large matrices** (≤ 1000×1000): Should complete in < 1s
- **Memory usage**: Should not exceed O(rows × cols) space
