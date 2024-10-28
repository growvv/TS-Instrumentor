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
for (let i = 0; i < 10; i++) {
    if (!__performanceData.loops["for_a190ec24"]) {
        __performanceData.loops["for_a190ec24"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.loops["for_a190ec24"].iterationCount += 1;
    {
        (() => {
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
        })();
    }
}
