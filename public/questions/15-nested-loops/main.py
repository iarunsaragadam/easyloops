"""
[QUESTION_TITLE] - Python Solution
[QUESTION_DESCRIPTION]

Author: Sowjanya Vemu
Date: 27 June 2025
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
    n = int(input().strip())

    for i in range(1, n + 1):
        for j in range(i):
            print("*", end = "")
        print()


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 