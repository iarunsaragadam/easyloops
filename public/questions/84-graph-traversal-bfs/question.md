# Graph Traversal (BFS)

## Problem Statement

You are given an undirected graph and a starting node. Your task is to perform a **Breadth-First Search (BFS)** traversal starting from the given node and return the nodes in the order they were visited.

In BFS, you explore all nodes at the current depth level before moving to nodes at the next depth level. This is achieved using a queue data structure. When multiple neighbors are available, visit them in ascending numerical order to ensure consistent output.

**Real-world applications of BFS include:**
- Finding the shortest path in unweighted graphs
- Level-order traversal of trees
- Social network analysis (finding friends within k degrees)
- Web crawling and network discovery
- Puzzle solving (finding minimum moves)

## Input Format

The input consists of multiple lines:
```
Line 1: n m (number of nodes and edges)
Next m lines: u v (edge between nodes u and v)
Last line: start (starting node for BFS)
```

- Nodes are numbered from 1 to n
- The graph is undirected (edge u-v means both u→v and v→u)
- There are no self-loops or multiple edges between the same pair of nodes

## Test Cases
**Input (`input1.txt`):**
```
4 3
1 2
2 3
3 4
1
```

**Expected Output (`expected1.txt`):**
```
1 2 3 4
```

**Explanation:** Starting from node 1, BFS visits: 1 → 2 → 3 → 4

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand and implement Breadth-First Search (BFS) algorithm
- Work with graph representation using adjacency lists
- Practice queue-based algorithms and level-order processing
- Handle disconnected graph components (only visit reachable nodes)
- Understand time complexity O(V + E) for graph traversal
- Apply BFS concepts to solve shortest path and connectivity problems

## Implementation Guidelines

### Algorithm Steps:
1. **Initialize**: Create a queue with the starting node, mark it as visited
2. **Process**: While queue is not empty:
   - Dequeue the front node and add it to result
   - For each unvisited neighbor (in sorted order):
     - Mark neighbor as visited and enqueue it
3. **Output**: Return the nodes in the order they were processed

### Python Example Structure:
```python
from collections import deque

def solve():
    # Read input
    n, m = map(int, input().split())
    
    # Build adjacency list
    graph = {i: [] for i in range(1, n + 1)}
    for _ in range(m):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)
    
    start = int(input())
    
    # BFS implementation
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        # Process neighbors in sorted order
        for neighbor in sorted(graph[node]):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    print(' '.join(map(str, result)))
```

### Go Example Structure:
```go
func solve() {
    // Read input and build adjacency list
    // Implement BFS using slice as queue
    // Print space-separated result
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of nodes)
- 0 ≤ m ≤ n*(n-1)/2 (number of edges)
- 1 ≤ u, v ≤ n (node numbers)
- 1 ≤ start ≤ n (starting node)
- Time limit: 2 seconds
- Memory limit: 256 MB
- The graph may be disconnected (BFS only visits reachable nodes)

## Hints
1. **Start Simple**: Use a queue (FIFO) data structure for BFS traversal
2. **Track Visited**: Use a set or boolean array to avoid revisiting nodes
3. **Consistent Order**: Sort neighbors before processing to ensure reproducible output
4. **Handle Disconnected**: Only nodes reachable from start will be in the output
5. **Edge Case**: Single node with no edges should output just that node
6. **Performance**: BFS has O(V + E) time complexity - efficient for large graphs
