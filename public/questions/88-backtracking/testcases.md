# Test Cases for Backtracking: N-Queens Problem

## Test Case Structure
This question uses a **1-line input format** with a single integer N representing the size of the chessboard.

### Input Format Pattern:
```
Line 1: Integer N (1 ≤ N ≤ 15)
```

### Output Format Pattern:
```
<number_of_solutions>
```

## Comprehensive Test Strategy (100+ Test Cases)

### Category 1: Basic Test Cases (input1.txt - input25.txt)
These test fundamental algorithm correctness with well-known N-Queens solutions.

**Test Case 1: Standard 4x4 Board**
- **Input (`input1.txt`):** `4`
- **Expected Output (`expected1.txt`):** `2`
- **Rationale:** Classic small case with exactly 2 solutions

**Test Case 2: Trivial 1x1 Board**
- **Input (`input2.txt`):** `1` 
- **Expected Output (`expected2.txt`):** `1`
- **Rationale:** Simplest possible case with 1 solution

**Test Case 3: Classic 8x8 Board**
- **Input (`input3.txt`):** `8`
- **Expected Output (`expected3.txt`):** `92`
- **Rationale:** The famous 8-queens problem

### Category 2: Edge Cases (input26.txt - input50.txt)
Test boundary conditions and cases with no solutions.

**Test Case 26: No Solution 2x2**
- **Input (`input26.txt`):** `2`
- **Expected Output (`expected26.txt`):** `0`
- **Rationale:** Impossible to place 2 queens on 2x2 board

**Test Case 27: No Solution 3x3**
- **Input (`input27.txt`):** `3`
- **Expected Output (`expected27.txt`):** `0`
- **Rationale:** Impossible to place 3 queens on 3x3 board

### Category 3: Performance Test Cases (input51.txt - input75.txt)
Large inputs that will timeout inefficient algorithms.

**Test Case 51: Performance Test N=12**
- **Input (`input51.txt`):** `12`
- **Expected Output (`expected51.txt`):** `14200`
- **Rationale:** Tests algorithm efficiency, will timeout O(n!) solutions

**Test Case 52: Performance Test N=13**
- **Input (`input52.txt`):** `13`
- **Expected Output (`expected52.txt`):** `73712`
- **Rationale:** Near upper limit, requires optimized backtracking

### Category 4: Comprehensive Coverage (input76.txt - input100.txt)
Complete coverage of all valid N values with multiple test cases per value.

## Known N-Queens Solutions Reference
```
N=1: 1 solution
N=2: 0 solutions
N=3: 0 solutions  
N=4: 2 solutions
N=5: 10 solutions
N=6: 4 solutions
N=7: 40 solutions
N=8: 92 solutions
N=9: 352 solutions
N=10: 724 solutions
N=11: 2680 solutions
N=12: 14200 solutions
N=13: 73712 solutions
N=14: 365596 solutions
N=15: 2279184 solutions
```

## Test Case Creation Rules

### Input Validation Rules:
1. Each input file contains exactly one line
2. The line contains a single integer N
3. 1 ≤ N ≤ 15 (within problem constraints)
4. No leading/trailing whitespace except newline

### Output Format Rules:
1. Each output file contains exactly one line
2. The line contains a single integer (number of solutions)
3. No leading/trailing whitespace except newline
4. Solution count must match known N-Queens values

### Test Case Distribution:
- **N=1**: 3 test cases (basic, edge verification)
- **N=2,3**: 5 test cases each (no solution cases)
- **N=4**: 8 test cases (first solvable multi-queen case)
- **N=5-8**: 6 test cases each (standard cases)
- **N=9-11**: 4 test cases each (moderate performance)
- **N=12-13**: 3 test cases each (high performance)
- **N=14-15**: 2 test cases each (maximum performance)

## Algorithm Performance Requirements

### Time Complexity Expectations:
- **Efficient Solution**: O(N!) with pruning - should handle N=15 within time limits
- **Inefficient Solution**: O(N^N) without pruning - will timeout for N>10

### Performance Test Validation:
- N=12: Should complete in <0.5 seconds with good backtracking
- N=13: Should complete in <2 seconds with optimized algorithm  
- N=14,15: Will timeout algorithms without proper constraint checking

## Language-Specific Considerations

### Python Considerations:
- Use list for board representation: `board[row] = col`
- Implement `is_safe()` function for constraint checking
- Use recursion for backtracking with proper base case
- Consider sys.setrecursionlimit for N>12

### Go Considerations:
- Use slice for board: `board := make([]int, n)`
- Implement constraint checking efficiently
- Use proper integer types (int should be sufficient)
- Leverage Go's performance for larger N values

## Validation Checklist
- [ ] All 100+ input files contain valid integers 1-15
- [ ] All expected output files match known N-Queens solutions
- [ ] Performance test cases (N≥12) will timeout inefficient algorithms
- [ ] Edge cases (N=2,3) properly test no-solution scenarios
- [ ] Basic cases (N=1,4,8) verify algorithm correctness
- [ ] Input/output format is consistent across all test cases

## Automated Test Case Generation Script
```python
def generate_all_test_cases():
    """Generate all 100+ test cases for N-Queens problem"""
    
    # Known solutions for validation
    known_solutions = {
        1: 1, 2: 0, 3: 0, 4: 2, 5: 10, 6: 4, 7: 40, 8: 92,
        9: 352, 10: 724, 11: 2680, 12: 14200, 13: 73712, 
        14: 365596, 15: 2279184
    }
    
    test_distributions = [
        (1, 3),   # N=1: 3 test cases
        (2, 5),   # N=2: 5 test cases  
        (3, 5),   # N=3: 5 test cases
        (4, 8),   # N=4: 8 test cases
        (5, 6), (6, 6), (7, 6), (8, 6),  # N=5-8: 6 each
        (9, 4), (10, 4), (11, 4),        # N=9-11: 4 each
        (12, 3), (13, 3),                # N=12-13: 3 each
        (14, 2), (15, 2)                 # N=14-15: 2 each
    ]
    
    case_num = 1
    for n, count in test_distributions:
        for i in range(count):
            input_content = f"{n}\n"
            expected_content = f"{known_solutions[n]}\n"
            
            # Write input file
            with open(f"input{case_num}.txt", "w") as f:
                f.write(input_content)
            
            # Write expected output file  
            with open(f"expected{case_num}.txt", "w") as f:
                f.write(expected_content)
            
            case_num += 1
    
    # Generate additional cases to reach 100+
    while case_num <= 100:
        n = ((case_num - 76) % 15) + 1  # Cycle through N=1-15
        input_content = f"{n}\n"
        expected_content = f"{known_solutions[n]}\n"
        
        with open(f"input{case_num}.txt", "w") as f:
            f.write(input_content)
        with open(f"expected{case_num}.txt", "w") as f:
            f.write(expected_content)
        
        case_num += 1

def validate_test_case(input_file, expected_file):
    """Validate a single test case"""
    with open(input_file) as f:
        input_content = f.read().strip()
    with open(expected_file) as f:
        expected_content = f.read().strip()
    
    # Validate input
    try:
        n = int(input_content)
        assert 1 <= n <= 15, f"N={n} out of range"
    except ValueError:
        raise AssertionError(f"Invalid input: {input_content}")
    
    # Validate expected output
    try:
        solution_count = int(expected_content)
        assert solution_count >= 0, f"Negative solution count: {solution_count}"
    except ValueError:
        raise AssertionError(f"Invalid expected output: {expected_content}")
    
    return True
```
