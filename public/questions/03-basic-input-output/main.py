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
    name = input().strip()
    upper_name = name.upper()
    print(f"Name (uppercase): {upper_name}")

    age = int(input())
    print(f"Age: {age} years")

    birth_year = 2024 - age
    print(f"Birth Year: {birth_year}")

    height = float(input())
    height_in_cms = float(height * 100)
    print(f"Height: {height:.2f}m ({height_in_cms:.1f}cm)")

    fav_language = input().strip()
    print(f"Favorite Language: {fav_language}")

    print(f"Profile: {name}, {age} years old, {height:.2f}m tall, loves {fav_language}")

    pass


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 