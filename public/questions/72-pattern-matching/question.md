# Pattern matching

## Problem Statement

You are tasked with implementing a wildcard pattern matching system similar to file globbing in operating systems. Given a text string and a pattern, determine if the text matches the pattern.

Your pattern matcher should support two special wildcards:
- `*` (asterisk) - matches any sequence of characters, including an empty sequence
- `?` (question mark) - matches exactly one character

All other characters in the pattern must match exactly with the corresponding character in the text.

This problem is commonly used in file systems, search engines, and text processing applications where flexible matching is required.

**Examples:**
- Text: "hello", Pattern: "h*o" → Match (h + any sequence + o)
- Text: "world", Pattern: "w?rld" → Match (w + any single char + rld) 
- Text: "test", Pattern: "t*" → Match (t + any sequence)
- Text: "ab", Pattern: "a?c" → No match (? must match exactly one character)

## Input Format

The input consists of 1 line:
```
Line 1: text pattern
```
Where `text` and `pattern` are space-separated strings.

## Test Cases
**Input (`input.txt`):**
```
hello h*o
```

**Expected Output (`expected.txt`):**
```
true
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand dynamic programming approaches to string matching
- Learn wildcard pattern matching algorithms
- Practice handling edge cases in string processing
- Master recursive thinking with memoization
- Understand time and space complexity trade-offs

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    line = input().strip()
    text, pattern = line.split()
    
    # Implement wildcard matching logic
    result = wildcard_match(text, pattern)
    print("true" if result else "false")

def wildcard_match(text, pattern):
    # Use dynamic programming or recursion with memoization
    # Handle * and ? wildcards appropriately
    pass
```

### Go Example Structure:
```go
func solve() {
    var text, pattern string
    fmt.Scanf("%s %s", &text, &pattern)
    
    result := wildcardMatch(text, pattern)
    if result {
        fmt.Println("true")
    } else {
        fmt.Println("false")
    }
}

func wildcardMatch(text, pattern string) bool {
    // Implement wildcard matching logic
    return false
}
```

## Constraints
- 1 ≤ len(text) ≤ 1000
- 1 ≤ len(pattern) ≤ 100
- Text contains only lowercase English letters
- Pattern contains lowercase English letters, '*', and '?'
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Hint 1**: This is a classic dynamic programming problem. Consider what states you need to track.
- **Hint 2**: Think about what `dp[i][j]` could represent - perhaps "does text[0:i] match pattern[0:j]"?
- **Hint 3**: Handle the '*' wildcard carefully - it can match zero characters or one or more characters.
- **Hint 4**: Base cases are important - what happens when the text or pattern is empty?
- **Hint 5**: The '?' wildcard is simpler than '*' - it must match exactly one character.
