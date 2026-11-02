// Experiment 03 - JavaScript Basics
// Operators, control flow, arrays, functions and string manipulation.
//
// Run it in two ways:
//   1. Browser:  open basics.html (output on the page + in the console)
//   2. Terminal: node basics.js

// When running in a browser we also print to the page; in Node there is no document.
const output = typeof document !== "undefined" ? document.getElementById("output") : null;

// Print a section title
function heading(title) {
  console.log(`\n=== ${title} ===`);
  if (output) {
    const h3 = document.createElement("h3");
    h3.textContent = title;
    output.appendChild(h3);
  }
}

// Print "label: value" to the console (and to the page in a browser)
function show(label, value) {
  console.log(`${label}: ${value}`);
  if (output) {
    const line = document.createElement("div");
    line.className = "line";
    const labelSpan = document.createElement("span");
    labelSpan.className = "label";
    labelSpan.textContent = `${label}: `;
    const valueSpan = document.createElement("span");
    valueSpan.className = "val";
    valueSpan.textContent = String(value);
    line.append(labelSpan, valueSpan);
    output.appendChild(line);
  }
}

/* ---------------- 1. Variables & Operators ---------------- */
heading("1. Variables & Operators");

const a = 12; // const: cannot be reassigned
let b = 5;    // let: can be reassigned (block scoped)

// Arithmetic operators
show("a + b", a + b);
show("a - b", a - b);
show("a * b", a * b);
show("a / b", a / b);
show("a % b (remainder)", a % b);
show("a ** 2 (exponent)", a ** 2);

b++; // increment
show("b after b++", b);

// Comparison operators
show("a > b", a > b);
show("a === 12 (strict equality)", a === 12);
show('5 == "5" (loose, converts type)', 5 == "5");
show('5 === "5" (strict, no conversion)', 5 === "5");

// Logical operators
show("a > b && b > 0 (AND)", a > b && b > 0);
show("a < b || b > 0 (OR)", a < b || b > 0);
show("!(a > b) (NOT)", !(a > b));
show("typeof a", typeof a);

/* ---------------- 2. Control Flow ---------------- */
heading("2. Control Flow");

// if...else if...else - grading a numeric score
const marks = 78;
let grade;
if (marks >= 90) grade = "A";
else if (marks >= 75) grade = "B";
else if (marks >= 60) grade = "C";
else grade = "D";
show(`Grade for ${marks} marks (if-else)`, grade);

// switch - day number to day name
const day = 3;
let dayName;
switch (day) {
  case 1: dayName = "Monday"; break;
  case 2: dayName = "Tuesday"; break;
  case 3: dayName = "Wednesday"; break;
  case 4: dayName = "Thursday"; break;
  case 5: dayName = "Friday"; break;
  default: dayName = "Weekend";
}
show(`Day ${day} is (switch)`, dayName);

// for loop - sum of the first 5 natural numbers
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
show("Sum of 1 to 5 (for loop)", sum);

// while loop - factorial of 5
let n = 5;
let factorial = 1;
while (n > 1) {
  factorial *= n;
  n--;
}
show("Factorial of 5 (while loop)", factorial);

// for...of loop over an array
const evens = [];
for (const num of [1, 2, 3, 4, 5, 6]) {
  if (num % 2 === 0) evens.push(num);
}
show("Even numbers (for...of)", evens.join(", "));

/* ---------------- 3. Arrays ---------------- */
heading("3. Arrays");

const projects = ["Portfolio", "Weather App", "Quiz App", "Chat App"];
show("Original array", projects.join(", "));

projects.push("Expense Tracker"); // add to the end
show("After push('Expense Tracker')", projects.join(", "));

const removed = projects.pop(); // remove from the end
show(`After pop() - removed "${removed}"`, projects.join(", "));

const upper = projects.map((p) => p.toUpperCase()); // new transformed array
show("map() to uppercase", upper.join(", "));

const appProjects = projects.filter((p) => p.endsWith("App")); // new filtered array
show('filter() names ending in "App"', appProjects.join(", "));

const sorted = [...projects].sort(); // copy first so the original is unchanged
show("sort() (on a copy)", sorted.join(", "));

show('includes("Quiz App")', projects.includes("Quiz App"));

const numbered = [];
projects.forEach((p, index) => numbered.push(`${index + 1}.${p}`)); // runs once per item
show("forEach() numbering", numbered.join("  "));

/* ---------------- 4. Functions ---------------- */
heading("4. Functions");

const ratings = [4, 3, 3, 2, 2];

// Function declaration
function averageRating(list) {
  let total = 0;
  for (const r of list) total += r;
  return total / list.length;
}

// Equivalent arrow function (same task, shorter syntax)
const averageRatingArrow = (list) => list.reduce((total, r) => total + r, 0) / list.length;

show("averageRating() - declaration", averageRating(ratings).toFixed(2));
show("averageRatingArrow() - arrow", averageRatingArrow(ratings).toFixed(2));

// Arrow function with a default parameter
const greet = (name = "Guest") => `Hello, ${name}!`;
show("greet()", greet());
show('greet("Ananya")', greet("Ananya"));

// Rest parameters - accept any number of arguments
function total(...nums) {
  return nums.reduce((acc, val) => acc + val, 0);
}
show("total(1, 2, 3, 4, 5)", total(1, 2, 3, 4, 5));

/* ---------------- 5. String Manipulation ---------------- */
heading("5. String Manipulation");

const course = "  Full Stack Web Development  ";
const clean = course.trim();

show("Original string", `"${course}"`);
show("trim()", `"${clean}"`);
show("length (after trim)", clean.length);
show("toUpperCase()", clean.toUpperCase());
show("toLowerCase()", clean.toLowerCase());
show('split(" ")', clean.split(" ").join(" / "));
show("slice(0, 10)", clean.slice(0, 10));
show('replace("Web", "Mobile")', clean.replace("Web", "Mobile"));
show('includes("Stack")', clean.includes("Stack"));
show("Concatenation with +", "Lab: " + clean + " (" + 2026 + ")");
show("Template literal", `Student: ${greet("Ananya")} Marks: ${marks}, Grade: ${grade}`);

/* ---------------- 6. Putting it together ---------------- */
heading("6. Skill Summary (all concepts combined)");

const studentName = "  ananya rao ";
const skills = [
  { name: "HTML & CSS", rating: 4 },
  { name: "JavaScript", rating: 3 },
  { name: "React JS", rating: 3 },
  { name: "Node & Express", rating: 2 },
  { name: "MongoDB", rating: 2 },
];

// Convert a 1-5 rating into a word using switch
function ratingLevel(rating) {
  switch (rating) {
    case 5: return "Expert";
    case 4: return "Advanced";
    case 3: return "Intermediate";
    default: return "Beginner";
  }
}

// Capitalise every word: "ananya rao" -> "Ananya Rao"
const titleCase = (text) =>
  text
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

show("Skill report for", titleCase(studentName));

skills.forEach((skill) => {
  const stars = "*".repeat(skill.rating) + "-".repeat(5 - skill.rating);
  show(skill.name.padEnd(15, "."), `[${stars}] ${skill.rating}/5 ${ratingLevel(skill.rating)}`);
});

const strongSkills = skills.filter((s) => s.rating >= 3).map((s) => s.name);
show("Strong skills (rating >= 3)", strongSkills.join(", "));
show("Average skill rating", averageRating(skills.map((s) => s.rating)).toFixed(1));
