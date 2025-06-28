# Test Cases for Basic String Manipulation

## Test Case Structure
This question uses a 1-line input format for string manipulation operations.

### Input Format Pattern:
```
Line 1: any string (letters, numbers, spaces, special characters)
```

### Output Format Pattern:
```
Length: <number>
Reversed: <reversed_string>
Vowels: <count>
Uppercase: <uppercase_string>
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
hello
```
**Expected Output (`expected.txt`):**
```
Length: 5
Reversed: olleh
Vowels: 2
Uppercase: HELLO
```
**Description:** Simple lowercase word with common vowels (e, o). Tests basic functionality with a straightforward example.

## Test Case 2: Edge - Empty String
**Input (`input2.txt`):**
```

```
**Expected Output (`expected2.txt`):**
```
Length: 0
Reversed: 
Vowels: 0
Uppercase: 
```
**Description:** Empty string edge case. Tests handling of zero-length input and ensures no crashes with empty operations.

## Test Case 3: Performance - Complex Mixed Content
**Input (`input3.txt`):**
```
Programming123! Educational@Content#2024
```
**Expected Output (`expected3.txt`):**
```
Length: 40
Reversed: 4202#tnetnoC@lanoitacudE !321gnimmargorP
Vowels: 11
Uppercase: PROGRAMMING123! EDUCATIONAL@CONTENT#2024
```
**Description:** Large mixed content with letters, numbers, spaces, and special characters. Tests performance with longer strings and character variety. Contains 11 vowels: o,a,i,E,u,a,i,o,a,o,e.

## Test Case Creation Rules

### Input Validation Rules:
1. **Single line input:** Input must contain exactly one line (may be empty)
2. **Character set:** Any printable ASCII characters (letters, numbers, spaces, punctuation)
3. **Length limits:** 0 to 1000 characters to ensure reasonable performance
4. **No newline handling:** Input reading should strip trailing newlines properly

### Output Format Rules:
1. **Exact format matching:** Each output line must match the pattern exactly
   - `Length: <number>` (space after colon)
   - `Reversed: <string>` (space after colon, empty if input empty)
   - `Vowels: <count>` (space after colon)
   - `Uppercase: <string>` (space after colon, empty if input empty)
2. **Four output lines:** Always exactly 4 lines of output
3. **No trailing spaces:** Avoid extra whitespace at line endings
4. **Vowel definition:** Count a, e, i, o, u (case-insensitive) only

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to remove trailing newlines
- String slicing `s[::-1]` is efficient for reversal
- Generator expressions are memory-efficient for vowel counting
- `s.upper()` method for case conversion
- Handle empty strings gracefully (no special cases needed)

### Go Considerations:
- Use `bufio.Scanner` and `strings.TrimSpace()` for input
- Manual rune reversal for proper Unicode handling
- `strings.ContainsRune()` for vowel checking
- `strings.ToUpper()` for case conversion
- Be aware of UTF-8 vs ASCII character counting differences

### JavaScript Considerations:
- Use proper input reading for Node.js environment
- `split('').reverse().join('')` for string reversal
- Regular expressions `/[aeiouAEIOU]/g` for vowel matching
- `toUpperCase()` method for case conversion

## Validation Checklist

When creating or validating test cases, ensure:

- [ ] Input has exactly 1 line (may be empty)
- [ ] Expected output has exactly 4 lines
- [ ] Length calculation is accurate (character count)
- [ ] String reversal is correct (character-by-character)
- [ ] Vowel count includes only a,e,i,o,u (case-insensitive)
- [ ] Uppercase conversion preserves non-alphabetic characters
- [ ] Output format matches pattern exactly (spaces, colons)
- [ ] Edge cases handled (empty string, no vowels, all vowels)
- [ ] Performance acceptable for maximum input size

## Automated Test Case Generation

```python
import random
import string

def generate_test_case(length=None, test_type="random"):
    """Generate a test case for basic string manipulation"""
    
    if test_type == "empty":
        input_str = ""
    elif test_type == "vowels_only":
        input_str = "".join(random.choices("aeiou", k=length or 10))
    elif test_type == "no_vowels":
        consonants = "bcdfghjklmnpqrstvwxyz"
        input_str = "".join(random.choices(consonants, k=length or 10))
    elif test_type == "mixed":
        chars = string.ascii_letters + string.digits + " !@#$%"
        input_str = "".join(random.choices(chars, k=length or 20))
    else:  # random
        input_str = "".join(random.choices(string.ascii_letters, k=length or 10))
    
    # Generate expected output
    length_val = len(input_str)
    reversed_str = input_str[::-1]
    vowels = "aeiouAEIOU"
    vowel_count = sum(1 for char in input_str if char in vowels)
    uppercase_str = input_str.upper()
    
    input_content = input_str
    expected_content = f"Length: {length_val}\nReversed: {reversed_str}\nVowels: {vowel_count}\nUppercase: {uppercase_str}"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that test case is correctly formatted"""
    
    # Check input format
    input_lines = input_content.split('\n')
    if len(input_lines) > 2 or (len(input_lines) == 2 and input_lines[1] != ""):
        return False, "Input must be exactly one line (may be empty)"
    
    input_str = input_lines[0] if input_lines else ""
    
    # Check expected output format
    expected_lines = expected_content.strip().split('\n')
    if len(expected_lines) != 4:
        return False, "Expected output must have exactly 4 lines"
    
    # Validate output format patterns
    patterns = [
        ("Length: ", "Length line must start with 'Length: '"),
        ("Reversed: ", "Reversed line must start with 'Reversed: '"),
        ("Vowels: ", "Vowels line must start with 'Vowels: '"),
        ("Uppercase: ", "Uppercase line must start with 'Uppercase: '")
    ]
    
    for i, (pattern, error_msg) in enumerate(patterns):
        if not expected_lines[i].startswith(pattern):
            return False, error_msg
    
    # Validate calculations
    length_val = len(input_str)
    expected_length = int(expected_lines[0].split(': ')[1])
    if length_val != expected_length:
        return False, f"Length mismatch: expected {length_val}, got {expected_length}"
    
    reversed_str = input_str[::-1]
    expected_reversed = expected_lines[1].split(': ', 1)[1]
    if reversed_str != expected_reversed:
        return False, f"Reversed mismatch: expected '{reversed_str}', got '{expected_reversed}'"
    
    vowels = "aeiouAEIOU"
    vowel_count = sum(1 for char in input_str if char in vowels)
    expected_vowels = int(expected_lines[2].split(': ')[1])
    if vowel_count != expected_vowels:
        return False, f"Vowel count mismatch: expected {vowel_count}, got {expected_vowels}"
    
    uppercase_str = input_str.upper()
    expected_uppercase = expected_lines[3].split(': ', 1)[1]
    if uppercase_str != expected_uppercase:
        return False, f"Uppercase mismatch: expected '{uppercase_str}', got '{expected_uppercase}'"
    
    return True, "Test case is valid"
```
