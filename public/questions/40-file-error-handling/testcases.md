# Test Cases for File Error Handling

## Test Case Structure
This question uses a 1-line input format containing a filename.

### Input Format Pattern:
```
Line 1: filename (string, may be empty, may not exist, may be directory)
```

### Output Format Pattern:
```
For successful file read:
Success: File read successfully
Content length: {number} characters

For empty file:
Warning: File is empty

For file not found:
Error: File '{filename}' not found

For empty filename:
Error: Empty filename provided

For directory:
Error: '{filename}' is a directory, not a file

For permission denied:
Error: Permission denied to read '{filename}'

For other errors:
Error: Unexpected error reading '{filename}': {error_message}
```

## Test Case 1: Basic - Valid File
**Input (`input.txt`):**
```
valid_test_file.txt
```
**Expected Output (`expected.txt`):**
```
Success: File read successfully
Content length: 42 characters
```

## Test Case 2: Edge - File Not Found
**Input (`input2.txt`):**
```
nonexistent_file.txt
```
**Expected Output (`expected2.txt`):**
```
Error: File 'nonexistent_file.txt' not found
```

## Test Case 3: Edge - Empty File
**Input (`input3.txt`):**
```
empty_test_file.txt
```
**Expected Output (`expected3.txt`):**
```
Warning: File is empty
```

## Additional Test Case Categories

### Edge Cases:
1. **Empty Filename**: Input is empty string
2. **Directory Instead of File**: Filename points to a directory
3. **File with Special Characters**: Filename contains spaces, unicode, etc.
4. **Very Long Filename**: Test filename length limits
5. **Relative vs Absolute Paths**: Different path formats

### Error Handling Cases:
1. **Permission Denied**: File exists but no read permission
2. **Binary File**: Attempt to read binary file as text
3. **Corrupted File**: File with encoding issues
4. **Network Path**: File on unavailable network location
5. **Symbolic Link**: Broken symbolic links

### Performance Cases:
1. **Large File**: Test with file containing thousands of characters
2. **Multiple Operations**: Sequential file operations
3. **Memory Constraints**: Files that test memory limits

## Test Case Creation Rules

### Input Validation Rules:
1. Accept any string as filename (including empty)
2. No preprocessing of the filename input
3. Handle all characters including special ones
4. Test both existing and non-existing files

### Output Format Rules:
1. Always start with "Success:", "Warning:", or "Error:"
2. Include the problematic filename in error messages (in quotes)
3. For success cases, always show content length
4. Use consistent error message format
5. No trailing spaces or extra newlines

### File Preparation for Tests:
1. Create actual files for positive test cases
2. Ensure test files have known, consistent content
3. Test files should have realistic content lengths
4. Create directory structures for testing directory errors
5. Use meaningful filenames that indicate test purpose

## Language-Specific Considerations

### Python Considerations:
- Use `with open()` for proper file handling
- Handle specific exception types: `FileNotFoundError`, `PermissionError`, `IsADirectoryError`
- Use `UnicodeDecodeError` for encoding issues
- Consider `EOFError` for input handling
- Test with both relative and absolute paths

### Go Considerations:
- Use `ioutil.ReadFile()` or `os.Open()` for file operations
- Handle errors with `os.IsNotExist()`, `os.IsPermission()`
- Consider `filepath.Join()` for path handling
- Use appropriate error checking patterns
- Handle different operating system path formats

### JavaScript/Node.js Considerations:
- Use `fs.readFileSync()` with try-catch for synchronous operations
- Handle `ENOENT`, `EACCES`, `EISDIR` error codes
- Consider `fs.promises` for async operations if needed
- Test with different encoding specifications

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] All error messages start with "Error:" or "Warning:"
- [ ] Success messages start with "Success:"
- [ ] File names are quoted in error messages
- [ ] Content length is shown for successful reads
- [ ] Test files exist and have expected content
- [ ] Edge cases cover all common error scenarios
- [ ] Performance tests include large files
- [ ] Cross-platform compatibility considered

## Automated Test Case Generation

```python
def generate_test_case(case_type="basic"):
    """Generate test cases for file error handling"""
    import os
    import tempfile
    
    if case_type == "basic":
        # Create a test file with known content
        content = "This is a test file for file error handling.\nIt has exactly 42 characters of content."
        filename = "valid_test_file.txt"
        return filename, content, f"Success: File read successfully\nContent length: {len(content)} characters"
    
    elif case_type == "not_found":
        filename = "nonexistent_file.txt"
        return filename, None, f"Error: File '{filename}' not found"
    
    elif case_type == "empty":
        filename = "empty_test_file.txt"
        return filename, "", "Warning: File is empty"
    
    elif case_type == "empty_filename":
        return "", None, "Error: Empty filename provided"
    
    elif case_type == "directory":
        dirname = "test_directory"
        return dirname, None, f"Error: '{dirname}' is a directory, not a file"

def validate_test_case(input_content, expected_content):
    """Validate test case format and content"""
    lines = input_content.strip().split('\n')
    
    # Should have exactly one line
    assert len(lines) == 1, "Input should have exactly one line"
    
    # Expected output should start with Success, Warning, or Error
    expected_lines = expected_content.strip().split('\n')
    first_line = expected_lines[0]
    assert any(first_line.startswith(prefix) for prefix in ["Success:", "Warning:", "Error:"]), \
           "Output should start with Success:, Warning:, or Error:"
    
    return True

def create_test_files():
    """Create the actual test files needed for test cases"""
    import os
    
    # Create basic test file
    with open("valid_test_file.txt", "w") as f:
        f.write("This is a test file for file error handling.\nIt has exactly 42 characters of content.")
    
    # Create empty test file
    with open("empty_test_file.txt", "w") as f:
        pass  # Empty file
    
    # Create test directory
    os.makedirs("test_directory", exist_ok=True)
    
    print("Test files created successfully")
```

## Test Case Quality Metrics
- **Coverage**: Test all major error conditions and success scenarios
- **Realism**: Use realistic filenames and content
- **Consistency**: Maintain consistent output format across all cases
- **Educational Value**: Each test case should teach specific error handling concepts
- **Cross-Platform**: Tests should work on different operating systems
