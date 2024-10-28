function example() {
    let counter = 0; // 使用 let 声明可修改的变量

    for (let i = 0; i < 5; i++) {
        counter += i;
    }

    console.log(counter); // 输出 10
}

for (let i = 0; i < 3; i++) {
    example();
}