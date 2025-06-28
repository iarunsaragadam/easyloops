# Test Cases for Abstract Classes - Shape Calculator

## Test Case Structure
This question uses a multi-line input format with shape specifications.

### Input Format Pattern:
```
Line 1: N (number of shapes)
Next N lines: shape_type dimensions
  - rectangle width height
  - circle radius
  - triangle side1 side2 side3
```

### Output Format Pattern:
```
Area: X.XX Perimeter: Y.YY
(one line per shape)
```

## Test Case 1: Basic - Multiple Shape Types
**Input (`input.txt`):**
```
3
rectangle 4 5
circle 3
triangle 3 4 5
```
**Expected Output (`expected.txt`):**
```
Area: 20.00 Perimeter: 18.00
Area: 28.27 Perimeter: 18.85
Area: 6.00 Perimeter: 12.00
```
**Purpose:** Tests basic functionality with all three shape types using simple integer dimensions.

## Test Case 2: Edge - Single Shape, Unit Values
**Input (`input2.txt`):**
```
1
circle 1
```
**Expected Output (`expected2.txt`):**
```
Area: 3.14 Perimeter: 6.28
```
**Purpose:** Tests edge case with minimal input (N=1) and unit circle for mathematical precision.

## Test Case 3: Performance - Multiple Shapes with Varied Dimensions
**Input (`input3.txt`):**
```
5
rectangle 10 20
circle 5
triangle 6 8 10
rectangle 1 1
circle 0.5
```
**Expected Output (`expected3.txt`):**
```
Area: 200.00 Perimeter: 60.00
Area: 78.54 Perimeter: 31.42
Area: 24.00 Perimeter: 24.00
Area: 1.00 Perimeter: 4.00
Area: 0.79 Perimeter: 3.14
```
**Purpose:** Tests performance with varied dimensions including decimal values and multiple instances of same shape type.

## Test Case Creation Rules

### Input Validation Rules:
1. First line contains positive integer N (1 ≤ N ≤ 1000)
2. Each shape line starts with valid shape type: "rectangle", "circle", or "triangle"
3. Rectangle: followed by two positive numbers (width, height)
4. Circle: followed by one positive number (radius)
5. Triangle: followed by three positive numbers that satisfy triangle inequality
6. All dimensions are positive real numbers (0.01 ≤ dimension ≤ 1000.00)
7. Numbers can have up to 2 decimal places

### Output Format Rules:
1. Each line follows exact format: "Area: X.XX Perimeter: Y.YY"
2. Numbers are formatted to exactly 2 decimal places
3. Use proper mathematical formulas:
   - Rectangle: Area = width × height, Perimeter = 2(width + height)
   - Circle: Area = πr², Perimeter = 2πr
   - Triangle: Area using Heron's formula, Perimeter = sum of sides
4. No extra whitespace or formatting

### Mathematical Formulas Used:
- **Rectangle:** Area = w × h, Perimeter = 2(w + h)
- **Circle:** Area = π × r², Perimeter = 2 × π × r
- **Triangle:** Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2, Perimeter = a + b + c

## Language-Specific Considerations

### Python Considerations:
- Use `abc` module for abstract base classes
- Import `math` module for π and square root
- Use f-strings or format() for 2-decimal precision: `f"{value:.2f}"`
- Abstract methods must be decorated with `@abstractmethod`
- Subclasses must implement all abstract methods

### Go Considerations:
- Use interfaces to define abstract behavior
- Import `math` package for mathematical functions
- Use `fmt.Sprintf("%.2f", value)` for 2-decimal formatting
- Interface methods are automatically abstract
- Concrete types implement interface methods

### JavaScript Considerations:
- Use class syntax with methods that throw errors for abstract behavior
- Use `Math.PI` and `Math.sqrt()` for calculations
- Use `toFixed(2)` for 2-decimal formatting
- Check prototype-based inheritance for abstract pattern

## Edge Cases Coverage

### Boundary Conditions:
- Single shape (N=1)
- Maximum shapes (N=1000)
- Minimum dimensions (0.01)
- Maximum dimensions (1000.00)
- Unit values (1.0) for mathematical verification
- Perfect squares and known geometric values

### Mathematical Edge Cases:
- Equilateral triangles (all sides equal)
- Right triangles (3-4-5, 5-12-13)
- Unit circle (radius = 1)
- Square rectangles (width = height)
- Small decimal values testing precision

## Validation Checklist
- [ ] Input has exactly N+1 lines (first line + N shape lines)
- [ ] Each shape type is valid: rectangle, circle, or triangle
- [ ] All dimensions are positive numbers
- [ ] Triangle sides satisfy triangle inequality: a + b > c, a + c > b, b + c > a
- [ ] Output has exactly N lines
- [ ] Each output line follows format: "Area: X.XX Perimeter: Y.YY"
- [ ] All numbers formatted to exactly 2 decimal places
- [ ] Mathematical calculations are correct

## Automated Test Case Generation
```python
import random
import math

def generate_random_rectangle():
    width = round(random.uniform(0.5, 100), 2)
    height = round(random.uniform(0.5, 100), 2)
    return f"rectangle {width} {height}"

def generate_random_circle():
    radius = round(random.uniform(0.5, 50), 2)
    return f"circle {radius}"

def generate_random_triangle():
    # Generate valid triangle using triangle inequality
    a = round(random.uniform(1, 50), 2)
    b = round(random.uniform(1, 50), 2)
    c = round(random.uniform(abs(a-b) + 0.1, a + b - 0.1), 2)
    return f"triangle {a} {b} {c}"

def calculate_expected_output(shapes):
    results = []
    for shape_line in shapes:
        parts = shape_line.split()
        shape_type = parts[0]
        
        if shape_type == "rectangle":
            w, h = float(parts[1]), float(parts[2])
            area = w * h
            perimeter = 2 * (w + h)
        elif shape_type == "circle":
            r = float(parts[1])
            area = math.pi * r * r
            perimeter = 2 * math.pi * r
        elif shape_type == "triangle":
            a, b, c = float(parts[1]), float(parts[2]), float(parts[3])
            s = (a + b + c) / 2
            area = math.sqrt(s * (s - a) * (s - b) * (s - c))
            perimeter = a + b + c
        
        results.append(f"Area: {area:.2f} Perimeter: {perimeter:.2f}")
    
    return results

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate structure
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    # Validate each shape
    shapes = lines[1:n+1]
    for shape_line in shapes:
        parts = shape_line.split()
        assert parts[0] in ["rectangle", "circle", "triangle"], f"Invalid shape: {parts[0]}"
        
        if parts[0] == "rectangle":
            assert len(parts) == 3, "Rectangle needs width and height"
            w, h = float(parts[1]), float(parts[2])
            assert w > 0 and h > 0, "Dimensions must be positive"
        elif parts[0] == "circle":
            assert len(parts) == 2, "Circle needs radius"
            r = float(parts[1])
            assert r > 0, "Radius must be positive"
        elif parts[0] == "triangle":
            assert len(parts) == 4, "Triangle needs three sides"
            a, b, c = float(parts[1]), float(parts[2]), float(parts[3])
            assert a > 0 and b > 0 and c > 0, "Sides must be positive"
            assert a + b > c and a + c > b and b + c > a, "Triangle inequality violated"
    
    # Validate expected output format
    expected_lines = expected_content.strip().split('\n')
    assert len(expected_lines) == n, f"Expected {n} output lines"
    
    for line in expected_lines:
        assert line.startswith("Area: ") and " Perimeter: " in line, "Invalid output format"
    
    return True
```
