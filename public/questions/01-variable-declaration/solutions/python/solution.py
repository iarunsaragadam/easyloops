import sys
def solve():
    #Read all 7 inputs into a list using loop
    values = sys.stdin.read().splitlines()
    integer_val = int(values[0])
    string_val = values[1]
    boolean_val = values[2].lower() == "true"
    float_val = float(values[3])
    char_val = values[4]
    new_integer_val = int(values[5])
    Late_init_val = values[6]
    #Print inital variables
    print(f"Integer variable: {integer_val}")
    print(f"String variable: {string_val}")
    print(f"Boolean variable: {str(boolean_val).lower()}")
    print(f"Float variable: {float_val}")
    print(f"Character variable: {char_val}")
    #interger reassignmenta
    interger_val = new_integer_val
    print(f"Updated integer variable: {interger_val}")
    #late initialization
    late_initialized = Late_init_val
    print(f"Late-initialized variable: {late_initialized}")
if __name__ == "__main__":
    solve()