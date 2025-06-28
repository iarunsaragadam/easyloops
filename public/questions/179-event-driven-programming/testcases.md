# Test Cases for Event-driven programming

## Test Case Structure
This question uses a multi-line input format with events.

### Input Format Pattern:
```
Line 1: n (number of events)
Next n lines: timestamp user_id action
```

### Output Format Pattern:
```
Line 1: total_completed_sessions
Line 2: average_session_duration  
Line 3: max_concurrent_users
```

## Test Case 1: Basic
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
**Description:** Basic scenario with 3 users, overlapping sessions. Alice (50 duration), Bob (80 duration), Charlie (40 duration). Average: (50+80+40)/3 = 56. Max concurrent: 2 (at time 180).

## Test Case 2: Edge - Immediate Logout
**Input (`input2.txt`):**
```
2
100 alice LOGIN
100 alice LOGOUT
```
**Expected Output (`expected2.txt`):**
```
1
0
1
```
**Description:** Edge case where user logs in and out at same timestamp, resulting in 0 duration session.

## Test Case 3: Complex - No Logouts
**Input (`input3.txt`):**
```
5
100 alice LOGIN
200 bob LOGIN
300 charlie LOGIN
150 diana LOGIN
250 eve LOGIN
```
**Expected Output (`expected3.txt`):**
```
0
0
5
```
**Description:** Complex scenario where users login but never logout. No completed sessions, but max concurrent reaches 5.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer n
2. Each event line must have exactly 3 parts: timestamp user_id action
3. Timestamp must be a positive integer
4. User_id must be alphanumeric string
5. Action must be either "LOGIN" or "LOGOUT"
6. Events in input may be out of chronological order

### Output Format Rules:
1. Exactly 3 lines of output
2. All outputs are non-negative integers
3. Line 1: Total completed sessions (≥ 0)
4. Line 2: Average session duration, integer division (≥ 0)
5. Line 3: Maximum concurrent users (≥ 0)

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read lines and avoid whitespace issues
- Use `split()` to parse event components
- Sort events using `events.sort()` or `sorted(events)`
- Use dictionary to track active sessions efficiently
- Use integer division `//` for average calculation

### Go Considerations:
- Use `bufio.NewScanner(os.Stdin)` for input reading
- Use `strings.Fields()` to split event components
- Use `sort.Slice()` to sort events by timestamp
- Use map to track active sessions
- Use integer division for average calculation

## Advanced Scenarios
### Performance Considerations:
- Large number of events (up to 100,000)
- Events spanning large timestamp ranges
- Many concurrent users
- Frequent login/logout cycles

### Edge Cases to Consider:
- Empty event list (n = 0)
- Only login events (no logouts)
- Only logout events (no logins)
- Simultaneous events at same timestamp
- Single user multiple sessions
- Very short sessions (0 duration)
- Very long sessions

## Validation Checklist
- [ ] Input parsing handles all event components correctly
- [ ] Events are sorted by timestamp before processing
- [ ] Active session tracking works correctly
- [ ] Concurrent user counting is accurate
- [ ] Session duration calculation is correct
- [ ] Average calculation uses integer division
- [ ] Output format matches exactly (3 lines, integers only)
- [ ] Edge cases (no sessions, immediate logout) handled
- [ ] Performance acceptable for large inputs

## Automated Test Case Generation
```python
import random

def generate_test_case():
    """Generate a random test case for event-driven programming."""
    n = random.randint(1, 50)  # Manageable size for testing
    events = []
    users = [f"user{i}" for i in range(1, min(10, n//2 + 1))]
    
    timestamp = 100
    for _ in range(n):
        user = random.choice(users)
        action = random.choice(["LOGIN", "LOGOUT"])
        events.append(f"{timestamp} {user} {action}")
        timestamp += random.randint(1, 50)
    
    input_content = f"{n}\n" + "\n".join(events) + "\n"
    
    # Generate expected output by running solution
    expected_content = run_solution(input_content)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted."""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate input format
    assert len(lines) == n + 1, "Input must have n+1 lines"
    
    for i in range(1, n + 1):
        parts = lines[i].split()
        assert len(parts) == 3, f"Event line {i} must have 3 parts"
        assert parts[0].isdigit(), f"Timestamp must be integer"
        assert parts[2] in ["LOGIN", "LOGOUT"], f"Action must be LOGIN or LOGOUT"
    
    # Validate output format
    output_lines = expected_content.strip().split('\n')
    assert len(output_lines) == 3, "Output must have exactly 3 lines"
    
    for line in output_lines:
        assert line.isdigit(), "All output values must be non-negative integers"
```
