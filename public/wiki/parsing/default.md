# Parsing

## What is Parsing?

Parsing is the process of analyzing a string of text or data to understand its structure and extract meaningful information. In programming, parsing is commonly used to convert text input into structured data types like numbers, dates, or complex objects.

## Basic Parsing Operations

### String to Number Parsing

```python
# String to integer
age_str = "25"
age = int(age_str)
print(age)  # 25
print(type(age))  # <class 'int'>

# String to float
price_str = "19.99"
price = float(price_str)
print(price)  # 19.99
print(type(price))  # <class 'float'>
```

```go
// Go - string to number parsing
package main

import (
    "fmt"
    "strconv"
)

func main() {
    // String to integer
    ageStr := "25"
    age, _ := strconv.Atoi(ageStr)
    fmt.Printf("Age: %d, Type: %T\n", age, age)

    // String to float
    priceStr := "19.99"
    price, _ := strconv.ParseFloat(priceStr, 64)
    fmt.Printf("Price: %.2f, Type: %T\n", price, price)
}
```

### Boolean Parsing

```python
# String to boolean
true_str = "true"
false_str = "false"
yes_str = "yes"
no_str = "no"

is_true = true_str.lower() == "true"
is_false = false_str.lower() == "true"
is_yes = yes_str.lower() in ["true", "yes", "1", "on"]
is_no = no_str.lower() in ["false", "no", "0", "off"]

print(is_true)   # True
print(is_false)  # False
print(is_yes)    # True
print(is_no)     # True
```

## Advanced Parsing Techniques

### Parsing with Error Handling

```python
def safe_parse_int(value):
    try:
        return int(value)
    except ValueError:
        return None

def safe_parse_float(value):
    try:
        return float(value)
    except ValueError:
        return None

# Test parsing
print(safe_parse_int("123"))     # 123
print(safe_parse_int("abc"))     # None
print(safe_parse_float("12.34")) # 12.34
print(safe_parse_float("xyz"))   # None
```

### Parsing with Validation

```python
def parse_age(age_str):
    try:
        age = int(age_str)
        if 0 <= age <= 150:
            return age
        else:
            return None
    except ValueError:
        return None

def parse_email(email_str):
    if '@' in email_str and '.' in email_str.split('@')[1]:
        return email_str.lower()
    return None

# Test validation
print(parse_age("25"))      # 25
print(parse_age("200"))     # None
print(parse_age("abc"))     # None
print(parse_email("user@example.com"))  # user@example.com
print(parse_email("invalid-email"))     # None
```

## Parsing Complex Data

### Parsing Space-Separated Values

```python
# Parse space-separated values
line = "John Doe 25 70.5"
parts = line.split()

if len(parts) == 4:
    first_name = parts[0]
    last_name = parts[1]
    age = int(parts[2])
    height = float(parts[3])

    print(f"Name: {first_name} {last_name}")
    print(f"Age: {age}")
    print(f"Height: {height}")
```

### Parsing CSV-like Data

```python
# Parse comma-separated values
csv_line = "Alice,Smith,25,alice@example.com"
fields = csv_line.split(',')

if len(fields) == 4:
    first_name = fields[0].strip()
    last_name = fields[1].strip()
    age = int(fields[2].strip())
    email = fields[3].strip()

    print(f"Name: {first_name} {last_name}")
    print(f"Age: {age}")
    print(f"Email: {email}")
```

### Parsing JSON-like Data

```python
import json

# Parse JSON string
json_str = '{"name": "John", "age": 25, "city": "New York"}'
try:
    data = json.loads(json_str)
    name = data["name"]
    age = data["age"]
    city = data["city"]
    print(f"Name: {name}, Age: {age}, City: {city}")
except json.JSONDecodeError:
    print("Invalid JSON format")
```

## Date and Time Parsing

### Basic Date Parsing

```python
from datetime import datetime

# Parse date string
date_str = "2024-01-15"
try:
    date = datetime.strptime(date_str, "%Y-%m-%d")
    print(f"Parsed date: {date}")
except ValueError:
    print("Invalid date format")

# Parse datetime string
datetime_str = "2024-01-15 14:30:00"
try:
    dt = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
    print(f"Parsed datetime: {dt}")
except ValueError:
    print("Invalid datetime format")
```

### Flexible Date Parsing

```python
from dateutil import parser

# Parse various date formats
date_strings = [
    "2024-01-15",
    "15/01/2024",
    "January 15, 2024",
    "15 Jan 2024",
    "2024-01-15T14:30:00"
]

for date_str in date_strings:
    try:
        date = parser.parse(date_str)
        print(f"'{date_str}' -> {date}")
    except ValueError:
        print(f"Could not parse: {date_str}")
```

