# Test Cases for Process management

## Test Case Structure

This question uses a variable-line input format that depends on the number of processes and scheduling algorithm.

### Input Format Pattern:
```
Line 1: n algorithm_type
Lines 2 to n+1: process_id arrival_time burst_time priority
[Line n+2: time_quantum (only for Round Robin)]
```

### Output Format Pattern:
```
EXECUTION_TIMELINE:
timestamp: process_id ACTION
...
PROCESS_STATS:
process_id: START=start_time FINISH=finish_time WAIT=wait_time TURNAROUND=turnaround_time
...
AVERAGES: WAIT=avg_wait TURNAROUND=avg_turnaround
```

## Test Case 1: Basic FCFS Scheduling
**Input (`input.txt`):**
```
3 FCFS
P1 0 5 1
P2 2 3 2
P3 4 1 3
```
**Expected Output (`expected.txt`):**
```
EXECUTION_TIMELINE:
0: P1 START
5: P1 FINISH
5: P2 START
8: P2 FINISH
8: P3 START
9: P3 FINISH
PROCESS_STATS:
P1: START=0 FINISH=5 WAIT=0 TURNAROUND=5
P2: START=5 FINISH=8 WAIT=3 TURNAROUND=6
P3: START=8 FINISH=9 WAIT=4 TURNAROUND=5
AVERAGES: WAIT=2.33 TURNAROUND=5.33
```

## Test Case 2: Edge - Single Process
**Input (`input2.txt`):**
```
1 SJF
SOLO 5 10 1
```
**Expected Output (`expected2.txt`):**
```
EXECUTION_TIMELINE:
5: SOLO START
15: SOLO FINISH
PROCESS_STATS:
SOLO: START=5 FINISH=15 WAIT=0 TURNAROUND=10
AVERAGES: WAIT=0.00 TURNAROUND=10.00
```

## Test Case 3: Complex - Round Robin Preemptive Scheduling
**Input (`input3.txt`):**
```
5 RR
P1 0 8 5
P2 1 4 3
P3 2 9 7
P4 3 5 1
P5 4 2 9
3
```
**Expected Output (`expected3.txt`):**
```
EXECUTION_TIMELINE:
0: P1 START
3: P1 PREEMPT
3: P2 START
6: P2 PREEMPT
6: P3 START
9: P3 PREEMPT
9: P4 START
12: P4 PREEMPT
12: P1 RESUME
15: P1 PREEMPT
15: P5 START
17: P5 FINISH
17: P2 RESUME
18: P2 FINISH
18: P3 RESUME
21: P3 PREEMPT
21: P4 RESUME
23: P4 FINISH
23: P1 RESUME
25: P1 FINISH
25: P3 RESUME
28: P3 FINISH
PROCESS_STATS:
P1: START=0 FINISH=25 WAIT=17 TURNAROUND=25
P2: START=3 FINISH=18 WAIT=13 TURNAROUND=17
P3: START=6 FINISH=28 WAIT=17 TURNAROUND=26
P4: START=9 FINISH=23 WAIT=15 TURNAROUND=20
P5: START=15 FINISH=17 WAIT=11 TURNAROUND=13
AVERAGES: WAIT=14.60 TURNAROUND=20.20
```

## Test Case Creation Rules

### Input Validation Rules:
1. Number of processes must be between 1 and 1000
2. Algorithm type must be one of: FCFS, SJF, PRIORITY, RR
3. Process IDs must be unique strings (1-10 characters)
4. Arrival times must be non-negative integers
5. Burst times must be positive integers
6. Priority values must be between 0-99
7. Time quantum (for RR) must be positive integer
8. All process data must have exactly 4 fields (id, arrival, burst, priority)

### Output Format Rules:
1. Timeline events must be in chronological order
2. Process statistics must be sorted by process ID alphabetically
3. Average calculations must be rounded to 2 decimal places
4. Times must be integers (no fractional times)
5. Actions must be: START, FINISH, PREEMPT, RESUME
6. Each timeline entry format: "timestamp: process_id ACTION"
7. Each stat entry format: "process_id: START=x FINISH=y WAIT=z TURNAROUND=w"

## Language-Specific Considerations

### Python Considerations:
- Use `input().split()` for parsing space-separated values
- Handle integer conversion with `int()` and float precision with `:.2f`
- Use appropriate data structures like lists and dictionaries for process management
- Consider using `collections.deque` for efficient queue operations
- Be careful with floating-point comparisons in timeline calculations

