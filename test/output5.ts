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
function example() {
    console.log("Entering function example");
    let counter = 0; // 使用 let 声明可修改的变量
    for (let i = 0; i < 5; i++) {
        if (!__performanceData.loops["for_35afda5b"]) {
            __performanceData.loops["for_35afda5b"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
        }
        __performanceData.loops["for_35afda5b"].iterationCount += 1;
        {
            counter += i;
        }
    }
    console.log(counter); // 输出 10
    console.log("Exiting function example");
}
for (let i = 0; i < 3; i++) {
    if (!__performanceData.loops["for_c3072826"]) {
        __performanceData.loops["for_c3072826"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.loops["for_c3072826"].iterationCount += 1;
    {
        (() => {
            console.log("begin call example");
            if (!__performanceData.functions["example"]) {
                __performanceData.functions["example"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
            }
            __performanceData.functions["example"].callCount += 1;
            const __call_start_example_1 = performance.now();
            const result_1 = example();
            const __call_end_example_1 = performance.now();
            const __duration_1 = __call_end_example_1 - __call_start_example_1;
            __performanceData.functions["example"].totalTime += __duration_1;
            __performanceData.functions["example"].maxTime = Math.max(__performanceData.functions["example"].maxTime, __duration_1);
            __performanceData.functions["example"].minTime = Math.min(__performanceData.functions["example"].minTime, __duration_1);
            console.log("end call example");
            return result_1;
        })();
    }
}
