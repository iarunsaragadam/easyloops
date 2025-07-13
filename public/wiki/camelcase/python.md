# camelCase Naming Convention

## What is camelCase?

camelCase is a naming convention where compound words are written together without spaces, with the first word starting with a lowercase letter and subsequent words starting with uppercase letters. The name comes from the "humps" created by the capital letters, resembling a camel's back.

## Basic Rules

### 1. Start with Lowercase

The first word always starts with a lowercase letter.

```python
# Correct
firstName = "John"
userAge = 25
isValid = True

# Incorrect
FirstName = "John"  # Should be firstName
UserAge = 25        # Should be userAge
```

### 2. Capitalize Subsequent Words

Each additional word starts with an uppercase letter.

```python
# Correct
firstName = "John"
lastName = "Doe"
fullName = "John Doe"
isUserActive = True
hasValidEmail = True

# Incorrect
firstname = "John"      # Should be firstName
lastname = "Doe"        # Should be lastName
fullname = "John Doe"   # Should be fullName
```

## Common Use Cases

### 1. Variable Names

```python
# Good examples
userName = "alice"
emailAddress = "alice@example.com"
phoneNumber = "123-456-7890"
isLoggedIn = True
hasPermission = False
totalScore = 100
averageRating = 4.5
```

### 2. Function Names

```python
def getUserInfo():
    pass

def calculateTotalPrice():
    pass

def isValidEmail(email):
    pass

def sendNotificationMessage():
    pass
```

### 3. Method Names

```python
class User:
    def getUserName(self):
        return self.name

    def setUserName(self, name):
        self.name = name

    def isValidUser(self):
        return self.age >= 18
```

## When to Use camelCase

### 1. Variables and Functions

- Local variables
- Function parameters
- Function names
- Method names

### 2. Object-Oriented Programming

- Method names
- Property names
- Instance variables

### 3. JavaScript/Java/C# Conventions

```javascript
// JavaScript
let userName = 'John';
let isUserActive = true;

function getUserInfo() {
  return { name: userName, active: isUserActive };
}
```

```java
// Java
String userName = "John";
boolean isUserActive = true;

public String getUserName() {
    return userName;
}
```

## Comparison with Other Conventions

### camelCase vs snake_case

```python
# camelCase (common in JavaScript, Java, C#)
firstName = "John"
lastName = "Doe"
isUserActive = True

# snake_case (common in Python, Ruby)
first_name = "John"
last_name = "Doe"
is_user_active = True
```

### camelCase vs PascalCase

```python
# camelCase (variables, functions)
userName = "John"
getUserInfo = lambda: "info"

# PascalCase (classes, types)
class UserInfo:
    pass

class DatabaseConnection:
    pass
```

## Best Practices

### 1. Be Descriptive

```python
# Good
userFirstName = "John"
totalItemCount = 10
isEmailValid = True

# Avoid
fn = "John"           # Too short
cnt = 10              # Abbreviation
valid = True          # Too vague
```

### 2. Be Consistent

```python
# Consistent camelCase
userName = "John"
userAge = 25
userEmail = "john@example.com"
isUserActive = True

# Inconsistent (don't mix conventions)
user_name = "John"    # snake_case
userAge = 25          # camelCase
user_email = "john@example.com"  # snake_case
```

### 3. Handle Acronyms

```python
# Good
userId = "12345"
userURL = "https://example.com"
apiKey = "abc123"
httpRequest = "GET"

# Also acceptable
userID = "12345"
userUrl = "https://example.com"
apiKEY = "abc123"
httpREQUEST = "GET"
```

## Common Mistakes to Avoid

### 1. Starting with Uppercase

```python
# Wrong
FirstName = "John"
UserName = "john"
IsValid = True

# Correct
firstName = "John"
userName = "john"
isValid = True
```

### 2. Using Spaces or Underscores

```python
# Wrong
first name = "John"
first_name = "John"
user name = "john"

# Correct
firstName = "John"
userName = "john"
```

### 3. Inconsistent Capitalization

```python
# Wrong
firstName = "John"
lastname = "Doe"      # Should be lastName
fullName = "John Doe"
emailaddress = "john@example.com"  # Should be emailAddress

# Correct
firstName = "John"
lastName = "Doe"
fullName = "John Doe"
emailAddress = "john@example.com"
```

## Language-Specific Guidelines

### JavaScript

```javascript
// Variables and functions
let userName = 'John';
let isUserActive = true;

function getUserInfo() {
  return { name: userName, active: isUserActive };
}

// Classes (use PascalCase)
class UserInfo {
  constructor(name) {
    this.userName = name;
  }
}
```

### Java

```java
// Variables and methods
String userName = "John";
boolean isUserActive = true;

public String getUserName() {
    return userName;
}

// Classes (use PascalCase)
public class UserInfo {
    private String userName;
}
```

### C#

```csharp
// Variables and methods
string userName = "John";
bool isUserActive = true;

public string GetUserName() {
    return userName;
}

// Classes (use PascalCase)
public class UserInfo {
    private string userName;
}
```

## Related Concepts

- [[wiki:snake-case]] - Alternative naming convention
- [[wiki:conventions]] - Programming conventions and standards
- [[wiki:variable]] - Variable naming and usage
- [[wiki:functions]] - Function naming conventions
