# Test Cases for Local vs Global Scope

## Test Case Structure
This question uses a multi-line input format to demonstrate variable scope concepts.

### Input Format Pattern:
```
Line 1: initial_value (integer) - Initial value for global counter
Line 2: n (integer) - Number of operations
Next n lines: operation_type value (string integer) - Operations to process
```

### Output Format Pattern:
```
Multiple lines showing the result of each operation, demonstrating scope behavior
```

## Test Case 1: Basic
**Description:** Standard scenario demonstrating basic scope concepts
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
**Learning Focus:** Basic operations showing global modification, local shadowing, and global access.

## Test Case 2: Edge Case
**Description:** Simple case with minimal operations
**Input (`input2.txt`):**
```
0
3
global_set 10
local_function 5
modify_global 3
```
**Expected Output (`expected2.txt`):**
```
Global counter set to: 10
Local function returned: 15, global counter unchanged: 10
Global counter after modification: 13
```
**Learning Focus:** Starting from zero, basic set operation, demonstrating that local function doesn't affect global.

## Test Case 3: Complex
**Description:** Complex scenario with negative values and multiple operations
**Input (`input3.txt`):**
```
100
5
global_add -50
local_function 25
global_add 10
modify_global -20
local_function 100
```
**Expected Output (`expected3.txt`):**
```
Global counter after adding -50: 50
Local function returned: 35, global counter unchanged: 50
Global counter after adding 10: 60
Global counter after modification: 40
Local function returned: 110, global counter unchanged: 40
```
**Learning Focus:** Negative values, multiple local function calls showing consistent local behavior.

## Test Case Creation Rules
### Input Validation Rules:
1. Initial value must be an integer between -1000 and 1000
2. Number of operations must be between 1 and 100
3. Each operation must be one of: global_set, global_add, local_function, modify_global
4. Operation values must be integers between -100 and 100

### Output Format Rules:
1. Each operation produces exactly one line of output
2. Output format must match exactly (including spacing and punctuation)
3. Global operations show the new global value
4. Local function operations show both local result and unchanged global value
5. No trailing spaces or extra newlines

## Language-Specific Considerations
### Python Considerations:
- Use `global` keyword to modify global variables in functions
- Local variables with same name shadow global variables automatically
- Variable assignment creates local variables unless `global` is used

### Go Considerations:
- Variables declared with `:=` create new local variables
- Simple assignment `=` modifies existing variables (if accessible)
- Package-level variables act as global variables

### JavaScript Considerations:
- Use `var`, `let`, or `const` declarations carefully for scope
- Functions can access outer scope variables
- Local variables shadow outer scope variables

## Validation Checklist
- [ ] Input has correct number of lines (2 + n where n is number of operations)
- [ ] Initial value is a valid integer
- [ ] Number of operations matches the count of operation lines
- [ ] Each operation follows the correct format: "operation_type value"
- [ ] All operation types are valid
- [ ] All values are valid integers within constraints
- [ ] Output format matches exactly with proper spacing and punctuation

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random test case for local vs global scope"""
    initial_value = random.randint(-100, 100)
    n = random.randint(1, 10)
    
    operations = []
    valid_ops = ["global_set", "global_add", "local_function", "modify_global"]
    
    for _ in range(n):
        op_type = random.choice(valid_ops)
        value = random.randint(-50, 50)
        operations.append(f"{op_type} {value}")
    
    input_content = f"{initial_value}\n{n}\n" + "\n".join(operations)
    
    # Generate expected output by running the solution
    expected_content = run_solution(input_content)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case is correctly formatted"""
    lines = input_content.strip().split('\n')
    
    # Check minimum lines
    if len(lines) < 2:
        return False, "Input must have at least 2 lines"
    
    try:
        initial_value = int(lines[0])
        n = int(lines[1])
        
        # Check if we have correct number of operation lines
        if len(lines) != 2 + n:
            return False, f"Expected {2 + n} lines, got {len(lines)}"
        
        # Validate each operation
        valid_ops = {"global_set", "global_add", "local_function", "modify_global"}
        for i in range(2, len(lines)):
            parts = lines[i].split()
            if len(parts) != 2:
                return False, f"Operation line {i-1} must have exactly 2 parts"
            
            op_type, value_str = parts
            if op_type not in valid_ops:
                return False, f"Invalid operation type: {op_type}"
            
            try:
                int(value_str)
            except ValueError:
                return False, f"Invalid value in operation: {value_str}"
        
        return True, "Valid test case"
        
    except ValueError as e:
        return False, f"Invalid integer format: {e}"
```
