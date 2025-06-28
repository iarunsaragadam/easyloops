"""
[QUESTION_TITLE] - Python Solution
[QUESTION_DESCRIPTION]

Author: Sowjanya Vemu
Date: 25 June 2025
Language: Python 3.x

The program reads input from stdin and writes output to stdout.
You only need to implement the solve() function below.
"""

def solve():
    """
    TODO: Implement your solution here.
    
    This is the main function you need to complete.
    Read input using input() and print output using print().
    
    Example:
        line = input().strip()  # Read a line
        n = int(input())        # Read an integer
        arr = list(map(int, input().split()))  # Read space-separated integers
        print(result)           # Print your result
    """
   
    integer_value = int(input())
    print(f"Integer variable: {integer_value}")

    string_value = input().strip()
    print(f"String variable: {string_value}")

    boolean_value = input().strip().lower() == "true"
    print(f"Boolean variable: {'true' if boolean_value else 'false'}")

    float_value = float(input())
    print(f"Float variable: {float_value}")

    char_value = input().strip()
    print(f"Character variable: {char_value}")

    new_integer_value = int(input())
    integer_value = new_integer_value
    print(f"Updated integer variable: {integer_value}")

    late_init_val = input().strip()
    late_variable = None
    late_variable = late_init_val
    print(f"Late-initialized variable: {late_variable}")

    # Print values
    
    pass


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 
