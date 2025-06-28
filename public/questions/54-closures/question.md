# Closures

## Problem Statement

You need to implement a function factory system that demonstrates closures by creating functions that capture and maintain state across multiple calls. This problem will test your understanding of lexical scoping, variable capture, and stateful function factories.

You will be given a series of operations to:
1. Create function factories of different types with initial values
2. Call these functions with arguments to see how they maintain state
3. Reset functions back to their initial state

The three types of function factories you need to implement are:
- **COUNTER**: Starts with an initial value and increments by the argument on each call
- **MULTIPLIER**: Multiplies the argument by a fixed factor (captured from creation)
- **ACCUMULATOR**: Starts with an initial value and adds the argument on each call

This problem demonstrates how closures can encapsulate state and behavior, creating powerful abstractions for stateful operations.

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations)
Lines 2 to n+1: operations in one of these formats:
  - CREATE <type> <name> <value>
  - CALL <name> <argument>
  - RESET <name>
```

Where:
- `<type>` is one of: COUNTER, MULTIPLIER, ACCUMULATOR
- `<name>` is a string identifier for the function
- `<value>` is an integer (initial value for COUNTER/ACCUMULATOR, factor for MULTIPLIER)
- `<argument>` is an integer passed to the function

## Test Cases
**Input (`input.txt`):**
```
8
CREATE COUNTER cnt1 0
CALL cnt1 5
CALL cnt1 3
CREATE MULTIPLIER mult1 4
CALL mult1 5
RESET cnt1
CALL cnt1 2
CALL mult1 7
```

**Expected Output (`expected.txt`):**
```
5
8
20
2
28
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand how closures capture variables from their lexical scope
- Learn to implement function factories that return stateful functions
- Practice creating functions that maintain state across multiple calls
- Explore practical applications of closures for state management
- Master the concept of lexical scoping in functional programming

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input())
    functions = {}  # Store created functions
    
    for _ in range(n):
        operation = input().strip().split()
        
        if operation[0] == "CREATE":
            # Create function factory based on type
            pass
        elif operation[0] == "CALL":
            # Call the function and print result
            pass
        elif operation[0] == "RESET":
            # Reset function to initial state
            pass

def create_counter(start_value):
    # Return a closure that maintains count
    pass

def create_multiplier(factor):
    # Return a closure that multiplies by factor
    pass

def create_accumulator(start_value):
    # Return a closure that accumulates values
    pass
```

### JavaScript Example Structure:
```javascript
function solve() {
    const functions = {}; // Store created functions
    
    // Read operations and process them
    
    function createCounter(startValue) {
        // Return a closure that maintains count
    }
    
    function createMultiplier(factor) {
        // Return a closure that multiplies by factor
    }
    
    function createAccumulator(startValue) {
        // Return a closure that accumulates values
    }
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of operations)
- Function names are unique and contain only letters and numbers
- Initial values and arguments are integers in range [-1000, 1000]
- CALL operations will only reference previously created functions
- RESET operations will only reference previously created functions
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Beginner**: Start by understanding what a closure is - a function that has access to variables in its outer scope even after the outer function returns
- **Intermediate**: Use mutable containers (like lists in Python) to allow the inner function to modify captured variables
- **Advanced**: Consider how to implement the reset functionality - you might need to store the original parameters
- **Implementation**: Each function type needs to capture different state - counters need current count, multipliers need the factor, accumulators need current sum
- **Debugging**: Print intermediate values to understand how state is being maintained across function calls
