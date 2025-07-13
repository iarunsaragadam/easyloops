# Standard Input (stdin)

## What is stdin?

Standard input (stdin) is a stream of data that a program reads from. It's one of the three standard streams in computing, along with stdout (standard output) and stderr (standard error). By default, stdin reads from the keyboard, but it can be redirected to read from files or other sources.

## Basic stdin Operations

### Reading from stdin

```python
# Python - reading a single line
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Reading multiple lines
line1 = input()
line2 = input()
print(f"First line: {line1}")
print(f"Second line: {line2}")
```

```go
// Go - reading from stdin
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)

    fmt.Print("Enter your name: ")
    scanner.Scan()
    name := scanner.Text()
    fmt.Printf("Hello, %s!\n", name)
}
```

### Reading Different Data Types

```python
# Reading strings
name = input("Enter name: ")

# Reading numbers
age = int(input("Enter age: "))
height = float(input("Enter height: "))

# Reading boolean (converting from string)
is_student = input("Are you a student? (y/n): ").lower() == 'y'
```

```go
// Go - reading different types
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)

    fmt.Print("Enter name: ")
    scanner.Scan()
    name := scanner.Text()

    fmt.Print("Enter age: ")
    scanner.Scan()
    ageStr := scanner.Text()
    age, _ := strconv.Atoi(ageStr)

    fmt.Print("Are you a student? (y/n): ")
    scanner.Scan()
    isStudent := strings.ToLower(scanner.Text()) == "y"

    fmt.Printf("Name: %s, Age: %d, Student: %t\n", name, age, isStudent)
}
```

## Reading Multiple Values

### Reading Multiple Lines

```python
# Reading multiple lines
print("Enter three numbers:")
num1 = int(input())
num2 = int(input())
num3 = int(input())

total = num1 + num2 + num3
print(f"Sum: {total}")
```

### Reading Space-Separated Values

```python
# Reading space-separated values on one line
line = input("Enter three numbers: ")
numbers = line.split()
num1, num2, num3 = int(numbers[0]), int(numbers[1]), int(numbers[2])

total = num1 + num2 + num3
print(f"Sum: {total}")
```

```go
// Go - reading space-separated values
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)

    fmt.Print("Enter three numbers: ")
    scanner.Scan()
    line := scanner.Text()

    parts := strings.Fields(line)
    num1, _ := strconv.Atoi(parts[0])
    num2, _ := strconv.Atoi(parts[1])
    num3, _ := strconv.Atoi(parts[2])

    total := num1 + num2 + num3
    fmt.Printf("Sum: %d\n", total)
}
```

## Reading Until End of Input

### Reading All Lines

```python
# Reading all lines until EOF (Ctrl+D on Unix, Ctrl+Z on Windows)
print("Enter lines (Ctrl+D to end):")
lines = []
try:
    while True:
        line = input()
        lines.append(line)
except EOFError:
    pass

print(f"Read {len(lines)} lines:")
for line in lines:
    print(f"  {line}")
```

```go
// Go - reading all lines
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)

    fmt.Println("Enter lines (Ctrl+D to end):")
    lines := []string{}

    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }

    fmt.Printf("Read %d lines:\n", len(lines))
    for _, line := range lines {
        fmt.Printf("  %s\n", line)
    }
}
```

## Input Validation

### Basic Validation

```python
# Validating numeric input
def get_valid_age():
    while True:
        try:
            age = int(input("Enter age (1-120): "))
            if 1 <= age <= 120:
                return age
            else:
                print("Age must be between 1 and 120")
        except ValueError:
            print("Please enter a valid number")

age = get_valid_age()
print(f"Valid age: {age}")
```

### Advanced Validation

```python
# Validating multiple inputs
def get_student_info():
    while True:
        try:
            name = input("Enter name: ").strip()
            if not name:
                print("Name cannot be empty")
                continue

            age = int(input("Enter age: "))
            if age < 0 or age > 120:
                print("Invalid age")
                continue

            gpa = float(input("Enter GPA: "))
            if gpa < 0.0 or gpa > 4.0:
                print("GPA must be between 0.0 and 4.0")
                continue

            return name, age, gpa

        except ValueError:
            print("Please enter valid values")

name, age, gpa = get_student_info()
print(f"Student: {name}, Age: {age}, GPA: {gpa}")
```

## stdin in Different Contexts

### Command Line Arguments vs stdin

```python
import sys

# Command line arguments
if len(sys.argv) > 1:
    name = sys.argv[1]
    print(f"Hello, {name}!")
else:
    # Fall back to stdin
    name = input("Enter your name: ")
    print(f"Hello, {name}!")
```

### File Redirection

```bash
# Redirect file to stdin
python script.py < input.txt

# Pipe output from another command
echo "Hello World" | python script.py
```

### Interactive vs Non-Interactive

```python
import sys

# Check if stdin is interactive
if sys.stdin.isatty():
    # Interactive mode
    name = input("Enter name: ")
else:
    # Non-interactive mode (file or pipe)
    name = sys.stdin.readline().strip()

print(f"Hello, {name}!")
```

## Error Handling

### Handling EOF

```python
# Graceful EOF handling
try:
    name = input("Enter name: ")
    print(f"Hello, {name}!")
except EOFError:
    print("No input provided")
    sys.exit(1)
```

### Handling Invalid Input

```python
# Robust input handling
def safe_input(prompt):
    try:
        return input(prompt)
    except EOFError:
        return None
    except KeyboardInterrupt:
        print("\nInput cancelled")
        return None

name = safe_input("Enter name: ")
if name is None:
    print("No valid input received")
else:
    print(f"Hello, {name}!")
```

## Performance Considerations

### Buffered vs Unbuffered

```python
# Unbuffered input (immediate)
import sys
sys.stdin.reconfigure(line_buffering=True)

# Buffered input (more efficient for large files)
import sys
sys.stdin.reconfigure(line_buffering=False)
```

### Reading Large Files

```python
# Efficient reading of large files
import sys

for line in sys.stdin:
    # Process each line
    line = line.strip()
    if line:
        print(f"Processing: {line}")
```

## Best Practices

### 1. Always Provide Prompts

```python
# Good
name = input("Enter your name: ")

# Avoid
name = input()  # User doesn't know what to enter
```

### 2. Validate Input

```python
# Always validate user input
def get_positive_number():
    while True:
        try:
            num = int(input("Enter a positive number: "))
            if num > 0:
                return num
            print("Number must be positive")
        except ValueError:
            print("Please enter a valid number")
```

### 3. Handle Edge Cases

```python
# Handle empty input, EOF, and interruptions
def robust_input(prompt):
    try:
        value = input(prompt).strip()
        return value if value else None
    except (EOFError, KeyboardInterrupt):
        return None
```

## Related Concepts

- [[wiki:variable]] - Storing input values in variables
- [[wiki:parsing]] - Converting input strings to data types
- [[wiki:validation]] - Input validation techniques
- [[wiki:error-handling]] - Handling input errors gracefully
