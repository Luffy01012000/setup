import fs from "node:fs";

console.log("hello world!");
console.log("hello esbuild!");

const sum = (a: number, b: number) => {
  return a + b;
};
fs.writeFileSync("test.txt", "test");
fs.writeFileSync("test1.txt", "test concurrent");
console.log("sum:", sum(5, 5));
