# Test Cases for Network Requests (HTTP) - Response Parser

## Test Case Structure
This question uses a multi-line input format representing HTTP response data.

### Input Format Pattern:
```
Line 1: HTTP status line (HTTP/version statusCode statusMessage)
Lines 2-N: HTTP headers (HeaderName: HeaderValue)
Line N+1: Empty line (optional, separates headers from body)
Lines N+2-M: Response body content (optional)
```

### Output Format Pattern:
```
key1=value1
key2=value2
...
keyN=valueN
```
*Note: Output keys are sorted alphabetically*

## Test Case Categories (100+ Total Cases)

### Basic Test Cases (Cases 1-25): Simple HTTP Responses
- Standard 200 OK responses with common headers
- Basic status codes (200, 404, 500)
- Simple content types (text/html, text/plain, application/json)
- Minimal headers and short body content

### Edge Cases (Cases 26-50): Boundary Conditions
- Responses with no body content
- Responses with only status line
- Empty headers
- Maximum number of headers (100)
- Very long header values
- Special characters in headers and body
- HTTP/1.0 vs HTTP/1.1 vs HTTP/2.0

### Performance Test Cases (Cases 51-75): Large Data
- Large response bodies (1000+ lines)
- Many headers (50+ headers)
- Long header values (1000+ characters)
- Complex nested content
- Responses that would timeout O(n²) parsing algorithms

### Complex Scenarios (Cases 76-90): Multiple Edge Cases
- All HTTP status code categories (1xx, 2xx, 3xx, 4xx, 5xx)
- Mixed case headers
- Headers with special characters
- International characters in body
- Multiple content types
- Custom server headers

### Corner Cases (Cases 91-100+): Unusual but Valid
- Non-standard but valid HTTP versions
- Uncommon status codes (206, 418, 429)
- Headers with colons in values
- Body content with HTTP-like formatting
- Responses with unusual but valid header combinations

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be valid HTTP status line format
2. Headers must follow "Name: Value" format
3. Empty line separates headers from body (if body exists)
4. HTTP version must be in format "HTTP/X.Y"
5. Status code must be 3-digit number (100-599)
6. Header names can contain letters, numbers, hyphens
7. Body can contain any characters including newlines

### Output Format Rules:
1. Each line contains exactly one "key=value" pair
2. Keys are sorted alphabetically
3. No spaces around the "=" sign
4. Values are exact matches (no extra whitespace)
5. Missing optional fields are not included in output
6. Required fields: status_code, status_message, status_category, http_version, header_count, body_length, body_lines

## Language-Specific Considerations

### Python Considerations:
- Use `input()` to read lines until EOF
- Handle EOFError for end of input
- Use `str.strip()` to remove whitespace
- Use `str.lower()` for case-insensitive header matching
- Use `sorted()` for output ordering
- Regular expressions for status line parsing

### Go Considerations:
- Use `bufio.Scanner` to read lines
- Handle scanner errors appropriately
- Use `strings.TrimSpace()` for whitespace removal
- Use `strings.ToLower()` for case-insensitive matching
- Use `sort.Strings()` for output ordering
- Use `regexp` package for pattern matching

### JavaScript Considerations:
- Use `process.stdin` for input reading
- Handle line-by-line input processing
- Use `trim()` for whitespace removal
- Use `toLowerCase()` for case-insensitive matching
- Use `sort()` for output ordering
- Use regular expressions for parsing

## Validation Checklist
- [ ] Input contains valid HTTP status line as first line
- [ ] Headers follow proper "Name: Value" format
- [ ] Empty line properly separates headers from body (when body exists)
- [ ] Output contains all required fields
- [ ] Output keys are sorted alphabetically
- [ ] Status category matches status code range
- [ ] Header count matches actual number of headers
- [ ] Body metrics are accurate
- [ ] No trailing whitespace in output
- [ ] Test case covers intended scenario type

## Automated Test Case Generation

```python
import random
import string

def generate_basic_test_case(case_num):
    """Generate a basic HTTP response test case."""
    status_codes = [(200, "OK"), (404, "Not Found"), (500, "Internal Server Error")]
    content_types = ["text/html", "text/plain", "application/json"]
    servers = ["nginx/1.18.0", "Apache/2.4.41", "IIS/10.0"]
    
    status_code, status_msg = random.choice(status_codes)
    content_type = random.choice(content_types)
    server = random.choice(servers)
    
    body = f"Test response body {case_num}"
    
    input_lines = [
        f"HTTP/1.1 {status_code} {status_msg}",
        f"Content-Type: {content_type}",
        f"Content-Length: {len(body)}",
        f"Server: {server}",
        "",
        body
    ]
    
    return "\n".join(input_lines)

def generate_edge_test_case(case_num):
    """Generate an edge case HTTP response."""
    if case_num % 4 == 0:
        # No body case
        return "HTTP/1.1 204 No Content\nContent-Type: text/plain\n"
    elif case_num % 4 == 1:
        # Only status line
        return "HTTP/1.0 200 OK"
    elif case_num % 4 == 2:
        # Many headers
        headers = [f"Custom-Header-{i}: value{i}" for i in range(20)]
        return "HTTP/1.1 200 OK\n" + "\n".join(headers) + "\n\nBody content"
    else:
        # Special characters
        return "HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\n\n<html>Special: àáâãäå</html>"

def generate_performance_test_case(case_num):
    """Generate a performance test case with large data."""
    large_body = "\n".join([f"Line {i} with content" for i in range(1000)])
    many_headers = [f"Header-{i}: Value-{i}-{'x' * 100}" for i in range(50)]
    
    input_lines = [
        "HTTP/1.1 200 OK",
        *many_headers,
        "",
        large_body
    ]
    
    return "\n".join(input_lines)

def validate_test_case(input_content, expected_content):
    """Validate that a test case is well-formed."""
    lines = input_content.strip().split('\n')
    
    # Check status line
    if not lines or not lines[0].startswith('HTTP/'):
        return False, "Invalid or missing status line"
    
    # Check expected output format
    expected_lines = expected_content.strip().split('\n')
    for line in expected_lines:
        if '=' not in line:
            return False, f"Invalid output format: {line}"
    
    # Check sorted order
    keys = [line.split('=')[0] for line in expected_lines]
    if keys != sorted(keys):
        return False, "Output keys not sorted alphabetically"
    
    return True, "Valid test case"

def get_status_category(status_code):
    """Get status category for a given status code."""
    if 100 <= status_code < 200:
        return "Informational"
    elif 200 <= status_code < 300:
        return "Success"
    elif 300 <= status_code < 400:
        return "Redirection"
    elif 400 <= status_code < 500:
        return "Client Error"
    elif 500 <= status_code < 600:
        return "Server Error"
    else:
        return "Unknown"
```

## Test Case Quality Standards
- Each test case must have a clear purpose and test specific functionality
- Input data should be realistic and represent actual HTTP responses
- Edge cases should test boundary conditions without being artificially complex
- Performance cases should stress string processing and parsing efficiency
- Expected outputs must be generated from working reference solution
- Test cases should cover all status code categories and common headers
- Cases should progressively increase in complexity
- All test cases must pass validation checklist
- Input/output files must be properly formatted and consistent
