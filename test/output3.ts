function add(a: number, b: number): number {
    console.log("Entering function add");
    {
        console.log("Exiting function add");
        return a + b;
    }
}
let a = () => {
    console.log("Entering function anonymous___func_1");
    console.log((() => {
        console.log("Entering function anonymous___func_2");
        console.log("begin call add");
        const result_1 = add(1, 2);
        console.log("end call add");
        {
            console.log("Exiting function anonymous___func_2");
            return result_1;
        }
    })());
    {
        console.log("Exiting function anonymous___func_1");
        return 1 + (() => {
            console.log("Entering function anonymous___func_3");
            console.log("begin call add");
            const result_2 = add(1, 2);
            console.log("end call add");
            {
                console.log("Exiting function anonymous___func_3");
                return result_2;
            }
        })();
    }
};
console.log((() => {
    console.log("Entering function anonymous___func_4");
    console.log("begin call a");
    const result_3 = a();
    console.log("end call a");
    {
        console.log("Exiting function anonymous___func_4");
        return result_3;
    }
})()); // 4
