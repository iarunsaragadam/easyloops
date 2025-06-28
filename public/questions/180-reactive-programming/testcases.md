# Test Cases for Reactive Programming: Financial Event Stream Processor

## Test Case Structure

This question uses a **multi-line input format** for processing financial market event streams with reactive programming concepts.

### Input Format Pattern:
```
Line 1: N (number of events, 1 ≤ N ≤ 1000)
Line 2: W (time window size, 1 ≤ W ≤ 100)
Line 3: T (volume threshold, 0 ≤ T ≤ 1000)
Next N lines: timestamp symbol price volume type
    - timestamp: integer (0 ≤ timestamp ≤ 10000)
    - symbol: string (stock symbol like "AAPL", "GOOGL")
    - price: float (0.01 ≤ price ≤ 10000.00)
    - volume: integer (1 ≤ volume ≤ 10000)
    - type: "BUY" or "SELL"
```

### Output Format Pattern:
```
For each non-empty time window, sorted by symbol then window:
symbol window_start-window_end avg_price total_volume event_count buy:sell_ratio
```

## Test Case 1: Basic Reactive Processing
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

**Description:** Tests basic reactive operators including filtering (volume ≥ 50), windowing (10-second windows), and aggregation across different symbols and time periods.

## Test Case 2: Edge Cases and Filtering
**Input (`input2.txt`):**
```
4
5
100
0 MSFT 300.00 50 BUY
1 MSFT 299.50 200 SELL
10 TSLA 800.00 150 BUY
15 TSLA 805.25 120 SELL
```
**Expected Output (`expected2.txt`):**
```
MSFT 0-4 299.5 200 1 0:1
TSLA 10-14 800.0 150 1 1:0
TSLA 15-19 805.25 120 1 0:1
```

**Description:** Tests edge cases including events filtered out by volume threshold (MSFT first event), small time windows, and events in different windows for the same symbol.

## Test Case 3: Performance and Complex Aggregation
**Input (`input3.txt`):**
```
20
20
25
0 AAPL 150.00 30 BUY
2 AAPL 150.25 40 SELL
5 GOOGL 2800.00 50 BUY
8 MSFT 300.00 35 SELL
10 AAPL 151.00 45 BUY
12 GOOGL 2805.00 60 SELL
15 TSLA 800.00 70 BUY
18 MSFT 301.00 80 BUY
20 AAPL 152.00 90 SELL
22 GOOGL 2810.00 100 BUY
25 TSLA 805.00 110 SELL
28 MSFT 302.00 120 SELL
30 AAPL 153.00 130 BUY
32 GOOGL 2815.00 140 BUY
35 TSLA 810.00 150 BUY
38 MSFT 303.00 160 SELL
40 AAPL 154.00 170 SELL
42 GOOGL 2820.00 180 SELL
45 TSLA 815.00 190 BUY
48 MSFT 304.00 200 BUY
```
**Expected Output (`expected3.txt`):**
```
AAPL 0-19 150.48 115 3 2:1
AAPL 20-39 152.59 220 2 1:1
AAPL 40-59 154.0 170 1 0:1
GOOGL 0-19 2802.73 110 2 1:1
GOOGL 20-39 2812.92 240 2 2:0
GOOGL 40-59 2820.0 180 1 0:1
MSFT 0-19 300.7 115 2 1:1
MSFT 20-39 302.57 280 2 0:2
MSFT 40-59 304.0 200 1 1:0
TSLA 0-19 800.0 70 1 1:0
TSLA 20-39 807.88 260 2 1:1
TSLA 40-59 815.0 190 1 1:0
```

**Description:** Tests performance with 20 events across 4 symbols, multiple time windows, and complex aggregation patterns. Validates volume-weighted average price calculations and buy/sell ratio tracking.

## Test Case Creation Rules

### Input Validation Rules:
1. **Event count (N):** Must be positive integer ≤ 1000
2. **Window size (W):** Must be positive integer ≤ 100  
3. **Volume threshold (T):** Must be non-negative integer ≤ 1000
4. **Timestamps:** Must be non-negative integers in any order
5. **Symbols:** Must be valid stock symbols (alphanumeric strings)
6. **Prices:** Must be positive floats with reasonable precision
7. **Volumes:** Must be positive integers
8. **Trade types:** Must be exactly "BUY" or "SELL"

