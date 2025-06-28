# Iterator Patterns: Spiral Matrix Iterator

## Problem Statement

Implement a custom iterator that traverses a 2D matrix in spiral order (clockwise from the outer edge to the inner center). This problem demonstrates the iterator design pattern and helps you understand how to create custom iterable objects.

Your task is to:
1. Read a matrix from standard input
2. Create a custom iterator that implements the iterator protocol
3. Use the iterator to traverse the matrix in spiral order
4. Output all elements in the order they are visited

**Spiral Order Example:**
For a 3×3 matrix:
```
1 2 3
4 5 6  
7 8 9
```
The spiral order is: `1 2 3 6 9 8 7 4 5`

**Traversal Pattern:**
- Start from top-left corner
- Move right across the top row
- Move down the right column  
- Move left across the bottom row
- Move up the left column
- Repeat for inner layers until all elements are visited

## Input Format

The input consists of multiple lines:
```
Line 1: Two integers rows cols (dimensions of the matrix)
Lines 2 to rows+1: cols integers representing each row of the matrix
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
1 2 3 6 9 8 7 4 5
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the iterator design pattern and its importance
- Learn to implement the iterator protocol (`__iter__` and `__next__` methods)
- Practice handling `StopIteration` exceptions properly
- Understand the difference between iterables and iterators
- Learn to create reusable and memory-efficient iteration logic
- Apply iterator patterns to solve algorithmic problems
- Handle edge cases in custom iterator implementations

## Implementation Guidelines

### Python Example Structure:
```python
class SpiralIterator:
    def __init__(self, matrix):
        # Initialize your iterator with the matrix
        # Pre-compute spiral order or set up state for lazy evaluation
        pass
    
    def __iter__(self):
        # Return the iterator object (usually self)
        return self
    
    def __next__(self):
        # Return the next element in spiral order
        # Raise StopIteration when no more elements
        pass

def solve():
    # Read matrix dimensions
    rows, cols = map(int, input().split())
    
    # Read matrix
    matrix = []
    for _ in range(rows):
        row = list(map(int, input().split()))
        matrix.append(row)
    
    # Create and use spiral iterator
    spiral_iter = SpiralIterator(matrix)
    
    # Output elements using the iterator
    result = []
    for element in spiral_iter:
        result.append(str(element))
    
    print(' '.join(result))
```

### Go Example Structure:
```go
type SpiralIterator struct {
    matrix [][]int
    elements []int
    index int
}

func NewSpiralIterator(matrix [][]int) *SpiralIterator {
    // Initialize and compute spiral order
    return &SpiralIterator{
        matrix: matrix,
        elements: computeSpiralOrder(matrix),
        index: 0,
    }
}

func (si *SpiralIterator) HasNext() bool {
    return si.index < len(si.elements)
}

func (si *SpiralIterator) Next() int {
    if !si.HasNext() {
        panic("No more elements")
    }
    element := si.elements[si.index]
    si.index++
    return element
}

func solve() {
    // Implementation here
}
```

## Constraints
- 1 ≤ rows, cols ≤ 1000 (for performance testing, larger matrices up to 1000×1000)
- Matrix elements are integers in the range [-10^9, 10^9]
- Time complexity should be O(rows × cols) for iteration
- Space complexity should be O(rows × cols) for storing results or O(1) for lazy evaluation
- Your iterator must properly implement the iterator protocol
- Handle edge cases: 1×1 matrices, single row/column matrices

## Hints
- **Start Simple**: Begin with the basic spiral traversal algorithm before implementing the iterator
- **Iterator Protocol**: Remember that `__iter__()` returns the iterator object and `__next__()` returns the next value
- **StopIteration**: Raise `StopIteration` when there are no more elements to iterate over
- **State Management**: Keep track of your current position and boundaries (top, bottom, left, right)
- **Direction Control**: You'll need to change direction four times per spiral layer (right → down → left → up)
- **Edge Cases**: Handle empty matrices, single element matrices, and non-square matrices
- **Boundary Updates**: After each direction, update the appropriate boundary to avoid revisiting elements
- **Memory vs. Lazy**: You can either pre-compute all elements or compute them on-demand for memory efficiency
