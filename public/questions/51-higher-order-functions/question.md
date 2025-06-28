# Higher-order functions

## Problem Statement

You are building a mathematical function pipeline processor that applies a sequence of operations to a starting value. This system demonstrates the power of higher-order functions - functions that can take other functions as arguments or return functions as results.

Your task is to implement a function pipeline evaluator that:
1. Takes an initial numerical value
2. Applies a sequence of mathematical operations in order
3. Returns the final computed result

The operations available are:
- `ADD x`: Add x to the current value
- `MUL x`: Multiply the current value by x  
- `POW x`: Raise the current value to the power of x
- `ABS`: Take the absolute value of the current value
- `NEG`: Negate the current value (multiply by -1)
- `SQRT`: Take the square root of the current value (only if non-negative, otherwise leave unchanged)

This problem teaches you to work with function composition, callbacks, and the functional programming paradigm where functions are first-class citizens.

## Input Format

The input consists of 1 line:
```
Line 1: initial_value | operation1, operation2, operation3, ...
```

Where:
- `initial_value` is a number (integer or decimal)
- Operations are separated by commas
- The `|` character separates the initial value from the operations
- If no operations are provided, just return the initial value

Examples:
- `5 | ADD 3, MUL 2` means: start with 5, add 3 (=8), then multiply by 2 (=16)
- `10` means: just return 10 (no operations)
- `-4 | ABS, POW 2, SQRT` means: start with -4, take absolute value (=4), square it (=16), take square root (=4)

## Test Cases
**Input (`input.txt`):**
```
5 | ADD 3, MUL 2
```

**Expected Output (`expected.txt`):**
```
16
```

**Additional Test Cases:**
- `input2.txt` / `expected2.txt`: Edge case with no operations  
- `input3.txt` / `expected3.txt`: Complex pipeline with all operation types
- `input1.txt` to `input100.txt` / `expected1.txt` to `expected100.txt`: Comprehensive test suite (100+ cases)

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand higher-order functions and their practical applications
- Learn function composition and pipeline patterns
- Practice working with functions as first-class objects
- Implement callback-style programming patterns
- Build reusable function factories and generators
- Master functional programming concepts in imperative languages

## Implementation Guidelines

### Key Concepts to Implement:
1. **Function Factories**: Create functions that return other functions
2. **Function Composition**: Chain functions together in a pipeline
3. **Higher-Order Functions**: Functions that operate on other functions
4. **Functional Pipeline**: Apply a sequence of transformations

### Python Example Structure:
```python
def solve():
    line = input().strip()
    
    # Parse input: split initial value from operations
    # Create function objects for each operation
    # Apply functions in sequence using higher-order patterns
    # Return final result
    
    # Example higher-order function approach:
    # def create_add_function(x):
    #     return lambda val: val + x
    # 
    # def apply_pipeline(initial_value, functions):
    #     result = initial_value
    #     for func in functions:
    #         result = func(result)
    #     return result
```

### Go Example Structure:
```go
func solve() {
    // Read input line
    // Parse initial value and operations
    // Create function types and closures
    // Apply function pipeline
    // Print result
    
    // Example higher-order function approach:
    // type MathFunc func(float64) float64
    // 
    // func createAddFunc(x float64) MathFunc {
    //     return func(val float64) float64 {
    //         return val + x
    //     }
    // }
}
```

## Constraints
- Initial value: -1000 ≤ initial_value ≤ 1000
- Number of operations: 0 ≤ operations ≤ 20
- Operation parameters: -100 ≤ x ≤ 100
- Square root is only applied to non-negative numbers
- Results should be formatted to remove unnecessary trailing zeros
- Maximum computation time: 1 second per test case
- Memory limit: 256 MB

## Hints
- **Start Simple**: Begin by parsing the input and handling the case with no operations
- **Function Objects**: Think about how to represent each operation as a function object
- **Factory Pattern**: Create "factory functions" that generate operation functions with specific parameters
- **Pipeline Pattern**: Use higher-order functions to apply a sequence of operations
- **Error Handling**: Handle edge cases like square root of negative numbers gracefully
- **Functional Approach**: Try to avoid mutable state - pass values through the function pipeline
- **Testing Strategy**: Test each operation type individually before combining them
