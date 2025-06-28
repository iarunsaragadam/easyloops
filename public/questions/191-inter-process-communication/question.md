# Inter-process Communication: Message Queue Simulation

## Problem Statement

Implement a message queue system that simulates inter-process communication (IPC) mechanisms. Your system must handle multiple processes sending and receiving messages through shared message queues with priority-based delivery and capacity constraints.

In real-world systems, processes need to communicate and coordinate their activities. Message queues are a fundamental IPC mechanism that allows processes to send and receive messages asynchronously. Your task is to simulate this system with the following requirements:

**Core Functionality:**
1. **Queue Creation**: Create message queues with specified capacity limits
2. **Message Sending**: Processes can send messages with priority levels to specific queues
3. **Message Receiving**: Processes can receive messages from queues (highest priority first)
4. **Queue Management**: Handle queue capacity limits and empty queue scenarios

**Message Priority Rules:**
- Messages are delivered based on priority (higher number = higher priority)
- Within the same priority level, messages are delivered in FIFO (First In, First Out) order
- Each message includes the sender process ID, message content, and priority level

**System Constraints:**
- Each queue has a maximum capacity that cannot be exceeded
- Attempting to send to a full queue results in rejection
- Attempting to receive from an empty queue returns an empty result
- Queue IDs and process IDs are positive integers

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of operations)
Lines 2 to N+1: Operations in one of the following formats:
  - CREATE_QUEUE queue_id capacity
  - SEND queue_id process_id message priority
  - RECEIVE queue_id process_id
```

**Operation Details:**
- `CREATE_QUEUE queue_id capacity`: Creates a new message queue with specified ID and capacity
- `SEND queue_id process_id message priority`: Process sends a message to the queue with given priority
- `RECEIVE queue_id process_id`: Process attempts to receive the highest priority message from the queue

## Test Cases

**Input (`input1.txt`):**
```
7
CREATE_QUEUE 1 3
SEND 1 101 hello 5
SEND 1 102 world 3
SEND 1 103 test 7
RECEIVE 1 104
RECEIVE 1 104
RECEIVE 1 104
```

**Expected Output (`expected1.txt`):**
```
CREATED
QUEUED
QUEUED
QUEUED
103:test:7
101:hello:5
102:world:3
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand inter-process communication mechanisms and their importance in system programming
- Learn about message queue systems and their role in process coordination
- Practice implementing priority-based data structures using heaps
- Understand queue capacity management and resource constraints
- Learn about asynchronous communication patterns between processes
- Practice handling edge cases in system programming (empty queues, full queues)
- Understand FIFO ordering within priority levels
- Learn about process identification and message routing

## Implementation Guidelines

### Python Example Structure:
```python
import heapq
from collections import defaultdict

def solve():
    # Data structures for queue management
    queues = {}  # queue_id -> queue_info
    message_counter = 0  # For FIFO ordering
    
    n = int(input().strip())
    
    for _ in range(n):
        operation = input().strip().split()
        cmd = operation[0]
        
        if cmd == "CREATE_QUEUE":
            queue_id = int(operation[1])
            capacity = int(operation[2])
            # Initialize queue with capacity and message storage
            # Use priority queue (heap) for message ordering
            
        elif cmd == "SEND":
            queue_id = int(operation[1])
            process_id = int(operation[2])
            message = operation[3]
            priority = int(operation[4])
            # Check queue capacity and add message if space available
            
        elif cmd == "RECEIVE":
            queue_id = int(operation[1])
            process_id = int(operation[2])
            # Get highest priority message or handle empty queue
```

### Go Example Structure:
```go
import (
    "container/heap"
    "fmt"
    "strconv"
    "strings"
)

type Message struct {
    priority int
    order    int
    pid      int
    content  string
}

func solve() {
    // Implement similar logic using Go's heap interface
    // Handle queue creation, message sending, and receiving
    // Use appropriate data structures for priority queue management
}
```

## Constraints
- 1 ≤ N ≤ 100,000 (number of operations)
- 1 ≤ queue_id ≤ 1,000 (queue identifier)
- 1 ≤ capacity ≤ 10,000 (queue capacity)
- 1 ≤ process_id ≤ 10,000 (process identifier)
- 1 ≤ priority ≤ 100 (message priority)
- Message content is a single word (no spaces)
- All inputs are guaranteed to be valid integers where specified
- Queue IDs are unique (no duplicate CREATE_QUEUE operations)
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Data Structure Choice**: Use a priority queue (heap) to efficiently manage message priorities
- **FIFO Within Priority**: Use a counter to maintain insertion order for messages with the same priority
- **Queue Capacity**: Track the current size of each queue separately from the heap structure
- **Error Handling**: Check for queue existence before SEND/RECEIVE operations
- **Priority Ordering**: Remember that higher priority numbers should be served first
- **Output Format**: For RECEIVE operations, format as "sender_pid:message:priority"
- **Edge Cases**: Handle empty queues, full queues, and non-existent queues gracefully
- **Performance**: Your solution should handle large numbers of operations efficiently (O(log n) per operation)
- **Memory Management**: Be mindful of memory usage when dealing with large message queues
- **Testing Strategy**: Test with single queue, multiple queues, capacity limits, and priority ordering
