// Experiment 08 (a) - Understanding the Node.js event loop
// Run: node eventloop.js
//
// Order of execution:
//   1. all synchronous code
//   2. process.nextTick callbacks
//   3. Promise callbacks (microtasks)
//   4. timers (setTimeout) -> 5. check phase (setImmediate)

const fs = require("fs");

console.log("1. Start of script (synchronous)");

setTimeout(() => {
  console.log("6. setTimeout callback (timers phase)");
}, 0);

setImmediate(() => {
  console.log("7. setImmediate callback (check phase)");
});

Promise.resolve().then(() => {
  console.log("5. Promise.then callback (microtask)");
});

process.nextTick(() => {
  console.log("4. process.nextTick callback (runs before Promise microtasks)");
});

// A synchronous (blocking) operation: nothing else can run until it finishes.
// It also guarantees the 0 ms timer is already due when the event loop starts,
// so setTimeout prints before setImmediate here.
const start = Date.now();
let total = 0;
for (let i = 0; i < 5e7; i++) total += i;
console.log(`2. Blocking loop finished in ${Date.now() - start} ms (synchronous)`);

console.log("3. End of script (synchronous)");

// Inside an I/O callback the order flips: setImmediate ALWAYS runs before setTimeout,
// because the check phase comes right after the poll (I/O) phase.
fs.readFile(__filename, () => {
  setTimeout(() => console.log("9. setTimeout inside I/O callback"), 0);
  setImmediate(() => console.log("8. setImmediate inside I/O callback (always first here)"));
});