### Go Considerations:
- Use `fmt.Scanf()` for structured input parsing
- Handle string formatting with `fmt.Printf("%.2f", value)` for averages
- Use slices and structs for process representation
- Consider using `container/heap` for priority queues in complex algorithms
- Ensure proper memory management for large process sets

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input follows the exact format specification
- [ ] Process IDs are unique and valid strings
- [ ] All timing values are non-negative integers
- [ ] Priority values are in valid range (0-99)
- [ ] Algorithm type is one of the four supported types
- [ ] Round Robin cases include time quantum
- [ ] Expected output follows exact format pattern
- [ ] Timeline events are in chronological order
- [ ] Process statistics are alphabetically sorted by ID
- [ ] Average calculations are correct to 2 decimal places
- [ ] Edge cases (single process, simultaneous arrivals) are covered
- [ ] Performance cases test algorithm efficiency
- [ ] Complex scenarios test correctness under stress

## Automated Test Case Generation

```python
import random

def generate_test_case(n_processes=5, algorithm="FCFS", max_arrival=20, max_burst=10):
    """Generate a random test case for process scheduling"""
    
    algorithms = ["FCFS", "SJF", "PRIORITY", "RR"]
    if algorithm not in algorithms:
        algorithm = random.choice(algorithms)
    
    # Generate processes
    processes = []
    for i in range(n_processes):
        process_id = f"P{i+1:03d}"
        arrival_time = random.randint(0, max_arrival)
        burst_time = random.randint(1, max_burst)
        priority = random.randint(0, 99)
        processes.append((process_id, arrival_time, burst_time, priority))
    
    # Create input content
    input_content = f"{n_processes} {algorithm}\n"
    for p in processes:
        input_content += f"{p[0]} {p[1]} {p[2]} {p[3]}\n"
    
    if algorithm == "RR":
        quantum = random.randint(1, 5)
        input_content += f"{quantum}\n"
    
    return input_content

def generate_edge_cases():
    """Generate specific edge case scenarios"""
    
    edge_cases = []
    
    # Single process case
    edge_cases.append({
        'name': 'single_process',
        'input': "1 FCFS\nP1 0 5 1\n"
    })
    
    # Simultaneous arrivals
    edge_cases.append({
        'name': 'simultaneous_arrivals', 
        'input': "3 SJF\nP1 0 5 2\nP2 0 3 1\nP3 0 7 3\n"
    })
    
    # Zero arrival times
    edge_cases.append({
        'name': 'all_zero_arrivals',
        'input': "4 PRIORITY\nP1 0 4 2\nP2 0 2 1\nP3 0 6 3\nP4 0 1 0\n"
    })
    
    # Large gaps between arrivals
    edge_cases.append({
        'name': 'large_gaps',
        'input': "3 FCFS\nP1 0 2 1\nP2 10 3 2\nP3 20 1 3\n"
    })
    
    return edge_cases

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the format requirements"""
    
    lines = input_content.strip().split('\n')
    
    # Check header line
    header = lines[0].split()
    if len(header) != 2:
        return False, "Header must have exactly 2 fields"
    
    try:
        n = int(header[0])
        algorithm = header[1]
    except ValueError:
        return False, "Invalid header format"
    
    if algorithm not in ["FCFS", "SJF", "PRIORITY", "RR"]:
        return False, f"Invalid algorithm: {algorithm}"
    
    if n < 1 or n > 1000:
        return False, f"Invalid number of processes: {n}"
    
    # Check process lines
    expected_lines = n + 1
    if algorithm == "RR":
        expected_lines += 1
    
    if len(lines) != expected_lines:
        return False, f"Expected {expected_lines} lines, got {len(lines)}"
    
    process_ids = set()
    for i in range(1, n + 1):
        parts = lines[i].split()
        if len(parts) != 4:
            return False, f"Process line {i} must have 4 fields"
        
        process_id, arrival, burst, priority = parts
        
        if process_id in process_ids:
            return False, f"Duplicate process ID: {process_id}"
        process_ids.add(process_id)
        
        try:
            arrival_time = int(arrival)
            burst_time = int(burst)
            priority_val = int(priority)
        except ValueError:
            return False, f"Invalid numeric values in line {i}"
        
        if arrival_time < 0:
            return False, f"Negative arrival time in line {i}"
        if burst_time <= 0:
            return False, f"Non-positive burst time in line {i}"
        if priority_val < 0 or priority_val > 99:
            return False, f"Invalid priority value in line {i}"
    
    # Check quantum for Round Robin
    if algorithm == "RR":
        try:
            quantum = int(lines[-1])
            if quantum <= 0:
                return False, "Time quantum must be positive"
        except ValueError:
            return False, "Invalid time quantum format"
    
    return True, "Valid test case"

# Example usage
print("Generating random test case:")
test_input = generate_test_case(5, "RR", 10, 8)
print(test_input)

print("\nValidating test case:")
is_valid, message = validate_test_case(test_input, "")
print(f"Valid: {is_valid}, Message: {message}")
```

This comprehensive test case structure ensures thorough coverage of all scheduling algorithms, edge cases, and performance scenarios while maintaining educational value and realistic complexity for a Hard-level programming question.
