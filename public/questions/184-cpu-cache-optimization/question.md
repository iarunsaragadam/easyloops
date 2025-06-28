# CPU Cache Optimization

## Problem Statement

You are given a matrix of integers and need to calculate the sum of all elements. While this seems straightforward, the way you access memory can dramatically affect performance due to CPU cache behavior.

Modern CPUs use cache hierarchies to speed up memory access. When you access a memory location, nearby memory locations are also loaded into cache (spatial locality). Sequential memory access patterns are cache-friendly and much faster than random access patterns.

Your task is to read a matrix and output the sum of all its elements. The challenge is to implement this efficiently, taking advantage of cache-friendly memory access patterns.

## Input Format

The input consists of multiple lines:
```
Line 1: Two integers N M (matrix dimensions)
Next N lines: M space-separated integers (matrix elements)
```

## Test Cases
**Input (`input.txt`):**
```
3 3
1 2 3
4 5 6
7 8 9
```

**Expected Output (`expected.txt`):**
```
45
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand CPU cache optimization and memory access patterns
- Learn about spatial locality and cache-friendly programming
- Experience performance differences between different memory access patterns
- Practice efficient matrix traversal techniques

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    # Read matrix dimensions
    n, m = map(int, input().split())
    
    # Read matrix and calculate sum using cache-friendly row-major order
    total_sum = 0
    for i in range(n):
        row = list(map(int, input().split()))
        total_sum += sum(row)
    
    print(total_sum)
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    dimensions := strings.Split(scanner.Text(), " ")
    n, _ := strconv.Atoi(dimensions[0])
    m, _ := strconv.Atoi(dimensions[1])
    
    totalSum := 0
    for i := 0; i < n; i++ {
        scanner.Scan()
        row := strings.Split(scanner.Text(), " ")
        for j := 0; j < m; j++ {
            val, _ := strconv.Atoi(row[j])
            totalSum += val
        }
    }
    
    fmt.Println(totalSum)
}
```

## Constraints
- 1 ≤ N, M ≤ 1000
- -1000 ≤ matrix elements ≤ 1000
- Output fits in a 32-bit signed integer
- Time limit: 2 seconds for efficient implementations

## Hints
- Process the matrix in row-major order (row by row) for better cache locality
- Avoid unnecessary matrix storage if you only need to calculate the sum
- Sequential memory access is much faster than random access due to CPU cache behavior
- For very large matrices, accessing elements in column-major order can be significantly slower
