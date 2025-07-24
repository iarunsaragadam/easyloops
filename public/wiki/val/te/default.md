# Val (Immutable Variables) in Programming: Mana Data Lock Chesey Box

## Val Ante Enti?

val anedi okka keyword, idi konni programming languages (like Kotlin, Scala) lo immutable variables declare cheyyadaniki use chestham. Immutable ante, okka sari value assign chesaka, adi change cheyyalemu – mana Baahubali lanti commitment! Ila choodu, okka box lo data lock chesinattu.

"Oka saari nenu fix ayithe, aa fire ni aapadhi evadu!" – Val declare chesaka, adi fixed, change cheyyalevu!

---

## Basic Val Declaration

### Kotlin Val

```kotlin
// Kotlin - val for immutable variables
val name = "Siva"
val age = 25
val isStudent = true

// val variables change cheyyalem
// name = "Ram"  // Compilation error vastundi

// val with explicit type
val height: Double = 5.9
val scores: List<Int> = listOf(85, 90, 78)
```

"Oka saari commit ayithe, naa maata nenu vinanu!" – Val declare chesaka, value fixed, reassignment ledhu!

### Scala Val

```scala
// Scala - val for immutable variables
val name = "Siva"
val age = 25
val isStudent = true

// val variables change cheyyalem
// name = "Ram"  // Compilation error vastundi

// val with explicit type
val height: Double = 5.9
val scores: List[Int] = List(85, 90, 78)
```

### JavaScript Const

```javascript
// JavaScript - const for immutable variables
const name = 'Siva';
const age = 25;
const isStudent = true;

// const variables reassigned cheyyalem
// name = "Ram";  // Runtime error vastundi

// const with objects (properties change cheyyochu)
const user = { name: 'Siva', age: 25 };
user.age = 26; // Idi work avtundi (object property change)
// user = {};    // Idi error isthundi
```

"Nenu cheppina rule state antha apply avtundi, kani execution lo flexibility undi!" – Const declare cheste binding fixed, kani object properties change cheyyochu!

### Python Constants

```python
# Python - constants (convention-based, not truly immutable)
NAME = "Siva"
AGE = 25
IS_STUDENT = True

# Python lo true immutability ledhu
# NAME = "Ram"  # Idi work avtundi, kani convention violate avtundi

# Using typing.Final for type hints
from typing import Final

name: Final[str] = "Siva"
age: Final[int] = 25
# name = "Ram"  // Type checker warning isthundi
```

"Rules unte follow cheyyali, lekapothe system collapse!" – Python constants follow cheste program stable untundi.

---

## Val vs Var (Mutable Variables)

### Kotlin Comparison

```kotlin
// Kotlin - val vs var
val immutableName = "Siva"  // Change cheyyalem
var mutableAge = 25         // Change cheyyochu

// immutableName = "Ram"    // Compilation error
mutableAge = 26             // Idi work avtundi

// val with complex objects
val user = User("Siva", 25)
// user = User("Ram", 26)   // Compilation error
user.age = 26               // Idi work avtundi (object property change)
```

"Plan lekunda action teesukunte, disaster confirm!" – Val use cheste plan safe, var use cheste careful ga undali!

### Scala Comparison

```scala
// Scala - val vs var
val immutableName = "Siva"  // Change cheyyalem
var mutableAge = 25         // Change cheyyochu

// immutableName = "Ram"    // Compilation error
mutableAge = 26             // Idi work avtundi

// val with case classes
case class User(name: String, age: Int)
val user = User("Siva", 25)
// user = User("Ram", 26)   // Compilation error
// user.age = 26            // Compilation error (case class immutable)
```

---

## Immutable Collections

### Kotlin Immutable Collections

```kotlin
// Kotlin - immutable collections
val numbers = listOf(1, 2, 3, 4, 5)
val names = setOf("Siva", "Ram", "Krishna")
val scores = mapOf("Siva" to 85, "Ram" to 92)

// New collections create avtayi
val doubledNumbers = numbers.map { it * 2 }
val filteredNames = names.filter { it.length > 3 }
val updatedScores = scores + ("Krishna" to 78)

// Original collections change kavu
println(numbers)  // [1, 2, 3, 4, 5]
println(doubledNumbers)  // [2, 4, 6, 8, 10]
```

"Nenu rocky, na permission lekunda eavaru kGF nee touch cheyyaleru!" – Val collections change cheyyalem, new collections create cheyyali!

### Scala Immutable Collections

```scala
// Scala - immutable collections
val numbers = List(1, 2, 3, 4, 5)
val names = Set("Siva", "Ram", "Krishna")
val scores = Map("Siva" -> 85, "Ram" -> 92)

// New collections create avtayi
val doubledNumbers = numbers.map(_ * 2)
val filteredNames = names.filter(_.length > 3)
val updatedScores = scores + ("Krishna" -> 78)

// Original collections change kavu
println(numbers)  // List(1, 2, 3, 4, 5)
println(doubledNumbers)  // List(2, 4, 6, 8, 10)
```

---

## Val in Function Parameters

### Kotlin Function Parameters

```kotlin
// Kotlin - val parameters (default behavior)
fun greet(name: String) {
    // name is val - reassigned cheyyalem
    // name = "Ram"  // Compilation error
    println("Hello, $name!")
}

// val parameters in data classes
data class User(val name: String, val age: Int)

val user = User("Siva", 25)
// user.name = "Ram"  // Compilation error
// user.age = 26      // Compilation error
```

