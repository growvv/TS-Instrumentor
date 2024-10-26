// input.ts
function add(a: number, b: number): number {
    console.log("Entering function add");
    {
        console.log("Exiting function add");
        return a + b;
    }
}
const multiply = (a: number, b: number): number => {
    console.log("Entering function anonymous__func_2");
    let add2 = (a: number, b: number): number => {
        console.log("Entering function anonymous__func_3");
        {
            console.log("Exiting function anonymous__func_3");
            return a + 2 * b;
        }
    };
    {
        console.log("Exiting function anonymous__func_2");
        return add2(a, b) + a * b;
    }
};
class Calculator {
    divide(a: number, b: number): number {
        console.log("Entering function divide");
        if (b === 0) {
            multiply(a, b);
            throw new Error('Division by zero');
        }
        {
            console.log("Exiting function divide");
            return a / b + multiply(a, b);
        }
    }
}
console.log(add(1, 2));
console.log(multiply(3, 4));
const calculator = new Calculator();
console.log(calculator.divide(5, 6));
