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
    
    num1 = int(input())
    print(f"First number: {num1}")
    operator = input().strip()
    print(f"Operator: {operator}")
    num2 = int(input())
    print(f"Second number: {num2}")

    if operator == "+":
        result = num1 + num2
        print(f"Result: {num1} + {num2} = {result}")
    elif operator == "-":
        result = num1 - num2
        print(f"Result: {num1} - {num2} = {result}")
    elif operator == "*":
        result = num1 * num2
        print(f"Result: {num1} * {num2} = {result}")
    elif operator == "/":
        if num2 == 0:
            print("Error: Division by zero")
        else:
            result = num1 / num2    
            print(f"Result: {num1} / {num2} = {result}")
    else:
        print(f"Error: Unsupported operator '{operator}'")        




# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 