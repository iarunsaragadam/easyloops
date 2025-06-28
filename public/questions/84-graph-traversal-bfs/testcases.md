# Test Cases for Graph Traversal (BFS)

## Test Case Structure
This question uses a multi-line input format representing an undirected graph.

### Input Format Pattern:
```
Line 1: n m (number of nodes and edges)
Next m lines: u v (edge between nodes u and v)  
Last line: start (starting node for BFS)
```

### Output Format Pattern:
```
Space-separated integers representing BFS traversal order
```

## Test Case Categories

### Basic Test Cases (Cases 1-25)
Simple, straightforward graphs to verify basic BFS functionality:
- **Path graphs**: Linear chains of nodes
- **Cycle graphs**: Simple cycles  
- **Star graphs**: One central node connected to all others
- **Small complete graphs**: All nodes connected to each other
- **Tree structures**: Hierarchical connected graphs

**Example - Case 1 (Simple Path):**
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

### Edge Test Cases (Cases 26-50)
Boundary conditions and special scenarios:
- **Single node**: Graph with only one node
- **Two nodes**: Connected and disconnected pairs
- **Empty graphs**: Nodes with no edges
- **Disconnected components**: Multiple separate subgraphs
- **Different starting points**: Same graph, different start nodes

**Example - Case 26 (Single Node):**
**Input (`input26.txt`):**
```
1 0
1
```
**Expected Output (`expected26.txt`):**
```
1
```

### Performance Test Cases (Cases 51-75)
Large inputs designed to test algorithmic efficiency:
- **Large complete subgraphs**: Dense connectivity
- **Large star graphs**: Many nodes connected to center
- **Long path graphs**: Linear chains with hundreds of nodes
- **Grid structures**: 2D grid-like connectivity patterns
- **Random large connected graphs**: Complex structures with many edges

These cases will timeout inefficient algorithms (O(n²) or worse) while BFS (O(V+E)) runs efficiently.

**Example - Performance Case:**
```
200 199
1 2
2 3
...
199 200
1
```

### Complex Test Cases (Cases 76-99)  
Advanced scenarios combining multiple edge cases:
- **Multiple disconnected components**: Several separate subgraphs
- **Mixed graph structures**: Combining paths, cycles, and dense regions
- **Bridges and articulation points**: Critical connectivity nodes
- **Various starting positions**: Testing different entry points

**Example - Case 76 (Multiple Components):**
**Input (`input76.txt`):**
```
6 3
1 2
3 4
5 6
1
```
**Expected Output (`expected76.txt`):**
```
1 2
```

### Corner Cases (Cases 100)
Special boundary and unusual valid inputs:
- **Maximum constraints**: Testing limits
- **Minimal valid inputs**: Smallest possible cases
- **Edge connectivity patterns**: Unique graph structures

## Test Case Creation Rules

### Input Validation Rules:
1. **Node Range**: All node numbers must be between 1 and n
2. **Edge Format**: Each edge line contains exactly two distinct integers
3. **No Self-loops**: Edges cannot connect a node to itself
4. **No Duplicates**: Each edge appears at most once
5. **Valid Start**: Starting node must exist (1 ≤ start ≤ n)
6. **Undirected**: Edge u-v implies both u→v and v→u connections

### Output Format Rules:
1. **Space-Separated**: Nodes separated by single spaces
2. **Integer Format**: Each node as integer (no leading zeros)
3. **BFS Order**: Nodes in exact BFS traversal sequence
4. **Reachable Only**: Only nodes reachable from start node
5. **Consistent Ordering**: Neighbors processed in ascending order
6. **Single Line**: All nodes on one line, ending with newline

## Language-Specific Considerations

### Python Considerations:
- Use `collections.deque` for efficient queue operations
- Use `set()` for O(1) visited node checking
- Use `sorted()` to ensure consistent neighbor ordering
- Handle input with `map(int, input().split())`

### Go Considerations:
- Use slice as queue with append/slice operations
- Use map[int]bool for visited tracking
- Sort neighbors slice before processing
- Handle integer parsing carefully

### JavaScript Considerations:
- Use Array with push/shift for queue operations
- Use Set for visited node tracking
- Sort neighbors array before processing
- Parse integers from split input strings

## Validation Checklist
- [ ] Input has correct number of lines (1 + m + 1)
- [ ] First line contains exactly 2 integers (n, m)
- [ ] Next m lines each contain exactly 2 integers (edges)
- [ ] Last line contains exactly 1 integer (start node)
- [ ] All node numbers are in range [1, n]
- [ ] No self-loops or duplicate edges
- [ ] Output contains only reachable nodes
- [ ] Output nodes are in correct BFS order
- [ ] Output format is space-separated integers

## Automated Test Case Generation
```python
def generate_test_case(n, edges, start):
    """Generate input and expected output for given parameters"""
    # Create input content
    input_content = f"{n} {len(edges)}\n"
    for u, v in edges:
        input_content += f"{u} {v}\n"
    input_content += f"{start}\n"
    
    # Generate BFS result
    expected_content = generate_bfs_result(n, edges, start)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate test case format and correctness"""
    lines = input_content.strip().split('\n')
    n, m = map(int, lines[0].split())
    
    # Validate structure
    assert len(lines) == m + 2, "Incorrect number of lines"
    
    # Validate edges
    edges = []
    for i in range(1, m + 1):
        u, v = map(int, lines[i].split())
        assert 1 <= u <= n and 1 <= v <= n, "Node out of range"
        assert u != v, "Self-loop detected"
        edges.append((u, v))
    
    # Validate start node
    start = int(lines[m + 1])
    assert 1 <= start <= n, "Start node out of range"
    
    # Validate expected output
    result_nodes = list(map(int, expected_content.strip().split()))
    assert start in result_nodes, "Start node must be in output"
    
    return True
```

## Performance Expectations
- **BFS Algorithm**: O(V + E) time complexity should handle all test cases
- **DFS Algorithm**: May still work but isn't the intended solution
- **Brute Force**: O(V²) or worse algorithms will timeout on large cases
- **Memory Usage**: Should remain under 256MB for all test cases
- **Time Limit**: All test cases should complete within 2 seconds using BFS
