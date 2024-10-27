function add(a: number, b: number): number {
    return a + b;
}
let a = () => {
    console.log(add(1, 2));
    return 1 + add(1, 2);
}
console.log(a()); // 4
