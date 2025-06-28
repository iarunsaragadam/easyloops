# Test Cases for Queue implementation and usage

## Test Case Structure
This question uses a **multi-line input format** with queue operations.

### Input Format Pattern:
```
Line 1: Number of operations N
Next N lines: Queue operations (ENQUEUE value, DEQUEUE, FRONT, SIZE, EMPTY)
```

### Output Format Pattern:
```
One line for each operation that produces output:
- ENQUEUE: No output
- DEQUEUE: Integer value or "EMPTY"
- FRONT: Integer value or "EMPTY"  
- SIZE: Integer (0 or positive)
- EMPTY: "true" or "false"
```

## Test Case 1: Basic Operations
**Input (`input.txt`):**
```
6
ENQUEUE 10
ENQUEUE 20
FRONT
DEQUEUE
SIZE
EMPTY
```
**Expected Output (`expected.txt`):**
```
10
10
1
false
```

**Description**: Tests basic queue operations with two elements, verifying FIFO behavior.

## Test Case 2: Empty Queue Operations
**Input (`input2.txt`):**
```
4
EMPTY
DEQUEUE
FRONT
SIZE
```
**Expected Output (`expected2.txt`):**
```
true
EMPTY
EMPTY
0
```

**Description**: Tests edge cases with operations on empty queue.

## Test Case 3: Complex Sequence
**Input (`input3.txt`):**
```
10
ENQUEUE 5
ENQUEUE 10
ENQUEUE 15
SIZE
FRONT
DEQUEUE
DEQUEUE
ENQUEUE 25
FRONT
SIZE
```
**Expected Output (`expected3.txt`):**
```
3
5
5
10
15
2
```

**Description**: Tests complex sequence of operations including multiple enqueues, dequeues, and state queries.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer N (1 ≤ N ≤ 1000)
2. Each operation line must start with valid operation name
3. ENQUEUE operations must include integer value (-1000 ≤ value ≤ 1000)
4. Other operations should not have additional parameters
5. Operation names are case-sensitive

### Output Format Rules:
1. Only operations that produce output should generate lines
2. DEQUEUE/FRONT on empty queue returns "EMPTY"
3. SIZE returns non-negative integer
4. EMPTY returns "true" or "false" (lowercase)
5. Integer values printed as-is (no extra formatting)
6. Each output line ends with newline

## Language-Specific Considerations
### Python Considerations:
- Use `list.append()` for enqueue, `list.pop(0)` for dequeue
- Use `input().split()` to parse operation lines
- Handle integer conversion for ENQUEUE values
- Use string comparison for operation names

### Go Considerations:
- Use slice operations for queue manipulation
- Use `fmt.Scanf()` to read structured input
- Handle slice bounds checking for empty queue
- Use switch statement for operation dispatch

## Performance Considerations
- Basic queue operations should be O(1) amortized
- Using list.pop(0) in Python is O(n), acceptable for this problem size
- More efficient implementations could use collections.deque
- For large inputs, consider circular buffer or linked list

## Validation Checklist
- [ ] Input has correct number of operation lines
- [ ] All operation names are valid
- [ ] ENQUEUE operations include integer values
- [ ] Output matches expected format exactly
- [ ] Empty queue cases handled correctly
- [ ] FIFO ordering maintained throughout

## Edge Cases to Consider
1. **Empty queue operations**: DEQUEUE, FRONT on empty queue
2. **Single element**: Enqueue one, then dequeue
3. **Fill and empty**: Multiple enqueues followed by multiple dequeues
4. **Interleaved operations**: Mix of enqueues and dequeues
5. **Query operations**: SIZE and EMPTY at various queue states
6. **Boundary values**: Maximum/minimum integer values
7. **Maximum operations**: N = 1000 operations

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random valid test case"""
    n = random.randint(5, 20)
    operations = []
    expected_output = []
    queue = []
    
    for _ in range(n):
        # Choose operation based on current state
        if not queue:
            # If empty, bias toward ENQUEUE
            op_type = random.choices(['ENQUEUE', 'DEQUEUE', 'FRONT', 'SIZE', 'EMPTY'], 
                                   weights=[0.6, 0.1, 0.1, 0.1, 0.1])[0]
        else:
            # If not empty, all operations equally likely
            op_type = random.choices(['ENQUEUE', 'DEQUEUE', 'FRONT', 'SIZE', 'EMPTY'], 
                                   weights=[0.3, 0.2, 0.2, 0.15, 0.15])[0]
        
        if op_type == 'ENQUEUE':
            value = random.randint(-100, 100)
            operations.append(f"ENQUEUE {value}")
            queue.append(value)
        elif op_type == 'DEQUEUE':
            operations.append("DEQUEUE")
            if queue:
                expected_output.append(str(queue.pop(0)))
            else:
                expected_output.append("EMPTY")
        elif op_type == 'FRONT':
            operations.append("FRONT")
            if queue:
                expected_output.append(str(queue[0]))
            else:
                expected_output.append("EMPTY")
        elif op_type == 'SIZE':
            operations.append("SIZE")
            expected_output.append(str(len(queue)))
        elif op_type == 'EMPTY':
            operations.append("EMPTY")
            expected_output.append("true" if len(queue) == 0 else "false")
    
    input_content = f"{n}\n" + "\n".join(operations) + "\n"
    expected_content = "\n".join(expected_output) + "\n" if expected_output else ""
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case is well-formed"""
    lines = input_content.strip().split("\n")
    assert len(lines) >= 1
    
    n = int(lines[0])
    assert 1 <= n <= 1000
    assert len(lines) == n + 1
    
    # Validate each operation
    for i in range(1, n + 1):
        parts = lines[i].split()
        assert len(parts) >= 1
        op = parts[0]
        assert op in ['ENQUEUE', 'DEQUEUE', 'FRONT', 'SIZE', 'EMPTY']
        
        if op == 'ENQUEUE':
            assert len(parts) == 2
            value = int(parts[1])  # Should not raise exception
            assert -1000 <= value <= 1000
        else:
            assert len(parts) == 1
    
    # Validate expected output format
    if expected_content.strip():
        output_lines = expected_content.strip().split("\n")
        for line in output_lines:
            # Should be integer, "EMPTY", "true", or "false"
            if line not in ["EMPTY", "true", "false"]:
                int(line)  # Should not raise exception
```
