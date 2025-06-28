# Test Cases for Reading from files

## Test Case Structure
This question uses a **multi-line input format** where each line contains a single word.

### Input Format Pattern:
```
Line 1: word1
Line 2: word2
...
Line n: wordn
```

### Output Format Pattern:
```
sorted_word1
sorted_word2
...
sorted_wordm
Unique words: m
```

## Test Case 1: Basic - Mixed Duplicates
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

## Test Case 2: Edge - Single Word
**Input (`input2.txt`):**
```
hello
```
**Expected Output (`expected2.txt`):**
```
hello
Unique words: 1
```

## Test Case 3: Complex - Programming Terms with Duplicates
**Input (`input3.txt`):**
```
programming
database
questions
programming
learning
code
database
algorithm
learning
programming
data
structure
```
**Expected Output (`expected3.txt`):**
```
algorithm
code
data
database
learning
programming
questions
structure
Unique words: 8
```

## Test Case Creation Rules
### Input Validation Rules:
1. Each line contains exactly one word (no spaces within words)
2. Words contain only alphabetic characters (a-z, A-Z)
3. Words are 1-50 characters long
4. Input can have 1-1000 words total
5. Words are case-sensitive
6. No empty lines in the middle of input

### Output Format Rules:
1. Output unique words in alphabetical order, one per line
2. Last line must be "Unique words: X" where X is the count
3. No extra whitespace or blank lines
4. Exact case preservation from input
5. No trailing spaces on any line

## Language-Specific Considerations
### Python Considerations:
- Use `try/except EOFError` to read until end of input
- Use `set()` for duplicate removal and `sorted()` for ordering
- Use `input().strip()` to handle line endings
- Remember to handle empty input case

### Go Considerations:
- Use `bufio.Scanner` to read line by line
- Use `map[string]bool` as a set equivalent for duplicates
- Use `sort.Strings()` for alphabetical ordering
- Use `strings.TrimSpace()` to clean input

## Validation Checklist
- [ ] Input contains only alphabetic words
- [ ] No empty lines in input
- [ ] Output is sorted alphabetically
- [ ] Duplicates are removed correctly
- [ ] Final count line matches actual unique word count
- [ ] No extra whitespace in output
- [ ] Case sensitivity is preserved

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random test case for word processing."""
    word_pool = [
        'apple', 'banana', 'cherry', 'date', 'elderberry',
        'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
        'mango', 'orange', 'papaya', 'quince', 'raspberry'
    ]
    
    # Generate 5-15 words with some duplicates
    num_words = random.randint(5, 15)
    words = []
    for _ in range(num_words):
        word = random.choice(word_pool)
        words.append(word)
    
    # Create input
    input_content = '\n'.join(words)
    
    # Create expected output
    unique_words = sorted(set(words))
    expected_lines = unique_words + [f"Unique words: {len(unique_words)}"]
    expected_content = '\n'.join(expected_lines)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the rules."""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Check input format
    for line in input_lines:
        if not line.strip():
            return False, "Empty line in input"
        if not line.strip().isalpha():
            return False, "Non-alphabetic characters in input"
        if len(line.strip()) > 50:
            return False, "Word too long"
    
    # Check output format
    if not expected_lines[-1].startswith("Unique words: "):
        return False, "Missing count line"
    
    # Verify uniqueness and sorting
    output_words = expected_lines[:-1]
    if output_words != sorted(set(input_lines)):
        return False, "Incorrect word processing"
    
    return True, "Valid test case"
```
