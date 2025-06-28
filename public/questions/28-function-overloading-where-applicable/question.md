# Function Overloading (Where Applicable)

## Problem Statement

Create a calculator program that demonstrates function overloading concepts. Function overloading allows multiple functions with the same name but different parameters. However, not all programming languages support true function overloading.

Your program should implement a calculator that can handle different types of operations based on the input:

1. **Add two integers**: Read two integers and return their sum
2. **Add two floating-point numbers**: Read two floats and return their sum  
3. **Add three numbers**: Read three numbers and return their sum
4. **Add a list of numbers**: Read a count followed by that many numbers, return their sum
5. **Multiply two numbers**: Read two numbers and return their product
6. **Multiply three numbers**: Read three numbers and return their product

**For languages that support function overloading** (like C++, Java, C#):
- Create multiple functions with the same name but different parameter lists
- Demonstrate how the compiler/runtime chooses the correct function

**For languages that don't support function overloading** (like Python, Go, JavaScript):
- Show alternative approaches such as:
  - Using variable arguments (*args, ...args)
  - Using different function names
  - Using type checking within a single function
  - Using default parameters

## Input Format

The input consists of multiple lines:
```
Line 1: Operation type (add_two_int, add_two_float, add_three, add_list, multiply_two, multiply_three)
Line 2+: Numbers for the operation (format depends on operation type)
```

### Operation-specific input formats:
- **add_two_int**: Two integers on separate lines
- **add_two_float**: Two floating-point numbers on separate lines
- **add_three**: Three numbers on separate lines
- **add_list**: First line is count N, followed by N numbers on separate lines
- **multiply_two**: Two numbers on separate lines  
- **multiply_three**: Three numbers on separate lines

## Test Cases
**Input (`input1.txt`):**
```
add_two_int
10
5
```

**Expected Output (`expected1.txt`):**
```
add_two_int(10, 5) = 15
```

**Input (`input2.txt`):**
```
add_two_float
3.14
2.86
```

**Expected Output (`expected2.txt`):**
```
add_two_float(3.14, 2.86) = 6.0
```

**Input (`input3.txt`):**
```
add_list
4
1.5
2.5
3.0
4.0
```

**Expected Output (`expected3.txt`):**
```
add_list([1.5, 2.5, 3.0, 4.0]) = 11.0
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand function overloading concept and its benefits
- Learn which programming languages support function overloading
- Practice alternative approaches for languages without overloading support
- Understand the difference between compile-time and runtime polymorphism
- Learn about variable arguments and flexible function signatures
- Practice working with different data types (integers, floats, lists)

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    operation = input().strip()
    
    if operation == "add_two_int":
        a = int(input())
        b = int(input())
        result = add_numbers(a, b)
        print(f"add_two_int({a}, {b}) = {result}")
    # Handle other operations...

def add_numbers(*args):
    """Python alternative using *args for variable arguments"""
    return sum(args)

def multiply_numbers(*args):
    """Another example using *args"""
    result = 1
    for num in args:
        result *= num
    return result
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    operation := scanner.Text()
    
    switch operation {
    case "add_two_int":
        scanner.Scan()
        a, _ := strconv.Atoi(scanner.Text())
        scanner.Scan()
        b, _ := strconv.Atoi(scanner.Text())
        result := addTwoInts(a, b)
        fmt.Printf("add_two_int(%d, %d) = %d\n", a, b, result)
    // Handle other cases...
    }
}

// Go doesn't support overloading, so use different function names
func addTwoInts(a, b int) int {
    return a + b
}

func addTwoFloats(a, b float64) float64 {
    return a + b
}
```

## Constraints
- Numbers will be in the range -1000 to 1000
- For list operations, count will be between 1 and 100
- Floating-point results should be displayed with at most 1 decimal place precision when needed
- Output format must match exactly (including spaces and punctuation)
- Operation names are case-sensitive

## Hints
- In Python, use `*args` to accept variable number of arguments
- In Go, create separate functions with descriptive names since overloading isn't supported
- Pay attention to the exact output format with parentheses and equals signs
- For floating-point operations, Python's default string conversion is usually sufficient
- Consider how different languages handle the concept of "overloading" differently
- Think about when you might use function overloading vs. other approaches in real-world programming
