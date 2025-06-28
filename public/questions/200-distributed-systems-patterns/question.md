# Distributed Systems Patterns: Load Balancer Implementation

## Problem Statement

Implement a sophisticated load balancer that demonstrates key distributed systems patterns. Your load balancer must support multiple load balancing strategies, handle server failures and recovery, and maintain connection state.

The load balancer should support the following operations:

1. **Server Management**: Add servers with optional weights
2. **Strategy Selection**: Support three load balancing strategies:
   - Round Robin: Distribute requests evenly across healthy servers
   - Least Connections: Route to server with fewest active connections
   - Weighted Round Robin: Distribute based on server weights
3. **Health Management**: Handle server failures and recovery
4. **Connection Tracking**: Track active connections and handle connection closures

### Load Balancing Strategies:

**Round Robin**: Cycles through healthy servers in order, regardless of current load.

**Least Connections**: Always routes to the healthy server with the fewest active connections. In case of ties, choose the first server encountered.

**Weighted Round Robin**: Creates a weighted distribution where servers with higher weights receive proportionally more requests. For example, if server A has weight 2 and server B has weight 1, server A should receive twice as many requests.

### Fault Tolerance:

Your load balancer must gracefully handle server failures by routing requests only to healthy servers. When servers recover, they should be included in the rotation again.

## Input Format

The input consists of multiple lines, each containing a command:

```
ADD_SERVER <server_id> [weight]     # Add server (weight defaults to 1)
SET_STRATEGY <strategy>             # Set load balancing strategy
REQUEST                             # Handle incoming request
SERVER_DOWN <server_id>             # Mark server as unhealthy
SERVER_UP <server_id>               # Mark server as healthy
CLOSE_CONNECTION <server_id>        # Close connection on server
```

**Valid strategies**: `round_robin`, `least_connections`, `weighted_round_robin`

## Test Cases

**Input (`input.txt`):**
```
ADD_SERVER web1
ADD_SERVER web2
ADD_SERVER web3 2
SET_STRATEGY round_robin
REQUEST
REQUEST
REQUEST
```

**Expected Output (`expected.txt`):**
```
web1
web2
web3
```

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand load balancing strategies and their trade-offs
- Implement fault tolerance and graceful degradation patterns
- Practice state management in distributed systems
- Learn about connection tracking and resource management
- Understand weighted distribution algorithms
- Practice handling edge cases in distributed systems (no healthy servers, etc.)

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    class LoadBalancer:
        def __init__(self):
            self.servers = {}  # server_id -> {weight, connections, healthy}
            self.strategy = "round_robin"
            self.current_index = 0
        
        def add_server(self, server_id, weight=1):
            # Add server with specified weight
            pass
        
        def handle_request(self):
            # Route request based on current strategy
            # Return server_id or "NO_SERVERS" if none available
            pass
    
    lb = LoadBalancer()
    # Process input commands...
```

### Go Example Structure:
```go
func solve() {
    type Server struct {
        Weight      int
        Connections int
        Healthy     bool
    }
    
    type LoadBalancer struct {
        Servers      map[string]*Server
        Strategy     string
        CurrentIndex int
    }
    
    // Implement load balancing logic...
}
```

## Constraints

- Server IDs are alphanumeric strings (1-20 characters)
- Weights are positive integers (1-100)
- Maximum 50 servers can be added
- Maximum 1000 commands in input
- Handle up to 10,000 concurrent connections per server
- If no healthy servers are available, return "NO_SERVERS"
- Connection counts cannot go below 0

## Hints

- For round robin, use modulo arithmetic to cycle through servers
- For least connections, always scan all healthy servers to find minimum
- For weighted round robin, create a virtual list with repeated server entries
- Track server health separately from server existence
- Remember to increment connection count on REQUEST and decrement on CLOSE_CONNECTION
- Consider what happens when a server goes down while it has active connections
- Test edge cases: no servers, all servers down, single server scenarios
