# Test Cases for Network Programming: Socket Connection Pool Management

## Test Case Structure
This question uses a **multi-line command format** where each line contains a specific pool management command.

### Input Format Pattern:
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

### Output Format Pattern:
```
POOL_CREATED <pool_size>
CONNECTED <client_id> <connection_id>
REJECTED <client_id>
DISCONNECTED <client_id> <connection_id>
NOT_FOUND <connection_id>
ACTIVE <count> AVAILABLE <count>
CLEANED <count>
CONNECTIONS <connection_list>
CONNECTIONS NONE
```

## Test Case Categories

### Basic Test Cases (input1.txt - input30.txt)
Simple scenarios demonstrating core functionality:
- Pool creation and basic connections
- Simple connect/disconnect sequences
- Status reporting
- Basic edge cases

### Edge Cases (input31.txt - input60.txt)
Boundary conditions and special scenarios:
- Empty pools (size 0)
- Single connection pools
- Maximum capacity pools
- Disconnecting non-existent connections
- Multiple cleanup operations
- Empty connection lists

### Performance Test Cases (input61.txt - input90.txt)
Large-scale scenarios testing algorithm efficiency:
- Large pool sizes (up to 10,000)
- Many sequential connections/disconnections
- Stress testing with maximum commands (100,000)
- Random connection patterns
- Bulk operations

### Complex Scenarios (input91.txt - input100.txt)
Advanced scenarios combining multiple edge cases:
- Interleaved operations
- Multiple pool recreations
- Complex connection patterns
- Mixed operation sequences

## Sample Test Cases

### Test Case 1: Basic Pool Management
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

### Test Case 2: Edge Case - Empty Pool
**Input (`input2.txt`):**
```
CREATE 0
CONNECT client1
STATUS
LIST
```
**Expected Output (`expected2.txt`):**
```
POOL_CREATED 0
REJECTED client1
ACTIVE 0 AVAILABLE 0
CONNECTIONS NONE
```

### Test Case 3: Performance - Large Pool
**Input (`input3.txt`):**
```
CREATE 1000
CONNECT client1
CONNECT client2
CONNECT client3
STATUS
CLEANUP
STATUS
```
**Expected Output (`expected3.txt`):**
```
POOL_CREATED 1000
CONNECTED client1 1
CONNECTED client2 2
CONNECTED client3 3
ACTIVE 3 AVAILABLE 997
CLEANED 3
ACTIVE 0 AVAILABLE 1000
```

## Test Case Creation Rules
### Input Validation Rules:
1. Each command must be on a separate line
2. CREATE command must have valid integer pool_size (0 ≤ pool_size ≤ 10,000)
3. CONNECT command must have alphanumeric client_id (1-20 characters)
4. DISCONNECT command must have valid integer connection_id
5. STATUS, CLEANUP, LIST commands have no parameters
6. Maximum 100,000 commands per test case
7. No trailing spaces or empty lines except final newline

### Output Format Rules:
1. Each command produces exactly one line of output
2. No extra spaces or formatting
3. Connection lists in LIST command sorted by connection_id
4. Numeric values must be exact (no leading zeros except for 0)
5. String values must match input exactly
6. Final newline required

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read commands
- Handle EOFError for end of input
- Use dictionaries for O(1) connection lookup
- Sort connections for LIST command: `sorted(connections.items())`
- String formatting: `f"CONNECTED {client_id} {connection_id}"`

### Go Considerations:
- Use `bufio.Scanner` for line-by-line reading
- Handle map operations efficiently
- Sort connections using `sort.Slice` for LIST command
- String formatting: `fmt.Sprintf("CONNECTED %s %d", clientID, connectionID)`
- Check scanner.Scan() return value for EOF

### JavaScript Considerations:
- Use `readline` or read entire input then split by lines
- Use Map or Object for connection storage
- Sort connections using Array.sort() for LIST command
- Handle input parsing carefully with parseInt() for numbers

## Validation Checklist
- [ ] Pool capacity correctly enforced
- [ ] Connection IDs assigned sequentially starting from 1
- [ ] Rejected connections when pool is full
- [ ] Proper disconnection handling (both success and failure)
- [ ] Accurate status reporting (active and available counts)
- [ ] Cleanup removes all connections and reports count
- [ ] LIST command shows connections in sorted order
- [ ] Edge cases handled: empty pools, non-existent disconnections
- [ ] Performance cases complete within time limits
- [ ] Output format exactly matches specification

## Automated Test Case Generation
```python
import random
import string

def generate_test_case(category="basic", size="small"):
    """Generate test cases for different categories and sizes."""
    commands = []
    
    if category == "basic":
        pool_size = random.randint(1, 10)
        commands.append(f"CREATE {pool_size}")
        
        # Add some connections
        clients = [f"client{i}" for i in range(1, pool_size + 3)]
        for client in clients:
            commands.append(f"CONNECT {client}")
            
        commands.append("STATUS")
        commands.append("LIST")
        
        # Disconnect some
        if pool_size > 1:
            commands.append(f"DISCONNECT {random.randint(1, min(pool_size, 3))}")
            
        commands.append("STATUS")
        commands.append("CLEANUP")
        commands.append("STATUS")
        
    elif category == "edge":
        # Edge cases like empty pools, single connections, etc.
        commands.append("CREATE 0")
        commands.append("CONNECT edge_client")
        commands.append("STATUS")
        commands.append("LIST")
        
    elif category == "performance":
        pool_size = random.randint(100, 1000)
        commands.append(f"CREATE {pool_size}")
        
        # Generate many connections
        for i in range(pool_size + 50):
            client_id = f"perf_client_{i}"
            commands.append(f"CONNECT {client_id}")
            
        commands.append("STATUS")
        
        # Disconnect many
        for i in range(1, min(pool_size, 100), 2):
            commands.append(f"DISCONNECT {i}")
            
        commands.append("STATUS")
        commands.append("CLEANUP")
        
    return "\n".join(commands) + "\n"

def validate_test_case(input_content, expected_content):
    """Validate that test case follows the rules."""
    input_lines = input_content.strip().split("\n")
    expected_lines = expected_content.strip().split("\n")
    
    # Check command count
    assert len(input_lines) <= 100000, "Too many commands"
    assert len(input_lines) == len(expected_lines), "Input/output line count mismatch"
    
    # Validate each command
    for line in input_lines:
        parts = line.split()
        assert len(parts) >= 1, "Empty command"
        
        command = parts[0]
        if command == "CREATE":
            assert len(parts) == 2, "CREATE requires pool_size"
            pool_size = int(parts[1])
            assert 0 <= pool_size <= 10000, "Invalid pool size"
        elif command == "CONNECT":
            assert len(parts) == 2, "CONNECT requires client_id"
            client_id = parts[1]
            assert client_id.isalnum(), "Client ID must be alphanumeric"
            assert 1 <= len(client_id) <= 20, "Client ID length invalid"
        elif command == "DISCONNECT":
            assert len(parts) == 2, "DISCONNECT requires connection_id"
            connection_id = int(parts[1])
            assert connection_id > 0, "Connection ID must be positive"
        elif command in ["STATUS", "CLEANUP", "LIST"]:
            assert len(parts) == 1, f"{command} takes no parameters"
        else:
            assert False, f"Unknown command: {command}"
    
    return True
```
