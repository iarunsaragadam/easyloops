# Local vs Global Scope

## Problem Statement

Write a program that demonstrates the fundamental concepts of local and global variable scope in programming. Your program will simulate variable operations that showcase how scope affects variable access and modification.

The program should:
1. Maintain a global counter variable
2. Process a series of operations that demonstrate different scope behaviors
3. Show how local variables can shadow global variables
4. Demonstrate how functions can access and modify global variables

Your program will read an initial value for a global variable, then process a series of operations and output the results of each operation, clearly showing the difference between local and global scope.

## Input Format

The input consists of multiple lines:
```
Line 1: initial_value (integer) - Initial value for the global counter
Line 2: n (integer) - Number of operations to process
Next n lines: operation_type value (string integer) - Operation and its parameter
```

**Valid operations:**
- `global_set X` - Set the global variable to value X
- `global_add X` - Add X to the global variable
- `local_function X` - Call a function that creates a local variable with the same name as the global, adds X to it, but doesn't affect the global variable
- `modify_global X` - Call a function that modifies the global variable by adding X

## Test Cases
**Input (`input.txt`):**
```
5
4
global_add 3
local_function 7
modify_global 2
global_set 20
```

**Expected Output (`expected.txt`):**
```
Global counter after adding 3: 8
Local function returned: 17, global counter unchanged: 8
Global counter after modification: 10
Global counter set to: 20
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the difference between local and global variable scope
- Learn how local variables can shadow global variables
- Practice accessing and modifying global variables from functions
- Understand when and how to use the `global` keyword (in Python)
- Demonstrate scope resolution rules in programming

## Implementation Guidelines
### Python Example Structure:
```python
# Global variable
counter = 0

def local_function(x):
    # Local variable shadows global
    counter = 10
    counter += x
    return counter

def modify_global(x):
    # Modify the global variable
    global counter
    counter += x
    return counter

def solve():
    global counter
    # Read initial value and process operations
    # Output results for each operation
```

### Go Example Structure:
```go
var counter int

func localFunction(x int) int {
    // Local variable shadows global
    counter := 10
    counter += x
    return counter
}

func modifyGlobal(x int) int {
    // Modify the global variable
    counter += x
    return counter
}

func solve() {
    // Read initial value and process operations
    // Output results for each operation
}
```

## Constraints
- Initial value: -1000 ≤ initial_value ≤ 1000
- Number of operations: 1 ≤ n ≤ 100
- Operation values: -100 ≤ value ≤ 100
- All operations are valid (no input validation required)
- Output format must match exactly (including spacing and punctuation)

## Hints
- Remember that local variables with the same name as global variables will shadow (hide) the global variable within that function's scope
- In Python, use the `global` keyword to modify global variables from within functions
- In Go, variables declared with `:=` create new local variables, while simple assignment `=` modifies existing variables
- The local_function should always start with a local counter value of 10, regardless of the global counter value
- Pay careful attention to the exact output format required
