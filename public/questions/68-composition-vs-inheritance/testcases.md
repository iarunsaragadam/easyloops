# Test Cases for Composition vs Inheritance

## Test Case Structure
This question uses a **multi-line command-based input format** with various commands to demonstrate composition and inheritance patterns.

### Input Format Pattern:
```
CREATE <vehicle_type> <id> <brand> <year> <engine_type> <horsepower> <fuel_type>
START <id>
STOP <id>
INFO <id>
FUEL_COST <id> <distance>
```

### Output Format Pattern:
```
Created <vehicle_type> <id>
Vehicle <id> started. Engine started: <engine_type> engine
Vehicle <id> stopped. Engine stopped: <engine_type> engine
<id>: <year> <brand> <vehicle_type> (running/stopped)
Fuel cost for <distance> miles: $<cost>
```

## Test Case Categories

### Basic Test Cases (input1.txt - input30.txt)
Simple scenarios testing core functionality:
- Creating single vehicles of each type
- Basic start/stop operations
- Information retrieval
- Simple fuel cost calculations

### Edge Cases (input31.txt - input60.txt)
Boundary conditions and special scenarios:
- Multiple vehicles with same operations
- Starting already running vehicles
- Stopping already stopped vehicles
- Different engine types and fuel types
- Extreme horsepower values
- Long distances for fuel calculation

### Performance Test Cases (input61.txt - input90.txt)
Large-scale scenarios testing efficiency:
- Managing 100+ vehicles simultaneously
- Complex command sequences
- Bulk operations on multiple vehicles
- Memory and processing efficiency tests

### Complex Scenarios (input91.txt - input100.txt)
Advanced combinations demonstrating full system:
- Mixed vehicle types with various operations
- Complete fleet management workflows
- Real-world usage patterns
- Integration of all features

## Sample Test Cases

### Test Case 1: Basic Car Creation and Operation
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

### Test Case 2: Multiple Vehicle Types
**Input (`input2.txt`):**
```
CREATE Car C1 Honda 2021 V4 140 gasoline
CREATE Truck T1 Ford 2019 V8 320 diesel
CREATE Motorcycle M1 Yamaha 2022 V4 90 gasoline
START C1
START T1
START M1
FUEL_COST C1 50
FUEL_COST T1 50
FUEL_COST M1 50
```
**Expected Output (`expected2.txt`):**
```
Created Car C1
Created Truck T1
Created Motorcycle M1
Vehicle C1 started. Engine started: V4 engine
Vehicle T1 started. Engine started: V8 engine
Vehicle M1 started. Engine started: V4 engine
Fuel cost for 50 miles: $7.0
Fuel cost for 50 miles: $49.4
Fuel cost for 50 miles: $4.2
```

### Test Case 3: Edge Case - Already Running Vehicle
**Input (`input3.txt`):**
```
CREATE Car C1 BMW 2020 V6 200 gasoline
START C1
START C1
STOP C1
STOP C1
```
**Expected Output (`expected3.txt`):**
```
Created Car C1
Vehicle C1 started. Engine started: V6 engine
Vehicle C1 is already running
Vehicle C1 stopped. Engine stopped: V6 engine
Vehicle C1 is already stopped
```

## Test Case Creation Rules

### Input Validation Rules:
1. Vehicle types must be: Car, Truck, or Motorcycle
2. Engine types must be: V4, V6, V8, or Electric
3. Fuel types must be: gasoline, diesel, or electric
4. Horsepower must be 50-500
5. Years must be 1900-2030
6. Distance must be 1-1000 miles
7. Vehicle IDs must be unique and 1-10 characters

### Output Format Rules:
1. Creation messages: "Created <vehicle_type> <id>"
2. Start messages: "Vehicle <id> started. Engine started: <engine_type> engine"
3. Stop messages: "Vehicle <id> stopped. Engine stopped: <engine_type> engine"
4. Already running: "Vehicle <id> is already running"
5. Already stopped: "Vehicle <id> is already stopped"
6. Info format: "<id>: <year> <brand> <vehicle_type> (running/stopped)"
7. Fuel cost format: "Fuel cost for <distance> miles: $<cost>"

### Fuel Efficiency Rules:
- Base efficiency by engine type: V4=30mpg, V6=25mpg, V8=20mpg, Electric=100mpg
- Efficiency reduced by horsepower/20
- Car: 10% more efficient (×0.9)
- Truck: 30% less efficient (×1.3)
- Motorcycle: 40% more efficient (×0.6)
- Fuel prices: gasoline=$3.50, diesel=$3.80, electric=$0.12

## Language-Specific Considerations

### Python Considerations:
- Use class inheritance for Vehicle → Car/Truck/Motorcycle
- Use composition for Vehicle containing Engine
- Handle EOF gracefully with try/except EOFError
- Use round(cost, 2) for fuel cost precision

### Go Considerations:
- Use struct embedding for inheritance-like behavior
- Use composition with Engine struct inside Vehicle
- Handle input parsing with bufio.Scanner
- Format fuel costs to 2 decimal places

## Validation Checklist
- [ ] All vehicle types create correctly
- [ ] Engine composition works properly
- [ ] Inheritance behavior differs by vehicle type
- [ ] Start/stop state management works
- [ ] Fuel cost calculations are accurate
- [ ] Edge cases handled properly
- [ ] Output format matches exactly
- [ ] Performance acceptable for large inputs

## Automated Test Case Generation
```python
import random

def generate_test_case(case_type="basic"):
    vehicles = ["Car", "Truck", "Motorcycle"]
    brands = ["Toyota", "Ford", "Honda", "BMW", "Yamaha"]
    engines = ["V4", "V6", "V8", "Electric"]
    fuels = ["gasoline", "diesel", "electric"]
    
    commands = []
    
    if case_type == "basic":
        # Simple single vehicle test
        v_type = random.choice(vehicles)
        v_id = f"{v_type[0]}{random.randint(1,9)}"
        brand = random.choice(brands)
        year = random.randint(2015, 2025)
        engine = random.choice(engines)
        hp = random.randint(100, 300)
        fuel = random.choice(fuels)
        
        commands.extend([
            f"CREATE {v_type} {v_id} {brand} {year} {engine} {hp} {fuel}",
            f"START {v_id}",
            f"INFO {v_id}",
            f"FUEL_COST {v_id} {random.randint(50, 200)}"
        ])
    
    elif case_type == "performance":
        # Large number of vehicles
        for i in range(100):
            v_type = random.choice(vehicles)
            v_id = f"V{i}"
            brand = random.choice(brands)
            year = random.randint(2000, 2025)
            engine = random.choice(engines)
            hp = random.randint(80, 400)
            fuel = random.choice(fuels)
            
            commands.append(f"CREATE {v_type} {v_id} {brand} {year} {engine} {hp} {fuel}")
            
        # Add some operations
        for i in range(0, 100, 10):
            commands.extend([
                f"START V{i}",
                f"FUEL_COST V{i} {random.randint(100, 500)}"
            ])
    
    return "\n".join(commands)

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split("\n")
    for line in lines:
        parts = line.split()
        assert len(parts) >= 2
        command = parts[0]
        assert command in ["CREATE", "START", "STOP", "INFO", "FUEL_COST"]
        
        if command == "CREATE":
            assert len(parts) == 8
            assert parts[1] in ["Car", "Truck", "Motorcycle"]
            assert parts[5] in ["V4", "V6", "V8", "Electric"]
            assert parts[7] in ["gasoline", "diesel", "electric"]
```
