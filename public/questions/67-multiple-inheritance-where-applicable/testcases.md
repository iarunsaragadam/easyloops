# Test Cases for Multiple Inheritance (Where Applicable)

## Test Case Structure
This question uses a multi-line command-based input format to test multiple inheritance concepts.

### Input Format Pattern:
```
Line 1: N (number of commands)
Lines 2 to N+1: Commands (CREATE, CALL, MRO)
```

### Output Format Pattern:
```
Results of method calls and MRO queries, one per line
```

## Test Case 1: Basic Inheritance (input.txt)
**Purpose**: Test basic single inheritance and method calls
**Input (`input.txt`):**
```
7
CREATE Person p1 Alice
CREATE Worker w1 Bob Engineer
CREATE Student s1 Charlie MIT
CREATE WorkingStudent ws1 Dave Developer Harvard
CALL p1 introduce
CALL ws1 balance
MRO WorkingStudent
```
**Expected Output (`expected.txt`):**
```
I am Alice
Dave balances work at Developer and studies at Harvard
WorkingStudent -> Worker -> Student -> Person -> object
```

## Test Case 2: Method Resolution Edge Cases (input2.txt)
**Purpose**: Test method resolution order and get_info override behavior
**Input (`input2.txt`):**
```
8
CREATE Person p1 John
CREATE Worker w1 Jane Developer
CREATE Student s1 Jim Stanford
CREATE WorkingStudent ws1 Jill Analyst Yale
CALL p1 get_info
CALL w1 get_info
CALL s1 get_info
CALL ws1 get_info
```
**Expected Output (`expected2.txt`):**
```
Person: John
Worker: Jane, Job: Developer
Student: Jim, School: Stanford
WorkingStudent: Jill, Job: Analyst, School: Yale
```

## Test Case 3: Complex Multiple Inheritance (input3.txt)
**Purpose**: Test all methods and MRO for all classes
**Input (`input3.txt`):**
```
12
CREATE Person p1 Alice
CREATE Worker w1 Bob Manager
CREATE Student s1 Carol Harvard
CREATE WorkingStudent ws1 David Engineer MIT
CALL w1 work
CALL s1 study
CALL ws1 work
CALL ws1 study
CALL ws1 introduce
MRO Person
MRO Worker
MRO Student
```
**Expected Output (`expected3.txt`):**
```
Bob is working as Manager
Carol is studying at Harvard
David is working as Engineer
David is studying at MIT
I am David
Person -> object
Worker -> Person -> object
Student -> Person -> object
```

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a positive integer N (1 ≤ N ≤ 100)
2. Next N lines must contain valid commands
3. CREATE commands must have correct number of arguments
4. CALL commands must reference existing instances and methods
5. MRO commands must reference valid class names
6. Instance names must be unique within a test case

### Output Format Rules:
1. Each method call result appears on a new line
2. MRO output shows class names separated by " -> "
3. String outputs use exact formatting as specified
4. No extra whitespace or empty lines
5. Results appear in command execution order

### Performance Considerations:
1. Commands execute in O(1) time for basic operations
2. MRO lookup is O(k) where k is inheritance depth
3. Method calls are O(1) after instance lookup
4. Maximum memory usage scales with number of instances

## Language-Specific Considerations

### Python Considerations:
- Uses C3 linearization algorithm for MRO
- Multiple inheritance supported natively
- Super() handles cooperative inheritance
- **kwargs pattern helps with diamond inheritance
- __mro__ attribute available for inspection

### Languages Without Multiple Inheritance:
- **Java**: Use interfaces to simulate multiple inheritance
- **Go**: Use embedded structs and interfaces  
- **C#**: Use interfaces for multiple contract inheritance
- **JavaScript**: Use mixins or composition patterns

## Edge Cases to Test:

### Diamond Inheritance Pattern:
```
    Person
   /      \
Worker    Student  
   \      /
WorkingStudent
```

### Method Override Scenarios:
1. Method exists in one parent only
2. Method exists in both parents (MRO determines resolution)
3. Method overridden in child class
4. Method doesn't exist (error handling)

### Creation Edge Cases:
1. Empty string arguments
2. Single character names
3. Maximum length names
4. Special characters in names
5. Numeric-only names

## Validation Checklist
- [ ] All test cases have matching input/output pairs
- [ ] MRO output matches language specification  
- [ ] Method calls produce expected results
- [ ] Error cases handled appropriately
- [ ] Edge cases covered comprehensively
- [ ] Performance test cases included
- [ ] All class types tested
- [ ] Inheritance hierarchy fully exercised

## Automated Test Case Generation
```python
def generate_test_case(num_commands, complexity='basic'):
    """Generate test case with specified complexity"""
    commands = []
    instances = []
    
    # Generate CREATE commands
    for i in range(min(5, num_commands // 3)):
        class_type = random.choice(['Person', 'Worker', 'Student', 'WorkingStudent'])
        instance_name = f"obj{i}"
        # Add appropriate arguments based on class type
        
    # Generate CALL commands
    for instance in instances:
        method = random.choice(get_methods(instance.class_type))
        commands.append(f"CALL {instance.name} {method}")
        
    # Generate MRO commands
    for class_type in ['Person', 'Worker', 'Student', 'WorkingStudent']:
        commands.append(f"MRO {class_type}")
        
    return commands

def validate_test_case(input_content, expected_content):
    """Validate test case correctness"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate command count
    assert len(lines) == n + 1, "Command count mismatch"
    
    # Validate command syntax
    for i in range(1, n + 1):
        command = lines[i].split()
        assert command[0] in ['CREATE', 'CALL', 'MRO'], f"Invalid command: {command[0]}"
        
    # Validate expected output format
    expected_lines = expected_content.strip().split('\n')
    assert all(line.strip() for line in expected_lines), "Empty lines in output"
    
    return True
```

## Performance Test Cases
Include test cases that demonstrate:
1. Large number of instances (up to limit)
2. Deep inheritance hierarchies
3. Complex method resolution scenarios
4. Maximum argument lengths
5. Boundary condition testing

These test cases ensure students understand both the theoretical concepts and practical implementation challenges of multiple inheritance.
