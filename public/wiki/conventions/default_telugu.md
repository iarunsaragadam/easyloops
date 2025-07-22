# Programming Conventions

## What are Programming Conventions?

Programming conventions ante developers follow chese rules and standards to write code that’s clean, clear, and maintainable, like tuning a bike for a perfect ride with “Velli vasthe gelli!” energy. Ee rules naming, formatting, structure, and best practices cover chesthundi to make code easy to read and work with.

## Naming Conventions

### Variable Naming

```python
# Python - snake_case for variables
sivudu_name = "Sivudu"
deal_email = "sivudu@mass.com"
is_active = True
total_deals = 100

# JavaScript - camelCase for variables
let sivuduName = "Sivudu";
let dealEmail = "sivudu@mass.com";
let isActive = true;
let totalDeals = 100;

# Java - camelCase for variables
String sivuduName = "Sivudu";
String dealEmail = "sivudu@mass.com";
boolean isActive = true;
int totalDeals = 100;
```

### Function Naming

```python
# Python - snake_case for functions
def get_hero_info():
    pass

def calculate_deal_cash():
    pass

def is_valid_deal(deal):
    pass

# JavaScript - camelCase for functions
function getHeroInfo() {
    // function body
}

function calculateDealCash() {
    // function body
}

function isValidDeal(deal) {
    // function body
}
```

### Class Naming

```python
# Python - PascalCase for classes
class HeroProfile:
    pass

class DealSystem:
    pass

class EmailChecker:
    pass

# JavaScript - PascalCase for classes
class HeroProfile {
    constructor() {
        // constructor body
    }
}

class DealSystem {
    constructor() {
        // constructor body
    }
}
```

### Constant Naming

```python
# Python - UPPER_SNAKE_CASE for constants
MAX_FIGHT_MOVES = 3
DEFAULT_TIMEOUT = 30
API_BASE_URL = "https://mass.deal.com"
PI = 3.14159

# JavaScript - UPPER_SNAKE_CASE for constants
const MAX_FIGHT_MOVES = 3;
const DEFAULT_TIMEOUT = 30;
const API_BASE_URL = "https://mass.deal.com";
const PI = 3.14159;
```

## Code Formatting

### Indentation

Indentation ante code ni neat ga align cheyadam

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

Lines chala long ayithe, code read cheyadam kastam, like a dragged-out fight scene. Keep it short.

```python
# Python - PEP 8 says 79 characters
def long_fight_plan(
    hero1,
    hero2,
    villain
):
    # Function body
    pass

# JavaScript - 80-100 characters
function longFightPlan(
    hero1,
    hero2,
    villain
) {
    // Function body
}
```

### Spacing

Spaces correct ga use cheyali, like a hero’s stance before a big move.

```python
# Python - spaces around operators
result = a + b
if condition:
    start_fight()

# No spaces inside parentheses
fight_scene(hero1, hero2)

# Spaces after commas
items = [1, 2, 3, 4]
```

## File Organization

### File Naming

Files ki names clear ga undali, like nee WhatsApp group name.

```python
# Python - snake_case for files
hero_management.py
deal_system.py
email_checker.py

# JavaScript - kebab-case or camelCase
hero-management.js
dealSystem.js
emailChecker.js
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
total = price + tax  # Calculate total with tax, mass vibe

# JavaScript - use // for single line comments
const total = price + tax; // Calculate total with tax, mass vibe

# Java - use // for single line comments
double total = price + tax; // Calculate total with tax, mass vibe
```

### Block Comments

```python
# Python - use multiple # lines or docstrings
"""
This function processes hero data and checks it
before saving in the system.
"""

# JavaScript - use /* */
/*
 * This function processes hero data and checks it
 * before saving in the system.
 */

# Java - use /* */
/*
 * This function processes hero data and checks it
 * before saving in the system.
 */
```

## Error Handling Conventions

### Exception Handling

```python
# Python - specific exception handling
try:
    result = divide(a, b)
except ZeroDivisionError:
    print("Zero tho divide cheyadam kadu!")
except ValueError as e:
    print(f"Input correct ga ledhu: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

### Error Messages

```python
# Use clear, descriptive error messages
if age < 0:
    raise ValueError("Age negative undakoodadu!")

if not email or '@' not in email:
    raise ValueError("Email format correct ga ledhu!")
```

## Testing Conventions

### Test File Naming

```python
# Python - test_ prefix
test_hero_management.py
test_deal_system.py

# JavaScript - .test.js or .spec.js suffix
heroManagement.test.js
dealSystem.spec.js
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
class HeroSquad:
    def __init__(self):
        pass

    def public_fight(self):
        pass

    def _private_plan(self):
        pass

    def __mass_move__(self):
        pass
```

### JavaScript (ESLint/Airbnb)

```javascript
// Import order
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// Function declarations
const HeroComponent = ({ hero1, hero2 }) => {
  // Component logic
};

// Export statements
export default HeroComponent;
```

### Java (Google Style)

```java
// Import order
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

// Class structure
@Component
public class HeroService {
    private final Repository repository;

    public HeroService(Repository repository) {
        this.repository = repository;
    }

    public void publicFight() {
        // method body
    }

    private void privatePlan() {
        // method body
    }
}
```

## Best Practices

### 1. Consistency

```python
# Be consistent within your project
# Don't mix naming conventions
hero_name = "Sivudu"      # snake_case
heroName = "Sivudu"       # camelCase - mix cheyaku!
```

### 2. Readability

```python
# Write code that reads like a plan
if hero.is_active and hero.has_power:
    start_mass_fight()

# Avoid cryptic abbreviations
if h.act and h.pwr:
    strt_fght()
```

### 3. Maintainability

```python
# Use meaningful names
def calculate_cash_with_tax(price, tax_rate):
    return price * (1 + tax_rate)

# Avoid magic numbers
TAX_RATE = 0.08
def calculate_cash_with_tax(price):
    return price * (1 + TAX_RATE)
```

## Tools for Enforcing Conventions

### Linters and Formatters

```bash
# Python
pip install black flake8 pylint
black hero_file.py
flake8 hero_file.py

# JavaScript
npm install eslint prettier
npx eslint hero_file.js
npx prettier --write hero_file.js

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
