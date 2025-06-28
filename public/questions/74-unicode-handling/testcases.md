# Test Cases for Unicode Character Classification

## Test Case Structure
This question uses a 1-line input format containing mixed unicode characters.

### Input Format Pattern:
```
Line 1: String with mixed unicode characters (ASCII letters, unicode letters, digits, symbols, emojis)
```

### Output Format Pattern:
```
ASCII Letters: <count>
ASCII Digits: <count>
Unicode Letters: <count>
Unicode Digits: <count>
Symbols: <count>
Emojis: <count>
Other: <count>
```

## Test Case 1: Basic Mixed Characters
**Input (`input.txt`):**
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
**Purpose:** Tests basic classification of ASCII letters, digits, unicode letters, symbols, and spaces.

## Test Case 2: Emoji-Only Edge Case
**Input (`input2.txt`):**
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
**Purpose:** Tests emoji detection across different emoji ranges and ensures proper classification.

## Test Case 3: Performance Test with Large Mixed Text
**Input (`input3.txt`):**
```
[Contains 100 repetitions of: "Hello World! 你好世界 αβγδε русский текст العربية עברית 🌟😀✨💫"]
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
**Purpose:** Tests performance with large input and diverse unicode scripts. Should timeout O(n²) solutions.

## Test Case Creation Rules

### Input Validation Rules:
1. Input must be a single line of text
2. Can contain any valid Unicode characters
3. Length should be between 1 and 100,000 characters
4. Should include diverse character types for comprehensive testing
5. Empty input should result in all zeros

### Output Format Rules:
1. Must output exactly 7 lines in specified order
2. Format: `<Category>: <count>` with exact spacing
3. All counts must be non-negative integers
4. Categories must be in exact order: ASCII Letters, ASCII Digits, Unicode Letters, Unicode Digits, Symbols, Emojis, Other

### Character Classification Rules:
1. **ASCII Letters**: `char.isascii() and char.isalpha()` - Basic Latin a-z, A-Z
2. **ASCII Digits**: `char.isascii() and char.isdigit()` - Basic digits 0-9
3. **Unicode Letters**: `not char.isascii() and char.isalpha()` - Letters from other scripts
4. **Unicode Digits**: `not char.isascii() and char.isdigit()` - Digits from other scripts
5. **Symbols**: Punctuation and symbols using unicode categories P* and S*
6. **Emojis**: Characters in emoji unicode ranges (0x1F600-0x1F64F, etc.)
7. **Other**: Spaces, control characters, and anything not classified above

## Language-Specific Considerations

### Python Considerations:
- Use `unicodedata.category()` for detailed character classification
- Leverage `char.isascii()`, `char.isalpha()`, `char.isdigit()` methods
- Handle emoji detection with unicode code point ranges
- Be careful with string iteration - Python handles unicode properly by default
- Consider performance with large strings

### Go Considerations:
- Use `unicode` package functions like `unicode.IsLetter()`, `unicode.IsDigit()`
- Check `r < 128` for ASCII detection  
- Iterate over runes, not bytes: `for _, r := range string`
- Use `utf8.ValidString()` for input validation
- Handle emoji detection with rune ranges

### JavaScript Considerations:
- Use `char.charCodeAt(0) < 128` for ASCII detection
- Combine with regex patterns for character classification
- Handle surrogate pairs for emoji detection
- Consider string normalization for consistent results

## Advanced Test Cases to Consider

### Edge Cases:
1. **Empty String**: Should output all zeros
2. **Single Character**: Each category (ASCII letter, emoji, etc.)
3. **Whitespace Only**: Spaces, tabs, newlines (all "Other")
4. **Numbers Only**: Mix of ASCII and unicode digits
5. **Symbols Only**: Various punctuation and mathematical symbols

### Unicode Script Diversity:
1. **Latin Extended**: Àáâãäå, ñ, ç
2. **Cyrillic**: русский, български
3. **Arabic**: العربية, الأرقام ٠١٢٣
4. **Hebrew**: עברית, מספרים
5. **Greek**: αβγδε, Ωμέγα
6. **Chinese/Japanese/Korean**: 你好世界, こんにちは, 안녕하세요
7. **Mathematical**: ∑∏∫√∞

### Emoji Categories:
1. **Faces**: 😀😃😄😁😆😅
2. **Objects**: 🌟✨💫⭐🔥
3. **Animals**: 🐶🐱🐭🐹🐰
4. **Food**: 🍎🍊🍌🍇🍓
5. **Flags**: 🇺🇸🇬🇧🇫🇷🇩🇪🇯🇵

## Performance Test Case Design

### Large Input Generation:
```python
def generate_large_test():
    base_text = "Hello World! 你好世界 αβγδε русский текст العربية עברית 🌟😀✨💫"
    return base_text * 1000  # Creates ~50,000+ character input

def calculate_expected_output(text):
    # Run through classification algorithm
    # Return expected counts
    pass
```

### Performance Requirements:
- Should handle 100,000 character input in under 2 seconds
- Naive O(n²) solutions should timeout
- Efficient O(n) solutions should complete easily

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Output has exactly 7 lines in correct format
- [ ] All character counts sum to input length
- [ ] No negative counts
- [ ] Emoji detection covers major unicode ranges
- [ ] ASCII/Unicode distinction is correct
- [ ] Symbols include punctuation and mathematical symbols
- [ ] "Other" category includes spaces and control characters

## Automated Test Case Generation
```python
import unicodedata
import random

def generate_test_case(length=1000):
    """Generate a test case with specified length and diverse characters."""
    categories = {
        'ascii_letters': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'ascii_digits': '0123456789',
        'unicode_letters': 'αβγδε你好世界русскийالعربيةעברית',
        'symbols': '!@#$%^&*()_+-={}[]|;\':",./<>?',
        'emojis': '🌟✨💫😀🎉🐶🍎🇺🇸',
        'other': ' \t\n'
    }
    
    # Mix characters from all categories
    result = []
    for _ in range(length):
        category = random.choice(list(categories.keys()))
        char = random.choice(categories[category])
        result.append(char)
    
    return ''.join(result)

def validate_test_case(input_content, expected_content):
    """Validate that expected output matches input classification."""
    # Implement classification algorithm
    # Compare with expected output
    # Return validation result
    pass
```
