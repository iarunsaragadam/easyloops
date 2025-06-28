# Tail Recursion Optimization - Fibonacci Sequence

## Problem Statement

Implement an efficient solution to calculate the nth Fibonacci number using **tail recursion optimization**. This problem demonstrates the significant performance difference between naive recursion and optimized recursive approaches.

The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1  
- F(n) = F(n-1) + F(n-2) for n > 1

Your task is to write a program that calculates F(n) efficiently using tail recursion, where each recursive call is the last operation performed (in tail position). This allows for compiler/interpreter optimizations that can reduce stack space usage and improve performance dramatically compared to naive recursive approaches.

**Performance Requirements:**
- Your solution must handle large values of n (up to 100+) efficiently
- Naive recursive solutions with O(2^n) complexity will timeout on performance test cases
- Expected time complexity: O(n) or better
- Expected space complexity: O(n) for recursive call stack or O(1) for iterative approaches

## Input Format

The input consists of 1 line:
```
Line 1: A non-negative integer n (0 ≤ n ≤ 100)
```

## Test Cases
**Input (`input1.txt`):**
```
10
```

**Expected Output (`expected1.txt`):**
```
55
```

**Input (`input2.txt`):**
```
0
```

**Expected Output (`expected2.txt`):**
```
0
```

**Input (`input3.txt`):**
```
45
```

**Expected Output (`expected3.txt`):**
```
1134903170
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand tail recursion optimization and its benefits
- Learn the difference between naive recursion and optimized recursive approaches
- Experience the dramatic performance improvements possible with proper algorithm design
- Practice implementing efficient recursive solutions
- Understand when and how to optimize recursive algorithms for better performance

## Implementation Guidelines

### Python Example Structure:
```python
def fibonacci_helper(n, a, b):
    # Tail recursive helper function
    if n == 0:
        return a
    return fibonacci_helper(n - 1, b, a + b)

def solve():
    n = int(input().strip())
    
    if n <= 1:
        print(n)
    else:
        result = fibonacci_helper(n, 0, 1)
        print(result)
```

### Go Example Structure:
```go
func fibonacciHelper(n, a, b int) int {
    if n == 0 {
        return a
    }
    return fibonacciHelper(n-1, b, a+b)
}

func solve() {
    var n int
    fmt.Scan(&n)
    
    if n <= 1 {
        fmt.Println(n)
    } else {
        result := fibonacciHelper(n, 0, 1)
        fmt.Println(result)
    }
}
```

## Constraints
- 0 ≤ n ≤ 100
- Time limit: 2 seconds per test case
- Memory limit: 256 MB
- Naive recursive solutions with O(2^n) complexity will exceed time limit for n ≥ 35

## Hints
- **Tail Recursion**: Make sure the recursive call is the last operation in your function
- **Accumulator Pattern**: Use additional parameters to carry intermediate results
- **Base Case**: Handle F(0) = 0 and F(1) = 1 carefully
- **Performance**: Your solution should complete in linear time, not exponential time
- **Alternative**: If your language doesn't optimize tail recursion, consider an iterative approach with O(1) space
