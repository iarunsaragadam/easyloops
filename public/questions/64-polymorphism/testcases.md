# Test Cases for Polymorphism

## Test Case Structure
This question uses a multi-line input format with shape specifications.

### Input Format Pattern:
```
Line 1: Number of shapes (n)
Next n lines: Shape specifications
  - Circle: "Circle radius"
  - Rectangle: "Rectangle width height"
  - Triangle: "Triangle base height"
```

### Output Format Pattern:
```
For each shape: "ShapeName: area" (area formatted to 2 decimal places)
```

## Test Case 1: Basic Mixed Shapes
**Input (`input.txt`):**
```
3
Circle 5
Rectangle 4 6
Triangle 8 3
```
**Expected Output (`expected.txt`):**
```
Circle: 78.54
Rectangle: 24.00
Triangle: 12.00
```
**Purpose**: Tests basic polymorphism with different shape types and standard calculations.

## Test Case 2: Edge Cases - Zero and Small Values
**Input (`input2.txt`):**
```
1
Circle 0
```
**Expected Output (`expected2.txt`):**
```
Circle: 0.00
```
**Purpose**: Tests edge case with zero radius, boundary condition handling.

## Test Case 3: Complex - Large Dataset with Decimal Values
**Input (`input3.txt`):**
```
5
Circle 10
Rectangle 5 5
Triangle 10 8
Circle 1.5
Rectangle 12.5 8.4
```
**Expected Output (`expected3.txt`):**
```
Circle: 314.16
Rectangle: 25.00
Triangle: 40.00
Circle: 7.07
Rectangle: 105.00
```
**Purpose**: Tests performance with multiple shapes, decimal inputs, and larger dataset.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer (number of shapes)
2. Each shape line must start with valid shape type: "Circle", "Rectangle", or "Triangle"
3. Circle requires 1 dimension (radius)
4. Rectangle requires 2 dimensions (width, height)
5. Triangle requires 2 dimensions (base, height)
6. All dimensions must be non-negative numbers
7. Number of shape lines must match the count in first line

### Output Format Rules:
1. Each output line format: "ShapeName: area"
2. Area must be formatted to exactly 2 decimal places
3. Use standard shape names: "Circle", "Rectangle", "Triangle"
4. No extra spaces or formatting
5. Each shape output on separate line
6. Order matches input order

### Area Calculation Formulas:
- **Circle**: π × radius²
- **Rectangle**: width × height  
- **Triangle**: 0.5 × base × height

## Language-Specific Considerations
### Python Considerations:
- Use `math.pi` for π constant
- Use `math.ceil`, `math.floor` for any rounding needs
- Format output with `f"{value:.2f}"` for 2 decimal places
- Abstract base classes from `abc` module recommended
- Handle floating point precision carefully

### Go Considerations:
- Use `math.Pi` for π constant
- Format output with `fmt.Sprintf("%.2f", value)`
- Define interfaces for shape polymorphism
- Handle floating point precision with Go's math package

## Validation Checklist
- [ ] Input has correct number of lines (n + 1)
- [ ] All shape types are valid
- [ ] All dimensions are non-negative numbers
- [ ] Output areas calculated correctly using standard formulas
- [ ] Output formatted to exactly 2 decimal places
- [ ] No extra whitespace or formatting issues
- [ ] Polymorphism is demonstrated (same interface, different implementations)

## Performance Considerations
- **Time Complexity**: O(n) where n is number of shapes
- **Space Complexity**: O(n) for storing shape objects
- Large datasets (n=100) should execute in < 1 second
- Memory usage should be minimal and proportional to input size

## Educational Value Assessment
This test suite ensures students learn:
1. **Abstract classes/interfaces**: Common shape interface
2. **Method overriding**: Different area calculations per shape
3. **Runtime polymorphism**: Same method calls, different behaviors
4. **Object-oriented design**: Proper class hierarchy
5. **Real-world application**: Shape calculations demonstrate practical polymorphism

## Automated Test Case Generation
```python
def generate_test_case(num_shapes, include_decimals=False):
    """Generate random test case with specified number of shapes"""
    import random
    
    shapes = ["Circle", "Rectangle", "Triangle"]
    lines = [str(num_shapes)]
    
    for _ in range(num_shapes):
        shape_type = random.choice(shapes)
        if shape_type == "Circle":
            radius = random.uniform(1, 100) if include_decimals else random.randint(1, 100)
            lines.append(f"Circle {radius}")
        elif shape_type == "Rectangle":
            width = random.uniform(1, 100) if include_decimals else random.randint(1, 100)
            height = random.uniform(1, 100) if include_decimals else random.randint(1, 100)
            lines.append(f"Rectangle {width} {height}")
        else:  # Triangle
            base = random.uniform(1, 100) if include_decimals else random.randint(1, 100)
            height = random.uniform(1, 100) if include_decimals else random.randint(1, 100)
            lines.append(f"Triangle {base} {height}")
    
    return "\n".join(lines)

def validate_test_case(input_content, expected_content):
    """Validate test case format and calculations"""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Validate input format
    n = int(input_lines[0])
    if len(input_lines) != n + 1:
        return False, "Input line count mismatch"
    
    # Validate expected output format
    if len(expected_lines) != n:
        return False, "Output line count mismatch"
    
    # Additional validation logic here...
    return True, "Valid test case"
```
