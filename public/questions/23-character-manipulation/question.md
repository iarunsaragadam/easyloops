# Character Frequency Analysis

## Problem Statement

Write a program that reads a string and analyzes the frequency of each character. Your program should count how many times each character appears and display the results sorted alphabetically by character.

This is a fundamental character manipulation exercise that teaches:
- Character iteration and processing
- Frequency counting using hash maps/dictionaries
- Sorting and output formatting

## Input Format

The input consists of 1 line:
```
Line 1: a string (may be empty, may contain any printable characters including spaces)
```

## Test Cases
**Input (`input.txt`):**
```
hello
```

**Expected Output (`expected.txt`):**
```
e: 1
h: 1
l: 2
o: 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice character-by-character string processing
- Learn to use hash maps/dictionaries for frequency counting
- Understand sorting and output formatting
- Handle edge cases like empty strings
- Work with different character types (letters, numbers, symbols, spaces)

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    try:
        line = input().strip()
    except EOFError:
        line = ""
    
    # Count character frequencies
    char_freq = {}
    for char in line:
        char_freq[char] = char_freq.get(char, 0) + 1
    
    # Sort by character and output
    for char in sorted(char_freq.keys()):
        print(f"{char}: {char_freq[char]}")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    var line string
    if scanner.Scan() {
        line = scanner.Text()
    }
    
    // Count character frequencies
    charFreq := make(map[rune]int)
    for _, char := range line {
        charFreq[char]++
    }
    
    // Sort characters and output
    var chars []rune
    for char := range charFreq {
        chars = append(chars, char)
    }
    sort.Slice(chars, func(i, j int) bool {
        return chars[i] < chars[j]
    })
    
    for _, char := range chars {
        fmt.Printf("%c: %d\n", char, charFreq[char])
    }
}
```

## Constraints
- String length: 0 to 1000 characters
- Time complexity should be O(n log k) where n is string length and k is number of unique characters
- Space complexity should be O(k) where k is number of unique characters
- Handle all printable ASCII characters including spaces, numbers, and symbols

## Hints
- Use a dictionary/map to count character frequencies
- Remember to sort the characters alphabetically before outputting
- Handle the empty string case gracefully (no output expected)
- Pay attention to the exact output format: "character: frequency"
- Consider that spaces and special characters should also be counted
