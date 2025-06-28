# Profiling and Benchmarking

## Problem Statement

Write a program that demonstrates profiling and benchmarking techniques by implementing and comparing two different algorithms for finding duplicate numbers in an array. This problem will teach you how to measure algorithm performance and understand the practical differences between O(n²) and O(n) time complexities.

Your program should:

1. **Implement two algorithms** for finding duplicates:
   - **Naive approach**: Use nested loops to compare each element with every other element (O(n²) time complexity)
   - **Optimized approach**: Use a hash set to track seen elements (O(n) time complexity)

2. **Measure execution time** for both algorithms using high-precision timing

3. **Compare performance** and determine which algorithm is faster

4. **Output results** in the specified format showing duplicates found and performance metrics

This problem simulates real-world performance analysis where you need to choose between different algorithmic approaches based on their efficiency characteristics.

## Input Format

The input consists of 1 line:
```
Line 1: space-separated integers representing the array to analyze
```

## Test Cases
**Input (`input.txt`):**
```
1 2 3 2 4 5 3 6
```

**Expected Output (`expected.txt`):**
```
Duplicates: 2 3
Naive Time: [TIME]ms
Optimized Time: [TIME]ms
Faster: Optimized
Speedup: [RATIO]x
```

**Note**: This question includes 133 comprehensive test cases (input1.txt through input133.txt) covering basic scenarios, edge cases, performance tests, complex patterns, and corner cases. See `testcases.md` for detailed documentation of all test cases.

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Learn how to profile and benchmark code execution time
- Understand practical differences between O(n²) and O(n) algorithms
- Practice implementing the same problem with different algorithmic approaches
- Learn to measure and compare algorithm performance quantitatively
- Understand when optimization is necessary based on input size
- Practice using timing functions for performance measurement

## Implementation Guidelines

### Python Example Structure:
```python
import time

def solve():
    # Read input
    arr = list(map(int, input().split()))
    
    # Implement naive O(n²) approach
    def find_duplicates_naive(arr):
        duplicates = []
        # Use nested loops to find duplicates
        # Add timing measurement
        return duplicates
    
    # Implement optimized O(n) approach  
    def find_duplicates_optimized(arr):
        # Use hash set for O(1) lookups
        # Add timing measurement
        return duplicates
    
    # Benchmark both approaches
    # Compare times and determine faster algorithm
    # Output results in required format
```

### Go Example Structure:
```go
import (
    "time"
    "fmt"
)

func solve() {
    // Read input array
    
    // Implement naive approach with timing
    start := time.Now()
    duplicatesNaive := findDuplicatesNaive(arr)
    naiveTime := time.Since(start)
    
    // Implement optimized approach with timing
    start = time.Now()
    duplicatesOpt := findDuplicatesOptimized(arr)
    optTime := time.Since(start)
    
    // Compare and output results
}
```

## Constraints
- Array length: 1 ≤ n ≤ 10,000
- Element values: -1,000,000 ≤ elements ≤ 1,000,000
- At least one duplicate must exist in the array
- Output times in milliseconds with 3 decimal places precision
- Speedup ratio should be calculated as slower_time / faster_time
- Duplicates should be output in sorted ascending order

## Hints
- Use `time.perf_counter()` in Python or `time.Now()` in Go for high-precision timing
- For the naive approach, use two nested loops to compare each pair of elements
- For the optimized approach, use a set/map to track which numbers you've already seen
- Remember to sort the duplicate numbers before outputting them
- The performance difference will be more noticeable with larger input sizes
- Handle the case where timing might be very small (close to 0) when calculating ratios
