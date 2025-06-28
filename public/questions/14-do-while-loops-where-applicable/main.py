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
    count = 0

    while True:
        print("=== MENU ===")
        print("1. Print message")
        print("2. Show count")
        print("3. Exit")
        print("Enter choice (1-3):")

        choice = int(input().strip())

        if (choice == 1):
            print("Hello from option 1!")
            count += 1
        elif (choice == 2):
            print(f"Option 1 selected {count} times")
        elif (choice == 3):
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again")

    print(f"Final count: {count}")        
                


# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 