# Variables in Python: Mana Program lo "Box" lantidhi

## Variable Ante Enti?

Variable anedi mana computer memory lo okka **labeled box** lanti vishayam. Ee box lo mana program ki kavalsina data ni store cheyyochu. Ila choodu, mana **Baahubali** movie lo "Shivudu" ante okka name, ala variable kuda okka name tho data ni hold chestundi.

Variable declare chesinappudu kuda alane, memory lo okka space create avtundi!

---

## Key Concepts

### 1. Declaration

Variable declare cheyyadam ante computer ki cheppadam, "Boss, ee name tho okka storage space kaval!"

```python
# Python
age = 25
name = "Siva"
is_student = True
```

**Oka saari commit ayithe, naa maatake nenu vinanu!** Variable declare chesaka, adi program lo fix ayipotundi.

---

### 2. Initialization

Initialization ante variable ki first time value ivvadam. Mana **Arjun Reddy** lanti passion tho variable ki life istham!

```python
# Declaration and initialization in one step
count = 0
message = "preethiii"
```

"Naa prema lo intensity undi, clarity undi!" – Variable initialize chesinappudu clarity ga value assign cheyyaali.

---

### 3. Reassignment

Ressignment ante already unna variable value ni change cheyyadam. Ila choodu, mana **Srimanthudu** lo hero village ni change chesinattu!

```python
count = 0      # Initial assignment
count = 5      # Reassignment
count = count + 1  # Increment by 1
```

"Change kosam fight cheyyali, effort pettali!" – Variable reassignment kuda effort tho new value pettadam.

---

## Variable Naming Rules

### Best Practices

- Variable names descriptive ga undali, enta ante adi choodagane ardam avvali!
- **Snake_case** (first_name) or **camelCase** (firstName) use cheyyandi.
- Letters or underscore (\_) tho start cheyyandi.
  **(dont use numbers or special characters)**
- Reserved keywords vaddu, adi mana **Gabbar Singh** lanti strict police!

"Nenu cheppinattu cheyyi, lekapothe khaidi no. 786 ayipothav!"

### Examples

```python
# Good names
user_age = 25
firstName = "Siva"
total_score = 100
is_logged_in = True

# Avoid these
a = 25          # Too vague, emito teliyadu!
userage = 25    # Reading lo confusion
UserAge = 25    # Consistency ledu
```

---

## Data Types

Variables lo different types of data store cheyyochu:

### Numeric Types

```python
# Integers (whole numbers)
age = 25
year = 2024

# Floating-point (decimal numbers)
height = 5.9
pi = 3.14159
```

"Nenu cheppindi correct eh, doubt vaddu!" – Numeric values correct ga assign cheyyaali.

### Text Types

```python
# Strings (text)
name = "Siva"
message = 'Jai Telangana!'
```

"Naa style eh veru!" – Strings use chesi mana program ki style add cheyyochu.

### Boolean Types

```python
# True/False values
is_student = True
has_permission = False
```

"Nenu okka decision teeskunte, adi final!" – Boolean values kuda final ga True or False eh!

---

## Scope

### Local Variables

Function lone declare chesina variables adi local. Function bayata vaatini access cheyyalemu.

```python
def calculate_area(radius):
    pi = 3.14159  # Local variable
    area = pi * radius * radius
    return area

# pi and area are not accessible outside the function
```

"Idi naa area, naa rules!" – Local variables function area lo matrame rule chestayi.

### Global Variables

Function bayata declare chesina variables global, program antha access cheyyochu.

```python
PI = 3.14159  # Global constant

def calculate_area(radius):
    area = PI * radius * radius  # Uses global PI
    return area
```

"Nenu cheppina rule state antha apply avtundi!" – Global variables program antha apply avtayi.

---

## Common Operations

### 1. Reading Input

```python
# Python
name = input("Naa peru cheppu: ")
age = int(input("Nee vayasu enta? "))
```

Input teeskunte user tho direct connection build avtundi.

### 2. Displaying Output

```python
# Python
print("Hello, " + name)
print(f"Vayasu: {age}")
```

"Nenu cheppina matter style ga untundi!" – Output display cheyadam kuda style tho cheyyali.

### 3. Type Conversion

```python
# Python
age_string = "25"
age_number = int(age_string)  # Convert string to integer

price = 19.99
price_string = str(price)     # Convert float to string
```

"Chinnadi ayina, impact peddadi!" – Type conversion tho small changes chesi big impact create cheyyochu.

---

## Memory Management

### Automatic Memory Management

Python lo memory management automatic ga jarugutundi:

- Variable create ayithe memory allocate avtundi.
- Variable scope nunchi pothe memory free avtundi.

"Naa control lo undi, tension vaddu!" – Python memory management ni control chestundi.

### Variable Lifecycle

1. **Declaration**: Memory reserve avtundi.
2. **Initialization**: First value assign avtundi.
3. **Usage**: Calculations lo use avtundi.
4. **Reassignment**: Value change cheyyochu.
5. **Destruction**: Scope out ayithe memory free avtundi.

"Life is a race, correct ga run cheyyali!" – Variable lifecycle kuda correct ga manage cheyyali.

---

## Best Practices

### 1. Initialize Variables

Variables ki always initial value ivvandi, lekapothe errors vastayi.

```python
# Good
count = 0
name = ""
is_valid = False

# Avoid
# count  # Undefined, error vastundi!
```

"Yuddham start cheyyadaniki mundu, sena siddham cheyyali!" – Variable initialize cheyyakapothe program crash avtundi.

### 2. Use Constants for Fixed Values

```python
# Good
PI = 3.14159
MAX_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

# Avoid
area = 3.14159 * radius * radius  # Magic number
```

"Rules unte follow cheyyali!" – Constants use cheste program clear ga untundi.

### 3. Choose Appropriate Data Types

```python
# Good
age = 25          # Integer for whole numbers
price = 19.99     # Float for decimal numbers
name = "Siva"     # String for text
is_active = True  # Boolean for true/false
```

"Naa choice perfect eh!" – Correct data types choose cheste program perfect ga untundi.

### 4. Use Descriptive Names

```python
# Good
user_age = 25
total_score = 100
is_logged_in = True

# Avoid
a = 25
ts = 100
ill = True
```

"Peru tho ne identity untundi!" – Descriptive names tho program identity clear ga untundi.

---

## Common Mistakes to Avoid

### 1. Using Uninitialized Variables

```python
# Wrong
print(age)  # Error: age is not defined
```

"Plan lekunda action teesukunte, disaster confirm!" – Uninitialized variables use cheste program crash avtundi.

---
