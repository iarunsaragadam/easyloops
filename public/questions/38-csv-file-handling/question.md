# CSV file handling

## Problem Statement

Write a program that processes CSV (Comma-Separated Values) data to count how many people are from a specific city. You'll need to read person records in CSV format and filter them based on the city field.

Your program should:

1. Read the number of people in the dataset
2. Read the target city you want to count
3. Process each person's data in CSV format (name,age,city)
4. Count how many people are from the target city (case-insensitive matching)
5. Output the final count

This problem teaches fundamental CSV processing skills including parsing, data extraction, and filtering operations commonly used in data analysis tasks.

## Input Format

The input consists of multiple lines:
```
Line 1: Number of people (n) - integer
Line 2: Target city to count - string
Next n lines: Person data in CSV format "name,age,city"
```

## Test Cases
**Input (`input.txt`):**
```
5
New York
Alice,25,New York
Bob,30,Los Angeles
Charlie,35,New York
Diana,28,Chicago
Eve,22,New York
```

**Expected Output (`expected.txt`):**
```
3
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand CSV file format and structure
- Learn to parse comma-separated values
- Practice string manipulation and splitting
- Implement case-insensitive string comparison
- Handle real-world data processing scenarios

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    # Read number of people
    n = int(input().strip())
    
    # Read target city
    target_city = input().strip()
    
    # Count matching people
    count = 0
    for _ in range(n):
        line = input().strip()
        # Parse CSV: name,age,city
        parts = line.split(',')
        city = parts[2].strip()
        
        if city.lower() == target_city.lower():
            count += 1
    
    print(count)
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    
    // Read number of people
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    // Read target city
    scanner.Scan()
    targetCity := strings.ToLower(scanner.Text())
    
    // Count matching people
    count := 0
    for i := 0; i < n; i++ {
        scanner.Scan()
        line := scanner.Text()
        parts := strings.Split(line, ",")
        city := strings.ToLower(strings.TrimSpace(parts[2]))
        
        if city == targetCity {
            count++
        }
    }
    
    fmt.Println(count)
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of people)
- City names are case-insensitive (New York = new york = NEW YORK)
- CSV fields may contain spaces that should be trimmed
- All input is guaranteed to be valid CSV format
- Names and cities contain only letters, spaces, and common punctuation
- Ages are positive integers

## Hints
- Use string splitting on commas to parse CSV data
- Remember to handle case-insensitive city matching
- Trim whitespace from parsed fields to handle spacing variations
- CSV format: each line has exactly 3 fields separated by commas
