# Try-catch blocks

## Problem Statement

Implement a **Safe Calculator** that demonstrates proper exception handling using try-catch blocks. Your calculator should gracefully handle various error conditions instead of crashing, providing meaningful error messages to users.

In real-world applications, programs must handle unexpected situations like invalid user input, mathematical errors, or resource unavailability. Try-catch blocks are essential constructs that allow programs to detect, handle, and recover from errors gracefully.

Your calculator should:

1. **Read mathematical operations** from standard input in the format: `operation operand1 operand2`
2. **Support four basic operations**: ADD, SUB, MUL, DIV (case-insensitive)
3. **Handle multiple error conditions** using appropriate try-catch blocks:
   - Invalid input format (wrong number of arguments)
   - Invalid number formats (non-numeric operands)
   - Division by zero errors
   - Unknown operation types
   - Unexpected input/output errors

4. **Provide specific error messages** for each error type
5. **Continue execution** after handling errors (don't crash)
6. **Format results appropriately** (whole numbers without decimals, floats with appropriate precision)

## Input Format

The input consists of 1 line:
```
Line 1: operation operand1 operand2
```

Where:
- `operation`: One of ADD, SUB, MUL, DIV (case-insensitive)
- `operand1`: First numeric operand (integer or float)
- `operand2`: Second numeric operand (integer or float)

## Test Cases
**Input (`input1.txt`):**
```
ADD 10 5
```

**Expected Output (`expected1.txt`):**
```
15
```

**Input (`input2.txt`):**
```
DIV 10 0
```

**Expected Output (`expected2.txt`):**
```
ERROR: Division by zero
```

**Input (`input3.txt`):**
```
ADD invalid 5
```

**Expected Output (`expected3.txt`):**
```
ERROR: Invalid number format
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master try-catch block syntax and structure
- Understand different exception types and when they occur
- Learn to provide meaningful error messages instead of cryptic stack traces
- Practice defensive programming techniques
- Implement graceful error recovery patterns
- Distinguish between different error handling strategies

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    try:
        # Read and parse input
        line = input().strip()
        # Handle input parsing errors
        
        try:
            # Parse numbers with error handling
            operand1 = float(parts[1])
            operand2 = float(parts[2])
        except ValueError:
            print("ERROR: Invalid number format")
            return
            
        try:
            # Perform calculation with error handling
            if operation == "DIV" and operand2 == 0:
                print("ERROR: Division by zero")
                return
            # Calculate result
        except Exception as e:
            print(f"ERROR: Calculation failed")
            
    except EOFError:
        print("ERROR: No input provided")
    except Exception as e:
        print("ERROR: Unexpected error")
```

### Go Example Structure:
```go
func solve() {
    // Read input with error handling
    
    // Parse operands with error checking
    
    // Perform calculation with appropriate error handling
    
    // Handle division by zero specifically
    
    // Provide meaningful error messages
}
```

## Constraints
- Input line length: 1-100 characters
- Operands: -1000000 ≤ operand ≤ 1000000
- Operations: Only ADD, SUB, MUL, DIV supported
- Time limit: 1 second per test case
- Memory limit: 256 MB
- Output precision: 6 decimal places maximum for floating point results

## Hints
- **Start Simple**: Begin with basic try-catch for the main input reading
- **Layer Protection**: Use nested try-catch blocks for different error types
- **Be Specific**: Catch specific exception types when possible (ValueError, ZeroDivisionError)
- **Fail Gracefully**: Always provide helpful error messages, never let the program crash
- **Test Edge Cases**: Try invalid inputs, division by zero, and malformed data
- **Format Output**: Remove unnecessary decimal places from whole number results
- **Handle All Cases**: Consider what happens with empty input, too many arguments, etc.
