# Interfaces

## Problem Statement

You are tasked with building a **Shape Calculator** that demonstrates the power of interfaces in object-oriented programming. The calculator should work with different types of shapes (Circle, Rectangle, Triangle) through a common interface, showcasing polymorphism and abstraction.

Your program should:
1. Accept shape definitions as input
2. Calculate area and perimeter for each shape using interface methods
3. Handle invalid inputs gracefully with appropriate error messages
4. Display individual shape calculations and total calculations

This problem teaches how interfaces enable code reusability, maintainability, and extensibility by defining common behavior that different classes can implement in their own way.

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of shapes to process)
Lines 2 to n+1: shape_type parameters
```

**Shape Types and Parameters:**
- `circle radius` - Circle with given radius
- `rectangle width height` - Rectangle with given width and height  
- `triangle side1 side2 side3` - Triangle with three sides

**Example:**
```
3
circle 5
rectangle 4 6
triangle 3 4 5
```

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand how interfaces define contracts for classes
- Learn to implement polymorphism through common interfaces
- Practice abstract method definition and implementation
- Apply interface-based design patterns
- Handle errors gracefully in interface implementations
- Use interfaces to enable code extensibility and maintainability

## Implementation Guidelines

### Python Example Structure:
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass
    
    @abstractmethod
    def get_name(self) -> str:
        pass

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        # Implement circle area calculation
        pass
    
    def perimeter(self) -> float:
        # Implement circle perimeter calculation
        pass
    
    def get_name(self) -> str:
        return "Circle"

def solve():
    # Read input and process shapes
    # Use polymorphism to handle different shape types
    pass
```

### Go Example Structure:
```go
type Shape interface {
    Area() float64
    Perimeter() float64
    GetName() string
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    // Implement circle area calculation
    return 0
}

func (c Circle) Perimeter() float64 {
    // Implement circle perimeter calculation
    return 0
}

func (c Circle) GetName() string {
    return "Circle"
}

func solve() {
    // Read input and process shapes
    // Use interface to handle different shape types
}
```

## Constraints
- 1 ≤ n ≤ 100 (number of shapes)
- All numeric values are positive for valid shapes
- Radius, width, height, and side lengths: 0.1 ≤ value ≤ 1000.0
- Triangle sides must satisfy triangle inequality theorem
- Areas and perimeters should be formatted to 2 decimal places
- Handle invalid inputs with appropriate error messages

## Hints
- **Start Simple**: Begin with the Shape interface/abstract class defining common methods
- **Implement Gradually**: Create one concrete shape class at a time (Circle, Rectangle, Triangle)
- **Use Polymorphism**: Store all shapes in a collection of Shape interface references
- **Error Handling**: Validate inputs and handle edge cases (negative values, invalid triangles)
- **Mathematical Formulas**: 
  - Circle: Area = πr², Perimeter = 2πr
  - Rectangle: Area = width × height, Perimeter = 2(width + height)
  - Triangle: Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2 (Heron's formula)
- **Interface Benefits**: Notice how easy it becomes to add new shape types without modifying existing code
