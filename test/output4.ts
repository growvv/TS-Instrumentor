import { performance } from "perf_hooks";
interface PerformanceData {
    functions: {
        [key: string]: any;
    };
    loops: {
        [key: string]: any;
    };
}
const __performanceData: PerformanceData = {
    functions: {},
    loops: {}
};
process.on("exit", () => {
    console.log(__performanceData);
});
function add(a: number, b: number): number {
    return a + b;
}
(() => {
    console.log("begin call add");
    if (!__performanceData.functions["add"]) {
        __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.functions["add"].callCount += 1;
    const __loop_startadd_1 = performance.now();
    if (!__performanceData.loops["add"]) {
        __performanceData.loops["add"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.loops["add"].iterationCount += 1;
    const result_1 = add(1, 2);
    console.log("end call add");
    const __end_1 = performance.now();
    const __duration_1 = __end_1 - __loop_startadd_1;
    __performanceData.functions["add"].totalTime += __duration_1;
    __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_1);
    __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_1);
    return result_1;
})(); // 3
