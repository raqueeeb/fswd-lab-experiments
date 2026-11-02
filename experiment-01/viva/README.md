# Experiment 01 – Viva Questions & Answers

**Personal Portfolio Page using HTML**

[⬅ Experiment 01](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 1 in the FSWD lab manual.

---

### Q1. What is the difference between an HTML element and an HTML tag?

**Answer:** A **tag** is the markup syntax (such as `<p>`) used to open or close an element. An **element** is the complete unit: the opening tag, its content and the closing tag.

```html
<p>Hello</p>   <!-- <p> and </p> are tags; the whole line is one <p> element -->
```

---

### Q2. Why are semantic tags like `header`, `nav` and `footer` preferred over generic `div` tags?

**Answer:** Semantic tags describe the **meaning** of their content to browsers, search engines and assistive technologies (screen readers). This improves **accessibility and SEO**. A `div` carries no meaning at all.

*In the program:* `header`, `nav`, `main`, `section`, `article` and `footer` are all used in `index.html`.

---

### Q3. What is the purpose of the `action` and `method` attributes of a `form` tag?

**Answer:**
- `action` – the **URL** where the form data is sent when submitted.
- `method` – **how** the data is sent: `GET` (data in the URL) or `POST` (data in the request body).

```html
<form action="/api/contact" method="post">
```

---

### Q4. What is the difference between the `src` and `alt` attributes of an `img` tag?

**Answer:**
- `src` – the path or URL of the image to display.
- `alt` – alternative text shown if the image fails to load, and read aloud by screen readers.

```html
<img src="images/profile.svg" alt="Profile photo of Ananya Rao">
```

---

### Q5. Why is a table considered appropriate for displaying skills and ratings, but discouraged for full page layout?

**Answer:** Skill–rating pairs are **tabular data**, so a table is semantically correct for them. Using tables for page layout mixes structure with presentation and breaks responsiveness; CSS layout tools (Flexbox, Grid) handle layout far better.

---

### Q6. What does the `DOCTYPE` declaration do at the top of an HTML file?

**Answer:** `<!DOCTYPE html>` tells the browser to render the page in **HTML5 standards mode**, so the page behaves consistently across browsers (instead of falling back to "quirks mode").

---

## Quick revision

| Concept | Remember |
|---|---|
| Tag vs element | Tag = `<p>`; element = `<p>content</p>` |
| Semantic HTML | Meaningful tags → accessibility + SEO |
| `action` / `method` | Where to send / how to send (GET or POST) |
| `src` / `alt` | Image source / text alternative |
| Tables | For data, not for layout |
| `<!DOCTYPE html>` | Standards mode |
