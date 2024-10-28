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
let a = () => {
    console.log("[LOG] Entering function e8a63874");
    console.log((() => {
        console.log("[PREF] begin call add");
        if (!__performanceData.functions["add"]) {
            __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
        }
        __performanceData.functions["add"].callCount += 1;
        const __call_start_add_1 = performance.now();
        const result_1 = add(1, 2);
        const __call_end_add_1 = performance.now();
        const __duration_1 = __call_end_add_1 - __call_start_add_1;
        __performanceData.functions["add"].totalTime += __duration_1;
        __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_1);
        __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_1);
        console.log("[PREF] end call add");
        return result_1;
    })());
    {
        console.log("[LOG] Exiting function e8a63874");
        return 1 + (() => {
            console.log("[PREF] begin call add");
            if (!__performanceData.functions["add"]) {
                __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
            }
            __performanceData.functions["add"].callCount += 1;
            const __call_start_add_2 = performance.now();
            const result_2 = add(1, 2);
            const __call_end_add_2 = performance.now();
            const __duration_2 = __call_end_add_2 - __call_start_add_2;
            __performanceData.functions["add"].totalTime += __duration_2;
            __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_2);
            __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_2);
            console.log("[PREF] end call add");
            return result_2;
        })();
    }
};
console.log((() => {
    console.log("[PREF] begin call a");
    if (!__performanceData.functions["a"]) {
        __performanceData.functions["a"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.functions["a"].callCount += 1;
    const __call_start_a_1 = performance.now();
    const result_3 = a();
    const __call_end_a_1 = performance.now();
    const __duration_3 = __call_end_a_1 - __call_start_a_1;
    __performanceData.functions["a"].totalTime += __duration_3;
    __performanceData.functions["a"].maxTime = Math.max(__performanceData.functions["a"].maxTime, __duration_3);
    __performanceData.functions["a"].minTime = Math.min(__performanceData.functions["a"].minTime, __duration_3);
    console.log("[PREF] end call a");
    return result_3;
})()); // 4
