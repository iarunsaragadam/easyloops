# Text parsing

## Problem Statement

Write a program that analyzes server log files and provides a comprehensive summary of log entries. Your program should parse log entries in a standard format, categorize them by severity level, identify error conditions, and provide time-based analysis.

**Log Entry Format:**
Each log entry follows this pattern:
```
[YYYY-MM-DD HH:MM:SS] LEVEL: message
```

Where:
- `YYYY-MM-DD HH:MM:SS` is the timestamp in 24-hour format
- `LEVEL` is one of: DEBUG, INFO, WARN, ERROR
- `message` is the log message content

**Your program should:**

1. **Parse and validate** all log entries from input
2. **Count occurrences** of each log level (DEBUG, INFO, WARN, ERROR)
3. **Extract ERROR entries** with their timestamps and messages
4. **Analyze time span** of the log entries (first entry, last entry, total count)

**Output Requirements:**
1. Print "LOG LEVEL SUMMARY:" followed by counts for each level (sorted alphabetically)
2. If ERROR entries exist, print "ERROR ENTRIES:" followed by chronologically sorted error details
3. Print "TIME SPAN ANALYSIS:" with first entry time, last entry time, and total entry count
4. Handle invalid log entries gracefully (ignore malformed lines)

## Input Format

The input consists of multiple lines, each potentially containing a log entry:
```
Line 1: [YYYY-MM-DD HH:MM:SS] LEVEL: message
Line 2: [YYYY-MM-DD HH:MM:SS] LEVEL: message
...
Line N: [YYYY-MM-DD HH:MM:SS] LEVEL: message
```

## Test Cases
**Input (`input.txt`):**
```
[2023-12-01 09:00:00] INFO: Application started
[2023-12-01 09:00:05] DEBUG: Loading configuration file
[2023-12-01 09:00:10] INFO: Database connection established
[2023-12-01 09:01:00] WARN: High memory usage detected
[2023-12-01 09:01:30] ERROR: Failed to process user request
[2023-12-01 09:02:00] INFO: Processing batch job
[2023-12-01 09:02:15] ERROR: Database timeout occurred
[2023-12-01 09:03:00] INFO: Batch job completed successfully
```

**Expected Output (`expected.txt`):**
```
LOG LEVEL SUMMARY:
DEBUG: 1
ERROR: 2
INFO: 4
WARN: 1

ERROR ENTRIES:
[2023-12-01 09:01:30] Failed to process user request
[2023-12-01 09:02:15] Database timeout occurred

TIME SPAN ANALYSIS:
First entry: 2023-12-01 09:00:00
Last entry: 2023-12-01 09:03:00
Total entries: 8
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice regular expression pattern matching for structured text
- Learn to parse and validate timestamp formats
- Understand text processing with multiple data extraction steps
- Implement error handling for malformed input data
- Work with date/time manipulation and sorting
- Practice dictionary/map operations for counting and grouping
- Learn to format output according to specific requirements

## Implementation Guidelines

### Python Example Structure:
```python
import sys
import re
from datetime import datetime
from collections import defaultdict

def parse_log_entry(line):
    # Parse log entry using regex
    # Return (timestamp, level, message) or None if invalid
    pass

def solve():
    lines = []
    for line in sys.stdin:
        lines.append(line.strip())
    
    # Parse entries, count levels, extract errors, analyze time span
    # Format and print required output
    pass
```

### Go Example Structure:
```go
import (
    "bufio"
    "fmt"
    "os"
    "regexp"
    "sort"
    "strings"
    "time"
)

func parseLogEntry(line string) (time.Time, string, string, bool) {
    // Parse log entry using regex
    // Return timestamp, level, message, success
}

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    // Read input, parse entries, generate summary
}
```

## Constraints
- Input may contain 1 to 10,000 log entries
- Each log entry line is at most 1000 characters
- Timestamps are in YYYY-MM-DD HH:MM:SS format (24-hour)
- Log levels are case-insensitive in input but output as uppercase
- Invalid/malformed log entries should be ignored
- Output format must match exactly (spacing, order, formatting)
- Time complexity should be O(n log n) due to sorting requirements
- Memory usage should be reasonable for processing large log files

## Hints
- Use regular expressions to parse the log entry format reliably
- The pattern `^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+): (.+)$` can help extract components
- Consider using language-specific date/time parsing libraries for timestamp handling
- Dictionary/HashMap structures are ideal for counting log levels
- Remember to sort ERROR entries chronologically and level counts alphabetically
- Handle edge cases: empty input, single entry, no errors, malformed timestamps
- Test with various combinations of log levels and time ranges
