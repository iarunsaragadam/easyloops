# Test Cases for Decorators and Function Composition

## Test Case Structure

This question uses a **multi-line input format** where students build function pipelines using decorators and function composition.

### Input Format Pattern:
```
Line 1: Initial integer value
Line 2: Number of operations n
Next n lines: Operation specifications
```

### Output Format Pattern:
```
<final_result>
```

## Test Case Categories

### Basic Test Cases (input1.txt to input25.txt)
Simple, straightforward operations that test fundamental decorator concepts.

**Example - Test Case 1: Sequential Addition**
```
Input:
10
2
add 5
add 3

Expected Output:
18
```

**Example - Test Case 2: Multiplication Chain**
```
Input:
4
2
multiply 3
multiply 2

Expected Output:
24
```

### Edge Cases (input26.txt to input50.txt)
Boundary conditions, empty inputs, and special values.

**Example - Test Case 26: Zero Operations**
```
Input:
42
0

Expected Output:
42
```

**Example - Test Case 27: Negative Values**
```
Input:
-10
3
add 5
negate
abs

Expected Output:
5
```

### Performance Test Cases (input51.txt to input75.txt)
Large inputs that test efficiency and timeout poor algorithms.

**Example - Test Case 51: Maximum Operations**
```
Input:
1
100
add 1
add 1
... (98 more add 1 operations)

Expected Output:
101
```

### Complex Scenarios (input76.txt to input95.txt)
Multiple edge cases combined, realistic usage patterns.

**Example - Test Case 76: Mixed Operations**
```
Input:
-5
6
abs
square
add 10
multiply 2
negate
abs

Expected Output:
80
```

### Corner Cases (input96.txt to input100.txt)
Unusual but valid inputs that test robustness.

## Test Case Creation Rules

### Input Validation Rules:
1. **Initial value**: Must be an integer within range [-10,000, 10,000]
2. **Number of operations**: Must be integer within range [0, 100]
3. **Operation format**: Must follow exact format specifications
4. **Parameters**: Must be within specified ranges for each operation type
5. **Line format**: Each line must be properly formatted (no extra spaces, correct syntax)

### Output Format Rules:
1. **Single integer**: Output must be exactly one integer
2. **No extra whitespace**: No leading/trailing spaces or extra newlines
3. **Integer range**: Final result must fit in 64-bit signed integer
4. **Calculation accuracy**: Results must be mathematically correct

### Operation-Specific Rules:

#### Add Operation:
- Format: `add X` where X is integer
- Range: -1,000 ≤ X ≤ 1,000
- Example: `add 42`, `add -17`

#### Multiply Operation:
- Format: `multiply X` where X is integer
- Range: -100 ≤ X ≤ 100, X ≠ 0
- Example: `multiply 5`, `multiply -3`

#### Square Operation:
- Format: `square` (no parameters)
- Effect: value = value * value
- Example: `square`

#### Negate Operation:
- Format: `negate` (no parameters)
- Effect: value = -value
- Example: `negate`

#### Absolute Value Operation:
- Format: `abs` (no parameters)
- Effect: value = |value|
- Example: `abs`

## Language-Specific Considerations

### Python Considerations:
- **Decorator Syntax**: Use `@decorator` syntax or manual application
- **Closure Variables**: Proper variable capture in nested functions
- **Function Composition**: Chain decorators using compose function or manual application
- **Parameter Handling**: Parameterized decorators return decorator functions
- **Identity Function**: Use `lambda x: x` as base function

### Go Considerations:
- **Higher-Order Functions**: Implement function composition using function types
- **Function Types**: Define `type IntFunc func(int) int`
- **Closure Equivalent**: Use function returns and variable capture
- **Composition**: Chain functions manually or with helper functions
- **No Decorators**: Implement equivalent functionality with function wrapping

## Comprehensive Test Case Examples

### Test Case 1: Basic Pipeline
**Input (`input1.txt`):**
```
5
3
add 10
multiply 2
square
```
**Expected Output (`expected1.txt`):**
```
900
```
**Description:** Tests basic decorator chaining with different operation types.

### Test Case 2: Identity Case
**Input (`input2.txt`):**
```
100
0
```
**Expected Output (`expected2.txt`):**
```
100
```
**Description:** Tests empty pipeline (no operations applied).

### Test Case 3: Negative Handling
**Input (`input3.txt`):**
```
-8
4
abs
square
negate
abs
```
**Expected Output (`expected3.txt`):**
```
64
```
**Description:** Tests proper handling of negative values and abs operation.

### Test Case 4: Large Chain
**Input (`input4.txt`):**
```
1
50
add 1
multiply 2
add 1
multiply 2
... (pattern repeats)
```
**Expected Output (`expected4.txt`):**
```
[calculated result]
```
**Description:** Tests performance with many operations in sequence.

## Test Case Generation Strategy

### Automated Generation Categories:

1. **Single Operation Tests (10 cases)**
   - Test each operation type individually
   - Various parameter values within valid ranges

2. **Two Operation Combinations (15 cases)**
   - All pairwise combinations of operation types
   - Test interaction between different operations

3. **Random Valid Pipelines (25 cases)**
   - Random operation sequences with valid parameters
   - Varying pipeline lengths from 1 to 30 operations

4. **Edge Value Tests (20 cases)**
   - Boundary values for initial value and parameters
   - Maximum and minimum valid inputs

