# Test Cases for Graph Traversal (DFS) - Connected Components

## Test Case Structure
This question uses a multi-line input format with graph representation.

### Input Format Pattern:
```
Line 1: n m (number of nodes and edges)
Next m lines: u v (edge between nodes u and v)
```

### Output Format Pattern:
```
Line 1: number of connected components
Next lines: space-separated nodes in each component (sorted)
```

## Test Case Categories

### Basic Test Cases (1-30): Simple Graph Structures
- Single component with few nodes
- Multiple small components
- Linear chains and star graphs
- Simple cycles

### Edge Test Cases (31-50): Boundary Conditions
- Empty graph (no edges)
- Single node graphs
- Complete graphs
- Maximum nodes with minimum/maximum edges

### Performance Test Cases (51-80): Large Scale
- Large graphs with many components (500-1000 nodes)
- Dense graphs that stress memory usage
- Sparse graphs that test algorithm efficiency
- Deep recursive structures

### Complex Test Cases (81-100+): Advanced Scenarios
- Mixed component sizes
- Complex topologies
- Real-world network patterns

## Sample Test Cases

## Test Case 1: Basic Two Components
**Input (`input1.txt`):**
```
5 4
1 2
2 3
4 5
1 3
```
**Expected Output (`expected1.txt`):**
```
2
1 2 3
4 5
```

## Test Case 2: All Isolated Nodes
**Input (`input2.txt`):**
```
4 0
```
**Expected Output (`expected2.txt`):**
```
4
1
2
3
4
```

## Test Case 3: Single Complete Component
**Input (`input3.txt`):**
```
4 6
1 2
1 3
1 4
2 3
2 4
3 4
```
**Expected Output (`expected3.txt`):**
```
1
1 2 3 4
```

## Test Case Creation Rules

### Input Validation Rules:
1. 1 ≤ n ≤ 1000 (number of nodes)
2. 0 ≤ m ≤ n*(n-1)/2 (number of edges)
3. 1 ≤ u, v ≤ n for all edges
4. No self-loops (u ≠ v)
5. No duplicate edges
6. Nodes are numbered from 1 to n

### Output Format Rules:
1. First line contains the number of connected components
2. Each subsequent line contains nodes of one component
3. Nodes within each component are sorted in ascending order
4. Components are sorted by their smallest node
5. Each line ends with a newline character

## Performance Requirements
- **Time Complexity**: O(V + E) where V is vertices and E is edges
- **Space Complexity**: O(V + E) for adjacency list storage
- **Timeout Threshold**: Solutions with O(V²) or worse will timeout on large test cases
- **Memory Limit**: 256 MB should accommodate largest test cases

## Language-Specific Considerations

### Python Considerations:
- Use `collections.defaultdict(list)` for adjacency list
- Implement recursive DFS with proper recursion limit handling
- Use `sys.setrecursionlimit()` for deep graphs if needed
- Sort components using built-in `sorted()` function

### Go Considerations:
- Use `map[int][]int` for adjacency list representation
- Implement iterative DFS to avoid stack overflow on deep graphs
- Use `sort.Ints()` for sorting components
- Handle integer input parsing carefully

### JavaScript Considerations:
- Use `Map` or object for adjacency list
- Implement DFS using explicit stack to avoid call stack limits
- Use `Array.sort((a, b) => a - b)` for numeric sorting

## Validation Checklist
- [ ] Input format matches specification exactly
- [ ] All edge cases are covered (empty graph, single nodes, etc.)
- [ ] Performance test cases will timeout O(V²) solutions
- [ ] Expected outputs are generated from verified correct solutions
- [ ] Components are properly sorted within and between
- [ ] No duplicate edges or invalid node references
- [ ] Test cases progress from simple to complex appropriately

## Automated Test Case Generation
```python
import random

def generate_basic_test_case(n_nodes, n_components):
    """Generate test case with specified number of nodes and components"""
    # Implementation for creating connected components
    pass

def generate_performance_test_case(n_nodes, density=0.1):
    """Generate large test case for performance testing"""
    # Implementation for creating large sparse/dense graphs
    pass

def validate_test_case(input_content, expected_content):
    """Validate that test case input/output pair is correct"""
    # Parse input and run reference solution
    # Compare with expected output
    pass

def generate_edge_case():
    """Generate edge cases like empty graphs, single nodes, etc."""
    pass
```

## Test Case Distribution Plan
- **Cases 1-30**: Basic connectivity patterns
- **Cases 31-50**: Edge cases and boundary conditions  
- **Cases 51-80**: Performance and scalability tests
- **Cases 81-100**: Complex real-world scenarios
- **Cases 100+**: Additional comprehensive coverage
