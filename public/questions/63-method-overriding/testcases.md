# Test Cases for Method Overriding

## Test Case Structure
This question uses a multi-line input format to test method overriding concepts with animal hierarchies.

### Input Format Pattern:
```
Line 1: n (integer, number of animals)
Lines 2 to n+1: animal_type name (string string format)
```

### Output Format Pattern:
```
For each animal (in order):
name says: [sound]
I am name, a [animal_type_lowercase]
```

## Test Case 1: Basic Multiple Animals
**Description**: Tests basic method overriding with different animal types
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

## Test Case 2: Single Animal (Edge Case)
**Description**: Tests edge case with only one animal
**Input (`input2.txt`):**
```
1
Dog Max
```
**Expected Output (`expected2.txt`):**
```
Max says: Woof! Woof!
I am Max, a dog
```

## Test Case 3: Many Animals (Performance Test)
**Description**: Tests performance with multiple animals and demonstrates polymorphism
**Input (`input3.txt`):**
```
5
Dog Buddy
Cat Whiskers
Bird Tweety
Dog Rover
Cat Fluffy
```
**Expected Output (`expected3.txt`):**
```
Buddy says: Woof! Woof!
I am Buddy, a dog
Whiskers says: Meow! Meow!
I am Whiskers, a cat
Tweety says: Tweet! Tweet!
I am Tweety, a bird
Rover says: Woof! Woof!
I am Rover, a dog
Fluffy says: Meow! Meow!
I am Fluffy, a cat
```

## Test Case Creation Rules

### Input Validation Rules:
1. First line must be a valid integer n (1 ≤ n ≤ 100)
2. Following n lines must have format: "animal_type name"
3. animal_type must be one of: Dog, Cat, Bird (case-insensitive)
4. name must be a valid string (letters, numbers, spaces allowed)
5. name must be 1-50 characters long

### Output Format Rules:
1. For each animal, output exactly 2 lines
2. First line: "{name} says: {sound}"
3. Second line: "I am {name}, a {animal_type_lowercase}"
4. Sounds are: "Woof! Woof!" (Dog), "Meow! Meow!" (Cat), "Tweet! Tweet!" (Bird)
5. No extra blank lines between animals
6. No trailing whitespace

## Language-Specific Considerations

### Python Considerations:
- Use class inheritance with `class Dog(Animal):`
- Override methods using the same method signature
- Use `super()` for accessing parent class methods if needed
- Handle case-insensitive animal type matching with `.lower()`

### Go Considerations:
- Use interfaces to define common behavior
- Implement interface methods for each struct type
- Use struct embedding for inheritance-like behavior if desired
- Handle string case conversion with `strings.ToLower()`

## Advanced Test Cases

### Edge Cases to Consider:
- Empty input (n=0) - should output nothing
- Single animal of each type
- Animals with multi-word names ("Golden Retriever")
- Case variations in animal types ("dog", "DOG", "Cat")
- Special characters in names (hyphens, apostrophes)

### Performance Considerations:
- Solution should handle up to 100 animals efficiently
- Time complexity should be O(n) where n is number of animals
- Memory complexity should be O(n) for storing animal objects

## Validation Checklist
- [ ] Input has correct number of lines (n+1)
- [ ] First line is valid integer
- [ ] Each animal line has exactly 2 parts (type and name)
- [ ] Animal types are valid (Dog, Cat, Bird)
- [ ] Output format matches exactly
- [ ] Method overriding is demonstrated (different sounds for each type)
- [ ] Polymorphism is working (same method calls, different results)

## Automated Test Case Generation
```python
def generate_test_case(num_animals, animal_types=['Dog', 'Cat', 'Bird']):
    import random
    names = ['Buddy', 'Max', 'Charlie', 'Cooper', 'Rocky', 'Whiskers', 'Shadow', 'Tweety', 'Robin', 'Sparrow']
    
    animals = []
    for i in range(num_animals):
        animal_type = random.choice(animal_types)
        name = random.choice(names)
        animals.append(f"{animal_type} {name}")
    
    input_content = f"{num_animals}\n" + "\n".join(animals)
    
    # Generate expected output
    sound_map = {'Dog': 'Woof! Woof!', 'Cat': 'Meow! Meow!', 'Bird': 'Tweet! Tweet!'}
    expected_lines = []
    
    for animal in animals:
        animal_type, name = animal.split(' ', 1)
        sound = sound_map[animal_type]
        expected_lines.append(f"{name} says: {sound}")
        expected_lines.append(f"I am {name}, a {animal_type.lower()}")
    
    expected_content = "\n".join(expected_lines)
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    # Validate input format
    assert len(lines) == n + 1, f"Expected {n+1} lines, got {len(lines)}"
    
    for i in range(1, n + 1):
        parts = lines[i].split(' ', 1)
        assert len(parts) == 2, f"Line {i+1} should have animal_type and name"
        animal_type, name = parts
        assert animal_type in ['Dog', 'Cat', 'Bird'], f"Invalid animal type: {animal_type}"
        assert 1 <= len(name) <= 50, f"Name length should be 1-50 characters"
    
    # Validate expected output format
    expected_lines = expected_content.split('\n')
    assert len(expected_lines) == n * 2, f"Expected {n*2} output lines, got {len(expected_lines)}"
    
    return True
```
