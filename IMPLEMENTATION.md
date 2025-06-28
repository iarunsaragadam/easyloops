# Code Stub Loading Implementation

## Overview

This implementation adds functionality to the code editor to automatically load code stubs from language-specific files in question folders, with fallback to default language templates.

## Key Features

1. **Language-Specific File Loading**: The system looks for code stubs in question folders using a standardized naming convention:
   - `main.py` for Python
   - `main.go` for Go
   - `main.c` for C
   - `main.cpp` for C++
   - `main.js` for JavaScript
   - `Main.java` for Java
   - `main.rs` for Rust

2. **Fallback to Default Templates**: If no question-specific stub is found, the system loads comprehensive default templates for each language.

3. **Multi-Language Support**: Full support for all languages defined in `SUPPORTED_LANGUAGES`.

4. **Caching**: Code stubs are cached for efficient language switching.

## Implementation Details

### New Files Created

1. **`src/shared/lib/codeStubLoader.ts`**
   - Core service for loading code stubs
   - Default templates for all supported languages
   - Language file mapping configuration
   - Utility functions for checking stub availability

### Modified Files

1. **`src/features/question/hooks/useAppState.ts`**
   - Added code stub loading logic
   - Added caching mechanism
   - Added generic code setting functions

2. **`src/features/question/hooks/useQuestionState.ts`**
   - Similar updates as useAppState
   - Integrated with question loading flow

3. **`src/app/App.tsx`** and **`src/app/questions/[questionId]/QuestionPage.tsx`**
   - Updated to use new generic code handling functions
   - Removed hardcoded language-specific logic

4. **`src/app/App.test.tsx`**
   - Updated mock functions to include new signatures

## How It Works

### 1. Question Loading Flow

When a question is loaded:
1. The system loads the question metadata (description, test cases)
2. In parallel, it loads code stubs for all supported languages
3. Code stubs are cached for quick access during language switching
4. The editor is populated with the appropriate code stub

### 2. Code Stub Loading Priority

For each language, the system:
1. **First**: Tries to load from `/questions/{questionId}/main.{ext}`
2. **Second**: Falls back to the default template for that language
3. **Third**: Falls back to Python template if language not supported

### 3. Language Switching

When switching languages:
1. The system checks the cached stubs
2. If available, immediately loads the cached code
3. If not cached, loads the stub on-demand
4. Updates the editor with the new code

## Code Stub Examples

### Python Template
```python
"""
TODO: Implement your solution here.

This is the main function you need to complete.
Read input using input() and print output using print().
"""

def solve():
    # TODO: Implement your solution here
    pass

if __name__ == "__main__":
    solve()
```

### Go Template
```go
package main

import (
    "fmt"
    "os"
    "bufio"
    "strconv"
)

func solve() {
    // TODO: Implement your solution here
    scanner := bufio.NewScanner(os.Stdin)
    
    // Example: Read input and process
    // scanner.Scan()
    // line := scanner.Text()
    
    // Print your result
    // fmt.Println(result)
}

func main() {
    solve()
}
```

### C++ Template
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

void solve() {
    // TODO: Implement your solution here
    
    // Example: Read input and process
    // int n;
    // cin >> n;
    
    // Print your result
    // cout << result << endl;
}

int main() {
    solve();
    return 0;
}
```

## API Reference

### `loadCodeStub(questionId, language)`
Loads a code stub for a specific question and language.

**Parameters:**
- `questionId`: The question identifier (e.g., '01-variable-declaration')
- `language`: The programming language (e.g., 'python', 'go', 'c')

**Returns:** Promise<string> - The code stub content

### `loadAllCodeStubs(questionId)`
Loads code stubs for all supported languages for a question.

**Parameters:**
- `questionId`: The question identifier

**Returns:** Promise<Record<string, string>> - Map of language to code stub

### `getAvailableStubs(questionId)`
Checks which languages have question-specific stubs available.

**Parameters:**
- `questionId`: The question identifier

**Returns:** Promise<Record<string, boolean>> - Map of language to availability

## Usage Examples

### Basic Usage
```typescript
// Load Python stub for a question
const pythonStub = await loadCodeStub('01-variable-declaration', 'python');

// Load all stubs for a question
const allStubs = await loadAllCodeStubs('01-variable-declaration');

// Check availability
const availability = await getAvailableStubs('01-variable-declaration');
```

### Using in Components
```typescript
// In a React component
const { getCurrentCode, setCodeForLanguage } = useAppState();

// Get current code for selected language
const currentCode = getCurrentCode();

// Set code for any language
setCodeForLanguage('python', newCode);
```

## Benefits

1. **Flexible Code Management**: Supports both question-specific and default templates
2. **Multi-Language Support**: Comprehensive support for all popular programming languages
3. **Performance**: Efficient caching and parallel loading
4. **Extensibility**: Easy to add new languages or modify templates
5. **Backwards Compatibility**: Maintains existing functionality while adding new features

## Testing

The implementation includes comprehensive TypeScript type checking and maintains compatibility with the existing test suite.

## Future Enhancements

1. **Dynamic Template Loading**: Could load templates from external sources
2. **User Customization**: Allow users to customize default templates
3. **Template Versioning**: Support multiple template versions
4. **AI-Generated Stubs**: Integration with AI to generate question-specific stubs
5. **Language-Specific Optimizations**: Different templates for different difficulty levels