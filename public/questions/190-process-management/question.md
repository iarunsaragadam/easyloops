# Process management

## Problem Statement

Implement a **Process Scheduling Simulator** that can execute different CPU scheduling algorithms and provide detailed execution timelines with performance statistics.

Your task is to simulate how an operating system schedules processes using various algorithms:

1. **FCFS (First Come First Served)** - Processes are executed in order of arrival
2. **SJF (Shortest Job First)** - Non-preemptive, shortest burst time first  
3. **PRIORITY** - Non-preemptive, lower priority number = higher priority
4. **RR (Round Robin)** - Preemptive with time quantum

For each scheduling run, you must:
- Track the exact execution timeline with start/finish/preempt/resume events
- Calculate process statistics (waiting time, turnaround time)
- Provide average waiting and turnaround times

This problem tests your understanding of:
- Process scheduling algorithms and their trade-offs
- Event simulation and timeline tracking
- Performance analysis and optimization
- Complex data structure manipulation

## Input Format

```
Line 1: n algorithm_type
Lines 2 to n+1: process_id arrival_time burst_time priority
[Line n+2: time_quantum (only for Round Robin)]
```

Where:
- `n` = number of processes (1 ≤ n ≤ 1000)
- `algorithm_type` = "FCFS", "SJF", "PRIORITY", or "RR"  
- `process_id` = string identifier for the process
- `arrival_time` = when process arrives (≥ 0)
- `burst_time` = CPU time needed (> 0)
- `priority` = priority level (0-99, lower = higher priority)
- `time_quantum` = time slice for Round Robin (> 0)

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Implement classic CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin)
- Understand preemptive vs non-preemptive scheduling
- Practice event simulation and timeline management
- Calculate process performance metrics (waiting time, turnaround time)
- Analyze algorithm efficiency and trade-offs
- Handle complex input parsing and output formatting
- Optimize for large numbers of processes and events

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    # Parse input
    n, algorithm = input().split()
    n = int(n)
    
    processes = []
    for i in range(n):
        line = input().split()
        # Parse process data...
    
    # Implement scheduling algorithm
    if algorithm == "FCFS":
        schedule = fcfs_scheduling(processes)
    elif algorithm == "SJF":
        schedule = sjf_scheduling(processes)
    # ... other algorithms
    
    # Output timeline and statistics
    print("EXECUTION_TIMELINE:")
    # ... format output
```

### Go Example Structure:
```go
func solve() {
    var n int
    var algorithm string
    fmt.Scanf("%d %s", &n, &algorithm)
    
    // Parse processes
    processes := make([]Process, n)
    // ...
    
    // Execute scheduling
    var schedule []Event
    switch algorithm {
    case "FCFS":
        schedule = fcfsScheduling(processes)
    // ... other cases
    }
    
    // Output results
    fmt.Println("EXECUTION_TIMELINE:")
    // ... format output
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of processes)
- 0 ≤ arrival_time ≤ 10000
- 1 ≤ burst_time ≤ 100
- 0 ≤ priority ≤ 99 (lower number = higher priority)
- 1 ≤ time_quantum ≤ 10 (for Round Robin)
- Process IDs are unique strings of length 1-10
- All times are integers
- Average calculations should be rounded to 2 decimal places

## Hints
- **Timeline Events**: Track START, FINISH, PREEMPT, RESUME events with timestamps
- **Process States**: Keep track of remaining burst time for preemptive algorithms
- **Queue Management**: Use appropriate data structures for ready queues
- **Tie Breaking**: When processes have equal priority/burst time, use process ID alphabetically
- **Idle Time**: Handle gaps when no processes are ready to execute
- **Statistics**: Waiting time = turnaround time - burst time
- **Performance**: For large inputs, avoid O(n²) algorithms in timeline generation
