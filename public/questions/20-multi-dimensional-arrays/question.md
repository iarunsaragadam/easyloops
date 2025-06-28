# Multi-dimensional Arrays

## Problem Statement

Write a program that demonstrates multi-dimensional array operations by working with a 2D matrix. Your program should read matrix dimensions and elements, then perform several basic operations to help you understand how to work with multi-dimensional data structures.

Your program should:

1. **Read matrix dimensions and elements**:
   - Read the number of rows and columns
   - Read all matrix elements row by row

2. **Display the matrix**:
   - Print the matrix in a formatted grid layout

3. **Calculate row sums**:
   - Compute and display the sum of each row
   - Label each row (Row 1, Row 2, etc.)

4. **Calculate column sums**:
   - Compute and display the sum of each column
   - Label each column (Column 1, Column 2, etc.)

5. **Find the maximum element**:
   - Locate the largest element in the matrix
   - Display its value and position (using 1-based indexing)

This problem teaches fundamental concepts of multi-dimensional arrays including initialization, traversal, and basic operations.

## Input Format

The input consists of (rows + 1) lines:

```
Line 1: Two integers (rows cols) - dimensions of the matrix
Line 2: First row elements (col1 col2 ... colN)
Line 3: Second row elements (col1 col2 ... colN)
...
Line (rows+1): Last row elements (col1 col2 ... colN)
```

## Test Cases

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

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand multi-dimensional array declaration and initialization
- Learn to read matrix data from standard input in row-major order
- Practice nested loops for 2D array traversal
- Implement basic matrix operations (row sums, column sums)
- Understand coordinate systems and position indexing in matrices
- Learn to find maximum/minimum elements in 2D structures
- Practice formatted output for matrix display

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Read matrix dimensions
    rows, cols = map(int, input().split())
    
    # Initialize and read matrix
    matrix = []
    for i in range(rows):
        row = list(map(int, input().split()))
        matrix.append(row)
    
    # Print matrix
    print("Matrix:")
    for row in matrix:
        print(" ".join(map(str, row)))
    
    # Calculate row sums
    print("Row sums:")
    for i, row in enumerate(matrix):
        row_sum = sum(row)
        print(f"Row {i+1}: {row_sum}")
    
    # Calculate column sums
    print("Column sums:")
    for j in range(cols):
        col_sum = sum(matrix[i][j] for i in range(rows))
        print(f"Column {j+1}: {col_sum}")
    
    # Find maximum element
    max_val = matrix[0][0]
    max_row, max_col = 0, 0
    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] > max_val:
                max_val = matrix[i][j]
                max_row, max_col = i, j
    
    print(f"Maximum element: {max_val} at position ({max_row+1}, {max_col+1})")
```

### Go Example Structure:
```go
func solve() {
    // Read matrix dimensions
    scanner.Scan()
    dims := strings.Fields(scanner.Text())
    rows, _ := strconv.Atoi(dims[0])
    cols, _ := strconv.Atoi(dims[1])
    
    // Initialize and read matrix
    matrix := make([][]int, rows)
    for i := 0; i < rows; i++ {
        matrix[i] = make([]int, cols)
        scanner.Scan()
        values := strings.Fields(scanner.Text())
        for j := 0; j < cols; j++ {
            matrix[i][j], _ = strconv.Atoi(values[j])
        }
    }
    
    // Print matrix
    fmt.Println("Matrix:")
    for _, row := range matrix {
        for j, val := range row {
            if j > 0 {
                fmt.Print(" ")
            }
            fmt.Print(val)
        }
        fmt.Println()
    }
    
    // Continue with row sums, column sums, and maximum element...
}
```

## Constraints

- Matrix dimensions: 1 ≤ rows, cols ≤ 100
- Element values: -1000 ≤ element ≤ 1000
- Output format must match exactly (including spacing and labels)
- Use 1-based indexing for position reporting
- Handle both square and rectangular matrices

## Hints

- Use nested loops for 2D array operations - outer loop for rows, inner loop for columns
- Remember that matrix[i][j] means row i, column j
- For row sums, fix the row index and sum across columns
- For column sums, fix the column index and sum across rows
- Keep track of both value and position when finding maximum
- Python: Use `map(int, input().split())` to read multiple integers from one line
- Go: Use `strings.Fields()` to split input lines into separate values
- Pay attention to 1-based vs 0-based indexing when reporting positions
