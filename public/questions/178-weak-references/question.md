# Weak References

## Problem Statement

Implement a memory-efficient cache system using weak references. A weak reference is a reference to an object that doesn't prevent the object from being garbage collected. This is particularly useful for implementing caches that should not cause memory leaks by holding onto objects longer than necessary.

Your task is to implement a `WeakReferenceCache` that automatically removes entries when the referenced objects are garbage collected. The cache should support the following operations:

1. **PUT key value [KEEP]** - Store an object in the cache with the given key. If "KEEP" is specified, maintain a strong reference to prevent garbage collection.
2. **GET key** - Retrieve an object from the cache. Returns "NULL" if the object was garbage collected.
3. **SIZE** - Return the current number of entries in the cache.
4. **KEYS** - Return all keys currently in the cache (sorted alphabetically).
5. **DELETE_REF key** - Remove the strong reference for the given key (if it exists).
6. **GC** - Force garbage collection.
7. **CLEANUP** - Force cleanup of dead weak references and return the number removed.

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations)
Lines 2 to n+1: operation commands as described above
```

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand weak references and their use cases
- Learn about garbage collection and memory management
- Implement cache systems that prevent memory leaks
- Work with callback functions and object lifecycle management
- Understand the difference between strong and weak references

## Implementation Guidelines

### Key Concepts:
1. **Weak References**: References that don't prevent garbage collection
2. **Callback Functions**: Functions called when weak references are about to be collected
3. **Memory Management**: Understanding when objects are eligible for garbage collection
4. **Cache Implementation**: Building efficient data structures

### Python Example Structure:
```python
import weakref
import gc

class CacheObject:
    def __init__(self, value):
        self.value = value
    
    def __str__(self):
        return self.value

class WeakReferenceCache:
    def __init__(self):
        self._cache = {}
    
    def put(self, key, obj):
        # Implement weak reference storage
        pass
    
    def get(self, key):
        # Implement weak reference retrieval
        pass

def solve():
    # Implement the main solution logic
    pass
```

### Go Example Structure:
```go
import (
    "runtime"
    "sync"
)

type WeakReferenceCache struct {
    cache map[string]interface{}
    mutex sync.RWMutex
}

func (c *WeakReferenceCache) Put(key string, value interface{}) {
    // Note: Go doesn't have built-in weak references
    // This would require a different approach or external library
}

func solve() {
    // Implement solution
}
```

## Constraints
- 1 ≤ n ≤ 1000 (number of operations)
- Key length: 1 ≤ len(key) ≤ 20
- Value length: 1 ≤ len(value) ≤ 50
- Time complexity: O(1) for PUT and GET operations
- Space complexity: O(k) where k is the number of live objects in cache

## Hints
1. **Start Simple**: Begin with a basic cache, then add weak reference functionality
2. **Callback Functions**: Use callback functions to detect when objects are garbage collected
3. **Wrapper Objects**: Some languages require wrapper objects to create weak references to primitives
4. **Strong References**: Keep track of which objects should not be garbage collected
5. **Cleanup Strategy**: Implement both automatic and manual cleanup of dead references
6. **Testing GC**: Use explicit garbage collection calls to test weak reference behavior
