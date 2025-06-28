# Test Cases for Algorithm Complexity Analysis

## Test Case Structure
This question uses a 1-line input format with 4 space-separated integers.

### Input Format Pattern:
```
Line 1: n q M T
```
Where:
- n = dataset size (1 ≤ n ≤ 10⁶)
- q = number of queries (1 ≤ q ≤ 10⁶) 
- M = memory limit in MB (1 ≤ M ≤ 1000)
- T = time limit in ms (1 ≤ T ≤ 10000)

### Output Format Pattern:
```
[Algorithm Name]
```
Valid outputs: `Linear`, `Hash`, `Sorted`, `Binary`, `Impossible`

## Test Case Categories (100+ Total)

### Basic Test Cases (input1.txt - input25.txt)
Simple scenarios where algorithm choice is clear:

**Test Case 1: Small Dataset, Hash Optimal**
**Input (`input1.txt`):**
```
1000 100 10 1000
```
**Expected Output (`expected1.txt`):**
```
Hash
```
**Description:** Small dataset with sufficient memory for hash table.

**Test Case 2: Memory Constrained, Linear Only**
**Input (`input2.txt`):**
```
50000 10 1 100000
```
**Expected Output (`expected2.txt`):**
```
Linear
```
**Description:** Low memory forces linear search despite high time limit.

**Test Case 3: Few Queries, Binary Optimal**
**Input (`input3.txt`):**
```
100000 5 50 10000
```
**Expected Output (`expected3.txt`):**
```
Binary
```
**Description:** Few queries make preprocessing worthwhile.

### Edge Test Cases (input26.txt - input50.txt)
Boundary conditions and special scenarios:

**Test Case 26: Minimum Input**
**Input (`input26.txt`):**
```
1 1 1 1
```
**Expected Output (`expected26.txt`):**
```
Linear
```

**Test Case 27: Impossible Scenario**
**Input (`input27.txt`):**
```
1000000 1000 1 1
```
**Expected Output (`expected27.txt`):**
```
Impossible
```
**Description:** No algorithm can fit in 1MB memory with large dataset.

**Test Case 28: Exact Memory Boundary**
**Input (`input28.txt`):**
```
262144 100 2 5000
```
**Expected Output (`expected28.txt`):**
```
Binary
```
**Description:** Exactly 1MB for data, only in-place algorithms work.

### Performance Test Cases (input51.txt - input75.txt)
Large inputs testing algorithm efficiency analysis:

**Test Case 51: High Query Volume**
**Input (`input51.txt`):**
```
10000 1000000 100 50000
```
**Expected Output (`expected51.txt`):**
```
Hash
```
**Description:** Many queries favor O(1) lookup despite setup cost.

**Test Case 52: Memory vs Time Trade-off**
**Input (`input52.txt`):**
```
500000 50000 50 30000
```
**Expected Output (`expected52.txt`):**
```
Sorted
```
**Description:** Balanced scenario requiring careful analysis.

### Complex Scenarios (input76.txt - input100.txt)
Multiple constraints and edge cases combined:

**Test Case 76: All Algorithms Valid**
**Input (`input76.txt`):**
```
1000 50 100 10000
```
**Expected Output (`expected76.txt`):**
```
Hash
```
**Description:** All algorithms work, must choose fastest.

**Test Case 77: Time Critical**
**Input (`input77.txt`):**
```
100000 100000 200 1000
```
**Expected Output (`expected77.txt`):**
```
Hash
```
**Description:** Tight time constraint eliminates O(n) and O(n log n) options.

## Test Case Creation Rules

### Input Validation Rules:
1. All values must be positive integers
2. n (dataset size): 1 ≤ n ≤ 10⁶
3. q (queries): 1 ≤ q ≤ 10⁶
4. M (memory): 1 ≤ M ≤ 1000 MB
5. T (time): 1 ≤ T ≤ 10000 ms
6. Input must have exactly 4 space-separated integers
7. No leading/trailing whitespace except single newline

### Output Format Rules:
1. Output must be exactly one of: `Linear`, `Hash`, `Sorted`, `Binary`, `Impossible`
2. Case-sensitive exact match required
3. Single newline at end
4. No additional text or formatting

### Algorithm Selection Logic:
1. **Memory Check**: Calculate space requirements for each algorithm
2. **Time Check**: Calculate total time (preprocessing + queries) 
3. **Feasibility**: Eliminate algorithms exceeding constraints
4. **Optimization**: Among valid algorithms, select fastest

## Language-Specific Considerations

### Python Considerations:
- Use `map(int, input().split())` to read four integers
- Import `math` for logarithm calculations: `math.log2(n)`
- Memory calculations use integer arithmetic
- Handle large numbers naturally (arbitrary precision)
- Use `print(algorithm_name)` for output

### Go Considerations:
- Use `fmt.Scanf("%d %d %d %d", &n, &q, &M, &T)` for input
- Import `math` for logarithm: `math.Log2(float64(n))`
- Be careful with integer overflow for large calculations
- Use `fmt.Println(algorithmName)` for output
- Consider using `int64` for large intermediate calculations

