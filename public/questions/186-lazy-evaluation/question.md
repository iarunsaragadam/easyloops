# Lazy Evaluation

## Problem Statement

Implement a lazy number stream processor that applies a series of transformations to an input sequence, but only computes the transformations for the elements that are actually requested. This demonstrates the performance benefits of lazy evaluation over eager evaluation.

Given a sequence of integers, your program should:
1. **Double** each number in the sequence
2. **Filter** to keep only even numbers (after doubling, all numbers will be even)
3. **Add 10** to each filtered result
4. **Return only the first K** transformed elements

The key insight is that with lazy evaluation, you should only process as many input elements as needed to produce K output elements, rather than processing the entire input sequence upfront.

## Input Format

The input consists of 3 lines:
```
Line 1: N (number of elements in input sequence)
Line 2: N space-separated integers
Line 3: K (number of elements to output)
```

## Test Cases
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

**Explanation:** 
- Transform [1,2,3,4,5] → double → [2,4,6,8,10] → add 10 → [12,14,16,18,20]
- Return first 3 elements: [12,14,16]

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand lazy evaluation vs eager evaluation
- Learn to use generators and iterators for memory-efficient processing
- Practice performance optimization through deferred computation
- Implement streaming data processing patterns

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    numbers = list(map(int, input().split()))
    k = int(input().strip())
    
    # Use a generator for lazy evaluation
    def lazy_transform(nums):
        for num in nums:
            doubled = num * 2
            # Since all doubled numbers are even, no filtering needed
            yield doubled + 10
    
    # Only compute first k elements
    result = []
    stream = lazy_transform(numbers)
    for i, value in enumerate(stream):
        if i >= k:
            break
        result.append(value)
    
    if result:
        print(' '.join(map(str, result)))
    else:
        print("")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    scanner.Scan()
    numberStrs := strings.Split(scanner.Text(), " ")
    
    scanner.Scan()
    k, _ := strconv.Atoi(scanner.Text())
    
    // Process lazily - only compute what we need
    result := make([]int, 0, k)
    for i := 0; i < n && len(result) < k; i++ {
        num, _ := strconv.Atoi(numberStrs[i])
        transformed := num*2 + 10
        result = append(result, transformed)
    }
    
    // Output
    if len(result) > 0 {
        output := make([]string, len(result))
        for i, val := range result {
            output[i] = strconv.Itoa(val)
        }
        fmt.Println(strings.Join(output, " "))
    } else {
        fmt.Println("")
    }
}
```

## Constraints
- 1 ≤ N ≤ 10^6 (input sequence size)
- 0 ≤ K ≤ N (requested output size)
- -1000 ≤ each input integer ≤ 1000
- Time limit: 1 second
- Memory limit: 256 MB

## Hints
- Use generators/iterators instead of processing the entire input at once
- Only compute transformations for elements you actually need
- For large N and small K, lazy evaluation should be significantly faster than eager evaluation
- The transformation pipeline is: double → add 10 (filtering step is implicit since doubled numbers are always even)
