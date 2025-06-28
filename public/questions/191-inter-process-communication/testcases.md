# Test Cases for Inter-process Communication: Message Queue Simulation

## Test Case Structure

This question uses a **variable-line input format** where the first line specifies the number of operations, followed by operation lines.

### Input Format Pattern:
```
Line 1: N (number of operations, 1 ≤ N ≤ 100,000)
Lines 2 to N+1: Operations in one of three formats:
  - CREATE_QUEUE queue_id capacity
  - SEND queue_id process_id message priority
  - RECEIVE queue_id process_id
```

### Output Format Pattern:
```
For CREATE_QUEUE: "CREATED"
For SEND operations: "QUEUED" or "QUEUE_FULL" or "QUEUE_NOT_EXISTS"
For RECEIVE operations: "sender_pid:message:priority" or "EMPTY" or "QUEUE_NOT_EXISTS"
```

## Test Case Categories

### Basic Test Cases (Test Cases 1-20)
Simple scenarios that verify core functionality:

#### Test Case 1: Basic Queue Operations
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
**Description:** Tests basic queue creation, message sending with different priorities, and receiving in priority order.

#### Test Case 2: Queue Capacity Limit
**Input (`input2.txt`):**
```
6
CREATE_QUEUE 1 2
SEND 1 101 msg1 1
SEND 1 102 msg2 2
SEND 1 103 msg3 3
RECEIVE 1 104
RECEIVE 1 104
```
**Expected Output (`expected2.txt`):**
```
CREATED
QUEUED
QUEUED
QUEUE_FULL
102:msg2:2
101:msg1:1
```
**Description:** Tests queue capacity enforcement and rejection of messages when queue is full.

### Edge Cases (Test Cases 21-40)
Boundary conditions and special scenarios:

#### Test Case 21: Empty Queue
**Input (`input21.txt`):**
```
3
CREATE_QUEUE 1 5
RECEIVE 1 101
RECEIVE 1 102
```
**Expected Output (`expected21.txt`):**
```
CREATED
EMPTY
EMPTY
```
**Description:** Tests receiving from an empty queue.

#### Test Case 22: Non-existent Queue
**Input (`input22.txt`):**
```
3
SEND 999 101 hello 5
RECEIVE 999 102
CREATE_QUEUE 1 3
```
**Expected Output (`expected22.txt`):**
```
QUEUE_NOT_EXISTS
QUEUE_NOT_EXISTS
CREATED
```
**Description:** Tests operations on non-existent queues.

#### Test Case 23: Same Priority FIFO
**Input (`input23.txt`):**
```
6
CREATE_QUEUE 1 5
SEND 1 101 first 5
SEND 1 102 second 5
SEND 1 103 third 5
RECEIVE 1 104
RECEIVE 1 104
```
**Expected Output (`expected23.txt`):**
```
CREATED
QUEUED
QUEUED
QUEUED
101:first:5
102:second:5
```
**Description:** Tests FIFO ordering within the same priority level.

### Performance Test Cases (Test Cases 41-70)
Large inputs that test algorithmic efficiency:

#### Test Case 41: Large Number of Operations
**Input (`input41.txt`):**
```
50001
CREATE_QUEUE 1 25000
[25000 SEND operations with various priorities]
[25000 RECEIVE operations]
```
**Description:** Tests performance with maximum number of operations. Should timeout O(n²) solutions.

#### Test Case 42: Multiple Queues with High Load
**Input (`input42.txt`):**
```
30001
CREATE_QUEUE 1 5000
CREATE_QUEUE 2 5000
CREATE_QUEUE 3 5000
[10000 SEND operations distributed across queues]
[20000 RECEIVE operations from different queues]
```
**Description:** Tests scalability with multiple queues and heavy message traffic.

### Complex Scenarios (Test Cases 71-90)
Multiple edge cases combined:

#### Test Case 71: Mixed Priority Patterns
**Input (`input71.txt`):**
```
20
CREATE_QUEUE 1 10
SEND 1 101 low 1
SEND 1 102 high 10
SEND 1 103 med 5
SEND 1 104 low2 1
SEND 1 105 high2 10
RECEIVE 1 201
SEND 1 106 med2 5
RECEIVE 1 201
RECEIVE 1 201
RECEIVE 1 201
RECEIVE 1 201
RECEIVE 1 201
```
**Expected Output (`expected71.txt`):**
```
CREATED
QUEUED
QUEUED
QUEUED
QUEUED
QUEUED
102:high:10
QUEUED
105:high2:10
103:med:5
106:med2:5
101:low:1
104:low2:1
```
**Description:** Tests complex priority handling with interleaved operations.

