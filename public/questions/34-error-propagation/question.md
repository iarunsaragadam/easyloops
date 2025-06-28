# Error Propagation

## Problem Statement

Write a program that demonstrates error propagation by creating a simple mathematical expression evaluator. Your program should read a mathematical expression, validate the input, perform the calculation, and handle various types of errors that can occur during this process.

Your program should:

1. **Read and validate a mathematical expression** in the format: `operand1 operator operand2`
   - Example: `"10 + 5"`, `"15.5 * 2"`, `"20 / 4"`

2. **Validate input format and detect errors**:
   - Invalid format (missing parts, too many parts)
   - Invalid numbers (non-numeric operands)
   - Invalid operators (unsupported operations)

3. **Perform calculations while handling runtime errors**:
   - Division by zero
   - Arithmetic overflow (if applicable)

4. **Propagate errors appropriately** by returning specific error messages or successful results

5. **Output format**:
   - For successful calculations: `RESULT: {value}`
   - For errors: `ERROR: {error_type}`

This problem teaches you how errors can be detected at different levels of your program and how they should be properly handled and communicated back to the user.

## Input Format

The input consists of 1 line:
```
Line 1: Mathematical expression (e.g., "10 + 5")
```

**Valid operators**: `+`, `-`, `*`, `/`  
**Valid operands**: Integer or floating-point numbers

## Test Cases

**Input (`input1.txt`):**
```
10 + 5
```

**Expected Output (`expected1.txt`):**
```
RESULT: 15
```

**Input (`input2.txt`):**
```
10 / 0
```

**Expected Output (`expected2.txt`):**
```
ERROR: DIVISION_BY_ZERO
```

**Input (`input3.txt`):**
```
10 +
```

**Expected Output (`expected3.txt`):**
```
ERROR: INVALID_FORMAT
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand how errors originate and propagate through function calls
- Learn to implement proper input validation with meaningful error messages
- Practice exception handling and error recovery techniques
- Understand the difference between different types of errors (syntax, runtime, logic)
- Learn to design error-resistant programs that fail gracefully
- Practice creating functions that can both succeed and fail predictably

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    expression = input().strip()
    
    try:
        # Validate input format
        parts = expression.split()
        if len(parts) != 3:
            print("ERROR: INVALID_FORMAT")
            return
            
        operand1, operator, operand2 = parts
        
        # Validate and convert operands
        try:
            num1 = float(operand1)
            num2 = float(operand2)
        except ValueError:
            print("ERROR: INVALID_NUMBER")
            return
            
        # Validate operator
        if operator not in ['+', '-', '*', '/']:
            print("ERROR: INVALID_OPERATOR")
            return
            
        # Perform calculation
        if operator == '/':
            if num2 == 0:
                print("ERROR: DIVISION_BY_ZERO")
                return
            result = num1 / num2
        elif operator == '+':
            result = num1 + num2
        # ... continue for other operators
        
        # Format and display result
        if result == int(result):
            print(f"RESULT: {int(result)}")
        else:
            print(f"RESULT: {result:.2f}")
            
    except Exception:
        print("ERROR: UNKNOWN_ERROR")
```

### Go Example Structure:
```go
func solve() {
    scanner.Scan()
    expression := scanner.Text()
    
    parts := strings.Fields(expression)
    if len(parts) != 3 {
        fmt.Println("ERROR: INVALID_FORMAT")
        return
    }
    
    operand1Str, operator, operand2Str := parts[0], parts[1], parts[2]
    
    // Convert operands to float64
    operand1, err1 := strconv.ParseFloat(operand1Str, 64)
    operand2, err2 := strconv.ParseFloat(operand2Str, 64)
    
    if err1 != nil || err2 != nil {
        fmt.Println("ERROR: INVALID_NUMBER")
        return
    }
    
    // Validate operator and calculate
    var result float64
    switch operator {
    case "+":
        result = operand1 + operand2
    case "-":
        result = operand1 - operand2
    case "*":
        result = operand1 * operand2
    case "/":
        if operand2 == 0 {
            fmt.Println("ERROR: DIVISION_BY_ZERO")
            return
        }
        result = operand1 / operand2
    default:
        fmt.Println("ERROR: INVALID_OPERATOR")
        return
    }
    
    // Format output
    if result == float64(int(result)) {
        fmt.Printf("RESULT: %d\n", int(result))
    } else {
        fmt.Printf("RESULT: %.2f\n", result)
    }
}
```

## Constraints

- Expression format must be exactly: `operand1 operator operand2` (space-separated)
- Operands can be integers or floating-point numbers (positive or negative)
- Operators are limited to: `+`, `-`, `*`, `/`
- Results should be displayed as integers when possible, otherwise as floats with 2 decimal places
- All error messages must use the exact format specified: `ERROR: {ERROR_TYPE}`
- Error types: `INVALID_FORMAT`, `INVALID_NUMBER`, `INVALID_OPERATOR`, `DIVISION_BY_ZERO`, `UNKNOWN_ERROR`

## Hints

- Start by splitting the input into parts and checking if you have exactly 3 parts
- Use try-catch blocks to handle conversion errors when parsing numbers
- Check for division by zero before performing the division
- Consider using a function for validation and another for calculation to demonstrate error propagation
- Think about the order of validation - check format first, then numbers, then operators
- Remember that floating-point arithmetic might introduce small precision errors
- Test your solution with edge cases like very large numbers, negative numbers, and decimal numbers
