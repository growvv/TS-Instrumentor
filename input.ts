// input.ts
function add(a: number, b: number): number {
    return a + b;
}

const multiply = (a: number, b: number): number => {
    let add2 = (a: number, b: number) : number => {
        return a + 2*b;
    }
    return add2(a, b) + a * b;
}

class Calculator {
    divide(a: number, b: number): number {
        if (b === 0) {
            multiply(a, b);
            throw new Error('Division by zero');
        }
        return a / b + multiply(a, b);
    }
}

console.log(add(1, 2))
console.log(multiply(3, 4))
const calculator = new Calculator();
console.log(calculator.divide(5, 6))
