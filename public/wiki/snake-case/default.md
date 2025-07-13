# snake_case Naming Convention

## What is snake_case?

snake*case is a naming convention where words are separated by underscores (*) and all letters are typically lowercase. The name comes from the visual resemblance to a snake with its body segments.

## Basic Rules

### 1. Use Underscores to Separate Words

Words are separated by underscores, not spaces or hyphens.

```python
# Correct
first_name = "John"
user_age = 25
is_valid = True

# Incorrect
firstname = "John"      # Should be first_name
first-name = "John"     # Should be first_name
firstName = "John"      # Should be first_name
```

### 2. Use Lowercase Letters

All letters should be lowercase (except for constants, which are typically UPPER_SNAKE_CASE).

```python
# Correct
user_name = "John"
email_address = "john@example.com"
is_logged_in = True

# Incorrect
User_Name = "John"      # Should be user_name
USER_NAME = "John"      # Should be user_name (unless it's a constant)
```

## Common Use Cases

### 1. Variable Names

```python
# Good examples
first_name = "Alice"
last_name = "Smith"
email_address = "alice@example.com"
phone_number = "123-456-7890"
is_logged_in = True
has_permission = False
total_score = 100
average_rating = 4.5
```

### 2. Function Names

```python
def get_user_info():
    pass

def calculate_total_price():
    pass

def is_valid_email(email):
    pass

def send_notification_message():
    pass
```

### 3. Method Names

```python
class User:
    def get_user_name(self):
        return self.name

    def set_user_name(self, name):
        self.name = name

    def is_valid_user(self):
        return self.age >= 18
```

## When to Use snake_case

### 1. Python Conventions

snake_case is the standard naming convention in Python (PEP 8).

```python
# Variables
user_name = "John"
is_active = True

# Functions
def get_user_info():
    pass

# Methods
def calculate_total():
    pass
```

### 2. Ruby Conventions

snake_case is also common in Ruby.

```ruby
# Variables
user_name = "John"
is_active = true

# Methods
def get_user_info
end

def calculate_total
end
```

### 3. Database Column Names

snake_case is often used for database column names.

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email_address VARCHAR(100),
    is_active BOOLEAN
);
```

## Comparison with Other Conventions

### snake_case vs camelCase

```python
# snake_case (Python, Ruby)
first_name = "John"
last_name = "Doe"
is_user_active = True

# camelCase (JavaScript, Java, C#)
firstName = "John"
lastName = "Doe"
isUserActive = True
```

### snake_case vs kebab-case

```python
# snake_case
user_name = "John"
email_address = "john@example.com"

# kebab-case (URLs, CSS classes)
user-name = "John"  # Not valid Python
email-address = "john@example.com"  # Not valid Python
```

## Special Cases

### 1. Constants (UPPER_SNAKE_CASE)

Constants are typically written in all uppercase with underscores.

```python
# Constants
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30
API_BASE_URL = "https://api.example.com"
PI = 3.14159
```

### 2. Class Names (PascalCase)

Class names use PascalCase, not snake_case.

```python
# Correct
class UserInfo:
    pass

class DatabaseConnection:
    pass

# Incorrect
class user_info:  # Should be UserInfo
    pass
```

### 3. Module Names

Module names use snake_case.

```python
# File: user_management.py
class UserManager:
    pass

# File: database_connection.py
class DatabaseConnection:
    pass
```

## Best Practices

### 1. Be Descriptive

```python
# Good
user_first_name = "John"
total_item_count = 10
is_email_valid = True

# Avoid
fn = "John"           # Too short
cnt = 10              # Abbreviation
valid = True          # Too vague
```

### 2. Be Consistent

```python
# Consistent snake_case
user_name = "John"
user_age = 25
user_email = "john@example.com"
is_user_active = True

# Inconsistent (don't mix conventions)
userName = "John"     # camelCase
user_age = 25         # snake_case
userEmail = "john@example.com"  # camelCase
```

### 3. Handle Acronyms

```python
# Good
user_id = "12345"
api_url = "https://api.example.com"
http_request = "GET"

# Also acceptable
userID = "12345"      # But not recommended in Python
apiURL = "https://api.example.com"
httpREQUEST = "GET"
```

## Common Mistakes to Avoid

### 1. Using Spaces

```python
# Wrong
first name = "John"
user name = "john"

# Correct
first_name = "John"
user_name = "john"
```

### 2. Using Hyphens

```python
# Wrong
first-name = "John"
user-name = "john"

# Correct
first_name = "John"
user_name = "john"
```

### 3. Inconsistent Underscores

```python
# Wrong
first_name = "John"
lastname = "Doe"      # Should be last_name
full_name = "John Doe"
emailaddress = "john@example.com"  # Should be email_address

# Correct
first_name = "John"
last_name = "Doe"
full_name = "John Doe"
email_address = "john@example.com"
```

## Language-Specific Guidelines

### Python (PEP 8)

```python
# Variables and functions
user_name = "John"
is_user_active = True

def get_user_info():
    return {"name": user_name, "active": is_user_active}

# Classes (use PascalCase)
class UserInfo:
    def __init__(self, name):
        self.user_name = name
```

### Ruby

```ruby
# Variables and methods
user_name = "John"
is_user_active = true

def get_user_info
  { name: user_name, active: is_user_active }
end

# Classes (use PascalCase)
class UserInfo
  def initialize(name)
    @user_name = name
  end
end
```

### PHP

```php
// Variables and functions
$user_name = "John";
$is_user_active = true;

function get_user_info() {
    return ["name" => $user_name, "active" => $is_user_active];
}

// Classes (use PascalCase)
class UserInfo {
    private $user_name;

    public function __construct($name) {
        $this->user_name = $name;
    }
}
```

## Related Concepts

- [[wiki:camelcase]] - Alternative naming convention
- [[wiki:conventions]] - Programming conventions and standards
- [[wiki:variable]] - Variable naming and usage
- [[wiki:functions]] - Function naming conventions
