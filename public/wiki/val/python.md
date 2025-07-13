# Val (Immutable Variables)

## What is Val?

`val` is a keyword used in some programming languages (particularly Kotlin and Scala) to declare immutable variables - variables whose value cannot be changed after initialization. The concept of immutable variables exists in many languages with different syntax.

## Basic Val Declaration

### Kotlin Val

```kotlin
// Kotlin - val for immutable variables
val name = "John"
val age = 25
val isStudent = true

// val variables cannot be reassigned
// name = "Bob"  // This would cause a compilation error

// val with explicit type
val height: Double = 5.9
val scores: List<Int> = listOf(85, 90, 78)
```

### Scala Val

```scala
// Scala - val for immutable variables
val name = "John"
val age = 25
val isStudent = true

// val variables cannot be reassigned
// name = "Bob"  // This would cause a compilation error

// val with explicit type
val height: Double = 5.9
val scores: List[Int] = List(85, 90, 78)
```

### JavaScript Const

```javascript
// JavaScript - const for immutable variables
const name = 'John';
const age = 25;
const isStudent = true;

// const variables cannot be reassigned
// name = "Bob";  // This would cause a runtime error

// const with objects (properties can still be modified)
const user = { name: 'John', age: 25 };
user.age = 26; // This works (object property modification)
// user = {};    // This would cause an error
```

### Python Constants

```python
# Python - convention for constants (not truly immutable)
NAME = "John"
AGE = 25
IS_STUDENT = True

# Python doesn't have true immutable variables
# NAME = "Bob"  # This works, but violates convention

# Using typing.Final for type hints
from typing import Final

name: Final[str] = "John"
age: Final[int] = 25
# name = "Bob"  # Type checker will warn about this
```

## Val vs Var (Mutable Variables)

### Kotlin Comparison

```kotlin
// Kotlin - val vs var
val immutableName = "John"  // Cannot be changed
var mutableAge = 25         // Can be changed

// immutableName = "Bob"    // Compilation error
mutableAge = 26             // This works

// val with complex objects
val user = User("John", 25)
// user = User("Bob", 26)   // Compilation error
user.age = 26               // This works (object property modification)
```

### Scala Comparison

```scala
// Scala - val vs var
val immutableName = "John"  // Cannot be changed
var mutableAge = 25         // Can be changed

// immutableName = "Bob"    // Compilation error
mutableAge = 26             // This works

// val with case classes
case class User(name: String, age: Int)
val user = User("John", 25)
// user = User("Bob", 26)   // Compilation error
// user.age = 26            // Compilation error (case class is immutable)
```

## Immutable Collections

### Kotlin Immutable Collections

```kotlin
// Kotlin - immutable collections
val numbers = listOf(1, 2, 3, 4, 5)
val names = setOf("Alice", "Bob", "Charlie")
val scores = mapOf("Alice" to 85, "Bob" to 92)

// These operations create new collections
val doubledNumbers = numbers.map { it * 2 }
val filteredNames = names.filter { it.length > 3 }
val updatedScores = scores + ("Charlie" to 78)

// Original collections remain unchanged
println(numbers)  // [1, 2, 3, 4, 5]
println(doubledNumbers)  // [2, 4, 6, 8, 10]
```

### Scala Immutable Collections

```scala
// Scala - immutable collections
val numbers = List(1, 2, 3, 4, 5)
val names = Set("Alice", "Bob", "Charlie")
val scores = Map("Alice" -> 85, "Bob" -> 92)

// These operations create new collections
val doubledNumbers = numbers.map(_ * 2)
val filteredNames = names.filter(_.length > 3)
val updatedScores = scores + ("Charlie" -> 78)

// Original collections remain unchanged
println(numbers)  // List(1, 2, 3, 4, 5)
println(doubledNumbers)  // List(2, 4, 6, 8, 10)
```

## Val in Function Parameters

### Kotlin Function Parameters

```kotlin
// Kotlin - val parameters (default behavior)
fun greet(name: String) {
    // name is effectively val - cannot be reassigned
    // name = "Bob"  // Compilation error
    println("Hello, $name!")
}

// val parameters in data classes
data class User(val name: String, val age: Int)

val user = User("John", 25)
// user.name = "Bob"  // Compilation error
// user.age = 26      // Compilation error
```

### Scala Function Parameters

```scala
// Scala - val parameters (default behavior)
def greet(name: String): Unit = {
    // name is effectively val - cannot be reassigned
    // name = "Bob"  // Compilation error
    println(s"Hello, $name!")
}

// val parameters in case classes
case class User(name: String, age: Int)

val user = User("John", 25)
// user.name = "Bob"  // Compilation error
// user.age = 26      // Compilation error
```

## Val with Lazy Initialization

### Kotlin Lazy Val