## Custom Parsing Functions

### Parsing Configuration Files

```python
def parse_config_line(line):
    """Parse a configuration line in format 'key=value'"""
    line = line.strip()

    # Skip comments and empty lines
    if not line or line.startswith('#'):
        return None

    if '=' in line:
        key, value = line.split('=', 1)
        return key.strip(), value.strip()

    return None

# Test config parsing
config_lines = [
    "name=John Doe",
    "age=25",
    "city=New York",
    "# This is a comment",
    "",
    "invalid line"
]

config = {}
for line in config_lines:
    result = parse_config_line(line)
    if result:
        key, value = result
        config[key] = value

print(config)  # {'name': 'John Doe', 'age': '25', 'city': 'New York'}
```

### Parsing Log Files

```python
import re

def parse_log_line(line):
    """Parse a log line in format '[timestamp] level: message'"""
    pattern = r'\[(.*?)\] (\w+): (.+)'
    match = re.match(pattern, line)

    if match:
        timestamp = match.group(1)
        level = match.group(2)
        message = match.group(3)
        return {
            'timestamp': timestamp,
            'level': level,
            'message': message
        }
    return None

# Test log parsing
log_lines = [
    "[2024-01-15 14:30:00] INFO: User logged in",
    "[2024-01-15 14:31:00] ERROR: Database connection failed",
    "Invalid log line"
]

for line in log_lines:
    result = parse_log_line(line)
    if result:
        print(f"Timestamp: {result['timestamp']}")
        print(f"Level: {result['level']}")
        print(f"Message: {result['message']}")
        print()
```

## Performance Considerations

### Efficient Parsing

```python
# Use list comprehension for bulk parsing
numbers_str = ["1", "2", "3", "4", "5"]
numbers = [int(x) for x in numbers_str if x.isdigit()]

# Use map for simple transformations
numbers = list(map(int, filter(str.isdigit, numbers_str)))
```

### Lazy Parsing

```python
def parse_large_file(filename):
    """Parse large file line by line without loading everything into memory"""
    with open(filename, 'r') as file:
        for line in file:
            # Parse each line individually
            parsed_data = parse_line(line)
            if parsed_data:
                yield parsed_data

# Usage
for data in parse_large_file('large_data.txt'):
    process_data(data)
```

## Best Practices

### 1. Always Handle Errors

```python
def robust_parse_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

def robust_parse_float(value):
    try:
        return float(value)
    except (ValueError, TypeError):
        return None
```

### 2. Validate Input Before Parsing

```python
def parse_user_input(input_str):
    if not input_str or not input_str.strip():
        return None

    input_str = input_str.strip()

    # Validate format before parsing
    if not input_str.replace('.', '').replace('-', '').isdigit():
        return None

    return float(input_str)
```

### 3. Use Appropriate Data Types

```python
# Choose the right type for your data
def parse_numeric_value(value_str):
    if '.' in value_str:
        return float(value_str)
    else:
        return int(value_str)

# Test
print(parse_numeric_value("123"))    # 123 (int)
print(parse_numeric_value("123.45")) # 123.45 (float)
```

## Common Parsing Patterns

### 1. Split and Parse

```python
def parse_person_data(line):
    parts = line.split(',')
    if len(parts) >= 3:
        return {
            'name': parts[0].strip(),
            'age': int(parts[1].strip()),
            'city': parts[2].strip()
        }
    return None
```

### 2. Regular Expression Parsing

```python
import re

def parse_phone_number(phone_str):
    pattern = r'(\d{3})-(\d{3})-(\d{4})'
    match = re.match(pattern, phone_str)

    if match:
        area_code = match.group(1)
        prefix = match.group(2)
        number = match.group(3)
        return f"({area_code}) {prefix}-{number}"

    return None
```

### 3. State Machine Parsing

```python
def parse_simple_expression(expr):
    """Parse simple arithmetic expressions like '2+3'"""
    tokens = []
    current = ""

    for char in expr:
        if char.isdigit():
            current += char
        elif char in '+-*/':
            if current:
                tokens.append(int(current))
                current = ""
            tokens.append(char)

    if current:
        tokens.append(int(current))

    return tokens

# Test
print(parse_simple_expression("2+3*4"))  # [2, '+', 3, '*', 4]
```

## Related Concepts

- [[wiki:stdin]] - Reading input for parsing
- [[wiki:validation]] - Validating parsed data
- [[wiki:error-handling]] - Handling parsing errors
- [[wiki:data-types]] - Converting between data types
