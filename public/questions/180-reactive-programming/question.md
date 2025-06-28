# Reactive Programming: Financial Event Stream Processor

## Problem Statement

Build a reactive event stream processor for financial market data that demonstrates core reactive programming concepts. Your system must process a continuous stream of market events and apply reactive operators (filter, map, aggregate) to produce real-time insights.

You need to implement a reactive system that:

1. **Filters** events based on volume thresholds (ignore low-volume trades)
2. **Maps/Transforms** events to include derived data (market value calculations)  
3. **Aggregates** events within configurable time windows
4. **Emits** results when time windows complete

The system processes market events containing timestamps, stock symbols, prices, volumes, and trade types (BUY/SELL). It groups events into time windows and calculates aggregated metrics for each symbol within each window.

## Input Format

The input consists of multiple lines:
```
Line 1: N (number of market events, 1 ≤ N ≤ 1000)
Line 2: W (time window size in seconds, 1 ≤ W ≤ 100)
Line 3: T (minimum volume threshold for filtering, 0 ≤ T ≤ 1000)
Next N lines: Each contains a market event in format:
    timestamp symbol price volume type
    - timestamp: integer (0 ≤ timestamp ≤ 10000)
    - symbol: string (stock symbol, e.g., "AAPL", "GOOGL")
    - price: float (stock price, 0.01 ≤ price ≤ 10000.00)
    - volume: integer (trade volume, 1 ≤ volume ≤ 10000)
    - type: string ("BUY" or "SELL")
```

## Test Cases
**Input (`input.txt`):**
```
6
10
50
0 AAPL 150.25 100 BUY
5 AAPL 150.50 75 SELL
12 AAPL 151.00 120 BUY
15 GOOGL 2800.00 60 BUY
25 GOOGL 2805.50 90 SELL
30 AAPL 152.00 110 BUY
```

**Expected Output (`expected.txt`):**
```
AAPL 0-9 150.36 175 2 1:1
AAPL 10-19 151.0 120 1 1:0
AAPL 30-39 152.0 110 1 1:0
GOOGL 10-19 2800.0 60 1 1:0
GOOGL 20-29 2805.5 90 1 0:1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand reactive programming paradigms and event-driven architecture
- Implement reactive operators: filter, map, aggregate, and emit
- Learn time-based windowing for stream processing
- Practice building data pipelines with transformations
- Understand Observer pattern and event stream processing
- Learn to handle real-time data aggregation and state management

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    from collections import defaultdict
    
    # Read configuration
    n = int(input())
    window_size = int(input())
    volume_threshold = int(input())
    
    # Reactive data structures
    aggregations = defaultdict(lambda: {
        'price_sum': 0.0,
        'volume_sum': 0,
        'event_count': 0,
        'buy_count': 0
    })
    
    # Process events reactively
    for _ in range(n):
        # Parse event
        line = input().strip().split()
        timestamp, symbol, price, volume, trade_type = line
        timestamp, price, volume = int(timestamp), float(price), int(volume)
        
        # Reactive operator: Filter
        if volume < volume_threshold:
            continue
            
        # Reactive operator: Map & Aggregate
        window_key = timestamp // window_size
        key = (symbol, window_key)
        
        # Update aggregations
        # ... implement aggregation logic
        
    # Reactive operator: Emit results
    # ... implement output logic
```

### Go Example Structure:
```go
func solve() {
    var n, windowSize, volumeThreshold int
    fmt.Scanf("%d", &n)
    fmt.Scanf("%d", &windowSize)
    fmt.Scanf("%d", &volumeThreshold)
    
    // Create maps for reactive aggregation
    aggregations := make(map[string]map[int]*WindowData)
    
    // Process events reactively
    for i := 0; i < n; i++ {
        var timestamp, volume int
        var symbol, tradeType string
        var price float64
        
        fmt.Scanf("%d %s %f %d %s", &timestamp, &symbol, &price, &volume, &tradeType)
        
        // Reactive operators: filter, map, aggregate
        if volume < volumeThreshold {
            continue
        }
        
        windowKey := timestamp / windowSize
        // ... implement aggregation logic
    }
    
    // Emit results
    // ... implement output logic
}
```

## Constraints
- Time complexity: O(N log N) for sorting results
- Space complexity: O(S × W) where S is unique symbols and W is unique time windows
- Events may arrive out of chronological order within input
- Multiple events can occur in the same time window
- Volume threshold filtering happens before aggregation
- Time windows are non-overlapping: [0-9], [10-19], [20-29], etc.
- Output must be sorted by symbol name, then by time window

## Hints
- Use time-based windowing: `window_key = timestamp // window_size`
- Filter events early to improve performance: check volume threshold first
- Use dictionaries/maps with composite keys like `(symbol, window_key)`
- Calculate volume-weighted average price: `total_value / total_volume`
- Count BUY vs SELL events separately for the ratio
- Sort results before output for consistent ordering
- Handle edge cases: empty windows, single events, all filtered events
