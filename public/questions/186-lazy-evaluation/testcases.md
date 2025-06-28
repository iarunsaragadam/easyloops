# Test Cases for Lazy Evaluation

## Test Case Structure
This question uses a **3-line input format** for lazy number stream processing.

### Input Format Pattern:
```
Line 1: N (integer, sequence size)
Line 2: N space-separated integers  
Line 3: K (integer, number of output elements requested)
```

### Output Format Pattern:
```
K space-separated integers (transformed values)
```
OR
```
(empty line if K=0)
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
5
1 2 3 4 5
3
```
**Expected Output (`expected.txt`):**
```
12 14 16
```
**Explanation:** Transform [1,2,3,4,5] → double → [2,4,6,8,10] → add 10 → [12,14,16,18,20], take first 3.

## Test Case 2: Edge - Zero Output
**Input (`input2.txt`):**
```
3
10 20 30
0
```
**Expected Output (`expected2.txt`):**
```

```
**Explanation:** K=0 means no output elements requested, demonstrating lazy evaluation benefit.

## Test Case 3: Performance - Large Input, Small Output
**Input (`input3.txt`):**
```
100000
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100
5
```
**Expected Output (`expected3.txt`):**
```
12 14 16 18 20
```
**Explanation:** Large input (100000 elements) but only 5 output elements needed. Lazy evaluation should only process first 5 input elements.

## Test Case Creation Rules
### Input Validation Rules:
1. Line 1 must parse as positive integer N
2. Line 2 must contain exactly N space-separated integers
3. Line 3 must parse as non-negative integer K ≤ N
4. Each input integer must be in range [-1000, 1000]

### Output Format Rules:
1. If K > 0: exactly K space-separated integers on one line
2. If K = 0: single empty line
3. No trailing spaces on output line
4. Single newline at end

## Language-Specific Considerations
### Python Considerations:
- Use generators (`yield`) for true lazy evaluation
- `enumerate()` with break for limiting output
- Memory-efficient: don't load entire transformed sequence

### Go Considerations:  
- Process elements one-by-one in loop with early termination
- Use `make([]int, 0, k)` for pre-allocated slice
- Avoid creating intermediate slices for entire sequence

### Performance Requirements:
- Should handle N=10^6, K=1 in under 100ms
- Memory usage should be O(K) not O(N)
- Lazy solution should be significantly faster than eager for large N, small K

## Validation Checklist
- [ ] Input has exactly 3 lines
- [ ] N matches number of integers in line 2
- [ ] K ≤ N and K ≥ 0
- [ ] Output has exactly K integers (or empty if K=0)
- [ ] Each output integer equals (2 * input[i] + 10) for i in [0, K)
- [ ] No trailing spaces in output
- [ ] Performance test completes quickly with lazy evaluation

## Automated Test Case Generation
```python
import random

def generate_test_case():
    # Random test case generator
    n = random.randint(1, 1000)
    numbers = [random.randint(-1000, 1000) for _ in range(n)]
    k = random.randint(0, n)
    
    input_content = f"{n}\n{' '.join(map(str, numbers))}\n{k}\n"
    
    # Generate expected output
    transformed = [num * 2 + 10 for num in numbers[:k]]
    expected_content = ' '.join(map(str, transformed)) + '\n' if k > 0 else '\n'
    
    return input_content, expected_content

def generate_performance_test_case():
    # Large N, small K for performance testing
    n = 100000
    numbers = list(range(1, n + 1))
    k = random.randint(1, 10)
    
    input_content = f"{n}\n{' '.join(map(str, numbers))}\n{k}\n"
    
    transformed = [num * 2 + 10 for num in numbers[:k]]
    expected_content = ' '.join(map(str, transformed)) + '\n'
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split('\n')
    assert len(lines) == 3, "Input must have exactly 3 lines"
    
    n = int(lines[0])
    numbers = list(map(int, lines[1].split()))
    k = int(lines[2])
    
    assert len(numbers) == n, f"Expected {n} numbers, got {len(numbers)}"
    assert 0 <= k <= n, f"K={k} must be between 0 and {n}"
    assert all(-1000 <= num <= 1000 for num in numbers), "Numbers must be in [-1000, 1000]"
    
    # Validate expected output
    if k == 0:
        assert expected_content == '\n', "Expected empty line for K=0"
    else:
        expected_nums = list(map(int, expected_content.strip().split()))
        assert len(expected_nums) == k, f"Expected {k} output numbers"
        
        for i in range(k):
            expected_val = numbers[i] * 2 + 10
            assert expected_nums[i] == expected_val, f"Wrong transformation at position {i}"
```
