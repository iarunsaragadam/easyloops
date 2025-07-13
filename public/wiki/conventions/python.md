# Programming Conventions

## What are Programming Conventions?

Programming conventions are agreed-upon rules and standards that developers follow to write consistent, readable, and maintainable code. These conventions cover naming, formatting, structure, and best practices that make code easier to understand and work with.

## Naming Conventions

### Variable Naming

```python
# Python - snake_case for variables
user_name = "John"
email_address = "john@example.com"
is_active = True
total_count = 100

# JavaScript - camelCase for variables
let userName = "John";
let emailAddress = "john@example.com";
let isActive = true;
let totalCount = 100;

# Java - camelCase for variables
String userName = "John";
String emailAddress = "john@example.com";
boolean isActive = true;
int totalCount = 100;
```

### Function Naming

```python
# Python - snake_case for functions
def get_user_info():
    pass

def calculate_total_price():
    pass

def is_valid_email(email):
    pass

# JavaScript - camelCase for functions
function getUserInfo() {
    // function body
}

function calculateTotalPrice() {
    // function body
}

function isValidEmail(email) {
    // function body
}
```

### Class Naming

```python
# Python - PascalCase for classes
class UserInfo:
    pass

class DatabaseConnection:
    pass

class EmailValidator:
    pass

# JavaScript - PascalCase for classes
class UserInfo {
    constructor() {
        // constructor body
    }
}

class DatabaseConnection {
    constructor() {
        // constructor body
    }
}
```

### Constant Naming

```python
# Python - UPPER_SNAKE_CASE for constants
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30
API_BASE_URL = "https://api.example.com"
PI = 3.14159

# JavaScript - UPPER_SNAKE_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 30;
const API_BASE_URL = "https://api.example.com";
const PI = 3.14159;
```

## Code Formatting

### Indentation

```python
# Python - 4 spaces (or tabs, but spaces are preferred)
def calculate_area(radius):
    pi = 3.14159
    area = pi * radius * radius
    return area

# JavaScript - 2 or 4 spaces
function calculateArea(radius) {
    const pi = 3.14159;
    const area = pi * radius * radius;
    return area;
}

# Java - 4 spaces
public double calculateArea(double radius) {
    double pi = 3.14159;
    double area = pi * radius * radius;
    return area;
}
```

### Line Length

```python
# Python - PEP 8 recommends 79 characters
def long_function_name(
    parameter1,
    parameter2,
    parameter3
):
    # Function body
    pass

# JavaScript - Common limit is 80-100 characters
function longFunctionName(
    parameter1,
    parameter2,
    parameter3
) {
    // Function body
}
```

### Spacing

```python
# Python - spaces around operators
result = a + b
if condition:
    do_something()

# No spaces inside parentheses
function_call(param1, param2)

# Spaces after commas
items = [1, 2, 3, 4]
```

## File Organization

### File Naming

```python
# Python - snake_case for files
user_management.py
database_connection.py
email_validator.py

# JavaScript - kebab-case or camelCase
user-management.js
databaseConnection.js
emailValidator.js
```

### Directory Structure

```
project/
├── src/
│   ├── components/
│   ├── utils/
│   └── services/
├── tests/
├── docs/
└── README.md
```

## Documentation Conventions

### Function Documentation

```python
def calculate_area(radius):
    """
    Calculate the area of a circle.

    Args:
        radius (float): The radius of the circle

    Returns:
        float: The area of the circle

    Raises:
        ValueError: If radius is negative
    """
    if radius < 0:
        raise ValueError("Radius cannot be negative")

    pi = 3.14159
    return pi * radius * radius
```

### Class Documentation

```python
class UserManager:
    """
    Manages user operations including creation, updates, and deletion.

    This class provides methods to interact with user data stored
    in the database.
    """

    def __init__(self, database_connection):
        """
        Initialize the UserManager with a database connection.

        Args:
            database_connection: Database connection object
        """
        self.db = database_connection
```

## Comment Conventions

### Inline Comments

```python
# Python - use # for comments
total = price + tax  # Calculate total including tax

# JavaScript - use // for single line comments
const total = price + tax; // Calculate total including tax

# Java - use // for single line comments
double total = price + tax; // Calculate total including tax
```

