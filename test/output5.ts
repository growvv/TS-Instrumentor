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
    console.log("Entering function anonymous___func_3");
    console.log(__performanceData);
    console.log("Exiting function anonymous___func_3");
});
function example() {
    console.log("Entering function example");
    let counter = 0; // 使用 let 声明可修改的变量
    for (let i = 0; i < 5; i++) {
        if (!__performanceData.loops["result"]) {
            __performanceData.loops["result"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
        }
        __performanceData.loops["result"].iterationCount += 1;
        {
            counter += i;
        }
    }
    console.log(counter); // 输出 10
    console.log("Exiting function example");
}
for (let i = 0; i < 3; i++) {
    if (!__performanceData.loops["result"]) {
        __performanceData.loops["result"] = { iterationCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.loops["result"].iterationCount += 1;
    {
        (() => {
            console.log("Entering function anonymous___func_4");
            console.log("begin call example");
            if (!__performanceData.functions["example"]) {
                __performanceData.functions["example"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
            }
            __performanceData.functions["example"].callCount += 1;
            const __call_startexample_1 = performance.now();
            const result_1 = example();
            console.log("end call example");
            const __call_end_1 = performance.now();
            const __duration_1 = __call_end_1 - __call_startexample_1;
            __performanceData.functions["example"].totalTime += __duration_1;
            __performanceData.functions["example"].maxTime = Math.max(__performanceData.functions["example"].maxTime, __duration_1);
            __performanceData.functions["example"].minTime = Math.min(__performanceData.functions["example"].minTime, __duration_1);
            {
                console.log("Exiting function anonymous___func_4");
                return result_1;
            }
        })();
    }
}
