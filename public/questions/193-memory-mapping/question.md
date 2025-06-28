# Memory Mapping - Virtual Memory Page Management

## Problem Statement

Implement a virtual memory management system that simulates how an operating system handles memory mapping with page replacement. Your system must manage a limited number of physical memory pages and use the **Least Recently Used (LRU)** algorithm to decide which pages to evict when physical memory is full.

Given a series of memory access operations (read/write) to virtual addresses, your system should:
1. Translate virtual addresses to pages
2. Handle page faults when accessing unmapped pages
3. Implement LRU page replacement when physical memory is full
4. Track the total number of page faults and final memory state

## Input Format

The input consists of multiple lines:
```
Line 1: num_physical_pages page_size
Line 2: num_operations  
Next num_operations lines: operation_type virtual_address
```

Where:
- `num_physical_pages`: Number of available physical memory pages (1 ≤ num_physical_pages ≤ 1000)
- `page_size`: Size of each page in bytes (1 ≤ page_size ≤ 4096, always power of 2)
- `num_operations`: Number of memory operations (1 ≤ num_operations ≤ 100000)
- `operation_type`: Either "read" or "write"
- `virtual_address`: Virtual memory address to access (0 ≤ virtual_address ≤ 2^31 - 1)

## Output Format

```
page_faults
mapped_pages
virtual_page:physical_page
...
```

Where:
- `page_faults`: Total number of page faults that occurred
- `mapped_pages`: Number of pages currently mapped in physical memory
- Following lines: Each mapped virtual page and its corresponding physical page number, sorted by virtual page number

## Test Cases

**Input (`input1.txt`):**
```
4 1024
6
read 0
read 1024
read 2048
read 3072
read 4096
read 0
```

**Expected Output (`expected1.txt`):**
```
5
4
0:1
2:2
3:3
4:0
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand virtual memory management and page mapping
- Implement LRU (Least Recently Used) page replacement algorithm
- Practice hash table and linked list data structure usage
- Learn about operating system memory management concepts
- Handle large-scale data efficiently with optimal time complexity

## Implementation Guidelines

### Key Components to Implement:
1. **Page Table**: Map virtual pages to physical pages
2. **LRU Tracking**: Track access order for page replacement
3. **Page Fault Handler**: Load pages and handle eviction
4. **Address Translation**: Convert virtual addresses to page numbers

### Python Example Structure:
```python
def solve():
    # Read input parameters
    num_physical_pages, page_size = map(int, input().split())
    num_operations = int(input())
    
    # Initialize data structures
    page_table = {}      # virtual_page -> physical_page
    lru_order = []       # track access order
    page_faults = 0
    
    # Process each memory operation
    for _ in range(num_operations):
        operation, virtual_address = input().split()
        virtual_address = int(virtual_address)
        virtual_page = virtual_address // page_size
        
        # Handle page access and LRU replacement
        # ... implement your logic here
    
    # Output results
    print(page_faults)
    # ... print memory state
```

### Go Example Structure:
```go
func solve() {
    var numPhysicalPages, pageSize, numOperations int
    fmt.Scan(&numPhysicalPages, &pageSize, &numOperations)
    
    pageTable := make(map[int]int)
    var pageFaults int
    
    // Process operations and implement LRU
    // ... implement your logic here
}
```

## Constraints
- 1 ≤ num_physical_pages ≤ 1000
- 1 ≤ page_size ≤ 4096 (always power of 2)
- 1 ≤ num_operations ≤ 100000
- 0 ≤ virtual_address ≤ 2^31 - 1
- Time limit: 2 seconds
- Memory limit: 256 MB

## Hints
- **Hint 1**: Use virtual_address // page_size to get the virtual page number
- **Hint 2**: Implement LRU using a combination of hash map and doubly linked list for O(1) operations
- **Hint 3**: A page fault occurs when accessing a virtual page not in the page table
- **Hint 4**: When physical memory is full, evict the least recently used page before loading new one
- **Hint 5**: Keep track of access order - both reads and writes update the LRU order
- **Hint 6**: For large inputs, ensure your LRU implementation is O(1) per operation to avoid timeout
