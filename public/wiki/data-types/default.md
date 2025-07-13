# Data Types in Programming

## What are Data Types?

Data types define the kind of data that can be stored in variables and how that data can be manipulated. They are fundamental to programming as they determine what operations can be performed on the data and how much memory is allocated.

## Primitive Data Types

### 1. Integer (int)

Whole numbers without decimal points.

```python
# Python
age = 25
year = 2024
temperature = -5
```

```go
// Go
var age int = 25
var year int = 2024
var temperature int = -5
```

**Common Operations:**

- Addition, subtraction, multiplication, division
- Modulo (remainder)
- Comparison operations

### 2. Floating-Point (float/double)

Numbers with decimal points.

```python
# Python
height = 5.9
pi = 3.14159
price = 19.99
```

```go
// Go
var height float64 = 5.9
var pi float64 = 3.14159
var price float64 = 19.99
```

**Common Operations:**

- All arithmetic operations
- Rounding functions
- Scientific notation

### 3. String

Text data, sequences of characters.

```python
# Python
name = "Alice"
message = 'Hello, World!'
address = """123 Main Street
City, State 12345"""
```

```go
// Go
var name string = "Alice"
var message string = "Hello, World!"
```

**Common Operations:**

- Concatenation
- Length calculation
- Substring extraction
- Case conversion

### 4. Boolean

True or false values.

```python
# Python
is_student = True
has_permission = False
is_valid = True
```

```go
// Go
var isStudent bool = true
var hasPermission bool = false
var isValid bool = true
```

**Common Operations:**

- Logical operations (AND, OR, NOT)
- Comparison operations
- Conditional statements

### 5. Character (char)

Single character (in some languages).

```go
// Go
var grade rune = 'A'
var symbol rune = '$'
```

```python
# Python doesn't have a separate char type
# Characters are strings of length 1
grade = 'A'
symbol = '$'
```

## Composite Data Types

### 1. Arrays/Lists

Ordered collections of elements.

```python
# Python Lists
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hello", True, 3.14]
```

```go
// Go Arrays
var numbers [5]int = [5]int{1, 2, 3, 4, 5}
var names [3]string = [3]string{"Alice", "Bob", "Charlie"}
```

**Common Operations:**

- Accessing elements by index
- Adding/removing elements
- Iterating through elements
- Finding length

### 2. Dictionaries/Maps

Key-value pairs.

```python
# Python Dictionaries
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
```

```go
// Go Maps
person := map[string]interface{}{
    "name": "Alice",
    "age":  25,
    "city": "New York",
}
```

**Common Operations:**

- Adding/updating key-value pairs
- Retrieving values by key
- Checking if key exists
- Iterating through pairs

### 3. Sets

Collections of unique elements.

```python
# Python Sets
unique_numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "orange"}
```

```go
// Go doesn't have built-in sets
// Use map with bool values as workaround
uniqueNumbers := map[int]bool{1: true, 2: true, 3: true}
```

## Type Conversion

### Implicit Conversion (Type Coercion)

Automatic conversion between compatible types.

```python
# Python
result = 5 + 3.14  # int + float = float
text = "Age: " + str(25)  # string + string
```

```go
// Go
// Go doesn't have implicit conversion
// Must explicitly convert types
var x int = 5
var y float64 = float64(x)
```

### Explicit Conversion (Type Casting)

Manual conversion between types.

```python
# Python
age_string = "25"
age_number = int(age_string)  # String to integer

price = 19.99
price_string = str(price)     # Float to string

is_valid = bool(1)            # Integer to boolean
```

```go
// Go
ageString := "25"
ageNumber, _ := strconv.Atoi(ageString)  // String to integer

price := 19.99
priceString := fmt.Sprintf("%.2f", price)  // Float to string

isValid := true
isValidInt := 0
if isValid {
    isValidInt = 1
}
```

## Type Checking

### Python Type Checking

```python
# Using isinstance()
age = 25
if isinstance(age, int):
    print("age is an integer")

# Using type()
data_type = type(age)
print(f"Type of age: {data_type}")
```

### Go Type Checking

```go
// Using type assertions
var value interface{} = "hello"
if str, ok := value.(string); ok {
    fmt.Printf("Value is string: %s\n", str)
}

// Using reflect package
import "reflect"
value := "hello"
valueType := reflect.TypeOf(value)
fmt.Printf("Type of value: %v\n", valueType)
```

## Memory Considerations

### Python

- Dynamic typing
- Automatic memory management
- Objects have overhead
- Lists and dictionaries are flexible but use more memory

### Go

- Static typing
- Efficient memory usage
- Fixed-size arrays use less memory than slices
- Structs are memory-efficient

## Best Practices

### 1. Choose Appropriate Types

```python
# Good
age = 25          # Integer for whole numbers
price = 19.99     # Float for decimal numbers
name = "Alice"    # String for text
is_active = True  # Boolean for true/false

# Avoid
age = "25"        # String when integer is better
price = 20        # Integer when float is needed
```

### 2. Be Consistent with Types

```python
# Good
temperatures = [20.5, 22.1, 18.9]  # All floats
names = ["Alice", "Bob", "Charlie"]  # All strings

# Avoid
mixed_data = [20, "Alice", True]  # Mixed types in same collection
```

### 3. Handle Type Conversions Safely

```python
# Good
try:
    age = int(input("Enter age: "))
except ValueError:
    print("Please enter a valid number")

# Avoid
age = int(input("Enter age: "))  # Will crash on invalid input
```

## Common Mistakes

### 1. Assuming Type Compatibility

```python
# Wrong
result = "5" + 3  # TypeError in Python

# Correct
result = "5" + str(3)  # "53"
result = int("5") + 3  # 8
```

### 2. Ignoring Type Limits

```python
# Python handles large numbers automatically
large_number = 2 ** 1000  # Works fine

# Go has limits
// var largeNumber int64 = 1 << 63  // Will overflow
```

### 3. Confusing Similar Types

```python
# Python
empty_list = []      # List
empty_tuple = ()     # Tuple
empty_dict = {}      # Dictionary
empty_set = set()    # Set

# Go
var emptySlice []int        // Slice
var emptyArray [0]int       // Array
var emptyMap map[string]int // Map
```

## Summary

Data types are fundamental to programming and understanding them is crucial for:

- Writing correct and efficient code
- Choosing appropriate data structures
- Avoiding type-related errors
- Optimizing memory usage

Each programming language has its own type system, but the core concepts remain similar across languages.

## Related Topics

- [[wiki:variable]] - How variables use data types
- [[wiki:variable-declarations]] - Declaring variables with specific types
- [[wiki:functions]] - How data types work with functions
- [[question:02-data-types]] - Practice with data types
