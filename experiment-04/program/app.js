// Experiment 04 - Bring the portfolio to life
// Render project cards from an array, add/remove cards, search, hover highlight
// and a light/dark theme toggle that is remembered by the browser.

/* ---------- 1. Select the DOM elements we need ---------- */
const gallery = document.querySelector("#galleryGrid");
const counter = document.querySelector("#counter");
const emptyMessage = document.querySelector("#emptyMessage");
const addForm = document.querySelector("#addForm");
const titleInput = document.querySelector("#titleInput");
const descInput = document.querySelector("#descInput");
const formMessage = document.querySelector("#formMessage");
const searchInput = document.querySelector("#searchInput");
const themeBtn = document.querySelector("#themeBtn");

/* ---------- 2. Project data (title, description, image URL) ---------- */
const projects = [
  { id: 1, title: "Library Management System", description: "Java, MySQL", image: "images/project1.svg" },
  { id: 2, title: "Weather App", description: "HTML, CSS, JavaScript", image: "images/project2.svg" },
  { id: 3, title: "Result Portal", description: "PHP, MySQL", image: "images/project3.svg" },
];
let nextId = 4;

/* ---------- 3. Build one card element for a project ---------- */
// createElement + textContent is safer than innerHTML for user-typed text
function createCard(project) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = project.id;

  const img = document.createElement("img");
  img.src = project.image;
  img.alt = `${project.title} thumbnail`;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const desc = document.createElement("p");
  desc.textContent = project.description;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";

  card.append(img, title, desc, removeBtn);
  return card;
}

/* ---------- 4. Render the (filtered) list of projects ---------- */
function renderProjects() {
  const query = searchInput.value.trim().toLowerCase();

  const visible = projects.filter(
    (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
  );

  gallery.replaceChildren(); // remove the old cards
  visible.forEach((project) => gallery.appendChild(createCard(project)));

  emptyMessage.hidden = visible.length > 0 || projects.length === 0;
  counter.textContent = query
    ? `Showing ${visible.length} of ${projects.length} projects`
    : `Total projects: ${projects.length}`;
}

/* ---------- 5. Add a project (form "submit" also handles the Enter key) ---------- */
addForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const title = titleInput.value.trim();
  if (title === "") {
    formMessage.textContent = "Please enter a project title first.";
    titleInput.focus();
    return;
  }

  // cycle through the 6 thumbnail images for new cards
  const imageNumber = ((nextId - 1) % 6) + 1;
  projects.push({
    id: nextId++,
    title,
    description: descInput.value.trim() || "New project",
    image: `images/project${imageNumber}.svg`,
  });

  formMessage.textContent = "";
  addForm.reset();
  renderProjects();
});

// clear the warning as soon as the user starts typing
titleInput.addEventListener("input", () => {
  formMessage.textContent = "";
});

/* ---------- 6. Remove a project (event delegation) ---------- */
// One listener on the grid handles the Remove button of every card,
// including cards that are added later.
gallery.addEventListener("click", (event) => {
  if (!event.target.classList.contains("remove-btn")) return;

  const card = event.target.closest(".card");
  const index = projects.findIndex((p) => p.id === Number(card.dataset.id));
  if (index !== -1) projects.splice(index, 1);
  renderProjects();
});

/* ---------- 7. Highlight a card while the mouse is over it ---------- */
gallery.addEventListener("mouseover", (event) => {
  const card = event.target.closest(".card");
  if (card) card.classList.add("highlight");
});

gallery.addEventListener("mouseout", (event) => {
  const card = event.target.closest(".card");
  if (card) card.classList.remove("highlight");
});

/* ---------- 8. Search box: filter cards while typing ---------- */
searchInput.addEventListener("input", renderProjects);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    renderProjects();
  }
});

/* ---------- 9. Theme toggle (remembered with localStorage) ---------- */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme); // saved choice survives page reloads
});

/* ---------- Initial page setup ---------- */
applyTheme(localStorage.getItem("theme") || "light");
renderProjects();
