# Templates

## What are Templates?

Templates are reusable code patterns or structures that provide a foundation for creating similar code with different data. They help reduce code duplication and provide consistent patterns across a codebase.

## Code Templates

### Function Templates

```python
# Python - function template
def template_function(param1, param2):
    """
    Template function with standard structure.

    Args:
        param1: Description of first parameter
        param2: Description of second parameter

    Returns:
        Description of return value

    Raises:
        ValueError: When parameters are invalid
    """
    # Input validation
    if not param1 or not param2:
        raise ValueError("Parameters cannot be empty")

    # Main logic
    result = process_data(param1, param2)

    # Post-processing
    result = format_result(result)

    return result

# Usage example
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.

    Args:
        length: Length of the rectangle
        width: Width of the rectangle

    Returns:
        Area of the rectangle

    Raises:
        ValueError: When length or width is negative
    """
    if length < 0 or width < 0:
        raise ValueError("Length and width must be positive")

    result = length * width

    return result
```

### Class Templates

```python
# Python - class template
class TemplateClass:
    """
    Template class with standard structure.
    """

    def __init__(self, param1, param2):
        """
        Initialize the class.

        Args:
            param1: First parameter
            param2: Second parameter
        """
        self.param1 = param1
        self.param2 = param2
        self._private_var = None

    def public_method(self):
        """
        Public method template.

        Returns:
            Processed result
        """
        # Validate state
        if not self._is_valid():
            raise ValueError("Invalid state")

        # Process data
        result = self._process_data()

        return result

    def _private_method(self):
        """
        Private method template.
        """
        return self.param1 + self.param2

    def _is_valid(self):
        """
        Check if object is in valid state.
        """
        return self.param1 is not None and self.param2 is not None

# Usage example
class UserManager:
    def __init__(self, database, cache):
        self.database = database
        self.cache = cache
        self._connection = None

    def get_user(self, user_id):
        if not self._is_valid():
            raise ValueError("UserManager not properly initialized")

        user = self._fetch_user(user_id)
        return user

    def _fetch_user(self, user_id):
        return self.database.get_user(user_id)

    def _is_valid(self):
        return self.database is not None and self.cache is not None
```

## String Templates

### Python String Formatting

```python
# Python - string templates
# f-string templates
name = "John"
age = 25
template = f"Hello, my name is {name} and I am {age} years old."

# .format() templates
template = "Hello, my name is {} and I am {} years old.".format(name, age)

# Named placeholders
template = "Hello, my name is {name} and I am {age} years old.".format(
    name=name, age=age
)

# Template strings
from string import Template
template = Template("Hello, my name is $name and I am $age years old.")
result = template.substitute(name=name, age=age)
```

### HTML Templates

```html
<!-- HTML template -->
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <header>
      <h1>${header_title}</h1>
    </header>

    <main>
      <div class="content">${content}</div>
    </main>

    <footer>
      <p>&copy; ${year} ${company_name}</p>
    </footer>
  </body>
</html>
```

### Email Templates

```python
# Python - email template
email_template = """
Dear {recipient_name},

Thank you for your {action_type} on {date}.

{main_content}

If you have any questions, please contact us at {contact_email}.

Best regards,
{company_name}
"""

# Usage
email_content = email_template.format(
    recipient_name="John Doe",
    action_type="order",
    date="2024-01-15",
    main_content="Your order has been confirmed and will be shipped within 2-3 business days.",
    contact_email="support@example.com",
    company_name="Example Company"
)
```

## File Templates

### Configuration File Templates

```python
# Python - config file template
config_template = """
# Application Configuration
[Database]
host = {db_host}
port = {db_port}
database = {db_name}
username = {db_user}
password = {db_password}

[API]
base_url = {api_url}
timeout = {api_timeout}
retry_attempts = {retry_attempts}

[Logging]
level = {log_level}
file = {log_file}
"""

# Usage
config_content = config_template.format(
    db_host="localhost",
    db_port=5432,
    db_name="myapp",
    db_user="admin",
    db_password="secret",
    api_url="https://api.example.com",
    api_timeout=30,
    retry_attempts=3,
    log_level="INFO",
    log_file="/var/log/app.log"
)
```

### Code File Templates

```python
# Python - module template
module_template = '''"""
{module_name}

{description}

Author: {author}
Date: {date}
"""

import sys
import os
from typing import List, Dict, Optional


def main():
    """
    Main function.
    """
    try:
        # Main logic here
        pass
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
'''

# Usage
module_content = module_template.format(
    module_name="data_processor",
    description="Process and analyze data files",
    author="John Doe",
    date="2024-01-15"
)
```

## Template Engines

### Jinja2 Templates

