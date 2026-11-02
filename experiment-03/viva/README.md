# Experiment 03 – Viva Questions & Answers

**JavaScript Basics — Operators, Control Flow, Arrays, Functions, Strings**

[⬅ Experiment 03](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 3 in the FSWD lab manual.

---

### Q1. What is the difference between `let`, `const` and `var`?

**Answer:**

| Keyword | Scope | Re-assign? | Re-declare in same scope? |
|---|---|---|---|
| `var` | Function | Yes | Yes |
| `let` | Block `{ }` | Yes | No |
| `const` | Block `{ }` | No | No |

`const` must be given a value when it is declared and cannot be reassigned afterwards.

---

### Q2. What is the difference between `==` and `===` in JavaScript?

**Answer:** `==` (loose equality) **converts types** before comparing. `===` (strict equality) compares **both value and type**, with no conversion.

```js
5 == "5";   // true  (string converted to number)
5 === "5";  // false (number vs string)
```

---

### Q3. What is the difference between `map()` and `forEach()` on an array?

**Answer:** `map()` **returns a new array** containing the result of the function for each element. `forEach()` just **runs** the function for each element and returns `undefined`.

```js
const upper = projects.map((p) => p.toUpperCase()); // new array
projects.forEach((p) => console.log(p));            // returns undefined
```

---

### Q4. What is a template literal, and what advantage does it offer over string concatenation?

**Answer:** A template literal is a string written with **backticks** (`` ` ``) that can embed expressions with `${ }`. Interpolation is cleaner and more readable than repeated `+`, and template literals can span multiple lines.

```js
`Student: ${name}, Marks: ${marks}`   // vs  "Student: " + name + ", Marks: " + marks
```

---

### Q5. What is the difference between a function declaration and an arrow function with respect to `this`?

**Answer:** A **regular function** gets its own `this`, decided by **how it is called**. An **arrow function** has **no `this` of its own**; it uses `this` from the surrounding (lexical) scope.

---

### Q6. What does the `filter()` array method do?

**Answer:** It returns a **new array** containing only the elements that pass a test function. The original array is **not modified**.

```js
const appProjects = projects.filter((p) => p.endsWith("App"));
```

---

## Quick revision

| Concept | Remember |
|---|---|
| `var` / `let` / `const` | Function scope / block scope / block scope + no reassignment |
| `==` vs `===` | With type conversion vs without |
| `map` vs `forEach` | Returns new array vs returns `undefined` |
| Template literal | Backticks + `${ }` |
| Arrow function `this` | Borrowed from the surrounding scope |
| `filter` | New array of matching items, original unchanged |
