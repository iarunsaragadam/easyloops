# Type Inference

## What is Type Inference?

Type inference is a feature in programming languages where the compiler or interpreter automatically determines the data type of a variable, expression, or function based on the context and the values being used. This allows developers to write code without explicitly declaring types in many cases.

## Basic Type Inference

### Variable Type Inference

```python
# Python - dynamic typing with type inference
name = "John"        # Inferred as str
age = 25            # Inferred as int
height = 5.9        # Inferred as float
is_student = True   # Inferred as bool
scores = [85, 90, 78]  # Inferred as list[int]
```

```go
// Go - type inference with := operator
name := "John"        // Inferred as string
age := 25             // Inferred as int
height := 5.9         // Inferred as float64
isStudent := true     // Inferred as bool
scores := []int{85, 90, 78}  // Inferred as []int
```

```javascript
// JavaScript - dynamic typing with type inference
let name = 'John'; // Inferred as string
let age = 25; // Inferred as number
let height = 5.9; // Inferred as number
let isStudent = true; // Inferred as boolean
let scores = [85, 90, 78]; // Inferred as array
```

### Expression Type Inference

```python
# Python - expression type inference
result = 5 + 3.14        # Inferred as float (int + float = float)
message = "Hello" + " " + "World"  # Inferred as str
is_valid = age >= 18     # Inferred as bool
```

```go
// Go - expression type inference
result := 5 + 3.14       // Inferred as float64
message := "Hello" + " " + "World"  // Inferred as string
isValid := age >= 18     // Inferred as bool
```

## Function Return Type Inference

### Python Function Inference

```python
def add_numbers(a, b):
    return a + b  # Return type inferred from parameters

def get_user_info():
    return {
        "name": "John",
        "age": 25,
        "is_active": True
    }  # Return type inferred as dict

def is_adult(age):
    return age >= 18  # Return type inferred as bool

# Type hints can be added for clarity
def add_numbers(a: int, b: int) -> int:
    return a + b
```

### Go Function Inference

```go
// Go - function return type inference
func addNumbers(a, b int) int {
    return a + b  // Return type must be explicit in Go
}

func getUserInfo() map[string]interface{} {
    return map[string]interface{}{
        "name": "John",
        "age": 25,
        "isActive": true,
    }
}

func isAdult(age int) bool {
    return age >= 18
}
```

## Generic Type Inference

### Python Generics

```python
from typing import List, Dict, TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self):
        self.items: List[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()

# Type inference with generics
int_stack = Stack[int]()  # Explicit type
int_stack.push(1)
int_stack.push(2)
value = int_stack.pop()  # Inferred as int

# Python 3.9+ allows more inference
def first_item(items: list[T]) -> T:
    return items[0] if items else None
```

### Go Generics

```go
// Go - generic type inference
func Min[T constraints.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// Type inference in generic function calls
result := Min(5, 3)      // Inferred as int
result2 := Min(3.14, 2.71)  // Inferred as float64
result3 := Min("apple", "banana")  // Inferred as string
```

## Collection Type Inference

### List/Array Inference

```python
# Python - list type inference
numbers = [1, 2, 3, 4, 5]  # Inferred as list[int]
names = ["Alice", "Bob", "Charlie"]  # Inferred as list[str]
mixed = [1, "hello", True]  # Inferred as list[Any]

# List comprehension type inference
squares = [x**2 for x in numbers]  # Inferred as list[int]
lengths = [len(name) for name in names]  # Inferred as list[int]
```

```go
// Go - slice type inference
numbers := []int{1, 2, 3, 4, 5}  // Explicit type needed
names := []string{"Alice", "Bob", "Charlie"}
mixed := []interface{}{1, "hello", true}

// Array type inference
numbers := [...]int{1, 2, 3, 4, 5}  // Inferred as [5]int
```

### Map/Dictionary Inference

```python
# Python - dictionary type inference
user = {
    "name": "John",
    "age": 25,
    "is_active": True
}  # Inferred as dict[str, Any]

scores = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78
}  # Inferred as dict[str, int]
```

```go
// Go - map type inference
user := map[string]interface{}{
    "name": "John",
    "age": 25,
    "isActive": true,
}

scores := map[string]int{
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78,
}
```

## Type Inference in Control Flow

### Conditional Type Inference

