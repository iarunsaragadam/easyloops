# camelCase Naming Convention

## What is camelCase?

camelCase ante compound words ni spaces lekunda raayadam, bro, first word lowercase lo start avuthundi, and next words uppercase tho, like a camel’s hump. It’s like naming your bike “ThunderRide” to look mass, shouting “Nenu saitham!” while coding.

## Basic Rules

### 1. Start with Lowercase

First word always lowercase tho start avvali, like a hero’s entry before a big fight.

```python
# Correct
sivuduName = "Sivudu"
heroAge = 30
isMass = True

# Incorrect
SivuduName = "Sivudu"  # Should be sivuduName
HeroAge = 30           # Should be heroAge
```

### 2. Capitalize Subsequent Words

Next words uppercase tho start avvali, like a hero’s second punch

```python
# Correct
firstName = "Sivudu"
lastName = "Raj"
fullName = "Sivudu Raj"
isHeroActive = True
hasMassDeal = True

# Incorrect
firstname = "Sivudu"      # Should be firstName
lastname = "Raj"          # Should be lastName
fullname = "Sivudu Raj"   # Should be fullName
```

## Common Use Cases

### 1. Variable Names

```python
# Good examples
heroName = "Sivudu"
dealEmail = "sivudu@mass.com"
phoneNumber = "123-456-7890"
isLoggedIn = True
hasPower = False
totalDeals = 100
averageRating = 4.5
```

### 2. Function Names

```python
def getHeroInfo():
    pass

def calculateDealCash():
    pass

def isValidDeal(deal):
    pass

def sendMassMessage():
    pass
```

### 3. Method Names

```python
class Hero:
    def getHeroName(self):
        return self.name

    def setHeroName(self, name):
        self.name = name

    def isMassHero(self):
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
let heroName = 'Sivudu';
let isHeroActive = true;

function getHeroInfo() {
  return { name: heroName, active: isHeroActive };
}
```

```java
// Java
String heroName = "Sivudu";
boolean isHeroActive = true;

public String getHeroName() {
    return heroName;
}
```

## Comparison with Other Conventions

### camelCase vs snake_case

```python
# camelCase (JavaScript, Java, C# lo common)
heroName = "Sivudu"
dealEmail = "sivudu@mass.com"
isHeroActive = True

# snake_case (Python, Ruby lo common)
hero_name = "Sivudu"
deal_email = "sivudu@mass.com"
is_hero_active = True
```

### camelCase vs PascalCase

```python
# camelCase (variables, functions)
heroName = "Sivudu"
getHeroInfo = lambda: "info"

# PascalCase (classes, types)
class HeroProfile:
    pass

class DealSystem:
    pass
```

## Best Practices

### 1. Be Descriptive

```python
# Good
heroFirstName = "Sivudu"
totalDealCount = 10
isEmailValid = True

# Avoid
fn = "Sivudu"        # Too short, bro
cnt = 10             # Abbreviation
valid = True         # Too vague
```

### 2. Be Consistent

```python
# Consistent camelCase
heroName = "Sivudu"
heroAge = 30
heroEmail = "sivudu@mass.com"
isHeroActive = True

# Inconsistent (don’t mix conventions)
hero_name = "Sivudu"    # snake_case
heroAge = 30            # camelCase
hero_email = "sivudu@mass.com"  # snake_case
```

### 3. Handle Acronyms

```python
# Good
heroId = "12345"
dealURL = "https://mass.deal.com"
apiKey = "abc123"
httpRequest = "GET"

# Also acceptable
heroID = "12345"
dealUrl = "https://mass.deal.com"
apiKEY = "abc123"
httpREQUEST = "GET"
```

## Common Mistakes to Avoid

### 1. Starting with Uppercase

```python
# Wrong
# Wrong
HeroName = "Sivudu"
IsMass = True

# Correct
heroName = "Sivudu"
isMass = True
```

### 2. Using Spaces or Underscores

```python
# Wrong
hero name = "Sivudu"
hero_name = "Sivudu"

# Correct
heroName = "Sivudu"
```

### 3. Inconsistent Capitalization

```python
# Wrong
heroName = "Sivudu"
lastname = "Raj"          # Should be lastName
dealemail = "sivudu@mass.com"  # Should be dealEmail

# Correct
heroName = "Sivudu"
lastName = "Raj"
dealEmail = "sivudu@mass.com"
```

## Language-Specific Guidelines

### JavaScript

```javascript
// Variables and functions
let heroName = 'Sivudu';
let isHeroActive = true;

function getHeroInfo() {
  return { name: heroName, active: isHeroActive };
}

// Classes (use PascalCase)
class HeroProfile {
  constructor(name) {
    this.heroName = name;
  }
}
```

### Java

```java
// Variables and methods
String heroName = "Sivudu";
boolean isHeroActive = true;

public String getHeroName() {
    return heroName;
}

// Classes (use PascalCase)
public class HeroProfile {
    private String heroName;
}
```

### C#

```csharp
// Variables and methods
String heroName = "Sivudu";
boolean isHeroActive = true;

public String getHeroName() {
    return heroName;
}

// Classes (use PascalCase)
public class HeroProfile {
    private String heroName;
}
```

## Related Concepts

- [[wiki:snake-case]] - Alternative naming convention
- [[wiki:conventions]] - Programming conventions and standards
- [[wiki:variable]] - Variable naming and usage
- [[wiki:functions]] - Function naming conventions
