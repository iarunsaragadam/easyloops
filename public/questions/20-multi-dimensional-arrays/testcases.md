# Test Cases for Multi-dimensional Arrays

## Test Case Structure

This question uses a variable-line input format where the first line specifies dimensions, followed by matrix rows.

### Input Format Pattern:
```
Line 1: rows cols (two integers separated by space)
Line 2: row1_col1 row1_col2 ... row1_colN (first row elements)
Line 3: row2_col1 row2_col2 ... row2_colN (second row elements)
...
Line (rows+1): rowN_col1 rowN_col2 ... rowN_colN (last row elements)
```

### Output Format Pattern:
```
Matrix:
[formatted matrix display]
Row sums:
Row 1: [sum]
Row 2: [sum]
...
Column sums:
Column 1: [sum]
Column 2: [sum]
...
Maximum element: [value] at position ([row], [col])
```

## Test Case 1: Basic (3x3 Square Matrix)

**Input (`input.txt`):**
```
3 3
1 2 3
4 5 6
7 8 9
```

**Expected Output (`expected.txt`):**
```
Matrix:
1 2 3
4 5 6
7 8 9
Row sums:
Row 1: 6
Row 2: 15
Row 3: 24
Column sums:
Column 1: 12
Column 2: 15
Column 3: 18
Maximum element: 9 at position (3, 3)
```

**Purpose**: Tests basic 3x3 matrix operations with positive integers in ascending order.

## Test Case 2: Edge (1x1 Single Element Matrix)

**Input (`input2.txt`):**
```
1 1
42
```

**Expected Output (`expected2.txt`):**
```
Matrix:
42
Row sums:
Row 1: 42
Column sums:
Column 1: 42
Maximum element: 42 at position (1, 1)
```

**Purpose**: Tests edge case with smallest possible matrix (1x1), ensuring algorithms work correctly for minimal input.

## Test Case 3: Complex (2x4 Rectangular Matrix)

**Input (`input3.txt`):**
```
2 4
10 20 30 40
50 60 70 80
```

**Expected Output (`expected3.txt`):**
```
Matrix:
10 20 30 40
50 60 70 80
Row sums:
Row 1: 100
Row 2: 260
Column sums:
Column 1: 60
Column 2: 80
Column 3: 100
Column 4: 120
Maximum element: 80 at position (2, 4)
```

**Purpose**: Tests rectangular matrix (non-square) with larger values, verifying column operations work correctly when rows ≠ columns.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain exactly 2 positive integers (rows, cols)
2. Must have exactly `rows` subsequent lines
3. Each row line must contain exactly `cols` integers
4. Matrix dimensions must be at least 1x1
5. All elements must be valid integers within constraint range (-1000 to 1000)

### Output Format Rules:
1. Matrix section shows elements with single space separation
2. Row sums use format "Row X: Y" with 1-based indexing
3. Column sums use format "Column X: Y" with 1-based indexing
4. Maximum element uses format "Maximum element: value at position (row, col)" with 1-based indexing
5. All sections separated by blank lines as shown in examples

## Language-Specific Considerations

### Python Considerations:
- Use `map(int, input().split())` to parse dimension line
- Use list comprehension or nested loops to build 2D list
- Use `enumerate()` for indexed iteration when calculating row sums
- Use generator expression `sum(matrix[i][j] for i in range(rows))` for column sums
- String formatting with f-strings for clean output

### Go Considerations:
- Use `strings.Fields()` to split input lines
- Use `strconv.Atoi()` to convert string numbers to integers
- Declare 2D slice with `make([][]int, rows)` then initialize each row
- Use nested loops for matrix traversal
- Format output with `fmt.Printf()` for precise spacing

## Validation Checklist

- [ ] Input has correct number of lines (rows + 1)
- [ ] First line contains exactly 2 positive integers
- [ ] Each row line contains exactly `cols` integers
- [ ] Matrix displays with proper spacing
- [ ] Row sums calculated correctly for each row
- [ ] Column sums calculated correctly for each column
- [ ] Maximum element identified correctly with 1-based position
- [ ] Output format matches exactly (spacing, labels, punctuation)
- [ ] Handles edge cases (1x1 matrix, rectangular matrices)
- [ ] Position reporting uses 1-based indexing consistently

## Automated Test Case Generation

```python
import random

def generate_test_case(rows=None, cols=None, min_val=-50, max_val=50):
    """Generate a random test case for multi-dimensional arrays problem."""
    if rows is None:
        rows = random.randint(1, 5)
    if cols is None:
        cols = random.randint(1, 5)
    
    # Generate matrix
    matrix = []
    for i in range(rows):
        row = [random.randint(min_val, max_val) for _ in range(cols)]
        matrix.append(row)
    
    # Create input
    input_lines = [f"{rows} {cols}"]
    for row in matrix:
        input_lines.append(" ".join(map(str, row)))
    
    # Calculate expected output
    output_lines = ["Matrix:"]
    for row in matrix:
        output_lines.append(" ".join(map(str, row)))
    
    output_lines.append("Row sums:")
    for i, row in enumerate(matrix):
        row_sum = sum(row)
        output_lines.append(f"Row {i+1}: {row_sum}")
    
    output_lines.append("Column sums:")
    for j in range(cols):
        col_sum = sum(matrix[i][j] for i in range(rows))
        output_lines.append(f"Column {j+1}: {col_sum}")
    
    # Find maximum
    max_val = matrix[0][0]
    max_row, max_col = 0, 0
    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] > max_val:
                max_val = matrix[i][j]
                max_row, max_col = i, j
    
    output_lines.append(f"Maximum element: {max_val} at position ({max_row+1}, {max_col+1})")
    
    return "\n".join(input_lines), "\n".join(output_lines)

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the correct format."""
    input_lines = input_content.strip().split('\n')
    
    # Check first line format
    try:
        rows, cols = map(int, input_lines[0].split())
        assert rows >= 1 and cols >= 1, "Dimensions must be positive"
    except (ValueError, IndexError):
        return False, "First line must contain two positive integers"
    
    # Check number of lines
    if len(input_lines) != rows + 1:
        return False, f"Expected {rows + 1} lines, got {len(input_lines)}"
    
    # Check each row format
    for i in range(1, rows + 1):
        try:
            row_values = list(map(int, input_lines[i].split()))
            if len(row_values) != cols:
                return False, f"Row {i} should have {cols} elements, got {len(row_values)}"
        except ValueError:
            return False, f"Row {i} contains invalid integers"
    
    # Validate expected output format
    expected_lines = expected_content.strip().split('\n')
    required_sections = ["Matrix:", "Row sums:", "Column sums:", "Maximum element:"]
    
    content = '\n'.join(expected_lines)
    for section in required_sections:
        if section not in content:
            return False, f"Expected output missing section: {section}"
    
    return True, "Test case is valid"

# Example usage:
# input_data, expected_data = generate_test_case(3, 4)
# is_valid, message = validate_test_case(input_data, expected_data)
```
