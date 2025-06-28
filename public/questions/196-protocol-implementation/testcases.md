# Test Cases for Protocol Implementation

## Test Case Structure
This question uses a multi-line input format with protocol messages.

### Input Format Pattern:
```
Line 1: N (number of messages, 1 ≤ N ≤ 1000)
Lines 2 to N+1: Protocol messages in format <LENGTH>:<TYPE>:<DATA>
```

### Output Format Pattern:
```
Line 1 to N: Responses for each message
- Response messages for commands (format: NNNN:R:id:data)
- "OK" for valid acknowledgments
- "ACK" for responses received
- "ERROR: <description>" for protocol violations
```

## Test Case 1: Basic Protocol Flow
**Input (`input.txt`):**
```
3
0015:C:001:PING
0010:A:001
0015:C:002:TIME
```
**Expected Output (`expected.txt`):**
```
0015:R:001:PONG
OK
0021:R:002:1234567890
```
**Description:** Tests basic command-response-acknowledgment flow with PING and TIME commands.

## Test Case 2: Edge Cases and Error Handling
**Input (`input2.txt`):**
```
5
0014:C:001:INVALID
0009:A:002
0015:C:003:PING
0015:X:004:TEST
0015:C:005:PING
```
**Expected Output (`expected2.txt`):**
```
ERROR: Unknown command
ERROR: ACK mismatch
ERROR: Session in error state
ERROR: Unknown message type
ERROR: Session in error state
```
**Description:** Tests error handling for invalid commands, mismatched ACKs, unknown message types, and error state propagation.

## Test Case 3: Complex Protocol Scenarios
**Input (`input3.txt`):**
```
10
0018:C:001:ECHO:Hello
0010:A:001
0015:C:002:PING
0010:A:002
0015:C:003:TIME
0010:A:003
0022:C:004:ECHO:World123
0010:A:004
0008:C:005:
0015:C:006:PING
```
**Expected Output (`expected3.txt`):**
```
0018:R:001:Hello
OK
0015:R:002:PONG
OK
0021:R:003:1234567890
OK
0022:R:004:World123
OK
ERROR: Invalid command format
ERROR: Session in error state
```
**Description:** Tests ECHO command, proper state transitions, empty data handling, and error recovery.

## Test Case Creation Rules

### Input Validation Rules:
1. **Message Format**: Must follow `NNNN:T:DATA` pattern exactly
2. **Length Field**: Must be 4 digits, match actual message length
3. **Type Field**: Must be one of 'C', 'R', 'A'
4. **Length Constraints**: 6 ≤ length ≤ 9999 bytes
5. **Command Format**: Commands must have format `id:payload` where id is 3 digits
6. **State Consistency**: ACKs only valid in WAITING_ACK state

### Output Format Rules:
1. **Responses**: Format `NNNN:R:id:data` where NNNN is calculated length
2. **Acknowledgments**: Output "OK" for valid ACKs
3. **Response ACKs**: Output "ACK" when receiving responses
4. **Errors**: Format "ERROR: <specific description>"
5. **State Persistence**: Error state affects all subsequent messages

### Message Length Calculation:
- For response `NNNN:R:123:PONG`: length = 4 + 1 + 1 + 1 + 3 + 1 + 4 = 15
- Length field includes itself in the count
- Use string length of final message for validation

## Language-Specific Considerations

### Python Considerations:
- Use `input().strip()` to handle line endings
- String slicing for parsing: `message[:4]`, `message[5]`, `message[7:]`
- Format response length: `f"{length:04d}:R:{data}"`
- Handle integer conversion with try-catch for validation
- Use dictionaries for state management and return values

### Go Considerations:
- Use `fmt.Scan()` for input reading
- String manipulation with `strings.Split()` and indexing
- Format response: `fmt.Sprintf("%04d:R:%s", length, data)`
- Struct for state management: `type State struct { ... }`
- Error handling with custom error types

### JavaScript Considerations:
- Use `readline` or similar for input processing
- String parsing with `substring()` and `split()`
- Template literals for response formatting: \`${length.padStart(4, '0')}:R:${data}\`
- Object for state management
- Number validation with `isNaN()` checks

## Performance Test Cases

### Large Message Sequences (for timeout testing):
- 1000 messages with mixed types
- Long ECHO payloads (up to 100 characters)
- Rapid state transitions
- Complex error scenarios that require full message parsing

### Memory Efficiency Tests:
- Minimal state storage (only current state and last command ID)
- No message history retention beyond current session
- Efficient string processing without unnecessary copying

## Validation Checklist
- [ ] Message format parsing handles all edge cases
- [ ] Length validation prevents buffer overflows
- [ ] State machine correctly tracks protocol state
- [ ] Error conditions properly detected and reported
- [ ] ACK validation matches command IDs correctly
- [ ] Response generation calculates lengths accurately
- [ ] Performance acceptable for maximum input size (1000 messages)
- [ ] Memory usage stays within limits (256 MB)

## Automated Test Case Generation
```python
def generate_test_case(num_messages=10, include_errors=True):
    """Generate a test case with specified characteristics"""
    messages = []
    expected = []
    state = "IDLE"
    last_cmd_id = None
    
    for i in range(num_messages):
        if state == "IDLE":
            # Generate command
            cmd_id = f"{i+1:03d}"
            cmd_type = random.choice(["PING", "TIME", "ECHO:test"])
            msg = f"{15+len(cmd_type)}:C:{cmd_id}:{cmd_type}"
            messages.append(msg)
            # Calculate expected response...
        elif state == "WAITING_ACK":
            # Generate ACK
            if include_errors and random.random() < 0.1:
                # Generate wrong ACK for error testing
                wrong_id = f"{random.randint(1,999):03d}"
                msg = f"0010:A:{wrong_id}"
            else:
                msg = f"0010:A:{last_cmd_id}"
            messages.append(msg)
    
    return "\n".join([str(len(messages))] + messages), "\n".join(expected)

def validate_test_case(input_content, expected_content):
    """Validate that test case follows protocol rules"""
    lines = input_content.strip().split('\n')
    n = int(lines[0])
    
    if len(lines) != n + 1:
        return False, "Message count mismatch"
    
    for i, message in enumerate(lines[1:], 1):
        if not validate_message_format(message):
            return False, f"Invalid message format at line {i+1}"
    
    return True, "Valid test case"
```
