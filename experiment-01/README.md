# Experiment 01 – Personal Portfolio Page using HTML

> **Syllabus:** Building a Personal Portfolio Page with HTML using necessary tags, consists of image, form, table for display skills and ratings.

| Technology | Program | Viva |
|---|---|---|
| HTML5 | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To design and develop a personal portfolio web page using HTML, incorporating semantic tags, an image, a form, and a table to display skills and ratings.

## Files

| File | Purpose |
|---|---|
| [`program/index.html`](program/index.html) | The portfolio page: header + nav, About (image), Skills table, Projects (`article`s), Contact form, footer |
| [`program/images/profile.svg`](program/images/profile.svg) | Profile photo placeholder |

## How to run

No installation needed – just open the file in a browser.

```powershell
cd experiment-01\program
start index.html
```

macOS: `open index.html` · Linux: `xdg-open index.html` · or right-click `index.html` in VS Code → **Open with Live Server**.

## Expected output

An unstyled (browser default) page showing the name and navigation links, a profile image with a short bio, a bordered **Skills & Ratings** table (5 skills rated out of 5), three projects, and a contact form with Name, Email and Message fields plus **Send Message** / **Clear** buttons. The nav links jump to each section.

## Procedure

1. Create `index.html` with the HTML5 boilerplate (`<!DOCTYPE html>`, `html`, `head`, `body`).
2. Add metadata in `head`: `title`, `meta charset` and `meta viewport`.
3. Build a `header` with the student's name and a `nav` with anchor links (`#about`, `#skills`, `#projects`, `#contact`).
4. Create the About `section` with an `img` (with `alt` text) and a bio paragraph.
5. Create the Skills `section` with a `table` (`thead`/`tbody`) of Skill and Rating columns.
6. Create the Projects `section` with one `article` per project.
7. Create the Contact `section` with a `form` containing a text input, an email input, a `textarea` and a submit button.
8. Add a `footer` with copyright text.
9. Validate the page with the [W3C Markup Validator](https://validator.w3.org/).
10. Open the file in a browser and check every section.

## Concepts covered

Semantic tags (`header`, `nav`, `main`, `section`, `article`, `footer`) · images and `alt` text · tables with `caption`, `thead`, `tbody`, `th scope` · forms, `label for`, input types, `required` · in-page anchor links.

## Verification

Opened in headless Microsoft Edge: page loads with no console errors, image loads, table has 5 rows, form has 3 fields. Passes `html-validate` (standard rules).
