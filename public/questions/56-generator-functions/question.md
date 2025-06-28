# Fibonacci Generator

## Problem Statement

Write a program that uses a **generator function** to produce the first N Fibonacci numbers. This problem teaches you one of the most powerful features of modern programming languages: generators that yield values on-demand.

The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones:
- F(0) = 0
- F(1) = 1  
- F(n) = F(n-1) + F(n-2) for n > 1

For example:
- If N = 5, output: 0, 1, 1, 2, 3 (each on a new line)
- If N = 8, output: 0, 1, 1, 2, 3, 5, 8, 13 (each on a new line)

**Why generators?** Unlike computing all Fibonacci numbers at once and storing them in memory, a generator produces each number only when needed. This is memory-efficient and demonstrates the concept of "lazy evaluation" - a fundamental programming paradigm.

## Input Format

The input consists of 1 line:
```
Line 1: A positive integer N (1 ≤ N ≤ 1000)
```

## Output Format

Print N lines, where each line contains one Fibonacci number in sequence, starting from F(0).

## Test Cases

**Basic Test Case (`input1.txt`):**
```
5
```

**Expected Output (`expected1.txt`):**
```
0
1
1
2
3
```

**Edge Case (`input2.txt`):**
```
1
```

**Expected Output (`expected2.txt`):**
```
0
```

**Performance Test Case (`input3.txt`):**
```
100
```

**Expected Output (`expected3.txt`):**
```
0
1
1
2
3
5
8
13
21
34
55
89
144
233
377
610
987
1597
2584
4181
6765
10946
17711
28657
46368
75025
121393
196418
317811
514229
832040
1346269
2178309
3524578
5702887
9227465
14930352
24157817
39088169
63245986
102334155
165580141
267914296
433494437
701408733
1134903170
1836311903
2971215073
4807526976
7778742049
12586269025
20365011074
32951280099
53316291173
86267571272
139583862445
225851433717
365435296162
591286729879
956722026041
1548008755920
2504730781961
4052739537881
6557470319842
10610209857723
17167680177565
27777890035288
44945570212853
72723460248141
117669030460994
190392490709135
308061521170129
498454011879264
806515533049393
1304969544928657
2111485077978050
3416454622906707
5527939700884757
8944394323791464
14472334024676221
23416728348467685
37889062373143906
61305790721611591
99194853094755497
160500643816367088
259695496911122585
420196140727489673
679891637638612258
1100087778366101931
1779979416004714189
2880067194370816120
4660046610375530309
7540113804746346429
12200160415121876738
19740274219868223167
31940434634990099905
51680708854858323072
83621143489848422977
135301852344706746049
218922995834555169026
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the concept of **generator functions** and the `yield` keyword
- Understand **lazy evaluation** and on-demand computation
- Learn memory-efficient programming patterns for large sequences
- Practice the difference between generators and regular functions
- Understand **stateful iteration** and how generators maintain state between calls
- Apply generators to solve classic algorithmic problems efficiently

## Implementation Guidelines

### Python Example Structure:
```python
def fibonacci_generator():
    """
    Generator function that yields Fibonacci numbers indefinitely.
    This demonstrates the core concept of generators.
    """
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def solve():
    n = int(input().strip())
    
    # Create the generator instance
    fib_gen = fibonacci_generator()
    
    # Use the generator to get first n numbers
    for i in range(n):
        print(next(fib_gen))
```

### Go Example Structure:
```go
// Note: Go doesn't have built-in generators like Python
// This shows a channel-based approach that mimics generator behavior
func fibonacci_generator() <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        a, b := 0, 1
        for {
            ch <- a
            a, b = b, a+b
        }
    }()
    return ch
}

func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    fib_gen := fibonacci_generator()
    for i := 0; i < n; i++ {
        fmt.Println(<-fib_gen)
    }
}
```

## Constraints
- 1 ≤ N ≤ 1000
- Time limit: 2 seconds
- Memory limit: 256 MB
- **Must use a generator/iterator pattern** (not pre-compute all values)
- For large N values, your solution should not store all Fibonacci numbers in memory

## Hints
- **Hint 1**: A generator function uses `yield` instead of `return` to produce values one at a time
- **Hint 2**: The generator maintains its state between calls - local variables persist
- **Hint 3**: Use `next()` to get the next value from a generator, or iterate with a for loop
- **Hint 4**: Your generator should track the last two Fibonacci numbers to compute the next one
- **Hint 5**: The generator can be infinite - it doesn't need to know when to stop, the caller controls that
- **Hint 6**: Test with small values first (N=1, N=2, N=5) before trying larger inputs
