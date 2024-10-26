// input.ts
function add(a: number, b: number): number {
    console.log("Entering function ${functionName}");
    {
        console.log("Exiting function ${functionName}");
        return a + b;
    }
}
const multiply = (a: number, b: number): number => {
    console.log("Entering function ${functionName}");
    let add2 = (a: number, b: number): number => {
        console.log("Entering function ${functionName}");
        {
            console.log("Exiting function ${functionName}");
            return a + 2 * b;
        }
    };
    {
        console.log("Exiting function ${functionName}");
        return add2(a, b) + a * b;
    }
};
class Calculator {
    divide(a: number, b: number): number {
        console.log("Entering function ${functionName}");
        if (b === 0) {
            multiply(a, b);
            throw new Error('Division by zero');
        }
        {
            console.log("Exiting function ${functionName}");
            return a / b + multiply(a, b);
        }
    }
}
console.log(add(1, 2));
console.log(multiply(3, 4));
const calculator = new Calculator();
console.log(calculator.divide(5, 6));
