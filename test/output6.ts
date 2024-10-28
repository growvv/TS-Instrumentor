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
    console.log("Entering function anonymous__func_3");
    console.log(__performanceData);
    console.log("Exiting function anonymous__func_3");
});
function add(a: number, b: number): number {
    console.log("Entering function add");
    {
        console.log("Exiting function add");
        return a + b;
    }
}
function multiply(a: number, b: number): number {
    console.log("Entering function multiply");
    {
        console.log("Exiting function multiply");
        return a * b;
    }
}
for (let i = 0; i < 10; i++) {
    if (!__performanceData.loops["for_-495255ba"]) {
        __performanceData.loops["for_-495255ba"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.loops["for_-495255ba"].iterationCount += 1;
    {
        console.log((() => {
            console.log("Entering function anonymous__func_4");
            console.log("begin call multiply");
            if (!__performanceData.functions["multiply"]) {
                __performanceData.functions["multiply"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
            }
            __performanceData.functions["multiply"].callCount += 1;
            const __call_start_multiply_1 = performance.now();
            const result_1 = multiply(4, (() => {
                console.log("Entering function anonymous__func_5");
                console.log("begin call add");
                if (!__performanceData.functions["add"]) {
                    __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                }
                __performanceData.functions["add"].callCount += 1;
                const __call_start_add_1 = performance.now();
                const result_2 = add(3, (() => {
                    console.log("Entering function anonymous__func_6");
                    console.log("begin call multiply");
                    if (!__performanceData.functions["multiply"]) {
                        __performanceData.functions["multiply"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                    }
                    __performanceData.functions["multiply"].callCount += 1;
                    const __call_start_multiply_2 = performance.now();
                    const result_3 = multiply(2, (() => {
                        console.log("Entering function anonymous__func_7");
                        console.log("begin call add");
                        if (!__performanceData.functions["add"]) {
                            __performanceData.functions["add"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                        }
                        __performanceData.functions["add"].callCount += 1;
                        const __call_start_add_2 = performance.now();
                        const result_4 = add(1, 2);
                        const __call_end_add_2 = performance.now();
                        const __duration_4 = __call_end_add_2 - __call_start_add_2;
                        __performanceData.functions["add"].totalTime += __duration_4;
                        __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_4);
                        __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_4);
                        console.log("end call add");
                        {
                            console.log("Exiting function anonymous__func_7");
                            return result_4;
                        }
                    })());
                    const __call_end_multiply_2 = performance.now();
                    const __duration_3 = __call_end_multiply_2 - __call_start_multiply_2;
                    __performanceData.functions["multiply"].totalTime += __duration_3;
                    __performanceData.functions["multiply"].maxTime = Math.max(__performanceData.functions["multiply"].maxTime, __duration_3);
                    __performanceData.functions["multiply"].minTime = Math.min(__performanceData.functions["multiply"].minTime, __duration_3);
                    console.log("end call multiply");
                    {
                        console.log("Exiting function anonymous__func_6");
                        return result_3;
                    }
                })());
                const __call_end_add_1 = performance.now();
                const __duration_2 = __call_end_add_1 - __call_start_add_1;
                __performanceData.functions["add"].totalTime += __duration_2;
                __performanceData.functions["add"].maxTime = Math.max(__performanceData.functions["add"].maxTime, __duration_2);
                __performanceData.functions["add"].minTime = Math.min(__performanceData.functions["add"].minTime, __duration_2);
                console.log("end call add");
                {
                    console.log("Exiting function anonymous__func_5");
                    return result_2;
                }
            })());
            const __call_end_multiply_1 = performance.now();
            const __duration_1 = __call_end_multiply_1 - __call_start_multiply_1;
            __performanceData.functions["multiply"].totalTime += __duration_1;
            __performanceData.functions["multiply"].maxTime = Math.max(__performanceData.functions["multiply"].maxTime, __duration_1);
            __performanceData.functions["multiply"].minTime = Math.min(__performanceData.functions["multiply"].minTime, __duration_1);
            console.log("end call multiply");
            {
                console.log("Exiting function anonymous__func_4");
                return result_1;
            }
        })()); // 36
    }
}
