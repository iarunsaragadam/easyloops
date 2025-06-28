# Test Cases for Array traversal and modification

## Test Case Structure
This question uses a 2-line input format for non-empty arrays, or 1-line for empty arrays.

### Input Format Pattern:
```
Line 1: Integer n (number of elements, 0 ≤ n ≤ 100,000)
Line 2: n space-separated integers (only if n > 0)
```

### Output Format Pattern:
```
n space-separated integers, each doubled from input (empty line if n = 0)
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
3
1 2 3
```
**Expected Output (`expected.txt`):**
```
2 4 6
```
**Description:** Standard case with positive integers demonstrating basic doubling functionality.

## Test Case 2: Edge
**Input (`input2.txt`):**
```
0
```
**Expected Output (`expected2.txt`):**
```

```
**Description:** Edge case with empty array (n=0). Output should be empty line. Tests boundary condition handling.

## Test Case 3: Performance
**Input (`input3.txt`):**
```
100000
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 ... [continues to 100000]
```
**Expected Output (`expected3.txt`):**
```
2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150 152 154 156 158 160 162 164 166 168 170 172 174 176 178 180 182 184 186 188 190 192 194 196 198 200 ... [continues to 200000]
```
**Description:** Large input to test algorithm efficiency. Should complete in reasonable time with O(n) solution. Tests performance and memory handling.

## Test Case Creation Rules
### Input Validation Rules:
1. First line must contain a single non-negative integer n (0 ≤ n ≤ 100,000)
2. If n > 0, second line must contain exactly n space-separated integers
3. If n = 0, input contains only the first line
4. Each integer must be in range [-1,000,000, 1,000,000]
5. No leading/trailing whitespace except single newline at end
6. Integers separated by exactly one space

### Output Format Rules:
1. If n = 0, output empty line
2. If n > 0, output exactly n space-separated integers
3. Each output integer is exactly double the corresponding input integer
4. No leading zeros (except for result 0)
5. Single newline at end of output
6. Integers separated by exactly one space
7. No trailing spaces

## Language-Specific Considerations
### Python Considerations:
- Use `int(input().strip())` to read n
- Use `list(map(int, input().strip().split()))` to read array
- Handle empty array case before reading second line
- Use `print(' '.join(map(str, result)))` for output
- List comprehension can make doubling elegant: `[x * 2 for x in arr]`

### Go Considerations:
- Use `fmt.Scanf("%d", &n)` to read n
- Use loop with `fmt.Scanf("%d", &arr[i])` to read array elements
- Handle empty array case explicitly
- Use proper formatting for space-separated output
- Consider memory allocation for large arrays with `make([]int, n)`

### JavaScript Considerations:
- Use `parseInt(require('fs').readFileSync(0, 'utf8').trim())` for n
- Parse array with `.split(' ').map(Number)`
- Handle empty array before attempting to read second line
- Use `console.log(result.join(' '))` for output
- Be aware of integer precision for very large numbers

### Java Considerations:
- Use `Scanner` to read input efficiently
- Use `ArrayList<Integer>` or `int[]` array for storage
- Handle empty array case in input parsing
- Use proper string formatting for output
- Consider `StringBuilder` for efficient output construction

## Additional Test Scenarios
### Complex Cases to Consider:
1. **Single element**: n=1, various values (positive, negative, zero)
2. **Negative numbers**: Mix of positive and negative integers
3. **Zero elements**: Array containing zeros
4. **Maximum values**: Test with largest possible input values
5. **Minimum values**: Test with smallest possible input values
6. **Mixed signs**: Arrays with both positive and negative numbers

### Expected Additional Test Cases:
- **Single positive**: `1\n5` → `10`
- **Single negative**: `1\n-3` → `-6`
- **Single zero**: `1\n0` → `0`
- **Mixed values**: `5\n-2 0 1 -10 100` → `-4 0 2 -20 200`
- **All negatives**: `3\n-1 -5 -100` → `-2 -10 -200`
- **Large numbers**: Test near integer boundaries

## Validation Checklist
- [ ] Input has exactly 1 or 2 lines (depending on n)
- [ ] First line contains single integer n in valid range
- [ ] If n > 0, second line has exactly n space-separated integers
- [ ] All integers are in valid range [-1,000,000, 1,000,000]
- [ ] Output has correct number of elements (n)
- [ ] Each output element is exactly double the input element
- [ ] Output format matches specification (spaces, newlines)
- [ ] Algorithm handles edge cases correctly
- [ ] Performance is acceptable for large inputs (O(n) time)

## Automated Test Case Generation
```python
import random

def generate_test_case(n_min=0, n_max=100000, val_min=-1000000, val_max=1000000):
    """Generate a random test case within specified bounds."""
    n = random.randint(n_min, n_max)
    
    if n == 0:
        input_content = "0\n"
        expected_content = "\n"
    else:
        arr = [random.randint(val_min, val_max) for _ in range(n)]
        doubled_arr = [x * 2 for x in arr]
        
        input_content = f"{n}\n{' '.join(map(str, arr))}\n"
        expected_content = f"{' '.join(map(str, doubled_arr))}\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that a test case follows the correct format."""
    input_lines = input_content.strip().split('\n')
    
    # Validate input format
    if len(input_lines) < 1:
        return False, "Input must have at least 1 line"
    
    try:
        n = int(input_lines[0])
    except ValueError:
        return False, "First line must be an integer"
    
    if n < 0 or n > 100000:
        return False, f"n must be in range [0, 100000], got {n}"
    
    if n == 0:
        if len(input_lines) != 1:
            return False, "Empty array case should have exactly 1 line"
        if expected_content.strip() != "":
            return False, "Empty array should produce empty output"
    else:
        if len(input_lines) != 2:
            return False, f"Non-empty array case should have exactly 2 lines"
        
        try:
            arr = list(map(int, input_lines[1].split()))
        except ValueError:
            return False, "Second line must contain space-separated integers"
        
        if len(arr) != n:
            return False, f"Array should have {n} elements, got {len(arr)}"
        
        for val in arr:
            if val < -1000000 or val > 1000000:
                return False, f"Array element {val} out of range"
        
        # Validate expected output
        expected_arr = list(map(int, expected_content.strip().split()))
        if len(expected_arr) != n:
            return False, "Expected output length doesn't match input"
        
        for i, (input_val, expected_val) in enumerate(zip(arr, expected_arr)):
            if expected_val != input_val * 2:
                return False, f"Element {i}: expected {input_val * 2}, got {expected_val}"
    
    return True, "Valid test case"
```
