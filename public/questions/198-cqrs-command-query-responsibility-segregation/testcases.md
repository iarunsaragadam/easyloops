# Test Cases for CQRS (Command Query Responsibility Segregation)

## Test Case Structure
This question uses a **multi-line input format** where the first line contains the number of operations, followed by that many operations mixing commands and queries.

### Input Format Pattern:
```
Line 1: n (number of operations)
Next n lines: OPERATION_TYPE OPERATION_NAME [arguments...]
```

Where:
- `OPERATION_TYPE`: "COMMAND" or "QUERY"
- `OPERATION_NAME`: ADD_EVENT, UPDATE_EVENT, GET_EVENTS_BY_TYPE, COUNT_EVENTS, GET_RECENT_EVENTS
- Arguments depend on the specific operation

### Output Format Pattern:
```
One line per operation with results:
- Commands: EVENT_ADDED:<id>, EVENT_UPDATED:<id>, EVENT_NOT_FOUND
- Queries: Data results (pipe-separated for multiple items), NO_EVENTS for empty results
```

## Test Case 1: Basic CQRS Operations
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

**Description:** Tests basic command-query separation with event addition and various query types. Demonstrates how commands modify the event store while queries read from optimized projections.

## Test Case 2: Edge Cases and Error Handling
**Input (`input2.txt`):**
```
8
COMMAND ADD_EVENT payment processed 1500
QUERY COUNT_EVENTS
QUERY COUNT_EVENTS payment
COMMAND UPDATE_EVENT 1 refunded
QUERY GET_EVENTS_BY_TYPE payment
COMMAND UPDATE_EVENT 999 invalid
QUERY GET_EVENTS_BY_TYPE nonexistent
QUERY GET_RECENT_EVENTS 10
```

**Expected Output (`expected2.txt`):**
```
EVENT_ADDED:1
1
1
EVENT_UPDATED:1
1:refunded:1500
EVENT_NOT_FOUND
NO_EVENTS
1:payment:refunded
```

**Description:** Tests edge cases including empty queries, event updates, non-existent event updates, and queries for non-existent event types. Also tests recent events when there are fewer events than the requested limit.

## Test Case 3: Performance and Complex Scenarios
**Input (`input3.txt`):**
```
15
COMMAND ADD_EVENT type_A data_1 1000
COMMAND ADD_EVENT type_B data_2 1001
COMMAND ADD_EVENT type_A data_3 1002
COMMAND ADD_EVENT type_C data_4 1003
COMMAND ADD_EVENT type_A data_5 1004
QUERY GET_EVENTS_BY_TYPE type_A
QUERY COUNT_EVENTS
QUERY COUNT_EVENTS type_B
COMMAND UPDATE_EVENT 2 updated_data
COMMAND UPDATE_EVENT 4 updated_data_c
QUERY GET_EVENTS_BY_TYPE type_B
QUERY GET_EVENTS_BY_TYPE type_C
QUERY GET_RECENT_EVENTS 3
QUERY COUNT_EVENTS type_A
QUERY COUNT_EVENTS
```

**Expected Output (`expected3.txt`):**
```
EVENT_ADDED:1
EVENT_ADDED:2
EVENT_ADDED:3
EVENT_ADDED:4
EVENT_ADDED:5
1:data_1:1000|3:data_3:1002|5:data_5:1004
5
1
EVENT_UPDATED:2
EVENT_UPDATED:4
2:updated_data:1001
4:updated_data_c:1003
3:type_A:data_3|4:type_C:updated_data_c|5:type_A:data_5
3
5
```

**Description:** Tests multiple event types, mixed operations, and verifies that projections are correctly maintained during updates. Tests efficiency of type-based queries and recent events tracking.

## Test Case Creation Rules

### Input Validation Rules:
1. **Operation count**: First line must be a positive integer (1 ≤ n ≤ 100,000)
2. **Operation format**: Each operation line must start with "COMMAND" or "QUERY"
3. **Command arguments**:
   - ADD_EVENT: requires event_type, data, timestamp (all strings/integers)
   - UPDATE_EVENT: requires event_id (integer), new_data (string)
