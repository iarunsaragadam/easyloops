# CQRS (Command Query Responsibility Segregation)

## Problem Statement

Implement a **CQRS (Command Query Responsibility Segregation)** event store system that separates write operations (commands) from read operations (queries). This architectural pattern is crucial in distributed systems where read and write workloads have different characteristics and performance requirements.

Your system must handle two types of operations:

**Commands (Write Operations):**
- `ADD_EVENT <type> <data> <timestamp>`: Add a new event to the store
- `UPDATE_EVENT <event_id> <new_data>`: Update existing event data

**Queries (Read Operations):**
- `GET_EVENTS_BY_TYPE <type>`: Retrieve all events of a specific type
- `COUNT_EVENTS [type]`: Count total events, or events of specific type if provided
- `GET_RECENT_EVENTS <limit>`: Get the most recent events (up to limit)

### CQRS Architecture Requirements:

1. **Command Side**: Maintains an append-only event store for all write operations
2. **Query Side**: Maintains optimized projections (views) for efficient read operations
3. **Separation**: Commands and queries use different data structures optimized for their specific purposes
4. **Consistency**: Projections must be updated when events are added or modified

### Real-World Context:
This pattern is commonly used in:
- Event sourcing systems
- High-traffic web applications 
- Financial systems requiring audit trails
- IoT data processing platforms
- Microservices architectures

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations)
Next n lines: Operation in format "OPERATION_TYPE OPERATION_NAME [arguments...]"
```

Where:
- `OPERATION_TYPE` is either "COMMAND" or "QUERY"
- `OPERATION_NAME` is the specific operation (ADD_EVENT, UPDATE_EVENT, etc.)
- Arguments vary by operation type

## Test Cases
**Input (`input.txt`):**
```
5
COMMAND ADD_EVENT user_login alice 1000
COMMAND ADD_EVENT user_logout alice 2000
QUERY GET_EVENTS_BY_TYPE user_login
QUERY COUNT_EVENTS user_login
QUERY GET_RECENT_EVENTS 2
```

**Expected Output (`expected.txt`):**
```
EVENT_ADDED:1
EVENT_ADDED:2
1:alice:1000
1
1:user_login:alice|2:user_logout:alice
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand CQRS (Command Query Responsibility Segregation) architectural pattern
- Learn to separate read and write concerns in system design
- Practice implementing optimized data structures for different access patterns
- Understand event sourcing and projection maintenance
- Learn about eventual consistency in distributed systems
- Master efficient query processing techniques

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    # Initialize CQRS components
    events = []                    # Command side: event store
    events_by_type = {}           # Query side: type projection
    event_counts = {}             # Query side: count projection
    recent_events = []            # Query side: recent events projection
    
    for _ in range(n):
        line = input().strip().split()
        operation_type = line[0]   # COMMAND or QUERY
        operation = line[1]        # Specific operation
        args = line[2:]            # Arguments
        
        if operation_type == "COMMAND":
            # Handle write operations
            # Update event store and projections
            pass
        elif operation_type == "QUERY":
            # Handle read operations
            # Use projections for efficient queries
            pass
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    // Initialize CQRS components
    events := []Event{}                    // Command side
    eventsByType := make(map[string][]Event) // Query side projections
    eventCounts := make(map[string]int)
    recentEvents := []Event{}
    
    for i := 0; i < n; i++ {
        scanner.Scan()
        parts := strings.Fields(scanner.Text())
        operationType := parts[0]
        operation := parts[1]
        args := parts[2:]
        
        if operationType == "COMMAND" {
            // Handle commands
        } else if operationType == "QUERY" {
            // Handle queries
        }
    }
}
```

## Constraints
- Number of operations: 1 ≤ n ≤ 100,000
- Event types: strings with length 1-20 characters
- Event data: strings with length 1-100 characters
- Timestamps: positive integers up to 10^9
- Event IDs: auto-incrementing starting from 1
- For GET_RECENT_EVENTS: limit between 1-100
- System must handle mixed command/query workloads efficiently
- Time complexity requirements:
  - ADD_EVENT: O(1) amortized
  - UPDATE_EVENT: O(n) worst case (acceptable for this problem)
  - GET_EVENTS_BY_TYPE: O(k) where k is number of events of that type
  - COUNT_EVENTS: O(1)
  - GET_RECENT_EVENTS: O(min(limit, total_events))

## Hints
- **Separation of Concerns**: Keep command and query data structures separate
- **Projections**: Build specialized data structures for common query patterns
- **Event IDs**: Use auto-incrementing IDs starting from 1
- **Output Formats**:
  - Commands return status: `EVENT_ADDED:<id>`, `EVENT_UPDATED:<id>`, `EVENT_NOT_FOUND`
  - Queries return data: pipe-separated values for multiple results, `NO_EVENTS` for empty results
- **Data Structures**: Use dictionaries/maps for O(1) lookups, lists for ordered access
- **Recent Events**: Consider using a circular buffer or deque for efficiency
- **Event Updates**: Remember to update all relevant projections when modifying events
- **Performance**: Avoid linear searches when possible; pre-compute commonly accessed data
