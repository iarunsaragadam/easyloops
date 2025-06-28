# Method Overriding

## Problem Statement

Create a program that demonstrates method overriding using an animal hierarchy. Your program should implement a base `Animal` class and several derived classes that override the parent class methods to provide specialized behavior.

Your program should:

1. Read the number of animals to create from input
2. For each animal, read the animal type and name
3. Create appropriate animal objects based on the type
4. Call the overridden methods to demonstrate polymorphic behavior
5. Output the results showing how each animal exhibits its specific behavior

The animal types to support are:
- **Dog**: Makes "Woof! Woof!" sounds
- **Cat**: Makes "Meow! Meow!" sounds  
- **Bird**: Makes "Tweet! Tweet!" sounds

Each animal should have:
- A `make_sound()` method that returns the animal's specific sound
- An `introduce()` method that returns a self-introduction

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of animals, 1 ≤ n ≤ 100)
Lines 2 to n+1: animal_type name (where animal_type is Dog, Cat, or Bird)
```

## Test Cases

**Input (`input.txt`):**
```
3
Dog Buddy
Cat Whiskers
Bird Tweety
```

**Expected Output (`expected.txt`):**
```
Buddy says: Woof! Woof!
I am Buddy, a dog
Whiskers says: Meow! Meow!
I am Whiskers, a cat
Tweety says: Tweet! Tweet!
I am Tweety, a bird
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand method overriding in object-oriented programming
- Learn how derived classes can provide specialized implementations
- Practice polymorphism - same method call, different behavior
- Understand inheritance relationships between classes
- Learn to design class hierarchies effectively
- Practice reading structured input and processing objects

## Implementation Guidelines

### Python Example Structure:
```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def make_sound(self):
        # Base implementation
        pass
    
    def introduce(self):
        # Base implementation
        pass

class Dog(Animal):
    def make_sound(self):
        # Override with dog-specific behavior
        pass
    
    def introduce(self):
        # Override with dog-specific behavior
        pass

# Create similar classes for Cat and Bird

def solve():
    n = int(input())
    animals = []
    
    for _ in range(n):
        line = input().strip()
        animal_type, name = line.split(' ', 1)
        
        # Create appropriate animal object based on type
        # Add to animals list
    
    # Call overridden methods and output results
```

### Go Example Structure:
```go
type Animal interface {
    MakeSound() string
    Introduce() string
}

type Dog struct {
    Name string
}

func (d Dog) MakeSound() string {
    // Dog-specific implementation
}

func (d Dog) Introduce() string {
    // Dog-specific implementation
}

// Create similar structs for Cat and Bird

func solve() {
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    var animals []Animal
    
    for i := 0; i < n; i++ {
        scanner.Scan()
        parts := strings.Fields(scanner.Text())
        animalType := parts[0]
        name := strings.Join(parts[1:], " ")
        
        // Create appropriate animal based on type
        // Add to animals slice
    }
    
    // Call methods and output results
}
```

## Constraints
- 1 ≤ n ≤ 100 (number of animals)
- Animal names contain only letters, numbers, and spaces
- Animal names are between 1 and 50 characters long
- Animal types are case-insensitive (Dog, dog, DOG are all valid)
- Each animal must override both `make_sound()` and `introduce()` methods
- Output must match the exact format specified

## Hints
- Start by designing your base Animal class with virtual/abstract methods
- Each derived class should override the base methods to provide specific behavior
- Use polymorphism - store different animal types in the same collection
- Pay attention to the exact output format, including punctuation and capitalization
- Consider how to handle case-insensitive animal type matching
- Remember that method overriding allows the same method call to behave differently based on the object type
