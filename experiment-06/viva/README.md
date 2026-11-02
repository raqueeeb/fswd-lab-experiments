# Experiment 06 – Viva Questions & Answers

**Fetch API & Async/Await**

[⬅ Experiment 06](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 6 in the FSWD lab manual.

---

### Q1. What is a Promise in JavaScript?

**Answer:** A Promise is an object representing the **eventual completion or failure** of an asynchronous operation. It is always in one of three states: **pending**, **fulfilled** or **rejected**.

---

### Q2. How does `async/await` simplify working with Promises compared to `.then()` chains?

**Answer:** `async/await` lets asynchronous code be written in a **synchronous-looking style**. It is easier to read, and errors are handled with an ordinary `try-catch` instead of chained `.then()` and `.catch()` calls.

```js
// .then() chain
fetch(url).then((res) => res.json()).then(show).catch(handleError);

// async/await
try {
  const res = await fetch(url);
  show(await res.json());
} catch (err) { handleError(err); }
```

---

### Q3. Why must `fetch()` responses be explicitly checked for a successful status?

**Answer:** `fetch()` only **rejects on network failure**. It does **not** reject for HTTP error statuses such as 404 or 500, so we must check `response.ok` (or `response.status`) ourselves to detect server-side errors.

```js
if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
```

---

### Q4. Why is parsing the response body as JSON also an asynchronous operation?

**Answer:** The body arrives as a **stream** that takes time to read, so `response.json()` also returns a **Promise** that must be awaited before the data can be used.

---

### Q5. What is the difference between synchronous and asynchronous code execution in JavaScript?

**Answer:** **Synchronous** code runs line by line and **blocks** until each operation finishes. **Asynchronous** code lets long-running work (such as network requests) continue in the background **without blocking** the main thread; its result is handled later.

---

### Q6. What happens if an awaited expression inside an async function throws an error and there is no `try-catch`?

**Answer:** The async function's returned Promise becomes **rejected** with that error. If nothing handles the rejection, it becomes an **unhandled promise rejection** (logged as an error).

---

## Quick revision

| Concept | Remember |
|---|---|
| Promise states | Pending → fulfilled / rejected |
| `async/await` | Readable async code + `try-catch` |
| `fetch()` | Rejects only on network failure – check `response.ok` |
| `response.json()` | Also returns a Promise → `await` it |
| Sync vs async | Blocking vs non-blocking |
| Uncaught await error | Rejected Promise → unhandled rejection |
