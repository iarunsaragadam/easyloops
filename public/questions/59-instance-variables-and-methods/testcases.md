# Test Cases for Instance Variables and Methods

## Test Case Structure
This question uses a multi-line input format with banking operations.

### Input Format Pattern:
```
Line 1: n (number of operations)
Lines 2 to n+1: Operations in one of these formats:
  - CREATE account_number owner_name [initial_balance]
  - DEPOSIT account_number amount
  - WITHDRAW account_number amount
  - BALANCE account_number
  - INFO account_number
  - TRANSFER from_account to_account amount
```

### Output Format Pattern:
```
For each operation, one line of output:
  - CREATE: "Account {account_number} created for {owner_name}"
  - DEPOSIT: "Deposited {amount:.2f} to account {account_number}" or "Invalid deposit amount"
  - WITHDRAW: "Withdrew {amount:.2f} from account {account_number}" or "Insufficient funds or invalid amount"
  - BALANCE: "Balance for account {account_number}: {balance:.2f}" or "Account not found"
  - INFO: "Account: {account_number}, Owner: {owner_name}, Balance: {balance:.2f}" or "Account not found"
  - TRANSFER: "Transferred {amount:.2f} from {from_account} to {to_account}" or error messages
```

## Test Case Categories

## Test Case Categories

### Basic Test Cases (input1.txt to input30.txt)
Simple operations to verify basic functionality:

**Test Case 1: Basic Account Operations**
- Create single account with initial balance
- Perform deposit, withdrawal, balance check
- Verify instance variables are properly maintained

**Test Case 2: Multiple Accounts**
- Create multiple accounts with different initial balances
- Perform operations on different accounts
- Verify accounts are independent

**Test Case 3: Transfer Operations**
- Create two accounts
- Perform transfer between accounts
- Verify both accounts are updated correctly

### Edge Cases (input31.txt to input60.txt)
Boundary conditions and special scenarios:

**Test Case 31: Zero Initial Balance**
- Create account with 0.00 initial balance
- Test deposits and withdrawals

**Test Case 32: Invalid Operations**
- Attempt to withdraw more than balance
- Operations on non-existent accounts
- Verify proper error handling

**Test Case 33: Large Numbers**
- Test with maximum allowed amounts (999999.99)
- Verify precision is maintained

**Test Case 34: Minimum Values**
- Test with smallest positive amounts (0.01)
- Verify precision handling

### Performance Test Cases (input61.txt to input80.txt)
Large inputs that test algorithmic efficiency:

**Test Case 61: Many Accounts**
- Create 100+ accounts
- Perform operations on random accounts
- Tests hash table/dictionary performance

**Test Case 62: Many Operations**
- Single account with 200+ operations
- Tests method call overhead and state management

**Test Case 63: Complex Transfer Chains**
- Multiple accounts with chain of transfers
- Tests object interaction scalability

### Complex Scenarios (input81.txt to input100.txt)
Multiple edge cases combined:

**Test Case 81: Mixed Operations**
- Combination of all operation types
- Various edge cases within single test

**Test Case 82: Account Lifecycle**
- Create, use extensively, then final state check
- Tests complete object lifecycle

**Test Case 83: Error Recovery**
- Mix of valid and invalid operations
- Tests error handling doesn't affect valid operations

## Test Case Creation Rules

### Input Validation Rules:
1. Operation count (n) must be positive integer ≤ 1000
2. Account numbers must be 3-10 alphanumeric characters
3. Owner names must be 1-50 characters, no spaces in single word
4. Amounts must be non-negative numbers with max 2 decimal places
5. Amounts must be in range [0.00, 1000000.00]

### Output Format Rules:
1. All monetary amounts formatted to 2 decimal places
2. Exact message format as specified
3. Error messages for invalid operations
4. One line of output per operation
5. No trailing spaces or extra newlines

### Error Handling Requirements:
1. **Invalid amounts**: Negative or zero for deposits/withdrawals
2. **Insufficient funds**: Withdrawal/transfer amount > balance
3. **Account not found**: Operations on non-existent accounts
4. **Invalid transfers**: Transfer to/from non-existent accounts

## Language-Specific Considerations

### Python Considerations:
- Use `self` to access instance variables
- Format floats with `{:.2f}` for monetary values
- Use `float()` for amount parsing
- Dictionary for storing account objects
- Class definition with `__init__` constructor

