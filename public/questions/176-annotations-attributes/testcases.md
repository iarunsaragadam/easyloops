# Test Cases for Annotations/attributes

## Test Case Structure
This question analyzes Python function definitions with varying complexity of annotations and decorators.

### Input Format Pattern:
```
Line 1: N (number of functions)
Lines 2 to N+1: Function definitions separated by "---"
```

### Output Format Pattern:
```
Function X:
  Name: function_name
  Decorators: decorator1, decorator2 (or "None")
  Parameters: count
    param1 -> type1 = default1
    param2 -> type2
  Return Type: return_type (or "None")

```

## Test Case 1: Basic
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

## Test Case 2: Edge Cases
**Input (`input2.txt`):**
```
3
def no_params() -> None:
    pass
---
@multiple
@decorators
def complex_func(a: List[int], b: Dict[str, Any] = None, *args, **kwargs) -> Optional[str]:
    pass
---
def simple(x, y=10):
    pass
```
**Expected Output (`expected2.txt`):**
```
Function 1:
  Name: no_params
  Decorators: None
  Parameters: 0
  Return Type: None

Function 2:
  Name: complex_func
  Decorators: multiple, decorators
  Parameters: 2
    a -> List[int]
    b -> Dict[str, Any] = None
  Return Type: Optional[str]

Function 3:
  Name: simple
  Decorators: None
  Parameters: 2
    x
    y = 10
  Return Type: None

```

## Test Case 3: Complex Scenarios
**Input (`input3.txt`):**
```
1
@classmethod
@property
@cache
def advanced_method(self, data: Union[str, int], callback: Callable[[int], bool] = lambda x: True, timeout: float = 1.0) -> Tuple[bool, str]:
    pass
```
**Expected Output (`expected3.txt`):**
```
Function 1:
  Name: advanced_method
  Decorators: classmethod, property, cache
  Parameters: 4
    self
    data -> Union[str, int]
    callback -> Callable[[int], bool] = lambda x: True
    timeout -> float = 1.0
  Return Type: Tuple[bool, str]

```

## Test Case Creation Rules
### Input Validation Rules:
1. First line must be a positive integer N
2. Function definitions must be valid Python syntax
3. Functions separated by "---" delimiter
4. Decorators start with @ symbol
5. Type annotations use standard Python typing syntax

### Output Format Rules:
1. Functions numbered sequentially starting from 1
2. Decorators listed in order of appearance, comma-separated
3. "None" displayed when no decorators or return type
4. Parameters listed with annotations when present
5. Default values shown after = sign
6. Empty line after each function block

## Language-Specific Considerations
### Python Considerations:
- Use `ast` module for robust parsing of function definitions
- Handle various annotation syntaxes: `int`, `List[int]`, `Optional[str]`
- Support complex decorators like `@property`, `@staticmethod`
- Parse default values correctly (literals, expressions)
- Handle special parameters like `*args`, `**kwargs`

### Go Considerations:
- Parse Python-like syntax using regex or custom parser
- Focus on structure tags and build tags as Go's annotation equivalent
- Handle function signatures with struct tags
- Support Go-style type annotations

## Validation Checklist
- [ ] Input starts with valid integer N
- [ ] All function definitions parse correctly
- [ ] Decorators extracted in correct order
- [ ] Type annotations preserved accurately
- [ ] Default values captured properly
- [ ] Return types identified correctly
- [ ] Output format matches exactly
- [ ] Edge cases handled (no params, no decorators, etc.)

## Automated Test Case Generation
```python
import random
from typing import List, Dict, Any, Optional, Union, Tuple, Callable

def generate_test_case() -> tuple[str, str]:
    """Generate a random test case for function metadata analysis."""
    
    # Random number of functions
    n = random.randint(1, 5)
    
    # Available decorators
    decorators = ['cache', 'property', 'staticmethod', 'classmethod', 'validate', 'timer']
    
    # Available types
    types = ['int', 'str', 'float', 'bool', 'List[int]', 'Dict[str, Any]', 'Optional[str]']
    
    functions = []
    expected_output = []
    
    for i in range(n):
        # Generate function
        func_name = f"func_{i+1}"
        
        # Random decorators
        num_decorators = random.randint(0, 3)
        func_decorators = random.sample(decorators, num_decorators)
        
        # Random parameters
        num_params = random.randint(0, 4)
        params = []
        param_info = []
        
        for j in range(num_params):
            param_name = f"param_{j+1}"
            
            # Optional type annotation
            if random.random() > 0.3:
                param_type = random.choice(types)
                type_annotation = f" -> {param_type}"
            else:
                param_type = None
                type_annotation = ""
            
            # Optional default value
            if random.random() > 0.5:
                default_val = random.choice(['None', '0', '"default"', 'True'])
                default_part = f" = {default_val}"
            else:
                default_val = None
                default_part = ""
            
            if param_type:
                params.append(f"{param_name}: {param_type}{default_part}")
                param_info.append({
                    'name': param_name,
                    'annotation': param_type,
                    'default': default_val
                })
            else:
                params.append(f"{param_name}{default_part}")
                param_info.append({
                    'name': param_name,
                    'annotation': None,
                    'default': default_val
                })
        
        # Random return type
        return_type = random.choice(types + [None])
        return_annotation = f" -> {return_type}" if return_type else ""
        
        # Build function definition
        decorator_lines = [f"@{dec}" for dec in func_decorators]
        param_str = ", ".join(params)
        func_def = "\n".join(decorator_lines + [f"def {func_name}({param_str}){return_annotation}:", "    pass"])
        
        functions.append(func_def)
        
        # Build expected output
        expected_output.append(f"Function {i+1}:")
        expected_output.append(f"  Name: {func_name}")
        
        if func_decorators:
            expected_output.append(f"  Decorators: {', '.join(func_decorators)}")
        else:
            expected_output.append("  Decorators: None")
        
        expected_output.append(f"  Parameters: {len(param_info)}")
        
        for param in param_info:
            param_line = f"    {param['name']}"
            if param['annotation']:
                param_line += f" -> {param['annotation']}"
            if param['default']:
                param_line += f" = {param['default']}"
            expected_output.append(param_line)
        
        expected_output.append(f"  Return Type: {return_type if return_type else 'None'}")
        expected_output.append("")
    
    # Build input
    input_content = str(n) + "\n" + "\n---\n".join(functions)
    expected_content = "\n".join(expected_output)
    
    return input_content, expected_content

def validate_test_case(input_content: str, expected_content: str) -> bool:
    """Validate that a test case is well-formed."""
    lines = input_content.strip().split('\n')
    
    try:
        n = int(lines[0])
        if n <= 0:
            return False
        
        # Check that we have function definitions
        func_content = '\n'.join(lines[1:])
        functions = func_content.split('---')
        
        if len(functions) != n:
            return False
        
        # Validate each function contains def keyword
        for func in functions:
            if 'def ' not in func:
                return False
        
        # Validate expected output format
        expected_lines = expected_content.strip().split('\n')
        function_count = 0
        
        for line in expected_lines:
            if line.startswith('Function '):
                function_count += 1
        
        return function_count == n
        
    except (ValueError, IndexError):
        return False
```
