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
let ret = (() => {
    console.log("begin call anonymous_062bcf64");
    if (!__performanceData.functions["anonymous_062bcf64"]) {
        __performanceData.functions["anonymous_062bcf64"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
    }
    __performanceData.functions["anonymous_062bcf64"].callCount += 1;
    const __call_start_anonymous_062bcf64_1 = performance.now();
    const result_1 = ((a: number, b: number): number => {
        console.log("Entering function 3bb4291d");
        let add2 = (a: number, b: number): number => {
            console.log("Entering function 9a13f442");
            let add3 = (a: number, b: number): number => {
                console.log("Entering function ef356bf9");
                {
                    console.log("Exiting function ef356bf9");
                    return a + b;
                }
            };
            {
                console.log("Exiting function 9a13f442");
                return (() => {
                    console.log("begin call add3");
                    if (!__performanceData.functions["add3"]) {
                        __performanceData.functions["add3"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                    }
                    __performanceData.functions["add3"].callCount += 1;
                    const __call_start_add3_1 = performance.now();
                    const result_2 = add3(a, 3 * b);
                    const __call_end_add3_1 = performance.now();
                    const __duration_2 = __call_end_add3_1 - __call_start_add3_1;
                    __performanceData.functions["add3"].totalTime += __duration_2;
                    __performanceData.functions["add3"].maxTime = Math.max(__performanceData.functions["add3"].maxTime, __duration_2);
                    __performanceData.functions["add3"].minTime = Math.min(__performanceData.functions["add3"].minTime, __duration_2);
                    console.log("end call add3");
                    return result_2;
                })();
            }
        };
        {
            console.log("Exiting function 3bb4291d");
            return 1 + (() => {
                console.log("begin call add2");
                if (!__performanceData.functions["add2"]) {
                    __performanceData.functions["add2"] = { callCount: 0, totalTime: 0, maxTime: 0, minTime: Infinity };
                }
                __performanceData.functions["add2"].callCount += 1;
                const __call_start_add2_1 = performance.now();
                const result_3 = add2(a, 2 * b);
                const __call_end_add2_1 = performance.now();
                const __duration_3 = __call_end_add2_1 - __call_start_add2_1;
                __performanceData.functions["add2"].totalTime += __duration_3;
                __performanceData.functions["add2"].maxTime = Math.max(__performanceData.functions["add2"].maxTime, __duration_3);
                __performanceData.functions["add2"].minTime = Math.min(__performanceData.functions["add2"].minTime, __duration_3);
                console.log("end call add2");
                return result_3;
            })(); // 1 + add2(1,4) = 1 + add3(1, 3*4) = 1 + 13 = 14
        }
    })(1, 2);
    const __call_end_anonymous_062bcf64_1 = performance.now();
    const __duration_1 = __call_end_anonymous_062bcf64_1 - __call_start_anonymous_062bcf64_1;
    __performanceData.functions["anonymous_062bcf64"].totalTime += __duration_1;
    __performanceData.functions["anonymous_062bcf64"].maxTime = Math.max(__performanceData.functions["anonymous_062bcf64"].maxTime, __duration_1);
    __performanceData.functions["anonymous_062bcf64"].minTime = Math.min(__performanceData.functions["anonymous_062bcf64"].minTime, __duration_1);
    console.log("end call anonymous_062bcf64");
    return result_1;
})();
console.log(ret);
