function add(a: number, b: number): number {
  return a + b;
}
function multiply(a: number, b: number): number {
  return a * b;
}

for(let i = 0; i < 10; i++) {
  console.log(multiply(4, add(3, multiply(2, add(1, 2))))); // 36
}