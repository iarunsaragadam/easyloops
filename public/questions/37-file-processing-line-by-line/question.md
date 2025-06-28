# File processing line by line

## Problem Statement

Write a program that processes text input line by line and generates statistics for each line. This exercise demonstrates fundamental file processing concepts where you read input sequentially, process each line individually, and maintain running totals.

Your program should:

1. **Read lines of text** from standard input until end-of-file (EOF)
2. **Process each line individually** to:
   - Count the number of words (separated by whitespace)
   - Count the total number of characters (including spaces)
3. **Output statistics for each line** in the format: `Line X: Y words, Z characters`
4. **Maintain running totals** and output final summary statistics
5. **Handle edge cases** like empty lines and lines with only whitespace

This problem teaches essential file processing skills including reading until EOF, line-by-line processing, string analysis, and accumulating results.

## Input Format

The input consists of multiple lines of text (0 or more lines):
```
Line 1: Any text content (may be empty)
Line 2: Any text content (may be empty)
...
Line N: Any text content (may be empty)
```

Input ends when EOF is reached. Lines may contain any printable characters including spaces, and some lines may be empty.

## Test Cases

**Input (`input1.txt`):**
```
Hello world
This is a test
Python programming
```

**Expected Output (`expected1.txt`):**
```
Line 1: 2 words, 11 characters
Line 2: 4 words, 14 characters
Line 3: 2 words, 18 characters
Total: 3 lines, 8 words, 43 characters
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice reading input line by line until EOF
- Understand sequential file/stream processing patterns
- Learn to maintain running totals and state across iterations
- Practice string manipulation and analysis
- Handle edge cases like empty input and empty lines
- Implement efficient line-by-line processing algorithms

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    line_num = 0
    total_words = 0
    total_chars = 0
    
    try:
        while True:
            line = input()
            line_num += 1
            
            # Process the line
            words = len(line.split())
            chars = len(line)
            
            # Update totals
            total_words += words
            total_chars += chars
            
            # Output line statistics
            print(f"Line {line_num}: {words} words, {chars} characters")
            
    except EOFError:
        # End of input reached
        pass
    
    # Output final totals
    print(f"Total: {line_num} lines, {total_words} words, {total_chars} characters")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    lineNum := 0
    totalWords := 0
    totalChars := 0
    
    for scanner.Scan() {
        line := scanner.Text()
        lineNum++
        
        // Process the line
        words := len(strings.Fields(line))
        chars := len(line)
        
        // Update totals
        totalWords += words
        totalChars += chars
        
        // Output line statistics
        fmt.Printf("Line %d: %d words, %d characters\n", lineNum, words, chars)
    }
    
    // Output final totals
    fmt.Printf("Total: %d lines, %d words, %d characters\n", lineNum, totalWords, totalChars)
}
```

## Constraints

- Input may contain 0 to 10,000 lines
- Each line may contain 0 to 1,000 characters
- Lines may be empty or contain only whitespace
- Words are defined as sequences of non-whitespace characters
- Character count includes all characters including spaces and punctuation
- Memory usage should be O(1) - process lines one at a time without storing all input

## Hints

- Use a loop to read input until EOF is reached
- In Python, catch `EOFError` to detect end of input
- In Go, use `bufio.Scanner` to read line by line
- Use `split()` or `strings.Fields()` to count words efficiently
- Remember to handle empty lines (0 words, 0 characters)
- Keep running totals as you process each line
- Test with various inputs: normal text, empty lines, and empty input
