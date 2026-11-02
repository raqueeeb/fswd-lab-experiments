# Experiment 08 – Viva Questions & Answers

**Node.js Fundamentals — Event Loop & HTTP Server**

[⬅ Experiment 08](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 8 in the FSWD lab manual.

---

### Q1. What is Node.js, and how does it allow JavaScript to run outside the browser?

**Answer:** Node.js is a **JavaScript runtime** built on Google Chrome's **V8 engine**. It runs JavaScript on the server and adds APIs that browsers do not provide, such as **file system access** (`fs`) and **networking** (`http`).

---

### Q2. What is the event loop, and why is it central to Node.js's concurrency model?

**Answer:** Node.js runs JavaScript on a **single thread**. The event loop lets it do **non-blocking I/O**: slow operations (file reads, network calls) are handed to the system, and their **callbacks run later** when they complete, so the main thread never waits.

```
sync code → process.nextTick → Promise microtasks → timers (setTimeout) → I/O → setImmediate
```

*In the program:* `eventloop.js` prints this order.

---

### Q3. What is the difference between `require()` and installing a package with npm?

**Answer:** `require()` is the function that **imports a module into a file**. `npm` is the tool that **downloads and manages third-party packages** (listed in `package.json`) so they can be required. Core modules such as `http` and `fs` need no install.

```js
const http = require("http");        // core module - no npm install needed
const express = require("express");  // needs: npm install express
```

---

### Q4. What is the purpose of the `package.json` file?

**Answer:** It stores the project's **metadata** – name, version, **dependencies** and **scripts**. npm uses it to install packages (`npm install`) and run tasks (`npm start`, `npm run eventloop`).

---

### Q5. What is the difference between the asynchronous and synchronous versions of a file-read function in Node?

**Answer:** `fs.readFile()` (asynchronous) is **non-blocking** and calls a callback when the read finishes. `fs.readFileSync()` (synchronous) **blocks the event loop** until the whole file has been read.

*In the program:* `fileDemo.js` shows the async callback finishing **after** the next line has already run.

---

### Q6. What does setting the response headers do in an HTTP server callback?

**Answer:** It sets the **HTTP status code** and **headers** (such as `Content-Type`) before the body is sent, telling the client **how to interpret** the response.

```js
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(projects));
```

---

## Quick revision

| Concept | Remember |
|---|---|
| Node.js | JavaScript runtime on V8, outside the browser |
| Event loop | Single thread + non-blocking I/O via callbacks |
| `require` vs npm | Import a module vs download packages |
| `package.json` | Metadata, dependencies, scripts |
| `readFile` vs `readFileSync` | Non-blocking vs blocking |
| `writeHead` | Status code + headers before the body |
