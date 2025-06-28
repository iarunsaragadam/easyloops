"""
[QUESTION_TITLE] - Python Solution
[QUESTION_DESCRIPTION]

Author: [AUTHOR_NAME]
Date: [DATE]
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
    score = int(input())
    print(f"Score: {score}")

    if score >= 90:
        grade = "A"
        performance = "Excellent"
        status = "Pass"
    elif score >= 80:
        grade = "B"
        performance = "Good"
        status = "Pass"
    elif score >= 60:
        grade = "C"
        performance = "Average"
        status = "Pass"
    else:
        grade = "F"
        performance = "Poor"
        status = "Fail"

    print(f"Grade: {grade}")  
    print(f"Performance: {performance}") 
    print(f"Status: {status}")





# Add any helper functions you need below this line


if __name__ == "__main__":
    solve() 