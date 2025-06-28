# Test Cases for Compiler Optimizations: Dead Code Elimination

## Test Case Structure
This question tests dead code elimination optimization with variable assignment statements.

### Input Format Pattern:
```
Line 1: n (number of statements)
Lines 2 to n+1: statements in format:
  - "ASSIGN var value" 
  - "PRINT var"
  - "USE var1 var2 ..."
```

### Output Format Pattern:
```
Optimized statements (dead assignments removed)
Each statement on a separate line
Preserve original order of non-eliminated statements
```

## Test Case 1: Basic Dead Code Elimination
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
**Explanation:** Assignment to `z` is eliminated because `z` is never used.

## Test Case 2: Edge Case - All Assignments Dead
**Input (`input2.txt`):**
```
3
ASSIGN a 5
ASSIGN b 10
ASSIGN c 15
```
**Expected Output (`expected2.txt`):**
```

```
**Explanation:** All assignments are dead (no PRINT or USE statements), so output is empty.

## Test Case 3: Performance Case - Large Input with Complex Dependencies
**Input (`input3.txt`):**
```
10
ASSIGN a 1
ASSIGN b 2
ASSIGN c 3
ASSIGN d 4
ASSIGN e 5
PRINT a
USE b c
ASSIGN f 6
ASSIGN g 7
PRINT d
```
**Expected Output (`expected3.txt`):**
```
ASSIGN a 1
ASSIGN b 2
ASSIGN c 3
ASSIGN d 4
PRINT a
USE b c
PRINT d
```
**Explanation:** Assignments to `e`, `f`, `g` are eliminated; variables `a`, `b`, `c`, `d` are kept as they are used.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a positive integer n (1 ≤ n ≤ 1000)
2. Next n lines must be valid statements: ASSIGN, PRINT, or USE
3. ASSIGN format: "ASSIGN var value" where var is a-z, value is integer
4. PRINT format: "PRINT var" where var was previously assigned
5. USE format: "USE var1 var2 ..." where all vars were previously assigned
6. Variable names are single lowercase letters only
7. No variable can be used before being assigned

### Output Format Rules:
1. Output only non-dead statements in original order
2. Each statement on a separate line
3. No trailing spaces or empty lines
4. If all statements are eliminated, output should be empty
5. Preserve exact format of original statements

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to read statements and handle whitespace
- Use sets for efficient variable tracking: `used_vars = set()`
- Split statements with `stmt.split()` to parse components
- Handle empty output case properly (no print statements)

### Go Considerations:
- Use `bufio.Scanner` for reading multiple lines efficiently
- Use `map[string]bool` for variable tracking
- Use `strings.Fields()` to split statement components
- Handle empty output case with proper formatting

### JavaScript Considerations:
- Use `readline` or similar for input handling
- Use `Set` object for tracking used variables
- Split with `stmt.split(' ')` and handle array indexing
- Consider memory efficiency for large test cases

## Validation Checklist
- [ ] Input has exactly n+1 lines (n statements + count line)
- [ ] All variable names are single lowercase letters
- [ ] All ASSIGN statements have valid integer values
- [ ] No variable is used before being assigned
- [ ] Output preserves order of non-eliminated statements
- [ ] Dead assignments are correctly identified and removed
- [ ] Edge cases handled (all dead, no dead, complex dependencies)

## Automated Test Case Generation
```python
def generate_test_case(num_statements=10, dead_ratio=0.3):
    """Generate a test case with specified number of statements and dead code ratio"""
    import random
    import string
    
    statements = []
    assigned_vars = set()
    used_vars = set()
    
    # Generate assignments
    for i in range(int(num_statements * 0.7)):
        var = random.choice(string.ascii_lowercase[:10])
        value = random.randint(-100, 100)
        statements.append(f"ASSIGN {var} {value}")
        assigned_vars.add(var)
    
    # Generate uses to create live variables
    num_uses = max(1, int(len(assigned_vars) * (1 - dead_ratio)))
    live_vars = random.sample(list(assigned_vars), num_uses)
    
    for var in live_vars:
        if random.choice([True, False]):
            statements.append(f"PRINT {var}")
        else:
            other_vars = [v for v in live_vars if v != var]
            if other_vars:
                use_vars = random.sample(other_vars, min(2, len(other_vars)))
                use_vars.append(var)
                statements.append(f"USE {' '.join(use_vars)}")
        used_vars.add(var)
    
    # Shuffle statements while maintaining assignment before use
    return statements, used_vars

def validate_test_case(input_content, expected_content):
    """Validate a test case for correctness"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    if len(lines) != n + 1:
        return False, "Incorrect number of statements"
    
    assigned_vars = set()
    for i in range(1, n + 1):
        parts = lines[i].split()
        if parts[0] == "ASSIGN":
            assigned_vars.add(parts[1])
        elif parts[0] in ["PRINT", "USE"]:
            for j in range(1, len(parts)):
                if parts[j] not in assigned_vars:
                    return False, f"Variable {parts[j]} used before assignment"
    
    return True, "Test case valid"
```

## Performance Test Considerations
- Large inputs (up to 1000 statements) should complete within time limits
- Naive O(n²) algorithms may timeout on complex dependency chains
- Efficient two-pass algorithms should handle all cases within constraints
- Memory usage should be reasonable for variable tracking structures
