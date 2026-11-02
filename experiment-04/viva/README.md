# Experiment 04 – Viva Questions & Answers

**DOM Manipulation & Events**

[⬅ Experiment 04](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 4 in the FSWD lab manual.

---

### Q1. What is the DOM, and how does it relate to an HTML document?

**Answer:** The **Document Object Model** is a tree-like, in-memory representation of the HTML document, created by the browser. Every HTML tag becomes a **node** that JavaScript can read and change.

```js
const gallery = document.querySelector("#galleryGrid"); // get a node from the DOM tree
```

---

### Q2. What is the difference between `innerHTML` and `createElement()` when adding content to a page?

**Answer:** `innerHTML` parses a **string as HTML** and injects it. It is quick, but **risky with untrusted input** (it can run injected code – XSS). `createElement()` builds DOM nodes **programmatically**, which is safer and gives finer control over each element.

*In the program:* `createCard()` in `app.js` uses `createElement()` + `textContent`, so a project title such as `<b>hi</b>` is shown as plain text.

---

### Q3. What is event delegation, and why is it useful for dynamically created elements?

**Answer:** Event delegation attaches **one listener to a parent** element and checks `event.target` to find which child triggered the event. Elements added to the DOM later are handled automatically, with no new listeners needed.

```js
gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) { /* remove that card */ }
});
```

---

### Q4. What does `classList.toggle()` do, and how is it used for a theme switcher?

**Answer:** It **adds** a class if it is missing and **removes** it if it is present. One call per click therefore switches between the light and dark themes.

```js
document.body.classList.toggle("dark");
```

---

### Q5. What is the difference between `addEventListener()` and an inline `onclick` attribute?

**Answer:** `addEventListener()` keeps JavaScript **separate from HTML**, allows **multiple listeners** for the same event and offers extra options. An inline `onclick` mixes markup with logic and allows only **one handler** per event.

---

### Q6. What is the difference between `event.target` and `event.currentTarget`?

**Answer:** `event.target` is the element that **actually triggered** the event (e.g. the clicked button). `event.currentTarget` is the element the **listener is attached to** (e.g. the gallery). They differ during event bubbling and delegation.

---

## Quick revision

| Concept | Remember |
|---|---|
| DOM | Browser's tree of nodes for the page |
| `innerHTML` vs `createElement` | Fast but unsafe for user input vs safe and precise |
| Event delegation | One parent listener + `event.target` |
| `classList.toggle` | Add if missing, remove if present |
| `addEventListener` | Many handlers, separate from HTML |
| `target` vs `currentTarget` | Who triggered vs who is listening |
