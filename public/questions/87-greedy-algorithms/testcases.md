# Test Cases for Greedy algorithms

## Problem Overview
The Activity Selection Problem demonstrates greedy algorithm principles by selecting the maximum number of non-overlapping activities from a given set. Each test case validates different aspects of the greedy solution.

## Test Case Structure
This question uses a multi-line input format where the first line contains the number of activities, followed by activity specifications.

### Input Format Pattern:
```
Line 1: n (number of activities, 1 ≤ n ≤ 100,000)
Next n lines: start_time end_time (integers, 0 ≤ start_time < end_time ≤ 1,000,000)
```

### Output Format Pattern:
```
Line 1: maximum number of selected activities
Next lines: selected activities in "start_time end_time" format (one per line)
```

## Test Case 1: Basic Case
**Purpose**: Tests fundamental greedy algorithm logic with overlapping activities

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

**Explanation**: 
- Activities sorted by end time: (1,4), (3,5), (0,6), (5,7), (5,9), (8,9)
- Greedy selection: (1,4) → (5,7) → (8,9)
- Activities (3,5), (0,6), (5,9) are rejected due to overlaps

## Test Case 2: Edge Case - Single Activity
**Purpose**: Tests minimal input case and boundary conditions

**Input (`input2.txt`):**
```
1
5 10
```

**Expected Output (`expected2.txt`):**
```
1
5 10
```

**Explanation**: 
- Only one activity available, must be selected
- Tests boundary condition handling

## Test Case 3: Complex Case - Multiple Overlapping Activities
**Purpose**: Tests algorithm with complex overlapping patterns and multiple optimal selections

**Input (`input3.txt`):**
```
10
1 3
2 5
4 6
5 8
7 9
8 11
10 12
11 14
13 15
14 16
```

**Expected Output (`expected3.txt`):**
```
5
1 3
4 6
7 9
10 12
13 15
```

**Explanation**: 
- Multiple overlapping activities require careful greedy selection
- Greedy algorithm selects activities ending earliest at each step
- Result: Maximum of 5 non-overlapping activities
- Demonstrates algorithm working with realistic scheduling scenario

## Test Case Creation Rules

### Input Validation Rules:
1. **Activity count**: 1 ≤ n ≤ 100,000
2. **Time constraints**: 0 ≤ start_time < end_time ≤ 1,000,000
3. **Format**: Each activity on separate line with space-separated integers
4. **Edge cases**: Single activity, all overlapping, none overlapping
5. **Performance**: Include cases with many activities to test efficiency

### Output Format Rules:
1. **First line**: Integer count of selected activities
2. **Following lines**: Selected activities in "start_time end_time" format
3. **Order**: Activities should be output in chronological order of selection
4. **Consistency**: Output must match greedy algorithm selection order
5. **Validation**: Total count must match number of activity lines that follow

## Algorithm Performance Analysis

### Time Complexity Comparison:
- **Greedy Algorithm**: O(n log n) due to sorting by end time
- **Brute Force**: O(2^n) checking all possible activity combinations
- **Space Complexity**: O(n) for storing activities

### Why Greedy Works:
- **Greedy Choice Property**: Selecting earliest-ending activity maximizes future opportunities
- **Optimal Substructure**: After selecting an activity, the remaining problem is also optimal
- **Proof Strategy**: Show that greedy choice doesn't eliminate optimal solution

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to handle potential whitespace
- Sort activities using `key=lambda x: x[1]` for end time
- Handle large integers (up to 1,000,000)
- Use list comprehensions for efficient processing

### Go Considerations:
- Define Activity struct with start and end fields
- Use `sort.Slice()` with custom comparison function
- Handle input parsing with `fmt.Scanf()`
- Manage slice capacity for performance

## Validation Checklist
- [ ] Input has correct number of lines (n+1 total)
- [ ] All activities have start_time < end_time
- [ ] Output count matches number of selected activities listed
- [ ] Selected activities don't overlap (end_time ≤ next_start_time)
- [ ] Solution is optimal (greedy choice produces maximum count)
- [ ] Performance test cases timeout brute force solutions
- [ ] Edge cases handled correctly (n=1, all overlap, no overlap)

## Common Pitfalls and Debug Tips
1. **Wrong Sorting**: Sorting by start time instead of end time gives suboptimal results
2. **Overlap Logic**: Remember that activities ending at time t and starting at time t don't overlap
3. **Output Format**: Ensure activities are output in selection order, not input order
4. **Edge Cases**: Handle single activity and empty input cases
5. **Performance**: Verify O(n log n) complexity, not O(n²) or worse

## Automated Test Case Generation
```python
def generate_test_case(n, max_time=1000):
    """Generate random activity selection test case"""
    import random
    
    activities = []
    for _ in range(n):
        start = random.randint(0, max_time - 10)
        end = random.randint(start + 1, max_time)
        activities.append((start, end))
    
    return activities

def validate_test_case(input_content, expected_content):
    """Validate test case correctness"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate input format
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    activities = []
    for i in range(1, n + 1):
        start, end = map(int, lines[i].split())
        assert start < end, f"Invalid activity: {start} >= {end}"
        activities.append((start, end))
    
    # Validate expected output format
    expected_lines = expected_content.strip().split('\n')
    count = int(expected_lines[0])
    assert len(expected_lines) == count + 1, f"Expected {count+1} lines in output"
    
    return True
```
