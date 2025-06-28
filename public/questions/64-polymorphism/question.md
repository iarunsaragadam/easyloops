# Polymorphism

## Problem Statement

Create a shape area calculator that demonstrates polymorphism by calculating areas for different types of shapes. You'll implement a system where different shape classes (Circle, Rectangle, Triangle) all provide the same interface for area calculation, but each implements the calculation differently.

This problem teaches polymorphism - the ability of objects of different types to be treated as instances of the same type through a common interface, while still maintaining their specific behaviors.

## Input Format

The input consists of multiple lines:
```
Line 1: Number of shapes (n)
Next n lines: Shape type and dimensions
  - Circle: "Circle radius"
  - Rectangle: "Rectangle width height"  
  - Triangle: "Triangle base height"
```

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand polymorphism and its practical applications
- Learn to design common interfaces for different object types
- Practice method overriding and dynamic dispatch
- Implement abstract base classes or interfaces
- Experience runtime polymorphism in action

## Implementation Guidelines

### Python Example Structure:
```python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        pass
    
    @abstractmethod
    def get_shape_name(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def calculate_area(self):
        return math.pi * self.radius * self.radius
    
    def get_shape_name(self):
        return "Circle"

def solve():
    n = int(input())
    shapes = []
    
    for _ in range(n):
        line = input().strip().split()
        shape_type = line[0]
        
        if shape_type == "Circle":
            radius = float(line[1])
            shapes.append(Circle(radius))
        # Add Rectangle and Triangle classes...
    
    # Demonstrate polymorphism
    for shape in shapes:
        area = shape.calculate_area()
        print(f"{shape.get_shape_name()}: {area:.2f}")
```

### Go Example Structure:
```go
package main

import (
    "fmt"
    "math"
)

type Shape interface {
    CalculateArea() float64
    GetShapeName() string
}

type Circle struct {
    radius float64
}

func (c Circle) CalculateArea() float64 {
    return math.Pi * c.radius * c.radius
}

func (c Circle) GetShapeName() string {
    return "Circle"
}

func solve() {
    // Read input and create shape objects
    // Demonstrate polymorphism through interface
}
```

## Constraints
- Number of shapes: 1 ≤ n ≤ 100
- All dimensions are positive numbers
- Circle radius: 0 ≤ radius ≤ 1000
- Rectangle dimensions: 0 ≤ width, height ≤ 1000
- Triangle dimensions: 0 ≤ base, height ≤ 1000
- Output areas formatted to 2 decimal places

## Hints
- Use abstract base classes or interfaces to define the common shape interface
- Each shape class should implement the same methods but with different calculations
- The main loop should treat all shapes the same way (polymorphism in action)
- For Python: Use `math.pi` for circle calculations
- For Go: Use `math.Pi` for circle calculations
- Format output to exactly 2 decimal places for consistency
