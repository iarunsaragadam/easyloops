def solve():
    a = int(input())
    b = float(input())
    c = input().strip()
    print(f"Integer: {a}")
    print(f"Integer to float: {float(a)}")
    print(f"Float: {b}")
    print(f"Float to integer: {int(b)}")
    print(f"String: {c}")
    print(f"String to integer: {int(c)}")
if __name__ == "__main__":
    solve()