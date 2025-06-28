# Test Cases for Signals and Event Handling

## Test Case Structure
This question uses a multi-line input format for an Event Queue Management System.

### Input Format Pattern:
```
Line 1: n (number of events, 0 ≤ n ≤ 100,000)
Lines 2 to n+1: timestamp priority event_type data
```

### Output Format Pattern:
```
Processing events:
Event X: [PY] event_type at timestamp - data
...
System state:
Total events processed: X
event_type1: count1
event_type2: count2
...
```

## Test Case Categories

### Basic Test Cases (input1.txt - input30.txt)
Simple scenarios to verify core functionality:
- Small number of events (1-10)
- Clear priority ordering
- Various event types
- Straightforward timestamp sequences

### Edge Cases (input31.txt - input60.txt)
Boundary conditions and special scenarios:
- Empty event queue (n = 0)
- Single event
- Events with same priority (timestamp ordering)
- Events with same timestamp (priority ordering)
- Maximum constraints (large timestamps, priority 10)
- Minimum constraints (timestamp 0, priority 1)

### Performance Test Cases (input61.txt - input90.txt)
Large inputs that test algorithm efficiency:
- 10,000+ events with random ordering
- Worst-case scenarios for naive sorting
- Large datasets requiring O(n log n) performance
- Memory usage optimization

### Complex Scenarios (input91.txt - input100+.txt)
Multi-faceted test cases combining multiple challenges:
- Mixed priorities with complex timestamp patterns
- Many different event types
- Real-world simulation scenarios
- Stress testing with maximum constraints

## Test Case 1: Basic Priority and Timestamp Ordering
**Input (`input1.txt`):**
```
5
100 2 NETWORK packet_received
50 1 SYSTEM startup_complete
150 3 USER button_clicked
75 1 SYSTEM file_loaded
200 2 NETWORK connection_lost
```
**Expected Output (`expected1.txt`):**
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

## Test Case 2: Empty Event Queue
**Input (`input2.txt`):**
```
0
```
**Expected Output (`expected2.txt`):**
```
No events to process
```

## Test Case 3: Single Event
**Input (`input3.txt`):**
```
1
42 5 TEST single_event_test
```
**Expected Output (`expected3.txt`):**
```
Processing events:
Event 1: [P5] TEST at 42 - single_event_test
System state:
Total events processed: 1
TEST: 1
```

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a non-negative integer n (0 ≤ n ≤ 100,000)
2. Following n lines must have format: timestamp priority event_type data
3. timestamp: integer, 0 ≤ timestamp ≤ 1,000,000
4. priority: integer, 1 ≤ priority ≤ 10
5. event_type: alphanumeric string, max 20 characters
6. data: string, max 100 characters (can contain spaces)
7. Each line must be properly formatted with space separators

### Output Format Rules:
1. Empty queue: "No events to process"
2. Non-empty queue: Start with "Processing events:"
3. Each event: "Event X: [PY] event_type at timestamp - data"
4. Follow with "System state:"
5. Total count: "Total events processed: X"
6. Event type counts in alphabetical order: "event_type: count"
7. No trailing spaces or extra newlines

### Event Processing Rules:
1. Primary sort: by priority (1 = highest, 10 = lowest)
2. Secondary sort: by timestamp (earlier events first)
3. Event types are case-sensitive
4. Maintain accurate counts for each event type
5. Process events in exact order determined by priority/timestamp

## Language-Specific Considerations

### Python Considerations:
- Use `heapq` module for efficient priority queue operations
- Handle input parsing carefully with `split(' ', 3)` to preserve spaces in data
- Use dictionaries for event type counting
- Sort event types alphabetically for consistent output
- Handle empty input gracefully

### Go Considerations:
- Implement heap interface for custom Event struct
- Use `container/heap` package for priority queue
- Handle string splitting with `strings.SplitN(line, " ", 4)`
- Use maps for event type counting
- Sort keys before output for consistent ordering
- Handle scanner input line by line

### Performance Considerations:
- Naive O(n²) approach: sorting after each insertion
- Efficient O(n log n) approach: using heap/priority queue
- Memory usage: avoid storing unnecessary data structures
- Large input handling: process events incrementally