"Nenu okka decision teeskunte, adi final!" – Function parameters val ayithe, adi fixed!

### Scala Function Parameters

```scala
// Scala - val parameters (default behavior)
def greet(name: String): Unit = {
    // name is val - reassigned cheyyalem
    // name = "Ram"  // Compilation error
    println(s"Hello, $name!")
}

// val parameters in case classes
case class User(name: String, age: Int)

val user = User("Siva", 25)
// user.name = "Ram"  // Compilation error
// user.age = 26      // Compilation error
```

---

## Val with Lazy Initialization

### Kotlin Lazy Val

```kotlin
// Kotlin - lazy val for deferred initialization
val expensiveComputation: String by lazy {
    println("Computing expensive value...")
    "Expensive result"
}

// First access lo compute avtundi
println("Before access")
println(expensiveComputation)  // "Computing..." then "Expensive result"
println(expensiveComputation)  // Just "Expensive result" (cached)
```

"watch lo time correct ga set cheste, jeevitham smooth ga nadustundi!" – Lazy val tho computation correct time lo execute avtundi!

### Scala Lazy Val

```scala
// Scala - lazy val for deferred initialization
lazy val expensiveComputation: String = {
    println("Computing expensive value...")
    "Expensive result"
}

// First access lo compute avtundi
println("Before access")
println(expensiveComputation)  // "Computing..." then "Expensive result"
println(expensiveComputation)  // Just "Expensive result" (cached)
```

---

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

val user = User("Siva", 25)
println(user.name)      // "Siva"
println(user.isAdult)   // true
// user.name = "Ram"     // Compilation error
user.age = 26           // Idi work avtundi
```

"Naa choice perfect eh!" – Val properties perfect ga lock chestayi!

### Scala Classes

```scala
// Scala - val properties in classes
class User(val name: String, var age: Int) {
    def isAdult: Boolean = age >= 18

    def fullName: String = s"$name (Age: $age)"
}

val user = new User("Siva", 25)
println(user.name)      // "Siva"
println(user.isAdult)   // true
// user.name = "Ram"     // Compilation error
user.age = 26           // Idi work avtundi
```

---

## Val in Functional Programming

### Immutable Data Structures

```kotlin
// Kotlin - functional programming with val
val numbers = listOf(1, 2, 3, 4, 5)

// Functional operations new collections create chestayi
val doubled = numbers.map { it * 2 }
val filtered = doubled.filter { it > 5 }
val sum = filtered.sum()

println(numbers)  // [1, 2, 3, 4, 5] (unchanged)
println(doubled)  // [2, 4, 6, 8, 10]
println(filtered) // [6, 8, 10]
println(sum)      // 24
```

"Naa style eh veru!" – Val tho functional programming style veru, safe untundi!

### Pattern Matching

```scala
// Scala - pattern matching with val
val user = User("Siva", 25)

val message = user match {
    case User(name, age) if age >= 18 => s"$name is an adult"
    case User(name, _) => s"$name is a minor"
}

println(message)  // "Siva is an adult"
```

---

## Performance Benefits

### Memory Efficiency

```kotlin
// Kotlin - val enables optimizations
val constantValue = "This is a constant string"
val numbers = listOf(1, 2, 3, 4, 5)

// Compiler optimizations tho memory save avtundi
// - String interning
// - Immutable collection optimizations
// - Thread safety
```

"Naa control lo undi, tension vaddu!" – Val tho memory and performance control lo untayi!

### Thread Safety

```kotlin
// Kotlin - val is thread-safe
val sharedData = listOf(1, 2, 3, 4, 5)

// Multiple threads safely access cheyyochu
Thread {
    println("Thread 1: ${sharedData.sum()}")
}.start()

Thread {
    println("Thread 2: ${sharedData.size}")
}.start()
```

---

## Best Practices

### 1. Prefer Val Over Var

```kotlin
// Kotlin - val prefer cheyyandi
// Good
val userName = "Siva"
val userAge = 25
val userScores = listOf(85, 90, 78)

// Var only when reassignment need
var currentScore = 0
var attempts = 0
```

"Rules unte follow cheyyali!" – Val prefer cheste program stable untundi.

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
val names = setOf("Siva", "Ram")     // Immutable set
val scores = mapOf("Siva" to 85)     // Immutable map

// Mutable collections only when needed
val mutableNumbers = mutableListOf(1, 2, 3)
```

---

## Common Mistakes

### 1. Attempting to Reassign Val

```kotlin
// Kotlin - common mistake
val name = "Siva"
// name = "Ram"  // Compilation error

// Solution: Var use cheyyandi
var mutableName = "Siva"
mutableName = "Ram"  // Idi work avtundi
```

"Naa rule ni evaru break cheyyaleru!" – Val reassignment try cheste error confirm!

### 2. Confusing Object Immutability

```kotlin
// Kotlin - val doesn't make objects immutable
val user = User("Siva", 25)
// user = User("Ram", 26)  // Compilation error
user.age = 26              // Idi work avtundi (object property change)

// Truly immutable kosam data classes
data class ImmutableUser(val name: String, val age: Int)
val immutableUser = ImmutableUser("Siva", 25)
// immutableUser.age = 26  // Compilation error
```

---

## Related Concepts

- [[wiki:variable]] - Variable declaration and usage
- [[wiki:variable-declarations]] - How to declare variables
- [[wiki:immutable-data-structures]] - Immutable data structures
- [[wiki:functional-programming]] - Functional programming concepts

---
