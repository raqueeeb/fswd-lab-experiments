// Experiment 09 - RESTful API with Express.js
// Serves portfolio data (projects) and handles Contact-form submissions.
// Run: npm install  then  npm start  ->  http://localhost:5001

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

/* ---------- Middleware ---------- */
app.use(express.json()); // parse JSON request bodies into req.body

// allow the React dev server (a different origin/port) to call this API
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

// custom middleware: log every request, then pass control on with next()
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.originalUrl}`);
  next();
});

/* ---------- In-memory data store (replaced by MongoDB in Experiment 10) ---------- */
let projects = [
  { id: 1, title: "Library Management System", stack: "Java, MySQL", rating: 4 },
  { id: 2, title: "Weather App", stack: "HTML, CSS, JavaScript, Fetch API", rating: 5 },
  { id: 3, title: "Result Portal", stack: "PHP, MySQL", rating: 3 },
];
const messages = []; // contact-form submissions
let nextProjectId = 4;
let nextMessageId = 1;

const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}$/;

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio REST API is running",
    endpoints: [
      "GET    /api/projects",
      "GET    /api/projects/:id",
      "POST   /api/projects",
      "DELETE /api/projects/:id",
      "POST   /api/contact",
      "GET    /api/messages",
    ],
  });
});

// READ all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// READ one project
app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// CREATE a project
app.post("/api/projects", (req, res) => {
  const { title, stack = "", rating = 3 } = req.body ?? {};

  if (!title || !String(title).trim()) {
    return res.status(400).json({ error: "title is required" });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "rating must be a whole number from 1 to 5" });
  }

  const project = { id: nextProjectId++, title: String(title).trim(), stack: String(stack).trim(), rating };
  projects.push(project);
  res.status(201).json(project); // 201 Created
});

// DELETE a project
app.delete("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = projects.length;
  projects = projects.filter((p) => p.id !== id);

  if (projects.length === before) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json({ message: "Project deleted", id });
});

// Contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body ?? {};

  // server-side validation (client-side checks can be bypassed)
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  if (!EMAIL_PATTERN.test(String(email).trim())) {
    return res.status(400).json({ error: "email is not valid" });
  }
  if (String(message).trim().length < 10) {
    return res.status(400).json({ error: "message must be at least 10 characters" });
  }

  const entry = {
    id: nextMessageId++,
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
  };
  messages.push(entry);

  console.log(`New contact message from ${entry.name}`);
  res.status(201).json({ message: "Message received, thank you!", entry });
});

// Admin view: list submitted messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

/* ---------- 404 handler for unknown routes ---------- */
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

/* ---------- Error-handling middleware (has 4 parameters) ---------- */
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Express API listening on http://localhost:${PORT}`);
});
