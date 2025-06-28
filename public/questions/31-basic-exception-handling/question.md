# Basic Exception Handling

## Problem Statement

Write a program that demonstrates basic exception handling by creating a safe division calculator. Your program should read two numbers from standard input and perform division, handling potential errors gracefully.

Your program should:

1. Read two numbers (numerator and denominator) from standard input
2. Attempt to perform division
3. Handle the following exceptions appropriately:
   - **ValueError**: When input cannot be converted to a number
   - **ZeroDivisionError**: When attempting to divide by zero
   - **General Exception**: For any other unexpected errors
4. Output either the division result or an appropriate error message

This problem teaches you how to use try-catch blocks to handle errors that might occur during program execution, making your code more robust and user-friendly.

## Input Format

The input consists of 2 lines:
```
Line 1: numerator (a number)
Line 2: denominator (a number)
```

## Test Cases
**Input (`input.txt`):**
```
10
2
```

**Expected Output (`expected.txt`):**
```
Result: 5.00
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand basic exception handling concepts
- Learn to use try-catch blocks effectively
- Handle specific exception types (ValueError, ZeroDivisionError)
- Provide meaningful error messages to users
- Make programs more robust and user-friendly
- Practice reading input and validating data

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    try:
        # Read input
        line1 = input().strip()
        line2 = input().strip()
        
        # Convert to numbers (may raise ValueError)
        numerator = float(line1)
        denominator = float(line2)
        
        # Perform division (may raise ZeroDivisionError)
        result = numerator / denominator
        
        # Output result
        print(f"Result: {result:.2f}")
        
    except ValueError:
        print("Error: Invalid number format")
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
    except Exception:
        print("Error: Unexpected error occurred")
```

### Go Example Structure:
```go
func solve() {
    // Read input
    scanner.Scan()
    line1 := scanner.Text()
    
    scanner.Scan() 
    line2 := scanner.Text()
    
    // Convert to numbers
    numerator, err1 := strconv.ParseFloat(line1, 64)
    if err1 != nil {
        fmt.Println("Error: Invalid number format")
        return
    }
    
    denominator, err2 := strconv.ParseFloat(line2, 64)
    if err2 != nil {
        fmt.Println("Error: Invalid number format")
        return
    }
    
    // Check for division by zero
    if denominator == 0 {
        fmt.Println("Error: Cannot divide by zero")
        return
    }
    
    // Perform division
    result := numerator / denominator
    fmt.Printf("Result: %.2f\n", result)
}
```

## Constraints
- Input numbers are within the range of standard floating-point numbers
- Results should be formatted to 2 decimal places
- Error messages must match exactly as specified
- Handle all specified exception types

## Hints
- Use try-catch blocks to handle exceptions in Python
- In Go, check for errors explicitly using the error return value
- Always handle the most specific exceptions first, then general ones
- Provide clear, user-friendly error messages
- Test your solution with both valid and invalid inputs