### Go Considerations:
- Use struct with methods having pointer receivers
- Format floats with `fmt.Sprintf("%.2f", amount)`
- Use `strconv.ParseFloat()` for amount parsing
- Map for storing account objects
- Struct initialization for constructor-like behavior

### JavaScript Considerations:
- Use `this` to access instance variables
- Use `parseFloat()` and `toFixed(2)` for amounts
- Object/Map for storing account instances
- Class syntax with constructor method

## Validation Checklist
- [ ] Input has correct number of operations (line 1)
- [ ] Each operation line has correct format and parameters
- [ ] All account numbers are valid format
- [ ] All amounts are valid (non-negative, proper decimal format)
- [ ] Output format matches specification exactly
- [ ] Error messages are handled correctly
- [ ] Monetary values formatted to 2 decimal places
- [ ] Object state is maintained correctly across operations

## Performance Requirements
- [ ] Should handle 1000 operations efficiently (< 1 second)
- [ ] Memory usage should be reasonable for 1000 accounts
- [ ] Hash table/dictionary lookups should be O(1) average case
- [ ] No unnecessary object creation or copying

## Automated Test Case Generation

```python
import random

def generate_basic_test_case():
    """Generate a basic test case with simple operations"""
    n = random.randint(5, 10)
    operations = []
    
    # Always start with account creation
    operations.append(f"CREATE ACC001 John {random.randint(100, 1000)}.00")
    
    for i in range(1, n):
        op_type = random.choice(["DEPOSIT", "WITHDRAW", "BALANCE", "INFO"])
        if op_type == "DEPOSIT":
            amount = random.randint(1, 500)
            operations.append(f"DEPOSIT ACC001 {amount}.00")
        elif op_type == "WITHDRAW":
            amount = random.randint(1, 200)
            operations.append(f"WITHDRAW ACC001 {amount}.00")
        elif op_type == "BALANCE":
            operations.append("BALANCE ACC001")
        elif op_type == "INFO":
            operations.append("INFO ACC001")
    
    return f"{n}\n" + "\n".join(operations)

def generate_edge_test_case():
    """Generate edge case test scenarios"""
    cases = [
        # Zero balance operations
        "3\nCREATE ACC001 Alice 0.00\nDEPOSIT ACC001 100.00\nWITHDRAW ACC001 150.00",
        
        # Invalid operations
        "4\nCREATE ACC001 Bob 500.00\nWITHDRAW ACC001 600.00\nDEPOSIT ACC001 -50.00\nBALANCE ACC999",
        
        # Transfer operations
        "5\nCREATE ACC001 Alice 1000.00\nCREATE ACC002 Bob 500.00\nTRANSFER ACC001 ACC002 300.00\nBALANCE ACC001\nBALANCE ACC002"
    ]
    return random.choice(cases)

def validate_test_case(input_content, expected_content):
    """Validate that test case follows the required format"""
    lines = input_content.strip().split('\n')
    
    # Check first line is valid number
    try:
        n = int(lines[0])
        if n <= 0 or n > 1000:
            return False, "Invalid operation count"
    except ValueError:
        return False, "First line must be integer"
    
    # Check correct number of operation lines
    if len(lines) != n + 1:
        return False, f"Expected {n+1} lines, got {len(lines)}"
    
    # Validate each operation
    for i in range(1, n + 1):
        parts = lines[i].split()
        if not parts:
            return False, f"Empty operation at line {i+1}"
        
        op = parts[0]
        if op not in ["CREATE", "DEPOSIT", "WITHDRAW", "BALANCE", "INFO", "TRANSFER"]:
            return False, f"Invalid operation: {op}"
        
        # Validate operation-specific parameters
        if op == "CREATE" and len(parts) < 3:
            return False, f"CREATE operation needs at least 3 parameters"
        elif op in ["DEPOSIT", "WITHDRAW", "BALANCE", "INFO"] and len(parts) != 2:
            return False, f"{op} operation needs exactly 2 parameters"
        elif op == "TRANSFER" and len(parts) != 4:
            return False, f"TRANSFER operation needs exactly 4 parameters"
    
    return True, "Valid test case"
```

## Test Case Documentation
Each test case should include:
1. **Purpose**: What specific aspect is being tested
2. **Setup**: Initial conditions and account states
3. **Operations**: Sequence of operations performed
4. **Expected Behavior**: What should happen for each operation
5. **Learning Focus**: Which OOP concepts are demonstrated
