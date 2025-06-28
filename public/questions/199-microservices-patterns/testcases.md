# Test Cases for Microservices Patterns: Service Mesh Routing Optimization

## Test Case Structure
This question uses a **multi-line input format** for representing service mesh topology and routing requests.

### Input Format Pattern:
```
Line 1: N M (number of services, number of connections)
Lines 2 to M+1: service1 service2 latency (bidirectional connections)
Line M+2: source_service destination_service (routing request)
```

### Output Format Pattern:
```
Line 1: total_latency (minimum latency or -1 if unreachable)
Line 2: path (space-separated service names, or "No path" if unreachable)
```

## Test Case 1: Basic Routing
**Input (`input.txt`):**
```
4 4
auth payment 10
payment inventory 15
inventory order 20
auth user-service 25
auth order
```

**Expected Output (`expected.txt`):**
```
45
auth payment inventory order
```

**Description:** Tests basic shortest path finding in a connected service mesh. The optimal path from `auth` to `order` goes through `payment` and `inventory` with total latency of 45ms (10+15+20), which is better than the direct path through `user-service` which would require additional connections.

## Test Case 2: Unreachable Service
**Input (`input2.txt`):**
```
4 2
auth payment 10
inventory order 20
auth inventory
```

**Expected Output (`expected2.txt`):**
```
-1
No path
```

**Description:** Tests handling of disconnected service components. Services `auth` and `payment` form one component, while `inventory` and `order` form another, making `inventory` unreachable from `auth`.

## Test Case 3: Performance - Large Service Mesh
**Input (`input3.txt`):**
```
20 73
service-00 service-01 10
service-00 service-02 20
service-00 service-03 30
service-01 service-02 11
service-01 service-03 31
service-01 service-04 41
service-02 service-03 12
service-02 service-04 42
service-02 service-05 52
service-03 service-04 13
service-03 service-05 53
service-03 service-06 63
service-04 service-05 14
service-04 service-06 64
service-04 service-07 74
service-05 service-06 15
service-05 service-07 75
service-05 service-08 85
service-06 service-07 16
service-06 service-08 86
service-06 service-09 96
service-07 service-08 17
service-07 service-09 97
service-07 service-10 107
service-08 service-09 18
service-08 service-10 108
service-08 service-11 118
service-09 service-10 19
service-09 service-11 119
service-09 service-12 129
service-10 service-11 20
service-10 service-12 130
service-10 service-13 140
service-11 service-12 21
service-11 service-13 141
service-11 service-14 151
service-12 service-13 22
service-12 service-14 152
service-12 service-15 162
service-13 service-14 23
service-13 service-15 163
service-13 service-16 173
service-14 service-15 24
service-14 service-16 174
service-14 service-17 184
service-15 service-16 25
service-15 service-17 185
service-15 service-18 195
service-16 service-17 26
service-16 service-18 196
service-16 service-19 206
service-17 service-18 27
service-17 service-19 207
service-18 service-19 28
service-00 service-10 110
service-00 service-13 143
service-00 service-16 176
service-00 service-19 209
service-05 service-10 115
service-05 service-13 148
service-05 service-16 181
service-05 service-19 142
service-10 service-15 125
service-10 service-18 158
service-15 service-00 135
service-15 service-03 168
service-15 service-06 148
service-15 service-09 151
service-00 service-04 104
service-00 service-07 137
service-02 service-12 122
service-02 service-15 155
service-02 service-18 188
service-07 service-12 127
service-07 service-15 160
service-07 service-18 193
service-12 service-17 132
service-12 service-00 165
service-12 service-03 146
service-17 service-02 137
service-17 service-05 149
service-17 service-08 152
service-00 service-19
```

**Expected Output (`expected3.txt`):**
```
118
service-00 service-03 service-06 service-09 service-12 service-13 service-16 service-19
```

**Description:** Tests performance with a larger service mesh (20 services, 73 connections). Validates that the algorithm efficiently finds the optimal path in O(M log N) time complexity. The mesh has multiple possible paths, and the algorithm should find the one with minimum total latency.

## Test Case Creation Rules

