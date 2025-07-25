# Python lo Immutable Variables: Mana Data Lock Chesey Box

## Immutable Variables Ante Enti?

Python lo val lanti exact keyword ledhu, kani immutable variables (change cheyyaleni data) create cheyyadaniki konni techniques unnai. Idi okka box lo data lock chesinattu, mana Baahubali lanti commitment! Immutable ante, okka sari value set chesaka adi change cheyyalevu.
"Oka saari nenu fix ayithe, aa fire ni aapadhi evadu!" – Immutable data set chesaka, adi fixed, change cheyyalevu!
**_Python lo Immutable Variables Convention Based Constants_**
Python lo constants ni uppercase names tho create chestham (like NAME, AGE), kani idi just convention – true immutability ledhu.

## Python - convention-based constants

```python
NAME = "Siva"
AGE = 25
IS_STUDENT = True
```

## Reassignment work avtundi, kani convention violate avtundi

Using typing Final for Stronger Immutability
Final use chesi type checkers (like mypy) tho immutability enforce cheyyochu. Idi reassignment ni warn chestundi.

```python
from typing import Final
name: Final[str] = "Tarun"
age: Final[int] = 25
```

### Immutable Data Types: Tuples

Python lo tuples immutable ga untayi. Okka sari create chesaka, tuple values change cheyyalevu.

## Tuple - immutable by default

```python
user_info = ("Jahnavi", 25, True)
```

## user_info[0] = "Ram" # TypeError isthundi

## Nested tuples for complex immutable data

```python
scores = (85, 90, 78)
user = ("Arun", scores)
```

## scores[0] = 100 # TypeError, immutable tuple

## Frozenset - immutable set

```python
names = frozenset(["Siva", "Ram", "Krishna"])
```

**_names.add("Bob") # AttributeError, immutable set_** ( beacuse its immutable )

### Frozenset operations (new sets create avtayi)

```python
filtered_names = frozenset(name for name in names if len(name) > 4)
print(names)         # frozenset(['Arun', 'Jayadev', 'Krishna'])
print(filtered_names)  # frozenset(['Jayadev', 'Krishna'])
```

"Race start ayye mundu track fix cheyyali!" – Constants default ga set chesi execute cheste, program stable ga run avtundi!

## Python lo Immutable Variables vs Mutable Variables

Python lo immutable variables (Final, tuples, frozenset) ni mutable variables (like lists, sets) tho compare cheste:

### Immutable (Final, tuple)

```python
name: Final[str] = "Tarun"
user_info = ("Tarun", 25)
```

## Mutable (list)

```python
mutable_list = ["Tarun", 25]
mutable_list[0] = "Ram"  # Idi work avtundi
```

"Plan lekunda action teesukunte, disaster confirm!" – Immutable variables use cheste execution safe, mutable variables tho careful ga undali!

## Immutable Collections in Python

Python lo tuple and frozenset immutable collections la work chestayi. Operations cheste new collections create avtayi.

## Immutable tuple

```python
numbers = (1, 2, 3, 4, 5)
doubled = tuple(x * 2 for x in numbers)  # New tuple
print(numbers)  # (1, 2, 3, 4, 5)
print(doubled)  # (2, 4, 6, 8, 10)
```

## Immutable frozenset

```python
scores = frozenset([85, 90, 92])
updated_scores = frozenset(list(scores) + [78])
print(scores)        # frozenset({85, 90, 92})
print(updated_scores)  # frozenset({85, 90, 92, 78})
```

"Naa system nee evaru touch cheyyakoodadu!" – Immutable collections change cheyyalevu, new collections create cheyyali!

Python lo Function Parameters and Immutability.
Python lo function parameters by default mutable or immutable based on their type. Immutable types (like strings, tuples) safe ga untayi.

```python
def greet(name: str) -> None:
    # name is immutable (string)
    # name = "Ram"  # Local reassignment, original safe
    print(f"Hello, {name}!")

user_info = ("Siva", 25)
greet(user_info[0])  # "Hello, Siva!"
# user_info[0] = "Ram"  # TypeError, tuple immutable
```

"Nenu okka decision teeskunte, adi final!" – Immutable parameters execution lo fixed ga untayi!

Python lo Lazy Initialization
Python lo lazy val lanti direct feature ledhu, kani @property or functools.cached_property use chesi lazy initialization mimic cheyyochu.

```python
from functools import cached_property

class ExpensiveData:
    @cached_property
    def expensive_computation(self) -> str:
        print("Computing expensive value...")
        return "Expensive result"

data = ExpensiveData()
print("Before access")
print(data.expensive_computation)  # "Computing..." then "Expensive result"
print(data.expensive_computation)  # Just "Expensive result" (cached)
```

"Time correct ga set cheste, jeevitham smooth ga nadustundi!" – Lazy initialization tho computation correct time lo execute avtundi!

Python lo Performance Benefits
Memory Efficiency
Immutable objects (tuples, frozenset, strings) memory efficient ga untayi.

## Immutable string and tuple

```python
constant_value = "This is a constant string"
numbers = (1, 2, 3, 4, 5)
```

## Optimizations: string interning, tuple caching

## Thread-safe by default

Dialogue (DJ): "Naa control lo undi, tension vaddu!" – Immutable objects tho memory and execution control lo untayi!
Thread Safety
Immutable objects Python lo thread-safe.
import threading

```python
shared_data = (1, 2, 3, 4, 5)  # Immutable tuple

def thread1():
    print(f"Thread 1: {sum(shared_data)}")

def thread2():
    print(f"Thread 2: {len(shared_data)}")

threading.Thread(target=thread1).start()
threading.Thread(target=thread2).start()

```

## Python lo Best Practices

### 1. Constants Kosam Final Use Cheyyandi

```python
from typing import Final

MAX_RETRY_ATTEMPTS: Final[int] = 3
DEFAULT_TIMEOUT: Final[int] = 30
API_BASE_URL: Final[str] = "https://api.example.com"

Dialogue (Leader): "Rules unte follow cheyyali!" – Final constants use cheste program stable untundi.
```

### 2. Immutable Collections Prefer Cheyyandi

```python
numbers = (1, 2, 3, 4, 5)  # Immutable tuple
names = frozenset(["Siva", "Ram"])  # Immutable set

# Mutable only when needed
mutable_list = [1, 2, 3]
```

### 3. Clear Naming Conventions

```python
# Good
USER_NAME: Final[str] = "Siva"
USER_AGE: Final[int] = 25

# Avoid
n = "Siva"  # Vague naming
```

"Naa choice perfect eh!" – Clear naming and immutable types tho program perfect ga untundi!

## Python lo Common Mistakes

### 1. Convention-Based Constants Reassign Cheyyadam

```python
// Wrong
NAME = "Siva"
NAME = "Ram"  # Convention violate avtundi

// Correct
NAME: Final[str] = "Siva"
# NAME = "Ram"  # Type checker warning
```

"Naa rule ni evaru break cheyyaleru!" – Constants reassignment try cheste error risk untundi!

### 2. Mutable vs Immutable Confusion

```python
# Immutable tuple

user = ("Siva", 25)
# user[0] = "Ram"  # TypeError

# Mutable list
mutable_user = ["Siva", 25]
mutable_user[0] = "Ram"  # Idi work avtundi
```

## Related Concepts

[[wiki:variable]] - Variable declaration and usage
[[wiki:immutable-data-structures]] - Immutable data structures in Python
[[wiki:functional-programming]] - Functional programming in Python
