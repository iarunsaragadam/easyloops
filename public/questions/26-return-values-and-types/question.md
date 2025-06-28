# Return Values and Types

## Problem Statement

Create a program that processes mathematical operations and returns appropriate data types based on the operation type. This exercise will help you understand how functions should return different types of values depending on the context and operation being performed.

Your program should:

1. **Read a mathematical operation** in the format: `operation number1 number2`

2. **Process the operation** and return the appropriate data type:
   - **Integer results** for: `add`, `sub`, `mul`, `mod` (addition, subtraction, multiplication, modulo)
   - **Float results** for: `div` (division)
   - **Boolean results** for: `eq`, `ne`, `lt`, `le`, `gt`, `ge` (equal, not equal, less than, less than or equal, greater than, greater than or equal)
   - **String error messages** for: invalid operations or division by zero

3. **Handle edge cases** such as division by zero, invalid operations, and malformed input

4. **Format output correctly**:
   - Integers: Print as whole numbers (e.g., `15`)
   - Floats: Print with 6 decimal places (e.g., `3.333333`)
   - Booleans: Print as lowercase `true` or `false`
   - Errors: Print descriptive error messages starting with `ERROR:`

## Input Format

The input consists of 1 line:
```
Line 1: operation number1 number2
```

Where:
- `operation` is one of: `add`, `sub`, `mul`, `div`, `mod`, `eq`, `ne`, `lt`, `le`, `gt`, `ge`
- `number1` and `number2` are floating-point numbers (can be integers or decimals)

## Test Cases
**Input (`input.txt`):**
```
add 10 5
```

**Expected Output (`expected.txt`):**
```
15
```

**Input (`input2.txt`):**
```
div 7 0
```

**Expected Output (`expected2.txt`):**
```
ERROR: Division by zero
```

**Input (`input3.txt`):**
```
mul 1000000 1000000
```

**Expected Output (`expected3.txt`):**
```
1000000000000
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand how functions should return different data types based on context
- Learn to handle type-specific formatting and output requirements
- Practice conditional logic for determining appropriate return types
- Understand error handling through return values
- Learn the importance of consistent type handling in programming
- Practice input validation and error reporting

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    line = input().strip()
    parts = line.split()
    
    if len(parts) != 3:
        print("ERROR: Invalid input format")
        return
    
    operation = parts[0]
    try:
        num1 = float(parts[1])
        num2 = float(parts[2])
    except ValueError:
        print("ERROR: Invalid numbers")
        return
    
    # Handle different operation types
    if operation == "add":
        result = int(num1 + num2)
        print(result)
    elif operation == "div":
        if num2 == 0:
            print("ERROR: Division by zero")
        else:
            result = num1 / num2
            print(f"{result:.6f}")
    # Add other operations...
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := scanner.Text()
    
    parts := strings.Split(line, " ")
    if len(parts) != 3 {
        fmt.Println("ERROR: Invalid input format")
        return
    }
    
    operation := parts[0]
    num1, err1 := strconv.ParseFloat(parts[1], 64)
    num2, err2 := strconv.ParseFloat(parts[2], 64)
    
    if err1 != nil || err2 != nil {
        fmt.Println("ERROR: Invalid numbers")
        return
    }
    
    // Handle different operation types
    switch operation {
    case "add":
        fmt.Printf("%d\n", int(num1 + num2))
    case "div":
        if num2 == 0 {
            fmt.Println("ERROR: Division by zero")
        } else {
            fmt.Printf("%.6f\n", num1 / num2)
        }
    // Add other cases...
    }
}
```

## Constraints
- Input numbers can range from -1,000,000 to 1,000,000
- Division results should be formatted to 6 decimal places
- Boolean operations should output lowercase `true` or `false`
- Error messages must start with `ERROR:` followed by a descriptive message
- Program should handle malformed input gracefully
- All operations must be case-sensitive

## Hints
- Use different data types for different operation categories (int, float, bool, string)
- Pay attention to the output formatting requirements for each type
- Consider using a switch/case or if-elif structure to handle different operations
- Remember to check for division by zero before performing division or modulo operations
- Use appropriate parsing functions to convert string input to numbers
- Test your solution with edge cases like very large numbers and boundary conditions
