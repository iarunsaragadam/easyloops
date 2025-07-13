# Functions in Programming

## What are Functions?

Functions are reusable blocks of code that perform specific tasks. They help organize code, avoid repetition, and make programs more modular and maintainable. Think of functions as mini-programs within your main program.

## Basic Function Structure

### Function Declaration

```python
# Python
def function_name(parameters):
    # Function body
    # Code that performs the task
    return result
```

```go
// Go
func functionName(parameters) returnType {
    // Function body
    // Code that performs the task
    return result
}
```

### Simple Example

```python
# Python
def greet(name):
    return f"Hello, {name}!"

# Using the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!
```

```go
// Go
func greet(name string) string {
    return "Hello, " + name + "!"
}

// Using the function
message := greet("Alice")
fmt.Println(message)  # Output: Hello, Alice!
```

## Function Components

### 1. Function Name

- Should be descriptive and follow naming conventions
- Use camelCase or snake_case consistently
- Avoid reserved keywords

```python
# Good names
def calculate_area(radius):
    pass

def get_user_info():
    pass

def is_valid_email(email):
    pass

# Avoid these
def func1():  # Too vague
    pass

def CalculateArea():  # Inconsistent casing
    pass
```

### 2. Parameters (Arguments)

Values passed to the function for processing.

```python
# No parameters
def say_hello():
    print("Hello!")

# One parameter
def greet(name):
    print(f"Hello, {name}!")

# Multiple parameters
def add_numbers(a, b):
    return a + b

# Using the functions
say_hello()           # Output: Hello!
greet("Alice")        # Output: Hello, Alice!
result = add_numbers(5, 3)  # result = 8
```

### 3. Return Value

The result that the function sends back to the caller.

```python
# Function with return value
def square(number):
    return number * number

# Function without return value (returns None in Python)
def print_square(number):
    print(f"The square of {number} is {number * number}")

# Using return values
result = square(5)  # result = 25
print_square(5)     # Output: The square of 5 is 25
```

## Types of Functions

### 1. Built-in Functions

Functions that come with the programming language.

```python
# Python built-in functions
print("Hello")           # Output function
len("Hello")             # Length function
max([1, 2, 3, 4, 5])    # Maximum value
min([1, 2, 3, 4, 5])    # Minimum value
sum([1, 2, 3, 4, 5])    # Sum function
```

```go
// Go built-in functions
fmt.Println("Hello")     // Output function
len("Hello")             // Length function
```

### 2. User-Defined Functions

Functions created by the programmer.

```python
def calculate_circle_area(radius):
    pi = 3.14159
    area = pi * radius * radius
    return area

# Using the function
area = calculate_circle_area(5)
print(f"Area: {area}")  # Output: Area: 78.53975
```

### 3. Lambda Functions (Anonymous Functions)

Short, one-line functions.

```python
# Python lambda function
square = lambda x: x * x
result = square(5)  # result = 25

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x * x, numbers))
# squared = [1, 4, 9, 16, 25]
```

## Function Parameters

### 1. Required Parameters

Parameters that must be provided when calling the function.

```python
def greet(name, age):
    return f"Hello, {name}! You are {age} years old."

# Must provide both parameters
message = greet("Alice", 25)
```

### 2. Default Parameters

Parameters with default values.

```python
def greet(name, age=25):
    return f"Hello, {name}! You are {age} years old."

# Can omit age (uses default)
message1 = greet("Alice")        # Uses default age=25
message2 = greet("Bob", 30)      # Overrides default
```

### 3. Keyword Arguments

Arguments specified by parameter name.

```python
def create_profile(name, age, city, occupation):
    return f"{name}, {age}, from {city}, works as {occupation}"

# Using keyword arguments (order doesn't matter)
profile1 = create_profile(name="Alice", age=25, city="NYC", occupation="Engineer")
profile2 = create_profile(occupation="Teacher", name="Bob", city="LA", age=30)
```

### 4. Variable Arguments

Functions that can accept any number of arguments.

```python
# *args for variable positional arguments
def sum_all(*numbers):
    return sum(numbers)

result1 = sum_all(1, 2, 3)           # result = 6
result2 = sum_all(1, 2, 3, 4, 5)     # result = 15

# **kwargs for variable keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")
# Output:
# name: Alice
# age: 25
# city: NYC
```

## Function Scope

### Local Variables

Variables defined inside a function are local to that function.

```python
def calculate_area(radius):
    pi = 3.14159  # Local variable
    area = pi * radius * radius  # Local variable
    return area

# pi and area are not accessible outside the function
# print(pi)  # This would cause an error
```

### Global Variables

Variables defined outside functions can be accessed inside functions.

```python
PI = 3.14159  # Global variable

def calculate_area(radius):
    area = PI * radius * radius  # Uses global PI
    return area

def calculate_circumference(radius):
    circumference = 2 * PI * radius  # Uses global PI
    return circumference
```

### Modifying Global Variables

```python
counter = 0  # Global variable

def increment_counter():
    global counter  # Declare that we want to modify global variable
    counter += 1

def get_counter():
    return counter

increment_counter()  # counter = 1
increment_counter()  # counter = 2
print(get_counter())  # Output: 2
```

## Return Values

### Single Return Value

```python
def add(a, b):
    return a + b

result = add(5, 3)  # result = 8
```

### Multiple Return Values

```python
def get_name_and_age():
    return "Alice", 25

name, age = get_name_and_age()
print(f"Name: {name}, Age: {age}")  # Output: Name: Alice, Age: 25
```

