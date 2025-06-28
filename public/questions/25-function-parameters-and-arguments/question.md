# Function Parameters and Arguments

## Problem Statement

Write a program that demonstrates function parameters and arguments by creating a calculator function. You'll define a function that takes operation type and two numbers as parameters, then call it with different arguments to perform basic arithmetic operations.

Your program should:

1. **Define a function** called `calculate` that:
   - Takes three parameters: operation (string), first number (integer), second number (integer)
   - Returns the result of the arithmetic operation
   - Supports three operations: "add", "subtract", "multiply"

2. **Call the function** with the provided input arguments and display both:
   - The function call details (showing the parameters passed)
   - The calculated result

This problem teaches you how to:
- Define functions with multiple parameters
- Pass arguments to function calls
- Use return values from functions
- Understand the relationship between parameters and arguments

## Input Format

The input consists of 3 lines:
```
Line 1: Operation type ("add", "subtract", or "multiply")
Line 2: First number (integer)
Line 3: Second number (integer)
```

## Test Cases

**Input (`input.txt`):**
```
add
5
3
```

**Expected Output (`expected.txt`):**
```
Function called: calculate('add', 5, 3)
Result: 8
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand how to define functions with parameters
- Learn how to call functions with arguments
- Practice using return values from functions
- Understand the difference between parameters (in function definition) and arguments (in function calls)
- Learn basic function design principles

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Define your calculate function here
    def calculate(operation, num1, num2):
        # Implement the calculation logic
        if operation == "add":
            return num1 + num2
        elif operation == "subtract":
            return num1 - num2
        elif operation == "multiply":
            return num1 * num2
    
    # Read input
    operation = input().strip()
    num1 = int(input())
    num2 = int(input())
    
    # Call function with arguments
    result = calculate(operation, num1, num2)
    
    # Display function call and result
    print(f"Function called: calculate('{operation}', {num1}, {num2})")
    print(f"Result: {result}")
```

### Go Example Structure:
```go
func solve() {
    // Define your calculate function here
    calculate := func(operation string, num1, num2 int) int {
        switch operation {
        case "add":
            return num1 + num2
        case "subtract":
            return num1 - num2
        case "multiply":
            return num1 * num2
        default:
            return 0
        }
    }
    
    // Read input
    scanner.Scan()
    operation := scanner.Text()
    
    scanner.Scan()
    num1, _ := strconv.Atoi(scanner.Text())
    
    scanner.Scan()
    num2, _ := strconv.Atoi(scanner.Text())
    
    // Call function with arguments
    result := calculate(operation, num1, num2)
    
    // Display function call and result
    fmt.Printf("Function called: calculate('%s', %d, %d)\n", operation, num1, num2)
    fmt.Printf("Result: %d\n", result)
}
```

## Constraints

- Operation will be one of: "add", "subtract", or "multiply"
- Numbers will be integers between -1000 and 1000
- All inputs are guaranteed to be valid
- Output format must match exactly (including quotes and spacing)

## Hints

- Remember that parameters are variables in the function definition, while arguments are the actual values passed when calling the function
- Use conditional statements (if/elif/else or switch) to handle different operations
- The output should show both the function call details and the result
- Pay attention to the exact output format, including quotes around the operation string
