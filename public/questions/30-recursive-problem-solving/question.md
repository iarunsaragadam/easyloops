# Recursive Problem Solving

## Problem Statement

Calculate the nth Fibonacci number using recursion. The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1  
- F(n) = F(n-1) + F(n-2) for n > 1

Your program should read an integer n from input and output the nth Fibonacci number using a recursive approach.

This problem teaches you how to break down a complex problem into smaller subproblems, identify base cases, and implement recursive solutions effectively.

## Input Format

The input consists of 1 line:
```
Line 1: A non-negative integer n (0 ≤ n ≤ 35)
```

## Test Cases
**Input (`input.txt`):**
```
5
```

**Expected Output (`expected.txt`):**
```
5
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand how to identify base cases in recursive problems
- Learn to break complex problems into smaller subproblems
- Practice implementing recursive functions with multiple base cases
- Understand the performance implications of naive recursion
- Develop intuition for when recursion is appropriate

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    def fibonacci(num):
        # Base cases
        if num <= 0:
            return 0
        elif num == 1:
            return 1
        else:
            # Recursive case
            return fibonacci(num - 1) + fibonacci(num - 2)
    
    result = fibonacci(n)
    print(result)
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scan(&n)
    
    var fibonacci func(int) int
    fibonacci = func(num int) int {
        // Base cases
        if num <= 0 {
            return 0
        } else if num == 1 {
            return 1
        } else {
            // Recursive case
            return fibonacci(num-1) + fibonacci(num-2)
        }
    }
    
    result := fibonacci(n)
    fmt.Println(result)
}
```

## Constraints
- 0 ≤ n ≤ 35
- Must use recursive approach (no loops or memoization)
- Output format must match exactly (single integer followed by newline)
- Time limit: 10 seconds per test case

## Hints
- Start by identifying the base cases: what are the simplest inputs that don't require recursion?
- For the recursive case, think about how F(n) relates to previous Fibonacci numbers
- Remember that each recursive call should work on a smaller version of the original problem
- Test with small values first (0, 1, 2, 3) to verify your base cases work correctly
- Be aware that naive recursion becomes slow for larger values due to repeated calculations
