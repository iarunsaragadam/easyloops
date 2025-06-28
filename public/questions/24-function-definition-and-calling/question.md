# Function Definition and Calling

## Problem Statement

Write a program that demonstrates function definition and calling by creating a shape area calculator. You need to define a function that calculates the area of different geometric shapes based on the input parameters.

Your program should:

1. **Define a function** called `calculate_area` that takes:
   - Shape type (string): "rectangle", "circle", or "triangle"
   - First dimension (float): width/radius/base depending on shape
   - Second dimension (float): height for rectangle/triangle (not needed for circle)

2. **Implement the area calculations**:
   - Rectangle: area = width × height
   - Circle: area = π × radius² (use π = 3.14159)
   - Triangle: area = 0.5 × base × height

3. **Call the function** from your main solve() function and format the output to 2 decimal places

This problem teaches the fundamental concepts of function definition, parameter passing, return values, and function calls - essential building blocks of programming.

## Input Format

The input consists of 1 line containing space-separated values:

```
Line 1: shape_type dimension1 [dimension2]
```

Where:
- `shape_type`: One of "rectangle", "circle", or "triangle"
- `dimension1`: First dimension (width for rectangle, radius for circle, base for triangle)
- `dimension2`: Second dimension (height for rectangle/triangle, omitted for circle)

## Test Cases
**Input (`input1.txt`):**
```
rectangle 5 4
```

**Expected Output (`expected1.txt`):**
```
20.00
```

**Input (`input2.txt`):**
```
circle 3
```

**Expected Output (`expected2.txt`):**
```
28.27
```

**Input (`input3.txt`):**
```
triangle 6 8
```

**Expected Output (`expected3.txt`):**
```
24.00
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅
6. Test with more cases: `cat input2.txt | python solution.py` and compare with `expected2.txt`
7. Over 100 test cases are available (input1.txt through input100+.txt) for comprehensive testing

## Learning Objectives
- Learn how to define functions with parameters
- Understand function calls and argument passing
- Practice working with return values
- Apply conditional logic within functions
- Format numerical output to specific decimal places
- Understand the separation of logic into reusable functions

## Implementation Guidelines

### Python Example Structure:
```python
def calculate_area(shape, dimension1, dimension2=0):
    """Calculate area based on shape type and dimensions."""
    if shape == "rectangle":
        return dimension1 * dimension2
    elif shape == "circle":
        return 3.14159 * dimension1 * dimension1
    elif shape == "triangle":
        return 0.5 * dimension1 * dimension2
    return 0.0

def solve():
    line = input().strip()
    parts = line.split()
    shape = parts[0]
    dimension1 = float(parts[1])
    
    if shape == "circle":
        area = calculate_area(shape, dimension1)
    else:
        dimension2 = float(parts[2])
        area = calculate_area(shape, dimension1, dimension2)
    
    print(f"{area:.2f}")
```

### Go Example Structure:
```go
func calculateArea(shape string, dimension1, dimension2 float64) float64 {
    switch shape {
    case "rectangle":
        return dimension1 * dimension2
    case "circle":
        return 3.14159 * dimension1 * dimension1
    case "triangle":
        return 0.5 * dimension1 * dimension2
    default:
        return 0.0
    }
}

func solve() {
    // Read input and parse
    // Call calculateArea function
    // Format and print result
}
```

## Constraints
- Shape type will always be one of: "rectangle", "circle", "triangle"
- Dimensions will be positive floating-point numbers between 0.1 and 1000.0
- Output should be formatted to exactly 2 decimal places
- Use π = 3.14159 for circle calculations

## Hints
- Define your function before the solve() function
- Use conditional statements (if/elif/else) to handle different shape types
- For circle, you only need one dimension (radius)
- For rectangle and triangle, you need two dimensions
- Use string formatting to ensure exactly 2 decimal places in output
- Test your function with the provided examples to verify correctness
