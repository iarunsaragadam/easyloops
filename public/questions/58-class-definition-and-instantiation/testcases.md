# Test Cases for Class definition and instantiation

## Test Case Structure
This question uses a multi-line input format for student data processing.

### Input Format Pattern:
```
Line 1: Number of students (integer)
For each student:
  Line i: Student name (string)
  Line i+1: Space-separated grades (floats, may be empty)
```

### Output Format Pattern:
```
For each student (sorted by name):
StudentName: GPA
```
Where GPA is formatted to 2 decimal places.

## Test Case 1: Basic
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

**Purpose**: Tests basic class instantiation, method calls, and GPA calculation with multiple students.

## Test Case 2: Edge
**Input (`input2.txt`):**
```
1
Charlie

```
**Expected Output (`expected2.txt`):**
```
Charlie: 0.00
```

**Purpose**: Tests edge case where a student has no grades. The empty line after "Charlie" represents no grades.

## Test Case 3: Complex
**Input (`input3.txt`):**
```
3
Zoe
100.0 95.0 98.0 92.0 89.0
Adam
70.0 75.0 80.0 85.0 90.0 95.0 88.0 92.0
Maria
88.5 91.0 87.5 93.0 90.5
```
**Expected Output (`expected3.txt`):**
```
Adam: 84.38
Maria: 90.10
Zoe: 94.80
```

**Purpose**: Tests performance with multiple students, varying numbers of grades, and proper sorting by name.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer (number of students)
2. Each student must have a name (non-empty string, no spaces)
3. Grades line can be empty or contain space-separated floats
4. All grades must be between 0.0 and 100.0
5. Maximum 20 grades per student

### Output Format Rules:
1. One line per student in format "Name: GPA"
2. GPA must be formatted to exactly 2 decimal places
3. Students must be sorted alphabetically by name
4. Students with no grades should show "0.00" as GPA

## Language-Specific Considerations
### Python Considerations:
- Use `__init__` method for constructor
- Use `self` parameter for instance methods
- Handle empty input lines with `strip()` and conditional checks
- Use `f"{gpa:.2f}"` for formatting to 2 decimal places
- Sort using `lambda` function or `key` parameter

### Go Considerations:
- Use struct for Student class definition
- Use pointer receivers for methods that modify state
- Handle empty lines when reading input
- Use `fmt.Sprintf("%.2f", gpa)` for formatting
- Sort using `sort.Slice()` with custom comparison function

## Validation Checklist
- [ ] Input has correct number of lines for each student
- [ ] All student names are non-empty and contain no spaces
- [ ] All grades are valid floating-point numbers
- [ ] Output is sorted alphabetically by student name
- [ ] GPA calculations are mathematically correct
- [ ] GPA formatting shows exactly 2 decimal places
- [ ] Empty grades list results in 0.00 GPA
- [ ] Students with varying numbers of grades are handled correctly

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    n = random.randint(1, 5)
    students = []
    
    for i in range(n):
        name = f"Student{chr(65+i)}"  # StudentA, StudentB, etc.
        num_grades = random.randint(0, 5)
        grades = [round(random.uniform(70, 100), 1) for _ in range(num_grades)]
        students.append((name, grades))
    
    return students

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate input format
    if len(lines) != 1 + 2 * n:
        return False
    
    # Validate expected output format
    output_lines = expected_content.strip().split('\n')
    if len(output_lines) != n:
        return False
    
    # Check GPA format
    for line in output_lines:
        if not line.count(':') == 1:
            return False
        name, gpa_str = line.split(': ')
        try:
            gpa = float(gpa_str)
            if not (0.0 <= gpa <= 100.0):
                return False
        except ValueError:
            return False
    
    return True
```

## Performance Considerations
- Basic operations: O(n) where n is number of students
- Sorting: O(n log n) for alphabetical ordering
- GPA calculation: O(g) where g is number of grades per student
- Overall complexity: O(n log n + ng) where n is students, g is average grades
- Memory usage: O(ng) for storing all student data

## Educational Value
This test case set teaches:
1. **Class Design**: How to structure a class with data and methods
2. **Object Instantiation**: Creating multiple objects from the same class
3. **Method Implementation**: Writing methods that operate on instance data
4. **Data Management**: Handling collections of objects
5. **Edge Case Handling**: Dealing with empty data gracefully
6. **Sorting and Formatting**: Organizing output and formatting numbers
