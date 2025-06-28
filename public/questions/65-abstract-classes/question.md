# Shape Calculator with Abstract Classes

## Problem Statement

You are building a geometry calculator system that can compute the area and perimeter of different shapes. To ensure consistency and enforce proper design patterns, you must implement this system using abstract classes.

Create an abstract `Shape` class that defines the interface for all geometric shapes, then implement concrete classes for Rectangle, Circle, and Triangle. Your program should read shape specifications from input and calculate their area and perimeter.

This problem demonstrates real-world use of abstract classes in object-oriented design, where you define a common interface that all subclasses must implement, ensuring consistency across different shape implementations.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of shapes, 1 ≤ N ≤ 1000)
Next N lines: Each contains shape type and dimensions
  - Rectangle: "rectangle width height"
  - Circle: "circle radius"
  - Triangle: "triangle side1 side2 side3"
```

All dimensions are positive real numbers with up to 2 decimal places.

## Output Format

For each shape, print one line in the format:
```
Area: X.XX Perimeter: Y.YY
```

Where X.XX and Y.YY are the area and perimeter rounded to 2 decimal places.

## Test Cases

**Basic Test Case (`input.txt`):**
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

**Edge Case (`input2.txt`):**
```
1
circle 1
```

**Expected Output (`expected2.txt`):**
```
Area: 3.14 Perimeter: 6.28
```

**Performance Test Case (`input3.txt`):**
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master abstract classes and abstract methods in object-oriented programming
- Understand the Template Method pattern and polymorphism
- Practice implementing concrete classes from abstract base classes
- Learn factory pattern for object creation based on runtime input
- Apply mathematical formulas (area, perimeter) in programming context
- Handle floating-point formatting and precision requirements

## Implementation Guidelines

### Python Example Structure:
```python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        # Rectangle area = width × height
        return self.width * self.height
    
    def perimeter(self):
        # Rectangle perimeter = 2(width + height)
        return 2 * (self.width + self.height)

def solve():
    n = int(input().strip())
    # Process each shape and calculate area/perimeter
    # Use factory pattern to create appropriate shape objects
```

### Go Example Structure:
```go
import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
    Perimeter() float64
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

func solve() {
    var n int
    fmt.Scan(&n)
    // Process each shape and calculate area/perimeter
}
```

## Constraints
- 1 ≤ N ≤ 1000 (number of shapes)
- All dimensions are positive real numbers: 0.01 ≤ dimension ≤ 1000.00
- Triangle sides form valid triangles (satisfy triangle inequality)
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Start Simple:** Begin by defining the abstract Shape class with area() and perimeter() methods
- **Mathematical Formulas:** 
  - Rectangle: Area = width × height, Perimeter = 2(width + height)
  - Circle: Area = πr², Perimeter = 2πr
  - Triangle: Use Heron's formula for area: A = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2
- **Factory Pattern:** Create a function that reads shape type and creates the appropriate object
- **Formatting:** Use string formatting to ensure exactly 2 decimal places in output
- **Abstract Classes:** In Python, use `abc` module; in Go, use interfaces
- **Polymorphism:** Store all shapes in a list/array and call methods uniformly
