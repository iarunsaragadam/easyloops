# Loop control (break, continue)

## Problem Statement

Write a program that processes a sequence of integers using loop control statements (`break` and `continue`). Your task is to implement a number processing system that follows these specific rules:

1. **Read integers** from input one by one in a loop
2. **Terminate immediately** when you encounter a negative number (use `break`)
3. **Skip even numbers** without processing them (use `continue`)
4. **Accumulate the sum** of all odd positive numbers
5. **Output the final sum** after the loop terminates

This problem demonstrates the essential loop control concepts:
- **`break`**: Exits the loop completely when a termination condition is met
- **`continue`**: Skips the remaining code in the current iteration and moves to the next iteration
- **Loop logic**: Combining conditional statements with loop control for complex processing

For example, given the sequence: 1, 2, 3, 4, 5, -1
- Process: 1 (odd, add to sum), skip 2 (even), 3 (odd, add to sum), skip 4 (even), 5 (odd, add to sum), -1 (negative, break)
- Result: 1 + 3 + 5 = 9

## Input Format

The input consists of multiple lines, each containing a single integer:
```
Line 1: First integer
Line 2: Second integer
...
Line n: Negative integer (termination signal)
```

**Note**: The input will always end with a negative number that signals termination.

## Test Cases
**Input (`input.txt`):**
```
1
3
5
-1
```

**Expected Output (`expected.txt`):**
```
9
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the `break` statement for early loop termination
- Master the `continue` statement for skipping iterations
- Understand when and how to use each loop control statement
- Combine loop control with conditional logic for complex processing
- Practice reading input until a termination condition is met
- Develop pattern recognition for loop control use cases

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    total = 0
    while True:
        n = int(input())
        if n < 0:  # termination condition
            break
        if n % 2 == 0:  # skip condition
            continue
        # process odd numbers
        total += n
    print(total)
```

### Go Example Structure:
```go
func solve() {
    total := 0
    for {
        var n int
        fmt.Scanf("%d", &n)
        if n < 0 {  // termination condition
            break
        }
        if n%2 == 0 {  // skip condition
            continue
        }
        // process odd numbers
        total += n
    }
    fmt.Println(total)
}
```

## Constraints
- Input integers range: -1000 ≤ n ≤ 1000
- Number of integers before termination: 1 ≤ count ≤ 1000
- The input will always end with exactly one negative number
- Time complexity: O(n) where n is the number of input integers
- Space complexity: O(1) constant space

## Hints
- Use an infinite loop (`while True` in Python, `for` in Go) since you don't know how many numbers you'll process
- Check for the termination condition (`n < 0`) first and use `break` to exit
- Check for the skip condition (`n % 2 == 0`) next and use `continue` to skip even numbers
- Only process odd positive numbers by adding them to your running sum
- Remember to output the final sum after the loop terminates
