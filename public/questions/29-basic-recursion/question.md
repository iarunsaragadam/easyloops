# Basic recursion

## Problem Statement

Write a program that calculates the factorial of a given number using recursion. The factorial of a non-negative integer n is the product of all positive integers less than or equal to n.

Your program should:

1. Read a non-negative integer n from input
2. Calculate n! (n factorial) using a recursive function
3. Output the result

**Mathematical Definition:**
- 0! = 1 (by definition)
- 1! = 1
- n! = n × (n-1)! for n > 1

**Example calculations:**
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- 3! = 3 × 2 × 1 = 6
- 0! = 1

This problem introduces the fundamental concepts of recursion: base cases and recursive cases.

## Input Format

The input consists of 1 line:
```
Line 1: A non-negative integer n (where 0 ≤ n ≤ 20)
```

## Test Cases
**Input (`input.txt`):**
```
5
```

**Expected Output (`expected.txt`):**
```
120
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the fundamental concept of recursion
- Learn to identify base cases and recursive cases
- Practice implementing recursive functions
- Understand how the call stack works in recursion
- Learn when recursion is appropriate vs iterative solutions

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    def factorial(num):
        # Base case: 0! = 1 and 1! = 1
        if num <= 1:
            return 1
        
        # Recursive case: n! = n * (n-1)!
        return num * factorial(num - 1)
    
    result = factorial(n)
    print(result)
```

### Go Example Structure:
```go
func solve() {
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    result := factorial(n)
    fmt.Println(result)
}

func factorial(n int) int {
    // Base case
    if n <= 1 {
        return 1
    }
    
    // Recursive case
    return n * factorial(n-1)
}
```

## Constraints
- Input will be a non-negative integer n where 0 ≤ n ≤ 20
- The factorial result will fit within standard integer types
- You must use recursion (not iteration) to solve this problem

## Hints
- Start by identifying the base case: What is the smallest input that doesn't need recursion?
- For the recursive case, think about how factorial(n) relates to factorial(n-1)
- Remember that 0! is defined as 1, not 0
- Test your solution with small values first (0, 1, 2, 3) before trying larger ones
- Consider what happens if you forget the base case - infinite recursion!