## Validation Checklist
- [ ] Input follows exact format specification
- [ ] All timestamps and priorities within valid ranges
- [ ] Event types are valid alphanumeric strings
- [ ] Data fields preserve spaces correctly
- [ ] Output format matches exactly (brackets, spacing, colons)
- [ ] Events processed in correct priority/timestamp order
- [ ] Event type counts are accurate
- [ ] Event types displayed in alphabetical order
- [ ] Empty input case handled correctly
- [ ] Large input performance is acceptable (< 2 seconds)

## Automated Test Case Generation

### Performance Test Case Generator:
```python
import random

def generate_performance_test_case(n, filename_prefix):
    """Generate large test case for performance testing."""
    events = []
    event_types = ['SYSTEM', 'NETWORK', 'USER', 'DATABASE', 'SECURITY', 'ERROR', 'WARNING', 'INFO']
    
    for i in range(n):
        timestamp = random.randint(0, 1000000)
        priority = random.randint(1, 10)
        event_type = random.choice(event_types)
        data = f"event_data_{i}_{random.randint(1000, 9999)}"
        events.append((timestamp, priority, event_type, data))
    
    # Write input file
    with open(f"{filename_prefix}.txt", "w") as f:
        f.write(f"{n}\n")
        for timestamp, priority, event_type, data in events:
            f.write(f"{timestamp} {priority} {event_type} {data}\n")
    
    return events

def generate_expected_output(events, filename_prefix):
    """Generate expected output for given events."""
    import heapq
    
    if not events:
        with open(f"{filename_prefix}.txt", "w") as f:
            f.write("No events to process\n")
        return
    
    # Sort events using heap
    heap = []
    for timestamp, priority, event_type, data in events:
        heapq.heappush(heap, (priority, timestamp, event_type, data))
    
    processed_count = 0
    event_type_counts = {}
    
    output_lines = ["Processing events:"]
    
    while heap:
        priority, timestamp, event_type, data = heapq.heappop(heap)
        processed_count += 1
        event_type_counts[event_type] = event_type_counts.get(event_type, 0) + 1
        output_lines.append(f"Event {processed_count}: [P{priority}] {event_type} at {timestamp} - {data}")
    
    output_lines.append("System state:")
    output_lines.append(f"Total events processed: {processed_count}")
    
    for event_type in sorted(event_type_counts.keys()):
        count = event_type_counts[event_type]
        output_lines.append(f"{event_type}: {count}")
    
    with open(f"{filename_prefix}.txt", "w") as f:
        f.write("\n".join(output_lines) + "\n")

def validate_test_case(input_content, expected_content):
    """Validate that test case follows all rules."""
    lines = input_content.strip().split('\n')
    
    if not lines:
        return False, "Empty input"
    
    try:
        n = int(lines[0])
        if n < 0 or n > 100000:
            return False, f"Invalid n: {n}"
        
        if n == 0:
            return expected_content.strip() == "No events to process", "Empty case validation failed"
        
        if len(lines) != n + 1:
            return False, f"Expected {n+1} lines, got {len(lines)}"
        
        for i in range(1, n + 1):
            parts = lines[i].split(' ', 3)
            if len(parts) < 3:
                return False, f"Line {i+1}: insufficient parts"
            
            timestamp = int(parts[0])
            priority = int(parts[1])
            event_type = parts[2]
            
            if timestamp < 0 or timestamp > 1000000:
                return False, f"Line {i+1}: invalid timestamp {timestamp}"
            
            if priority < 1 or priority > 10:
                return False, f"Line {i+1}: invalid priority {priority}"
            
            if not event_type.replace('_', '').replace('-', '').isalnum():
                return False, f"Line {i+1}: invalid event_type {event_type}"
            
            if len(event_type) > 20:
                return False, f"Line {i+1}: event_type too long"
            
            if len(parts) > 3 and len(parts[3]) > 100:
                return False, f"Line {i+1}: data too long"
        
        return True, "Valid test case"
    
    except ValueError as e:
        return False, f"Parse error: {e}"
    except Exception as e:
        return False, f"Validation error: {e}"
```

## Test Case Quality Standards
- Each test case must have a clear purpose (basic, edge, performance, complex)
- Input data should be realistic and educational
- Expected outputs must be generated by working solution
- Performance test cases should timeout naive O(n²) implementations
- Edge cases should cover all boundary conditions
- Complex scenarios should combine multiple challenging aspects
- All test cases must pass validation rules
- Test coverage should be comprehensive across all features
