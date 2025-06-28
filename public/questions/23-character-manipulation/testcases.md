# Test Cases for Character Frequency Analysis

## Test Case Structure
This question uses a **1-line input format**.

### Input Format Pattern:
```
Line 1: a string (may be empty, may contain any printable characters)
```

### Output Format Pattern:
```
character: frequency
character: frequency
...
```
Output is sorted alphabetically by character. If input is empty, no output is produced.

## Test Case 1: Basic Character Counting
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
**Explanation:** Counts each character and sorts alphabetically. The letter 'l' appears twice.

## Test Case 2: Empty String
**Input (`input2.txt`):**
```

```
**Expected Output (`expected2.txt`):**
```

```
**Explanation:** Empty input produces no output, testing edge case handling.

## Test Case 3: Complex Mixed Characters
**Input (`input3.txt`):**
```
Programming 123!
```
**Expected Output (`expected3.txt`):**
```
 : 1
!: 1
1: 1
2: 1
3: 1
P: 1
a: 1
g: 2
i: 1
m: 2
n: 1
o: 1
r: 2
```
**Explanation:** Tests mixed case letters, numbers, spaces, and special characters. Shows proper sorting including space character.

## Test Case Creation Rules
### Input Validation Rules:
1. Input is a single line of text up to 1000 characters
2. May contain any printable ASCII characters (letters, numbers, spaces, symbols)
3. May be empty (0 characters)
4. No newline character should be included in frequency count

### Output Format Rules:
1. Each line shows exactly "character: frequency" format
2. Characters are sorted in ASCII order (space < numbers < uppercase < lowercase)
3. Only characters that actually appear in input are shown
4. Empty input produces no output lines
5. No trailing spaces or extra newlines

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to remove newline but preserve other whitespace
- Handle EOFError for empty input gracefully
- Use dictionary for character counting: `char_freq[char] = char_freq.get(char, 0) + 1`
- Sort keys with `sorted(char_freq.keys())`
- Use f-string formatting: `f"{char}: {char_freq[char]}"`

### Go Considerations:
- Use `bufio.Scanner` to read input line
- Handle case where no input is provided
- Use `map[rune]int` for character counting
- Sort characters using `sort.Slice` with custom comparison
- Use `fmt.Printf("%c: %d\n", char, count)` for output

## Validation Checklist
- [ ] Input has exactly 1 line (or empty)
- [ ] Output lines follow exact "character: frequency" format
- [ ] Characters are sorted in ASCII order
- [ ] All character types (letters, numbers, spaces, symbols) are handled
- [ ] Empty input case produces no output
- [ ] No extra whitespace or newlines in output
- [ ] Frequency counts are accurate

## Automated Test Case Generation
```python
def generate_test_case():
    import random, string
    
    # Generate random test cases of different types
    test_types = [
        "basic_letters",     # Simple letter combinations
        "mixed_case",        # Upper and lowercase mix
        "with_numbers",      # Letters and numbers
        "with_symbols",      # All character types
        "repeated_chars",    # Many repeated characters
        "single_char",       # Single character repeated
        "empty"              # Empty string
    ]
    
    test_type = random.choice(test_types)
    
    if test_type == "empty":
        input_content = "\n"
        expected_content = ""
    elif test_type == "basic_letters":
        length = random.randint(1, 20)
        text = ''.join(random.choice(string.ascii_lowercase) for _ in range(length))
    elif test_type == "mixed_case":
        length = random.randint(1, 20)
        text = ''.join(random.choice(string.ascii_letters) for _ in range(length))
    elif test_type == "with_numbers":
        length = random.randint(1, 20)
        text = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))
    elif test_type == "with_symbols":
        length = random.randint(1, 20)
        text = ''.join(random.choice(string.printable.replace('\n\r\t\v\f', '')) for _ in range(length))
    elif test_type == "repeated_chars":
        char = random.choice(string.ascii_letters)
        count = random.randint(5, 50)
        text = char * count
    elif test_type == "single_char":
        text = random.choice(string.ascii_letters)
    
    if test_type != "empty":
        # Generate expected output
        char_freq = {}
        for char in text:
            char_freq[char] = char_freq.get(char, 0) + 1
        
        expected_lines = []
        for char in sorted(char_freq.keys()):
            expected_lines.append(f"{char}: {char_freq[char]}")
        
        input_content = text + "\n"
        expected_content = "\n".join(expected_lines) + "\n" if expected_lines else ""
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that test case follows the rules."""
    lines = input_content.split('\n')
    
    # Input should have exactly one line (plus empty line from split)
    assert len(lines) <= 2, "Input should have at most one line"
    
    if len(lines) == 2:
        assert lines[1] == "", "Second line should be empty"
        text = lines[0]
    else:
        text = lines[0] if lines else ""
    
    # Validate expected output format
    if expected_content.strip() == "":
        # Empty output for empty input
        assert text == "", "Empty output should only occur for empty input"
    else:
        expected_lines = expected_content.strip().split('\n')
        
        # Each line should follow "character: frequency" format
        prev_char = None
        for line in expected_lines:
            assert ': ' in line, f"Invalid format in line: {line}"
            char, freq = line.split(': ', 1)
            assert len(char) == 1, f"Character should be single character: {char}"
            assert freq.isdigit(), f"Frequency should be number: {freq}"
            
            # Check sorting
            if prev_char is not None:
                assert char > prev_char, f"Characters not sorted: {prev_char} should come before {char}"
            prev_char = char
            
            # Verify character actually appears in input with correct frequency
            actual_freq = text.count(char)
            assert int(freq) == actual_freq, f"Frequency mismatch for '{char}': expected {freq}, got {actual_freq}"
```
