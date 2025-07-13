# Characters (chars)

## What are Characters?

A character (char) is a single unit of text, such as a letter, digit, punctuation mark, or symbol. Characters are the building blocks of strings and are fundamental to text processing in programming.

## Basic Character Operations

### Character Declaration

```python
# Python - characters are strings of length 1
char = 'A'
digit = '5'
symbol = '$'
space = ' '

# Check if it's a single character
print(len(char))  # 1
print(type(char))  # <class 'str'>
```

```go
// Go - rune type for characters
var char rune = 'A'
var digit rune = '5'
var symbol rune = '$'
var space rune = ' '

// String to rune
char := rune("A"[0])
```

```java
// Java - char primitive type
char letter = 'A';
char digit = '5';
char symbol = '$';
char space = ' ';
```

### Character Properties

```python
# Python - character properties
char = 'A'

print(char.isalpha())    # True - is a letter
print(char.isdigit())    # False - is not a digit
print(char.isupper())    # True - is uppercase
print(char.islower())    # False - is not lowercase
print(char.isspace())    # False - is not whitespace
print(ord(char))         # 65 - ASCII/Unicode value
```

```go
// Go - character properties
import "unicode"

char := 'A'

fmt.Println(unicode.IsLetter(char))  // true
fmt.Println(unicode.IsDigit(char))   // false
fmt.Println(unicode.IsUpper(char))   // true
fmt.Println(unicode.IsLower(char))   // false
fmt.Println(unicode.IsSpace(char))   // false
fmt.Println(int(char))               // 65
```

## Character Encoding

### ASCII Values

```python
# Python - ASCII operations
char = 'A'
ascii_value = ord(char)      # 65
char_from_ascii = chr(65)    # 'A'

# Common ASCII ranges
print(ord('A'))  # 65
print(ord('Z'))  # 90
print(ord('a'))  # 97
print(ord('z'))  # 122
print(ord('0'))  # 48
print(ord('9'))  # 57
```

```go
// Go - ASCII operations
char := 'A'
asciiValue := int(char)      // 65
charFromAscii := rune(65)    // 'A'

// Common ASCII ranges
fmt.Println(int('A'))  // 65
fmt.Println(int('Z'))  // 90
fmt.Println(int('a'))  // 97
fmt.Println(int('z'))  // 122
fmt.Println(int('0'))  // 48
fmt.Println(int('9'))  // 57
```

### Unicode Support

```python
# Python - Unicode characters
unicode_char = 'é'           # Unicode character
emoji = '😀'                 # Emoji
chinese = '中'               # Chinese character

print(ord(unicode_char))     # 233
print(ord(emoji))           # 128512
print(ord(chinese))         # 20013
```

```go
// Go - Unicode characters
unicodeChar := 'é'           // Unicode character
emoji := '😀'               // Emoji
chinese := '中'             // Chinese character

fmt.Println(int(unicodeChar))  // 233
fmt.Println(int(emoji))        // 128512
fmt.Println(int(chinese))      // 20013
```

## Character Manipulation

### Case Conversion

```python
# Python - case conversion
char = 'A'
lower_char = char.lower()    # 'a'
upper_char = char.upper()    # 'A'

char2 = 'b'
upper_char2 = char2.upper()  # 'B'
lower_char2 = char2.lower()  # 'b'
```

```go
// Go - case conversion
import "unicode"

char := 'A'
lowerChar := unicode.ToLower(char)  // 'a'
upperChar := unicode.ToUpper(char)  // 'A'

char2 := 'b'
upperChar2 := unicode.ToUpper(char2)  // 'B'
lowerChar2 := unicode.ToLower(char2)  // 'b'
```

### Character Comparison

```python
# Python - character comparison
char1 = 'A'
char2 = 'B'
char3 = 'a'

print(char1 < char2)     # True (65 < 66)
print(char1 == char3)    # False (65 != 97)
print(char1.lower() == char3.lower())  # True
```

```go
// Go - character comparison
char1 := 'A'
char2 := 'B'
char3 := 'a'

fmt.Println(char1 < char2)  // true (65 < 66)
fmt.Println(char1 == char3) // false (65 != 97)
fmt.Println(unicode.ToLower(char1) == unicode.ToLower(char3))  // true
```

## Character Classification

### Letter Characters

```python
# Python - letter classification
letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

for char in letters:
    if char.isalpha():
        print(f"{char} is a letter")
    if char.isupper():
        print(f"{char} is uppercase")
    if char.islower():
        print(f"{char} is lowercase")
```

### Digit Characters

