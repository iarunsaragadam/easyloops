# Constructors and Destructors

## Problem Statement

Write a program that demonstrates the proper use of constructors and destructors by implementing a **Resource Management System**. Your program should simulate object lifecycle management, showing how resources are created, used, and properly cleaned up.

Your program should implement a `ResourceManager` class that:

1. **Constructor Functionality:**
   - Initializes resources with an ID, type, and capacity
   - Tracks resource creation in a global registry
   - Prints creation messages when resources are instantiated

2. **Destructor Functionality:**
   - Automatically cleans up resources when they're destroyed
   - Removes resources from the global registry
   - Prints destruction messages when resources are cleaned up

3. **Resource Operations:**
   - Allocate resources up to capacity limits
   - Deallocate previously allocated resources
   - Display resource information and system summaries

The program should read a series of operations and execute them, demonstrating the complete lifecycle of resources from creation to destruction.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of operations)
Lines 2 to N+1: Operations in the format:
  - CREATE resource_id resource_type capacity
  - DESTROY resource_id
  - ALLOCATE resource_id amount
  - DEALLOCATE resource_id amount
  - INFO resource_id
  - SUMMARY
```

## Test Cases
**Input (`input.txt`):**
```
6
CREATE R1 Memory 100
ALLOCATE R1 50
INFO R1
SUMMARY
DESTROY R1
SUMMARY
```

**Expected Output (`expected.txt`):**
```
Created Memory resource R1 with capacity 100
Allocation successful
Memory R1: 50/100 used
Active: 1, Created: 1, Destroyed: 0
Destroyed Memory resource R1
Active: 0, Created: 1, Destroyed: 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand constructor initialization and parameter passing
- Learn destructor cleanup and resource management principles
- Practice object lifecycle management in object-oriented programming
- Implement proper resource tracking and cleanup patterns
- Understand the relationship between object creation and destruction
- Learn to use class variables for global state management

## Implementation Guidelines
### Python Example Structure:
```python
class ResourceManager:
    # Class variables for tracking
    active_resources = {}
    total_created = 0
    total_destroyed = 0
    
    def __init__(self, resource_id, resource_type, capacity):
        # Constructor logic here
        pass
    
    def __del__(self):
        # Destructor logic here
        pass
    
    def allocate(self, amount):
        # Resource allocation logic
        pass
    
    def deallocate(self, amount):
        # Resource deallocation logic
        pass

def solve():
    n = int(input())
    resources = {}
    
    for _ in range(n):
        operation = input().strip().split()
        # Process each operation
        pass
```

### Go Example Structure:
```go
type ResourceManager struct {
    ResourceID   string
    ResourceType string
    Capacity     int
    Used         int
}

// Constructor function
func NewResourceManager(id, resourceType string, capacity int) *ResourceManager {
    // Initialization logic
    return &ResourceManager{...}
}

// Destructor-like cleanup function
func (rm *ResourceManager) Destroy() {
    // Cleanup logic
}

func solve() {
    // Read operations and manage resources
}
```

## Constraints
- Resource IDs are unique strings (max 20 characters)
- Resource types are strings (max 20 characters)  
- Capacity and allocation amounts are positive integers (1 ≤ capacity ≤ 10000)
- Maximum number of operations: 1000
- Maximum number of active resources at any time: 100
- Resource allocation cannot exceed capacity
- Resource deallocation cannot exceed currently allocated amount

## Hints
- Use class variables to track global resource statistics
- Implement proper constructor initialization with all required parameters
- Ensure destructors properly clean up and update global tracking
- Handle allocation/deallocation bounds checking carefully
- Remember that destructor behavior may vary between languages (Python's `__del__` vs manual cleanup in other languages)
- Consider edge cases like destroying non-existent resources or invalid operations
