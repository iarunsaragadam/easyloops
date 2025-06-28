# Network Programming: Socket Connection Pool Management

## Problem Statement

You are tasked with implementing a socket connection pool manager that efficiently handles client connections to a server. This is a fundamental concept in network programming where servers must manage limited resources (socket connections) among multiple clients.

Your connection pool manager must support the following operations:

1. **CREATE pool_size**: Initialize a connection pool with a maximum capacity
2. **CONNECT client_id**: Attempt to connect a client to the pool
3. **DISCONNECT connection_id**: Disconnect a specific connection
4. **STATUS**: Show current pool statistics
5. **CLEANUP**: Remove all active connections
6. **LIST**: Display all active connections

The connection pool operates on a first-come-first-served basis. When the pool is full, new connection requests are rejected. Each successful connection receives a unique connection ID.

## Input Format

The input consists of multiple lines, each containing a command:
```
Line 1: CREATE <pool_size>
Line 2: CONNECT <client_id>
Line 3: DISCONNECT <connection_id>
Line 4: STATUS
Line 5: CLEANUP
Line 6: LIST
...
(Multiple commands until EOF)
```

**Command Details:**
- `CREATE pool_size`: Creates a new pool with given capacity (1 ≤ pool_size ≤ 10000)
- `CONNECT client_id`: Connects client with given ID (alphanumeric string)
- `DISCONNECT connection_id`: Disconnects connection with given ID (positive integer)
- `STATUS`: Reports current pool status
- `CLEANUP`: Removes all connections
- `LIST`: Lists all active connections

## Test Cases
**Input (`input1.txt`):**
```
CREATE 3
CONNECT client1
CONNECT client2
STATUS
CONNECT client3
CONNECT client4
LIST
DISCONNECT 2
STATUS
CLEANUP
STATUS
```

**Expected Output (`expected1.txt`):**
```
POOL_CREATED 3
CONNECTED client1 1
CONNECTED client2 2
ACTIVE 2 AVAILABLE 1
CONNECTED client3 3
REJECTED client4
CONNECTIONS 1:client1 2:client2 3:client3
DISCONNECTED client2 2
ACTIVE 2 AVAILABLE 1
CLEANED 2
ACTIVE 0 AVAILABLE 3
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand socket connection management principles
- Practice resource pool management algorithms
- Learn about connection lifecycle in network programming
- Implement efficient data structures for connection tracking
- Handle concurrent connection requests and cleanup operations
- Apply first-in-first-out (FIFO) connection allocation

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    pool_capacity = 0
    active_connections = {}  # connection_id -> client_id
    next_connection_id = 1
    
    try:
        while True:
            line = input().strip()
            parts = line.split()
            command = parts[0]
            
            if command == "CREATE":
                # Initialize pool
                pass
            elif command == "CONNECT":
                # Handle connection request
                pass
            elif command == "DISCONNECT":
                # Handle disconnection
                pass
            # ... handle other commands
            
    except EOFError:
        pass
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    poolCapacity := 0
    activeConnections := make(map[int]string)
    nextConnectionID := 1
    
    for scanner.Scan() {
        line := strings.TrimSpace(scanner.Text())
        parts := strings.Fields(line)
        command := parts[0]
        
        switch command {
        case "CREATE":
            // Initialize pool
        case "CONNECT":
            // Handle connection request
        case "DISCONNECT":
            // Handle disconnection
        // ... handle other commands
        }
    }
}
```

## Constraints
- Pool capacity: 1 ≤ pool_size ≤ 10,000
- Maximum number of commands: 100,000
- Client IDs are alphanumeric strings (1-20 characters)
- Connection IDs are positive integers assigned sequentially
- All operations must complete in O(1) or O(log n) time
- Memory usage should be proportional to active connections

## Hints
- Use a dictionary/map to track active connections efficiently
- Keep track of the next available connection ID
- Handle edge cases like disconnecting non-existent connections
- Consider using appropriate data structures for O(1) lookups
- The LIST command should output connections in sorted order by connection ID
- Remember to handle EOF properly when reading input
