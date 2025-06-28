# Annotations/Attributes

## Problem Statement

Create a **Function Metadata Analyzer** that parses function definitions and extracts comprehensive metadata information. The specific metadata varies by programming language, demonstrating how different languages handle function annotations and attributes.

### Python Version
In modern Python development, annotations and attributes provide crucial metadata about functions:
- **Type annotations** (`def func(x: int) -> str:`) specify parameter and return types
- **Decorators** (`@cache`, `@property`) add behavior and metadata to functions  
- **Parameter attributes** include names, types, and default values

### Go Version  
In Go development, function metadata is expressed differently:
- **Function signatures** with explicit typing (`func Add(x int, y int) int`)
- **Build tags** and **comments** for compilation and documentation metadata
- **Struct tags** for type-level metadata (when analyzing method signatures)
- **Parameter names and types** from function signatures

Your program should analyze function definitions and produce structured output showing all metadata components. This demonstrates understanding of how modern language introspection and static analysis tools work across different programming paradigms.

**Real-world applications:**
- **Python**: Code documentation generators (Sphinx), type checkers (mypy), API documentation tools
- **Go**: Code generation tools (go generate), documentation (godoc), static analysis (golint, vet)
- **Universal**: IDE intelligence, refactoring tools, automatic test generation, API specification generation

## Input Format

The input consists of:
```
Line 1: N (number of function definitions to analyze)
Lines 2 to N+1: Function definitions (may span multiple lines, separated by "---")
```

Each function definition includes:
- Optional decorators (lines starting with @)
- Function signature with optional type annotations
- Function body is minimal (just "pass" or simple content)

## Test Cases
**Note**: The provided test cases demonstrate Python function analysis. Go implementations would parse equivalent Go function signatures and extract applicable metadata.

**Input (`input.txt`):**
```
2
@decorator
def hello(name: str) -> str:
    pass
---
def add_numbers(x: int, y: int = 5) -> int:
    return x + y
```

**Expected Output (`expected.txt`):**
```
Function 1:
  Name: hello
  Decorators: decorator
  Parameters: 1
    name -> str
  Return Type: str

Function 2:
  Name: add_numbers
  Decorators: None
  Parameters: 2
    x -> int
    y -> int = 5
  Return Type: int

```

## How to Test Your Solution
### Python:
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

### Go:
1. Copy your template file: `cp templates/go_template.go solution.go`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | go run solution.go > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- **Python**: Understand type annotations, decorators, and function metadata parsing
- **Go**: Learn function signature analysis, build tags, and Go's explicit typing system
- **Universal**: Practice parsing and analyzing code structure, implement introspection techniques
- Work with Abstract Syntax Trees (AST) or regex parsing approaches
- Understand modern development practices for static analysis and code intelligence

## Implementation Guidelines

**Note**: The provided test cases demonstrate Python function metadata extraction. For Go implementations, you would adapt the parsing logic to handle Go function signatures and metadata patterns.

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    for _ in range(n):
        # Read function definition (may span multiple lines)
        function_def = ""
        line = input().strip()
        while line and not line.startswith("---"):
            function_def += line + "\n"
            try:
                line = input().strip()
            except EOFError:
                break
        
        # Parse and analyze the function
        metadata = analyze_function(function_def.strip())
        
        # Output structured metadata
        print_function_metadata(metadata)

def analyze_function(func_def: str):
    # Use ast module or regex to parse function
    # Extract decorators, parameters, annotations
    pass
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scan(&n)
    
    for i := 0; i < n; i++ {
        // Read function definition
        funcDef := readFunctionDefinition()
        
        // Parse and analyze
        metadata := analyzeFunction(funcDef)
        
        // Output structured metadata
        printFunctionMetadata(metadata)
    }
}

func analyzeFunction(funcDef string) FunctionMetadata {
    // For Go, parse function signatures like:
    // func Add(x int, y int) int
    // Extract function name, parameters, return types
    // Handle build tags, comments as metadata
    return FunctionMetadata{}
}
```

### Language-Specific Considerations:

**Python**: Focus on decorators (`@decorator`), type annotations (`: int`, `-> str`), and parameter defaults (`= value`)

**Go**: Focus on explicit function signatures, parameter types, return types, and any preceding comments or build tags that serve as metadata

## Constraints
- 1 ≤ N ≤ 100 (number of functions)
- Function definitions contain valid Python syntax
- Decorators use simple names (no complex expressions)
- Type annotations use standard Python types
- Parameter names are valid Python identifiers
- Maximum 20 parameters per function
- Function definitions fit within 1000 characters each

## Hints
### Python-Specific:
- **Start Simple**: Begin with regex parsing for basic function signatures
- **Use AST Module**: Python's `ast` module provides robust parsing capabilities
- **Parse Decorators**: Look for lines starting with @ before function definition
- **Extract Types**: Type annotations appear after colons in parameters and after -> for returns
- **Default Values**: Parameters may have default values after = sign
- **Multiple Decorators**: Functions can have multiple decorators stacked

### Go-Specific:
- **Parse Signatures**: Go functions follow `func name(params) returnType` pattern
- **Extract Types**: Go has explicit typing - parse parameter and return type declarations
- **Handle Comments**: Go uses comments for documentation metadata (preceding the function)
- **Build Tags**: Look for `// +build` or `//go:build` directives for compilation metadata
- **Method Receivers**: For methods, extract receiver information `func (r Type) method()`

### Universal:
- **Handle Edge Cases**: Consider functions without annotations, decorators, or defaults
- **Error Handling**: Gracefully handle malformed input with fallback parsing
- **Regex Fallbacks**: When AST parsing fails, implement regex-based extraction
- **Output Formatting**: Ensure consistent structured output format across languages
