# Test Cases for Distributed Systems Patterns: Load Balancer Implementation

## Test Case Structure

This question uses a **multi-line command format** where each line represents a load balancer command or request.

### Input Format Pattern:
```
Command lines with various operations:
ADD_SERVER <server_id> [weight]
SET_STRATEGY <strategy>
REQUEST
SERVER_DOWN <server_id>
SERVER_UP <server_id>
CLOSE_CONNECTION <server_id>
```

### Output Format Pattern:
```
For REQUEST commands only:
<server_id> or "NO_SERVERS"
```

## Test Case 1: Basic Round Robin

**Input (`input.txt`):**
```
ADD_SERVER web1
ADD_SERVER web2
ADD_SERVER web3 2
SET_STRATEGY round_robin
REQUEST
REQUEST
REQUEST
REQUEST
```

**Expected Output (`expected.txt`):**
```
web1
web2
web3
web1
```

**Description:** Tests basic round robin load balancing across three servers. Note that server weights are ignored in round robin strategy.

## Test Case 2: Least Connections with Failures

**Input (`input2.txt`):**
```
ADD_SERVER app1
ADD_SERVER app2
ADD_SERVER app3
SET_STRATEGY least_connections
REQUEST
REQUEST
CLOSE_CONNECTION app1
REQUEST
SERVER_DOWN app2
REQUEST
REQUEST
```

**Expected Output (`expected2.txt`):**
```
app1
app2
app1
app1
app3
```

**Description:** Tests least connections strategy with connection tracking and server failures. Shows how connections are tracked and how requests are rerouted when servers go down.

## Test Case 3: Weighted Round Robin with Complex Scenarios

**Input (`input3.txt`):**
```
ADD_SERVER high1 3
ADD_SERVER high2 3
ADD_SERVER low1 1
SET_STRATEGY weighted_round_robin
REQUEST
REQUEST
REQUEST
REQUEST
REQUEST
REQUEST
REQUEST
SERVER_DOWN high1
REQUEST
REQUEST
REQUEST
REQUEST
```

**Expected Output (`expected3.txt`):**
```
high1
high2
high1
low1
high2
high1
high2
high2
low1
high2
high2
```

**Description:** Tests weighted round robin with different server weights (3:3:1 ratio) and demonstrates behavior when a high-weight server fails.

## Test Case Creation Rules

### Input Validation Rules:

1. **ADD_SERVER commands:**
   - Server ID: 1-20 alphanumeric characters
   - Weight: Optional positive integer (1-100), defaults to 1
   - Maximum 50 servers total

2. **SET_STRATEGY commands:**
   - Valid strategies: "round_robin", "least_connections", "weighted_round_robin"

3. **Server management:**
   - SERVER_DOWN/SERVER_UP: Must reference existing servers
   - CLOSE_CONNECTION: Must reference existing servers

4. **REQUEST commands:**
   - No parameters required
   - Should produce output only for REQUEST commands

### Output Format Rules:

1. **SERVER_ID format:** Alphanumeric strings exactly as added
2. **NO_SERVERS:** Returned when no healthy servers available
3. **Output order:** One line per REQUEST command, in command order
4. **No extra whitespace:** Clean server ID strings only

### Load Balancing Logic Rules:

1. **Round Robin:**
   - Cycles through healthy servers in addition order
   - Ignores server weights
   - Ignores connection counts

2. **Least Connections:**
   - Always routes to healthy server with minimum active connections
   - In case of ties, selects first server encountered in addition order
   - Tracks connections: +1 on REQUEST, -1 on CLOSE_CONNECTION

3. **Weighted Round Robin:**
   - Creates virtual rotation where servers appear weight × times
   - Example: weight 3 server appears 3 times for every 1 time weight 1 server appears
   - Only includes healthy servers in rotation

## Language-Specific Considerations

### Python Considerations:
- Use dictionaries for server storage: `{server_id: {weight, connections, healthy}}`
- Handle EOF gracefully with try/except or while loop with input()
- Use modulo arithmetic for cycling: `index % len(servers)`
- Boolean values for health status

### Go Considerations:
- Use maps for server storage: `map[string]*Server`
- Use scanner for input reading
- Struct for server properties: `type Server struct{Weight int; Connections int; Healthy bool}`
- Handle empty input gracefully

## Edge Cases Covered

### All Servers Down:
```
ADD_SERVER srv1
SERVER_DOWN srv1
REQUEST
# Expected: NO_SERVERS
```

### No Servers Added:
```
REQUEST
# Expected: NO_SERVERS
```

### Connection Management:
```
ADD_SERVER srv1
SET_STRATEGY least_connections
REQUEST
CLOSE_CONNECTION srv1
CLOSE_CONNECTION srv1  # Should not go negative
```

### Single Server Scenarios:
```
ADD_SERVER only
SET_STRATEGY round_robin
REQUEST
REQUEST
# Expected: only, only
```

## Validation Checklist

When creating new test cases, ensure:

- [ ] All server IDs are valid alphanumeric strings
- [ ] Weights are positive integers when specified
- [ ] Strategy names are exactly as specified
- [ ] REQUEST commands produce exactly one output line
- [ ] No output for non-REQUEST commands
- [ ] Connection counts are properly tracked
- [ ] Server health changes are respected immediately
- [ ] Edge cases (no servers, all down) are handled
- [ ] Load balancing logic follows the specified algorithms
- [ ] Output format matches exactly (no extra spaces/newlines)

## Performance Test Considerations

For performance testing (large scale scenarios):
- Test with 50 servers and complex weight distributions
- Include thousands of REQUEST commands
- Mix in frequent SERVER_DOWN/SERVER_UP commands
- Test connection management with many CLOSE_CONNECTION commands
- Verify strategy switching performance

## Automated Test Case Generation

```python
def generate_weighted_test_case(num_servers=5, num_requests=20):
    import random
    
    commands = []
    servers = []
    
    # Add servers with random weights
    for i in range(num_servers):
        server_id = f"srv{i}"
        weight = random.randint(1, 5)
        servers.append((server_id, weight))
        commands.append(f"ADD_SERVER {server_id} {weight}")
    
    commands.append("SET_STRATEGY weighted_round_robin")
    
    # Add requests
    for _ in range(num_requests):
        commands.append("REQUEST")
    
    return "\n".join(commands)

def validate_test_case(input_content, expected_content):
    """Validate that test case follows format rules."""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    request_count = sum(1 for line in input_lines if line.startswith('REQUEST'))
    
    # Should have exactly one output line per REQUEST
    assert len(expected_lines) == request_count, f"Expected {request_count} output lines, got {len(expected_lines)}"
    
    # All output should be valid server IDs or NO_SERVERS
    for line in expected_lines:
        assert line == "NO_SERVERS" or line.replace('_', '').replace('-', '').isalnum(), f"Invalid server ID: {line}"
    
    return True
```

This comprehensive test structure ensures that the load balancer implementation correctly handles all distributed systems patterns while maintaining robust error handling and performance characteristics.
