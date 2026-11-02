# Experiment 02 – Styling the Portfolio with CSS (Box Model, Flexbox & Grid)

> **Syllabus:** Styling the Portfolio with CSS Box Model, Flexbox & Project Gallery using Grid. It should be responsive use media query tags.

| Technology | Program | Viva |
|---|---|---|
| HTML5, CSS3 | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To style the personal portfolio page using CSS, applying the Box Model, Flexbox for layout, and CSS Grid for a responsive project gallery, using media queries for responsiveness.

## Files

| File | Purpose |
|---|---|
| [`program/index.html`](program/index.html) | Portfolio page from Experiment 01 with class names and a 6-card project gallery |
| [`program/style.css`](program/style.css) | All styles: box model, Flexbox, Grid, media queries |
| [`program/images/`](program/images/) | Profile picture and 6 project thumbnails (SVG) |

## How to run

```powershell
cd experiment-02\program
start index.html
```

macOS: `open index.html` · Linux: `xdg-open index.html`

To test responsiveness, press **F12 → Toggle device toolbar** (Ctrl + Shift + M) and try widths such as 1280px, 700px and 400px.

## Expected output

| Screen width | Header | Gallery |
|---|---|---|
| Desktop (> 768px) | Name on the left, nav on the right (one row) | 3 columns |
| Tablet (≤ 768px) | Name above nav (stacked) | 2 columns |
| Phone (≤ 480px) | Stacked | 1 column; About image centred above the text |

Sections appear as white rounded "cards" with an orange heading accent; project cards lift slightly on hover.

## Procedure

1. Create `style.css` and link it with `<link rel="stylesheet" href="style.css">`.
2. Apply `* { box-sizing: border-box; }` to normalise the box model.
3. Style `body` with a font family, colour scheme (CSS variables) and line height.
4. Lay out the header/nav with `display: flex`, `justify-content` and `align-items`.
5. Build the gallery with `display: grid` and `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`.
6. Add padding, margin, border, `border-radius` and `box-shadow` to the cards.
7. Stack the contact form with `display: flex; flex-direction: column`.
8. Add media queries at `max-width: 768px` (stack the header) and `max-width: 480px` (single-column gallery).
9. Test at several widths in the browser's responsive design mode.
10. Validate with the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).

## Concepts covered

Box model (content, padding, border, margin) · `box-sizing` · CSS variables · Flexbox (main/cross axis) · CSS Grid with `auto-fit` + `minmax()` · `:hover` transitions · media queries.

## Verification

Checked in headless Edge at 1280px, 700px and 400px: gallery has 3 / 2 / 1 columns, header switches from row to column at ≤ 768px, all images load, no horizontal scrolling, no console errors. HTML passes `html-validate`.
