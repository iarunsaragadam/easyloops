# Compiler Optimizations: Dead Code Elimination

## Problem Statement

Implement a dead code elimination optimizer, a fundamental compiler optimization technique. Dead code elimination removes variable assignments that are never used, reducing memory usage and improving performance.

You are given a sequence of statements in a simple programming language. Your task is to eliminate all "dead" assignments - variable assignments where the assigned variable is never subsequently used.

**Statement Types:**
- `ASSIGN var value` - Assigns a value to a variable
- `PRINT var` - Prints the value of a variable (uses the variable)
- `USE var1 var2 ...` - Uses one or more variables in an operation

**Dead Code Examples:**
- `ASSIGN x 10` followed by `ASSIGN x 20` - the first assignment is dead
- `ASSIGN y 5` with no subsequent PRINT or USE of `y` - the assignment is dead

Your optimizer should output only the statements needed for correct program execution, preserving the original order of non-dead statements.

## Input Format

```
Line 1: n (number of statements, 1 ≤ n ≤ 1000)
Lines 2 to n+1: statements in the format described above
```

## Test Cases
**Input (`input.txt`):**
```
5
ASSIGN x 10
ASSIGN y 20
PRINT x
ASSIGN z 30
USE x y
```

**Expected Output (`expected.txt`):**
```
ASSIGN x 10
ASSIGN y 20
PRINT x
USE x y
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand dead code elimination optimization techniques
- Learn data flow analysis concepts
- Practice parsing and analyzing code structures
- Implement optimization algorithms used in real compilers
- Understand the relationship between variable usage and memory efficiency

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input())
    statements = []
    
    # Read all statements
    for _ in range(n):
        statements.append(input().strip())
    
    # Identify used variables
    used_vars = set()
    # ... implement analysis logic
    
    # Output optimized statements
    # ... implement optimization logic
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    statements := make([]string, n)
    // Read all statements
    
    usedVars := make(map[string]bool)
    // ... implement analysis logic
    
    // Output optimized statements
    // ... implement optimization logic
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of statements)
- Variable names are single lowercase letters (a-z)
- Values are integers in the range [-1000, 1000]
- Each PRINT and USE statement references only previously assigned variables
- No variable is used before being assigned

## Hints
- **Two-pass algorithm**: First pass to identify used variables, second pass to output non-dead assignments
- **Track usage**: A variable is "used" if it appears in any PRINT or USE statement
- **Preserve order**: Maintain the original order of non-eliminated statements
- **Consider all uses**: A variable used in any operation after assignment is considered live
- **Edge cases**: Handle cases where all assignments are dead, or where variables are reassigned multiple times
