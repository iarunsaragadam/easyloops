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
    a = input().strip()
    b = input().strip()

    print(f"Concatenation: {str(a)} + {str(b)} = {str(a+b)}")
    print(f"Length of first string: {len(a)}")
    print(f"Length of second string: {len(b)}")
    print(f"Uppercase: {a.upper()}")
    print(f"Lowercase: {b.lower()}")
    print(f"Substring from index 2: {str(a[2:])}")
    print(f"Substring from index 3: {str(a[3:])}")
    print(f"Substring from index 1: {str(a[1:])}")


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 