# Experiment 04 – DOM Manipulation & Events

> **Syllabus:** Bring the portfolio to life: dynamically add/remove project cards, change themes, and respond to user events.

| Technology | Program | Viva |
|---|---|---|
| HTML5, CSS3, JavaScript (DOM) | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To bring the static portfolio to life using JavaScript DOM manipulation — dynamically adding and removing project cards, switching themes, and responding to user events.

## Files

| File | Purpose |
|---|---|
| [`program/index.html`](program/index.html) | Portfolio page with an empty gallery, an add-project form, a search box and a theme button |
| [`program/app.js`](program/app.js) | All the interactivity (DOM + events) |
| [`program/style.css`](program/style.css) | Base styles, unchanged from Experiment 02 |
| [`program/extra.css`](program/extra.css) | New styles: buttons, form, highlight, dark theme |
| [`program/images/`](program/images/) | Profile picture and project thumbnails |

## How to run

```powershell
cd experiment-04\program
start index.html
```

macOS: `open index.html` · Linux: `xdg-open index.html`

## Expected output / things to try

| Action | Result |
|---|---|
| Page loads | 3 project cards are created from the `projects` array; "Total projects: 3" |
| Type a title and click **Add Project** (or press Enter) | A new card appears; the counter updates |
| Click **Add Project** with an empty title | Red message "Please enter a project title first." |
| Click **Remove** on a card | That card disappears |
| Hover over a card | Yellow outline highlight |
| Type in the search box | Only matching cards are shown ("Showing 1 of 3 projects"); **Esc** clears it |
| Click **Dark Mode** | Whole page switches to the dark theme; the choice is remembered after a reload |

## Procedure

1. Select the DOM elements (gallery, form, inputs, theme button) with `querySelector`.
2. Store the projects in an array of objects (title, description, image URL).
3. Write `renderProjects()` to create a card element for each project and append it to the gallery.
4. Handle **Remove** clicks with one delegated listener on the gallery.
5. On form `submit`, push a new object into the array and re-render.
6. Toggle a `dark` class on `<body>` with `classList.toggle()` for the theme.
7. Save the theme in `localStorage` so it persists.
8. Add `mouseover`/`mouseout` (highlight) and `input`/`keydown` (search) listeners.
9. Test every interaction without reloading the page.

## Concepts covered

DOM selection · `createElement`, `textContent`, `append`, `replaceChildren` · `addEventListener` (`submit`, `click`, `input`, `keydown`, `mouseover`, `mouseout`) · event delegation and `closest()` · `classList` · `dataset` · `localStorage`.

## Verification

Automated in headless Edge: initial 3 cards, empty-title warning, add via Enter key, HTML in titles shown as plain text (no injection), remove, hover highlight, search filter and empty-result message, Esc to clear, dark theme toggle and persistence after reload – all passed with no console errors.
