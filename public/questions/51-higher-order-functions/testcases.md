# Test Cases for Higher-order functions

## Test Case Structure
This question uses a pipeline-based input format where operations are applied sequentially to transform an initial value.

### Input Format Pattern:
```
Line 1: initial_value | operation1, operation2, ..., operationN
```

### Output Format Pattern:
```
final_result (formatted as number with trailing zeros removed)
```

## Test Case 1: Basic Addition
**Input (`input1.txt`):**
```
5 | ADD 3
```
**Expected Output (`expected1.txt`):**
```
8
```
**Description**: Tests basic function composition - add 3 to 5 (=8)

## Test Case 2: Basic Multiplication
**Input (`input2.txt`):**
```
10 | MUL 2
```
**Expected Output (`expected2.txt`):**
```
20
```
**Description**: Tests basic multiplication operation

## Test Case 3: Basic Power
**Input (`input3.txt`):**
```
2 | POW 3
```
**Expected Output (`expected3.txt`):**
```
8
```
**Description**: Tests basic power operation - 2^3 = 8

## Test Case 13: No Operations
**Input (`input13.txt`):**
```
42
```
**Expected Output (`expected13.txt`):**
```
42
```
**Description**: Tests handling of input with no operations - should return the initial value unchanged

## Test Case 35: Complex Pipeline
**Input (`input35.txt`):**
```
5 | MUL 2, ADD 3, POW 2, SQRT, NEG
```
**Expected Output (`expected35.txt`):**
```
-13
```
**Description**: Tests complex pipeline: 5 → 10 (MUL 2) → 13 (ADD 3) → 169 (POW 2) → 13 (SQRT) → -13 (NEG)

## Test Case Creation Rules

### Input Validation Rules:
1. Initial value must be a valid number (integer or decimal)
2. Operations must be separated by commas
3. Pipe character `|` separates initial value from operations
4. Operation names are case-insensitive (ADD, add, Add all valid)
5. Operations with parameters must include the parameter (ADD 5, MUL 3, POW 2)
6. Operations without parameters need no additional values (ABS, NEG, SQRT)

### Output Format Rules:
1. Results should be formatted as numbers with unnecessary trailing zeros removed
2. Integer results should not have decimal points (e.g., "16" not "16.0")
3. Decimal results should show significant digits (e.g., "3.14159" not "3.141590000")
4. Very small decimals should use appropriate precision
5. Negative numbers should include the minus sign

### Operation Behavior Rules:
1. **ADD x**: Adds x to current value
2. **MUL x**: Multiplies current value by x
3. **POW x**: Raises current value to power x
4. **ABS**: Takes absolute value of current value
5. **NEG**: Negates current value (multiplies by -1)
6. **SQRT**: Takes square root if value ≥ 0, otherwise leaves unchanged

## Comprehensive Test Case Coverage (100+ Test Cases)

This question includes **100+ comprehensive test cases** (input1.txt to input100.txt with corresponding expected1.txt to expected100.txt) covering:

### Test Case Distribution:
1. **Basic Test Cases (Cases 1-12)**: Simple, straightforward operations
   - Single operation applications (ADD, MUL, POW, ABS, NEG, SQRT)
   - Two and three operation combinations
   - Basic mathematical transformations

2. **Edge Cases (Cases 13-26)**: Boundary conditions and special scenarios  
   - No operations (just initial value)
   - Zero-based operations (ADD 0, MUL 0, etc.)
   - Negative square root handling
   - Identity operations (NEG→NEG, SQRT→POW 2)

3. **Performance Test Cases (Cases 27-33)**: Long pipelines and large computations
   - 15-operation pipelines to test algorithmic efficiency
   - Large intermediate value calculations
   - Complex mathematical sequences

4. **Complex Scenarios (Cases 34-39)**: Advanced mathematical patterns
   - Multi-step mathematical transformations
   - Alternating operation patterns
   - Multiple square root applications

5. **Additional Test Cases (Cases 40-60)**: Medium complexity pipelines
   - 8-operation sequences with mixed operations
   - Specific operation combinations
   - Boundary value testing

6. **Random Test Cases (Cases 61-100)**: Diverse scenarios
   - Random operation combinations (1-8 operations)
   - Various initial values (-20 to 20)
   - Comprehensive coverage of all operation types

## Language-Specific Considerations

### Python Considerations:
- Use lambda functions for simple operation implementations
- Implement function factories that return operation functions
- Use list comprehensions for parsing operations
- Handle floating-point precision appropriately
- Use proper string formatting for output

### Go Considerations:
- Define function types for operation signatures
- Use closures to create parameterized operations
- Handle string parsing with proper error checking
- Use appropriate numeric types (float64 for calculations)
- Format output using proper Go formatting functions

### JavaScript Considerations:
- Use arrow functions for operation implementations
- Handle parseFloat for number parsing
- Use proper number formatting for output
- Consider floating-point precision issues
- Implement proper error handling for invalid inputs

## Validation Checklist
- [ ] Input has proper format with pipe separator (if operations exist)
- [ ] All operations are valid and properly formatted  
- [ ] Operation parameters are valid numbers
- [ ] Output formatting removes unnecessary trailing zeros
- [ ] Edge cases are handled (no operations, negative sqrt, etc.)
- [ ] Complex pipelines produce correct sequential results
- [ ] Performance test cases complete within time limits
- [ ] All 100+ test cases are generated from verified working solution
- [ ] Test cases cover basic, edge, performance, and complex scenarios
- [ ] Comprehensive coverage of all operation types and combinations

## Automated Test Case Generation
```python
def generate_basic_test_case():
    """Generate a basic test case with 2-3 operations"""
    import random
    
    initial = random.randint(-10, 10)
    operations = []
    
    # Add 2-3 random operations
    for _ in range(random.randint(2, 3)):
        op_type = random.choice(['ADD', 'MUL', 'POW', 'ABS', 'NEG', 'SQRT'])
        if op_type in ['ADD', 'MUL']:
            operations.append(f"{op_type} {random.randint(-5, 5)}")
        elif op_type == 'POW':
            operations.append(f"POW {random.randint(1, 3)}")
        else:
            operations.append(op_type)
    
    input_line = f"{initial} | {', '.join(operations)}"
    return input_line

def generate_edge_test_case():
    """Generate edge case test scenarios"""
    import random
    
    edge_cases = [
        "0",  # No operations
        "0 | ADD 0",  # Zero operations
        "-5 | SQRT",  # Negative sqrt
        "1 | MUL 0",  # Multiply by zero
        "10 | ADD -10",  # Cancel out
    ]
    
    return random.choice(edge_cases)

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted and solvable"""
    try:
        # Parse input
        line = input_content.strip()
        if '|' in line:
            initial_str, ops_str = line.split('|', 1)
            initial = float(initial_str.strip())
            operations = [op.strip() for op in ops_str.split(',')]
        else:
            initial = float(line)
            operations = []
        
        # Validate expected output is a number
        expected = float(expected_content.strip())
        
        return True
    except (ValueError, TypeError):
        return False
```

## Test Case Performance Targets
- **Basic Operations**: < 0.001 seconds
- **Complex Pipelines**: < 0.01 seconds  
- **Performance Cases**: < 0.1 seconds
- **Memory Usage**: < 1 MB per test case

These targets ensure that efficient higher-order function implementations will pass while inefficient approaches (like recursive parsing or excessive object creation) may timeout on performance test cases.
