# Basic String Manipulation

## Problem Statement

Write a program that reads a string and performs basic string manipulation operations. Given an input string, your program should output:

1. `Length: <number>` — the number of characters in the string
2. `Reversed: <reversed_string>` — the input string reversed
3. `Vowels: <count>` — the count of vowels (a, e, i, o, u, case-insensitive) in the string
4. `Uppercase: <uppercase_string>` — the input string converted to uppercase

This problem helps you practice fundamental string operations that are essential in programming.

## Input Format

The input consists of 1 line:
```
Line 1: any string (may contain letters, numbers, spaces, and special characters)
```

## Test Cases
**Input (`input.txt`):**
```
hello
```

**Expected Output (`expected.txt`):**
```
Length: 5
Reversed: olleh
Vowels: 2
Uppercase: HELLO
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice calculating string length using built-in functions
- Learn string reversal techniques (slicing or iteration)
- Understand character iteration and conditional counting
- Practice string case conversion methods
- Apply basic string processing patterns

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    s = input().strip()
    
    # Calculate length
    length = len(s)
    
    # Reverse string using slicing
    reversed_s = s[::-1]
    
    # Count vowels
    vowels = "aeiouAEIOU"
    vowel_count = sum(1 for char in s if char in vowels)
    
    # Convert to uppercase
    upper_s = s.upper()
    
    print(f"Length: {length}")
    print(f"Reversed: {reversed_s}")
    print(f"Vowels: {vowel_count}")
    print(f"Uppercase: {upper_s}")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    s := strings.TrimSpace(scanner.Text())
    
    // Calculate length
    length := len(s)
    
    // Reverse string
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    reversed := string(runes)
    
    // Count vowels
    vowels := "aeiouAEIOU"
    vowelCount := 0
    for _, char := range s {
        if strings.ContainsRune(vowels, char) {
            vowelCount++
        }
    }
    
    // Convert to uppercase
    upper := strings.ToUpper(s)
    
    fmt.Printf("Length: %d\n", length)
    fmt.Printf("Reversed: %s\n", reversed)
    fmt.Printf("Vowels: %d\n", vowelCount)
    fmt.Printf("Uppercase: %s\n", upper)
}
```

## Constraints
- String length: 0 to 1000 characters
- Input may contain any printable ASCII characters
- Vowels are defined as: a, e, i, o, u (case-insensitive)
- Output format must match exactly (including spacing and capitalization)

## Hints
- Use built-in string functions when available for efficiency
- Remember that strings can be empty (length 0)
- String slicing with `[::-1]` is an elegant way to reverse in Python
- Consider using a loop with character checking for vowel counting
- Test your solution with edge cases like empty strings and strings with no vowels
