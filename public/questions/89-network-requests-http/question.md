# Network Requests (HTTP) - Response Parser

## Problem Statement

You are tasked with creating an HTTP response parser that extracts key information from HTTP response data. Given raw HTTP response text (including status line, headers, and body), your program should parse and analyze the response to extract structured information.

This problem simulates real-world scenarios where applications need to process HTTP responses from web servers, APIs, or other network services. Understanding HTTP response structure is crucial for web development, API integration, and network programming.

Your parser should handle various HTTP response formats and extract information such as:
- HTTP version and status information
- Response headers and their count
- Content type and server information
- Body content metrics
- Status code categorization

## Input Format

The input consists of multiple lines representing a complete HTTP response:

```
Line 1: HTTP status line (e.g., "HTTP/1.1 200 OK")
Lines 2-N: HTTP headers (e.g., "Content-Type: text/html")
Line N+1: Empty line (separates headers from body)
Lines N+2-M: Response body content (optional)
```

**Example Input:**
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 13
Server: nginx/1.18.0

Hello, World!
```

## Output Format

Output should be key-value pairs (one per line) containing extracted information, sorted alphabetically by key:

```
body_length=<number of characters in body>
body_lines=<number of lines in body>
content_length=<value of Content-Length header if present>
content_type=<value of Content-Type header if present>
header_count=<total number of headers>
http_version=<HTTP version from status line>
server=<value of Server header if present>
status_category=<category based on status code>
status_code=<HTTP status code>
status_message=<HTTP status message>
```

**Status Categories:**
- 100-199: "Informational"
- 200-299: "Success"
- 300-399: "Redirection"
- 400-499: "Client Error"
- 500-599: "Server Error"
- Others: "Unknown"

## Test Cases
**Input (`input1.txt`):**
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 13
Server: nginx/1.18.0

Hello, World!
```

**Expected Output (`expected1.txt`):**
```
body_length=13
body_lines=1
content_length=13
content_type=text/html
header_count=3
http_version=1.1
server=nginx/1.18.0
status_category=Success
status_code=200
status_message=OK
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand HTTP response structure and components
- Learn to parse structured text data
- Practice string manipulation and regular expressions
- Implement data extraction from formatted input
- Handle edge cases in network data processing
- Categorize HTTP status codes programmatically

## Implementation Guidelines

### Key Components to Extract:
1. **Status Line Parsing**: Extract HTTP version, status code, and message
2. **Header Processing**: Parse key-value pairs, handle case-insensitive keys
3. **Body Analysis**: Count lines and characters in response body
4. **Data Validation**: Handle malformed or incomplete responses
5. **Output Formatting**: Generate sorted key-value pairs

### Python Example Structure:
```python
def solve():
    lines = []
    try:
        while True:
            lines.append(input())
    except EOFError:
        pass
    
    # Parse status line
    # Extract headers
    # Analyze body
    # Generate sorted output
```

### Go Example Structure:
```go
import (
    "bufio"
    "fmt"
    "os"
    "sort"
    "strings"
)

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    var lines []string
    
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }
    
    // Parse HTTP response
    // Extract information
    // Output sorted results
}
```

### Algorithm Approach:
1. Read all input lines into a list/array
2. Parse the first line as HTTP status using regex or string splitting
3. Iterate through subsequent lines to extract headers until empty line
4. Treat remaining lines as body content
5. Extract specific headers (Content-Type, Content-Length, Server)
6. Calculate body metrics (length, line count)
7. Categorize status code based on numerical ranges
8. Output all extracted information in sorted order

## Constraints
- Input will always contain at least one line (status line)
- HTTP version format: "HTTP/X.Y" where X and Y are digits
- Status codes are 3-digit integers (100-599)
- Header names are case-insensitive for matching
- Headers follow "Name: Value" format
- Empty line separates headers from body (if body exists)
- Body content can contain any characters including empty lines
- Maximum response size: 10,000 lines
- Maximum header count: 100 headers
- Output keys must be sorted alphabetically

## Hints
- **Start Simple**: Parse the status line first using string splitting or regex
- **Use Dictionaries**: Store headers in a key-value structure for easy lookup
- **Handle Edge Cases**: Check for missing headers, empty body, malformed status
- **Regular Expressions**: Use regex for robust status line parsing: `HTTP/(\d+\.\d+)\s+(\d+)\s+(.*)`
- **Case Insensitive**: Convert header names to lowercase for consistent matching
- **Body Detection**: Empty line indicates start of body content
- **Status Categories**: Use integer division or ranges to categorize status codes
- **Sorted Output**: Use built-in sorting functions to order output keys
- **Error Handling**: Return appropriate error information for malformed input
