# Reading from files

## Problem Statement

You are working with a text file that contains a list of words, one word per line. Your task is to read all the words from the file, process them to remove duplicates, sort them alphabetically, and output the results with a count of unique words.

This problem simulates reading from a file and performing common text processing operations that are frequently needed in real-world applications such as log analysis, data cleaning, and content processing.

## Input Format

The input consists of multiple lines, each containing a single word:
```
Line 1: First word
Line 2: Second word
...
Line n: Last word
```

Each line contains exactly one word (no spaces within words). Words are case-sensitive.

## Test Cases
**Input (`input.txt`):**
```
apple
banana
apple
cherry
banana
date
```

**Expected Output (`expected.txt`):**
```
apple
banana
cherry
date
Unique words: 4
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice reading multiple lines of input until EOF
- Learn to work with sets for duplicate removal
- Understand basic text processing and data cleaning
- Practice sorting and organizing data
- Learn to handle variable-length input streams
- Understand common file processing patterns

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    words = []
    try:
        while True:
            line = input().strip()
            if line:  # Only process non-empty lines
                words.append(line)
    except EOFError:
        pass  # End of input reached
    
    # Remove duplicates and sort
    unique_words = sorted(set(words))
    
    # Output results
    for word in unique_words:
        print(word)
    print(f"Unique words: {len(unique_words)}")
```

### Go Example Structure:
```go
func solve() {
    wordSet := make(map[string]bool)
    
    for scanner.Scan() {
        word := strings.TrimSpace(scanner.Text())
        if word != "" {
            wordSet[word] = true
        }
    }
    
    // Convert to slice and sort
    var words []string
    for word := range wordSet {
        words = append(words, word)
    }
    sort.Strings(words)
    
    // Output results
    for _, word := range words {
        fmt.Println(word)
    }
    fmt.Printf("Unique words: %d\n", len(words))
}
```

## Constraints
- Input will contain 1 to 1000 words
- Each word will be 1 to 50 characters long
- Words contain only alphabetic characters (a-z, A-Z)
- Words are case-sensitive
- No trailing spaces or empty lines in input
- Output format must match exactly (including the "Unique words: X" line)

## Hints
- Use `try/except EOFError` pattern in Python to read until end of input
- Consider using a set data structure to automatically handle duplicates
- Remember that sorting a set converts it to a list in most languages
- The final output should include both the sorted words and the count
- Handle empty input gracefully (output "Unique words: 0")
- Strip whitespace from each line to handle any formatting issues
