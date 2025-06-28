# Greedy algorithms

## Problem Statement

You are managing a conference room and need to schedule the maximum number of non-overlapping activities. Each activity has a start time and an end time. Your goal is to select the maximum number of activities such that no two selected activities overlap.

This is a classic **Activity Selection Problem** that demonstrates the power of greedy algorithms. The key insight is that by always choosing the activity that ends earliest, we can maximize the number of activities we can schedule.

**Real-world applications:**
- Conference room scheduling
- CPU process scheduling  
- Resource allocation optimization
- Event planning and coordination

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of activities, where 1 ≤ n ≤ 100,000)
Next n lines: start_time end_time (integers representing start and end times of each activity)
```

**Example:**
```
6
1 4
3 5
0 6
5 7
8 9
5 9
```

## Output Format

```
Line 1: maximum number of non-overlapping activities that can be selected
Next lines: selected activities in the format "start_time end_time" (one per line)
```

**Example Output:**
```
3
1 4
5 7
8 9
```

## Test Cases
**Input (`input.txt`):**
```
6
1 4
3 5
0 6
5 7
8 9
5 9
```

**Expected Output (`expected.txt`):**
```
3
1 4
5 7
8 9
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the **greedy algorithm paradigm** and when it produces optimal solutions
- Learn the **greedy choice property**: making the locally optimal choice leads to a globally optimal solution
- Master the **Activity Selection Problem** as a fundamental greedy algorithm
- Develop skills in **algorithm design** and **optimization**
- Practice **sorting and selection** techniques
- Understand **time complexity analysis** for greedy vs brute force approaches

## Implementation Guidelines

### Greedy Strategy:
1. **Sort activities by their end times** (this is the key insight!)
2. **Select the first activity** (earliest ending)
3. **For remaining activities**: select the next activity that starts after the previously selected activity ends
4. **Repeat** until no more activities can be selected

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    activities = []
    
    # Read activities
    for i in range(n):
        start, end = map(int, input().strip().split())
        activities.append((start, end))
    
    # Sort by end time (greedy choice)
    activities.sort(key=lambda x: x[1])
    
    # Select activities greedily
    selected = []
    last_end_time = -1
    
    for start, end in activities:
        if start >= last_end_time:  # No overlap
            selected.append((start, end))
            last_end_time = end
    
    # Output results
    print(len(selected))
    for start, end in selected:
        print(f"{start} {end}")
```

### Go Example Structure:
```go
import (
    "fmt"
    "sort"
)

type Activity struct {
    start, end int
}

func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    activities := make([]Activity, n)
    for i := 0; i < n; i++ {
        fmt.Scanf("%d %d", &activities[i].start, &activities[i].end)
    }
    
    // Sort by end time
    sort.Slice(activities, func(i, j int) bool {
        return activities[i].end < activities[j].end
    })
    
    // Select activities greedily
    var selected []Activity
    lastEndTime := -1
    
    for _, activity := range activities {
        if activity.start >= lastEndTime {
            selected = append(selected, activity)
            lastEndTime = activity.end
        }
    }
    
    // Output results
    fmt.Println(len(selected))
    for _, activity := range selected {
        fmt.Printf("%d %d\n", activity.start, activity.end)
    }
}
```

## Constraints
- 1 ≤ n ≤ 100,000 (number of activities)
- 0 ≤ start_time < end_time ≤ 1,000,000 (activity times)
- Time limit: 2 seconds
- Memory limit: 256 MB
- Activities with start_time = end_time of another activity do **NOT** overlap

## Algorithm Analysis
- **Greedy Time Complexity**: O(n log n) due to sorting
- **Greedy Space Complexity**: O(n) for storing activities
- **Brute Force Alternative**: O(2^n) - checking all possible subsets
- **Why Greedy Works**: The greedy choice property holds - selecting the activity that ends earliest always leads to an optimal solution

## Hints
1. **Start with sorting** - What should you sort by? (Think about what makes an activity "better" to select)
2. **Greedy choice** - Always pick the activity that ends earliest among remaining options
3. **Non-overlapping condition** - An activity starting at time t can be selected if the previous activity ended at or before time t
4. **Think backwards** - Why does choosing the earliest-ending activity maximize future opportunities?
5. **Edge cases** - Consider single activity, no activities, all overlapping, none overlapping
6. **Optimization** - A greedy solution should be much faster than trying all combinations
