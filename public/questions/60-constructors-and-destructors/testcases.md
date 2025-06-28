# Test Cases for Constructors and Destructors

## Test Case Structure
This question uses a multi-line input format for resource management operations.

### Input Format Pattern:
```
Line 1: N (number of operations, 1 ≤ N ≤ 1000)
Lines 2 to N+1: Operations in one of these formats:
  - CREATE resource_id resource_type capacity
  - DESTROY resource_id  
  - ALLOCATE resource_id amount
  - DEALLOCATE resource_id amount
  - INFO resource_id
  - SUMMARY
```

### Output Format Pattern:
```
For CREATE: "Created [resource_type] resource [resource_id] with capacity [capacity]"
For DESTROY: "Destroyed [resource_type] resource [resource_id]"
For ALLOCATE: "Allocation successful" or "Allocation failed"
For DEALLOCATE: "Deallocation successful" or "Deallocation failed"
For INFO: "[resource_type] [resource_id]: [used]/[capacity] used"
For SUMMARY: "Active: [count], Created: [total_created], Destroyed: [total_destroyed]"
```

## Test Case 1: Basic Constructor/Destructor
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

## Test Case 2: Multiple Resources and Edge Cases
**Input (`input2.txt`):**
```
12
CREATE CPU1 Processor 4
CREATE MEM1 Memory 1024
ALLOCATE CPU1 5
ALLOCATE CPU1 2
ALLOCATE MEM1 512
INFO CPU1
INFO MEM1
DEALLOCATE CPU1 1
DEALLOCATE MEM1 1000
SUMMARY
DESTROY CPU1
DESTROY MEM1
```
**Expected Output (`expected2.txt`):**
```
Created Processor resource CPU1 with capacity 4
Created Memory resource MEM1 with capacity 1024
Allocation failed
Allocation successful
Allocation successful
Processor CPU1: 2/4 used
Memory MEM1: 512/1024 used
Deallocation successful
Deallocation failed
Active: 2, Created: 2, Destroyed: 0
Destroyed Processor resource CPU1
Destroyed Memory resource MEM1
```

## Test Case 3: Performance and Complex Scenarios
**Input (`input3.txt`):**
```
20
CREATE R1 Memory 1000
CREATE R2 CPU 8
CREATE R3 Disk 2000
ALLOCATE R1 500
ALLOCATE R2 4
ALLOCATE R3 1500
SUMMARY
DEALLOCATE R1 200
DEALLOCATE R2 2
INFO R1
INFO R2
INFO R3
ALLOCATE R1 600
DEALLOCATE R3 1500
DESTROY R2
SUMMARY
CREATE R4 Network 100
ALLOCATE R4 50
DESTROY R1
DESTROY R3
DESTROY R4
```
**Expected Output (`expected3.txt`):**
```
Created Memory resource R1 with capacity 1000
Created CPU resource R2 with capacity 8
Created Disk resource R3 with capacity 2000
Allocation successful
Allocation successful
Allocation successful
Active: 3, Created: 3, Destroyed: 0
Deallocation successful
Deallocation successful
Memory R1: 300/1000 used
CPU R2: 2/8 used
Disk R3: 1500/2000 used
Allocation successful
Deallocation successful
Destroyed CPU resource R2
Active: 2, Created: 3, Destroyed: 1
Created Network resource R4 with capacity 100
Allocation successful
Destroyed Memory resource R1
Destroyed Disk resource R3
Destroyed Network resource R4
```

## Test Case Creation Rules
### Input Validation Rules:
1. Operation count N must be between 1 and 1000
2. Resource IDs must be unique strings (max 20 characters)
3. Resource types can be any string (max 20 characters)
4. Capacity and amounts must be positive integers (1 ≤ value ≤ 10000)
5. Cannot destroy non-existent resources
6. Cannot allocate beyond capacity limits
7. Cannot deallocate more than currently allocated

