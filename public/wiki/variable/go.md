# Variables in Go

Variables are fundamental building blocks in Go programming that allow you to store and manipulate data. They provide a way to give names to memory locations that hold values.

## What are Variables?

A variable is a named storage location in memory that can hold a value of a specific type. In Go, variables must be declared before they can be used, and the type system ensures type safety.

## Variable Declaration

Go provides several ways to declare variables:

### 1. Explicit Declaration

```go
var name string
var age int
var isStudent bool
```

### 2. Declaration with Initialization

```go
var name string = "Alice"
var age int = 25
var isStudent bool = true
```

### 3. Type Inference (Short Variable Declaration)

```go
name := "Alice"
age := 25
isStudent := true
```

### 4. Multiple Variable Declaration

```go
var (
    name      string
    age       int
    isStudent bool
)

// Or with initialization
var (
    name      = "Alice"
    age       = 25
    isStudent = true
)

// Short declaration for multiple variables
name, age, isStudent := "Alice", 25, true
```

## Variable Naming Rules

- Must start with a letter or underscore
- Can contain letters, digits, and underscores
- Case-sensitive
- Cannot use Go keywords
- Follow camelCase convention for multi-word names

```go
// Valid names
var userName string
var _privateVar int
var Age int

// Invalid names
var 123name string  // Cannot start with digit
var user-name string // Cannot contain hyphens
var var string      // Cannot use keyword
```

## Variable Scope

Variables have different scopes depending on where they're declared:

### Package-Level Variables

```go
package main

import "fmt"

// Package-level variables (accessible throughout the package)
var globalVar = "I'm accessible everywhere in this package"

func main() {
    fmt.Println(globalVar)
}
```

### Function-Level Variables

```go
func example() {
    // Local variable (only accessible within this function)
    localVar := "I'm only accessible in this function"
    fmt.Println(localVar)
}
```

### Block-Level Variables

```go
func example() {
    if true {
        // Block-level variable
        blockVar := "I'm only accessible in this block"
        fmt.Println(blockVar)
    }
    // fmt.Println(blockVar) // This would cause an error
}
```

## Zero Values

In Go, variables declared without initialization get their "zero value":

```go
var (
    s string    // ""
    i int       // 0
    f float64   // 0.0
    b bool      // false
    p *int      // nil
    sl []int    // nil
    m map[string]int // nil
)
```

## Constants

Constants are similar to variables but their values cannot be changed:

```go
const (
    Pi = 3.14159
    MaxSize = 100
    AppName = "MyApp"
)

// Typed constants
const MaxInt int = 9223372036854775807
```

## Best Practices

1. **Use meaningful names**: Choose descriptive names that indicate the purpose
2. **Follow naming conventions**: Use camelCase for variables
3. **Initialize variables**: Always initialize variables when possible
4. **Use short declaration**: Prefer `:=` for local variables
5. **Group related variables**: Use multiple declaration syntax for related variables

```go
// Good
var (
    userName string
    userAge  int
    isActive bool
)

// Better with initialization
var (
    userName = "Alice"
    userAge  = 25
    isActive = true
)

// Best for local variables
userName, userAge, isActive := "Alice", 25, true
```

## Type Conversion

Go requires explicit type conversion:

```go
var i int = 42
var f float64 = float64(i)  // Explicit conversion required
var u uint = uint(f)        // Explicit conversion required

// Cannot do: var f float64 = i  // This would cause an error
```

## Variable Shadowing

Be careful with variable shadowing in nested scopes:

```go
var name = "Global"

func example() {
    name := "Local"  // This shadows the global variable
    fmt.Println(name) // Prints "Local"
}

func anotherExample() {
    fmt.Println(name) // Prints "Global"
}
```

Variables are essential for storing and manipulating data in Go programs. Understanding how to properly declare, initialize, and use variables is crucial for writing effective Go code.
