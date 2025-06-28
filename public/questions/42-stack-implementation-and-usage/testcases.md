# Test Cases for Stack implementation and usage

## Test Case Structure
This question uses a multi-line input format with variable number of operations.

### Input Format Pattern:
```
Line 1: Number of operations n
Next n lines: Stack operation commands
```

### Output Format Pattern:
```
Results of operations that produce output (pop, peek, isEmpty, size)
One result per line
```

## Test Case 1: Basic Operations
**Input (`input.txt`):**
```
7
push 10
push 20
size
peek
pop
isEmpty
pop
```
**Expected Output (`expected.txt`):**
```
2
20
20
false
10
```
**Description:** Tests basic push, size, peek, pop, and isEmpty operations with a non-empty stack.

## Test Case 2: Edge Cases - Empty Stack
**Input (`input2.txt`):**
```
5
pop
peek
isEmpty
push 5
size
```
**Expected Output (`expected2.txt`):**
```
empty
empty
true
1
```
**Description:** Tests operations on empty stack and single element scenarios.

## Test Case 3: Performance - Large Number of Operations
**Input (`input3.txt`):**
```
1000
push 1
push 2
push 3
...
(997 more operations testing performance)
```
**Expected Output (`expected3.txt`):**
```
(Results of output-producing operations)
```
**Description:** Tests performance with large number of operations (1000 total) to ensure O(1) per operation efficiency.

## Test Case Creation Rules

### Input Validation Rules:
1. First line must contain positive integer n (1 ≤ n ≤ 100,000)
2. Each operation line must be valid format:
   - "push X" where X is integer (-10^9 ≤ X ≤ 10^9)
   - "pop" (no parameters)
   - "peek" (no parameters)
   - "isEmpty" (no parameters)
   - "size" (no parameters)
3. Commands are case-sensitive and lowercase
4. No extra whitespace or invalid commands

### Output Format Rules:
1. Only output results for operations that produce output:
   - pop: top element value or "empty"
   - peek: top element value or "empty"
   - isEmpty: "true" or "false"
   - size: non-negative integer
2. One result per line, no extra whitespace
3. push operations produce no output
4. Results must match exact format (case-sensitive)

## Language-Specific Considerations

### Python Considerations:
- Use list.append() for push operation
- Use list.pop() for pop operation (with length check)
- Use list[-1] for peek operation (with length check)
- Use len(list) for size operation
- Use len(list) == 0 for isEmpty check

### Go Considerations:
- Use slice append() for push operation
- Use slice[len(slice)-1] for pop (with length check and reslicing)
- Use slice[len(slice)-1] for peek (with length check)
- Use len(slice) for size operation
- Handle empty slice cases carefully

## Edge Cases to Test
1. **Empty Stack Operations:**
   - pop on empty stack → "empty"
   - peek on empty stack → "empty"
   - isEmpty on empty stack → "true"
   - size on empty stack → "0"

2. **Single Element Stack:**
   - Push one element then pop
   - Push one element then peek
   - Size should be 1, isEmpty should be false

3. **Boundary Values:**
   - Large positive numbers (10^9)
   - Large negative numbers (-10^9)
   - Zero values
   - Maximum operations (100,000)

4. **Mixed Operations:**
   - Alternating push/pop sequences
   - Multiple peeks without modification
   - Size checks at various stack states

## Performance Test Requirements
- Test case 3 should include 1000 operations
- Should test O(1) time complexity per operation
- Include scenarios that would timeout with inefficient implementations:
  - Frequent size queries (should not require O(n) traversal)
  - Large number of push/pop cycles
  - Deep stack with many peek operations

## Validation Checklist
- [ ] Input has correct format (n followed by n operation lines)
- [ ] All operations are valid commands
- [ ] Expected output matches working solution exactly
- [ ] Edge cases covered (empty stack, single element, large values)
- [ ] Performance case tests efficiency requirements
- [ ] No extra whitespace or formatting issues
- [ ] Case sensitivity maintained ("true"/"false", "empty")

## Automated Test Case Generation
```python
def generate_basic_test():
    """Generate basic functionality test case"""
    operations = [
        "push 10", "push 20", "size", "peek", 
        "pop", "isEmpty", "pop"
    ]
    return len(operations), operations

def generate_edge_test():
    """Generate edge case test with empty stack operations"""
    operations = [
        "pop", "peek", "isEmpty", "push 5", "size"
    ]
    return len(operations), operations

def generate_performance_test(n=1000):
    """Generate performance test with n operations"""
    operations = []
    # Add push operations
    for i in range(n//3):
        operations.append(f"push {i}")
    # Add mixed operations
    for i in range(n//3):
        operations.extend(["size", "peek", "pop"])
    # Fill remaining with more pushes
    remaining = n - len(operations)
    for i in range(remaining):
        operations.append(f"push {i+1000}")
    
    return len(operations), operations[:n]

def validate_test_case(input_content, expected_content):
    """Validate test case format and correctness"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate input format
    assert len(lines) == n + 1, "Input line count mismatch"
    
    # Validate operations
    valid_ops = {"push", "pop", "peek", "isEmpty", "size"}
    for i in range(1, n + 1):
        parts = lines[i].split()
        assert parts[0] in valid_ops, f"Invalid operation: {parts[0]}"
        if parts[0] == "push":
            assert len(parts) == 2, "push requires value"
            int(parts[1])  # Validate integer
        else:
            assert len(parts) == 1, f"{parts[0]} takes no parameters"
    
    return True
```
