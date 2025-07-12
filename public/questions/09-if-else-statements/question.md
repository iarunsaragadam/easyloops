# If/Else Statements

## Problem Statement

Write a program that demonstrates conditional logic using if/else statements to analyze a number and determine its characteristics. Your program should classify a number based on its sign (positive, negative, or zero) and its parity (even or odd).

## Input Format

The input consists of 1 line:

```
Line 1: Integer number (e.g., -15)
```

## Test Cases

**Input (`input.txt`):**

```
-15
```

**Expected Output (`expected.txt`):**

```
Number: -15
Sign: negative
Parity: odd
Classification: negative odd number
```

**Input (`input2.txt`):**

```
0
```

**Expected Output (`expected2.txt`):**

```
Number: 0
Sign: zero
Parity: even
Classification: zero even number
```

**Input (`input3.txt`):**

```
42
```

**Expected Output (`expected3.txt`):**

```
Number: 42
Sign: positive
Parity: even
Classification: positive even number
```

## Learning Objectives

- Understand if/else conditional statements
- Practice nested conditional logic
- Learn to combine multiple conditions
- Master elif (else if) statements for multiple conditions
- Practice combining logical operations

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    num = int(input())
    print(f"Number: {num}")

    # Determine sign
    if num > 0:
        print("Sign: positive")
    elif num < 0:
        print("Sign: negative")
    else:
        print("Sign: zero")
    
    # Determine parity
    if num % 2 == 0:
        print("Parity: even")
    else:
        print("Parity: odd")
    
    # Combine conditions for classification
    if num > 0 and num % 2 == 0:
        print("Classification: positive even number")
    elif num > 0 and num % 2 == 1:
        print("Classification: positive odd number")
    elif num < 0 and num % 2 == 0:
        print("Classification: negative even number")
    elif num < 0 and num % 2 == 1:
        print("Classification: negative odd number")
    else:
        print("Classification: zero even number")
```

### Go Example Structure:

```go
func solve() {
    scanner.Scan()
    num, _ := strconv.Atoi(scanner.Text())
    
    fmt.Printf("Number: %d\n", num)
    
    // Determine sign
    if num > 0 {
        fmt.Println("Sign: positive")
    } else if num < 0 {
        fmt.Println("Sign: negative")
    } else {
        fmt.Println("Sign: zero")
    }
    
    // Determine parity
    if num%2 == 0 {
        fmt.Println("Parity: even")
    } else {
        fmt.Println("Parity: odd")
    }
    
    // Classification logic...
}
```

## Constraints

- Input will be a valid integer
- Output format must match exactly (including spacing and punctuation)
- Handle the special case of zero correctly (zero is considered even)

## Hints

- Zero is neither positive nor negative
- Zero is considered an even number (0 % 2 == 0)
- Use elif statements to avoid redundant conditions
- Consider the order of your conditions carefully
- Test with positive numbers, negative numbers, and zero
