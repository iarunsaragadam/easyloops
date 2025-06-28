# Lambda functions/anonymous functions

## Problem Statement

You are working with a data processing system that needs to apply various operations on lists of numbers using lambda functions (anonymous functions). Lambda functions are short, inline functions that can be defined without a name and are particularly useful for functional programming operations like `filter`, `map`, `sort`, and `reduce`.

Your task is to implement a system that can process a list of integers using one of four types of operations, each utilizing lambda functions:

1. **Filter**: Remove elements that don't meet a specific condition
2. **Map**: Transform each element using a mathematical operation
3. **Sort**: Arrange elements using a custom sorting criterion
4. **Reduce**: Combine all elements into a single result value

This problem demonstrates the power and flexibility of lambda functions in data processing scenarios commonly found in data analysis, functional programming, and algorithmic problem-solving.

## Input Format

The input consists of 4 lines:
```
Line 1: n (integer, number of elements in the list)
Line 2: n space-separated integers
Line 3: operation_type (string: "filter", "map", "sort", or "reduce")
Line 4: operation_parameter (string: specific operation to perform)
```

**Operation Parameters:**
- **Filter operations**: "even", "odd", "positive", "negative", "greater_X", "less_X" (where X is a number)
- **Map operations**: "square", "double", "abs", "negate", "add_X", "multiply_X" (where X is a number)
- **Sort operations**: "ascending", "descending", "abs_ascending", "abs_descending", "last_digit", "digit_sum"
- **Reduce operations**: "sum", "product", "max", "min", "count_positive", "count_even"

## Test Cases
**Input (`input.txt`):**
```
5
1 2 3 4 5
filter
even
```

**Expected Output (`expected.txt`):**
```
2 4
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the use of lambda functions for inline operations
- Understand functional programming concepts (`filter`, `map`, `reduce`)
- Practice using lambda functions with built-in Python functions
- Learn to process data efficiently using anonymous functions
- Develop skills in conditional logic within lambda expressions
- Understand the difference between lambda functions and regular functions

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    numbers = list(map(int, input().strip().split()))
    operation = input().strip()
    parameter = input().strip()
    
    if operation == "filter":
        # Use lambda with filter() function
        # Example: filter(lambda x: x % 2 == 0, numbers)
        pass
    elif operation == "map":
        # Use lambda with map() function  
        # Example: map(lambda x: x * x, numbers)
        pass
    elif operation == "sort":
        # Use lambda with sorted() function
        # Example: sorted(numbers, key=lambda x: abs(x))
        pass
    elif operation == "reduce":
        # Use lambda with reduce() function
        # Example: reduce(lambda x, y: x + y, numbers)
        pass
```

### Go Example Structure:
```go
// Go doesn't have lambda functions in the same way as Python
// Use anonymous functions and function types instead
func solve() {
    // Read input
    // Use function literals (anonymous functions) where appropriate
    // Example: sort.Slice(numbers, func(i, j int) bool { return numbers[i] < numbers[j] })
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of elements)
- -10,000 ≤ each number ≤ 10,000
- All operation types and parameters are guaranteed to be valid
- For "greater_X" and "less_X" operations: -1000 ≤ X ≤ 1000
- For "add_X" and "multiply_X" operations: -100 ≤ X ≤ 100
- Time limit: 1 second
- Memory limit: 256 MB

## Hints
- **Hint 1**: Lambda functions are perfect for simple, one-line operations that you use once
- **Hint 2**: The `filter()` function returns an iterator, so convert it to a list if needed
- **Hint 3**: For reduce operations, you'll need to import `functools.reduce` in Python
- **Hint 4**: When sorting by custom criteria, use the `key` parameter with a lambda function
- **Hint 5**: For string operations like "greater_5", use `split("_")` to extract the number
- **Hint 6**: Lambda functions can access variables from their enclosing scope (closures)
