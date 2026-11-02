# Experiment 03 – JavaScript Basics — Operators, Control Flow, Arrays, Functions, Strings

> **Syllabus:** Java script basics - explore operators, control flow, arrays, functions, and string manipulation.

| Technology | Program | Viva |
|---|---|---|
| JavaScript (browser or Node.js) | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To explore core JavaScript fundamentals — operators, control flow, arrays, functions, and string manipulation — through standalone exercises.

## Files

| File | Purpose |
|---|---|
| [`program/basics.js`](program/basics.js) | All exercises, in 6 sections. Works in the browser **and** in Node.js |
| [`program/basics.html`](program/basics.html) | Test page that loads `basics.js` (with `defer`) and shows the output |

## How to run

**Option 1 – terminal (Node.js):**

```powershell
cd experiment-03\program
node basics.js
```

**Option 2 – browser:**

```powershell
cd experiment-03\program
start basics.html
```

(macOS: `open basics.html` · Linux: `xdg-open basics.html`). The output is shown on the page and in the browser console (F12).

## Expected output (excerpt)

```text
=== 1. Variables & Operators ===
a + b: 17
a % b (remainder): 2
a ** 2 (exponent): 144
5 == "5" (loose, converts type): true
5 === "5" (strict, no conversion): false
=== 2. Control Flow ===
Grade for 78 marks (if-else): B
Day 3 is (switch): Wednesday
Sum of 1 to 5 (for loop): 15
Factorial of 5 (while loop): 120
=== 3. Arrays ===
map() to uppercase: PORTFOLIO, WEATHER APP, QUIZ APP, CHAT APP
filter() names ending in "App": Weather App, Quiz App, Chat App
=== 4. Functions ===
averageRating() - declaration: 2.80
averageRatingArrow() - arrow: 2.80
=== 5. String Manipulation ===
trim(): "Full Stack Web Development"
replace("Web", "Mobile"): Full Stack Mobile Development
=== 6. Skill Summary (all concepts combined) ===
HTML & CSS.....: [****-] 4/5 Advanced
...
Average skill rating: 2.8
```

## Procedure

1. Create `basics.js` and link it from `basics.html` with `<script src="basics.js" defer>` (or run it with Node.js).
2. Declare variables with `let`/`const`; demonstrate arithmetic, comparison and logical operators with `console.log`.
3. Use `if…else` (grading a score) and `switch` (day name).
4. Use `for`, `while` and `for…of` loops.
5. Demonstrate `push`, `pop`, `map`, `filter`, `forEach`, `sort` and `includes` on an array.
6. Write a function declaration and an equivalent arrow function (average rating); add default and rest parameters.
7. Demonstrate concatenation, template literals, `split`, `trim`, `toUpperCase`, `slice`, `replace`.
8. Combine everything: process an array of skill objects and print a formatted summary for each.
9. Run in the browser console or Node.js and compare with the expected output.

## Concepts covered

`let` / `const` · arithmetic, comparison (`==` vs `===`), logical operators · `if…else`, `switch`, `for`, `while`, `for…of` · array methods · function declarations, arrow functions, default and rest parameters · string methods and template literals.

## Verification

`node basics.js` runs without errors and prints the output above. In headless Edge, `basics.html` renders 52+ result lines with no console errors.
