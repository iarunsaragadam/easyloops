# Test Cases for Weak References

## Test Case Structure
This question uses a multi-line input format with cache operations.

### Input Format Pattern:
```
Line 1: n (number of operations)
Lines 2 to n+1: operation commands
```

### Output Format Pattern:
```
One line per operation showing the result
```

### Operation Types:
- **PUT key value [KEEP]** - Store object, optionally with strong reference
- **GET key** - Retrieve object or "NULL" if garbage collected
- **SIZE** - Return number of cache entries
- **KEYS** - Return sorted list of keys
- **DELETE_REF key** - Remove strong reference
- **GC** - Force garbage collection
- **CLEANUP** - Force cleanup and return count of removed entries

## Test Case 1: Basic Cache Operations
**Input (`input.txt`):**
```
5
PUT item1 data1 KEEP
PUT item2 data2
GET item1
GET item2
SIZE
```
**Expected Output (`expected.txt`):**
```
PUT item1
PUT item2
GET item1 data1
GET item2 NULL
SIZE 1
```

**Description**: Tests basic PUT/GET operations and demonstrates how objects without strong references can be garbage collected.

## Test Case 2: Edge Cases and Garbage Collection
**Input (`input2.txt`):**
```
10
PUT a val1 KEEP
PUT b val2 KEEP
PUT c val3
GET a
GET b
GET c
DELETE_REF a
GC
GET a
SIZE
```
**Expected Output (`expected2.txt`):**
```
PUT a
PUT b
PUT c
GET a val1
GET b val2
GET c NULL
DELETE_REF a
GC
GET a NULL
SIZE 1
```

**Description**: Tests strong reference management, garbage collection timing, and edge cases with empty cache scenarios.

## Test Case 3: Complex Cache Management
**Input (`input3.txt`):**
```
7
PUT alpha data1 KEEP
PUT beta data2
PUT gamma data3 KEEP
KEYS
GET alpha
GET beta
GET gamma
```
**Expected Output (`expected3.txt`):**
```
PUT alpha
PUT beta
PUT gamma
KEYS alpha gamma
GET alpha data1
GET beta NULL
GET gamma data3
```

**Description**: Tests mixed scenarios with objects that have and don't have strong references, demonstrating that objects without strong references are garbage collected and show as NULL, while the cache automatically manages weak references.

## Test Case Creation Rules

### Input Validation Rules:
1. Number of operations n must be between 1 and 1000
2. Keys must be 1-20 characters, alphanumeric
3. Values must be 1-50 characters, alphanumeric
4. Operations must follow exact format specified
5. KEEP flag is optional for PUT operations
6. All operations must be from the allowed set

### Output Format Rules:
1. Each operation produces exactly one output line
2. PUT operations output: "PUT {key}"
3. GET operations output: "GET {key} {value}" or "GET {key} NULL"
4. SIZE operations output: "SIZE {number}"
5. KEYS operations output: "KEYS {sorted space-separated keys}" or "KEYS" if empty
6. DELETE_REF operations output: "DELETE_REF {key}"
7. GC operations output: "GC"
8. CLEANUP operations output: "CLEANUP {count}"

### Garbage Collection Behavior:
1. Objects without strong references are eligible for collection
2. GC operation forces garbage collection
3. Weak references to collected objects return NULL
4. CLEANUP removes dead weak references from internal structures

## Language-Specific Considerations

### Python Considerations:
- Use `weakref` module for weak reference implementation
- String objects need wrapper classes to be weak-referenceable
- `gc.collect()` can be used to force garbage collection
- Callback functions can detect when weak references are collected
- Consider using `weakref.WeakValueDictionary` for simpler implementation

### Go Considerations:
- Go doesn't have built-in weak references
- Would require external libraries or different implementation approach
- Garbage collection timing is less predictable
- Could simulate with finalizers and careful memory management
- Alternative: implement reference counting manually

### Java Considerations:
- Use `WeakReference<T>` class from java.lang.ref package
- `System.gc()` can suggest garbage collection (not guaranteed)
- `ReferenceQueue` can be used for cleanup notifications
- Consider `WeakHashMap` for simpler cache implementations

### C# Considerations:
- Use `WeakReference` or `WeakReference<T>` classes
- `GC.Collect()` forces garbage collection
- Implement `IDisposable` for cleanup patterns
- Consider `ConditionalWeakTable<TKey, TValue>` for advanced scenarios

## Performance Considerations
- PUT operations should be O(1) average case
- GET operations should be O(1) average case
- SIZE operations should be O(1)
- KEYS operations should be O(k log k) where k is number of keys
- CLEANUP operations should be O(k) where k is cache size
- Memory usage should be proportional to live objects only

## Validation Checklist
- [ ] Input follows multi-line format with operation count
- [ ] All operations are from the allowed set
- [ ] Keys and values meet length constraints
- [ ] Strong references prevent garbage collection when expected
- [ ] Weak references allow garbage collection when expected
- [ ] CLEANUP removes appropriate number of dead references
- [ ] Output format matches specifications exactly
- [ ] Edge cases (empty cache, all objects collected) handled correctly

## Common Implementation Pitfalls
1. **String Weak References**: Direct weak references to strings often not supported
2. **Garbage Collection Timing**: GC may not run immediately when expected
3. **Callback Cleanup**: Forgetting to clean up callback dictionaries
4. **Strong Reference Management**: Not properly removing strong references
5. **Key Sorting**: KEYS operation must return sorted keys
6. **Null Handling**: Properly detecting and returning NULL for collected objects

## Automated Test Case Generation
```python
import random
import string

def generate_test_case(num_ops=20, keep_probability=0.3):
    """Generate a random test case for weak reference cache"""
    operations = []
    strong_refs = set()
    
    for i in range(num_ops):
        op_type = random.choice(['PUT', 'GET', 'SIZE', 'KEYS', 'DELETE_REF', 'GC', 'CLEANUP'])
        
        if op_type == 'PUT':
            key = f"key{i}"
            value = f"val{i}"
            keep = random.random() < keep_probability
            if keep:
                operations.append(f"PUT {key} {value} KEEP")
                strong_refs.add(key)
            else:
                operations.append(f"PUT {key} {value}")
        elif op_type == 'GET':
            if i > 0:  # Ensure there's something to get
                key = f"key{random.randint(0, i-1)}"
                operations.append(f"GET {key}")
        elif op_type == 'DELETE_REF':
            if strong_refs:
                key = random.choice(list(strong_refs))
                operations.append(f"DELETE_REF {key}")
                strong_refs.remove(key)
        else:
            operations.append(op_type)
    
    return [str(len(operations))] + operations

def validate_test_case(input_content, expected_content):
    """Validate that a test case is well-formed"""
    input_lines = input_content.strip().split('\n')
    expected_lines = expected_content.strip().split('\n')
    
    if not input_lines:
        return False, "Empty input"
    
    try:
        n = int(input_lines[0])
        if len(input_lines) != n + 1:
            return False, f"Expected {n+1} lines, got {len(input_lines)}"
    except ValueError:
        return False, "First line must be a number"
    
    # Validate operations format
    for i, line in enumerate(input_lines[1:], 1):
        parts = line.split()
        if not parts:
            return False, f"Line {i}: Empty operation"
        
        op = parts[0]
        if op not in ['PUT', 'GET', 'SIZE', 'KEYS', 'DELETE_REF', 'GC', 'CLEANUP']:
            return False, f"Line {i}: Invalid operation {op}"
    
    return True, "Valid test case"
```
