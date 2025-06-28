# Graph Traversal (DFS) - Connected Components

## Problem Statement

Given an undirected graph with `n` nodes (numbered from 1 to n) and `m` edges, find all connected components using Depth-First Search (DFS). A connected component is a maximal set of nodes where there is a path between any two nodes in the set.

Your task is to:
1. Count the total number of connected components
2. List all nodes in each connected component (sorted in ascending order)
3. Output the components sorted by their smallest node

This problem demonstrates the fundamental application of DFS in graph analysis and is commonly used in network analysis, social graphs, and clustering problems.

## Input Format

The input consists of multiple lines:
```
Line 1: n m (number of nodes and edges)
Next m lines: u v (edge between nodes u and v)
```

## Test Cases
**Input (`input.txt`):**
```
5 4
1 2
2 3
4 5
1 3
```

**Expected Output (`expected.txt`):**
```
2
1 2 3
4 5
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master Depth-First Search (DFS) algorithm implementation
- Understand graph representation using adjacency lists
- Learn to identify and extract connected components
- Practice recursive thinking and backtracking
- Apply DFS to solve real-world connectivity problems
- Understand time and space complexity of graph algorithms

## Implementation Guidelines

### Algorithm Approach:
1. **Graph Representation**: Use adjacency list to represent the undirected graph
2. **DFS Implementation**: Implement recursive DFS to traverse connected nodes
3. **Component Detection**: For each unvisited node, start a new DFS to find its component
4. **Result Formatting**: Sort nodes within components and sort components by smallest node

### Python Example Structure:
```python
from collections import defaultdict

def dfs(graph, node, visited, component):
    # Mark node as visited and add to current component
    # Recursively visit all unvisited neighbors
    pass

def solve():
    # Read n (nodes) and m (edges)
    # Build adjacency list representation
    # Find all connected components using DFS
    # Output results in required format
    pass
```

### Go Example Structure:
```go
func dfs(graph map[int][]int, node int, visited map[int]bool, component *[]int) {
    // Mark node as visited and add to current component
    // Recursively visit all unvisited neighbors
}

func solve() {
    // Read n (nodes) and m (edges)
    // Build adjacency list representation
    // Find all connected components using DFS
    // Output results in required format
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of nodes)
- 0 ≤ m ≤ n*(n-1)/2 (number of edges)
- 1 ≤ u, v ≤ n (node indices)
- No self-loops or duplicate edges
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Start Simple**: Begin with a small example and trace through the DFS manually
- **Graph Representation**: Use adjacency list (dictionary/map of lists) for efficient neighbor lookup
- **Visited Tracking**: Keep a boolean array/set to track visited nodes
- **Recursive DFS**: The DFS function should mark current node as visited and recursively visit neighbors
- **Component Collection**: Start a new component for each unvisited node
- **Edge Cases**: Handle graphs with no edges (all nodes are isolated components)
- **Sorting**: Remember to sort nodes within each component and sort components by their smallest node
- **Debugging**: Print intermediate steps to verify your DFS traversal order