```kotlin
// Kotlin - lazy val for deferred initialization
val expensiveComputation: String by lazy {
    println("Computing expensive value...")
    "Expensive result"
}

// Value is computed only when first accessed
println("Before access")
println(expensiveComputation)  // "Computing expensive value..." then "Expensive result"
println(expensiveComputation)  // Just "Expensive result" (cached)
```

### Scala Lazy Val

```scala
// Scala - lazy val for deferred initialization
lazy val expensiveComputation: String = {
    println("Computing expensive value...")
    "Expensive result"
}

// Value is computed only when first accessed
println("Before access")
println(expensiveComputation)  // "Computing expensive value..." then "Expensive result"
println(expensiveComputation)  // Just "Expensive result" (cached)
```

## Val in Object-Oriented Programming

### Kotlin Classes

```kotlin
// Kotlin - val properties in classes
class User(val name: String, var age: Int) {
    val isAdult: Boolean
        get() = age >= 18

    val fullName: String
        get() = "$name (Age: $age)"
}

val user = User("John", 25)
println(user.name)      // "John"
println(user.isAdult)   // true
// user.name = "Bob"     // Compilation error
user.age = 26           // This works
```

### Scala Classes

```scala
// Scala - val properties in classes
class User(val name: String, var age: Int) {
    def isAdult: Boolean = age >= 18

    def fullName: String = s"$name (Age: $age)"
}

val user = new User("John", 25)
println(user.name)      // "John"
println(user.isAdult)   // true
// user.name = "Bob"     // Compilation error
user.age = 26           // This works
```

## Val in Functional Programming

### Immutable Data Structures

```kotlin
// Kotlin - functional programming with val
val numbers = listOf(1, 2, 3, 4, 5)

// Functional operations create new collections
val doubled = numbers.map { it * 2 }
val filtered = doubled.filter { it > 5 }
val sum = filtered.sum()

println(numbers)  // [1, 2, 3, 4, 5] (unchanged)
println(doubled)  // [2, 4, 6, 8, 10]
println(filtered) // [6, 8, 10]
println(sum)      // 24
```

### Pattern Matching

```scala
// Scala - pattern matching with val
val user = User("John", 25)

val message = user match {
    case User(name, age) if age >= 18 => s"$name is an adult"
    case User(name, _) => s"$name is a minor"
}

println(message)  // "John is an adult"
```

## Performance Benefits

### Memory Efficiency

```kotlin
// Kotlin - val enables optimizations
val constantValue = "This is a constant string"
val numbers = listOf(1, 2, 3, 4, 5)

// Compiler can optimize val variables
// - String interning for constant strings
// - Immutable collection optimizations
// - Thread safety without synchronization
```

### Thread Safety

```kotlin
// Kotlin - val is thread-safe
val sharedData = listOf(1, 2, 3, 4, 5)

// Multiple threads can safely read sharedData
// No synchronization needed for immutable data
Thread {
    println("Thread 1: ${sharedData.sum()}")
}.start()

Thread {
    println("Thread 2: ${sharedData.size}")
}.start()
```

## Best Practices

### 1. Prefer Val Over Var

```kotlin
// Kotlin - prefer val when possible
// Good
val userName = "John"
val userAge = 25
val userScores = listOf(85, 90, 78)

// Only use var when reassignment is necessary
var currentScore = 0
var attempts = 0
```

### 2. Use Val for Constants

```kotlin
// Kotlin - val for constants
val MAX_RETRY_ATTEMPTS = 3
val DEFAULT_TIMEOUT = 30
val API_BASE_URL = "https://api.example.com"
val PI = 3.14159
```

### 3. Immutable Collections

```kotlin
// Kotlin - prefer immutable collections
val numbers = listOf(1, 2, 3, 4, 5)  // Immutable list
val names = setOf("Alice", "Bob")     // Immutable set
val scores = mapOf("Alice" to 85)     // Immutable map

// Use mutable collections only when needed
val mutableNumbers = mutableListOf(1, 2, 3)
```

## Common Mistakes

### 1. Attempting to Reassign Val

```kotlin
// Kotlin - common mistake
val name = "John"
// name = "Bob"  // Compilation error

// Solution: Use var if reassignment is needed
var mutableName = "John"
mutableName = "Bob"  // This works
```

### 2. Confusing Object Immutability

```kotlin
// Kotlin - val doesn't make objects immutable
val user = User("John", 25)
// user = User("Bob", 26)  // Compilation error
user.age = 26              // This works (object property modification)

// For truly immutable objects, use data classes
data class ImmutableUser(val name: String, val age: Int)
val immutableUser = ImmutableUser("John", 25)
// immutableUser.age = 26  // Compilation error
```

## Related Concepts

- [[wiki:variable]] - Variable declaration and usage
- [[wiki:variable-declarations]] - How to declare variables
- [[wiki:immutable-data-structures]] - Immutable data structures
- [[wiki:functional-programming]] - Functional programming concepts