4. **Query arguments**:
   - GET_EVENTS_BY_TYPE: requires event_type (string)
   - COUNT_EVENTS: optional event_type (string)
   - GET_RECENT_EVENTS: requires limit (positive integer ≤ 100)
5. **Event types and data**: alphanumeric strings, no spaces in individual tokens
6. **Timestamps**: positive integers

### Output Format Rules:
1. **Command responses**:
   - Successful ADD_EVENT: "EVENT_ADDED:<auto_increment_id>"
   - Successful UPDATE_EVENT: "EVENT_UPDATED:<event_id>"
   - Failed UPDATE_EVENT: "EVENT_NOT_FOUND"
2. **Query responses**:
   - GET_EVENTS_BY_TYPE: "<id>:<data>:<timestamp>" pipe-separated, or "NO_EVENTS"
   - COUNT_EVENTS: integer count as string
   - GET_RECENT_EVENTS: "<id>:<type>:<data>" pipe-separated, or "NO_EVENTS"
3. **No trailing whitespace** on any line
4. **Exact format matching** required for all outputs

## Language-Specific Considerations

### Python Considerations:
- Use `defaultdict` for projections to avoid key errors
- Use `deque` with maxlen for efficient recent events tracking
- String operations: `line.strip().split()` for parsing
- Dictionary lookups are O(1) average case
- List appends are O(1) amortized
- Consider using `collections.OrderedDict` if insertion order matters

### Go Considerations:
- Use `map[string][]Event` for type-based projections
- Use slices for event storage and recent events
- String operations: `strings.Fields()` for parsing
- Map lookups are O(1) average case
- Slice appends are O(1) amortized
- Use `strconv` package for string-to-integer conversions
- Consider using buffered I/O for large inputs

## Validation Checklist

When creating new test cases, ensure:

- [ ] First line contains a valid positive integer (operation count)
- [ ] Exactly that many operation lines follow
- [ ] Each operation line starts with "COMMAND" or "QUERY"
- [ ] All command/query names are valid (ADD_EVENT, UPDATE_EVENT, etc.)
- [ ] Arguments match the expected format for each operation
- [ ] Event IDs in UPDATE_EVENT commands are reasonable (1 to current max)
- [ ] Expected output has exact number of lines as operations
- [ ] Command outputs follow the specified format patterns
- [ ] Query outputs are correctly formatted (pipe-separated, proper structure)
- [ ] No trailing whitespace in input or output
- [ ] Test covers both successful and error scenarios

## Automated Test Case Generation

