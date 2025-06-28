"""
[QUESTION_TITLE] - Python Solution
[QUESTION_DESCRIPTION]

Author: Sowjanya Vemu
Date: 26 June 2026
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
    PI = 3.14159
    radius = float(input())
    circumference = 2 * PI * radius
    area = PI * radius * radius

    print(f"Radius: {radius}")
    print(f"PI constant : {PI}")
    print(f"Circumference: {circumference:.5f}")
    print(f"Area: {area}")


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 