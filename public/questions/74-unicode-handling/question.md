# Unicode Character Classification

## Problem Statement

In today's globalized world, software applications must handle text from various languages and scripts. Unicode provides a standard way to represent characters from virtually all writing systems. This problem will help you understand and practice unicode character handling by implementing a character classification system.

**Your task:** Given a string containing mixed unicode characters, classify and count different types of characters to understand the composition of the text.

You need to analyze the input text and classify each character into one of these categories:
- **ASCII Letters**: Basic Latin letters (a-z, A-Z)
- **ASCII Digits**: Basic digits (0-9)
- **Unicode Letters**: Non-ASCII letters from various scripts (α, β, 你, 好, العربية, עברית, русский, etc.)
- **Unicode Digits**: Non-ASCII digit characters (٠, ١, ٢, etc.)
- **Symbols**: Punctuation marks and symbols (!@#$%^&*()_+-={}[]|;':\",./<>?)
- **Emojis**: Unicode emoji characters (🌟, 😀, ✨, 💫, etc.)
- **Other**: Any remaining characters (spaces, control characters, etc.)

This problem teaches essential unicode concepts including character encoding, unicode categories, and practical text processing techniques used in internationalization.

## Input Format

The input consists of 1 line:
```
Line 1: A string containing mixed unicode characters (length 1 ≤ L ≤ 100,000)
```

## Output Format

Output exactly 7 lines with the counts in this specific format:
```
ASCII Letters: <count>
ASCII Digits: <count>
Unicode Letters: <count>
Unicode Digits: <count>
Symbols: <count>
Emojis: <count>
Other: <count>
```

## Test Cases

**Basic Test Case (`input.txt`):**
```
Hello123 World! 你好
```

**Expected Output (`expected.txt`):**
```
ASCII Letters: 10
ASCII Digits: 3
Unicode Letters: 2
Unicode Digits: 0
Symbols: 1
Emojis: 0
Other: 2
```

**Edge Case - Emojis Only (`input2.txt`):**
```
🌟✨💫😀🎉
```

**Expected Output (`expected2.txt`):**
```
ASCII Letters: 0
ASCII Digits: 0
Unicode Letters: 0
Unicode Digits: 0
Symbols: 0
Emojis: 5
Other: 0
```

**Performance Test Case (`input3.txt`):**
```
[Large mixed unicode text - see input3.txt]
```

**Expected Output (`expected3.txt`):**
```
ASCII Letters: 1000
ASCII Digits: 0
Unicode Letters: 3300
Unicode Digits: 0
Symbols: 100
Emojis: 400
Other: 800
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand Unicode character encoding and representation
- Learn about Unicode character categories and properties
- Practice working with multi-byte characters and different scripts
- Master text processing techniques for internationalized applications
- Understand the difference between ASCII and Unicode character sets
- Learn practical emoji and symbol detection methods
- Develop skills in character classification and text analysis

## Implementation Guidelines

### Python Example Structure:
```python
import unicodedata

def solve():
    line = input().strip()
    
    # Initialize counters for each category
    ascii_letters = 0
    ascii_digits = 0
    unicode_letters = 0
    unicode_digits = 0
    symbols = 0
    emojis = 0
    other = 0
    
    for char in line:
        # Classify each character using unicode properties
        # Use char.isascii(), char.isalpha(), char.isdigit()
        # Use unicodedata.category(char) for detailed classification
        # Use unicode code point ranges for emoji detection
        
        # Your classification logic here...
        pass
    
    # Output in exact format required
    print(f"ASCII Letters: {ascii_letters}")
    print(f"ASCII Digits: {ascii_digits}")
    print(f"Unicode Letters: {unicode_letters}")
    print(f"Unicode Digits: {unicode_digits}")
    print(f"Symbols: {symbols}")
    print(f"Emojis: {emojis}")
    print(f"Other: {other}")
```

### Go Example Structure:
```go
import (
    "bufio"
    "fmt"
    "os"
    "unicode"
    "unicode/utf8"
)

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := scanner.Text()
    
    // Initialize counters
    asciiLetters := 0
    asciiDigits := 0
    unicodeLetters := 0
    unicodeDigits := 0
    symbols := 0
    emojis := 0
    other := 0
    
    // Process each rune (unicode character)
    for _, r := range line {
        // Use unicode package functions
        // unicode.IsLetter(r), unicode.IsDigit(r)
        // Check if rune < 128 for ASCII detection
        // Use rune ranges for emoji detection
        
        // Your classification logic here...
    }
    
    // Output in required format
    fmt.Printf("ASCII Letters: %d\n", asciiLetters)
    fmt.Printf("ASCII Digits: %d\n", asciiDigits)
    fmt.Printf("Unicode Letters: %d\n", unicodeLetters)
    fmt.Printf("Unicode Digits: %d\n", unicodeDigits)
    fmt.Printf("Symbols: %d\n", symbols)
    fmt.Printf("Emojis: %d\n", emojis)
    fmt.Printf("Other: %d\n", other)
}
```

## Constraints
- 1 ≤ Input string length ≤ 100,000 characters
- Time limit: 2 seconds
- Memory limit: 256 MB
- Input may contain any valid Unicode characters
- Output format must match exactly (case-sensitive)

## Hints
- **Hint 1**: Use `char.isascii()` to distinguish between ASCII and Unicode characters
- **Hint 2**: Combine `char.isascii()` with `char.isalpha()` for ASCII letter detection
- **Hint 3**: Use `unicodedata.category(char)` to get detailed Unicode character categories
- **Hint 4**: Emoji detection can use Unicode code point ranges (0x1F600-0x1F64F, 0x1F300-0x1F5FF, etc.)
- **Hint 5**: For large inputs, optimize by avoiding repeated function calls in the inner loop
- **Hint 6**: Be careful with characters like spaces and newlines - they fall into the "Other" category
- **Hint 7**: Test with various scripts: Latin, Cyrillic, Arabic, Chinese, Greek, Hebrew
