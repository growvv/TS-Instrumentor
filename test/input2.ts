class Calculates {
    add(a: number, b: number): number {
        return a + b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    calculate(a: number, b: number): number {
        return this.add(a, this.multiply(b, 2));
    }
}

const cal = new Calculates();
const res = cal.calculate(1, 3);
console.log(res); // 7