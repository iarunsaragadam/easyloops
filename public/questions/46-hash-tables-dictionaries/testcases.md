# Test Cases for Hash Tables/Dictionaries

## Test Case Structure
This question uses a 1-line input format where students count character frequencies.

### Input Format Pattern:
```
Line 1: String to analyze (any printable ASCII characters)
```

### Output Format Pattern:
```
character: frequency
(one line per unique character, sorted alphabetically)
```

## Test Case 1: Basic
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
**Purpose:** Tests basic character counting with mixed letters and spaces. Introduces the fundamental concept of using dictionaries for frequency counting.

## Test Case 2: Edge
**Input (`input2.txt`):**
```
a
```
**Expected Output (`expected2.txt`):**
```
a: 1
```
**Purpose:** Tests minimal case with single character. Verifies solution handles the simplest possible input correctly.

## Test Case 3: Performance
**Input (`input3.txt`):**
```
[26,000 character string with 'abcdefghijklmnopqrstuvwxyz' repeated 1000 times]
```
**Expected Output (`expected3.txt`):**
```
a: 1000
b: 1000
c: 1000
d: 1000
e: 1000
f: 1000
g: 1000
h: 1000
i: 1000
j: 1000
k: 1000
l: 1000
m: 1000
n: 1000
o: 1000
p: 1000
q: 1000
r: 1000
s: 1000
t: 1000
u: 1000
v: 1000
w: 1000
x: 1000
y: 1000
z: 1000
```
**Purpose:** Tests performance with large input. A naive O(n²) solution that repeatedly searches for characters would timeout, while an efficient O(n) hash table solution completes quickly.

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be a single line string
2. String can contain any printable ASCII characters (spaces, letters, digits, punctuation)
3. Empty string is valid input (results in no output)
4. Maximum length should not exceed 100,000 characters for performance testing

### Output Format Rules:
1. Each line must follow the format: `character: frequency`
2. Exactly one space after the colon
3. Characters must be sorted in ASCII order
4. No empty lines between character entries
5. No trailing newline after the last entry

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read the line
- Dictionary `.get()` method is helpful: `char_count.get(char, 0) + 1`
- Use `sorted(char_count.keys())` for alphabetical ordering
- Format output with f-strings: `f"{char}: {count}"`

### Go Considerations:
- Use `bufio.Scanner` to read input
- Create `map[rune]int` for character counting
- Sort keys manually using `sort.Slice()` with custom comparison
- Use `fmt.Printf("%c: %d\n", char, count)` for output

## Validation Checklist
- [ ] Input has exactly 1 line (or empty)
- [ ] Output characters are sorted alphabetically
- [ ] Output format matches exactly: "character: frequency"
- [ ] All unique characters from input appear in output
- [ ] Frequency counts are accurate
- [ ] No duplicate character entries in output
- [ ] Performance test case challenges inefficient algorithms

## Automated Test Case Generation
```python
def generate_test_case(length=100, char_set="abcdefghijklmnopqrstuvwxyz"):
    """Generate a test case of specified length using given character set."""
    import random
    return ''.join(random.choice(char_set) for _ in range(length))

def validate_test_case(input_content, expected_content):
    """Validate that expected output correctly represents input character frequencies."""
    # Count characters in input
    char_count = {}
    for char in input_content.strip():
        char_count[char] = char_count.get(char, 0) + 1
    
    # Parse expected output
    expected_count = {}
    for line in expected_content.strip().split('\n'):
        if line:
            char, count = line.split(': ')
            expected_count[char] = int(count)
    
    # Verify they match
    return char_count == expected_count

def performance_test_generator():
    """Generate large input for performance testing."""
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet * 1000  # 26,000 characters
```

## Common Student Mistakes to Test
1. **Incorrect sorting**: Not sorting characters alphabetically
2. **Wrong output format**: Missing space after colon, wrong punctuation
3. **Inefficient algorithms**: Using nested loops instead of dictionaries
4. **Edge case handling**: Not handling empty strings or single characters
5. **Character encoding**: Issues with special characters or spaces
