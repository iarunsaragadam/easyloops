# Test Cases for Interfaces

## Test Case Structure
This question uses a multi-line input format where the first line specifies the number of shapes, followed by shape definitions.

### Input Format Pattern:
```
Line 1: n (number of shapes)
Lines 2 to n+1: shape_type parameters
```

### Output Format Pattern:
```
For each valid shape: ShapeName: Area=XX.XX, Perimeter=XX.XX
For invalid shapes: ERROR: [specific error message]
Total Area: XX.XX
Total Perimeter: XX.XX
```

## Test Case 1: Basic Functionality
**Purpose**: Test basic shape calculations with valid inputs
**Input (`input.txt`):**
```
3
circle 5
rectangle 4 6
triangle 3 4 5
```
**Expected Output (`expected.txt`):**
```
Circle: Area=78.54, Perimeter=31.42
Rectangle: Area=24.00, Perimeter=20.00
Triangle: Area=6.00, Perimeter=12.00
Total Area: 108.54
Total Perimeter: 63.42
```

## Test Case 2: Error Handling and Edge Cases
**Purpose**: Test input validation and error handling
**Input (`input2.txt`):**
```
4
circle 0
rectangle -2 3
triangle 1 2 5
square 4
```
**Expected Output (`expected2.txt`):**
```
ERROR: Radius must be positive
ERROR: Width and height must be positive
ERROR: Invalid triangle: sides don't satisfy triangle inequality
ERROR: Unknown shape type 'square'
```

## Test Case 3: Complex Calculations with Decimals
**Purpose**: Test precision handling and larger calculations
**Input (`input3.txt`):**
```
5
circle 10.5
rectangle 12.25 8.75
triangle 13 14 15
circle 2.5
rectangle 5 5
```
**Expected Output (`expected3.txt`):**
```
Circle: Area=346.36, Perimeter=65.97
Rectangle: Area=107.19, Perimeter=42.00
Triangle: Area=84.00, Perimeter=42.00
Circle: Area=19.63, Perimeter=15.71
Rectangle: Area=25.00, Perimeter=20.00
Total Area: 582.18
Total Perimeter: 185.68
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Shape Count**: Must be a positive integer (1-100)
2. **Shape Types**: Only "circle", "rectangle", "triangle" are valid
3. **Parameters**: All numeric parameters must be positive for valid shapes
4. **Triangle Validation**: Must satisfy triangle inequality (sum of any two sides > third side)
5. **Format**: Each shape definition must be on a separate line with correct parameter count

### Output Format Rules:
1. **Valid Shapes**: Format as "ShapeName: Area=XX.XX, Perimeter=XX.XX"
2. **Invalid Shapes**: Format as "ERROR: [descriptive error message]"
3. **Decimal Precision**: Always show 2 decimal places for calculations
4. **Totals**: Only display totals if at least one valid shape exists
5. **Order**: Process and output shapes in the order they appear in input

### Mathematical Formulas:
- **Circle**: Area = π × r², Perimeter = 2 × π × r
- **Rectangle**: Area = width × height, Perimeter = 2 × (width + height)
- **Triangle**: Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2, Perimeter = a + b + c

## Language-Specific Considerations

### Python Considerations:
- Use `ABC` and `abstractmethod` for interface definition
- Handle floating-point precision with proper formatting
- Use `math.pi` and `math.sqrt` for calculations
- Implement proper exception handling for invalid inputs

### Go Considerations:
- Define interface with method signatures
- Use `math.Pi` and `math.Sqrt` for calculations
- Implement error handling with proper error types
- Use struct types to implement the interface

### JavaScript Considerations:
- Use class-based approach or prototypal inheritance
- Handle floating-point arithmetic precision
- Use `Math.PI` and `Math.sqrt` for calculations
- Implement proper error handling

## Performance Considerations
- **Time Complexity**: O(n) where n is the number of shapes
- **Space Complexity**: O(n) for storing shape objects
- **Edge Cases**: Handle empty input, malformed input, extreme values
- **Error Recovery**: Continue processing remaining shapes after encountering errors

## Validation Checklist
- [ ] All valid shapes calculate area and perimeter correctly
- [ ] Error messages are descriptive and specific
- [ ] Totals are calculated only when valid shapes exist
- [ ] Decimal formatting is consistent (2 decimal places)
- [ ] Input validation catches all edge cases
- [ ] Triangle inequality is properly validated
- [ ] Unknown shape types are handled gracefully
- [ ] Negative and zero values are rejected appropriately

## Interface Design Learning Goals
- [ ] Understand abstract method definition
- [ ] Learn polymorphic behavior through interfaces
- [ ] Practice error handling in object-oriented design
- [ ] Apply single responsibility principle
- [ ] Demonstrate code extensibility through interfaces
- [ ] Use composition and delegation patterns

## Automated Test Case Generation
```python
import random
import math

def generate_basic_test_case():
    """Generate a basic test case with valid shapes"""
    shapes = []
    n = random.randint(3, 8)
    
    for _ in range(n):
        shape_type = random.choice(['circle', 'rectangle', 'triangle'])
        if shape_type == 'circle':
            radius = round(random.uniform(1, 20), 1)
            shapes.append(f"circle {radius}")
        elif shape_type == 'rectangle':
            width = round(random.uniform(1, 15), 1)
            height = round(random.uniform(1, 15), 1)
            shapes.append(f"rectangle {width} {height}")
        else:  # triangle
            # Generate valid triangle
            a = random.uniform(5, 15)
            b = random.uniform(5, 15)
            c = random.uniform(abs(a-b)+0.1, a+b-0.1)
            shapes.append(f"triangle {a:.1f} {b:.1f} {c:.1f}")
    
    return f"{n}\n" + "\n".join(shapes)

def validate_test_case(input_content, expected_content):
    """Validate that test case input produces expected output"""
    # Implementation would test the solution against expected output
    pass
```
