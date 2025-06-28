# Multiple Inheritance (Where Applicable)

## Problem Statement

Design and implement a class hierarchy system that demonstrates multiple inheritance concepts. Your system should handle different types of people: basic Person, Worker, Student, and WorkingStudent (who inherits from both Worker and Student).

The system should support creating instances of these classes and calling their methods, while properly handling method resolution order (MRO) in multiple inheritance scenarios.

**Real-world Context**: Many programming languages support multiple inheritance (like Python, C++), while others use interfaces or mixins to achieve similar functionality. Understanding how method resolution works in multiple inheritance is crucial for designing robust object-oriented systems.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of commands)
Lines 2 to N+1: Commands in one of these formats:
  - CREATE class_type instance_name [args...]
  - CALL instance_name method_name [args...]
  - MRO class_type
```

**Command Details:**
- `CREATE Person name`: Creates a Person instance
- `CREATE Worker name job`: Creates a Worker instance  
- `CREATE Student name school`: Creates a Student instance
- `CREATE WorkingStudent name job school`: Creates a WorkingStudent instance
- `CALL instance method`: Calls a method on an instance
- `MRO class_type`: Shows method resolution order for a class

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand multiple inheritance and its applications
- Learn method resolution order (MRO) in programming languages
- Practice handling diamond inheritance problems
- Understand cooperative inheritance using super()
- Learn the difference between composition and multiple inheritance
- Understand when to use multiple inheritance vs interfaces/mixins

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Read number of commands
    n = int(input())
    instances = {}
    
    for _ in range(n):
        command = input().strip().split()
        cmd_type = command[0]
        
        if cmd_type == "CREATE":
            # Handle class creation
            pass
        elif cmd_type == "CALL":
            # Handle method calls
            pass
        elif cmd_type == "MRO":
            # Show method resolution order
            pass

# Define your class hierarchy here
class Person:
    # Base class with name attribute
    pass

class Worker(Person):
    # Inherits from Person, adds job functionality
    pass

class Student(Person):
    # Inherits from Person, adds school functionality
    pass

class WorkingStudent(Worker, Student):
    # Multiple inheritance from Worker and Student
    pass
```

### Key Methods to Implement:
- `Person.introduce()`: Returns "I am {name}"
- `Person.get_info()`: Returns person information
- `Worker.work()`: Returns work-related message
- `Student.study()`: Returns study-related message  
- `WorkingStudent.balance()`: Returns message about balancing work and study

## Constraints
- Number of commands: 1 ≤ N ≤ 100
- Instance names: 1-10 characters, alphanumeric
- Person names: 1-20 characters
- Job titles: 1-20 characters
- School names: 1-30 characters
- All inputs are valid and well-formed
- Maximum 20 instances can be created

## Hints
- **Start Simple**: Begin with the Person base class and basic methods
- **Cooperative Inheritance**: Use `super()` and `**kwargs` for proper multiple inheritance
- **Method Resolution Order**: Python uses C3 linearization algorithm for MRO
- **Diamond Problem**: Handle cases where methods exist in multiple parent classes
- **Testing Strategy**: Test single inheritance first, then multiple inheritance scenarios
- **Debugging Tip**: Use `__mro__` attribute to understand method resolution order
