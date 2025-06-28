# Test Cases for Regular Expressions Basics

## Test Case Structure
This question uses a multi-line input format where the program reads all text from stdin and extracts email addresses.

### Input Format Pattern:
```
Line 1: Text content (may contain email addresses)
Line 2: Text content (may contain email addresses)
...
Line N: Text content (may contain email addresses)
```

### Output Format Pattern:
```
email1@domain.com
email2@company.org
email3@service.net
```

## Test Case 1: Basic Email Extraction
**Purpose**: Test basic email pattern recognition
**Input (`input.txt`):**
```
Please contact us at support@example.com for technical issues.
You can also reach our sales team at sales@company.org or 
business-dev@startup.io for partnerships.
```
**Expected Output (`expected.txt`):**
```
support@example.com
sales@company.org
business-dev@startup.io
```

## Test Case 2: Edge Cases and Invalid Emails
**Purpose**: Test handling of malformed emails and edge cases
**Input (`input2.txt`):**
```
No emails here! Just random text with @ symbols and .com domains.
Some text with @ but no valid email format.
Invalid emails like @invalid.com or user@.com should be ignored.
Also ignore malformed ones like user@domain or user@domain.
```
**Expected Output (`expected2.txt`):**
```
```

## Test Case 3: Complex Scenarios with Duplicates
**Purpose**: Test duplicate removal and complex email formats
**Input (`input3.txt`):**
```
Contact admin@company.com or admin@company.com for admin issues.
Development team: dev.team@startup-inc.org, test.user+label@domain.co.uk
Sales inquiries: sales@company.com, marketing@company.com
For support, email admin@company.com again.
Complex email: user.name+tag@sub-domain.example-site.com
```
**Expected Output (`expected3.txt`):**
```
admin@company.com
dev.team@startup-inc.org
test.user+label@domain.co.uk
sales@company.com
marketing@company.com
user.name+tag@sub-domain.example-site.com
```

## Test Case Creation Rules

### Input Validation Rules:
1. Input can be empty (test for graceful handling)
2. Input can contain no email addresses
3. Input can contain malformed email-like strings (@domain.com, user@.com, user@domain)
4. Input can contain valid emails mixed with invalid ones
5. Input can contain duplicate email addresses
6. Input can span multiple lines
7. Emails can have various valid formats (dots, underscores, plus signs, hyphens)

### Output Format Rules:
1. Each email address on a separate line
2. No trailing whitespace on lines
3. No empty lines between emails
4. Preserve order of first appearance
5. Remove duplicate emails
6. No output if no valid emails found
7. Case-sensitive email addresses (don't normalize case)

### Email Pattern Requirements:
- Local part: `[A-Za-z0-9._%+-]+`
- @ symbol (required)
- Domain part: `[A-Za-z0-9.-]+`
- Dot and TLD: `\.[A-Za-z]{2,}`
- Use word boundaries to ensure complete matches

## Language-Specific Considerations

### Python Considerations:
- Use `re.findall()` for pattern matching
- Use `sys.stdin.read()` for multi-line input
- Implement duplicate removal with set tracking
- Handle empty input gracefully

### Go Considerations:
- Use `regexp.FindAllString()` for pattern matching
- Use `bufio.Scanner` for reading input
- Implement duplicate removal with map
- Handle empty input gracefully

### JavaScript Considerations:
- Use `String.match()` with global flag
- Use `readline` interface for input
- Implement duplicate removal with Set
- Handle empty input gracefully

## Performance Considerations

### Time Complexity:
- Expected: O(n) where n is the input text length
- Regular expression matching is linear for simple patterns
- Duplicate removal is O(k) where k is the number of matches

### Space Complexity:
- O(k) where k is the number of unique email addresses found
- Additional space for tracking duplicates

### Performance Test Scenarios:
1. Large text with many email addresses (1000+ emails)
2. Large text with no email addresses
3. Text with many invalid email-like patterns
4. Text with many duplicate emails

## Validation Checklist
- [ ] Input parsing handles multi-line text correctly
- [ ] Email regex pattern matches valid emails
- [ ] Email regex pattern rejects invalid formats
- [ ] Duplicate emails are removed
- [ ] Order of first appearance is preserved
- [ ] Empty input produces no output
- [ ] Invalid-only input produces no output
- [ ] Performance is acceptable for large inputs
- [ ] Output format exactly matches specification
- [ ] No trailing whitespace or empty lines

## Automated Test Case Generation
```python
import re
import random
import string

def generate_valid_email():
    """Generate a random valid email address"""
    username_len = random.randint(3, 10)
    domain_len = random.randint(3, 8)
    tld_len = random.randint(2, 4)
    
    username = ''.join(random.choices(string.ascii_lowercase + string.digits + '._+-', k=username_len))
    domain = ''.join(random.choices(string.ascii_lowercase + string.digits + '.-', k=domain_len))
    tld = ''.join(random.choices(string.ascii_lowercase, k=tld_len))
    
    return f"{username}@{domain}.{tld}"

def generate_invalid_email():
    """Generate an invalid email-like string"""
    invalid_patterns = [
        "@domain.com",
        "user@.com", 
        "user@domain",
        "user@",
        "@",
        "user.domain.com",
        "user@@domain.com"
    ]
    return random.choice(invalid_patterns)

def validate_test_case(input_content, expected_content):
    """Validate that expected output matches regex extraction"""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    emails = re.findall(email_pattern, input_content)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_emails = []
    for email in emails:
        if email not in seen:
            seen.add(email)
            unique_emails.append(email)
    
    expected_lines = expected_content.strip().split('\n') if expected_content.strip() else []
    return unique_emails == expected_lines
```

## Common Pitfalls to Avoid
1. **Incomplete regex patterns**: Ensure pattern matches all valid email formats
2. **Boundary issues**: Use word boundaries to avoid partial matches
3. **Duplicate handling**: Don't forget to remove duplicates while preserving order
4. **Input reading**: Handle multi-line input correctly
5. **Edge cases**: Test with empty input and no matches
6. **Performance**: Ensure solution is efficient for large inputs
7. **Output format**: Match exact output specification (no extra spaces/lines)
