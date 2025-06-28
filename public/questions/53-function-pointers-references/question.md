# Function Calculator - Function Pointers/References

## Problem Statement

Create a function calculator that demonstrates the power of function pointers and references. You'll implement a calculator that uses function references to dynamically select and execute mathematical operations based on user input.

Your program should:

1. **Define mathematical functions**: Create separate functions for basic arithmetic operations (ADD, SUB, MUL, DIV, POW, MOD)
2. **Use function references**: Store these functions in a data structure (like a dictionary/map) where they can be referenced by name
3. **Dynamic function calling**: Read operation names and arguments, then use function pointers/references to call the appropriate function
4. **Handle edge cases**: Deal with division by zero and invalid operations gracefully

This problem teaches the fundamental concept of **functions as first-class objects** - where functions can be stored in variables, passed as arguments, and called dynamically. This is a cornerstone concept in functional programming and callback systems.

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations to perform, 1 ≤ n ≤ 1000)
Lines 2 to n+1: operation_name operand1 operand2
```

**Valid Operations:**
- `ADD a b` - Addition (a + b)
- `SUB a b` - Subtraction (a - b)  
- `MUL a b` - Multiplication (a × b)
- `DIV a b` - Division (a ÷ b)
- `POW a b` - Power (a^b)
- `MOD a b` - Modulo (a % b)

## Output Format

For each operation, print the result on a new line:
- Integer results: Print as integers (e.g., `15`)
- Floating-point results: Print with minimal decimal places (e.g., `3.142857`)
- Division/Modulo by zero: Print `ERROR`
- Invalid operations: Print `INVALID`

## Test Cases

**Basic Test Case (`input1.txt`):**
```
5
ADD 10 5
SUB 20 8
MUL 7 6
DIV 15 3
POW 2 4
```

**Expected Output (`expected1.txt`):**
```
15
12
42
5
16
```

**Edge Case (`input2.txt`):**
```
6
DIV 10 0
MOD 15 0
DIV 22 7
MOD 17 5
INVALID_OP 5 3
ADD 0 0
```

**Expected Output (`expected2.txt`):**
```
ERROR
ERROR
3.142857
2
INVALID
0
```

**Performance Test Case (`input3.txt`):**
```
1000
ADD 1000000 999999
MUL 999 1001
POW 10 6
[... 997 more operations]
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand function pointers and function references as first-class objects
- Learn how to store functions in data structures (dictionaries, maps)
- Practice dynamic function calling and callback patterns
- Implement clean separation of concerns (operation logic vs. control logic)
- Handle edge cases in function-based architectures
- Understand the foundation of functional programming concepts

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Define your mathematical functions
    def add(a, b):
        return a + b
    
    def subtract(a, b):
        return a - b
    
    # Create a dictionary of function references (function pointers)
    operations = {
        "ADD": add,
        "SUB": subtract,
        # ... more operations
    }
    
    n = int(input().strip())
    for _ in range(n):
        parts = input().strip().split()
        op = parts[0]
        a, b = int(parts[1]), int(parts[2])
        
        if op in operations:
            # Use function pointer to call the appropriate function
            func = operations[op]
            result = func(a, b)
            print(result)
```

### Go Example Structure:
```go
func solve() {
    // Define function types and implementations
    type Operation func(int, int) interface{}
    
    add := func(a, b int) interface{} {
        return a + b
    }
    
    // Create map of function references
    operations := map[string]Operation{
        "ADD": add,
        // ... more operations
    }
    
    var n int
    fmt.Scanf("%d", &n)
    
    for i := 0; i < n; i++ {
        var op string
        var a, b int
        fmt.Scanf("%s %d %d", &op, &a, &b)
        
        if fn, exists := operations[op]; exists {
            result := fn(a, b)
            fmt.Println(result)
        }
    }
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of operations)
- -1,000,000 ≤ operands ≤ 1,000,000
- Time limit: 2 seconds
- Memory limit: 256 MB
- Operations are case-sensitive
- Handle integer overflow according to your language's behavior

## Hints
- **Hint 1**: Think of functions as objects that can be stored and retrieved
- **Hint 2**: Use a dictionary/map to create a lookup table for operations
- **Hint 3**: Each mathematical operation should be a separate function
- **Hint 4**: Check for division by zero before performing DIV or MOD operations
- **Hint 5**: For floating-point results, format them to remove unnecessary trailing zeros
- **Hint 6**: The function reference approach makes adding new operations easy - just add to your lookup table!
