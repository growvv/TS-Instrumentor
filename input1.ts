function add(a: number, b: number): number {
  return a + b;
}
function multiply(a: number, b: number): number {
  return a * b;
}

// let res = add(1, multiply(2, 3)); // 7
// console.log(res);
console.log(add(1, multiply(2, 3))); // 7
