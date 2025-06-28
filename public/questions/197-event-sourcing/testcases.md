# Test Cases for Event Sourcing

## Test Case Structure
This question uses a multi-line input format with operations and queries.

### Input Format Pattern:
```
Line 1: N (number of operations)
Next N lines: OPERATION [params...]
  - DEPOSIT amount timestamp
  - WITHDRAW amount timestamp
  - BALANCE timestamp
```

### Output Format Pattern:
```
One line per BALANCE query showing the account balance at that timestamp
```

## Test Case 1: Basic
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
**Description**: Basic event sourcing with deposits, withdrawals, and time-travel balance queries. Tests chronological event replay and state reconstruction.

## Test Case 2: Edge Cases
**Input (`input2.txt`):**
```
4
BALANCE 0
DEPOSIT 100 5
WITHDRAW 150 10
BALANCE 10
```
**Expected Output (`expected2.txt`):**
```
0
-50
```
**Description**: Tests edge cases including empty account start, negative balance (overdraft), and queries at different timestamps.

## Test Case 3: Performance & Complex Scenarios
**Input (`input3.txt`):**
```
[Large test case with 5000+ operations and out-of-order timestamps]
```
**Expected Output (`expected3.txt`):**
```
[Corresponding balance query results]
```
**Description**: High-volume test case with thousands of events arriving out of chronological order. Tests performance optimization with snapshots and efficient event replay.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain positive integer N (1 ≤ N ≤ 10,000)
2. Each operation line must start with DEPOSIT, WITHDRAW, or BALANCE
3. DEPOSIT/WITHDRAW must have: amount (positive integer) and timestamp (non-negative integer)
4. BALANCE must have: timestamp (non-negative integer)
5. Amount range: 1 ≤ amount ≤ 1,000,000
6. Timestamp range: 0 ≤ timestamp ≤ 1,000,000
7. Events may arrive out of chronological order
8. Multiple events can share the same timestamp

### Output Format Rules:
1. Output one line per BALANCE query only
2. Show integer balance (can be negative)
3. Process BALANCE queries in the order they appear in input
4. No output for DEPOSIT/WITHDRAW operations
5. Balance at timestamp T includes all events with timestamp ≤ T

## Language-Specific Considerations

### Python Considerations:
- Use `input().split()` to parse operation lines
- Consider `bisect` module for efficient insertion into sorted event list
- Dictionary can store snapshots for performance optimization
- Handle negative balances as regular integers

### Go Considerations:
- Use `fmt.Scan()` to read operation parameters
- Implement binary search for timestamp-based operations
- Use structs to represent events with Type, Amount, Timestamp fields
- Sort events by timestamp using `sort.Slice()`

### JavaScript Considerations:
- Parse input line by line using `readline` or split approach
- Use array methods like `findIndex()` for insertion points
- Consider Map for snapshot storage
- Handle large numbers within JavaScript's integer limits

## Validation Checklist
- [ ] Input starts with valid operation count N
- [ ] All operations are DEPOSIT, WITHDRAW, or BALANCE
- [ ] All amounts are positive integers within range
- [ ] All timestamps are non-negative integers within range
- [ ] BALANCE queries produce correct output based on event replay
- [ ] Events are processed in chronological order regardless of input order
- [ ] Edge cases handled: empty account, negative balance, same timestamps
- [ ] Performance test completes within reasonable time

## Automated Test Case Generation
```python
def generate_test_case(num_events=100, max_amount=1000, max_timestamp=1000):
    """Generate random test case for event sourcing."""
    import random
    
    operations = []
    operations.append(str(num_events))
    
    # Generate random events
    for i in range(num_events // 2):
        if random.random() < 0.4:  # 40% deposits
            amount = random.randint(1, max_amount)
            timestamp = random.randint(1, max_timestamp)
            operations.append(f"DEPOSIT {amount} {timestamp}")
        elif random.random() < 0.7:  # 30% withdrawals
            amount = random.randint(1, max_amount)
            timestamp = random.randint(1, max_timestamp)
            operations.append(f"WITHDRAW {amount} {timestamp}")
        else:  # 30% balance queries
            timestamp = random.randint(0, max_timestamp)
            operations.append(f"BALANCE {timestamp}")
    
    return '\n'.join(operations)

def validate_test_case(input_content, expected_content):
    """Validate test case format and correctness."""
    lines = input_content.strip().split('\n')
    
    # Validate input format
    assert lines[0].isdigit(), "First line must be operation count"
    n = int(lines[0])
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    balance_count = 0
    for i in range(1, n + 1):
        parts = lines[i].split()
        assert len(parts) >= 2, f"Line {i}: Invalid operation format"
        
        op = parts[0]
        assert op in ['DEPOSIT', 'WITHDRAW', 'BALANCE'], f"Line {i}: Invalid operation {op}"
        
        if op == 'BALANCE':
            balance_count += 1
            assert len(parts) == 2, f"Line {i}: BALANCE needs 1 parameter"
            assert parts[1].isdigit(), f"Line {i}: Invalid timestamp"
        else:
            assert len(parts) == 3, f"Line {i}: {op} needs 2 parameters"
            assert parts[1].isdigit() and int(parts[1]) > 0, f"Line {i}: Invalid amount"
            assert parts[2].isdigit(), f"Line {i}: Invalid timestamp"
    
    # Validate expected output
    expected_lines = expected_content.strip().split('\n')
    assert len(expected_lines) == balance_count, f"Expected {balance_count} output lines"
    
    for line in expected_lines:
        assert line.lstrip('-').isdigit(), f"Invalid output format: {line}"
    
    return True
```
