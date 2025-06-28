# Instance Variables and Methods

## Problem Statement

Write a program that demonstrates the use of instance variables and methods through a bank account management system. You will create a `BankAccount` class with instance variables to store account information and methods to perform banking operations.

Your program should:

1. **Define a BankAccount class** with the following instance variables:
   - `account_number` (string): Unique identifier for the account
   - `owner_name` (string): Name of the account holder
   - `balance` (float): Current account balance

2. **Implement the following instance methods:**
   - `__init__(account_number, owner_name, initial_balance)`: Constructor to initialize the account
   - `deposit(amount)`: Add money to the account (only positive amounts)
   - `withdraw(amount)`: Remove money from the account (if sufficient funds exist)
   - `get_balance()`: Return the current balance
   - `get_info()`: Return formatted account information
   - `transfer_to(other_account, amount)`: Transfer money to another account

3. **Process banking operations** based on input commands and output the results of each operation.

The program demonstrates key object-oriented programming concepts:
- **Encapsulation**: Instance variables store object state
- **Methods**: Functions that operate on instance variables
- **Object Interaction**: Objects communicating through method calls

## Input Format

The input consists of multiple lines:
```
Line 1: n (number of operations)
Lines 2 to n+1: Operations in the format:
  - CREATE account_number owner_name [initial_balance]
  - DEPOSIT account_number amount
  - WITHDRAW account_number amount
  - BALANCE account_number
  - INFO account_number
  - TRANSFER from_account to_account amount
```

## Test Cases
**Input (`input1.txt`):**
```
5
CREATE ACC001 John 1000.00
DEPOSIT ACC001 500.00
WITHDRAW ACC001 200.00
BALANCE ACC001
INFO ACC001
```

**Expected Output (`expected1.txt`):**
```
Account ACC001 created for John
Deposited 500.00 to account ACC001
Withdrew 200.00 from account ACC001
Balance for account ACC001: 1300.00
Account: ACC001, Owner: John, Balance: 1300.00
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input1.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected1.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand how to define and use instance variables in a class
- Learn to implement instance methods that operate on object state
- Practice object-oriented programming principles (encapsulation)
- Understand the difference between class definition and object instantiation
- Learn to manage object interactions and method calls
- Practice input parsing and command processing
- Understand constructor usage and object initialization

## Implementation Guidelines

### Python Example Structure:
```python
class BankAccount:
    def __init__(self, account_number, owner_name, initial_balance=0.0):
        # Initialize instance variables
        self.account_number = account_number
        self.owner_name = owner_name
        self.balance = float(initial_balance)
    
    def deposit(self, amount):
        # Instance method using instance variables
        if amount > 0:
            self.balance += amount
            return True
        return False
    
    def get_info(self):
        # Instance method returning formatted string
        return f"Account: {self.account_number}, Owner: {self.owner_name}, Balance: {self.balance:.2f}"

def solve():
    n = int(input())
    accounts = {}
    
    for _ in range(n):
        command = input().strip().split()
        # Process commands and create/manipulate BankAccount objects
```

### Go Example Structure:
```go
type BankAccount struct {
    AccountNumber string
    OwnerName     string
    Balance       float64
}

func (ba *BankAccount) Deposit(amount float64) bool {
    if amount > 0 {
        ba.Balance += amount
        return true
    }
    return false
}

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    
    accounts := make(map[string]*BankAccount)
    // Process commands and create/manipulate BankAccount objects
}
```

## Constraints
- Account numbers are unique strings (3-10 characters)
- Owner names are non-empty strings (1-50 characters)
- Initial balance and transaction amounts are non-negative numbers
- Maximum number of operations: 1000
- Balance precision: 2 decimal places
- All monetary amounts are in the range [0.00, 1000000.00]
- Operations are processed in the order they appear in the input

## Hints
- **Instance Variables**: Store data specific to each object instance
- **Constructor**: Use `__init__` in Python or struct initialization in Go to set up initial state
- **Method Access**: Instance methods can access and modify instance variables through `self` (Python) or receiver (Go)
- **Object Storage**: Use a dictionary/map to store multiple account objects by account number
- **Error Handling**: Check for valid operations (positive amounts, sufficient funds, existing accounts)
- **String Formatting**: Use proper formatting for monetary values (2 decimal places)
- **Command Processing**: Split input lines and use conditional logic to handle different operation types