```python
import random

def generate_test_case(num_operations=20, num_event_types=5):
    """Generate a random test case for CQRS implementation"""
    operations = []
    expected_outputs = []
    
    # Simulate the CQRS system to generate expected outputs
    events = []
    events_by_type = {}
    event_counts = {}
    recent_events = []
    next_id = 1
    
    event_types = [f"type_{i}" for i in range(num_event_types)]
    
    for i in range(num_operations):
        if random.random() < 0.7:  # 70% commands, 30% queries
            # Generate command
            if random.random() < 0.8:  # 80% ADD_EVENT, 20% UPDATE_EVENT
                # ADD_EVENT
                event_type = random.choice(event_types)
                data = f"data_{i}"
                timestamp = 1000 + i
                operations.append(f"COMMAND ADD_EVENT {event_type} {data} {timestamp}")
                
                # Simulate adding event
                event = {'id': next_id, 'type': event_type, 'data': data, 'timestamp': timestamp}
                events.append(event)
                if event_type not in events_by_type:
                    events_by_type[event_type] = []
                    event_counts[event_type] = 0
                events_by_type[event_type].append(event)
                event_counts[event_type] += 1
                recent_events.append(event)
                if len(recent_events) > 10:  # Keep last 10
                    recent_events.pop(0)
                
                expected_outputs.append(f"EVENT_ADDED:{next_id}")
                next_id += 1
            else:
                # UPDATE_EVENT
                if events:
                    event_id = random.choice([e['id'] for e in events])
                    new_data = f"updated_{i}"
                    operations.append(f"COMMAND UPDATE_EVENT {event_id} {new_data}")
                    
                    # Simulate update
                    for event in events:
                        if event['id'] == event_id:
                            event['data'] = new_data
                            break
                    for event_type, type_events in events_by_type.items():
                        for event in type_events:
                            if event['id'] == event_id:
                                event['data'] = new_data
                                break
                    for event in recent_events:
                        if event['id'] == event_id:
                            event['data'] = new_data
                            break
                    
                    expected_outputs.append(f"EVENT_UPDATED:{event_id}")
                else:
                    # No events to update
                    operations.append(f"COMMAND UPDATE_EVENT 1 {f'updated_{i}'}")
                    expected_outputs.append("EVENT_NOT_FOUND")
        else:
            # Generate query
            query_type = random.choice(['GET_EVENTS_BY_TYPE', 'COUNT_EVENTS', 'GET_RECENT_EVENTS'])
            
            if query_type == 'GET_EVENTS_BY_TYPE':
                event_type = random.choice(event_types)
                operations.append(f"QUERY GET_EVENTS_BY_TYPE {event_type}")
                
                if event_type in events_by_type and events_by_type[event_type]:
                    result_parts = []
                    for event in events_by_type[event_type]:
                        result_parts.append(f"{event['id']}:{event['data']}:{event['timestamp']}")
                    expected_outputs.append("|".join(result_parts))
                else:
                    expected_outputs.append("NO_EVENTS")
                    
            elif query_type == 'COUNT_EVENTS':
                if random.random() < 0.5 and event_types:
                    # Count specific type
                    event_type = random.choice(event_types)
                    operations.append(f"QUERY COUNT_EVENTS {event_type}")
                    count = event_counts.get(event_type, 0)
                    expected_outputs.append(str(count))
                else:
                    # Count all
                    operations.append("QUERY COUNT_EVENTS")
                    expected_outputs.append(str(len(events)))
                    
            else:  # GET_RECENT_EVENTS
                limit = random.randint(1, 5)
                operations.append(f"QUERY GET_RECENT_EVENTS {limit}")
                
                if recent_events:
                    recent_subset = recent_events[-limit:]
                    result_parts = []
                    for event in recent_subset:
                        result_parts.append(f"{event['id']}:{event['type']}:{event['data']}")
                    expected_outputs.append("|".join(result_parts))
                else:
                    expected_outputs.append("NO_EVENTS")
    
    # Generate input content
    input_content = f"{len(operations)}\n" + "\n".join(operations) + "\n"
    
    # Generate expected output content
    expected_content = "\n".join(expected_outputs) + "\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the proper format"""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    # Check input format
    try:
        n = int(input_lines[0])
        assert len(input_lines) == n + 1, f"Expected {n+1} input lines, got {len(input_lines)}"
        assert len(expected_lines) == n, f"Expected {n} output lines, got {len(expected_lines)}"
        
        for i, line in enumerate(input_lines[1:], 1):
            parts = line.split()
            assert len(parts) >= 2, f"Line {i}: Invalid operation format"
            assert parts[0] in ['COMMAND', 'QUERY'], f"Line {i}: Invalid operation type"
            
            if parts[0] == 'COMMAND':
                assert parts[1] in ['ADD_EVENT', 'UPDATE_EVENT'], f"Line {i}: Invalid command"
                if parts[1] == 'ADD_EVENT':
                    assert len(parts) == 5, f"Line {i}: ADD_EVENT requires 4 arguments"
                elif parts[1] == 'UPDATE_EVENT':
                    assert len(parts) == 4, f"Line {i}: UPDATE_EVENT requires 3 arguments"
            else:  # QUERY
                assert parts[1] in ['GET_EVENTS_BY_TYPE', 'COUNT_EVENTS', 'GET_RECENT_EVENTS'], f"Line {i}: Invalid query"
        
        return True, "Test case is valid"
    
    except Exception as e:
        return False, f"Validation failed: {str(e)}"

# Example usage
if __name__ == "__main__":
    input_data, expected_output = generate_test_case(10, 3)
    print("Generated input:")
    print(input_data)
    print("Expected output:")
    print(expected_output)
    
    is_valid, message = validate_test_case(input_data, expected_output)
    print(f"Validation: {message}")
```

This comprehensive test strategy ensures that implementations correctly handle the CQRS pattern, maintain proper separation between commands and queries, and efficiently manage both event storage and query projections.
