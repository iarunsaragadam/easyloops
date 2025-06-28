# Decorators and Function Composition

## Problem Statement

Build a function pipeline system that demonstrates the power of Python decorators and function composition. Your task is to create a pipeline that applies a series of mathematical operations to an initial value using decorator-based function composition.

In this problem, you'll implement a system where:

1. You start with an initial integer value
2. You apply a sequence of mathematical operations in order
3. Each operation is implemented as a decorator that transforms function results
4. The operations are composed together to create a single pipeline function
5. The final result is the value after applying all operations in sequence

**Available Operations:**
- `add X`: Add X to the current value
- `multiply X`: Multiply current value by X
- `square`: Square the current value (value * value)
- `negate`: Negate the current value (-value)
- `abs`: Take the absolute value of the current value

**Real-world Applications:**
- Data transformation pipelines in ETL systems
- Image processing filters applied in sequence
- Mathematical function composition in scientific computing
- Middleware chains in web frameworks
- Signal processing pipeline design

## Input Format

The input consists of multiple lines:
```
Line 1: Initial integer value
Line 2: Number of operations n (0 ≤ n ≤ 100)
Next n lines: Operation specifications in format "operation_type [parameter]"
```

**Operation Format:**
- `add X`: where X is an integer (-1000 ≤ X ≤ 1000)
- `multiply X`: where X is an integer (-100 ≤ X ≤ 100, X ≠ 0)
- `square`: no parameter needed
- `negate`: no parameter needed  
- `abs`: no parameter needed

## Test Cases

**Input (`input1.txt`):**
```
5
3
add 10
multiply 2
square
```

**Expected Output (`expected1.txt`):**
```
900
```

**Explanation:** Start with 5 → add 10 = 15 → multiply by 2 = 30 → square = 900

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master Python decorator syntax and semantics
- Understand function composition principles and implementation
- Learn to create higher-order functions that modify behavior
- Practice building reusable, composable function components
- Develop skills in functional programming paradigms
- Understand closure concepts and variable capture in decorators
- Learn to design clean, maintainable pipeline architectures

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Read input
    initial_value = int(input().strip())
    n = int(input().strip())
    
    # Define your decorators here
    def add_decorator(x):
        def decorator(func):
            def wrapper(*args, **kwargs):
                result = func(*args, **kwargs)
                return result + x
            return wrapper
        return decorator
    
    def multiply_decorator(x):
        def decorator(func):
            def wrapper(*args, **kwargs):
                result = func(*args, **kwargs)
                return result * x
            return wrapper
        return decorator
    
    # Add more decorators...
    
    # Build and apply composition
    # Your implementation here
```

### Key Concepts to Implement:
1. **Parameterized Decorators**: Functions that return decorators with captured parameters
2. **Function Composition**: Combining multiple decorators into a single pipeline
3. **Identity Function**: Base function that returns its input unchanged
4. **Decorator Application Order**: Understanding how decorators stack and execute

### Go Example Structure:
```go
// Note: Go doesn't have decorators like Python, but you can implement
// function composition using higher-order functions
func solve() {
    // Read input
    var initialValue int
    fmt.Scan(&initialValue)
    
    var n int
    fmt.Scan(&n)
    
    // Define function type
    type IntFunc func(int) int
    
    // Create composition of functions
    // Your implementation here
}
```

## Constraints
- Initial value: -10,000 ≤ initial_value ≤ 10,000
- Number of operations: 0 ≤ n ≤ 100
- Add parameter: -1,000 ≤ X ≤ 1,000
- Multiply parameter: -100 ≤ X ≤ 100, X ≠ 0
- Intermediate results may exceed standard integer ranges
- Final result must fit in a 64-bit signed integer
- Operations are applied in the order they appear in input
- Empty operation sequence should return the initial value unchanged

## Hints
- **Start Simple**: Begin with basic decorators for add and multiply operations
- **Composition Pattern**: Use a compose function to chain decorators together
- **Parameter Capture**: Remember that parameterized decorators return decorator functions
- **Order Matters**: The first operation in input should be applied first
- **Identity Function**: Use `lambda x: x` or `def identity(x): return x` as your base
- **Testing Strategy**: Test each decorator individually before composing them
- **Debug Approach**: Print intermediate results during development to verify correctness
- **Functional Thinking**: Think of each operation as a transformation function
- **Edge Cases**: Consider what happens with zero operations or identity transformations
