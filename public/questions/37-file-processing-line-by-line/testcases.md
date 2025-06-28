# Test Cases for File processing line by line

## Test Case Structure
This question uses a multi-line input format that ends with EOF.

### Input Format Pattern:
```
Line 1: Any text content (may be empty)
Line 2: Any text content (may be empty)
...
Line N: Any text content (may be empty)
```

### Output Format Pattern:
```
Line 1: X words, Y characters
Line 2: X words, Y characters
...
Line N: X words, Y characters
Total: N lines, X words, Y characters
```

## Test Case Categories (100+ cases distributed across)

### Basic Test Cases (input1.txt - input30.txt)
Simple, straightforward inputs to verify core functionality.

### Edge Cases (input31.txt - input60.txt) 
Boundary conditions, empty inputs, special cases.

### Performance Test Cases (input61.txt - input90.txt)
Large inputs that timeout poor algorithms.

### Complex Scenarios (input91.txt - input100.txt)
Multiple edge cases combined, unusual but valid inputs.

## Sample Test Cases

### Test Case 1: Basic (input1.txt)
**Input:**
```
Hello world
This is a test
Python programming
```
**Expected Output:**
```
Line 1: 2 words, 11 characters
Line 2: 4 words, 14 characters
Line 3: 2 words, 18 characters
Total: 3 lines, 8 words, 43 characters
```

### Test Case 2: Empty Input (input2.txt)
**Input:**
```
```
**Expected Output:**
```
Total: 0 lines, 0 words, 0 characters
```

### Test Case 3: Single Line (input3.txt)
**Input:**
```
Single line of text
```
**Expected Output:**
```
Line 1: 4 words, 18 characters
Total: 1 lines, 4 words, 18 characters
```

### Test Case 4: Empty Lines (input4.txt)
**Input:**
```

   
hello world
```
**Expected Output:**
```
Line 1: 0 words, 0 characters
Line 2: 0 words, 3 characters
Line 3: 2 words, 11 characters
Total: 3 lines, 2 words, 14 characters
```

### Test Case 5: Special Characters (input5.txt)
**Input:**
```
Hello, world!
Testing 123... punctuation?
Symbols: @#$%^&*()
```
**Expected Output:**
```
Line 1: 2 words, 13 characters
Line 2: 3 words, 26 characters
Line 3: 2 words, 17 characters
Total: 3 lines, 7 words, 56 characters
```

## Test Case Creation Rules

### Input Validation Rules:
1. **Multi-line text**: Input can contain 0 to 10,000 lines
2. **Line content**: Each line can contain 0 to 1,000 characters
3. **Character set**: Lines may contain any printable ASCII characters
4. **Empty lines**: Valid and should be handled correctly
5. **Whitespace**: Lines may contain only whitespace characters
6. **EOF handling**: Input processing stops at end-of-file

### Output Format Rules:
1. **Line format**: Each processed line outputs "Line X: Y words, Z characters"
2. **Total format**: Final line outputs "Total: X lines, Y words, Z characters"
3. **Word counting**: Words are sequences of non-whitespace characters
4. **Character counting**: Include all characters including spaces and punctuation
5. **Empty line handling**: Empty lines have 0 words and 0 characters
6. **Line numbering**: Sequential starting from 1
7. **Exact formatting**: Output must match format exactly (spacing, punctuation)

## Language-Specific Considerations

### Python Considerations:
- Use `input()` in a loop with `EOFError` exception handling
- `str.split()` without arguments splits on any whitespace
- `len(line)` counts all characters including spaces
- Handle empty input gracefully (no lines processed)
- Use f-string formatting for consistent output

### Go Considerations:
- Use `bufio.Scanner` with `os.Stdin` for line-by-line reading
- `strings.Fields()` splits on whitespace and removes empty strings
- `len(line)` counts all characters including spaces
- Scanner automatically handles EOF
- Use `fmt.Printf()` for formatted output

### JavaScript Considerations:
- Read all input first, then split by newlines
- Use `split(/\s+/)` to split words, filter empty strings
- Handle EOF by processing entire input at once
- String length includes all characters

## Performance Considerations

### Efficient Algorithms (Expected):
- **Time Complexity**: O(n) where n is total characters in input
- **Space Complexity**: O(1) - process one line at a time
- **Memory Usage**: Constant space regardless of input size

### Inefficient Algorithms (Should Timeout):
- **O(n²)** algorithms that reprocess previous lines
- **High Memory**: Storing all lines before processing
- **Repeated Work**: Recounting words/characters multiple times

## Validation Checklist

When creating or validating test cases, ensure:

- [ ] Input format follows multi-line text with EOF
- [ ] Expected output has correct line numbering (1, 2, 3...)
- [ ] Word count uses whitespace-separated sequences
- [ ] Character count includes spaces and punctuation
- [ ] Empty lines handled correctly (0 words, 0 characters)
- [ ] Total statistics match sum of individual lines
- [ ] Output format matches exactly: "Line X: Y words, Z characters"
- [ ] Final total format: "Total: X lines, Y words, Z characters"
- [ ] Edge cases covered: empty input, single line, empty lines
- [ ] Performance cases test algorithmic efficiency
- [ ] All test cases have valid expected outputs

## Automated Test Case Generation

```python
import random
import string

def generate_test_case(case_type="basic", num_lines=None):
    """Generate test case input and expected output."""
    if case_type == "empty":
        return "", "Total: 0 lines, 0 words, 0 characters\n"
    
    if num_lines is None:
        if case_type == "basic":
            num_lines = random.randint(1, 10)
        elif case_type == "performance":
            num_lines = random.randint(1000, 5000)
        else:
            num_lines = random.randint(1, 50)
    
    lines = []
    total_words = 0
    total_chars = 0
    
    for i in range(num_lines):
        if case_type == "edge" and random.random() < 0.3:
            # Include empty lines for edge cases
            line = ""
        else:
            # Generate random text line
            num_words = random.randint(0, 20)
            words = []
            for _ in range(num_words):
                word_len = random.randint(1, 15)
                word = ''.join(random.choices(string.ascii_letters, k=word_len))
                words.append(word)
            line = ' '.join(words)
        
        lines.append(line)
        total_words += len(line.split()) if line.strip() else 0
        total_chars += len(line)
    
    input_text = '\n'.join(lines)
    
    # Generate expected output
    output_lines = []
    line_words = 0
    line_chars = 0
    
    for i, line in enumerate(lines, 1):
        words = len(line.split()) if line.strip() else 0
        chars = len(line)
        output_lines.append(f"Line {i}: {words} words, {chars} characters")
    
    output_lines.append(f"Total: {num_lines} lines, {total_words} words, {total_chars} characters")
    expected_output = '\n'.join(output_lines) + '\n'
    
    return input_text, expected_output

def validate_test_case(input_content, expected_content):
    """Validate that test case input and expected output are consistent."""
    lines = input_content.split('\n') if input_content else []
    expected_lines = expected_content.strip().split('\n')
    
    # Validate total line matches actual line count
    total_line = expected_lines[-1]
    if not total_line.startswith("Total: "):
        return False
    
    parts = total_line.split()
    expected_line_count = int(parts[1])
    
    return len(lines) == expected_line_count
```