### Block Comments

```python
# Python - use multiple # lines or docstrings
"""
This function processes user data and validates it
before storing in the database.
"""

# JavaScript - use /* */
/*
 * This function processes user data and validates it
 * before storing in the database.
 */

# Java - use /* */
/*
 * This function processes user data and validates it
 * before storing in the database.
 */
```

## Error Handling Conventions

### Exception Handling

```python
# Python - specific exception handling
try:
    result = divide(a, b)
except ZeroDivisionError:
    print("Cannot divide by zero")
except ValueError as e:
    print(f"Invalid input: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

### Error Messages

```python
# Use clear, descriptive error messages
if age < 0:
    raise ValueError("Age cannot be negative")

if not email or '@' not in email:
    raise ValueError("Invalid email format")
```

## Testing Conventions

### Test File Naming

```python
# Python - test_ prefix
test_user_management.py
test_database_connection.py

# JavaScript - .test.js or .spec.js suffix
userManagement.test.js
databaseConnection.spec.js
```

### Test Function Naming

```python
# Python - test_ prefix
def test_calculate_area_with_valid_radius():
    pass

def test_calculate_area_with_negative_radius():
    pass

# JavaScript - descriptive names
function shouldCalculateAreaWithValidRadius() {
    // test body
}

function shouldThrowErrorForNegativeRadius() {
    // test body
}
```

## Version Control Conventions

### Commit Messages

```bash
# Conventional Commits format
feat: add user authentication system
fix: resolve database connection timeout
docs: update API documentation
test: add unit tests for user validation
refactor: simplify email validation logic
```

### Branch Naming

```bash
# Feature branches
feature/user-authentication
feature/email-validation

# Bug fix branches
fix/database-connection-issue
fix/login-form-validation

# Hotfix branches
hotfix/security-vulnerability
hotfix/critical-bug-fix
```

## Language-Specific Conventions

### Python (PEP 8)

```python
# Import order
import os
import sys
from datetime import datetime
from typing import List, Dict

# Class method order
class MyClass:
    def __init__(self):
        pass

    def public_method(self):
        pass

    def _private_method(self):
        pass

    def __magic_method__(self):
        pass
```

### JavaScript (ESLint/Airbnb)

```javascript
// Import order
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// Function declarations
const MyComponent = ({ prop1, prop2 }) => {
  // Component logic
};

// Export statements
export default MyComponent;
```

### Java (Google Style)

```java
// Import order
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

// Class structure
@Component
public class MyService {
    private final Repository repository;

    public MyService(Repository repository) {
        this.repository = repository;
    }

    public void publicMethod() {
        // method body
    }

    private void privateMethod() {
        // method body
    }
}
```

## Best Practices

### 1. Consistency

```python
# Be consistent within your project
# Don't mix naming conventions
user_name = "John"      # snake_case
userName = "John"       # camelCase - inconsistent!
```

### 2. Readability

```python
# Write code that reads like English
if user.is_active and user.has_permission:
    process_user_request()

# Avoid cryptic abbreviations
if u.act and u.perm:
    proc_req()
```

### 3. Maintainability

```python
# Use meaningful names
def calculate_total_with_tax(price, tax_rate):
    return price * (1 + tax_rate)

# Avoid magic numbers
TAX_RATE = 0.08
def calculate_total_with_tax(price):
    return price * (1 + TAX_RATE)
```

## Tools for Enforcing Conventions

### Linters and Formatters

```bash
# Python
pip install black flake8 pylint
black myfile.py
flake8 myfile.py

# JavaScript
npm install eslint prettier
npx eslint myfile.js
npx prettier --write myfile.js

# Java
# Use IDE settings or Maven/Gradle plugins
```

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/psf/black
    rev: 22.3.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: 4.0.1
    hooks:
      - id: flake8
```

## Related Concepts

- [[wiki:camelcase]] - camelCase naming convention
- [[wiki:snake-case]] - snake_case naming convention
- [[wiki:variable]] - Variable naming and usage
- [[wiki:functions]] - Function naming conventions
