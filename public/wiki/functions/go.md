# Functions in Go

Functions are fundamental building blocks in Go programming that allow you to organize code into reusable, named blocks. They are first-class citizens in Go and support various advanced features.

## What are Functions?

A function is a named block of code that can take inputs (parameters), perform operations, and optionally return values. Functions in Go are statically typed and support multiple return values, making them powerful and flexible.

## Function Declaration

### Basic Function Syntax

```go
func functionName(parameters) returnType {
    // Function body
    return value
}
```

### Simple Function Example

```go
func greet(name string) string {
    return "Hello, " + name + "!"
}

// Using the function
func main() {
    message := greet("Alice")
    fmt.Println(message) // Output: Hello, Alice!
}
```

## Function Parameters

### Single Parameter

```go
func square(x int) int {
    return x * x
}

result := square(5) // result = 25
```

### Multiple Parameters

```go
func add(a, b int) int {
    return a + b
}

func multiply(x, y int) int {
    return x * y
}

sum := add(3, 4)      // sum = 7
product := multiply(5, 6) // product = 30
```

### Same Type Parameters

```go
// Multiple parameters of the same type can be declared together
func min(a, b, c int) int {
    if a < b && a < c {
        return a
    } else if b < c {
        return b
    }
    return c
}
```

## Return Values

### Single Return Value

```go
func getLength(s string) int {
    return len(s)
}

length := getLength("Hello") // length = 5
```

### Multiple Return Values

```go
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Using multiple return values
quotient, err := divide(10, 2)
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Quotient:", quotient) // Output: Quotient: 5
}
```

### Named Return Values

```go
func getCoordinates() (x, y int) {
    x = 10
    y = 20
    return // Naked return - returns named values
}

func calculateRectangle(length, width int) (area, perimeter int) {
    area = length * width
    perimeter = 2 * (length + width)
    return
}

// Using named return values
x, y := getCoordinates()
fmt.Printf("Coordinates: (%d, %d)\n", x, y) // Output: Coordinates: (10, 20)

area, perimeter := calculateRectangle(5, 3)
fmt.Printf("Area: %d, Perimeter: %d\n", area, perimeter) // Output: Area: 15, Perimeter: 16
```

## Function Types

### Built-in Functions

```go
// Go provides several built-in functions
len("Hello")           // len()
cap([]int{1, 2, 3})    // cap()
make([]int, 5)         // make()
new(int)               // new()
append([]int{1, 2}, 3) // append()
```

### User-Defined Functions

```go
func calculateArea(length, width float64) float64 {
    return length * width
}

func validateEmail(email string) bool {
    return strings.Contains(email, "@") && strings.Contains(email, ".")
}

// Using the functions
area := calculateArea(10.5, 5.2)
fmt.Printf("Area: %.2f\n", area) // Output: Area: 54.60

isValid := validateEmail("user@example.com")
fmt.Println("Valid email:", isValid) // Output: Valid email: true
```

### Anonymous Functions (Closures)

```go
// Anonymous function assigned to a variable
square := func(x int) int {
    return x * x
}

result := square(4) // result = 16

// Anonymous function called immediately
func() {
    fmt.Println("I'm an anonymous function!")
}()

// Closure - function that captures variables from its outer scope
func createCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

counter := createCounter()
fmt.Println(counter()) // Output: 1
fmt.Println(counter()) // Output: 2
fmt.Println(counter()) // Output: 3
```

## Function Variadic Parameters

```go
// Variadic function - can take any number of arguments
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// Using variadic function
fmt.Println(sum(1, 2, 3))        // Output: 6
fmt.Println(sum(1, 2, 3, 4, 5))  // Output: 15

// Passing slice to variadic function
numbers := []int{1, 2, 3, 4, 5}
fmt.Println(sum(numbers...))      // Output: 15
```

## Function as Values

```go
// Functions are first-class citizens in Go
type Operation func(int, int) int

func add(a, b int) int {
    return a + b
}

func multiply(a, b int) int {
    return a * b
}

// Using function as a value
var op Operation = add
result := op(5, 3) // result = 8

op = multiply
result = op(5, 3) // result = 15

// Function that takes a function as parameter
func applyOperation(a, b int, op Operation) int {
    return op(a, b)
}

result = applyOperation(10, 5, add)      // result = 15
result = applyOperation(10, 5, multiply) // result = 50
```

## Method Functions

```go
// Methods are functions with a receiver
type Rectangle struct {
    Length, Width float64
}

// Method with value receiver
func (r Rectangle) Area() float64 {
    return r.Length * r.Width
}

// Method with pointer receiver
func (r *Rectangle) Scale(factor float64) {
    r.Length *= factor
    r.Width *= factor
}

// Using methods
rect := Rectangle{Length: 10, Width: 5}
fmt.Printf("Area: %.2f\n", rect.Area()) // Output: Area: 50.00

rect.Scale(2)
fmt.Printf("Scaled Area: %.2f\n", rect.Area()) // Output: Scaled Area: 200.00
```

## Function Best Practices

### 1. Use Descriptive Names

```go
// Good
func calculateMonthlyPayment(principal, rate, years float64) float64 {
    // Implementation
}

// Bad
func calc(pr, rt, yr float64) float64 {
    // Implementation
}
```

### 2. Keep Functions Small and Focused

```go
// Good - single responsibility
func validateEmail(email string) bool {
    return strings.Contains(email, "@") && strings.Contains(email, ".")
}

func sendEmail(email, message string) error {
    if !validateEmail(email) {
        return fmt.Errorf("invalid email address")
    }
    // Send email logic
    return nil
}

// Bad - multiple responsibilities
func processUserData(userData UserData) error {
    // Validates, processes, saves, and sends email
    return nil
}
```

### 3. Use Multiple Return Values for Errors

```go
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Always check for errors
result, err := divide(10, 0)
if err != nil {
    fmt.Println("Error:", err)
    return
}
fmt.Println("Result:", result)
```

### 4. Use Named Return Values Appropriately

```go
// Good for simple cases
func getCoordinates() (x, y int) {
    x = 10
    y = 20
    return
}

// Better for complex logic
func parseConfig(filename string) (config Config, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic recovered: %v", r)
        }
    }()

    // Parse logic here
    return
}
```

## Advanced Function Concepts

### Function Composition

```go
func addOne(x int) int {
    return x + 1
}

func multiplyByTwo(x int) int {
    return x * 2
}

func compose(f, g func(int) int) func(int) int {
    return func(x int) int {
        return f(g(x))
    }
}

// Compose functions
addOneThenMultiply := compose(multiplyByTwo, addOne)
result := addOneThenMultiply(5) // (5 + 1) * 2 = 12
fmt.Println(result) // Output: 12
```

### Recursive Functions

```go
func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

fmt.Println(factorial(5))  // Output: 120
fmt.Println(fibonacci(10)) // Output: 55
```

### Defer Statements

```go
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close() // Will be called when function exits

    // Process file
    return nil
}
```

Functions are essential to Go programming and provide a clean, efficient way to organize and reuse code. Understanding Go's function features like multiple return values, closures, and methods is crucial for writing idiomatic Go code.
