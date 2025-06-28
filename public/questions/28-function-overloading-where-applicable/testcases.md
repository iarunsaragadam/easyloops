# Test Cases for Function Overloading (Where Applicable)

## Test Case Structure
This question uses a multi-line input format with operation type followed by numbers.

### Input Format Pattern:
```
Line 1: Operation type (add_two_int, add_two_float, add_three, add_list, multiply_two, multiply_three)
Line 2+: Numbers (format depends on operation)
```

### Output Format Pattern:
```
operation_name(parameters) = result
```

## Test Case Categories (100+ Test Cases Total)

### Basic Test Cases (input1.txt to input30.txt)
Simple operations testing core functionality:

**Test Case 1: Basic Integer Addition**
**Input (`input1.txt`):**
```
add_two_int
10
5
```
**Expected Output (`expected1.txt`):**
```
add_two_int(10, 5) = 15
```

**Test Case 2: Basic Float Addition**
**Input (`input2.txt`):**
```
add_two_float
3.14
2.86
```
**Expected Output (`expected2.txt`):**
```
add_two_float(3.14, 2.86) = 6.0
```

**Test Case 3: Basic Three Number Addition**
**Input (`input3.txt`):**
```
add_three
1.0
2.0
3.0
```
**Expected Output (`expected3.txt`):**
```
add_three(1.0, 2.0, 3.0) = 6.0
```

### Edge Test Cases (input31.txt to input60.txt)
Boundary conditions and special values:

**Test Case 31: Zero Values**
**Input (`input31.txt`):**
```
add_two_int
0
0
```
**Expected Output (`expected31.txt`):**
```
add_two_int(0, 0) = 0
```

**Test Case 32: Negative Numbers**
**Input (`input32.txt`):**
```
add_two_int
-5
-10
```
**Expected Output (`expected32.txt`):**
```
add_two_int(-5, -10) = -15
```

**Test Case 33: Single Item List**
**Input (`input33.txt`):**
```
add_list
1
42.0
```
**Expected Output (`expected33.txt`):**
```
add_list([42.0]) = 42.0
```

### Performance Test Cases (input61.txt to input80.txt)
Large inputs testing efficiency:

**Test Case 61: Large List Addition**
**Input (`input61.txt`):**
```
add_list
100
1.0
1.0
... (98 more lines of 1.0)
```
**Expected Output (`expected61.txt`):**
```
add_list([1.0, 1.0, ..., 1.0]) = 100.0
```

### Complex Test Cases (input81.txt to input95.txt)
Multiple edge cases combined:

**Test Case 81: Mixed Sign Multiplication**
**Input (`input81.txt`):**
```
multiply_three
-2.0
3.0
-4.0
```
**Expected Output (`expected81.txt`):**
```
multiply_three(-2.0, 3.0, -4.0) = 24.0
```

### Corner Test Cases (input96.txt to input100.txt)
Unusual but valid inputs:

**Test Case 96: Very Small Decimals**
**Input (`input96.txt`):**
```
add_two_float
0.001
0.002
```
**Expected Output (`expected96.txt`):**
```
add_two_float(0.001, 0.002) = 0.003
```

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a valid operation type
2. Operation types: add_two_int, add_two_float, add_three, add_list, multiply_two, multiply_three
3. Numbers must be within range -1000 to 1000
4. For add_list: count must be between 1 and 100
5. All numeric inputs must be valid numbers

### Output Format Rules:
1. Format: `operation_name(parameters) = result`
2. Parameters shown as comma-separated values
3. For list operations, show array notation: [1.0, 2.0, 3.0]
4. Results displayed as integers when possible, floats when necessary
5. No trailing zeros for integer results
6. Consistent spacing around operators

## Language-Specific Considerations

### Python Considerations:
- Use `*args` for variable argument functions
- Handle both int and float inputs appropriately
- Format output using f-strings for consistency
- Python doesn't support true overloading, demonstrate alternatives

### Go Considerations:
- Create separate function names since Go doesn't support overloading
- Use `bufio.Scanner` for input reading
- Handle type conversions explicitly with `strconv`
- Demonstrate how Go handles similar functionality without overloading

