class Calculates {
    add(a: number, b: number): number {
        console.log("Entering function add");
        {
            console.log("Exiting function add");
            return a + b;
        }
    }
    multiply(a: number, b: number): number {
        console.log("Entering function multiply");
        {
            console.log("Exiting function multiply");
            return a * b;
        }
    }
    calculate(a: number, b: number): number {
        console.log("Entering function calculate");
        {
            console.log("Exiting function calculate");
            return (() => {
                console.log("Entering function anonymous___func_4");
                console.log("begin call add");
                const result_1 = this.add(a, (() => {
                    console.log("Entering function anonymous___func_5");
                    console.log("begin call multiply");
                    const result_2 = this.multiply(b, 2);
                    console.log("end call multiply");
                    {
                        console.log("Exiting function anonymous___func_5");
                        return result_2;
                    }
                })());
                console.log("end call add");
                {
                    console.log("Exiting function anonymous___func_4");
                    return result_1;
                }
            })();
        }
    }
}
const cal = new Calculates();
const res = (() => {
    console.log("Entering function anonymous___func_6");
    console.log("begin call calculate");
    const result_3 = cal.calculate(1, 3);
    console.log("end call calculate");
    {
        console.log("Exiting function anonymous___func_6");
        return result_3;
    }
})();
console.log(res); // 7
