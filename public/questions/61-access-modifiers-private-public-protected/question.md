# Access modifiers (private, public, protected)

## Problem Statement

You need to implement a Student Grade Management System that demonstrates proper use of access modifiers (public, private, and protected). The system should handle both students and teachers with appropriate access control.

Your program should:

1. Create a `Student` class with:
   - **Public attributes**: `name` and `student_id` (accessible from anywhere)
   - **Protected attribute**: `_grades` list (should only be accessed by subclasses)
   - **Private attribute**: `__secret_key` (only accessible within the class)

2. Implement appropriate methods with different access levels:
   - **Public methods**: `get_name()`, `get_id()`, `get_gpa()`, `verify_key()`
   - **Protected method**: `_add_grade()` (for subclass use)
   - **Private method**: `__calculate_gpa()` (internal use only)

3. Create a `Teacher` class that inherits from `Student` and demonstrates:
   - Access to protected members from the parent class
   - Proper use of inheritance and method overriding

4. Process a series of operations to demonstrate access control and encapsulation principles.

## Input Format

The input consists of multiple lines:
```
Line 1: Student/Teacher name (string)
Line 2: ID number (string)
Line 3: User type ("student" or "teacher")
Line 4: Number of operations (integer n)
Next n lines: Operations in format "operation_name [parameter]"
```

**Available Operations:**
- `name` - Get the name (public access)
- `id` - Get the ID (public access)
- `add_grade X` - Add grade X to the grades list (protected access)
- `gpa` - Calculate and return GPA (uses private method internally)
- `verify_key KEY` - Verify if KEY matches the private secret key

## Test Cases

**Input (`input.txt`):**
```
Alice Smith
12345
student
5
name
id
add_grade 85
gpa
verify_key key_12345
```

**Expected Output (`expected.txt`):**
```
name: Alice Smith
id: 12345
add_grade: success
gpa: 85.0
verify_key: success
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the concept of access modifiers (public, private, protected)
- Learn how to implement proper encapsulation in object-oriented programming
- Practice using inheritance and method overriding
- Understand the difference between public, protected, and private access levels
- Learn to design classes with appropriate access control
- Practice implementing class hierarchies with proper access restrictions

## Implementation Guidelines

### Python Example Structure:
```python
class Student:
    def __init__(self, name, student_id):
        # Public attributes
        self.name = name
        self.student_id = student_id
        
        # Protected attribute (Python convention with _)
        self._grades = []
        
        # Private attribute (Python convention with __)
        self.__secret_key = f"key_{student_id}"
    
    # Public methods
    def get_name(self):
        return self.name
    
    # Protected method (Python convention)
    def _add_grade(self, grade):
        # Implementation here
        pass
    
    # Private method (Python convention)
    def __calculate_gpa(self):
        # Implementation here
        pass

class Teacher(Student):
    def __init__(self, name, teacher_id):
        super().__init__(name, teacher_id)
        # Can access protected members from parent
    
    def add_evaluation_score(self, score):
        # Uses protected method from parent
        return self._add_grade(score)

def solve():
    # Read input and process operations
    name = input().strip()
    # ... rest of implementation
```

### Go Example Structure:
```go
type Student struct {
    // Public fields (capitalized)
    Name      string
    StudentID string
    
    // Private fields (lowercase)
    grades    []int
    secretKey string
}

// Public method (capitalized)
func (s *Student) GetName() string {
    return s.Name
}

// Private method (lowercase)
func (s *Student) calculateGPA() float64 {
    // Implementation here
}

type Teacher struct {
    Student // Embedded struct for inheritance
}

func solve() {
    // Implementation here
}
```

## Constraints
- Student/Teacher names are non-empty strings (max 100 characters)
- ID numbers are non-empty strings (max 50 characters)
- Grades are integers between 0 and 100
- Number of operations is between 1 and 20
- Secret keys follow the format "key_[ID]"
- All operations are guaranteed to be valid format

## Hints
- In Python, use single underscore `_` for protected members and double underscore `__` for private members
- In Go, use capitalized names for public members and lowercase for private members
- Remember that protected members should be accessible in subclasses but not from outside
- Private members should only be accessible within the same class
- Use proper inheritance to demonstrate access to protected members
- The secret key is automatically generated as "key_" + the ID number
- GPA calculation should round to 2 decimal places
- When adding grades, validate that they are between 0-100
