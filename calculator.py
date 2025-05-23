def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b

def modulus(a, b):
    if b == 0:
        raise ValueError("Cannot perform modulus by zero.")
    return a % b

def main():
    print("Simple Calculator")
    print("Operations: add, subtract, multiply, divide, modulus")
    try:
        a = float(input("Enter first number: "))
        op = input("Enter operation: ").strip().lower()
        b = float(input("Enter second number: "))

        if op == "add":
            result = add(a, b)
        elif op == "subtract":
            result = subtract(a, b)
        elif op == "multiply":
            result = multiply(a, b)
        elif op == "divide":
            result = divide(a, b)
        elif op == "modulus":
            result = modulus(a, b)
        else:
            print("Invalid operation.")
            return

        print(f"Result: {result}")
    except ValueError as e:
        print("Error:", e)
    except KeyboardInterrupt:
        print("\nOperation cancelled.")

if __name__ == "__main__":
    main()