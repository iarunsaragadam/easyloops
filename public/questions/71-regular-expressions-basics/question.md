# Regular Expressions Basics

## Problem Statement

Write a program that extracts email addresses from text using regular expressions. Your program should read text input and identify all valid email addresses, outputting them in the order they appear (with duplicates removed).

Email addresses follow a basic pattern:
- Local part: contains letters, numbers, dots, underscores, percent signs, plus signs, and hyphens
- @ symbol
- Domain part: contains letters, numbers, dots, and hyphens
- At least one dot in the domain
- Top-level domain: at least 2 letters

**Real-world context**: Email extraction is a common task in data processing, customer relationship management, and text analysis. Regular expressions provide an efficient way to identify patterns in text.

## Input Format

The input consists of multiple lines of text:
```
Line 1: Text content (may contain email addresses)
Line 2: Text content (may contain email addresses)
...
Line N: Text content (may contain email addresses)
```

## Output Format

Output each unique email address found in the text, one per line, in the order they first appear:
```
email1@domain.com
email2@company.org
email3@service.net
```

If no email addresses are found, produce no output.

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand regular expression syntax and patterns
- Learn to construct regex patterns for email validation
- Practice using regex matching functions
- Understand the difference between greedy and non-greedy matching
- Learn to handle edge cases in pattern matching
- Practice reading from stdin and writing formatted output
- Understand the importance of input validation in real applications

## Implementation Guidelines

### Python Example Structure:
```python
import re

def solve():
    # Read all input text
    text = input()  # Read single line, or use sys.stdin.read() for multiple lines
    
    # Define email regex pattern
    email_pattern = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
    
    # Find all matches
    emails = re.findall(email_pattern, text)
    
    # Remove duplicates while preserving order
    unique_emails = []
    seen = set()
    for email in emails:
        if email not in seen:
            seen.add(email)
            unique_emails.append(email)
    
    # Output results
    for email in unique_emails:
        print(email)
```

### Go Example Structure:
```go
import (
    "regexp"
    "fmt"
    "bufio"
    "os"
)

func solve() {
    // Read input
    scanner := bufio.NewScanner(os.Stdin)
    var text string
    for scanner.Scan() {
        text += scanner.Text() + "\n"
    }
    
    // Define email regex pattern
    emailPattern := `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}`
    re := regexp.MustCompile(emailPattern)
    
    // Find all matches and remove duplicates
    matches := re.FindAllString(text, -1)
    seen := make(map[string]bool)
    
    for _, email := range matches {
        if !seen[email] {
            seen[email] = true
            fmt.Println(email)
        }
    }
}
```

## Constraints
- Input text can contain 0 to 10,000 characters
- Number of email addresses can range from 0 to 1,000
- Email addresses follow standard format (local@domain.tld)
- Time limit: 2 seconds
- Memory limit: 256 MB
- Output must preserve the order of first appearance
- Duplicate emails should be removed

## Hints
- Start with a basic email pattern: `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}`
- Use word boundaries `\b` to ensure you match complete email addresses
- The `re.findall()` function in Python returns all matches as a list
- To remove duplicates while preserving order, use a set to track seen emails
- Test your regex pattern with various email formats to ensure it works correctly
- Consider edge cases like empty input, no emails, or malformed email addresses
- Remember that regex patterns can be complex - start simple and refine as needed
