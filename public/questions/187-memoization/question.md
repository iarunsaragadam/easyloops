# Memoization

## Problem Statement

You are given an amount of money and a set of coin denominations. Write a program to count the number of different ways you can make the given amount using the available coins. You can use each coin denomination unlimited times.

This is a classic dynamic programming problem that demonstrates the power of memoization. A naive recursive solution will have exponential time complexity and will timeout for larger inputs, while a memoized solution can solve the problem efficiently.

For example, if you have amount = 4 and coins = [1, 2, 3], the different ways are:
- 1+1+1+1 = 4
- 1+1+2 = 4  
- 1+3 = 4
- 2+2 = 4

So the answer is 4 different ways.

## Input Format

The input consists of 1 line:
```
Line 1: amount coin1 coin2 ... coinN
```

Where:
- `amount` is the target amount (integer)
- `coin1 coin2 ... coinN` are the available coin denominations (space-separated integers)

## Test Cases
**Input (`input.txt`):**
```
4 1 2 3
```

**Expected Output (`expected.txt`):**
```
7
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand memoization as an optimization technique for recursive algorithms
- Learn to identify problems with overlapping subproblems
- Practice converting naive recursive solutions to memoized versions
- Analyze time complexity improvements with memoization
- Implement dynamic programming solutions using top-down approach

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    line = input().strip()
    parts = line.split()
    amount = int(parts[0])
    coins = list(map(int, parts[1:]))
    
    # Implement memoized solution here
    def count_ways(remaining, memo=None):
        if memo is None:
            memo = {}
        # Your memoization logic here
        pass
    
    result = count_ways(amount)
    print(result)
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    parts := strings.Fields(scanner.Text())
    
    amount, _ := strconv.Atoi(parts[0])
    coins := make([]int, len(parts)-1)
    for i := 1; i < len(parts); i++ {
        coins[i-1], _ = strconv.Atoi(parts[i])
    }
    
    // Implement memoized solution here
    memo := make(map[int]int)
    result := countWays(amount, coins, memo)
    fmt.Println(result)
}
```

## Constraints
- 0 ≤ amount ≤ 1000
- 1 ≤ number of coins ≤ 20
- 1 ≤ coin denomination ≤ 100
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- Start with a naive recursive solution, then optimize with memoization
- Base cases: if amount = 0, there's 1 way (empty set); if amount < 0, there are 0 ways
- For each coin, recursively solve for (amount - coin_value)
- Use a dictionary/map to store previously computed results
- The key insight: the number of ways to make amount X is independent of how we got to X
- Without memoization, this problem has exponential time complexity O(c^n) where c is number of coins and n is amount
- With memoization, time complexity becomes O(amount × number_of_coins)
