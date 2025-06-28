# Test Cases for Static Methods and Variables

## Test Case Structure
This question uses a multi-operation input format where the first line specifies the number of operations, followed by operation commands.

### Input Format Pattern:
```
Line 1: N (number of operations)
Lines 2 to N+1: Operation commands
```

### Operation Types:
1. `CREATE <name> <grade>` - Create new student
2. `STATS` - Display class statistics  
3. `STUDENT <name>` - Display student information
4. `UPDATE <name> <new_grade>` - Update student grade

### Output Format Pattern:
- `STATS`: `"Total: X, Sum: Y, Average: Z.ZZ"`
- `STUDENT <name>`: `"name: grade"` or `"Student name not found"`
- No output for `CREATE` and successful `UPDATE` operations

## Test Case 1: Basic Operations
**Purpose**: Test fundamental CREATE, STATS, and STUDENT operations

**Input (`input.txt`):**
```
7
CREATE Alice 85
CREATE Bob 90
STATS
STUDENT Alice
CREATE Charlie 78
STATS
STUDENT Bob
```

**Expected Output (`expected.txt`):**
```
Total: 2, Sum: 175, Average: 87.50
Alice: 85
Total: 3, Sum: 253, Average: 84.33
Bob: 90
```

**Learning Focus**: Basic static variable updates, static method calls, instance method usage

## Test Case 2: Edge Cases and Error Handling
**Purpose**: Test edge cases including empty database, missing students, and boundary values

**Input (`input2.txt`):**
```
8
STATS
CREATE John 100
STATS
STUDENT John
STUDENT NotFound
CREATE Jane 0
STATS
UPDATE Missing 50
```

**Expected Output (`expected2.txt`):**
```
Total: 0, Sum: 0, Average: 0.00
Total: 1, Sum: 100, Average: 100.00
John: 100
Student NotFound not found
Total: 2, Sum: 100, Average: 50.00
Student Missing not found
```

**Learning Focus**: Handling division by zero in average calculation, error handling for missing students

## Test Case 3: Performance and UPDATE Operations
**Purpose**: Test UPDATE functionality and performance with larger datasets

**Input (`input3.txt`):**
```
12
CREATE Alex 75
CREATE Beth 82
CREATE Carl 90
STATS
UPDATE Alex 95
STATS
STUDENT Alex
UPDATE Beth 88
STATS
CREATE Dana 76
STATS
STUDENT Dana
```

**Expected Output (`expected3.txt`):**
```
Total: 3, Sum: 247, Average: 82.33
Total: 3, Sum: 267, Average: 89.00
Alex: 95
Total: 3, Sum: 273, Average: 91.00
Total: 4, Sum: 349, Average: 87.25
Dana: 76
```

**Learning Focus**: Static variable updates during grade changes, maintaining data consistency

## Test Case Creation Rules

### Input Validation Rules:
1. **Operation Count**: 1 ≤ N ≤ 10,000
2. **Student Names**: Unique strings, max 50 characters, no spaces
3. **Grades**: Integers from 0 to 100
4. **Operations**: Must match exact format (case-sensitive)
5. **Maximum Students**: Up to 5,000 students can be created

### Output Format Rules:
1. **STATS Format**: Exactly `"Total: X, Sum: Y, Average: Z.ZZ"`
2. **Average Precision**: Always 2 decimal places (use `.2f` formatting)
3. **Student Format**: `"name: grade"` (colon and space)
4. **Error Messages**: `"Student name not found"` (exact wording)
5. **No Trailing Whitespace**: Clean line endings

### Edge Cases to Consider:
1. **Empty Database**: STATS with 0 students (average should be 0.00)
2. **Missing Students**: STUDENT and UPDATE operations on non-existent students
3. **Boundary Grades**: Grades of 0 and 100
4. **Single Student**: Operations with only one student
5. **Grade Updates**: Ensuring statistics remain consistent after updates

## Language-Specific Considerations

### Python Considerations:
- Use `@staticmethod` decorator for static methods
- Class variables for static data: `ClassName.variable`
- Format average with `f"{avg:.2f}"` for 2 decimal places
- Handle division by zero in average calculation
- Use dictionaries for efficient student lookup

### Go Considerations:
- Use package-level variables for static data
- Functions outside structs act as static methods
- Format average with `fmt.Sprintf("%.2f", avg)`
- Use maps for student lookup: `map[string]*StudentTracker`
- Initialize maps with `make(map[string]*StudentTracker)`

### JavaScript Considerations:
- Use static class methods: `static methodName()`
- Static properties: `ClassName.property`
- Format average with `parseFloat(avg).toFixed(2)`
- Use Map or object for student storage

## Validation Checklist
- [ ] All operations produce correct output format
- [ ] STATS calculations are accurate (total, sum, average)
- [ ] Average always formatted to 2 decimal places
- [ ] Student lookup works correctly (both found and not found)
- [ ] UPDATE operations maintain statistical consistency
- [ ] Edge case of 0 students handled (average = 0.00)
- [ ] Error messages match exact expected format
- [ ] Performance acceptable for large inputs (up to 10,000 operations)
- [ ] Static vs instance methods used appropriately
- [ ] Class-wide data properly shared across all instances

## Automated Test Case Generation

```python
def generate_test_case(num_operations, num_students):
    """Generate a test case with specified parameters"""
    operations = [str(num_operations)]
    expected = []
    
    # Generate CREATE operations
    for i in range(num_students):
        name = f"Student{i}"
        grade = 50 + (i % 50)  # Grades from 50-99
        operations.append(f"CREATE {name} {grade}")
    
    # Add STATS operation
    operations.append("STATS")
    total = num_students
    total_sum = sum(50 + (i % 50) for i in range(num_students))
    avg = total_sum / total if total > 0 else 0
    expected.append(f"Total: {total}, Sum: {total_sum}, Average: {avg:.2f}")
    
    return operations, expected

def validate_test_case(input_content, expected_content):
    """Validate test case format and consistency"""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Validate input format
    try:
        n = int(input_lines[0])
        assert len(input_lines) == n + 1, "Operation count mismatch"
    except:
        return False, "Invalid input format"
    
    # Validate operations
    for i in range(1, n + 1):
        op = input_lines[i].split()
        if op[0] not in ['CREATE', 'STATS', 'STUDENT', 'UPDATE']:
            return False, f"Invalid operation: {op[0]}"
        
        if op[0] == 'CREATE' and len(op) != 3:
            return False, "CREATE operation requires name and grade"
        
        if op[0] in ['STUDENT', 'UPDATE'] and len(op) < 2:
            return False, f"{op[0]} operation requires student name"
    
    return True, "Valid test case"
```

## Performance Benchmarks
- **Small Input**: Up to 100 operations should complete in < 0.1 seconds
- **Medium Input**: Up to 1,000 operations should complete in < 1 second  
- **Large Input**: Up to 10,000 operations should complete in < 5 seconds
- **Memory Usage**: Should handle 5,000 students efficiently (< 50MB memory)

Expected time complexity: O(N) where N is the number of operations
Expected space complexity: O(S) where S is the number of unique students
