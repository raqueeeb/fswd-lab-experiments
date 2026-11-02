# Experiment 05 – Viva Questions & Answers

**Contact Form Validation using Regex & Exception Handling**

[⬅ Experiment 05](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 5 in the FSWD lab manual.

---

### Q1. What is a regular expression, and why is it useful for form validation?

**Answer:** A regular expression (regex) is a **pattern** for matching character combinations in strings. It lets us check concisely whether input such as a name, email or phone number follows the expected format.

```js
const phonePattern = /^[6-9]\d{9}$/; // 10 digits, starting with 6-9
```

---

### Q2. What is the difference between `test()` and `match()` when using regex in JavaScript?

**Answer:** `regex.test(string)` returns a **boolean** (match or no match). `string.match(regex)` returns an **array of match details** or `null`. For a simple yes/no validity check, `test()` is the simpler and more efficient choice.

```js
emailPattern.test("you@example.com");     // true
"you@example.com".match(/@(.+)$/)[1];     // "example.com"
```

---

### Q3. What is the purpose of a `try-catch` block?

**Answer:** The `try` block contains code that **might throw an error**. If an error occurs, control jumps to the `catch` block, which handles it **gracefully** instead of letting the program crash.

---

### Q4. What does the `finally` block do, and when does it execute?

**Answer:** `finally` **always runs** after `try` and `catch`, whether or not an error was thrown. It is used for clean-up work.

*In the program:* `finally` re-enables the **Send Message** button after every validation attempt.

---

### Q5. How do you create and throw a custom error in JavaScript?

**Answer:** Use the `throw` keyword with a new `Error` object (or a class that extends `Error`) carrying a custom message. The `catch` block can read it through `err.message`.

```js
class ValidationError extends Error {
  constructor(message) { super(message); this.name = "ValidationError"; }
}
throw new ValidationError("Name is required.");
```

---

### Q6. Why is client-side validation not sufficient on its own, and what should accompany it?

**Answer:** Client-side validation can be **bypassed** (by disabling JavaScript or sending requests directly to the server). It must always be paired with **server-side validation** to protect data integrity and security. This is done in Experiments 09–11.

---

## Quick revision

| Concept | Remember |
|---|---|
| Regex | Pattern for matching text |
| `test()` vs `match()` | Boolean vs match details/`null` |
| `try` / `catch` | Risky code / handle the error |
| `finally` | Always runs – clean-up |
| Custom error | `throw new Error("msg")` or `class X extends Error` |
| Validation | Client side for UX + server side for security |
