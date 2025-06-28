# API Consumption

## Problem Statement

You are working with JSON API responses and need to process user profile data from multiple API endpoints. Your task is to parse JSON responses, extract user information, and generate departmental statistics.

You will receive multiple JSON responses, each containing user profile data. Each response follows this structure:

```json
{
  "users": [
    {
      "name": "Alice Johnson",
      "age": 28,
      "department": "Engineering"
    },
    ...
  ]
}
```

Your program should:
1. Parse each JSON response
2. Extract user data from all responses
3. Group users by department
4. Calculate the count and average age for each department
5. Output results sorted alphabetically by department name

**Real-world context**: This simulates processing user data from multiple API endpoints, which is common in microservices architectures where different services provide user information that needs to be aggregated for reporting or analytics.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of JSON responses)
Next N lines: JSON strings representing API responses
```

Each JSON response contains a "users" array with user objects having "name", "age", and "department" fields.

## Test Cases
**Input (`input.txt`):**
```
3
{"users": [{"name": "Alice Johnson", "age": 28, "department": "Engineering"}, {"name": "Bob Smith", "age": 32, "department": "Marketing"}]}
{"users": [{"name": "Carol Davis", "age": 30, "department": "Engineering"}, {"name": "David Wilson", "age": 35, "department": "Sales"}]}
{"users": [{"name": "Eva Brown", "age": 27, "department": "Marketing"}]}
```

**Expected Output (`expected.txt`):**
```
Department: Engineering | Count: 2 | Average Age: 29.0
Department: Marketing | Count: 2 | Average Age: 29.5
Department: Sales | Count: 1 | Average Age: 35.0
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Parse and process JSON data structures
- Handle multiple data sources (simulating API responses)
- Implement data aggregation and statistical calculations
- Practice error handling for malformed data
- Work with dictionaries and data grouping
- Understand common API response formats

## Implementation Guidelines

### Python Example Structure:
```python
import json
from collections import defaultdict

def solve():
    n = int(input().strip())
    
    # Process each JSON response
    all_users = []
    for _ in range(n):
        json_response = input().strip()
        # Parse JSON and extract users
        # Handle potential JSON parsing errors
    
    # Group users by department
    dept_stats = defaultdict(lambda: {'count': 0, 'total_age': 0})
    
    # Calculate statistics
    # Output results sorted by department
```

### Go Example Structure:
```go
package main
import (
    "encoding/json"
    "fmt"
    "sort"
)

func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    // Process JSON responses
    // Group by department
    // Calculate and output statistics
}
```

## Constraints
- 1 ≤ N ≤ 100 (number of JSON responses)
- Each JSON response contains 0 to 1000 users
- User ages are positive integers (1 ≤ age ≤ 120)
- Department names are non-empty strings
- JSON responses may be malformed (handle gracefully)
- Output average ages rounded to 1 decimal place
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- Use `json.loads()` in Python or `json.Unmarshal()` in Go to parse JSON
- Handle JSON parsing errors with try-catch blocks
- Use a dictionary/map to group users by department
- Sort department names alphabetically before output
- Consider edge cases: empty user arrays, malformed JSON, missing fields
- Average age should be calculated as total_age / count for each department
