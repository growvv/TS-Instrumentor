import { performance } from "perf_hooks";
interface PerformanceData {
    functions: {
        [key: string]: any;
    };
    loops: {
        [key: string]: any;
    };
}
let __performanceData: PerformanceData = {
    functions: {},
    loops: {}
};
process.on("exit", () => {
    console.log(__performanceData);
});
function add(a: number, b: number): number {
    console.log("[LOG] Entering function add");
    {
        console.log("[LOG] Exiting function add");
        return a + b;
    }
}
function multiply(a: number, b: number): number {
    console.log("[LOG] Entering function multiply");
    {
        console.log("[LOG] Exiting function multiply");
        return a * b;
    }
}
let res = (() => {
    console.log("[PREF] begin call add");
    if (!__performanceData.functions["add"]) {
        __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.functions["add"].callCount += 1;
    const __call_start_add_1 = performance.now();
    const result_1 = add(1, (() => {
        console.log("[PREF] begin call multiply");
        if (!__performanceData.functions["multiply"]) {
            __performanceData.functions["multiply"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
        }
        __performanceData.functions["multiply"].callCount += 1;
        const __call_start_multiply_1 = performance.now();
        const result_2 = multiply(2, 3);
        const __call_end_multiply_1 = performance.now();
        const __duration_2 = __call_end_multiply_1 - __call_start_multiply_1;
        __performanceData.functions["multiply"].totalTime += __duration_2;
        __performanceData.functions["multiply"].maxTime = Math.max(__performanceData.functions["multiply"].maxTime, __duration_2);
        __performanceData.functions["multiply"].minTime = Math.min(__performanceData.functions["multiply"].minTime, __duration_2);
        console.log("[PREF] end call multiply");
        return result_2;
    })());
    const __call_end_add_1 = performance.now();
    const __duration_1 = __call_end_add_1 - __call_start_add_1;
    __performanceData.functions["add"].totalTime += __duration_1;
    __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_1);
    __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_1);
    console.log("[PREF] end call add");
    return result_1;
})(); // 7
// console.log(res);
console.log((() => {
    console.log("[PREF] begin call add");
    if (!__performanceData.functions["add"]) {
        __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.functions["add"].callCount += 1;
    const __call_start_add_2 = performance.now();
    const result_3 = add(1, (() => {
        console.log("[PREF] begin call multiply");
        if (!__performanceData.functions["multiply"]) {
            __performanceData.functions["multiply"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
        }
        __performanceData.functions["multiply"].callCount += 1;
        const __call_start_multiply_2 = performance.now();
        const result_4 = multiply(2, 3);
        const __call_end_multiply_2 = performance.now();
        const __duration_4 = __call_end_multiply_2 - __call_start_multiply_2;
        __performanceData.functions["multiply"].totalTime += __duration_4;
        __performanceData.functions["multiply"].maxTime = Math.max(__performanceData.functions["multiply"].maxTime, __duration_4);
        __performanceData.functions["multiply"].minTime = Math.min(__performanceData.functions["multiply"].minTime, __duration_4);
        console.log("[PREF] end call multiply");
        return result_4;
    })());
    const __call_end_add_2 = performance.now();
    const __duration_3 = __call_end_add_2 - __call_start_add_2;
    __performanceData.functions["add"].totalTime += __duration_3;
    __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_3);
    __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_3);
    console.log("[PREF] end call add");
    return result_3;
})()); // 7
