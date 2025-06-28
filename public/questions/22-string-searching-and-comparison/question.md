# String searching and comparison

## Problem Statement

Write a program that performs various string searching and comparison operations. Given two strings, your program should determine relationships between them including substring matching, equality checks, and position finding.

Your program should read two strings and output the following information:
1. Whether the second string exists as a substring in the first string (case-sensitive)
2. Whether the two strings are exactly equal (case-sensitive)
3. Whether the two strings are equal when ignoring case (case-insensitive)
4. The position of the first occurrence of the second string in the first string (case-sensitive, -1 if not found)
5. Whether the second string exists as a substring in the first string (case-insensitive)

This problem teaches fundamental string operations that are essential in text processing, search algorithms, and data validation.

For example:
- Text: "Hello World", Pattern: "World" → Found at position 6, not equal, case-insensitive equal: NO
- Text: "hello", Pattern: "hello" → Exactly equal, found at position 0
- Text: "Programming", Pattern: "gram" → Found at position 3, not equal

## Input Format

The input consists of 2 lines:
```
Line 1: Text string (1 ≤ length ≤ 100,000)
Line 2: Pattern string (1 ≤ length ≤ 1,000)
```

## Test Cases
**Input (`input1.txt`):**
```
Hello World
World
```

**Expected Output (`expected1.txt`):**
```
YES
NO
NO
6
YES
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master basic string searching using built-in methods
- Understand case-sensitive vs case-insensitive string operations
- Learn to find substring positions within larger strings
- Practice string equality comparisons and their variations
- Develop skills for text processing and pattern matching

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    text = input().rstrip('\n\r')  # Remove only line endings, preserve other whitespace
    pattern = input().rstrip('\n\r')  # Remove only line endings, preserve other whitespace
    
    # Check if pattern exists in text (case-sensitive)
    contains_sensitive = pattern in text
    print("YES" if contains_sensitive else "NO")
    
    # Check exact equality
    exactly_equal = text == pattern
    print("YES" if exactly_equal else "NO")
    
    # Check case-insensitive equality
    case_insensitive_equal = text.lower() == pattern.lower()
    print("YES" if case_insensitive_equal else "NO")
    
    # Find position (case-sensitive)
    position = text.find(pattern)
    print(position)
    
    # Check case-insensitive contains
    contains_insensitive = pattern.lower() in text.lower()
    print("YES" if contains_insensitive else "NO")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    
    scanner.Scan()
    text := scanner.Text()
    scanner.Scan()
    pattern := scanner.Text()
    
    // Check if pattern exists in text (case-sensitive)
    containsSensitive := strings.Contains(text, pattern)
    if containsSensitive {
        fmt.Println("YES")
    } else {
        fmt.Println("NO")
    }
    
    // Check exact equality
    exactlyEqual := text == pattern
    if exactlyEqual {
        fmt.Println("YES")
    } else {
        fmt.Println("NO")
    }
    
    // Check case-insensitive equality
    caseInsensitiveEqual := strings.ToLower(text) == strings.ToLower(pattern)
    if caseInsensitiveEqual {
        fmt.Println("YES")
    } else {
        fmt.Println("NO")
    }
    
    // Find position
    position := strings.Index(text, pattern)
    fmt.Println(position)
    
    // Check case-insensitive contains
    containsInsensitive := strings.Contains(strings.ToLower(text), strings.ToLower(pattern))
    if containsInsensitive {
        fmt.Println("YES")
    } else {
        fmt.Println("NO")
    }
}
```

## Constraints
- 1 ≤ Text length ≤ 100,000 characters
- 1 ≤ Pattern length ≤ 1,000 characters
- Both strings contain printable ASCII characters
- Time complexity: O(n*m) where n is text length, m is pattern length
- Space complexity: O(1) additional space
- Output format: exactly 5 lines as specified

## Hints
- Use built-in string methods like `find()`, `in`, and `lower()` in Python
- Remember that `find()` returns -1 when the substring is not found
- Case-insensitive operations can be done by converting both strings to lowercase
- The position is 0-indexed (first character is at position 0)
- Each output should be on a separate line in the exact order specified
