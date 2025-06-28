# Test Cases for Closures

## Test Case Structure
This question uses multi-line input format with operations to create and manipulate closures.

### Input Format Pattern:
```
Line 1: n (number of operations)
Lines 2 to n+1: operation commands
```

### Output Format Pattern:
```
Each CALL operation produces one line of output (integer result)
```

## Test Case 1: Basic Operations
**Input (`input.txt`):**
```
8
CREATE COUNTER cnt1 0
CALL cnt1 5
CALL cnt1 3
CREATE MULTIPLIER mult1 4
CALL mult1 5
RESET cnt1
CALL cnt1 2
CALL mult1 7
```
**Expected Output (`expected.txt`):**
```
5
8
20
2
28
```

**Explanation**: 
- Counter starts at 0, +5 = 5, +3 = 8
- Multiplier with factor 4: 5*4 = 20, 7*4 = 28
- Counter reset to 0, +2 = 2

## Test Case 2: Accumulator and Edge Cases
**Input (`input2.txt`):**
```
10
CREATE ACCUMULATOR acc1 10
CALL acc1 5
CALL acc1 -3
CREATE COUNTER cnt1 1
CALL cnt1 1
CALL acc1 2
RESET acc1
CALL acc1 0
CREATE MULTIPLIER mult1 -2
CALL mult1 3
```
**Expected Output (`expected2.txt`):**
```
15
12
2
14
10
-6
```

**Explanation**: Tests negative values, reset functionality, and multiple function types

## Test Case 3: Complex State Management
**Input (`input3.txt`):**
```
15
CREATE COUNTER cnt1 100
CREATE COUNTER cnt2 200
CREATE ACCUMULATOR acc1 0
CREATE MULTIPLIER mult1 3
CALL cnt1 -10
CALL cnt2 -20
CALL acc1 50
CALL mult1 4
RESET cnt1
CALL cnt1 5
CALL cnt2 -30
CALL acc1 -25
CALL mult1 -2
RESET acc1
CALL acc1 100
```
**Expected Output (`expected3.txt`):**
```
90
180
50
12
105
150
25
-6
0
100
```

**Explanation**: Tests multiple instances of same type, negative operations, and state isolation

## Test Case Creation Rules

### Input Validation Rules:
1. Number of operations n is between 1 and 1000
2. Function names contain only alphanumeric characters
3. CREATE operations must specify valid type (COUNTER, MULTIPLIER, ACCUMULATOR)
4. CALL operations reference existing functions only
5. RESET operations reference existing functions only
6. Integer values are in range [-1000, 1000]

### Output Format Rules:
1. Each CALL operation produces exactly one integer on a separate line
2. No output for CREATE or RESET operations
3. Results can be negative
4. No trailing whitespace

## Performance Test Considerations

### Time Complexity Analysis:
- Function creation: O(1)
- Function calls: O(1)
- Reset operations: O(1)
- Overall: O(n) where n is number of operations

### Memory Usage:
- Each function stores minimal state (1-2 variables)
- Space complexity: O(k) where k is number of created functions

### Stress Test Scenarios:
1. Maximum operations (1000)
2. Many function instances of same type
3. Frequent reset operations
4. Large accumulated values
5. Deep call sequences

## Language-Specific Considerations

### Python Considerations:
- Use lists or objects to store mutable state in closures
- `nonlocal` keyword can be used for simple variable modification
- Function attributes can store reset methods
- Lambda functions can be used for simple cases

### JavaScript Considerations:
- Use objects or arrays for mutable state
- Arrow functions capture `this` differently than regular functions  
- Consider using class instances for complex state management
- Module pattern can provide cleaner encapsulation

### Go Considerations:
- Use struct methods or function types
- Capture variables in anonymous functions
- Consider using interfaces for different function types
- Pointer receivers for state modification

## Validation Checklist
- [ ] All function types (COUNTER, MULTIPLIER, ACCUMULATOR) implemented correctly
- [ ] State properly maintained across multiple calls
- [ ] Reset functionality works correctly
- [ ] Negative values handled properly
- [ ] Multiple instances of same type work independently
- [ ] Error handling for invalid operations
- [ ] Output format matches exactly (integers on separate lines)
- [ ] Performance meets time constraints
- [ ] Memory usage is reasonable

## Automated Test Case Generation
```python
def generate_test_case(num_operations=50, max_functions=10):
    """Generate random test case with specified constraints"""
    import random
    
    operations = []
    functions = {}
    types = ['COUNTER', 'MULTIPLIER', 'ACCUMULATOR']
    
    for i in range(num_operations):
        if not functions or random.random() < 0.3:  # 30% chance to create
            func_type = random.choice(types)
            name = f"f{len(functions)}"
            value = random.randint(-100, 100)
            operations.append(f"CREATE {func_type} {name} {value}")
            functions[name] = func_type
        else:
            action = random.choice(['CALL', 'RESET'])
            name = random.choice(list(functions.keys()))
            if action == 'CALL':
                arg = random.randint(-100, 100)
                operations.append(f"CALL {name} {arg}")
            else:
                operations.append(f"RESET {name}")
    
    return operations

def validate_test_case(input_content, expected_content):
    """Validate that test case follows format rules"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate number of operations matches
    assert len(lines) == n + 1, "Operation count mismatch"
    
    # Validate each operation format
    for i in range(1, n + 1):
        parts = lines[i].split()
        assert parts[0] in ['CREATE', 'CALL', 'RESET'], f"Invalid operation: {parts[0]}"
        
        if parts[0] == 'CREATE':
            assert len(parts) == 4, "CREATE requires 4 parts"
            assert parts[1] in ['COUNTER', 'MULTIPLIER', 'ACCUMULATOR'], f"Invalid type: {parts[1]}"
    
    return True
```