### Corner Cases (Test Cases 91-100)
Unusual but valid inputs:

#### Test Case 91: Single Message Queue
**Input (`input91.txt`):**
```
4
CREATE_QUEUE 1 1
SEND 1 101 only 1
RECEIVE 1 102
RECEIVE 1 103
```
**Expected Output (`expected91.txt`):**
```
CREATED
QUEUED
101:only:1
EMPTY
```
**Description:** Tests queue with capacity of 1.

#### Test Case 92: Maximum Priority Values
**Input (`input92.txt`):**
```
5
CREATE_QUEUE 1 3
SEND 1 101 max 100
SEND 1 102 min 1
RECEIVE 1 103
RECEIVE 1 103
```
**Expected Output (`expected92.txt`):**
```
CREATED
QUEUED
QUEUED
101:max:100
102:min:1
```
**Description:** Tests boundary priority values.

## Test Case Creation Rules

### Input Validation Rules:
1. **Number of operations**: 1 ≤ N ≤ 100,000
2. **Queue ID**: 1 ≤ queue_id ≤ 1,000 (positive integers)
3. **Capacity**: 1 ≤ capacity ≤ 10,000 (positive integers)
4. **Process ID**: 1 ≤ process_id ≤ 10,000 (positive integers)
5. **Priority**: 1 ≤ priority ≤ 100 (positive integers)
6. **Message content**: Single word, no spaces, alphanumeric characters
7. **Operation format**: Exactly as specified (case-sensitive)
8. **Queue uniqueness**: Each queue_id used in CREATE_QUEUE only once

### Output Format Rules:
1. **CREATE_QUEUE response**: Exactly "CREATED"
2. **SEND responses**: "QUEUED", "QUEUE_FULL", or "QUEUE_NOT_EXISTS"
3. **RECEIVE responses**: "pid:message:priority", "EMPTY", or "QUEUE_NOT_EXISTS"
4. **Line endings**: Each output line ends with a single newline
5. **No extra whitespace**: No trailing spaces or extra blank lines
6. **Case sensitivity**: All outputs are case-sensitive and exact

## Language-Specific Considerations

### Python Considerations:
- Use `heapq` module for priority queue implementation
- Handle negative priorities for max-heap behavior: `heapq.heappush(heap, (-priority, order, data))`
- Use `input().strip().split()` for parsing operations
- Implement proper error checking for queue existence
- Use integer conversion: `int(operation[1])` for IDs and priorities

### Go Considerations:
- Implement `heap.Interface` for custom priority queue
- Use `strconv.Atoi()` for string to integer conversion
- Handle string parsing with `strings.Split()`
- Implement proper struct for message storage
- Use `fmt.Printf()` for exact output formatting

### JavaScript Considerations:
- Implement custom priority queue class (no built-in heap)
- Use `parseInt()` for number conversion
- Handle string operations with `split()` and `trim()`
- Implement proper comparison functions for priority ordering

## Validation Checklist

When creating or validating test cases, ensure:

- [ ] Input format follows the exact specification
- [ ] First line contains valid operation count N
- [ ] All operations use correct command names (CREATE_QUEUE, SEND, RECEIVE)
- [ ] All numeric values are within specified ranges
- [ ] Queue IDs are unique in CREATE_QUEUE operations
- [ ] Message content contains no spaces
- [ ] Expected output matches exact format requirements
- [ ] Output has correct number of lines (one per operation)
- [ ] No trailing whitespace in output lines
- [ ] Priority ordering is correctly calculated
- [ ] FIFO ordering within same priority is maintained
- [ ] Queue capacity limits are properly enforced
- [ ] Error cases (empty queue, full queue, non-existent queue) are handled

## Automated Test Case Generation

