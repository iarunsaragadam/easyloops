# Functions in Python

Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce duplication, and make programs more modular and maintainable.

## What are Functions?

A function is a named block of code that can take inputs (parameters), perform operations, and optionally return a value. Functions allow you to break down complex problems into smaller, manageable pieces.

## Function Definition

### Basic Function Syntax

```python
def function_name(parameters):
    """Docstring - describes what the function does"""
    # Function body
    return value  # Optional
```

### Simple Function Example

```python
def greet(name):
    """Returns a greeting message"""
    return f"Hello, {name}!"

# Using the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!
```

## Function Parameters

### Required Parameters

```python
def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)  # result = 8
```

### Default Parameters

```python
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

# Using default parameter
print(greet_with_title("Smith"))  # Output: Hello, Mr. Smith!

# Overriding default parameter
print(greet_with_title("Johnson", "Dr."))  # Output: Hello, Dr. Johnson!
```

### Keyword Arguments

```python
def create_profile(name, age, city, occupation):
    return f"{name}, {age}, from {city}, works as {occupation}"

# Using keyword arguments (order doesn't matter)
profile = create_profile(
    name="Alice",
    age=25,
    city="New York",
    occupation="Engineer"
)
```

### Variable Number of Arguments

```python
# *args for variable positional arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))  # Output: 15

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

## Return Values

### Single Return Value

```python
def square(number):
    return number ** 2

result = square(4)  # result = 16
```

### Multiple Return Values

```python
def get_name_and_age():
    return "Alice", 25

name, age = get_name_and_age()
print(f"{name} is {age} years old")  # Output: Alice is 25 years old
```

### No Return Value (None)

```python
def print_greeting(name):
    print(f"Hello, {name}!")
    # No return statement, returns None

result = print_greeting("Bob")  # result = None
```

## Function Types

### Built-in Functions

```python
# Python provides many built-in functions
print("Hello")           # print()
len("Python")           # len()
type(42)                # type()
input("Enter name: ")   # input()
```

### User-Defined Functions

```python
def calculate_area(length, width):
    """Calculate the area of a rectangle"""
    area = length * width
    return area

# Using the function
rectangle_area = calculate_area(10, 5)
print(f"Area: {rectangle_area}")  # Output: Area: 50
```

### Lambda Functions (Anonymous Functions)

```python
# Lambda function for simple operations
square = lambda x: x ** 2
print(square(5))  # Output: 25

# Lambda with multiple parameters
add = lambda x, y: x + y
print(add(3, 4))  # Output: 7

# Lambda in higher-order functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # Output: [1, 4, 9, 16, 25]
```

## Function Scope

### Local Variables

```python
def my_function():
    local_var = "I'm local"
    print(local_var)

my_function()  # Output: I'm local
# print(local_var)  # Error: NameError
```

### Global Variables

```python
global_var = "I'm global"

def access_global():
    print(global_var)  # Can access global variable

def modify_global():
    global global_var  # Need to declare global to modify
    global_var = "Modified global"

access_global()  # Output: I'm global
modify_global()
access_global()  # Output: Modified global
```

## Function Best Practices

### 1. Use Descriptive Names

```python
# Good
def calculate_monthly_payment(principal, rate, years):
    pass

# Bad
def calc(pr, rt, yr):
    pass
```

### 2. Write Docstrings

```python
def divide_numbers(a, b):
    """
    Divide two numbers.

    Args:
        a (float): The dividend
        b (float): The divisor

    Returns:
        float: The result of division

    Raises:
        ZeroDivisionError: If b is zero
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b
```

### 3. Keep Functions Small and Focused

```python
# Good - single responsibility
def validate_email(email):
    return '@' in email and '.' in email

def send_email(email, message):
    if validate_email(email):
        # Send email logic
        pass

# Bad - multiple responsibilities
def process_user_data(user_data):
    # Validates, processes, saves, and sends email
    pass
```

### 4. Use Type Hints (Python 3.5+)

```python
def greet(name: str, age: int) -> str:
    return f"Hello {name}, you are {age} years old"

def calculate_area(length: float, width: float) -> float:
    return length * width
```

## Advanced Function Concepts

### Nested Functions

```python
def outer_function(x):
    def inner_function(y):
        return x + y  # Can access x from outer function
    return inner_function

# Create a function that adds 5 to any number
add_five = outer_function(5)
result = add_five(3)  # result = 8
```

### Decorators

```python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done"

slow_function()  # Output: slow_function took 1.0000 seconds
```

### Recursive Functions

```python
def factorial(n):
    """Calculate factorial using recursion"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

Functions are fundamental to Python programming and enable you to write clean, reusable, and maintainable code. Understanding how to create and use functions effectively is essential for becoming a proficient Python programmer.
