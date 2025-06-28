#!/usr/bin/env python3
"""
Memory Optimization Solution: Array Deduplication with Space Optimization

Problem: Remove duplicates from an array while maintaining original order.
Optimize for space complexity.

Approaches:
1. Naive: Use hash set - O(n) extra space
2. Optimized: Two-pointer in-place modification - O(1) extra space
"""

def solve_naive(arr):
    """
    Naive approach using extra space - O(n) space complexity
    Good for comparison but not memory optimized
    """
    seen = set()
    result = []
    for num in arr:
        if num not in seen:
            seen.add(num)
            result.append(num)
    return result

def solve_optimized(arr):
    """
    Memory optimized approach - O(1) extra space complexity
    Modifies array in-place using two-pointer technique
    """
    if not arr:
        return []
    
    # Two-pointer approach for in-place deduplication
    write_idx = 1  # Position to write next unique element
    
    for read_idx in range(1, len(arr)):
        # Check if current element is duplicate
        is_duplicate = False
        for check_idx in range(write_idx):
            if arr[read_idx] == arr[check_idx]:
                is_duplicate = True
                break
        
        # If not duplicate, add to result
        if not is_duplicate:
            arr[write_idx] = arr[read_idx]
            write_idx += 1
    
    return arr[:write_idx]

def solve():
    """Main solution function following template requirements"""
    # Read input
    n = int(input().strip())
    if n == 0:
        print()  # Print empty line for empty input
        return
    
    arr = list(map(int, input().strip().split()))
    
    # Use memory optimized approach
    result = solve_optimized(arr.copy())  # Copy to preserve original for testing
    
    # Output result
    print(' '.join(map(str, result)))

if __name__ == "__main__":
    solve()