```python
# Python - Jinja2 template
from jinja2 import Template

# Template definition
template_str = """
User Profile:
- Name: {{ user.name }}
- Age: {{ user.age }}
- Email: {{ user.email }}

{% if user.is_active %}
Status: Active
{% else %}
Status: Inactive
{% endif %}

{% for skill in user.skills %}
- {{ skill }}
{% endfor %}
"""

# Create template
template = Template(template_str)

# Data
user_data = {
    "name": "John Doe",
    "age": 25,
    "email": "john@example.com",
    "is_active": True,
    "skills": ["Python", "JavaScript", "SQL"]
}

# Render template
result = template.render(user=user_data)
print(result)
```

### Django Templates

```html
<!-- Django template -->
{% extends "base.html" %} {% block title %}{{ page_title }}{% endblock %} {%
block content %}
<div class="user-profile">
  <h1>{{ user.name }}</h1>
  <p>Age: {{ user.age }}</p>
  <p>Email: {{ user.email }}</p>

  {% if user.is_active %}
  <span class="status active">Active</span>
  {% else %}
  <span class="status inactive">Inactive</span>
  {% endif %}

  <h2>Skills:</h2>
  <ul>
    {% for skill in user.skills %}
    <li>{{ skill }}</li>
    {% empty %}
    <li>No skills listed</li>
    {% endfor %}
  </ul>
</div>
{% endblock %}
```

## Design Pattern Templates

### Singleton Template

```python
# Python - singleton template
class SingletonTemplate:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if not self._initialized:
            self._initialize()
            self._initialized = True

    def _initialize(self):
        """Initialize the singleton instance."""
        pass

# Usage example
class DatabaseConnection(SingletonTemplate):
    def _initialize(self):
        self.connection = None
        self.host = "localhost"
        self.port = 5432
```

### Factory Template

```python
# Python - factory template
from abc import ABC, abstractmethod

class Product(ABC):
    @abstractmethod
    def operation(self):
        pass

class ConcreteProductA(Product):
    def operation(self):
        return "ConcreteProductA operation"

class ConcreteProductB(Product):
    def operation(self):
        return "ConcreteProductB operation"

class FactoryTemplate:
    @staticmethod
    def create_product(product_type: str) -> Product:
        if product_type == "A":
            return ConcreteProductA()
        elif product_type == "B":
            return ConcreteProductB()
        else:
            raise ValueError(f"Unknown product type: {product_type}")

# Usage
product = FactoryTemplate.create_product("A")
result = product.operation()
```

## Best Practices

### 1. Use Clear Placeholders

```python
# Good - clear placeholder names
template = "Hello, {user_name}! Your order {order_id} is ready."

# Bad - unclear placeholders
template = "Hello, {}! Your order {} is ready."
```

### 2. Validate Template Data

```python
# Python - validate template data
def render_template(template, data):
    required_fields = extract_placeholders(template)

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")

    return template.format(**data)

def extract_placeholders(template):
    """Extract placeholder names from template."""
    import re
    return re.findall(r'\{(\w+)\}', template)
```

### 3. Use Type Hints

```python
# Python - typed templates
from typing import Dict, Any

def create_email_template(
    template: str,
    data: Dict[str, Any]
) -> str:
    """
    Create email from template.

    Args:
        template: Email template string
        data: Data to substitute in template

    Returns:
        Formatted email content
    """
    return template.format(**data)
```

## Common Template Patterns

### Configuration Templates

```python
# Python - configuration template pattern
class ConfigTemplate:
    def __init__(self):
        self.template = {
            "database": {
                "host": "{db_host}",
                "port": "{db_port}",
                "name": "{db_name}"
            },
            "api": {
                "base_url": "{api_url}",
                "timeout": "{api_timeout}"
            }
        }

    def generate_config(self, **kwargs):
        """Generate configuration from template."""
        import json
        config_str = json.dumps(self.template, indent=2)
        return config_str.format(**kwargs)
```

### Report Templates

```python
# Python - report template pattern
class ReportTemplate:
    def __init__(self):
        self.header_template = """
Report: {report_title}
Generated: {generation_date}
Author: {author}
"""
        self.section_template = """
{section_title}
{section_content}
"""
        self.footer_template = """
Total Records: {total_records}
Processing Time: {processing_time}
"""

    def generate_report(self, data):
        """Generate complete report."""
        report = self.header_template.format(**data["header"])

        for section in data["sections"]:
            report += self.section_template.format(**section)

        report += self.footer_template.format(**data["footer"])
        return report
```

## Related Concepts

- [[wiki:variable]] - Variable substitution in templates
- [[wiki:strings]] - String manipulation and formatting
- [[wiki:functions]] - Function templates and patterns
- [[wiki:classes]] - Class templates and inheritance