5. **Performance Tests (20 cases)**
   - Long chains (50-100 operations)
   - Repeated patterns that might expose inefficiencies

6. **Error Boundary Tests (10 cases)**
   - Values at the edge of valid ranges
   - Operations that might cause overflow/underflow

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input format matches specification exactly
- [ ] Initial value is within valid range [-10,000, 10,000]
- [ ] Number of operations is within valid range [0, 100]
- [ ] All operation specifications are properly formatted
- [ ] All parameters are within valid ranges
- [ ] Expected output is calculated correctly
- [ ] Final result fits in 64-bit signed integer
- [ ] No trailing whitespace in input or output files
- [ ] Each file ends with exactly one newline

## Automated Test Case Generation

```python
import random

def generate_test_case(case_number, category):
    """Generate a test case based on category and number"""
    
    # Set random seed for reproducibility
    random.seed(case_number)
    
    # Generate initial value
    if category == "basic":
        initial_value = random.randint(-100, 100)
        num_ops = random.randint(1, 5)
    elif category == "edge":
        initial_value = random.choice([-10000, -1, 0, 1, 10000])
        num_ops = random.choice([0, 1, 100])
    elif category == "performance":
        initial_value = random.randint(-1000, 1000)
        num_ops = random.randint(50, 100)
    else:  # complex
        initial_value = random.randint(-5000, 5000)
        num_ops = random.randint(10, 30)
    
    # Generate operations
    operations = []
    for _ in range(num_ops):
        op_type = random.choice(["add", "multiply", "square", "negate", "abs"])
        
        if op_type == "add":
            param = random.randint(-1000, 1000)
            operations.append(f"add {param}")
        elif op_type == "multiply":
            param = random.choice([x for x in range(-100, 101) if x != 0])
            operations.append(f"multiply {param}")
        else:
            operations.append(op_type)
    
    # Generate input content
    input_content = f"{initial_value}\n{num_ops}\n"
    input_content += "\n".join(operations) + "\n"
    
    # Calculate expected output
    value = initial_value
    for op in operations:
        parts = op.split()
        if parts[0] == "add":
            value += int(parts[1])
        elif parts[0] == "multiply":
            value *= int(parts[1])
        elif parts[0] == "square":
            value = value * value
        elif parts[0] == "negate":
            value = -value
        elif parts[0] == "abs":
            value = abs(value)
    
    expected_content = f"{value}\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows all rules"""
    lines = input_content.strip().split('\n')
    
    # Check format
    if len(lines) < 2:
        return False, "Not enough lines"
    
    try:
        initial_value = int(lines[0])
        num_ops = int(lines[1])
    except ValueError:
        return False, "Invalid integer format"
    
    # Check ranges
    if not (-10000 <= initial_value <= 10000):
        return False, "Initial value out of range"
    
    if not (0 <= num_ops <= 100):
        return False, "Number of operations out of range"
    
    if len(lines) != num_ops + 2:
        return False, "Incorrect number of operation lines"
    
    # Validate operations
    for i in range(2, len(lines)):
        op_line = lines[i]
        parts = op_line.split()
        
        if len(parts) == 0:
            return False, f"Empty operation line {i-1}"
        
        op_type = parts[0]
        
        if op_type == "add":
            if len(parts) != 2:
                return False, f"Add operation missing parameter at line {i-1}"
            try:
                param = int(parts[1])
                if not (-1000 <= param <= 1000):
                    return False, f"Add parameter out of range at line {i-1}"
            except ValueError:
                return False, f"Invalid add parameter at line {i-1}"
                
        elif op_type == "multiply":
            if len(parts) != 2:
                return False, f"Multiply operation missing parameter at line {i-1}"
            try:
                param = int(parts[1])
                if not (-100 <= param <= 100) or param == 0:
                    return False, f"Multiply parameter out of range at line {i-1}"
            except ValueError:
                return False, f"Invalid multiply parameter at line {i-1}"
                
        elif op_type in ["square", "negate", "abs"]:
            if len(parts) != 1:
                return False, f"Operation {op_type} should not have parameters at line {i-1}"
        else:
            return False, f"Unknown operation {op_type} at line {i-1}"
    
    # Check expected output format
    try:
        expected_value = int(expected_content.strip())
        # Check if result fits in reasonable range
        if abs(expected_value) > 2**63 - 1:
            return False, "Expected result too large"
    except ValueError:
        return False, "Invalid expected output format"
    
    return True, "Valid"
```

## Quality Assurance

### Manual Review Checklist:
- [ ] All 100+ test cases generated successfully
- [ ] Basic cases cover fundamental concepts (25 cases)
- [ ] Edge cases test boundary conditions (25 cases)  
- [ ] Performance cases test efficiency (25 cases)
- [ ] Complex cases test realistic scenarios (20 cases)
- [ ] Corner cases test unusual inputs (5+ cases)
- [ ] All expected outputs calculated correctly
- [ ] No duplicate test cases
- [ ] Test case difficulty progresses appropriately
- [ ] All files properly formatted with correct line endings

### Automated Validation:
- [ ] All input files parse correctly
- [ ] All operations within valid parameter ranges
- [ ] All expected outputs are valid integers
- [ ] Test cases cover all operation types
- [ ] Test cases include both positive and negative values
- [ ] Performance test cases have sufficient complexity
