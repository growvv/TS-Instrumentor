let ret = ((a: number, b: number): number => {
    let add2 = (a: number, b: number): number => {
        let add3 = (a: number, b: number): number => {
            return a + b;
        }
        return add3(a, 3*b);
    }
    return 1 + add2(a, 2*b);  // 1 + add2(1,4) = 1 + add3(1, 3*4) = 1 + 13 = 14
})(1, 2);
console.log(ret);
