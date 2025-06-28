# Algorithm Complexity Analysis

## Problem Statement

You are a software engineer tasked with optimizing a data processing system. Your system needs to handle search operations on datasets of varying sizes, and you must choose the most efficient algorithm based on specific constraints.

Given a dataset of size `n`, the number of search queries `q`, available memory limit `M` (in MB), and time limit `T` (in milliseconds), determine which algorithm should be used for optimal performance.

Your system has access to four different search algorithms:

1. **Linear Search**: 
   - Time Complexity: O(n) per query
   - Space Complexity: O(1) additional space
   - No preprocessing required

2. **Hash Table**: 
   - Time Complexity: O(n) preprocessing + O(1) average per query
   - Space Complexity: O(n) additional space
   - Fast queries but high memory usage

3. **Sorted Array** (extra copy):
   - Time Complexity: O(n log n) preprocessing + O(log n) per query  
   - Space Complexity: O(n) additional space
   - Creates a sorted copy of the data

4. **Binary Search** (in-place sort):
   - Time Complexity: O(n log n) preprocessing + O(log n) per query
   - Space Complexity: O(1) additional space
   - Sorts the original data in-place

Your task is to analyze the complexity constraints and select the algorithm that can complete all operations within the given time and memory limits, prioritizing the fastest valid option.

## Input Format

The input consists of 1 line:
```
Line 1: n q M T
```

Where:
- `n` = dataset size (number of integers)
- `q` = number of search queries to perform
- `M` = memory limit in megabytes (MB)
- `T` = time limit in milliseconds (ms)

## Output Format

Output the name of the optimal algorithm:
- `Linear` - for Linear Search
- `Hash` - for Hash Table
- `Sorted` - for Sorted Array with extra copy
- `Binary` - for Binary Search with in-place sorting
- `Impossible` - if no algorithm can satisfy the constraints

## Test Cases
**Input (`input1.txt`):**
```
1000 100 10 1000
```

**Expected Output (`expected1.txt`):**
```
Hash
```

**Explanation:** With 1000 elements and 100 queries, Hash table provides O(1) query time and fits within memory constraints.

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master Big O notation and complexity analysis
- Understand time vs space complexity trade-offs
- Learn to select optimal algorithms based on constraints
- Apply complexity analysis to real-world scenarios
- Analyze preprocessing costs vs query performance
- Understand memory limitations in algorithm design

## Implementation Guidelines

### Key Analysis Steps:
1. **Calculate Memory Requirements:**
   - Original data: n integers × 4 bytes
   - Hash table: n entries × 8 bytes (key + value)
   - Sorted copy: n integers × 4 bytes

2. **Calculate Time Requirements:**
   - Linear: q × n operations
   - Hash: n setup + q operations  
   - Sorted/Binary: n log n setup + q log n operations

3. **Apply Constraints:**
   - Check memory: total_memory ≤ M MB
   - Check time: total_time ≤ T ms
   - Select fastest among valid options

### Python Example Structure:
```python
def solve():
    # Read input
    n, q, M, T = map(int, input().split())
    
    # Calculate memory and time for each algorithm
    # Check constraints
    # Select optimal algorithm
    
    print(selected_algorithm)
```

### Go Example Structure:
```go
func solve() {
    var n, q, M, T int
    fmt.Scanf("%d %d %d %d", &n, &q, &M, &T)
    
    // Calculate complexities and select algorithm
    
    fmt.Println(selectedAlgorithm)
}
```

## Constraints
- 1 ≤ n ≤ 10⁶ (dataset size)
- 1 ≤ q ≤ 10⁶ (number of queries)
- 1 ≤ M ≤ 1000 (memory limit in MB)
- 1 ≤ T ≤ 10000 (time limit in ms)
- Assume each integer takes 4 bytes
- Assume each operation takes approximately 0.001 ms

## Hints
- Start by calculating the memory footprint of each algorithm
- Consider both preprocessing time and query time
- Hash tables offer O(1) queries but use more memory
- In-place sorting saves memory but modifies original data
- When multiple algorithms are valid, choose the fastest one
- Don't forget to account for the space of the original dataset
- Use logarithm properties: log₂(n) for binary operations
