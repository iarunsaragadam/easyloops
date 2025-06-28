# Microservices Patterns: Service Mesh Routing Optimization

## Problem Statement

In a microservices architecture, services communicate through a service mesh that manages traffic routing, load balancing, and service discovery. Your task is to implement an optimal routing algorithm that finds the shortest path between services in terms of network latency.

You are given a service mesh topology with bidirectional connections between services and their associated network latencies. For each routing request, you need to find the path with minimum total latency from a source service to a destination service.

Key considerations:
- Services are connected through a mesh network with varying latencies
- All connections are bidirectional (if service A can reach service B, then B can reach A)
- You need to find the optimal path that minimizes total network latency
- Handle edge cases like unreachable services or same source/destination

Real-world applications:
- API Gateway routing decisions
- Service mesh traffic optimization
- Load balancer path selection
- Circuit breaker failover routing

## Input Format

The input consists of multiple lines:
```
Line 1: N M (number of services, number of connections)
Lines 2 to M+1: service1 service2 latency (bidirectional connection with latency in ms)
Line M+2: source_service destination_service (routing request)
```

Where:
- `N` is the number of unique services (1 ≤ N ≤ 1000)
- `M` is the number of connections (0 ≤ M ≤ 5000)
- `service1`, `service2` are service names (alphanumeric with hyphens)
- `latency` is the network latency in milliseconds (1 ≤ latency ≤ 1000)
- `source_service`, `destination_service` are the routing endpoints

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand microservices communication patterns and service mesh architecture
- Implement shortest path algorithms (Dijkstra's algorithm) for weighted graphs
- Handle graph representation and traversal in network topology problems
- Practice edge case handling in distributed systems scenarios
- Learn about network latency optimization in microservices environments

## Implementation Guidelines

### Python Example Structure:
```python
from collections import defaultdict
import heapq

def solve():
    # Read input and build service mesh graph
    n, m = map(int, input().split())
    graph = defaultdict(list)
    
    for _ in range(m):
        service1, service2, latency = input().split()
        latency = int(latency)
        # Add bidirectional connections
        graph[service1].append((service2, latency))
        graph[service2].append((service1, latency))
    
    source, destination = input().split()
    
    # Implement Dijkstra's algorithm
    # Handle edge cases (same source/dest, unreachable services)
    # Output: total latency and path
```

### Go Example Structure:
```go
import (
    "fmt"
    "container/heap"
    "strings"
)

func solve() {
    var n, m int
    fmt.Scanf("%d %d", &n, &m)
    
    // Build adjacency list representation
    graph := make(map[string][]Edge)
    
    for i := 0; i < m; i++ {
        var service1, service2 string
        var latency int
        fmt.Scanf("%s %s %d", &service1, &service2, &latency)
        // Add bidirectional edges
    }
    
    var source, destination string
    fmt.Scanf("%s %s", &source, &destination)
    
    // Implement shortest path algorithm
    // Output results
}
```

## Constraints
- 1 ≤ N ≤ 1000 (number of services)
- 0 ≤ M ≤ 5000 (number of connections)
- 1 ≤ latency ≤ 1000 (network latency in milliseconds)
- Service names contain only alphanumeric characters and hyphens
- All connections are bidirectional
- Time complexity should be O(M log N) using priority queue optimization
- Space complexity should be O(N + M) for graph representation

## Hints
- This is a classic shortest path problem - consider using Dijkstra's algorithm
- Use a priority queue (min-heap) to efficiently select the next service with minimum distance
- Build an adjacency list to represent the service mesh graph
- Handle edge cases: source equals destination (return 0), unreachable destination (return -1)
- Remember to reconstruct the path by keeping track of parent nodes during traversal
- Test your solution with disconnected components and single-node graphs
