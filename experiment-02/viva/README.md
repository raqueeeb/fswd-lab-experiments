# Experiment 02 – Viva Questions & Answers

**Styling the Portfolio with CSS (Box Model, Flexbox & Grid)**

[⬅ Experiment 02](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 2 in the FSWD lab manual.

---

### Q1. What are the four components of the CSS Box Model, from innermost to outermost?

**Answer:** **Content → Padding → Border → Margin.**

```
+---------------- margin ----------------+
|  +------------- border -------------+  |
|  |  +---------- padding ---------+  |  |
|  |  |          content           |  |  |
|  |  +----------------------------+  |  |
|  +----------------------------------+  |
+----------------------------------------+
```

---

### Q2. What is the difference between `box-sizing: content-box` and `box-sizing: border-box`?

**Answer:**
- `content-box` (the default): `width` applies to the content only, so padding and border are **added outside** it and the element becomes bigger than the width you set.
- `border-box`: padding and border are **included inside** the width, so the total size stays exactly what you set.

```css
* { box-sizing: border-box; }   /* used at the top of style.css */
```

---

### Q3. What is the main difference between Flexbox and CSS Grid?

**Answer:** **Flexbox is one-dimensional** – it arranges items in a single row *or* column. **Grid is two-dimensional** – it controls rows *and* columns at the same time, which makes it better for gallery-style layouts.

*In the program:* Flexbox → header/nav, about box, contact form. Grid → project gallery.

---

### Q4. What does `justify-content` control in a Flexbox container, and how does it differ from `align-items`?

**Answer:**
- `justify-content` aligns items along the **main axis** (horizontal by default).
- `align-items` aligns items along the **cross axis** (vertical by default).

```css
.site-header { display: flex; justify-content: space-between; align-items: center; }
```

---

### Q5. What is a media query, and why is it essential for responsive design?

**Answer:** A media query applies CSS rules **only when a condition is true**, such as the viewport width. One stylesheet can therefore adapt the layout to phones, tablets and desktops.

```css
@media (max-width: 768px) {
  .site-header { flex-direction: column; }
}
```

---

### Q6. What does `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` achieve?

**Answer:** It creates **as many columns as fit** in the container, each **at least 200px** wide, and shares the remaining space equally (`1fr`). The grid becomes responsive without separate media queries for the column count.

*In the program:* `.gallery-grid` uses `repeat(auto-fit, minmax(220px, 1fr))` → 3 columns on desktop, 2 on tablet, 1 on phone.

---

## Quick revision

| Concept | Remember |
|---|---|
| Box model | Content → Padding → Border → Margin |
| `border-box` | Padding + border stay inside the width |
| Flexbox vs Grid | 1-D vs 2-D |
| `justify-content` / `align-items` | Main axis / cross axis |
| Media query | CSS that applies only under a condition |
| `auto-fit` + `minmax()` | Responsive columns without media queries |
