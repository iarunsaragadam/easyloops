# Variable Declaration and Initialization

## Problem Statement

Write a program that demonstrates proper [[wiki:variable]] declaration and initialization for different data types. Your program should read values from standard input and use them to demonstrate various programming concepts.

Your program should:

1. Read input values and declare variables of the following types:
   - Integer (read from line 1)
   - String (read from line 2)
   - Boolean (read from line 3)
   - Floating-point number (read from line 4)
   - Character (read from line 5)

2. Print each variable with a descriptive label showing its type and value

3. Demonstrate variable reassignment by:
   - Reading a new integer value (from line 6)
   - Reassigning the integer variable to this new value
   - Printing the updated value

4. Show late initialization by:
   - Reading a value for late initialization (from line 7)
   - Declaring a variable without initializing it (where supported by the language)
   - Then initializing it with the read value
   - Printing the final result

## Input Format

The input consists of 7 lines:

```
Line 1: Integer value (e.g., 42)
Line 2: String value (e.g., "Hello, World!")
Line 3: Boolean value (true or false)
Line 4: Floating-point number (e.g., 3.14159)
Line 5: Single character (e.g., A)
Line 6: New integer value for reassignment (e.g., 100)
Line 7: String value for late initialization (e.g., "Programming")
```

## Test Cases

**Input (`input.txt`):**

```
42
Hello, World!
true
3.14159
A
100
Programming
```

**Expected Output (`expected.txt`):**

```
Integer variable: 42
String variable: Hello, World!
Boolean variable: true
Float variable: 3.14159
Character variable: A
Updated integer variable: 100
Late-initialized variable: Programming
```

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand different data types available in programming languages
- Learn the difference between variable declaration and initialization
- Practice proper variable naming conventions
- Understand variable reassignment
- Learn about type inference (in languages that support it)
- Practice reading input from stdin in the correct order

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    # Read input values
    integer_val = int(input())
    string_val = input().strip()
    boolean_val = input().strip() == "true"
    float_val = float(input())
    char_val = input().strip()
    new_integer_val = int(input())
    late_init_val = input().strip()

    # Your variable declaration and output logic here
    # ...
```

### Go Example Structure:

```go
func solve() {
    // Read input values
    scanner.Scan()
    integerVal, _ := strconv.Atoi(scanner.Text())

    scanner.Scan()
    stringVal := scanner.Text()

    scanner.Scan()
    booleanVal := scanner.Text() == "true"

    // Continue reading other values...
    // Your variable declaration and output logic here
}
```

## Constraints

- Use meaningful variable names that follow the language's naming conventions
- Include comments explaining each step
- Handle languages that don't support certain data types gracefully
- Output format must match exactly (including spacing and punctuation)

## Hints

- Some languages require explicit type declaration, others support type inference
- Pay attention to the language's naming conventions (camelCase, snake_case, etc.)
- Consider how different languages handle uninitialized variables
- Be careful with boolean parsing - check if input is "true" or "false"
- Character handling varies by language (some use single chars, others use strings)
