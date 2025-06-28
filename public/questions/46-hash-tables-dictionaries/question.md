# Hash Tables/Dictionaries

## Problem Statement

Write a program that counts the frequency of each character in a given string and displays the results in alphabetical order. This problem introduces you to hash tables (dictionaries), one of the most fundamental and useful data structures in programming.

In real-world applications, character frequency analysis is used in:
- Text compression algorithms (like Huffman coding)
- Cryptography and code breaking
- Natural language processing
- Data analysis and pattern recognition

Your task is to read a string and output each unique character along with how many times it appears, sorted alphabetically by character.

## Input Format

The input consists of 1 line:
```
Line 1: A string (may contain letters, digits, spaces, and special characters)
```

## Test Cases
**Input (`input.txt`):**
```
hello world
```

**Expected Output (`expected.txt`):**
```
 : 1
d: 1
e: 1
h: 1
l: 3
o: 2
r: 1
w: 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand hash tables/dictionaries as key-value data structures
- Learn to count occurrences efficiently using dictionaries
- Practice string processing and character manipulation
- Understand the importance of consistent output formatting
- Learn when hash tables provide O(1) average-case lookup time

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    line = input().strip()
    
    # Create a dictionary to store character frequencies
    char_count = {}
    
    # Count each character
    for char in line:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Output in sorted order
    for char in sorted(char_count.keys()):
        print(f"{char}: {char_count[char]}")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := scanner.Text()
    
    // Create a map to store character frequencies
    charCount := make(map[rune]int)
    
    // Count each character
    for _, char := range line {
        charCount[char]++
    }
    
    // Get sorted keys and output
    var keys []rune
    for k := range charCount {
        keys = append(keys, k)
    }
    sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
    
    for _, char := range keys {
        fmt.Printf("%c: %d\n", char, charCount[char])
    }
}
```

## Constraints
- Input string length: 0 ≤ length ≤ 100,000 characters
- String may contain any printable ASCII characters
- Empty strings are valid input (produce no output)
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- Use a dictionary/map data structure to store character counts
- The `get()` method in Python (or similar) helps handle missing keys gracefully
- Remember to sort the characters before outputting to ensure consistent results
- Pay attention to the output format: "character: count" with exactly one space after the colon
- Consider how you'll handle special characters like spaces and punctuation
