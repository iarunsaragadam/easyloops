# Variable Reassignment

## What is Variable Reassignment?

Variable reassignment is the process of changing the value of an existing variable after it has been initially declared and assigned. This is a fundamental concept in programming that allows variables to hold different values throughout the execution of a program.

## Basic Reassignment

### Simple Reassignment

```python
# Initial assignment
name = "Alice"
print(name)  # Output: Alice

# Reassignment
name = "Bob"
print(name)  # Output: Bob
```

```go
// Go
var name string = "Alice"
fmt.Println(name)  // Output: Alice

// Reassignment
name = "Bob"
fmt.Println(name)  // Output: Bob
```

### Numeric Reassignment

```python
# Initial value
count = 0
print(count)  # Output: 0

# Reassignment
count = 5
print(count)  # Output: 5

# Another reassignment
count = 10
print(count)  # Output: 10
```

## Common Reassignment Patterns

### 1. Incrementing Values

```python
# Increment by 1
counter = 0
counter = counter + 1  # counter is now 1
counter = counter + 1  # counter is now 2

# Shorthand increment
counter += 1  # Same as counter = counter + 1
```

```go
// Go
counter := 0
counter = counter + 1  // counter is now 1
counter++              // Shorthand increment
```

### 2. Accumulating Values

```python
# Accumulate sum
total = 0
total = total + 5      # total is now 5
total = total + 10     # total is now 15
total = total + 3      # total is now 18

# Shorthand accumulation
total += 5  # Same as total = total + 5
```

### 3. Updating Based on Conditions

```python
# Update based on condition
status = "pending"
if user_verified:
    status = "verified"
elif user_rejected:
    status = "rejected"
```

## Type Reassignment

### Changing Data Types

```python
# Start with string
value = "123"
print(type(value))  # <class 'str'>

# Reassign to integer
value = 123
print(type(value))  # <class 'int'>

# Reassign to float
value = 123.45
print(type(value))  # <class 'float'>

# Reassign to boolean
value = True
print(type(value))  # <class 'bool'>
```

### Type-Safe Languages

```go
// Go - type cannot be changed after declaration
var value string = "123"
// value = 123  // This would cause a compile error

// Need to declare a new variable or use interface{}
var value2 interface{} = "123"
value2 = 123  // This works with interface{}
```

## Reassignment in Different Contexts

### 1. Loop Variables

```python
# Loop variable reassignment
for i in range(5):
    print(f"Current value: {i}")
    # i gets reassigned in each iteration: 0, 1, 2, 3, 4
```

### 2. Function Parameters

```python
def process_data(data):
    # Reassign parameter (creates local copy)
    data = data.upper()
    return data

original = "hello"
result = process_data(original)
print(original)  # Still "hello" (unchanged)
print(result)    # "HELLO"
```

### 3. Object Properties

```python
class User:
    def __init__(self, name):
        self.name = name

user = User("Alice")
print(user.name)  # Alice

# Reassign object property
user.name = "Bob"
print(user.name)  # Bob
```

## Reassignment vs Mutation

### Reassignment (New Object)

```python
# Reassignment creates a new object
list1 = [1, 2, 3]
list2 = list1  # Both reference the same list

list1 = [4, 5, 6]  # Reassignment - list1 now references a new list
print(list1)  # [4, 5, 6]
print(list2)  # [1, 2, 3] - unchanged
```

### Mutation (Same Object)

```python
# Mutation changes the existing object
list1 = [1, 2, 3]
list2 = list1  # Both reference the same list

list1.append(4)  # Mutation - changes the existing list
print(list1)  # [1, 2, 3, 4]
print(list2)  # [1, 2, 3, 4] - also changed
```

## Best Practices

### 1. Use Descriptive Names

```python
# Good
user_count = 0
user_count = user_count + 1

# Avoid
c = 0
c = c + 1
```

### 2. Consider Immutability

```python
# For values that shouldn't change, use constants
PI = 3.14159
MAX_RETRIES = 3

# Don't reassign constants
# PI = 3.14  # This would be confusing
```

### 3. Be Aware of Scope

```python
global_var = 10

def function():
    # This creates a new local variable, doesn't reassign global
    global_var = 20
    print(global_var)  # 20

function()
print(global_var)  # Still 10

def function2():
    global global_var  # Declare intent to modify global
    global_var = 20    # Actually reassigns global
    print(global_var)  # 20

function2()
print(global_var)  # Now 20
```

## Common Mistakes

### 1. Unintended Reassignment

```python
# Be careful with variable names
list = [1, 2, 3]  # Don't use built-in names
list = [4, 5, 6]  # This reassigns the built-in 'list' function!

# Use descriptive names instead
my_list = [1, 2, 3]
my_list = [4, 5, 6]
```

### 2. Forgetting to Reassign

```python
# Common mistake in loops
total = 0
for number in [1, 2, 3, 4, 5]:
    total + number  # Forgot to reassign!
    # Should be: total = total + number

print(total)  # Still 0
```

### 3. Reassignment in Wrong Scope

```python
def calculate_total(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total

# Don't reassign parameters unless necessary
def bad_function(total):
    total = 0  # This reassigns the parameter, not a global
    return total
```

## Performance Considerations

### Memory Usage

```python
# Each reassignment may create new objects
large_string = "x" * 1000000
large_string = "y" * 1000000  # Creates new string object

# For mutable objects, mutation is more efficient
large_list = [1] * 1000000
large_list[0] = 2  # Modifies existing list
```

### Garbage Collection

```python
# Old objects become eligible for garbage collection
old_value = "very large string" * 1000
old_value = "new value"  # Old string can be garbage collected
```

## Related Concepts

- [[wiki:variable]] - Variable declaration and initialization
- [[wiki:variable-declarations]] - How to declare variables
- [[wiki:scope]] - Variable scope and visibility
- [[wiki:memory-management]] - Memory allocation and cleanup