### JavaScript Considerations:
- Parse input: `const [n, q, M, T] = input.trim().split(' ').map(Number)`
- Use `Math.log2(n)` for logarithm calculations
- Handle large numbers carefully, consider precision limits
- Use `console.log(algorithmName)` for output

## Validation Checklist

### Input Validation:
- [ ] Input has exactly 1 line with 4 integers
- [ ] All values are within specified ranges
- [ ] No invalid characters or formatting
- [ ] Proper space separation between values

### Algorithm Analysis:
- [ ] Memory calculations account for all data structures
- [ ] Time calculations include both preprocessing and queries
- [ ] Constraint checking is mathematically correct
- [ ] Edge cases (n=1, q=1) are handled properly

### Output Validation:
- [ ] Output matches expected algorithm name exactly
- [ ] Case sensitivity is maintained
- [ ] No extra text or formatting in output
- [ ] Impossible cases return "Impossible"

### Performance Validation:
- [ ] Large input cases timeout poor algorithms
- [ ] Memory constraints eliminate inappropriate algorithms
- [ ] Test cases cover all algorithm selection scenarios
- [ ] Edge cases test boundary conditions

## Automated Test Case Generation

```python
import random
import math

def generate_test_case(case_type="random"):
    """Generate test case based on type."""
    if case_type == "basic":
        n = random.randint(100, 10000)
        q = random.randint(10, 1000)
        M = random.randint(10, 100)
        T = random.randint(1000, 5000)
    elif case_type == "edge":
        # Create edge cases - memory/time constrained
        n = random.randint(50000, 500000)
        q = random.randint(100, 10000)
        M = random.randint(1, 10)  # Low memory
        T = random.randint(100, 2000)  # Low time
    elif case_type == "performance":
        # Large inputs
        n = random.randint(100000, 1000000)
        q = random.randint(10000, 1000000)
        M = random.randint(50, 1000)
        T = random.randint(5000, 10000)
    else:
        # Random case
        n = random.randint(1, 1000000)
        q = random.randint(1, 1000000)
        M = random.randint(1, 1000)
        T = random.randint(1, 10000)
    
    return f"{n} {q} {M} {T}"

def calculate_expected_output(n, q, M, T):
    """Calculate the expected algorithm choice."""
    # Memory calculations (4 bytes per int, 1MB = 1024*1024 bytes)
    mb_to_bytes = 1024 * 1024
    bytes_per_int = 4
    
    original_space = (n * bytes_per_int) / mb_to_bytes
    hash_space = original_space + (n * bytes_per_int * 2) / mb_to_bytes
    sorted_space = original_space * 2
    
    algorithms = []
    
    # Linear Search
    if original_space <= M:
        time_linear = q * n * 0.001
        if time_linear <= T:
            algorithms.append(("Linear", time_linear))
    
    # Hash Table  
    if hash_space <= M:
        time_hash = n * 0.001 + q * 0.001
        if time_hash <= T:
            algorithms.append(("Hash", time_hash))
    
    # Sorted Array
    if sorted_space <= M:
        time_sorted = n * math.log2(n) * 0.001 + q * math.log2(n) * 0.001
        if time_sorted <= T:
            algorithms.append(("Sorted", time_sorted))
    
    # Binary Search
    if original_space <= M:
        time_binary = n * math.log2(n) * 0.001 + q * math.log2(n) * 0.001
        if time_binary <= T:
            algorithms.append(("Binary", time_binary))
    
    if not algorithms:
        return "Impossible"
    
    # Return fastest algorithm
    algorithms.sort(key=lambda x: x[1])
    return algorithms[0][0]

def validate_test_case(input_content, expected_content):
    """Validate a test case."""
    try:
        # Parse input
        line = input_content.strip()
        parts = line.split()
        if len(parts) != 4:
            return False, "Input must have exactly 4 integers"
        
        n, q, M, T = map(int, parts)
        
        # Check ranges
        if not (1 <= n <= 1000000):
            return False, f"n={n} out of range [1, 1000000]"
        if not (1 <= q <= 1000000):
            return False, f"q={q} out of range [1, 1000000]"
        if not (1 <= M <= 1000):
            return False, f"M={M} out of range [1, 1000]"
        if not (1 <= T <= 10000):
            return False, f"T={T} out of range [1, 10000]"
        
        # Validate expected output
        expected = expected_content.strip()
        valid_outputs = {"Linear", "Hash", "Sorted", "Binary", "Impossible"}
        if expected not in valid_outputs:
            return False, f"Invalid expected output: {expected}"
        
        # Verify correctness
        calculated = calculate_expected_output(n, q, M, T)
        if calculated != expected:
            return False, f"Expected {expected}, calculated {calculated}"
        
        return True, "Valid test case"
        
    except Exception as e:
        return False, f"Error validating test case: {str(e)}"
```
