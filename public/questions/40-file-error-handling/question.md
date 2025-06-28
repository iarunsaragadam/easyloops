# File Error Handling

## Problem Statement

Write a program that demonstrates robust file error handling. Your program should read a filename from standard input and attempt to read the file, gracefully handling various error conditions that can occur during file operations.

Your program should:

1. **Read a filename** from standard input
2. **Attempt to open and read the file** using proper error handling
3. **Handle different types of errors** gracefully:
   - File not found
   - Empty filename
   - Directory instead of file
   - Permission denied
   - Empty file (warning, not error)
   - Any other unexpected errors
4. **Provide meaningful error messages** that indicate the specific problem
5. **For successful reads**, confirm success and show the content length

This problem teaches essential skills for real-world programming where file operations often fail and must be handled gracefully.

## Input Format

The input consists of 1 line:
```
Line 1: filename (string, may be empty, may not exist, may be directory)
```

## Test Cases
**Input (`input.txt`):**
```
valid_test_file.txt
```

**Expected Output (`expected.txt`):**
```
Success: File read successfully
Content length: 42 characters
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand different types of file I/O errors and how to handle them
- Learn to use try-catch blocks for exception handling
- Practice providing meaningful error messages to users
- Understand the difference between errors and warnings
- Learn defensive programming practices for file operations
- Gain experience with real-world error scenarios

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    try:
        filename = input().strip()
        
        # Handle empty filename
        if not filename:
            print("Error: Empty filename provided")
            return
            
        # Attempt to read file with error handling
        try:
            with open(filename, 'r') as file:
                content = file.read()
                
            # Handle empty file (warning, not error)
            if not content:
                print("Warning: File is empty")
            else:
                print("Success: File read successfully")
                print(f"Content length: {len(content)} characters")
                
        except FileNotFoundError:
            print(f"Error: File '{filename}' not found")
        except PermissionError:
            print(f"Error: Permission denied to read '{filename}'")
        except IsADirectoryError:
            print(f"Error: '{filename}' is a directory, not a file")
        except Exception as e:
            print(f"Error: Unexpected error reading '{filename}': {str(e)}")
            
    except EOFError:
        print("Error: No input provided")
```

### Go Example Structure:
```go
func solve() {
    scanner.Scan()
    filename := scanner.Text()
    
    // Handle empty filename
    if filename == "" {
        fmt.Println("Error: Empty filename provided")
        return
    }
    
    // Attempt to read file
    content, err := ioutil.ReadFile(filename)
    if err != nil {
        if os.IsNotExist(err) {
            fmt.Printf("Error: File '%s' not found\n", filename)
        } else if os.IsPermission(err) {
            fmt.Printf("Error: Permission denied to read '%s'\n", filename)
        } else {
            fmt.Printf("Error: Unexpected error reading '%s': %v\n", filename, err)
        }
        return
    }
    
    if len(content) == 0 {
        fmt.Println("Warning: File is empty")
    } else {
        fmt.Println("Success: File read successfully")
        fmt.Printf("Content length: %d characters\n", len(content))
    }
}
```

## Constraints
- Filename can be any valid string (including empty string)
- Files may or may not exist
- Files may have different permission settings
- Handle all common file I/O error scenarios
- Error messages should be descriptive and user-friendly
- Program should not crash on any input

## Hints
- Use try-catch blocks (or equivalent error handling) for file operations
- Check for empty filename before attempting to open the file
- Different programming languages have different ways to detect specific error types
- Remember that an empty file is usually a warning, not an error
- Consider what happens if the user provides no input at all
- Test your solution with various edge cases: non-existent files, directories, empty filenames