### Output Format Rules:
1. **Sorting:** Results sorted by symbol (alphabetically), then by window start time
2. **Window format:** "start-end" where end = start + window_size - 1
3. **Average price:** Volume-weighted average, rounded to reasonable precision
4. **Total volume:** Sum of all volumes in the window
5. **Event count:** Number of events in the window after filtering
6. **Buy/sell ratio:** Format "buy_count:sell_count"
7. **Empty windows:** Not included in output
8. **Filtered events:** Not counted in any aggregations

## Language-Specific Considerations

### Python Considerations:
- Use `defaultdict` for efficient aggregation data structures
- Handle floating-point precision in price calculations  
- Use `collections.defaultdict(lambda: {...})` for nested structures
- Sort results using `sorted()` with custom key functions
- Parse input carefully: `timestamp, symbol, price, volume, trade_type = line.split()`

### Go Considerations:
- Use `map[string]map[int]*WindowData` for nested aggregation structures
- Handle floating-point formatting with appropriate precision
- Use `sort.Slice()` for custom sorting of results
- Parse input with `fmt.Scanf()` for structured reading
- Create custom structs for window aggregation data

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has correct number of lines (3 + N lines)
- [ ] All parameters are within specified ranges
- [ ] Event timestamps can be in any order
- [ ] Volume threshold filters work correctly
- [ ] Time windows are calculated as: `window_key = timestamp / window_size`
- [ ] Average prices are volume-weighted: `sum(price * volume) / sum(volume)`
- [ ] Results are sorted by symbol then window
- [ ] Buy/sell ratios are correctly calculated
- [ ] Empty windows are excluded from output
- [ ] Output format matches exactly

## Automated Test Case Generation

```python
import random

def generate_test_case(num_events=10, window_size=10, volume_threshold=50):
    symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]
    trade_types = ["BUY", "SELL"]
    
    events = []
    for i in range(num_events):
        timestamp = random.randint(0, 100)
        symbol = random.choice(symbols)
        price = round(random.uniform(100.0, 3000.0), 2)
        volume = random.randint(25, 200)  # Some below threshold
        trade_type = random.choice(trade_types)
        events.append(f"{timestamp} {symbol} {price} {volume} {trade_type}")
    
    input_content = f"{num_events}\n{window_size}\n{volume_threshold}\n"
    input_content += "\n".join(events) + "\n"
    
    return input_content

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split('\n')
    if len(lines) < 3:
        return False, "Input must have at least 3 lines"
    
    try:
        n = int(lines[0])
        window_size = int(lines[1])
        volume_threshold = int(lines[2])
        
        if len(lines) != 3 + n:
            return False, f"Expected {3 + n} lines, got {len(lines)}"
            
        # Validate each event line
        for i in range(3, 3 + n):
            parts = lines[i].split()
            if len(parts) != 5:
                return False, f"Event line {i} must have 5 parts"
            
            timestamp = int(parts[0])
            symbol = parts[1]
            price = float(parts[2])
            volume = int(parts[3])
            trade_type = parts[4]
            
            if timestamp < 0:
                return False, f"Timestamp must be non-negative"
            if price <= 0:
                return False, f"Price must be positive"
            if volume <= 0:
                return False, f"Volume must be positive"
            if trade_type not in ["BUY", "SELL"]:
                return False, f"Trade type must be BUY or SELL"
                
        return True, "Valid test case"
        
    except ValueError as e:
        return False, f"Parse error: {e}"
```

## Performance Considerations

### Algorithm Complexity:
- **Time:** O(N + R log R) where N = events, R = result windows
- **Space:** O(S × W) where S = unique symbols, W = unique windows
- **Filtering:** O(N) - each event checked once
- **Aggregation:** O(N) - each event processed once  
- **Sorting:** O(R log R) - results sorted by symbol and window

### Optimization Opportunities:
- Early filtering reduces memory usage
- Use efficient data structures for aggregation
- Minimize string operations in inner loops
- Consider streaming processing for very large inputs

## Educational Value Assessment

This test case design teaches:

1. **Reactive Patterns:** Filter → Map → Aggregate → Emit pipeline
2. **Event Stream Processing:** Time-based windowing and aggregation
3. **Data Structures:** Efficient use of maps/dictionaries for grouping
4. **Algorithm Design:** Combining multiple operations efficiently  
5. **Real-world Application:** Financial data processing concepts
6. **Performance Awareness:** Understanding time/space complexity trade-offs
