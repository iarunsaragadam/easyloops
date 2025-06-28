# Test Cases for Class relationships

## Test Case Structure
This question uses a multi-line input format with various command types.

### Input Format Pattern:
```
Line 1: n (number of operations)
Lines 2 to n+1: operations (commands with parameters)
```

### Output Format Pattern:
```
One line per query operation result
```

## Test Case 1: Basic Functionality
**Purpose**: Test basic employee, department creation and querying
**Input (`input.txt`):**
```
5
ADD_EMPLOYEE E001 Alice
ADD_DEPARTMENT D001 Engineering
ASSIGN_TO_DEPT E001 D001
QUERY_DEPT_SIZE D001
QUERY_SUBORDINATES E001
```
**Expected Output (`expected.txt`):**
```
1
0
```
**Explanation**: 
- Creates employee Alice and Engineering department
- Assigns Alice to Engineering (department size = 1)
- Alice has no subordinates (subordinate count = 0)

## Test Case 2: Edge Case - Non-existent Entities
**Purpose**: Test querying non-existent departments/employees
**Input (`input2.txt`):**
```
1
QUERY_DEPT_SIZE D999
```
**Expected Output (`expected2.txt`):**
```
0
```
**Explanation**: Querying a non-existent department should return 0

## Test Case 3: Performance Test - Large Scale Operations
**Purpose**: Test system performance with many entities and operations
**Input (`input3.txt`):**
```
469
ADD_EMPLOYEE E000 Employee0
ADD_EMPLOYEE E001 Employee1
...
[100 employees, 10 departments, 20 projects, assignments, queries]
```
**Expected Output (`expected3.txt`):**
```
10
10
...
[40 query results]
```
**Explanation**: 
- Creates 100 employees, 10 departments, 20 projects
- Establishes complex relationships and hierarchies
- Tests query performance on large datasets
- Should complete efficiently with proper data structures

## Test Case Creation Rules

### Input Validation Rules:
1. **Command Format**: Each command follows the pattern `COMMAND_TYPE param1 param2 ...`
2. **Entity IDs**: Must be unique strings for each entity type
3. **Names**: Single words without spaces
4. **Operation Order**: Entities must be created before being referenced
5. **Query Timing**: Queries can only be performed after relevant entities exist

### Output Format Rules:
1. **Query Results Only**: Only query operations produce output
2. **One Result Per Line**: Each query result on a separate line
3. **Integer Results**: All query results are non-negative integers
4. **No Extra Output**: No debugging or status messages in final output

## Advanced Test Scenarios Covered

### Relationship Types Tested:
1. **Composition**: Department-Employee (employee belongs to one department)
2. **Composition**: Manager-Subordinate (hierarchical relationships)
3. **Association**: Project-Employee (many-to-many relationship)
4. **Aggregation**: Company contains all entity types

### Query Complexity:
1. **Department Size**: Count employees in department (tests composition)
2. **Project Size**: Count team members in project (tests association)
3. **Subordinate Count**: Count direct reports (tests hierarchical composition)

### Edge Cases:
1. **Non-existent Entities**: Queries on entities that don't exist
2. **Empty Relationships**: Entities with no associated entities
3. **Complex Hierarchies**: Multi-level manager-subordinate relationships

## Language-Specific Considerations

### Python Considerations:
- Use dictionaries for O(1) entity lookup by ID
- Use lists for maintaining relationships
- Implement bidirectional relationships properly
- Handle None/empty cases gracefully

### Go Considerations:
- Use maps for entity storage
- Use slices for relationship lists
- Handle pointer relationships carefully
- Implement proper memory management

## Performance Requirements

### Time Complexity:
- **Entity Creation**: O(1) per operation
- **Assignment Operations**: O(1) per operation  
- **Query Operations**: O(1) per query
- **Overall**: O(n) where n is number of operations

### Space Complexity:
- **Entity Storage**: O(e + d + p) for employees, departments, projects
- **Relationship Storage**: O(r) where r is number of relationships
- **Overall**: O(n) where n is total entities and relationships

## Validation Checklist
- [ ] All commands parse correctly
- [ ] Entity creation works properly
- [ ] Assignment operations establish correct relationships
- [ ] Queries return accurate counts
- [ ] Non-existent entity queries return 0
- [ ] Performance test completes within time limits
- [ ] Memory usage remains reasonable
- [ ] Output format matches exactly

## Common Implementation Pitfalls
1. **Forgetting Bidirectional Updates**: When setting manager-subordinate relationships
2. **Entity Lookup Errors**: Not checking if entities exist before operations
3. **Duplicate Relationships**: Adding the same relationship multiple times
4. **Inefficient Queries**: Using linear search instead of proper data structures
5. **Memory Leaks**: Not managing object references properly (language-specific)
