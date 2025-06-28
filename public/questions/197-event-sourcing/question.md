# Event Sourcing

## Problem Statement

Implement an event sourcing system for a bank account that tracks deposits and withdrawals as immutable events, then reconstructs the account balance by replaying these events in chronological order.

Event sourcing is a design pattern where changes to application state are stored as a sequence of events. Instead of storing current state, we store the events that led to that state. This enables powerful capabilities like time-travel queries, audit trails, and the ability to rebuild state from scratch.

Your task is to:

1. **Store events** in chronological order (deposits and withdrawals with timestamps)
2. **Handle balance queries** by replaying events up to a specific timestamp
3. **Optimize performance** for scenarios with many events using snapshots

The system should handle out-of-order event insertion and provide accurate balance calculations for any point in time.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of operations, 1 ≤ N ≤ 10,000)
Next N lines: One of the following operations:
  - DEPOSIT amount timestamp (add money to account)
  - WITHDRAW amount timestamp (remove money from account)  
  - BALANCE timestamp (query balance at specific time)
```

Where:
- `amount` is a positive integer (1 ≤ amount ≤ 1,000,000)
- `timestamp` is a non-negative integer representing time (0 ≤ timestamp ≤ 1,000,000)
- Events may arrive out of chronological order
- Multiple events can have the same timestamp

## Test Cases
**Input (`input.txt`):**
```
6
DEPOSIT 1000 1
DEPOSIT 500 2
BALANCE 2
WITHDRAW 200 3
BALANCE 3
BALANCE 1
```

**Expected Output (`expected.txt`):**
```
1500
1300
1000
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand event sourcing architectural pattern
- Implement immutable event storage and replay
- Handle time-based state reconstruction
- Optimize event replay with snapshots
- Practice working with timestamps and chronological ordering
- Learn the difference between current state vs. event history storage

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input())
    events = []  # Store events chronologically
    
    for _ in range(n):
        operation = input().split()
        if operation[0] == "BALANCE":
            timestamp = int(operation[1])
            # Replay events up to timestamp
            balance = replay_events(events, timestamp)
            print(balance)
        else:  # DEPOSIT or WITHDRAW
            amount = int(operation[1])
            timestamp = int(operation[2])
            # Store event in chronological order
            add_event(events, operation[0], amount, timestamp)
```

### Go Example Structure:
```go
type Event struct {
    Type      string
    Amount    int
    Timestamp int
}

func solve() {
    var n int
    fmt.Scan(&n)
    
    events := make([]Event, 0)
    
    for i := 0; i < n; i++ {
        var operation string
        fmt.Scan(&operation)
        
        if operation == "BALANCE" {
            var timestamp int
            fmt.Scan(&timestamp)
            balance := replayEvents(events, timestamp)
            fmt.Println(balance)
        } else {
            var amount, timestamp int
            fmt.Scan(&amount, &timestamp)
            events = addEvent(events, operation, amount, timestamp)
        }
    }
}
```

## Constraints
- 1 ≤ N ≤ 10,000 operations
- 1 ≤ amount ≤ 1,000,000 for deposits/withdrawals
- 0 ≤ timestamp ≤ 1,000,000
- Account can go negative (overdrafts allowed)
- Events may arrive out of chronological order
- Time complexity should be O(N log N) or better for full solution
- Space complexity should be O(N) for storing events

## Hints
- **Start simple**: Store events in a list and replay linearly for each query
- **Handle ordering**: Events may arrive out of chronological order - sort by timestamp
- **Optimize later**: For performance, consider snapshot technique (store balance at intervals)
- **Edge cases**: Empty account (balance 0), negative balances, same timestamps
- **Time travel**: Balance queries can ask for any point in time, even before some events were "recorded"
