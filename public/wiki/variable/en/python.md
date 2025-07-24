# Variables in Python

## What is a Variable?

A variable is a named storage location in computer memory that can hold data. Think of it as a labeled box where you can store different types of information that your program needs to work with.

## Key Concepts

### 1. Declaration

Declaring a variable means telling the computer "I want to create a storage space with this name."

```python
# Python
age = 25
name = "Alice"
is_student = True
```

### 2. Initialization

Initialization is the process of giving a variable its first value.

```python
# Declaration and initialization in one step
count = 0
message = "Hello, World!"
```

### 3. Assignment

Assignment is changing the value of an existing variable.

```python
count = 0      # Initial assignment
count = 5      # Reassignment
count = count + 1  # Increment by 1
```

## Variable Naming Rules

### Best Practices

- Use descriptive names that explain what the variable represents
- Use snake_case (first_name) or camelCase (firstName) consistently
- Start with a letter or underscore
- Avoid reserved keywords

### Examples

```python
# Good names
user_age = 25
firstName = "John"
total_score = 100
is_logged_in = True

# Avoid these
a = 25          # Too vague
userage = 25    # Hard to read
UserAge = 25    # Inconsistent casing
```

## Data Types

Variables can hold different types of data:

### Numeric Types

```python
# Integers (whole numbers)
age = 25
year = 2024

# Floating-point (decimal numbers)
height = 5.9
pi = 3.14159
```

### Text Types

```python
# Strings (text)
name = "Alice"
message = 'Hello, World!'
```

### Boolean Types

```python
# True/False values
is_student = True
has_permission = False
```

## Scope

### Local Variables

Variables declared inside a function are local to that function.

```python
def calculate_area(radius):
    pi = 3.14159  # Local variable
    area = pi * radius * radius
    return area

# pi and area are not accessible outside the function
```

### Global Variables

Variables declared outside functions are global and accessible throughout the program.

```python
PI = 3.14159  # Global constant

def calculate_area(radius):
    area = PI * radius * radius  # Uses global PI
    return area
```

## Common Operations

### 1. Reading Input

```python
# Python
name = input("Enter your name: ")
age = int(input("Enter your age: "))
```

### 2. Displaying Output

```python
# Python
print("Hello, " + name)
print(f"Age: {age}")
```

### 3. Type Conversion

```python
# Python
age_string = "25"
age_number = int(age_string)  # Convert string to integer

price = 19.99
price_string = str(price)     # Convert float to string
```

## Memory Management

### Automatic Memory Management

Most modern programming languages automatically manage memory for variables:

- Memory is allocated when a variable is created
- Memory is freed when a variable goes out of scope
- No manual memory management required

### Variable Lifecycle

1. **Declaration**: Memory is reserved
2. **Initialization**: First value is assigned
3. **Usage**: Variable is used in calculations and operations
4. **Reassignment**: Value is changed as needed
5. **Destruction**: Memory is freed when variable goes out of scope

## Best Practices

### 1. Initialize Variables

Always give variables an initial value to avoid undefined behavior.

```python
# Good
count = 0
name = ""
is_valid = False

# Avoid
# count  # Undefined!
```

### 2. Use Constants for Fixed Values

```python
# Good
PI = 3.14159
MAX_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

# Avoid
area = 3.14159 * radius * radius  # Magic number
```

### 3. Choose Appropriate Data Types

```python
# Good
age = 25          # Integer for whole numbers
price = 19.99     # Float for decimal numbers
name = "Alice"    # String for text
is_active = True  # Boolean for true/false
```

### 4. Use Descriptive Names

```python
# Good
user_age = 25
total_score = 100
is_logged_in = True

# Avoid
a = 25
ts = 100
ill = True
```

## Common Mistakes to Avoid

### 1. Using Uninitialized Variables

```python
# Wrong
print(age)  # Error: age is not defined
```
