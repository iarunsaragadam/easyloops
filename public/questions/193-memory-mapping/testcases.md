# Test Cases for Memory Mapping - Virtual Memory Page Management

## Test Case Structure
This question uses a multi-line input format for virtual memory management operations.

### Input Format Pattern:
```
Line 1: num_physical_pages page_size
Line 2: num_operations
Next num_operations lines: operation_type virtual_address
```

### Output Format Pattern:
```
page_faults
mapped_pages  
virtual_page:physical_page (sorted by virtual_page)
```

## Test Case Categories

### Basic Test Cases (input1.txt - input30.txt)
Simple scenarios to verify core functionality:
- **Small memory systems**: 2-4 physical pages
- **Sequential access patterns**: Accessing consecutive pages
- **Simple LRU behavior**: Clear eviction patterns
- **Basic page fault counting**: Verifiable by hand

### Edge Cases (input31.txt - input60.txt)
Boundary conditions and special scenarios:
- **Single physical page**: Maximum eviction frequency
- **No operations**: Empty operation list
- **Same address repeated**: Testing LRU update without page faults
- **Large page sizes**: Testing address-to-page calculation
- **Maximum virtual addresses**: Near 2^31-1 addresses

### Performance Test Cases (input61.txt - input90.txt)
Large inputs that will timeout inefficient algorithms:
- **Large operation counts**: Up to 100,000 operations
- **Many unique pages**: Causing frequent evictions
- **Thrashing scenarios**: Poor access patterns causing many page faults
- **Mixed read/write patterns**: Complex LRU behavior

### Complex Scenarios (input91.txt - input110.txt)
Advanced test cases combining multiple challenges:
- **Interleaved access patterns**: Mixing hot and cold pages
- **Burst access patterns**: Periods of high activity
- **Working set changes**: Access patterns that shift over time
- **Edge case combinations**: Multiple boundary conditions together

## Test Case Creation Rules

### Input Validation Rules:
1. **Physical pages**: 1 ≤ num_physical_pages ≤ 1000
2. **Page size**: 1 ≤ page_size ≤ 4096, must be power of 2
3. **Operations**: 1 ≤ num_operations ≤ 100,000
4. **Virtual addresses**: 0 ≤ virtual_address ≤ 2^31-1
5. **Operation types**: Must be "read" or "write"

### Output Format Rules:
1. **Page faults**: Non-negative integer
2. **Mapped pages**: 0 ≤ mapped_pages ≤ num_physical_pages
3. **Page mappings**: Format "virtual_page:physical_page"
4. **Sorting**: Virtual pages must be sorted in ascending order
5. **Consistency**: Number of mapping lines must equal mapped_pages

### LRU Algorithm Verification:
1. **Page hit**: No eviction, update LRU order
2. **Page fault with free pages**: Allocate new physical page
3. **Page fault with full memory**: Evict LRU page, allocate to new page
4. **Access order tracking**: Both reads and writes update LRU order

## Language-Specific Considerations

### Python Considerations:
- Use integer division (//) for virtual address to page conversion
- Dictionary for page table provides O(1) lookup
- List for LRU order (can be optimized with deque or custom linked list)
- Handle large virtual addresses with built-in integer support

### Go Considerations:
- Use integer division for address to page conversion
- Map for page table provides O(1) lookup  
- Slice for LRU order tracking
- Handle potential integer overflow with large addresses

### Performance Requirements:
- **Time complexity**: O(1) amortized per operation for optimal solution
- **Space complexity**: O(num_physical_pages) for page management
- **Inefficient approaches**: O(n) per operation will timeout on large inputs

## Validation Checklist
- [ ] All test cases use valid input format
- [ ] Page faults are correctly counted
- [ ] LRU replacement works correctly
- [ ] Virtual to physical page mapping is consistent
- [ ] Output format matches specification exactly
- [ ] Large test cases will timeout O(n²) solutions
- [ ] Edge cases cover boundary conditions
- [ ] Test cases are educational and realistic

## Test Case Generation Guidelines

### Basic Test Case Generation:
```python
def generate_basic_test():
    # Small systems with predictable behavior
    num_physical_pages = 2-4
    page_size = 1024
    num_operations = 5-10
    # Create simple access patterns
```

### Performance Test Case Generation:
```python
def generate_performance_test():
    # Large systems that stress the algorithm
    num_physical_pages = 100-1000
    page_size = 1024-4096
    num_operations = 10000-100000
    # Create patterns that cause many page faults
```

### Edge Case Generation:
```python
def generate_edge_test():
    # Boundary conditions
    # Single page, empty operations, large addresses
    # Maximum values within constraints
```

## Expected Performance Characteristics

### Optimal Solution (O(1) per operation):
- Uses hash map + doubly linked list for LRU
- Should handle 100,000 operations easily
- Memory usage proportional to physical pages

### Inefficient Solution (O(n) per operation):
- Linear search for LRU page on each eviction
- Will timeout on large test cases (input61.txt+)
- Forces students to optimize their approach

### Memory Management Learning:
- Understanding virtual vs physical addressing
- Page fault handling and replacement policies
- LRU algorithm implementation and optimization
- Operating system concepts in practice
