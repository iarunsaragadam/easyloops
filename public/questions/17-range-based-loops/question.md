# Sum of Array Elements with Range-based Loops

## Problem Statement

Given an array of integers, calculate the sum of all elements using range-based loops (also known as enhanced for loops or for-each loops). This problem teaches you the difference between traditional index-based iteration and modern range-based iteration.

**Traditional approach (index-based):**
```python
for i in range(len(numbers)):
    total += numbers[i]  # Access by index
```

**Range-based approach (what you should use):**
```python
for num in numbers:
    total += num  # Access element directly
```

Range-based loops are:
- **More readable**: Code intent is clearer
- **Less error-prone**: No risk of index out-of-bounds errors
- **More efficient**: No index calculations needed
- **More pythonic**: Following language best practices

For example:
- If the array is [1, 2, 3, 4, 5], the sum should be 15
- If the array is [42], the sum should be 42
- If the array is [-2, 5, -3, 7], the sum should be 7

## Input Format

The input consists of 2 lines:
```
Line 1: n (number of elements in the array)
Line 2: n space-separated integers (the array elements)
```

## Output Format

Print a single integer: the sum of all elements in the array.

## Test Cases

**Basic Test Case (`input.txt`):**
```
5
1 2 3 4 5
```

**Expected Output (`expected.txt`):**
```
15
```

**Edge Case (`input2.txt`):**
```
1
42
```

**Expected Output (`expected2.txt`):**
```
42
```

**Performance Test Case (`input3.txt`):**
```
1000
1 2 3 4 5 ... 1000
```

**Expected Output (`expected3.txt`):**
```
500500
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master range-based loop syntax and benefits
- Understand when to use range-based vs index-based loops
- Practice direct element access instead of index-based access
- Learn modern, readable iteration patterns
- Understand performance implications of different loop styles
- Build foundation for more advanced iteration patterns

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    numbers = list(map(int, input().strip().split()))
    
    # Use range-based loop (for element in collection)
    total = 0
    for num in numbers:  # NOT: for i in range(len(numbers))
        total += num     # NOT: total += numbers[i]
    
    print(total)
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    numbers := make([]int, n)
    for i := 0; i < n; i++ {
        fmt.Scanf("%d", &numbers[i])
    }
    
    total := 0
    for _, num := range numbers {  // Range-based loop in Go
        total += num
    }
    
    fmt.Println(total)
}
```

### Key Concepts:
- **Python**: Use `for element in collection` instead of `for i in range(len(collection))`
- **Go**: Use `for _, element := range collection` for range-based iteration
- **Focus**: Direct element access rather than index-based access
- **Benefit**: Code is more readable and less prone to errors

## Constraints
- 1 ≤ n ≤ 100,000
- -1,000,000 ≤ each array element ≤ 1,000,000
- Time limit: 1 second
- Memory limit: 256 MB
- You must use range-based loops (not index-based loops)

## Hints
- **Hint 1**: Read the number of elements first, then read all elements into a list/array
- **Hint 2**: Use `for element in collection` syntax, not `for i in range(len(collection))`
- **Hint 3**: Initialize your sum to 0 before starting the loop
- **Hint 4**: In Python, `list(map(int, input().split()))` converts space-separated numbers to a list
- **Hint 5**: Range-based loops eliminate the need for manual indexing - let the language handle iteration for you
