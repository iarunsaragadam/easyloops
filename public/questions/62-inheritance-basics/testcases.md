# Test Cases for Inheritance Basics

## Test Case Structure

This question uses a **multi-line input format** where the first line specifies the number of shapes, followed by shape specifications.

### Input Format Pattern:
```
Line 1: Number of shapes (integer n)
Lines 2 to n+1: Shape specifications:
  - "rectangle width height" - Rectangle with given width and height
  - "circle radius" - Circle with given radius  
  - "triangle base height" - Triangle with given base and height
```

### Output Format Pattern:
```
For each shape, one output line:
ShapeType: area.2f
```
- Shape types: "Rectangle", "Circle", "Triangle" (capitalized)
- Areas formatted to exactly 2 decimal places
- Format: `{ShapeType}: {area:.2f}`

## Test Case 1: Basic Shapes

**Input (`input.txt`):**
```
3
rectangle 5 4
circle 3
triangle 6 8
```

**Expected Output (`expected.txt`):**
```
Rectangle: 20.00
Circle: 28.27
Triangle: 24.00
```

**Explanation:**
- Rectangle: 5 × 4 = 20.00
- Circle: π × 3² = π × 9 ≈ 28.27
- Triangle: (6 × 8) / 2 = 24.00

## Test Case 2: Edge Cases and Small Values

**Input (`input2.txt`):**
```
4
rectangle 0.1 0.1
circle 0.5
triangle 1 1
rectangle 10 10
```

**Expected Output (`expected2.txt`):**
```
Rectangle: 0.01
Circle: 0.79
Triangle: 0.50
Rectangle: 100.00
```

**Explanation:**
- Tests very small dimensions (0.1 × 0.1 = 0.01)
- Small circle (π × 0.5² ≈ 0.79)
- Minimal triangle (1 × 1 / 2 = 0.50)
- Perfect square rectangle (10 × 10 = 100.00)

## Test Case 3: Performance and Large Values

**Input (`input3.txt`):**
```
5
rectangle 100 200
circle 50
triangle 80 120
rectangle 999.9 500.5
circle 100
```

**Expected Output (`expected3.txt`):**
```
Rectangle: 20000.00
Circle: 7853.98
Triangle: 4800.00
Rectangle: 500449.95
Circle: 31415.93
```

**Explanation:**
- Large rectangle: 100 × 200 = 20,000
- Large circle: π × 50² = π × 2500 ≈ 7853.98
- Large triangle: (80 × 120) / 2 = 4800
- Maximum dimensions: 999.9 × 500.5 ≈ 500,449.95
- Very large circle: π × 100² = π × 10000 ≈ 31,415.93

## Test Case Creation Rules

### Input Validation Rules:
1. Number of shapes must be positive integer (1 ≤ n ≤ 100)
2. Shape types must be "rectangle", "circle", or "triangle" (case-insensitive)
3. All dimensions must be positive real numbers (0.1 ≤ dimension ≤ 1000.0)
4. Rectangle needs exactly 2 dimensions (width, height)
5. Circle needs exactly 1 dimension (radius)
6. Triangle needs exactly 2 dimensions (base, height)

### Output Format Rules:
1. Each shape produces exactly one output line
2. Shape type names are capitalized ("Rectangle", "Circle", "Triangle")
3. Areas are formatted to exactly 2 decimal places using standard rounding
4. Format pattern: `{ShapeType}: {area:.2f}`
5. No trailing spaces or extra newlines

### Area Calculation Specifications:
- **Rectangle**: area = width × height
- **Circle**: area = π × radius² (use π ≈ 3.14159265359 or math.pi)
- **Triangle**: area = (base × height) / 2

## Language-Specific Considerations

### Python Considerations:
- Use `math.pi` for precise π value
- Use `@abstractmethod` decorator for abstract methods
- Implement `ABC` (Abstract Base Class) properly
- Use `super().__init__()` for constructor inheritance
- Format output with `f"{area:.2f}"`

### Go Considerations:
- Use `math.Pi` constant for π value
- Implement interfaces properly for polymorphism
- Use `fmt.Sprintf("%.2f", area)` for formatting
- Handle input parsing with `strings.Split()` and `strconv.ParseFloat()`

### Common Implementation Points:
- Inheritance hierarchy: Shape → Rectangle/Circle/Triangle
- Abstract/interface method: `calculate_area()`
- Polymorphic behavior: same interface, different implementations
- Constructor chaining: base class initialization
- Method overriding: each shape has its own area calculation

## Validation Checklist

- [ ] Input format follows specification (n, then n shape lines)
- [ ] All shape types are recognized and handled
- [ ] Area calculations are mathematically correct
- [ ] Output format matches exactly (capitalization, decimal places)
- [ ] Inheritance relationships are properly implemented
- [ ] Abstract methods are correctly overridden
- [ ] Polymorphism is demonstrated (same interface, different behavior)
- [ ] Constructor inheritance works properly
- [ ] Edge cases handled (small dimensions, large numbers)
- [ ] Performance adequate for maximum input size (100 shapes)

## Automated Test Case Generation

```python
import math
import random

def generate_test_case(num_shapes=5, seed=None):
    """Generate a random test case with specified number of shapes"""
    if seed:
        random.seed(seed)
    
    shapes = []
    expected = []
    
    shape_types = ["rectangle", "circle", "triangle"]
    
    for _ in range(num_shapes):
        shape_type = random.choice(shape_types)
        
        if shape_type == "rectangle":
            width = round(random.uniform(0.1, 1000), 1)
            height = round(random.uniform(0.1, 1000), 1)
            shapes.append(f"rectangle {width} {height}")
            area = width * height
            expected.append(f"Rectangle: {area:.2f}")
            
        elif shape_type == "circle":
            radius = round(random.uniform(0.1, 1000), 1)
            shapes.append(f"circle {radius}")
            area = math.pi * radius * radius
            expected.append(f"Circle: {area:.2f}")
            
        elif shape_type == "triangle":
            base = round(random.uniform(0.1, 1000), 1)
            height = round(random.uniform(0.1, 1000), 1)
            shapes.append(f"triangle {base} {height}")
            area = (base * height) / 2
            expected.append(f"Triangle: {area:.2f}")
    
    input_content = f"{num_shapes}\n" + "\n".join(shapes)
    expected_content = "\n".join(expected)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the required format"""
    lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Check number of shapes matches
    n = int(lines[0])
    if len(lines) != n + 1:
        return False, "Number of shape lines doesn't match declared count"
    
    if len(expected_lines) != n:
        return False, "Number of output lines doesn't match input count"
    
    # Validate each shape specification
    for i in range(1, n + 1):
        parts = lines[i].split()
        shape_type = parts[0].lower()
        
        if shape_type not in ["rectangle", "circle", "triangle"]:
            return False, f"Invalid shape type: {shape_type}"
        
        if shape_type == "rectangle" and len(parts) != 3:
            return False, "Rectangle must have exactly 2 dimensions"
        elif shape_type == "circle" and len(parts) != 2:
            return False, "Circle must have exactly 1 dimension"
        elif shape_type == "triangle" and len(parts) != 3:
            return False, "Triangle must have exactly 2 dimensions"
        
        # Validate dimensions are positive numbers
        try:
            dims = [float(x) for x in parts[1:]]
            if any(d <= 0 for d in dims):
                return False, "All dimensions must be positive"
        except ValueError:
            return False, "Invalid dimension format"
    
    return True, "Test case is valid"
```
