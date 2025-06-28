# Input Validation

## Problem Statement

Create a user registration input validator that checks if user-provided information meets specific criteria. This is a common real-world programming task that helps ensure data quality and system security.

Your program should read three pieces of user registration information and validate each according to the following rules:

1. **Name Validation:**
   - Must be between 2 and 50 characters long
   - Can only contain letters (a-z, A-Z) and spaces
   - Cannot have leading or trailing spaces

2. **Age Validation:**
   - Must be a valid integer
   - Must be between 13 and 120 (inclusive)

3. **Email Validation:**
   - Must follow basic email format: `user@domain.extension`
   - Must contain exactly one @ symbol
   - Domain must have at least one dot
   - Extension must be at least 2 characters

**Output Rules:**
- If all inputs are valid, output: `VALID`
- If any input is invalid, output the first error encountered in the format: `ERROR: [specific error message]`

The validation should be performed in order: name first, then age, then email.

## Input Format

The input consists of 3 lines:
```
Line 1: Full name (string)
Line 2: Age (string that should be an integer)
Line 3: Email address (string)
```

## Test Cases

**Input (`input.txt`):**
```
John Doe
25
john.doe@email.com
```

**Expected Output (`expected.txt`):**
```
VALID
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice input validation techniques and data sanitization
- Learn to implement multiple validation rules in sequence
- Understand error handling and user-friendly error messages
- Practice string manipulation and pattern matching
- Learn to handle edge cases and boundary conditions
- Develop skills in writing robust, defensive code

## Implementation Guidelines

### Python Example Structure:
```python
import re

def solve():
    # Read inputs
    name = input()
    age_str = input()
    email = input()
    
    # Validate name
    if len(name) < 2 or len(name) > 50:
        print("ERROR: Name must be 2-50 characters")
        return
    
    # Add more validation logic...
    
    # If all validations pass
    print("VALID")
```

### Go Example Structure:
```go
import (
    "fmt"
    "regexp"
    "strconv"
    "strings"
)

func solve() {
    var name, ageStr, email string
    fmt.Scanln(&name)
    fmt.Scanln(&ageStr)
    fmt.Scanln(&email)
    
    // Validate name
    if len(name) < 2 || len(name) > 50 {
        fmt.Println("ERROR: Name must be 2-50 characters")
        return
    }
    
    // Add more validation logic...
    
    // If all validations pass
    fmt.Println("VALID")
}
```

## Constraints
- Name length: 2-50 characters
- Age range: 13-120 years
- Email format: Basic email validation (user@domain.extension)
- Input will always consist of exactly 3 lines
- All validation error messages must match the exact format specified
- Process validations in order: name, age, email (stop at first error)

## Hints
- Use regular expressions for pattern matching (name and email validation)
- Remember to check for leading/trailing spaces in the name
- Convert age to integer and handle potential conversion errors
- For email validation, check for presence of @ and . in correct positions
- Test your solution with various edge cases to ensure robustness
