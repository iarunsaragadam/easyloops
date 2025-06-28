# Protocol Implementation

## Problem Statement

You are tasked with implementing a simple message protocol that handles client-server communication. The protocol uses a specific message format with framing, type identification, and acknowledgment mechanisms. Your job is to process a sequence of protocol messages and generate appropriate responses.

### Protocol Specification

**Message Format:** `<LENGTH>:<TYPE>:<DATA>`
- `LENGTH`: 4-digit decimal number representing the total message length (including the length field itself)
- `TYPE`: Single character indicating message type:
  - `C` = Command (requires response and acknowledgment)
  - `R` = Response (requires acknowledgment)
  - `A` = Acknowledgment (no response needed)
- `DATA`: Variable length payload containing the actual message content

**Protocol Rules:**
1. Maximum message size is 9999 bytes
2. Commands must be acknowledged after receiving the response
3. Sessions maintain state: IDLE → WAITING_ACK → IDLE (or ERROR)
4. Invalid messages or protocol violations result in ERROR state
5. Once in ERROR state, all subsequent messages are rejected

**Supported Commands:**
- `PING`: Server responds with `PONG`
- `TIME`: Server responds with current timestamp (mock: 1234567890)
- `ECHO:<text>`: Server echoes back the provided text

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of messages)
Lines 2 to N+1: Protocol messages in the format <LENGTH>:<TYPE>:<DATA>
```

## Output Format

For each message, output one of:
- Response message (for commands)
- "OK" (for valid acknowledgments)
- "ACK" (for responses received)
- "ERROR: <description>" (for any protocol violations)

## Test Cases
**Input (`input.txt`):**
```
3
0015:C:001:PING
0010:A:001
0015:C:002:TIME
```

**Expected Output (`expected.txt`):**
```
0015:R:001:PONG
OK
0021:R:002:1234567890
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand protocol design and implementation principles
- Learn message framing and parsing techniques
- Practice state machine implementation for protocol handling
- Master error handling and validation in communication protocols
- Develop skills in binary protocol processing and message serialization

## Implementation Guidelines

### Key Components to Implement:
1. **Message Parser**: Parse LENGTH:TYPE:DATA format with validation
2. **State Machine**: Track session state (IDLE, WAITING_ACK, ERROR)
3. **Command Processor**: Handle PING, TIME, and ECHO commands
4. **Response Generator**: Create properly formatted response messages
5. **Acknowledgment Handler**: Validate and process ACK messages
6. **Error Handler**: Detect and report protocol violations

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    session_state = "IDLE"
    last_command_id = None
    
    for _ in range(n):
        message = input().strip()
        result = process_message(message, session_state, last_command_id)
        print(result["output"])
        session_state = result["new_state"]
        if "command_id" in result:
            last_command_id = result["command_id"]

def process_message(message, state, last_command_id):
    # Parse and validate message format
    # Process based on message type
    # Return response and new state
    pass
```

### Go Example Structure:
```go
package main

import (
    "fmt"
    "strconv"
    "strings"
)

type ProtocolState struct {
    State         string
    LastCommandID string
}

func processMessage(message string, state *ProtocolState) string {
    // Parse and validate message format
    // Process based on message type
    // Update state and return response
    return ""
}

func main() {
    var n int
    fmt.Scan(&n)
    
    state := &ProtocolState{State: "IDLE"}
    
    for i := 0; i < n; i++ {
        var message string
        fmt.Scan(&message)
        response := processMessage(message, state)
        fmt.Println(response)
    }
}
```

## Constraints
- 1 ≤ N ≤ 1000 (number of messages)
- 6 ≤ Message length ≤ 9999 bytes
- Command IDs are 3-digit numbers (001-999)
- ECHO payload length ≤ 100 characters
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Start Simple**: Implement basic message parsing first, then add state management
- **Validate Everything**: Check message format, length consistency, and type validity
- **State Tracking**: Maintain session state carefully - ACKs are only valid in WAITING_ACK state
- **Length Calculation**: Remember that LENGTH includes the entire message including the length field
- **Error Handling**: Once in ERROR state, reject all subsequent messages
- **Performance**: Use string operations efficiently for large message sequences
- **Testing**: Create test cases with malformed messages to verify error handling
