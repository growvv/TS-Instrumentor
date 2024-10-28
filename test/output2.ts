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
class Calculates {
    add(a: number, b: number): number {
        console.log("[LOG] Entering function add");
        {
            console.log("[LOG] Exiting function add");
            return a + b;
        }
    }
    multiply(a: number, b: number): number {
        console.log("[LOG] Entering function multiply");
        {
            console.log("[LOG] Exiting function multiply");
            return a * b;
        }
    }
    calculate(a: number, b: number): number {
        console.log("[LOG] Entering function calculate");
        {
            console.log("[LOG] Exiting function calculate");
            return (() => {
                console.log("[PREF] begin call this_add");
                if (!__performanceData.functions["this.add"]) {
                    __performanceData.functions["this.add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                }
                __performanceData.functions["this.add"].callCount += 1;
                const __call_start_this_add_1 = performance.now();
                const result_1 = this.add(a, (() => {
                    console.log("[PREF] begin call this_multiply");
                    if (!__performanceData.functions["this.multiply"]) {
                        __performanceData.functions["this.multiply"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                    }
                    __performanceData.functions["this.multiply"].callCount += 1;
                    const __call_start_this_multiply_1 = performance.now();
                    const result_2 = this.multiply(b, 2);
                    const __call_end_this_multiply_1 = performance.now();
                    const __duration_2 = __call_end_this_multiply_1 - __call_start_this_multiply_1;
                    __performanceData.functions["this.multiply"].totalTime += __duration_2;
                    __performanceData.functions["this.multiply"].maxTime = Math.max(__performanceData.functions["this.multiply"].maxTime, __duration_2);
                    __performanceData.functions["this.multiply"].minTime = Math.min(__performanceData.functions["this.multiply"].minTime, __duration_2);
                    console.log("[PREF] end call this_multiply");
                    return result_2;
                })());
                const __call_end_this_add_1 = performance.now();
                const __duration_1 = __call_end_this_add_1 - __call_start_this_add_1;
                __performanceData.functions["this.add"].totalTime += __duration_1;
                __performanceData.functions["this.add"].maxTime = Math.max(__performanceData.functions["this.add"].maxTime, __duration_1);
                __performanceData.functions["this.add"].minTime = Math.min(__performanceData.functions["this.add"].minTime, __duration_1);
                console.log("[PREF] end call this_add");
                return result_1;
            })();
        }
    }
}
const cal = new Calculates();
const res = (() => {
    console.log("[PREF] begin call cal_calculate");
    if (!__performanceData.functions["cal.calculate"]) {
        __performanceData.functions["cal.calculate"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.functions["cal.calculate"].callCount += 1;
    const __call_start_cal_calculate_1 = performance.now();
    const result_3 = cal.calculate(1, 3);
    const __call_end_cal_calculate_1 = performance.now();
    const __duration_3 = __call_end_cal_calculate_1 - __call_start_cal_calculate_1;
    __performanceData.functions["cal.calculate"].totalTime += __duration_3;
    __performanceData.functions["cal.calculate"].maxTime = Math.max(__performanceData.functions["cal.calculate"].maxTime, __duration_3);
    __performanceData.functions["cal.calculate"].minTime = Math.min(__performanceData.functions["cal.calculate"].minTime, __duration_3);
    console.log("[PREF] end call cal_calculate");
    return result_3;
})();
console.log(res); // 7
