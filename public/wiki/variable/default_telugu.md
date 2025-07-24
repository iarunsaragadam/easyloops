# Variables in Programming

## What is a Variable?

Variable ante computer memory lo oka named storage place. Idi data (like numbers, text) store cheyadaniki use avuthundi.Inka idi oka labeled box laga work chesthundi. Program lo different types of information (like age, name) store cheyadaniki use chestham.

## Key Concepts

### 1. Declaration

Variable declare cheyadam ante computer ki cheppadam, "Nenu ee name tho storage space create cheyali." This reserves memory for the variable.

'''python

# Python

age = 25
name = "Alice"
is_student = True
'''

'''go
// Go
var age int = 25
var name string = "Alice"
var isStudent bool = true
'''

### 2. Initialization

Initialization ante variable ki first time value assign cheyadam.

'''python

# Declaration and initialization in one step

count = 0
message = "Hello, World!"
'''

### 3. Assignment

Assignment ante already unna variable value change cheyadam.

'''python
count = 0 # Initial assignment
count = 5 # Reassignment
count = count + 1 # Increment by 1
'''

## Variable Naming Rules

### Best Practices

-Variable names clear and meaningful undali
-camelCase (firstName) or snake_case (first_name) -use cheyali for consistency
Name letter or underscore tho start avvali, numbers tho kadu.
-Reserved keywords (like if, for) use cheyakoodadu.

### Examples

'''python

# Good names

user_age = 25
firstName = "John"
total_score = 100
is_logged_in = True

# Avoid these

a = 25 # Too vague
userage = 25 # Hard to read
UserAge = 25 # Inconsistent casing

````

## Data Types

Variables different types of data (like numbers, text, true/false) store cheyagalthai.

### Numeric Types

```python
# Integers (whole numbers)
age = 25
year = 2024

# Floating-point (decimal numbers)
height = 5.9
pi = 3.14159
````

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

Function lopal declare chesina variables local variables antaru. Ivi kevalam aa function lopal matrame work chesthai, bayata access cheyalemu.

```python
def calculate_area(radius):
    pi = 3.14159  # Local variable
    area = pi * radius * radius
    return area

# pi and area are not accessible outside the function
```

### Global Variables

Functions bayata declare chesina variables global variables antaru. Ivi program antha access cheyavachu.

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

```go
// Go
var name string
fmt.Scanln(&name)

var age int
fmt.Scanln(&age)
```

### 2. Displaying Output

```python
# Python
print("Hello, " + name)
print(f"Age: {age}")
```

```go
// Go
fmt.Println("Hello, " + name)
fmt.Printf("Age: %d\n", age)
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

Modern languages lo memory management automatic ga jaruguthundi, programmer manual ga handle cheyalsina avasaram ledu.

-Variable create chesinappudu memory allocate avuthundi.
-Variable scope nundi out ayithe (like function end ayithe), memory free avuthundi.
-Programmer memory manage cheyalsina need ledu, language handle chesthundi.

### Variable Lifecycle

1. **Declaration**: Variable create chesthe memory reserve avuthundi.
2. **Initialization**: Variable ki first value assign chestham.
3. **Usage**: Variable ni calculations or operations lo use chestham.
4. **Reassignment**: Variable value change chestham if needed.
5. **Destruction**: Variable scope nundi out ayithe memory free avuthundi.

## Best Practices

### 1. Initialize Variables

Variables ki starting value assign cheyali, lekapothe undefined behavior (errors) ravochu.

```python
# Good
count = 0
name = ""
is_valid = False

# Avoid
count  # Undefined!
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

# Correct
age = 25
print(age)
```

### 2. Confusing Assignment and Comparison

```python
# Wrong (assignment)
if age = 25:  # This assigns 25 to age, doesn't compare

# Correct (comparison)
if age == 25:  # This compares age with 25
```

### 3. Case Sensitivity

```python
# These are different variables
name = "Alice"
Name = "Bob"
NAME = "Charlie"
```

## Practice Examples

### Example 1: Basic Variable Usage

```python
# Declare and initialize variables
name = "Alice"
age = 25
height = 5.6
is_student = True

# Display information
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")
```

### Example 2: Variable Reassignment

```python
# Initial values
score = 0
level = 1

# Game progress
score = score + 100  # Add points
level = level + 1    # Level up

print(f"Score: {score}")
print(f"Level: {level}")
```

### Example 3: Type Conversion

```python
# Reading string input
age_string = input("Enter your age: ")
age_number = int(age_string)

# Calculations
birth_year = 2024 - age_number
print(f"You were born around {birth_year}")
```

## Summary

Variables ante programming lo most important building blocks. Ivi program lo different tasks perform cheyadaniki help chesthundi. Inka detailed ga, variables ela work chesthayo next points explain chesthundi.

-Variables data store cheyadaniki and retrieve cheyadaniki use avuthundi.
-Calculations (like addition, subtraction) perform cheyadaniki help chesthundi.
-Values based decisions (like if conditions) create cheyadaniki use avuthundi.
-Dynamic and interactive programs create cheyadaniki foundation la work chesthundi.

Variables ni artham chesukunte programming journey easy avuthundi. Functions, objects, data structures lanti complex concepts ki idi foundation.

## Related Topics

- [[wiki:data-types]] - Learn about different data types
- [[wiki:variable-declarations]] - Advanced variable declaration techniques
- [[wiki:functions]] - How variables work with functions
- [[question:01-variable-declaration]] - Practice variable declaration
