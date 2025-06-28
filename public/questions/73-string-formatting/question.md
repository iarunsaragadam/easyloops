# String formatting

## Problem Statement

You are tasked with creating an employee report generator that formats employee data into a well-structured, tabular format. Given employee information (name, ID, salary, department), you need to format and display it in a professional report layout with proper alignment, padding, and number formatting.

This problem will help you practice essential string formatting techniques including:
- Field width control and alignment (left, right, center)
- Number formatting with precision and thousands separators
- Zero-padding for numeric fields
- Creating consistent tabular output

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of employees)
Next n lines: name, employee_id, salary, department_code
```

Each employee line contains comma-separated values:
- `name`: Employee's full name (string, may contain spaces)
- `employee_id`: Unique numeric identifier (integer, 1-999999)
- `salary`: Annual salary (float, can have decimals)
- `department_code`: Department abbreviation (string, 1-8 characters)

## Output Format

Generate a formatted report with:
- Report title: "Employee Report"
- Header separator: 50 equal signs (=)
- Column headers: Name, ID, Salary, Dept
- Column separator: 50 dashes (-)
- Data rows with specific formatting:
  - **Name**: Left-aligned, 15 characters wide
  - **ID**: Right-aligned, 6 characters wide, zero-padded
  - **Salary**: Right-aligned, 12 characters wide, 2 decimal places, comma thousands separator
  - **Department**: Center-aligned, 8 characters wide

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master string formatting with field width and alignment controls
- Practice numeric formatting with precision and separators
- Understand zero-padding and string alignment techniques
- Learn to create professional tabular output
- Apply format specifiers for different data types
- Handle edge cases in string formatting (empty strings, large numbers)

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    print("Employee Report")
    print("=" * 50)
    print(f"{'Name':<15} {'ID':>6} {'Salary':>12} {'Dept':^8}")
    print("-" * 50)
    
    for _ in range(n):
        line = input().strip()
        # Parse comma-separated values
        # Format and print each employee record
        pass
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanln(&n)
    
    fmt.Println("Employee Report")
    fmt.Println(strings.Repeat("=", 50))
    fmt.Printf("%-15s %6s %12s %8s\n", "Name", "ID", "Salary", "Dept")
    fmt.Println(strings.Repeat("-", 50))
    
    for i := 0; i < n; i++ {
        // Read and parse employee data
        // Format and print each employee record
    }
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of employees)
- 1 ≤ employee_id ≤ 999999
- 0 ≤ salary ≤ 10,000,000.99
- 1 ≤ len(name) ≤ 50
- 1 ≤ len(department_code) ≤ 8
- All inputs are valid (no malformed data)

## Hints
- Use format specifiers to control field width and alignment:
  - `{value:<width}` for left alignment
  - `{value:>width}` for right alignment  
  - `{value:^width}` for center alignment
- For zero-padding numbers: `{number:0width}`
- For decimal precision: `{number:.2f}`
- For thousands separator: `{number:,}`
- Combine specifiers: `{number:width,.2f}` for width, comma separator, and 2 decimals
- Parse CSV data carefully, handling spaces around commas
- Remember that format specifications apply to the entire field width
