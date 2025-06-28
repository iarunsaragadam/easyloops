# Linear Search

## Problem Statement

Implement a linear search algorithm to find a target value in an array of integers. Linear search is a fundamental search algorithm that examines each element in the array sequentially until the target is found or the entire array has been searched.

Given an array of integers and a target value, return the **0-based index** of the first occurrence of the target in the array. If the target is not found, return **-1**.

**Example:**
- Array: [5, 2, 8, 6, 1, 9, 4], Target: 6 → Output: 3 (6 is at index 3)
- Array: [10, 20, 30, 40, 50], Target: 25 → Output: -1 (25 is not in the array)
- Array: [42], Target: 42 → Output: 0 (42 is at index 0)

This problem teaches you the most basic search algorithm and helps you understand:
- Sequential data access patterns
- Time complexity analysis (O(n))
- When linear search is appropriate vs. other search algorithms

## Input Format

The input consists of 2 lines:
```
Line 1: Space-separated integers representing the array
Line 2: A single integer representing the target value to search for
```

## Output Format

Print a single integer: the 0-based index of the target if found, or -1 if not found.

## Test Cases

**Basic Test Case (`input.txt`):**
```
5 2 8 6 1 9 4
6
```

**Expected Output (`expected.txt`):**
```
3
```

**Edge Case (`input2.txt`):**
```
10 20 30 40 50
25
```

**Expected Output (`expected2.txt`):**
```
-1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand linear search algorithm and its implementation
- Learn sequential data traversal patterns
- Practice array indexing and element comparison
- Understand time complexity analysis: O(n) time, O(1) space
- Recognize when linear search is the appropriate choice
- Handle edge cases like empty arrays and missing targets

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Read the array from the first line
    arr = list(map(int, input().split()))
    
    # Read the target from the second line
    target = int(input())
    
    # Implement linear search
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

### Go Example Structure:
```go
func solve() {
    // Read array and target
    // Implement linear search loop
    // Return index or -1
}
```

### Key Implementation Points:
1. **Read Input Properly**: Parse the array from the first line and target from the second line
2. **Sequential Search**: Check each element one by one from left to right
3. **Early Return**: Return immediately when target is found (don't continue searching)
4. **Handle Not Found**: Return -1 if the loop completes without finding the target
5. **Index Tracking**: Keep track of the current index as you iterate

## Constraints
- Array length: 1 ≤ n ≤ 100,000
- Array elements: -1,000,000 ≤ arr[i] ≤ 1,000,000
- Target value: -1,000,000 ≤ target ≤ 1,000,000
- Time limit: 1 second
- Memory limit: 256 MB

## Hints
- **Start Simple**: Begin by iterating through the array with a for loop
- **Compare Each Element**: Check if the current element equals the target
- **Track the Index**: Remember to return the index, not the value itself
- **Handle Edge Cases**: Consider what happens when the array is empty or target is not found
- **Time Complexity**: Linear search has O(n) time complexity - it may need to check every element
- **Space Complexity**: Your solution should use O(1) extra space (not counting input)
- **First Occurrence**: If there are duplicates, return the index of the first occurrence
