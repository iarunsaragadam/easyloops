# Inheritance Basics

## Problem Statement

Write a program that demonstrates inheritance principles by implementing a shape hierarchy. Your program should calculate the area of different geometric shapes using inheritance, method overriding, and polymorphism.

Your program should:

1. **Create a base Shape class** with:
   - A constructor that takes a shape type
   - An abstract method `calculate_area()` that must be implemented by subclasses
   - A method `display_info()` that shows the shape type and calculated area

2. **Create derived classes** for:
   - **Rectangle**: inherits from Shape, calculates area as width × height
   - **Circle**: inherits from Shape, calculates area as π × radius²
   - **Triangle**: inherits from Shape, calculates area as (base × height) / 2

3. **Process input data** to create appropriate shape objects and display their information

4. **Demonstrate polymorphism** by treating all shapes uniformly while calling their specific area calculation methods

## Input Format

The input consists of multiple lines:
```
Line 1: Number of shapes (n)
Line 2 to n+1: Shape specifications in format:
  - "rectangle width height" (e.g., "rectangle 5 4")
  - "circle radius" (e.g., "circle 3")
  - "triangle base height" (e.g., "triangle 6 8")
```

## Test Cases

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

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand inheritance concepts and class hierarchies
- Learn to create abstract base classes and implement abstract methods
- Practice method overriding in derived classes
- Implement polymorphism by treating objects uniformly through base class interface
- Demonstrate constructor inheritance and super() calls
- Apply inheritance to solve real-world problems (geometric calculations)

## Implementation Guidelines

### Python Example Structure:
```python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    def __init__(self, shape_type):
        self.shape_type = shape_type
    
    @abstractmethod
    def calculate_area(self):
        pass
    
    def display_info(self):
        area = self.calculate_area()
        return f"{self.shape_type}: {area:.2f}"

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height
    
    def calculate_area(self):
        return self.width * self.height

# Implement Circle and Triangle classes similarly...

def solve():
    n = int(input().strip())
    for _ in range(n):
        # Parse input and create appropriate shape
        # Call display_info() for each shape
        pass
```

### Go Example Structure:
```go
package main

import (
    "fmt"
    "math"
    "strconv"
    "strings"
)

type Shape interface {
    CalculateArea() float64
    GetShapeType() string
    DisplayInfo() string
}

type Rectangle struct {
    width, height float64
}

func (r Rectangle) CalculateArea() float64 {
    return r.width * r.height
}

func (r Rectangle) GetShapeType() string {
    return "Rectangle"
}

func (r Rectangle) DisplayInfo() string {
    return fmt.Sprintf("Rectangle: %.2f", r.CalculateArea())
}

// Implement Circle and Triangle similarly...

func solve() {
    var n int
    fmt.Scan(&n)
    
    for i := 0; i < n; i++ {
        // Parse input and create appropriate shape
        // Call DisplayInfo() for each shape
    }
}
```

## Constraints

- Number of shapes: 1 ≤ n ≤ 100
- Shape dimensions: 0.1 ≤ dimension ≤ 1000.0
- All dimensions are positive real numbers
- Output areas should be formatted to 2 decimal places
- Shape types are case-insensitive but output should use proper capitalization
- Use π ≈ 3.14159 for circle calculations (or math.pi/Math.PI)

## Hints

- Start by defining the abstract base class with required methods
- Use inheritance to create specialized classes for each shape type
- Override the `calculate_area()` method in each derived class with the appropriate formula
- Use polymorphism to treat all shapes uniformly in your main processing loop
- Remember to call the parent constructor using `super().__init__()` in Python or appropriate initialization in other languages
- For precise area calculations, use the math library's pi constant
- Parse input carefully to extract shape type and dimensions correctly
