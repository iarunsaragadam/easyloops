# Class definition and instantiation

## Problem Statement

Create a Student class that manages student information and calculates Grade Point Average (GPA). Your program should:

1. Define a `Student` class with:
   - A constructor that takes a student name
   - An `add_grade()` method to add grades
   - A `calculate_gpa()` method that returns the average of all grades
   - A `get_info()` method that returns formatted student information

2. Read student data from input, create Student objects, and output their information sorted by name.

The program demonstrates class definition, object instantiation, method implementation, and object management.

## Input Format

The input consists of multiple lines:
```
Line 1: Number of students (n)
For each student:
  Line i: Student name
  Line i+1: Space-separated grades (may be empty)
```

## Test Cases
**Input (`input.txt`):**
```
2
Alice
85.5 90.0 78.5
Bob
92.0 88.0 95.0 87.5
```

**Expected Output (`expected.txt`):**
```
Alice: 84.67
Bob: 90.62
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand class definition syntax and structure
- Practice object instantiation and method calling
- Implement instance methods and constructors
- Manage object state with instance variables
- Handle collections of objects and sorting
- Apply object-oriented programming principles

## Implementation Guidelines
### Python Example Structure:
```python
class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []
    
    def add_grade(self, grade):
        # Add grade to student's grade list
        pass
    
    def calculate_gpa(self):
        # Calculate and return average of grades
        pass
    
    def get_info(self):
        # Return formatted string with name and GPA
        pass

def solve():
    n = int(input())
    students = []
    
    for _ in range(n):
        name = input().strip()
        student = Student(name)
        
        # Read and add grades
        grades_line = input().strip()
        if grades_line:
            grades = list(map(float, grades_line.split()))
            for grade in grades:
                student.add_grade(grade)
        
        students.append(student)
    
    # Sort by name and output
    students.sort(key=lambda s: s.name)
    for student in students:
        print(student.get_info())
```

### Go Example Structure:
```go
type Student struct {
    name   string
    grades []float64
}

func (s *Student) AddGrade(grade float64) {
    s.grades = append(s.grades, grade)
}

func (s *Student) CalculateGPA() float64 {
    if len(s.grades) == 0 {
        return 0.0
    }
    sum := 0.0
    for _, grade := range s.grades {
        sum += grade
    }
    return sum / float64(len(s.grades))
}

func (s *Student) GetInfo() string {
    gpa := s.CalculateGPA()
    return fmt.Sprintf("%s: %.2f", s.name, gpa)
}

func solve() {
    // Implementation here
}
```

## Constraints
- Number of students: 1 ≤ n ≤ 100
- Student names: 1-50 characters, no spaces
- Grades: 0.0 ≤ grade ≤ 100.0
- Number of grades per student: 0 ≤ grades ≤ 20
- Output GPA with exactly 2 decimal places

## Hints
- Start by defining the Student class with a constructor
- Use a list/array to store grades in each Student object
- Handle the case where a student has no grades (GPA should be 0.00)
- Remember to sort students by name before output
- Use proper formatting for 2 decimal places in GPA output
