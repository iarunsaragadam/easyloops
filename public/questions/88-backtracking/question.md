# Backtracking: N-Queens Problem

## Problem Statement

The N-Queens problem is a classic backtracking puzzle where you must place N queens on an N×N chessboard such that no two queens can attack each other. Two queens attack each other if they are:
- On the same row
- On the same column  
- On the same diagonal (either direction)

Given an integer N, your task is to find the **number of distinct solutions** to the N-Queens problem.

For example:
- For N=1: There is 1 solution (place the queen anywhere)
- For N=2: There are 0 solutions (impossible to place 2 queens safely)
- For N=4: There are 2 solutions
- For N=8: There are 92 solutions (the classic 8-queens problem)

This problem teaches the fundamental backtracking algorithm pattern: exploring all possible placements, checking constraints at each step, and backtracking when a path leads to a dead end.

## Input Format

The input consists of 1 line:
```
Line 1: A positive integer N (1 ≤ N ≤ 15)
```

## Output Format

Print a single integer: the number of distinct solutions for placing N queens on an N×N board.

## Test Cases

**Basic Test Case (`input1.txt`):**
```
4
```

**Expected Output (`expected1.txt`):**
```
2
```

**Edge Case (`input2.txt`):**
```
1
```

**Expected Output (`expected2.txt`):**
```
1
```

**No Solution Case (`input3.txt`):**
```
2
```

**Expected Output (`expected3.txt`):**
```
0
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the backtracking algorithmic technique
- Understand recursive problem-solving with constraint checking
- Learn to implement state space exploration with pruning
- Practice recognizing when backtracking is the appropriate approach
- Develop skills in constraint satisfaction problems

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    def is_safe(board, row, col):
        # Check if placing queen at (row, col) is safe
        # Check column and diagonals
        for i in range(row):
            if board[i] == col or abs(board[i] - col) == abs(i - row):
                return False
        return True
    
    def backtrack(board, row):
        if row == n:
            return 1  # Found a complete solution
        
        count = 0
        for col in range(n):
            if is_safe(board, row, col):
                board[row] = col
                count += backtrack(board, row + 1)
                # Backtrack happens automatically when function returns
        
        return count
    
    board = [-1] * n  # board[i] = column of queen in row i
    result = backtrack(board, 0)
    print(result)
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    board := make([]int, n)
    for i := range board {
        board[i] = -1
    }
    
    result := backtrack(board, 0, n)
    fmt.Println(result)
}

func isSafe(board []int, row, col int) bool {
    for i := 0; i < row; i++ {
        if board[i] == col || abs(board[i] - col) == abs(i - row) {
            return false
        }
    }
    return true
}

func backtrack(board []int, row, n int) int {
    if row == n {
        return 1
    }
    
    count := 0
    for col := 0; col < n; col++ {
        if isSafe(board, row, col) {
            board[row] = col
            count += backtrack(board, row + 1, n)
        }
    }
    return count
}
```

## Constraints
- 1 ≤ N ≤ 15
- Time limit: 2 seconds
- Memory limit: 256 MB
- For N > 13, ensure your solution is optimized (poor implementations may timeout)

## Hints
- **Hint 1**: Use an array to represent queen positions - `board[row] = col` means queen in row `row` is at column `col`
- **Hint 2**: For each row, try placing a queen in each column and check if it's safe
- **Hint 3**: A position is safe if no previous queen attacks it (same column or diagonal)
- **Hint 4**: Use `abs(board[i] - col) == abs(i - row)` to check diagonal attacks
- **Hint 5**: The base case is when all N queens are placed (row == N)
- **Hint 6**: Count solutions by returning 1 for each complete valid placement
- **Hint 7**: For N=2 and N=3, the answer is 0 (impossible to place queens safely)
