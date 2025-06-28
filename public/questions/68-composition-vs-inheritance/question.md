# Composition vs Inheritance

## Problem Statement

You need to implement a vehicle fleet management system that demonstrates both composition and inheritance design patterns. The system manages different types of vehicles (Car, Truck, Motorcycle) where each vehicle has an engine component.

**Key Design Patterns:**
- **Composition**: Vehicle HAS-A Engine (engine is a component of vehicle)
- **Inheritance**: Car/Truck/Motorcycle IS-A Vehicle (specialized vehicle types)

Your program should process commands to create vehicles, start/stop them, get information, and calculate fuel costs. Different vehicle types have different fuel efficiency characteristics.

## Input Format

The input consists of multiple lines with commands:
```
CREATE <vehicle_type> <id> <brand> <year> <engine_type> <horsepower> <fuel_type>
START <id>
STOP <id>
INFO <id>
FUEL_COST <id> <distance>
```

**Command Details:**
- `CREATE`: Creates a new vehicle with specified properties
- `START`: Starts the vehicle's engine
- `STOP`: Stops the vehicle's engine
- `INFO`: Displays vehicle information and status
- `FUEL_COST`: Calculates fuel cost for traveling specified distance

## Test Cases
**Input (`input1.txt`):**
```
CREATE Car C1 Toyota 2020 V4 150 gasoline
START C1
INFO C1
FUEL_COST C1 100
```

**Expected Output (`expected1.txt`):**
```
Created Car C1
Vehicle C1 started. Engine started: V4 engine
C1: 2020 Toyota Car (running)
Fuel cost for 100 miles: $14.0
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand when to use composition vs inheritance
- Implement HAS-A relationships using composition
- Implement IS-A relationships using inheritance
- Practice object-oriented design principles
- Learn to model real-world systems with appropriate design patterns

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    class Engine:  # Component for composition
        def __init__(self, engine_type, horsepower, fuel_type):
            # Initialize engine properties
            pass
        
        def start(self):
            # Start engine logic
            pass
    
    class Vehicle:  # Base class for inheritance
        def __init__(self, vehicle_id, brand, year, engine):
            self.engine = engine  # Composition: Vehicle HAS-A Engine
        
        def start(self):
            # Base vehicle start behavior
            pass
    
    class Car(Vehicle):  # Inheritance: Car IS-A Vehicle
        def calculate_fuel_cost(self, distance):
            # Car-specific fuel efficiency
            pass
    
    # Process commands and manage vehicle fleet
```

### Go Example Structure:
```go
type Engine struct {
    Type       string
    Horsepower int
    FuelType   string
    Running    bool
}

type Vehicle struct {
    ID     string
    Brand  string
    Year   int
    Engine Engine  // Composition: Vehicle HAS-A Engine
}

type Car struct {
    Vehicle  // Inheritance: Car IS-A Vehicle
}

func solve() {
    // Process commands and manage vehicle fleet
}
```

## Constraints
- Vehicle IDs are unique strings (1-10 characters)
- Years are between 1900-2030
- Engine horsepower is between 50-500
- Distance for fuel cost calculation is between 1-1000 miles
- Vehicle types: Car, Truck, Motorcycle
- Engine types: V4, V6, V8, Electric
- Fuel types: gasoline, diesel, electric

## Hints
- Use composition to model the Engine as a component of Vehicle
- Use inheritance to create specialized vehicle types that share common behavior
- Different vehicle types should have different fuel efficiency multipliers
- Remember to track vehicle state (running/stopped) for proper behavior
- Calculate fuel costs based on engine efficiency and vehicle type characteristics