### Output Format Rules:
1. Constructor messages must show resource creation with type, ID, and capacity
2. Destructor messages must show resource destruction with type and ID
3. Allocation/deallocation results must be "successful" or "failed"
4. INFO displays format: "[type] [id]: [used]/[capacity] used"
5. SUMMARY displays format: "Active: [count], Created: [total], Destroyed: [total]"
6. No trailing whitespace in output lines

## Language-Specific Considerations
### Python Considerations:
- Use `__init__` for constructor and `__del__` for destructor
- Class variables track global state across all instances
- Handle destructor timing carefully (may not be immediate)
- Use `del` statement to explicitly trigger destructors

### Go Considerations:
- Use constructor functions (e.g., `NewResourceManager`)
- Implement explicit cleanup methods instead of destructors
- Use pointers for resource management
- Handle manual memory management and cleanup

### JavaScript Considerations:
- Use constructor functions or class constructors
- No built-in destructors - implement cleanup methods
- Use WeakMap or similar for tracking if needed
- Handle manual resource cleanup

## Validation Checklist
- [ ] Input follows exact format specification
- [ ] All operations are valid and properly formatted
- [ ] Resource IDs are unique within their lifetime
- [ ] Capacity and amount values are within constraints
- [ ] Output format matches specifications exactly
- [ ] Constructor and destructor messages are correct
- [ ] Global tracking statistics are accurate
- [ ] Edge cases (failed allocations, invalid operations) are handled

## Automated Test Case Generation
```python
def generate_test_case(num_operations=10, max_resources=5):
    """Generate a random valid test case"""
    operations = []
    active_resources = {}
    resource_counter = 1
    
    for i in range(num_operations):
        if not active_resources or random.choice([True, False]):
            # Create new resource
            resource_id = f"R{resource_counter}"
            resource_type = random.choice(["Memory", "CPU", "Disk", "Network"])
            capacity = random.randint(10, 1000)
            operations.append(f"CREATE {resource_id} {resource_type} {capacity}")
            active_resources[resource_id] = {"type": resource_type, "capacity": capacity, "used": 0}
            resource_counter += 1
        else:
            # Operation on existing resource
            resource_id = random.choice(list(active_resources.keys()))
            operation_type = random.choice(["ALLOCATE", "DEALLOCATE", "INFO", "DESTROY"])
            
            if operation_type == "ALLOCATE":
                amount = random.randint(1, active_resources[resource_id]["capacity"])
                operations.append(f"ALLOCATE {resource_id} {amount}")
            elif operation_type == "DEALLOCATE":
                amount = random.randint(1, active_resources[resource_id]["used"] + 10)  # May fail
                operations.append(f"DEALLOCATE {resource_id} {amount}")
            elif operation_type == "INFO":
                operations.append(f"INFO {resource_id}")
            else:  # DESTROY
                operations.append(f"DESTROY {resource_id}")
                del active_resources[resource_id]
    
    return operations

def validate_test_case(input_content, expected_content):
    """Validate that a test case is properly formatted and solvable"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    if len(lines) != n + 1:
        return False, "Incorrect number of operation lines"
    
    active_resources = {}
    for i in range(1, n + 1):
        parts = lines[i].split()
        if parts[0] == "CREATE":
            if len(parts) != 4:
                return False, f"Invalid CREATE format at line {i+1}"
            resource_id, resource_type, capacity = parts[1], parts[2], int(parts[3])
            if resource_id in active_resources:
                return False, f"Duplicate resource ID {resource_id}"
            active_resources[resource_id] = capacity
        elif parts[0] == "DESTROY":
            if len(parts) != 2:
                return False, f"Invalid DESTROY format at line {i+1}"
            resource_id = parts[1]
            if resource_id not in active_resources:
                return False, f"Cannot destroy non-existent resource {resource_id}"
            del active_resources[resource_id]
        # Add more validation for other operations...
    
    return True, "Valid test case"
```
