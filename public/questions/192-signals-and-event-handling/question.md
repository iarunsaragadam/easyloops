# Signals and Event Handling

## Problem Statement

You are tasked with implementing an **Event Queue Management System** that processes events in real-time applications. This system simulates how modern operating systems, web servers, and embedded systems handle signals and events with different priorities and timing requirements.

Your system must:

1. **Receive events** with timestamps, priorities, types, and associated data
2. **Process events in order** based on priority (lower numbers = higher priority) and timestamp
3. **Maintain system state** by tracking event counts by type
4. **Generate processing reports** showing the order events were handled

This problem demonstrates core concepts in systems programming including:
- Signal/event prioritization and scheduling
- Event queue management and processing
- State management in event-driven systems
- Performance optimization for real-time systems

**Real-world applications:**
- Operating system signal handlers (SIGTERM, SIGINT, etc.)
- Web server request processing
- Game engine event systems  
- IoT device message handling
- Network packet processing

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of events, 0 ≤ n ≤ 100,000)
Lines 2 to n+1: timestamp priority event_type data
```

Where:
- `timestamp`: Integer representing when the event occurred (0 ≤ timestamp ≤ 1,000,000)
- `priority`: Integer priority level (1 = highest priority, 10 = lowest priority)
- `event_type`: String identifier for the event category (max 20 characters)
- `data`: String containing event-specific information (max 100 characters)

## Test Cases

**Input (`input.txt`):**
```
5
100 2 NETWORK packet_received
50 1 SYSTEM startup_complete
150 3 USER button_clicked
75 1 SYSTEM file_loaded
200 2 NETWORK connection_lost
```

**Expected Output (`expected.txt`):**
```
Processing events:
Event 1: [P1] SYSTEM at 50 - startup_complete
Event 2: [P1] SYSTEM at 75 - file_loaded
Event 3: [P2] NETWORK at 100 - packet_received
Event 4: [P2] NETWORK at 200 - connection_lost
Event 5: [P3] USER at 150 - button_clicked
System state:
Total events processed: 5
NETWORK: 2
SYSTEM: 2
USER: 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand event-driven programming and signal handling concepts
- Learn priority-based event scheduling and processing
- Implement efficient queue management using heap data structures
- Practice state management in concurrent/asynchronous systems
- Optimize algorithms for real-time performance requirements
- Handle edge cases in event processing (empty queues, duplicate priorities)

## Implementation Guidelines

### Python Example Structure:
```python
import heapq

def solve():
    n = int(input().strip())
    
    if n == 0:
        print("No events to process")
        return
    
    events = []
    
    # Read and store events in priority queue
    for _ in range(n):
        line = input().strip()
        parts = line.split(' ', 3)
        timestamp = int(parts[0])
        priority = int(parts[1])
        event_type = parts[2]
        data = parts[3] if len(parts) > 3 else ""
        
        # Use tuple for proper ordering: (priority, timestamp, event_type, data)
        heapq.heappush(events, (priority, timestamp, event_type, data))
    
    # Process events and maintain state
    processed_count = 0
    event_type_counts = {}
    
    print("Processing events:")
    
    while events:
        priority, timestamp, event_type, data = heapq.heappop(events)
        processed_count += 1
        
        # Update state
        event_type_counts[event_type] = event_type_counts.get(event_type, 0) + 1
        
        # Output processed event
        print(f"Event {processed_count}: [P{priority}] {event_type} at {timestamp} - {data}")
    
    # Output final system state
    print("System state:")
    print(f"Total events processed: {processed_count}")
    for event_type in sorted(event_type_counts.keys()):
        count = event_type_counts[event_type]
        print(f"{event_type}: {count}")
```

### Go Example Structure:
```go
import (
    "bufio"
    "container/heap"
    "fmt"
    "os"
    "sort"
    "strconv"
    "strings"
)

type Event struct {
    timestamp int
    priority  int
    eventType string
    data      string
}

type EventQueue []*Event

func (eq EventQueue) Len() int { return len(eq) }
func (eq EventQueue) Less(i, j int) bool {
    if eq[i].priority != eq[j].priority {
        return eq[i].priority < eq[j].priority
    }
    return eq[i].timestamp < eq[j].timestamp
}
func (eq EventQueue) Swap(i, j int) { eq[i], eq[j] = eq[j], eq[i] }

func (eq *EventQueue) Push(x interface{}) {
    *eq = append(*eq, x.(*Event))
}

func (eq *EventQueue) Pop() interface{} {
    old := *eq
    n := len(old)
    event := old[n-1]
    *eq = old[0 : n-1]
    return event
}

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    if n == 0 {
        fmt.Println("No events to process")
        return
    }
    
    eventQueue := &EventQueue{}
    heap.Init(eventQueue)
    
    // Read events
    for i := 0; i < n; i++ {
        scanner.Scan()
        parts := strings.SplitN(scanner.Text(), " ", 4)
        timestamp, _ := strconv.Atoi(parts[0])
        priority, _ := strconv.Atoi(parts[1])
        eventType := parts[2]
        data := ""
        if len(parts) > 3 {
            data = parts[3]
        }
        
        event := &Event{
            timestamp: timestamp,
            priority:  priority,
            eventType: eventType,
            data:      data,
        }
        heap.Push(eventQueue, event)
    }
    
    // Process events
    processedCount := 0
    eventTypeCounts := make(map[string]int)
    
    fmt.Println("Processing events:")
    
    for eventQueue.Len() > 0 {
        event := heap.Pop(eventQueue).(*Event)
        processedCount++
        
        eventTypeCounts[event.eventType]++
        
        fmt.Printf("Event %d: [P%d] %s at %d - %s\n", 
            processedCount, event.priority, event.eventType, event.timestamp, event.data)
    }
    
    // Output final state
    fmt.Println("System state:")
    fmt.Printf("Total events processed: %d\n", processedCount)
    
    var eventTypes []string
    for eventType := range eventTypeCounts {
        eventTypes = append(eventTypes, eventType)
    }
    sort.Strings(eventTypes)
    
    for _, eventType := range eventTypes {
        fmt.Printf("%s: %d\n", eventType, eventTypeCounts[eventType])
    }
}
```

## Constraints
- 0 ≤ n ≤ 100,000 (number of events)
- 0 ≤ timestamp ≤ 1,000,000
- 1 ≤ priority ≤ 10 (1 = highest priority)
- event_type: alphanumeric string, max 20 characters
- data: string, max 100 characters
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Start Simple**: Handle the empty event case first, then single events
- **Priority Matters**: Events with lower priority numbers are processed first
- **Break Ties**: When priorities are equal, process events by timestamp (earlier first)
- **Use Right Data Structure**: A naive O(n²) sorting approach will timeout on large inputs. Consider using a heap/priority queue for O(n log n) performance
- **State Tracking**: Keep count of each event type as you process events
- **Output Format**: Pay attention to the exact output format including spacing and brackets