### JavaScript Considerations:
- Use rest parameters (...args) for variable arguments
- Handle type coercion carefully
- Show how JavaScript's dynamic typing affects overloading concepts

## Validation Checklist
- [ ] Input starts with valid operation name
- [ ] Correct number of parameters for each operation
- [ ] Numbers are within specified constraints
- [ ] Output format matches exactly
- [ ] Edge cases are covered (zeros, negatives, boundaries)
- [ ] Performance cases test large inputs
- [ ] All test cases are realistic and educational

## Automated Test Case Generation

```python
import random

def generate_test_case(test_type="basic", test_number=1):
    """Generate test case based on type and number"""
    operations = ["add_two_int", "add_two_float", "add_three", "add_list", "multiply_two", "multiply_three"]
    
    if test_type == "basic":
        op = operations[test_number % len(operations)]
    elif test_type == "edge":
        op = random.choice(operations)
    elif test_type == "performance":
        op = "add_list"  # Focus on list operations for performance
    else:
        op = random.choice(operations)
    
    if op == "add_two_int":
        a, b = random.randint(-100, 100), random.randint(-100, 100)
        input_content = f"{op}\n{a}\n{b}"
        expected = f"add_two_int({a}, {b}) = {a + b}"
        
    elif op == "add_two_float":
        a, b = round(random.uniform(-100, 100), 2), round(random.uniform(-100, 100), 2)
        input_content = f"{op}\n{a}\n{b}"
        expected = f"add_two_float({a}, {b}) = {a + b}"
        
    elif op == "add_three":
        a, b, c = [round(random.uniform(-100, 100), 1) for _ in range(3)]
        input_content = f"{op}\n{a}\n{b}\n{c}"
        expected = f"add_three({a}, {b}, {c}) = {a + b + c}"
        
    elif op == "add_list":
        count = random.randint(1, 20) if test_type != "performance" else random.randint(50, 100)
        numbers = [round(random.uniform(-10, 10), 1) for _ in range(count)]
        input_content = f"{op}\n{count}\n" + "\n".join(map(str, numbers))
        expected = f"add_list({numbers}) = {sum(numbers)}"
        
    elif op == "multiply_two":
        a, b = round(random.uniform(-10, 10), 1), round(random.uniform(-10, 10), 1)
        input_content = f"{op}\n{a}\n{b}"
        expected = f"multiply_two({a}, {b}) = {a * b}"
        
    elif op == "multiply_three":
        a, b, c = [round(random.uniform(-5, 5), 1) for _ in range(3)]
        input_content = f"{op}\n{a}\n{b}\n{c}"
        expected = f"multiply_three({a}, {b}, {c}) = {a * b * c}"
    
    return input_content, expected

def validate_test_case(input_content, expected_content):
    """Validate test case format and consistency"""
    lines = input_content.strip().split('\n')
    
    # Check operation type
    valid_ops = ["add_two_int", "add_two_float", "add_three", "add_list", "multiply_two", "multiply_three"]
    if lines[0] not in valid_ops:
        return False, f"Invalid operation: {lines[0]}"
    
    operation = lines[0]
    
    # Validate parameter count based on operation
    if operation in ["add_two_int", "add_two_float", "multiply_two"]:
        if len(lines) != 3:
            return False, f"Expected 3 lines for {operation}, got {len(lines)}"
    elif operation in ["add_three", "multiply_three"]:
        if len(lines) != 4:
            return False, f"Expected 4 lines for {operation}, got {len(lines)}"
    elif operation == "add_list":
        count = int(lines[1])
        if len(lines) != count + 2:
            return False, f"Expected {count + 2} lines for add_list, got {len(lines)}"
    
    # Validate numeric values
    try:
        if operation == "add_list":
            for i in range(2, len(lines)):
                float(lines[i])
        else:
            for i in range(1, len(lines)):
                float(lines[i])
    except ValueError:
        return False, "Invalid numeric values in input"
    
    return True, "Valid test case"
```
