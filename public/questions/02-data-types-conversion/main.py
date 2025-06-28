"""
[QUESTION_TITLE] - Python Solution
[QUESTION_DESCRIPTION]

Author: Sowjanya Vemu
Date: 26 June 2025
Language: Python 3.x

The program reads input from stdin and writes output to stdout.
You only need to implement the solve() function below.
"""

import sys
from typing import List, Dict, Any, Optional


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
    str_int = input().strip()
    print(f"String to int: {int(str_int)}")

    str_float = input().strip()
    print(f"String to float: {float(str_float)}")

    str_bool = input().strip()
    print(f"String to bool: {'true' if str_bool.strip().lower() == 'true' else 'false'}")

    int_val = int(input())
    print(f"Int to string: {str(int_val)}")
    print(f"Int to float: {float(int_val)}")
    print(f"Int to bool: {'true' if bool(int_val) else 'false'}")

    float_val = float(input())
    print(f"Float to string: {str(float_val)}")
    print(f"Float to int: {int(float_val)}")
    print(f"Float to bool: {'true' if bool(float_val) else 'false'}")


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 