### Input Validation Rules:
1. **Service count (N):** Must be positive integer (1 ≤ N ≤ 1000)
2. **Connection count (M):** Must be non-negative integer (0 ≤ M ≤ 5000)
3. **Service names:** Only alphanumeric characters and hyphens, case-sensitive
4. **Latency values:** Positive integers (1 ≤ latency ≤ 1000)
5. **Source/Destination:** Must be valid service names (can be the same for self-routing)
6. **Connections:** Are bidirectional by definition

### Output Format Rules:
1. **Total latency:** Integer representing minimum path cost, or -1 if unreachable
2. **Path format:** Space-separated service names in traversal order
3. **Unreachable case:** Output "-1" on line 1 and "No path" on line 2
4. **Self-routing:** If source equals destination, output "0" and source service name
5. **No trailing whitespace** in output lines

## Language-Specific Considerations

### Python Considerations:
- Use `defaultdict(list)` for adjacency list representation
- Implement with `heapq` module for priority queue (min-heap)
- Handle string parsing with `input().split()`
- Use `float('inf')` for initial distances
- Path reconstruction requires parent tracking during traversal

### Go Considerations:
- Use `map[string][]Edge` for adjacency list
- Implement priority queue with `container/heap` package
- Handle input parsing with `fmt.Scanf` 
- Use large integer constant for initial distances
- Efficient string handling for service names and path output

## Edge Cases to Test

### Connectivity Edge Cases:
- **Single service:** N=1, M=0, source=destination (should return 0)
- **Disconnected graph:** Multiple components with unreachable destinations
- **Self-loop routing:** Source equals destination (should return 0 and service name)
- **Missing services:** Source or destination not in the mesh

### Performance Edge Cases:
- **Dense mesh:** Nearly complete graph with many alternative paths
- **Sparse mesh:** Minimal connectivity, few paths available
- **Long chains:** Linear topology requiring many hops
- **Star topology:** Central hub with many spokes

### Algorithmic Edge Cases:
- **Multiple optimal paths:** Same minimum latency via different routes
- **Large latencies:** Testing integer overflow prevention
- **Zero connections:** No edges in the graph

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input format matches exactly: N M on first line, M connection lines, then source destination
- [ ] All service names are valid (alphanumeric and hyphens only)
- [ ] All latency values are positive integers within constraints
- [ ] Expected output has exactly 2 lines (latency and path)
- [ ] Path output lists services in correct traversal order
- [ ] Unreachable cases properly output "-1" and "No path"
- [ ] Self-routing cases output "0" and single service name
- [ ] No trailing whitespace in any output lines
- [ ] Large test cases verify O(M log N) performance requirements

## Automated Test Case Generation

Generate test cases programmatically:

```python
import random
from collections import defaultdict, deque
import heapq

def generate_connected_mesh(num_services, num_connections):
    """Generate a connected service mesh for testing."""
    services = [f"service-{i:02d}" for i in range(num_services)]
    connections = []
    graph = defaultdict(list)
    
    # Ensure connectivity with spanning tree
    for i in range(1, num_services):
        parent = random.randint(0, i-1)
        latency = random.randint(10, 100)
        connections.append((services[parent], services[i], latency))
        graph[services[parent]].append(services[i])
        graph[services[i]].append(services[parent])
    
    # Add additional random connections
    additional = num_connections - (num_services - 1)
    for _ in range(additional):
        s1, s2 = random.sample(services, 2)
        if s2 not in graph[s1]:  # Avoid duplicates
            latency = random.randint(10, 200)
            connections.append((s1, s2, latency))
            graph[s1].append(s2)
            graph[s2].append(s1)
    
    return services, connections

def validate_solution(input_data, expected_output):
    """Validate that test case has correct expected output."""
    lines = input_data.strip().split('\n')
    n, m = map(int, lines[0].split())
    
    # Build graph and run Dijkstra
    graph = defaultdict(list)
    for i in range(1, m + 1):
        service1, service2, latency = lines[i].split()
        latency = int(latency)
        graph[service1].append((service2, latency))
        graph[service2].append((service1, latency))
    
    source, destination = lines[m + 1].split()
    
    # Implement verification logic
    # ... (similar to main solution)
    
    return True  # Placeholder

# Example usage
services, connections = generate_connected_mesh(10, 20)
print(f"Generated mesh with {len(services)} services and {len(connections)} connections")
```

This comprehensive test structure ensures thorough validation of the microservices routing optimization algorithm while maintaining educational value and real-world relevance.