### Basic Test Case Generator:
```python
import random
import heapq

def generate_basic_test_case(num_ops=20, num_queues=3, max_capacity=10):
    operations = []
    queues_created = set()
    
    # Ensure at least one queue is created
    queue_id = random.randint(1, num_queues)
    capacity = random.randint(1, max_capacity)
    operations.append(f"CREATE_QUEUE {queue_id} {capacity}")
    queues_created.add(queue_id)
    
    for _ in range(num_ops - 1):
        op_type = random.choice(["CREATE_QUEUE", "SEND", "RECEIVE"])
        
        if op_type == "CREATE_QUEUE" and len(queues_created) < num_queues:
            queue_id = random.randint(1, 1000)
            while queue_id in queues_created:
                queue_id = random.randint(1, 1000)
            capacity = random.randint(1, max_capacity)
            operations.append(f"CREATE_QUEUE {queue_id} {capacity}")
            queues_created.add(queue_id)
            
        elif op_type == "SEND" and queues_created:
            queue_id = random.choice(list(queues_created))
            pid = random.randint(1, 1000)
            message = f"msg{random.randint(1, 999)}"
            priority = random.randint(1, 100)
            operations.append(f"SEND {queue_id} {pid} {message} {priority}")
            
        elif op_type == "RECEIVE" and queues_created:
            queue_id = random.choice(list(queues_created))
            pid = random.randint(1, 1000)
            operations.append(f"RECEIVE {queue_id} {pid}")
    
    return operations

def simulate_expected_output(operations):
    """Simulate the expected output for given operations"""
    queues = {}
    message_counter = 0
    output = []
    
    for op in operations:
        parts = op.split()
        cmd = parts[0]
        
        if cmd == "CREATE_QUEUE":
            queue_id = int(parts[1])
            capacity = int(parts[2])
            queues[queue_id] = {'capacity': capacity, 'messages': [], 'size': 0}
            output.append("CREATED")
            
        elif cmd == "SEND":
            queue_id = int(parts[1])
            pid = int(parts[2])
            message = parts[3]
            priority = int(parts[4])
            
            if queue_id not in queues:
                output.append("QUEUE_NOT_EXISTS")
            elif queues[queue_id]['size'] >= queues[queue_id]['capacity']:
                output.append("QUEUE_FULL")
            else:
                heapq.heappush(queues[queue_id]['messages'], 
                             (-priority, message_counter, pid, message))
                queues[queue_id]['size'] += 1
                message_counter += 1
                output.append("QUEUED")
                
        elif cmd == "RECEIVE":
            queue_id = int(parts[1])
            
            if queue_id not in queues:
                output.append("QUEUE_NOT_EXISTS")
            elif queues[queue_id]['size'] == 0:
                output.append("EMPTY")
            else:
                neg_priority, order, sender_pid, message = heapq.heappop(queues[queue_id]['messages'])
                queues[queue_id]['size'] -= 1
                priority = -neg_priority
                output.append(f"{sender_pid}:{message}:{priority}")
    
    return output
```

### Performance Test Case Generator:
```python
def generate_performance_test_case(num_operations=50000):
    """Generate large test case to test algorithmic efficiency"""
    operations = []
    
    # Create multiple queues
    num_queues = 10
    for i in range(1, num_queues + 1):
        operations.append(f"CREATE_QUEUE {i} {num_operations // num_queues}")
    
    # Generate many SEND operations
    for i in range(num_operations // 2):
        queue_id = random.randint(1, num_queues)
        pid = random.randint(1, 10000)
        message = f"msg{i}"
        priority = random.randint(1, 100)
        operations.append(f"SEND {queue_id} {pid} {message} {priority}")
    
    # Generate many RECEIVE operations
    for i in range(num_operations // 2):
        queue_id = random.randint(1, num_queues)
        pid = random.randint(1, 10000)
        operations.append(f"RECEIVE {queue_id} {pid}")
    
    return operations
```

## Test Case Quality Metrics

### Coverage Requirements:
- **Command Coverage**: All three commands (CREATE_QUEUE, SEND, RECEIVE) tested
- **Error Coverage**: All error conditions tested (full queue, empty queue, non-existent queue)
- **Priority Coverage**: Various priority values and combinations tested
- **Capacity Coverage**: Different queue capacities and capacity limit scenarios
- **Scale Coverage**: Small and large input sizes tested
- **Edge Coverage**: Boundary values and corner cases tested

### Performance Requirements:
- **Time Complexity**: O(log n) per operation for efficient solutions
- **Timeout Cases**: Include test cases that will timeout O(n²) or worse algorithms
- **Memory Efficiency**: Test cases should not exceed reasonable memory limits
- **Scalability**: Test with maximum allowed input sizes

### Educational Value:
- **Concept Demonstration**: Each test case should demonstrate specific IPC concepts
- **Progressive Difficulty**: Test cases should build understanding incrementally
- **Real-world Relevance**: Scenarios should reflect actual IPC usage patterns
- **Debugging Friendly**: Error cases should help students identify common mistakes
