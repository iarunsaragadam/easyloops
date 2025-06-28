# Test Cases for Function Definition and Calling

## Test Case Structure
This question uses a 1-line input format with space-separated values representing shape type and dimensions.

### Input Format Pattern:
```
Line 1: shape_type dimension1 [dimension2]
```

Where:
- `shape_type`: "rectangle", "circle", or "triangle"
- `dimension1`: First dimension (width/radius/base)
- `dimension2`: Second dimension (height, omitted for circle)

### Output Format Pattern:
```
XX.XX
```
- Calculated area formatted to exactly 2 decimal places

## Test Case Categories (100+ Total Cases)

### Basic Test Cases (input1.txt - input30.txt)
Standard shapes with common dimensions to verify core functionality:

**Test Case 1: Rectangle**
**Input (`input1.txt`):**
```
rectangle 5 4
```
**Expected Output (`expected1.txt`):**
```
20.00
```

**Test Case 2: Circle**
**Input (`input2.txt`):**
```
circle 3
```
**Expected Output (`expected2.txt`):**
```
28.27
```

**Test Case 3: Triangle**
**Input (`input3.txt`):**
```
triangle 6 8
```
**Expected Output (`expected3.txt`):**
```
24.00
```

### Edge Cases (input31.txt - input60.txt)
Boundary conditions and special values:

**Test Case 31: Minimum dimensions**
**Input (`input31.txt`):**
```
rectangle 0.1 0.1
```
**Expected Output (`expected31.txt`):**
```
0.01
```

**Test Case 32: Unit circle**
**Input (`input32.txt`):**
```
circle 1
```
**Expected Output (`expected32.txt`):**
```
3.14
```

**Test Case 33: Large rectangle**
**Input (`input33.txt`):**
```
rectangle 1000 1000
```
**Expected Output (`expected33.txt`):**
```
1000000.00
```

### Performance Test Cases (input61.txt - input90.txt)
Large numbers and stress testing:

**Test Case 61: Maximum dimensions**
**Input (`input61.txt`):**
```
circle 1000
```
**Expected Output (`expected61.txt`):**
```
3141590.00
```

### Complex Scenarios (input91.txt - input100.txt)
Decimal precision and various combinations:

**Test Case 91: Decimal precision**
**Input (`input91.txt`):**
```
triangle 3.33 2.77
```
**Expected Output (`expected91.txt`):**
```
4.61
```

## Test Case Creation Rules

### Input Validation Rules:
1. Shape type must be exactly "rectangle", "circle", or "triangle"
2. Dimensions must be positive floating-point numbers
3. Rectangle and triangle require 2 dimensions, circle requires 1
4. Dimension values between 0.1 and 1000.0
5. Input format: space-separated values on a single line

### Output Format Rules:
1. Always format to exactly 2 decimal places
2. Use standard decimal notation (no scientific notation)
3. No trailing spaces or extra newlines
4. Use π = 3.14159 for circle calculations

## Language-Specific Considerations

### Python Considerations:
- Use `float()` for parsing dimensions
- Use `f"{value:.2f}"` for formatting output
- Handle input parsing with `split()`
- Define function before calling it

### Go Considerations:
- Use `strconv.ParseFloat()` for parsing dimensions
- Use `fmt.Printf("%.2f", value)` for formatting
- Use `strings.Fields()` or `strings.Split()` for parsing
- Use `switch` statement for shape type handling

### JavaScript Considerations:
- Use `parseFloat()` for parsing dimensions
- Use `toFixed(2)` for formatting output
- Use `split()` for input parsing
- Define function before calling it

## Test Case Distribution (100+ cases):
- **Basic Cases (1-30)**: Simple, standard inputs for each shape type
- **Edge Cases (31-60)**: Boundary values, minimum/maximum dimensions
- **Performance Cases (61-90)**: Large numbers, stress testing
- **Precision Cases (91-100+)**: Decimal precision, floating-point accuracy

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Shape type is valid ("rectangle", "circle", "triangle")
- [ ] Correct number of dimensions for each shape type
- [ ] All dimensions are positive numbers
- [ ] Output formatted to exactly 2 decimal places
- [ ] Expected output matches calculated area formula
- [ ] Test cases cover all shape types
- [ ] Edge cases include minimum and maximum values
- [ ] Performance cases test large inputs

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random test case for shape area calculation."""
    shapes = ["rectangle", "circle", "triangle"]
    shape = random.choice(shapes)
    
    if shape == "rectangle":
        width = round(random.uniform(0.1, 1000.0), 2)
        height = round(random.uniform(0.1, 1000.0), 2)
        input_content = f"{shape} {width} {height}"
        expected_area = width * height
    elif shape == "circle":
        radius = round(random.uniform(0.1, 1000.0), 2)
        input_content = f"{shape} {radius}"
        expected_area = 3.14159 * radius * radius
    else:  # triangle
        base = round(random.uniform(0.1, 1000.0), 2)
        height = round(random.uniform(0.1, 1000.0), 2)
        input_content = f"{shape} {base} {height}"
        expected_area = 0.5 * base * height
    
    expected_content = f"{expected_area:.2f}"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted and calculated."""
    try:
        parts = input_content.strip().split()
        shape = parts[0]
        
        if shape not in ["rectangle", "circle", "triangle"]:
            return False, "Invalid shape type"
        
        if shape == "circle":
            if len(parts) != 2:
                return False, "Circle should have 1 dimension"
            radius = float(parts[1])
            expected_area = 3.14159 * radius * radius
        else:
            if len(parts) != 3:
                return False, f"{shape} should have 2 dimensions"
            dim1, dim2 = float(parts[1]), float(parts[2])
            if shape == "rectangle":
                expected_area = dim1 * dim2
            else:  # triangle
                expected_area = 0.5 * dim1 * dim2
        
        calculated_output = f"{expected_area:.2f}"
        return calculated_output == expected_content.strip(), f"Expected {calculated_output}, got {expected_content.strip()}"
    
    except Exception as e:
        return False, f"Error validating test case: {str(e)}"
```
