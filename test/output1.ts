import { performance } from "perf_hooks";
const var __performanceData = {
    functions: {},
    loops: {}
};
(() => {
    console.log("begin call process.on");
    const result_1 = process.on("exit", () => {
        console.log(__performanceData);
    });
    console.log("end call process.on");
    return result_1;
})();
function add(a: number, b: number): number {
    return a + b;
}
function multiply(a: number, b: number): number {
    return a * b;
}
let res = (() => {
    console.log("begin call add");
    const result_2 = add(1, (() => {
        console.log("begin call multiply");
        const result_3 = multiply(2, 3);
        console.log("end call multiply");
        return result_3;
    })());
    console.log("end call add");
    return result_2;
})(); // 7
// console.log(res);
console.log((() => {
    console.log("begin call add");
    const result_4 = add(1, (() => {
        console.log("begin call multiply");
        const result_5 = multiply(2, 3);
        console.log("end call multiply");
        return result_5;
    })());
    console.log("end call add");
    return result_4;
})()); // 7