### Conditional Returns

```python
def absolute_value(number):
    if number >= 0:
        return number
    else:
        return -number

print(absolute_value(5))   # Output: 5
print(absolute_value(-5))  # Output: 5
```

### Early Returns

```python
def validate_age(age):
    if age < 0:
        return False, "Age cannot be negative"
    if age > 150:
        return False, "Age seems unrealistic"
    return True, "Age is valid"

is_valid, message = validate_age(25)   # (True, "Age is valid")
is_valid, message = validate_age(-5)   # (False, "Age cannot be negative")
```

## Function Design Principles

### 1. Single Responsibility

Each function should do one thing well.

```python
# Good: Single responsibility
def calculate_area(radius):
    return 3.14159 * radius * radius

def calculate_circumference(radius):
    return 2 * 3.14159 * radius

# Avoid: Multiple responsibilities
def calculate_circle_properties(radius):
    area = 3.14159 * radius * radius
    circumference = 2 * 3.14159 * radius
    return area, circumference
```

### 2. Descriptive Names

Function names should clearly describe what they do.

```python
# Good names
def calculate_tax(income):
    pass

def validate_email(email):
    pass

def get_user_by_id(user_id):
    pass

# Avoid vague names
def process(data):
    pass

def do_something():
    pass
```

### 3. Appropriate Parameters

Functions should have the right number and types of parameters.

```python
# Good: Clear parameters
def calculate_rectangle_area(length, width):
    return length * width

# Avoid: Too many parameters
def create_user(name, email, age, city, country, phone, address, occupation):
    pass
```

### 4. Error Handling

Functions should handle errors gracefully.

```python
def divide_numbers(a, b):
    if b == 0:
        return None, "Division by zero is not allowed"
    return a / b, None

result, error = divide_numbers(10, 2)   # (5.0, None)
result, error = divide_numbers(10, 0)   # (None, "Division by zero is not allowed")
```

## Common Function Patterns

### 1. Validation Functions

```python
def is_valid_email(email):
    return '@' in email and '.' in email

def is_valid_age(age):
    return isinstance(age, int) and 0 <= age <= 150
```

### 2. Utility Functions

```python
def format_currency(amount):
    return f"${amount:.2f}"

def capitalize_words(text):
    return ' '.join(word.capitalize() for word in text.split())
```

### 3. Factory Functions

```python
def create_greeting(greeting_type):
    if greeting_type == "formal":
        return lambda name: f"Good day, {name}."
    elif greeting_type == "casual":
        return lambda name: f"Hey, {name}!"
    else:
        return lambda name: f"Hello, {name}!"

formal_greet = create_greeting("formal")
casual_greet = create_greeting("casual")

print(formal_greet("Alice"))  # Output: Good day, Alice.
print(casual_greet("Bob"))    # Output: Hey, Bob!
```

## Best Practices

### 1. Keep Functions Small

```python
# Good: Small, focused function
def validate_username(username):
    if len(username) < 3:
        return False, "Username too short"
    if len(username) > 20:
        return False, "Username too long"
    if not username.isalnum():
        return False, "Username must be alphanumeric"
    return True, "Username is valid"

# Avoid: Large, complex function
def process_user_data(user_data):
    # 50+ lines of code doing multiple things
    pass
```

### 2. Use Type Hints (Python)

```python
def calculate_area(radius: float) -> float:
    return 3.14159 * radius * radius

def greet(name: str, age: int = 25) -> str:
    return f"Hello, {name}! You are {age} years old."
```

### 3. Document Your Functions

```python
def calculate_compound_interest(principal, rate, time, compounds_per_year=1):
    """
    Calculate compound interest.

    Args:
        principal (float): Initial amount
        rate (float): Annual interest rate (as decimal)
        time (float): Time in years
        compounds_per_year (int): Number of times interest is compounded per year

    Returns:
        float: Final amount after compound interest
    """
    amount = principal * (1 + rate / compounds_per_year) ** (compounds_per_year * time)
    return amount
```

### 4. Test Your Functions

```python
def add_numbers(a, b):
    return a + b

# Test cases
assert add_numbers(2, 3) == 5
assert add_numbers(-1, 1) == 0
assert add_numbers(0, 0) == 0
print("All tests passed!")
```

## Common Mistakes

### 1. Modifying Mutable Parameters

```python
# Wrong: Modifying the input list
def add_item_to_list(items, new_item):
    items.append(new_item)  # Modifies the original list

# Correct: Return a new list
def add_item_to_list(items, new_item):
    return items + [new_item]
```

### 2. Not Handling Edge Cases

```python
# Wrong: No error handling
def divide(a, b):
    return a / b  # Will crash if b is 0

# Correct: Handle edge cases
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

### 3. Returning Different Types

```python
# Wrong: Inconsistent return types
def process_data(data):
    if data is None:
        return None
    if len(data) == 0:
        return []
    return "processed"

# Correct: Consistent return types
def process_data(data):
    if data is None or len(data) == 0:
        return []
    return ["processed"]
```

## Summary

Functions are essential building blocks in programming that:

- Organize code into reusable modules
- Reduce code duplication
- Improve readability and maintainability
- Enable complex program structures

Understanding functions is crucial for writing clean, efficient, and maintainable code.

## Related Topics

- [[wiki:variable]] - How variables work with functions
- [[wiki:variable-declarations]] - Variable scope in functions
- [[wiki:recursion]] - Functions that call themselves
- [[question:24-function-definition-and-calling]] - Practice with functions
