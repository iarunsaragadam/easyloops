# Characters (chars)

## What are Characters?

Character ante single text unit, like a letter, number, symbol, or even emoji, kinda like one punch. Ivi strings build cheyadaniki blocks laga work chesthai, text processing lo must.

## Basic Character Operations

### Character Declaration

```python
# Python - characters are strings of length 1
hero_char = 'S'  # Sivudu’s initial
deal_digit = '7'  # Deal number
mass_symbol = '@'  # Mass vibe
space = ' '

# Check if it’s a single character
print(len(hero_char))  # 1
print(type(hero_char))  # <class 'str'>
```

```go
// Go - rune type for characters
var heroChar rune = 'S'
var dealDigit rune = '7'
var massSymbol rune = '@'
var space rune = ' '

// String to rune
heroChar := rune("S"[0])
```

```java
// Java - char primitive type
char heroChar = 'S';
char dealDigit = '7';
char massSymbol = '@';
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
unicode_char = 'é'           # Fancy letter
emoji = '😎'                # Mass emoji
telugu_char = 'స'           # Telugu letter

print(ord(unicode_char))     # 233
print(ord(emoji))            # 128526
print(ord(telugu_char))      # 3137
```

```go
// Go - Unicode characters
unicodeChar := 'é'           // Fancy letter
emoji := '😎'               // Mass emoji
teluguChar := 'స'           // Telugu letter

fmt.Println(int(unicodeChar))  // 233
fmt.Println(int(emoji))        // 128526
fmt.Println(int(teluguChar))   // 3137
```

## Character Manipulation

### Case Conversion

Chars ni uppercase or lowercase ki change cheyadam, like a hero switching styles.

```python
# Python - case conversion
hero_char = 'S'
lower_char = hero_char.lower()    # 's'
upper_char = hero_char.upper()    # 'S'

deal_char = 'k'
upper_deal = deal_char.upper()    # 'K'
lower_deal = deal_char.lower()    # 'k'
```

```go
// Go - case conversion
import "unicode"

heroChar := 'S'
lowerChar := unicode.ToLower(heroChar)  // 's'
upperChar := unicode.ToUpper(heroChar)  // 'S'

dealChar := 'k'
upperDeal := unicode.ToUpper(dealChar)  // 'K'
lowerDeal := unicode.ToLower(dealChar)  // 'k'
```

### Character Comparison

```python
# Python - character comparison
hero_char = 'S'
deal_char = 'T'
lower_char = 's'

print(hero_char < deal_char)     # True (83 < 84)
print(hero_char == lower_char)   # False (83 != 115)
print(hero_char.lower() == lower_char.lower())  # True
```

```go
// Go - character comparison
heroChar := 'S'
dealChar := 'T'
lowerChar := 's'

fmt.Println(heroChar < dealChar)  // true (83 < 84)
fmt.Println(heroChar == lowerChar) // false (83 != 115)
fmt.Println(unicode.ToLower(heroChar) == unicode.ToLower(lowerChar))  // true
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
text = "Mass"
characters = list(text)  # ['M', 'a', 's', 's']

# Iterate through characters
for char in text:
    print(char)

# Access individual characters
first_char = text[0]     # 'M'
last_char = text[-1]     # 's'
```

```go
// Go - convert string to characters
text := "Mass"
characters := []rune(text)  // ['M', 'a', 's', 's']

// Iterate through characters
for _, char := range text {
    fmt.Printf("%c\n", char)
}

// Access individual characters
firstChar := rune(text[0])  // 'M'
lastChar := rune(text[len(text)-1])  // 's'
```

### Characters to String

Chars ni string ga join cheyadam, like a hero’s team coming together.

```python
# Python - convert characters to string
chars = ['M', 'a', 's', 's']
text = ''.join(chars)  # "Mass"

# Using chr() and ord()
ascii_chars = [77, 97, 115, 115]
text = ''.join(chr(code) for code in ascii_chars)  # "Mass"
```

```go
// Go - convert characters to string
chars := []rune{'M', 'a', 's', 's'}
text := string(chars)  // "Mass"

// Using rune values
asciiChars := []rune{77, 97, 115, 115}
text = string(asciiChars)  // "Mass"
```

## Character Validation

### Input Validation

```python
# Python - character validation
def validate_hero_char(char):
    return char.isalnum() or char in '_'

def validate_deal_char(char):
    return char.isalnum() or char in '!@#$%^&*'

# Test validation
hero_name = "sivudu123"
is_valid = all(validate_hero_char(c) for c in hero_name)
print(is_valid)  # True
```

### Character Filtering

```python
# Python - filter characters
text = "Mass123!@#"

# Keep only letters
letters_only = ''.join(c for c in text if c.isalpha())
print(letters_only)  # "Mass"

# Keep only digits
digits_only = ''.join(c for c in text if c.isdigit())
print(digits_only)  # "123"

# Remove special characters
clean_text = ''.join(c for c in text if c.isalnum())
print(clean_text)  # "Mass123"
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
raw_string = r'C:\Heroes\Sivudu'  # No escaping
```

```go
// Go - escape sequences
newline := '\n'        // New line
tab := '\t'           // Tab
quote := '\''         // Single quote
doubleQuote := '"'    // Double quote
backslash := '\\'     // Backslash

// Raw strings (using backticks)
rawString := `C:\Heroes\Sivudu`  // No escaping
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
    text = "S" * (i % 10 + 1)
    is_upper = text.isupper()
end = time.time()
print(f"String operations: {end - start:.4f} seconds")
```

## Best Practices

### 1. Use Appropriate Character Types

```python
# Python - use single quotes for characters
hero_char = 'S'  # Good
hero_char = "S"  # Works, but single quote is clearer

# Go - use rune for Unicode characters
heroChar := 'S'  // Good for ASCII
heroChar := 'స'  // Good for Unicode
```

### 2. Handle Unicode Properly

```python
# Python - Unicode handling
import unicodedata

char = 'స'
normalized = unicodedata.normalize('NFD', char)
print(normalized)  # Telugu char decomposition
```

### 3. Validate Character Input

```python
# Python - character validation
# Python - character validation
def is_valid_deal_char(char):
    return char.isalnum() or char in '._-'

def sanitize_deal_name(deal_name):
    return ''.join(c for c in deal_name if is_valid_deal_char(c))
```

## Related Concepts

- [[wiki:strings]] - Working with character sequences
- [[wiki:data-types]] - Understanding character data types
- [[wiki:parsing]] - Parsing character data
- [[wiki:validation]] - Character validation techniques