```python
# Python - digit classification
digits = '0123456789'

for char in digits:
    if char.isdigit():
        print(f"{char} is a digit")
    if char.isnumeric():
        print(f"{char} is numeric")
```

### Special Characters

```python
# Python - special character classification
special_chars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

for char in special_chars:
    if not char.isalnum() and not char.isspace():
        print(f"{char} is a special character")
```

## Character in Strings

### String to Characters

```python
# Python - convert string to characters
text = "Hello"
characters = list(text)  # ['H', 'e', 'l', 'l', 'o']

# Iterate through characters
for char in text:
    print(char)

# Access individual characters
first_char = text[0]     # 'H'
last_char = text[-1]     # 'o'
```

```go
// Go - convert string to characters
text := "Hello"
characters := []rune(text)  // ['H', 'e', 'l', 'l', 'o']

// Iterate through characters
for _, char := range text {
    fmt.Printf("%c\n", char)
}

// Access individual characters
firstChar := rune(text[0])  // 'H'
lastChar := rune(text[len(text)-1])  // 'o'
```

### Characters to String

```python
# Python - convert characters to string
chars = ['H', 'e', 'l', 'l', 'o']
text = ''.join(chars)  # "Hello"

# Using chr() and ord()
ascii_chars = [72, 101, 108, 108, 111]
text = ''.join(chr(code) for code in ascii_chars)  # "Hello"
```

```go
// Go - convert characters to string
chars := []rune{'H', 'e', 'l', 'l', 'o'}
text := string(chars)  // "Hello"

// Using rune values
asciiChars := []rune{72, 101, 108, 108, 111}
text = string(asciiChars)  // "Hello"
```

## Character Validation

### Input Validation

```python
# Python - character validation
def validate_username_char(char):
    return char.isalnum() or char in '_'

def validate_password_char(char):
    return char.isalnum() or char in '!@#$%^&*'

# Test validation
username = "user123"
is_valid = all(validate_username_char(c) for c in username)
print(is_valid)  # True
```

### Character Filtering

```python
# Python - filter characters
text = "Hello123!@#"

# Keep only letters
letters_only = ''.join(c for c in text if c.isalpha())
print(letters_only)  # "Hello"

# Keep only digits
digits_only = ''.join(c for c in text if c.isdigit())
print(digits_only)  # "123"

# Remove special characters
clean_text = ''.join(c for c in text if c.isalnum())
print(clean_text)  # "Hello123"
```

## Character Escaping

### Escape Sequences

```python
# Python - escape sequences
newline = '\n'        # New line
tab = '\t'           # Tab
quote = '\''         # Single quote
double_quote = '"'   # Double quote
backslash = '\\'     # Backslash

# Raw strings
raw_string = r'C:\Users\Name'  # No escaping
```

```go
// Go - escape sequences
newline := '\n'        // New line
tab := '\t'           // Tab
quote := '\''         // Single quote
doubleQuote := '"'    // Double quote
backslash := '\\'     // Backslash

// Raw strings (using backticks)
rawString := `C:\Users\Name`  // No escaping
```

## Performance Considerations

### Character vs String Operations

```python
# Python - efficient character operations
import time

# Character operations are fast
start = time.time()
for i in range(1000000):
    char = chr(i % 26 + 65)  # A-Z
    is_upper = char.isupper()
end = time.time()
print(f"Character operations: {end - start:.4f} seconds")

# String operations are slower
start = time.time()
for i in range(1000000):
    text = "A" * (i % 10 + 1)
    is_upper = text.isupper()
end = time.time()
print(f"String operations: {end - start:.4f} seconds")
```

## Best Practices

### 1. Use Appropriate Character Types

```python
# Python - use single quotes for characters
char = 'A'  # Good
char = "A"  # Also works, but single quote is clearer

# Go - use rune for Unicode characters
char := 'A'  // Good for ASCII
char := 'é'  // Good for Unicode
```

### 2. Handle Unicode Properly

```python
# Python - Unicode handling
import unicodedata

char = 'é'
normalized = unicodedata.normalize('NFD', char)
print(normalized)  # 'e\u0301'
```

### 3. Validate Character Input

```python
# Python - character validation
def is_valid_filename_char(char):
    return char.isalnum() or char in '._-'

def sanitize_filename(filename):
    return ''.join(c for c in filename if is_valid_filename_char(c))
```

## Related Concepts

- [[wiki:strings]] - Working with character sequences
- [[wiki:data-types]] - Understanding character data types
- [[wiki:parsing]] - Parsing character data
- [[wiki:validation]] - Character validation techniques
