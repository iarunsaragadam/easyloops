# Test Cases for String formatting

## Test Case Structure
This question uses a multi-line input format with employee data.

### Input Format Pattern:
```
Line 1: n (integer - number of employees)
Next n lines: name, employee_id, salary, department_code (CSV format)
```

### Output Format Pattern:
```
Employee Report
==================================================
Name                ID       Salary   Dept  
--------------------------------------------------
[formatted employee records]
```

## Test Case 1: Basic Single Employee
**Input (`input.txt`):**
```
1
John Doe, 1, 50000, IT
```
**Expected Output (`expected.txt`):**
```
Employee Report
==================================================
Name                ID       Salary   Dept  
--------------------------------------------------
John Doe        000001    50,000.00    IT   
```

**Purpose**: Tests basic formatting with standard values.

## Test Case 2: Edge Cases and Boundary Values
**Input (`input2.txt`):**
```
2
, 999999, 0, A
Very Long Employee Name, 1, 1000000.99, DEPT
```
**Expected Output (`expected2.txt`):**
```
Employee Report
==================================================
Name                ID       Salary   Dept  
--------------------------------------------------
                999999         0.00    A    
Very Long Employee Name 000001 1,000,000.99   DEPT  
```

**Purpose**: Tests edge cases including:
- Empty employee name
- Maximum employee ID (999999)
- Zero salary
- Single character department
- Very long employee name (truncated by format width)
- Large salary with maximum decimal precision

## Test Case 3: Multiple Employees with Diverse Data
**Input (`input3.txt`):**
```
5
Employee One, 1001, 45000.25, HR
Employee Two, 1002, 55000.50, IT
Employee Three, 1003, 65000.75, FINANCE
Employee Four, 1004, 35000, ADMIN
Employee Five, 1005, 85000.99, TECH
```
**Expected Output (`expected3.txt`):**
```
Employee Report
==================================================
Name                ID       Salary   Dept  
--------------------------------------------------
Employee One      001001    45,000.25    HR   
Employee Two      001002    55,000.50    IT   
Employee Three    001003    65,000.75 FINANCE 
Employee Four     001004    35,000.00  ADMIN  
Employee Five     001005    85,000.99   TECH  
```

**Purpose**: Tests performance with multiple records and various formatting scenarios.

## Test Case Creation Rules

### Input Validation Rules:
1. **Number of employees**: Must be positive integer (1 ≤ n ≤ 1000)
2. **Employee ID**: Must be positive integer (1 ≤ id ≤ 999999)
3. **Salary**: Must be non-negative float (0 ≤ salary ≤ 10,000,000.99)
4. **Name**: Can be empty or up to 50 characters
5. **Department**: Must be 1-8 characters
6. **CSV Format**: Values separated by commas, spaces around commas are trimmed

### Output Format Rules:
1. **Header**: Fixed "Employee Report" title
2. **Separators**: 50 equal signs, then 50 dashes
3. **Column Headers**: Exactly "Name", "ID", "Salary", "Dept" with proper alignment
4. **Name Column**: Left-aligned, 15 characters wide
5. **ID Column**: Right-aligned, 6 characters wide, zero-padded
6. **Salary Column**: Right-aligned, 12 characters wide, 2 decimal places, comma separator
7. **Department Column**: Center-aligned, 8 characters wide
8. **No trailing spaces**: Each line should not have trailing whitespace

### Format Specification Details:
- **Name formatting**: `{name:<15}` - Left align in 15-char field
- **ID formatting**: `{id:06d}` - Zero-pad to 6 digits
- **Salary formatting**: `{salary:12,.2f}` - 12-char field, comma separator, 2 decimals
- **Department formatting**: `{dept:^8}` - Center align in 8-char field

## Language-Specific Considerations

### Python Considerations:
- Use f-string formatting for modern Python (3.6+)
- Handle CSV parsing with `split(',')` and `strip()`
- Be careful with float precision in salary calculations
- Use proper format specifiers: `<` (left), `>` (right), `^` (center)

### Go Considerations:
- Use `fmt.Printf` with format verbs
- String alignment: `%-15s` (left), `%15s` (right)
- Number formatting may require custom padding logic
- Use `strings.Repeat` for separator lines

### JavaScript Considerations:
- Use `padStart`, `padEnd` for alignment
- Handle number formatting with `toLocaleString()` for comma separators
- String alignment requires manual padding logic

## Edge Case Categories

### Boundary Value Testing:
- **Minimum values**: Single employee, ID=1, salary=0, single-char department
- **Maximum values**: Maximum employees, ID=999999, large salary, long names
- **Empty/null cases**: Empty names, minimal departments

### Format Testing:
- **Alignment**: Verify left/right/center alignment works correctly
- **Padding**: Confirm zero-padding on IDs, space-padding on text
- **Precision**: Check decimal places are exactly 2 for all salaries
- **Separators**: Ensure comma thousands separators appear correctly

### Data Variety Testing:
- **Name lengths**: Short, medium, long, empty names
- **Salary ranges**: Whole numbers, decimals, zero, large amounts
- **Department codes**: Various lengths and character sets

## Validation Checklist
- [ ] Input parsing handles CSV format correctly
- [ ] All format specifiers produce correct alignment
- [ ] Zero-padding works for employee IDs
- [ ] Salary formatting includes comma separators and 2 decimal places
- [ ] Department names are center-aligned
- [ ] Header and separator lines are exactly 50 characters
- [ ] No trailing whitespace in output lines
- [ ] Output matches expected format exactly (character-for-character)

## Automated Test Case Generation
```python
def generate_test_case(num_employees=3, seed=42):
    """Generate random test case with specified number of employees"""
    import random
    random.seed(seed)
    
    names = ["Alice Johnson", "Bob Smith", "Carol Williams", "David Brown", "Eve Davis"]
    departments = ["IT", "HR", "FINANCE", "ADMIN", "TECH", "SALES"]
    
    employees = []
    for i in range(num_employees):
        name = random.choice(names)
        emp_id = random.randint(1, 999999)
        salary = round(random.uniform(30000, 120000), 2)
        dept = random.choice(departments)
        employees.append(f"{name}, {emp_id}, {salary}, {dept}")
    
    return f"{num_employees}\n" + "\n".join(employees)

def validate_test_case(input_content, expected_content):
    """Validate that test case follows proper format"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate input format
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    for i in range(1, n + 1):
        parts = [p.strip() for p in lines[i].split(',')]
        assert len(parts) == 4, f"Line {i}: Expected 4 CSV parts, got {len(parts)}"
        
        name, emp_id, salary, dept = parts
        assert 1 <= int(emp_id) <= 999999, f"Employee ID out of range: {emp_id}"
        assert 0 <= float(salary) <= 10000000.99, f"Salary out of range: {salary}"
        assert 1 <= len(dept) <= 8, f"Department code invalid length: {dept}"
    
    # Validate output format
    expected_lines = expected_content.strip().split('\n')
    assert expected_lines[0] == "Employee Report", "Missing correct header"
    assert expected_lines[1] == "=" * 50, "Incorrect header separator"
    assert len(expected_lines) >= 4, "Missing required output lines"
    
    return True
```