```python
# Python - conditional type inference
def process_value(value):
    if isinstance(value, str):
        return value.upper()  # Inferred as str
    elif isinstance(value, int):
        return value * 2      # Inferred as int
    else:
        return None           # Inferred as None

# Union types with inference
from typing import Union
def get_value(condition: bool) -> Union[str, int]:
    if condition:
        return "hello"  # Inferred as str
    else:
        return 42       # Inferred as int
```

### Loop Type Inference

```python
# Python - loop variable type inference
for i in range(5):
    print(i)  # i is inferred as int

for name in ["Alice", "Bob", "Charlie"]:
    print(name.upper())  # name is inferred as str

# Dictionary iteration
for key, value in scores.items():
    print(f"{key}: {value}")  # key: str, value: int
```

## Type Inference with Libraries

### NumPy Type Inference

```python
import numpy as np

# NumPy array type inference
arr = np.array([1, 2, 3, 4, 5])  # Inferred as numpy.ndarray[int64]
float_arr = np.array([1.0, 2.0, 3.0])  # Inferred as numpy.ndarray[float64]

# Operations maintain type inference
result = arr * 2  # Inferred as numpy.ndarray[int64]
result2 = arr + 1.5  # Inferred as numpy.ndarray[float64]
```

### Pandas Type Inference

```python
import pandas as pd

# DataFrame type inference
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'salary': [50000, 60000, 70000]
})

# Column types are inferred
print(df.dtypes)
# name      object
# age        int64
# salary     int64
```

## Type Inference Limitations

### Ambiguous Cases

```python
# Python - ambiguous type inference
empty_list = []  # Inferred as list[Any] - no type information
empty_dict = {}  # Inferred as dict[Any, Any] - no type information

# Type hints help in ambiguous cases
from typing import List, Dict
numbers: List[int] = []
scores: Dict[str, int] = {}
```

### Complex Expressions

```python
# Complex expressions may have unclear types
def complex_function(data):
    if isinstance(data, list):
        if len(data) > 0:
            if isinstance(data[0], int):
                return sum(data)  # Inferred as int
            else:
                return len(data)  # Inferred as int
        else:
            return 0  # Inferred as int
    else:
        return None  # Inferred as None
```

## Type Inference Best Practices

### 1. Use Type Hints for Clarity

```python
# Python - explicit type hints
def calculate_area(radius: float) -> float:
    return 3.14159 * radius * radius

def get_user_by_id(user_id: int) -> dict[str, Any]:
    return {"id": user_id, "name": "John"}

# Type hints help with inference
from typing import List, Optional

def find_user(users: List[dict], name: str) -> Optional[dict]:
    for user in users:
        if user["name"] == name:
            return user
    return None
```

### 2. Leverage IDE Support

```python
# Modern IDEs provide excellent type inference support
def process_data(data: list[int]) -> dict[str, int]:
    result = {
        "count": len(data),
        "sum": sum(data),
        "average": sum(data) // len(data) if data else 0
    }
    return result  # IDE infers return type as dict[str, int]
```

### 3. Use Type Checking Tools

```python
# mypy for static type checking
from typing import TypeVar, Generic

T = TypeVar('T')

class Container(Generic[T]):
    def __init__(self, item: T) -> None:
        self.item = item

    def get_item(self) -> T:
        return self.item

# mypy can infer types and catch errors
container = Container[int](42)
value = container.get_item()  # mypy knows this is int
```

## Performance Considerations

### Compile-Time vs Runtime Inference

```python
# Python - runtime type inference (slower)
def process_dynamic(data):
    if isinstance(data, str):
        return data.upper()
    elif isinstance(data, int):
        return data * 2
    # Type checking happens at runtime

# Type hints help with optimization
def process_typed(data: str) -> str:
    return data.upper()  # No runtime type checking needed
```

### Memory Usage

```python
# Type inference can affect memory usage
import sys

# Different types have different memory footprints
small_int = 1
large_int = 999999999
float_num = 3.14

print(sys.getsizeof(small_int))   # 28 bytes
print(sys.getsizeof(large_int))   # 28 bytes
print(sys.getsizeof(float_num))   # 24 bytes
```

## Related Concepts

- [[wiki:data-types]] - Understanding different data types
- [[wiki:variable]] - Variable declaration and initialization
- [[wiki:functions]] - Function return types and parameters
- [[wiki:validation]] - Type validation and checking
