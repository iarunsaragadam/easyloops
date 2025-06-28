# Static Methods and Variables

## Problem Statement

Build a **Student Grade Tracker** system that demonstrates the proper use of static methods and variables in object-oriented programming. This system will manage student records and provide both individual student information and class-wide statistics.

Your program should implement a class that:

1. **Tracks individual students** with their names and grades
2. **Maintains class-wide statistics** using static variables (total students, sum of all grades)
3. **Provides static methods** to access class-wide data without creating instances
4. **Demonstrates the difference** between static and instance members

### Operations to Support:
- `CREATE name grade` - Create a new student with given name and grade
- `STATS` - Display class-wide statistics (total students, sum of grades, average grade)
- `STUDENT name` - Display information for a specific student
- `UPDATE name new_grade` - Update a student's grade (maintains class statistics)

This problem teaches the fundamental concepts of static vs instance members and when to use each approach.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of operations, 1 ≤ N ≤ 10,000)
Lines 2 to N+1: Operations in the format described above
```

### Operation Formats:
- `CREATE <name> <grade>` - Name is a string, grade is integer (0-100)
- `STATS` - No additional parameters
- `STUDENT <name>` - Name is a string
- `UPDATE <name> <new_grade>` - Name is string, new_grade is integer (0-100)

## Output Format

For each operation that produces output:
- `STATS`: Print `"Total: X, Sum: Y, Average: Z.ZZ"` where X is total students, Y is sum of grades, Z.ZZ is average formatted to 2 decimal places
- `STUDENT name`: Print `"name: grade"` if student exists, or `"Student name not found"` if not found
- `CREATE` and `UPDATE` operations produce no output (unless student not found for UPDATE)

## Test Cases

**Basic Test Case (`input.txt`):**
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- **Understand static variables**: Shared data across all instances of a class
- **Master static methods**: Methods that belong to the class, not instances
- **Learn when to use static vs instance**: Class-wide data vs object-specific data
- **Practice object-oriented design**: Combining static and instance members effectively
- **Implement real-world scenarios**: Statistics tracking, data management systems

## Implementation Guidelines

### Python Example Structure:
```python
class StudentTracker:
    # Static variables (class variables)
    total_students = 0
    total_grade_sum = 0
    students_database = {}
    
    def __init__(self, name, grade):
        # Instance variables and static variable updates
        pass
    
    @staticmethod
    def get_total_students():
        # Static method to access class data
        pass
    
    @staticmethod
    def get_average_grade():
        # Static method for calculations
        pass
    
    def get_student_info(self):
        # Instance method for individual data
        pass

def solve():
    # Read operations and call appropriate methods
    pass
```

### Go Example Structure:
```go
type StudentTracker struct {
    name  string
    grade int
}

var totalStudents int
var totalGradeSum int
var studentsDatabase map[string]*StudentTracker

func GetTotalStudents() int {
    return totalStudents
}

func GetAverageGrade() float64 {
    // Calculate average
}

func (s *StudentTracker) GetStudentInfo() string {
    // Return student information
}

func solve() {
    // Implementation here
}
```

## Constraints
- 1 ≤ N ≤ 10,000 (number of operations)
- Student names are unique strings (max 50 characters, no spaces)
- Grades are integers from 0 to 100
- Maximum 5,000 students can be created
- Operations are case-sensitive
- Names in operations will match exactly with created students

## Hints
- **Start with static variables**: Think about what data needs to be shared across all students
- **Use static methods for class-wide operations**: Statistics don't need a specific student instance
- **Remember to update static variables**: When creating students or updating grades
- **Handle edge cases**: What happens when calculating average with 0 students?
- **Consider data structures**: How will you efficiently find students by name?
- **Test incremental builds**: Start with CREATE and STATS, then add other operations
