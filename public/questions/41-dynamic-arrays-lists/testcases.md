# Test Cases for Dynamic Arrays/Lists

## Test Case Structure

This question uses a multi-line input format where the first line specifies the number of operations, followed by individual operation commands.

### Input Format Pattern:
```
Line 1: n (number of operations, 1 ≤ n ≤ 1000)
Lines 2 to n+1: operation commands in one of these formats:
  - ADD x (add integer x to end of array)
  - REMOVE (remove last element)
  - GET i (get element at index i)
  - SIZE (get current array size)
  - PRINT (print all elements)
```

### Output Format Pattern:
```
For each operation, output one line:
  - ADD x: "Added x"
  - REMOVE: "Removed x" or "Error: Array is empty"
  - GET i: "Element at index i: x" or "Error: Index out of bounds"
  - SIZE: "Size: n"
  - PRINT: "Array: x1 x2 ... xn" or "Array: empty"
```

## Test Case 1: Basic Operations
**Input (`input.txt`):**
```
8
ADD 10
ADD 20
SIZE
PRINT
GET 1
REMOVE
SIZE
PRINT
```
**Expected Output (`expected.txt`):**
```
Added 10
Added 20
Size: 2
Array: 10 20
Element at index 1: 20
Removed 20
Size: 1
Array: 10
```
**Description:** Tests fundamental dynamic array operations including addition, removal, size checking, printing, and element access.

## Test Case 2: Edge Cases and Error Handling
**Input (`input2.txt`):**
```
10
SIZE
PRINT
REMOVE
ADD 5
GET 0
GET 1
ADD -10
GET 1
REMOVE
REMOVE
```
**Expected Output (`expected2.txt`):**
```
Size: 0
Array: empty
Error: Array is empty
Added 5
Element at index 0: 5
Error: Index out of bounds
Added -10
Element at index 1: -10
Removed -10
Removed 5
```
**Description:** Tests edge cases including empty array operations, out-of-bounds access, and negative numbers.

## Test Case 3: Performance and Complex Operations
**Input (`input3.txt`):**
```
79
ADD 0
ADD 1
... (50 ADD operations)
SIZE
GET 0
GET 25
GET 49
... (10 REMOVE operations)
... (10 more ADD operations with values 100-109)
... (final SIZE, GET, PRINT operations)
```
**Expected Output (`expected3.txt`):**
```
Added 0
Added 1
... (corresponding outputs for all operations)
```
**Description:** Tests performance with many operations (79 total), demonstrates array growth and shrinkage, and validates complex sequences.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer n (1 ≤ n ≤ 1000)
2. Must have exactly n+1 lines total (first line + n operation lines)
3. ADD operations must include a valid integer value (-1000 ≤ value ≤ 1000)
4. GET operations must include a non-negative integer index
5. REMOVE, SIZE, and PRINT operations have no additional parameters
6. All operation names must be uppercase

### Output Format Rules:
1. Each operation produces exactly one line of output
2. ADD outputs: "Added {value}"
3. REMOVE outputs: "Removed {value}" or "Error: Array is empty"
4. GET outputs: "Element at index {i}: {value}" or "Error: Index out of bounds"
5. SIZE outputs: "Size: {n}"
6. PRINT outputs: "Array: {space-separated elements}" or "Array: empty"
7. Error messages are case-sensitive and must match exactly

## Language-Specific Considerations
### Python Considerations:
- Use `list.append()` for ADD operations
- Use `list.pop()` for REMOVE operations  
- Check `len(list) > 0` before removing elements
- Check `0 <= index < len(list)` before accessing elements
- Use `" ".join(map(str, list))` for PRINT formatting

### Go Considerations:
- Use `append(slice, element)` for ADD operations
- Use `slice[:len(slice)-1]` for REMOVE operations
- Check `len(slice) > 0` before removing elements
- Check `index >= 0 && index < len(slice)` before accessing
- Use string building or fmt.Printf for output formatting

### JavaScript Considerations:
- Use `array.push()` for ADD operations
- Use `array.pop()` for REMOVE operations
- Check `array.length > 0` before removing elements
- Use `array.join(' ')` for PRINT formatting

## Validation Checklist
- [ ] Input has exactly n+1 lines (where n is from first line)
- [ ] First line contains a valid positive integer (1 ≤ n ≤ 1000)
- [ ] All operation names are uppercase and valid (ADD, REMOVE, GET, SIZE, PRINT)
- [ ] ADD operations include valid integer values (-1000 ≤ value ≤ 1000)
- [ ] GET operations include valid non-negative integer indices
- [ ] Output format matches exactly (case-sensitive error messages)
- [ ] Each operation produces exactly one line of output
- [ ] Array operations handle empty array cases correctly
- [ ] Index bounds checking is implemented properly
- [ ] PRINT operation formats elements with single spaces

## Automated Test Case Generation
```python
def generate_test_case(num_operations=20, max_value=100):
    """Generate a random test case for dynamic arrays."""
    import random
    
    operations = []
    expected_output = []
    current_array = []
    
    operations.append(str(num_operations))
    
    for _ in range(num_operations):
        # Choose random operation with weighted probabilities
        op_type = random.choices(
            ['ADD', 'REMOVE', 'GET', 'SIZE', 'PRINT'],
            weights=[40, 20, 20, 10, 10]
        )[0]
        
        if op_type == 'ADD':
            value = random.randint(-max_value, max_value)
            operations.append(f"ADD {value}")
            current_array.append(value)
            expected_output.append(f"Added {value}")
            
        elif op_type == 'REMOVE':
            operations.append("REMOVE")
            if current_array:
                removed = current_array.pop()
                expected_output.append(f"Removed {removed}")
            else:
                expected_output.append("Error: Array is empty")
                
        elif op_type == 'GET':
            if current_array:
                index = random.randint(0, max(0, len(current_array) - 1))
                if index < len(current_array):
                    operations.append(f"GET {index}")
                    expected_output.append(f"Element at index {index}: {current_array[index]}")
                else:
                    operations.append(f"GET {len(current_array)}")
                    expected_output.append("Error: Index out of bounds")
            else:
                operations.append("GET 0")
                expected_output.append("Error: Index out of bounds")
                
        elif op_type == 'SIZE':
            operations.append("SIZE")
            expected_output.append(f"Size: {len(current_array)}")
            
        elif op_type == 'PRINT':
            operations.append("PRINT")
            if current_array:
                expected_output.append("Array: " + " ".join(map(str, current_array)))
            else:
                expected_output.append("Array: empty")
    
    input_content = "\n".join(operations) + "\n"
    expected_content = "\n".join(expected_output) + "\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the correct format."""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Check input format
    if len(input_lines) < 1:
        return False, "Input must have at least one line"
    
    try:
        n = int(input_lines[0])
        if n < 1 or n > 1000:
            return False, "Number of operations must be between 1 and 1000"
        if len(input_lines) != n + 1:
            return False, f"Expected {n+1} lines, got {len(input_lines)}"
    except ValueError:
        return False, "First line must be a valid integer"
    
    # Validate operations
    valid_ops = {'ADD', 'REMOVE', 'GET', 'SIZE', 'PRINT'}
    for i, line in enumerate(input_lines[1:], 2):
        parts = line.split()
        if not parts or parts[0] not in valid_ops:
            return False, f"Invalid operation on line {i}: {line}"
    
    # Check expected output has correct number of lines
    if len(expected_lines) != n:
        return False, f"Expected {n} output lines, got {len(expected_lines)}"
    
    return True, "Test case is valid"
```
