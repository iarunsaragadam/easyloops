# Event-driven programming

## Problem Statement

You are tasked with building a user session analytics system that processes login and logout events in chronological order. This system demonstrates core event-driven programming concepts: event processing, state management, and real-time analytics.

Given a sequence of user login and logout events with timestamps, your system must:
1. Track active user sessions
2. Calculate completed session durations
3. Monitor concurrent user counts
4. Generate session analytics

Your program should output three metrics:
- Total number of completed sessions
- Average session duration (integer division, rounded down)
- Maximum number of concurrent users at any point in time

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of events)
Next n lines: timestamp user_id action
```

Where:
- `timestamp` is an integer representing when the event occurred
- `user_id` is a string identifying the user
- `action` is either "LOGIN" or "LOGOUT"

## Test Cases
**Input (`input.txt`):**
```
6
100 alice LOGIN
120 bob LOGIN
150 alice LOGOUT
180 charlie LOGIN
200 bob LOGOUT
220 charlie LOGOUT
```

**Expected Output (`expected.txt`):**
```
3
56
2
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand event-driven programming principles
- Practice event processing and state management
- Implement real-time analytics and monitoring
- Handle chronological event ordering
- Manage concurrent state tracking

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    events = []
    
    # Read and parse events
    for _ in range(n):
        line = input().strip()
        parts = line.split()
        timestamp = int(parts[0])
        user_id = parts[1]
        action = parts[2]
        events.append((timestamp, user_id, action))
    
    # Sort events by timestamp (event-driven processing)
    events.sort()
    
    # Track active sessions and process events
    active_sessions = {}
    completed_sessions = []
    max_concurrent = 0
    current_concurrent = 0
    
    # Process events chronologically
    for timestamp, user_id, action in events:
        if action == "LOGIN":
            # Handle login event
            pass
        elif action == "LOGOUT":
            # Handle logout event
            pass
    
    # Calculate and output analytics
    # Your implementation here
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    // Read and parse events
    events := make([]Event, n)
    for i := 0; i < n; i++ {
        scanner.Scan()
        parts := strings.Fields(scanner.Text())
        timestamp, _ := strconv.Atoi(parts[0])
        userID := parts[1]
        action := parts[2]
        events[i] = Event{timestamp, userID, action}
    }
    
    // Sort events by timestamp
    sort.Slice(events, func(i, j int) bool {
        return events[i].Timestamp < events[j].Timestamp
    })
    
    // Process events and calculate analytics
    // Your implementation here
}
```

## Constraints
- 1 ≤ n ≤ 100,000 (number of events)
- 1 ≤ timestamp ≤ 1,000,000
- user_id length ≤ 20 characters (alphanumeric)
- Each user can have multiple login/logout cycles
- Events may not be in chronological order in input
- A user cannot login if already logged in
- A user cannot logout if not logged in
- Time complexity should be O(n log n) due to sorting

## Hints
- Sort events by timestamp first to process them chronologically
- Use a dictionary/map to track currently active sessions
- Keep track of the maximum concurrent users as you process events
- Only count completed sessions (login followed by logout)
- Use integer division for average calculation
- Consider edge cases: immediate logout, no logouts, duplicate users
