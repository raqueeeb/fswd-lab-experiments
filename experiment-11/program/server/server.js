// Experiment 11 - Full-Stack Integration (MERN)
// React (Exp 07) + Express (Exp 09) + MongoDB/Mongoose (Exp 10) in one application.
//
// Development: Express API on :5004, React dev server on :5173 (Vite proxies /api here)
// Production:  "npm run build" in client/, then this server also serves client/dist

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5004;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN })); // the React dev server's origin
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.originalUrl}`);
  next();
});

/* ---------- API routes (same as Experiment 10) ---------- */
app.use("/api/projects", projectRoutes);
app.use("/api", contactRoutes);

// unknown /api/... routes return JSON, not the React page
app.use("/api", (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

/* ---------- Serve the React production build ---------- */
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  // any other GET request gets the React app (client-side app handles the page)
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running. Start the React dev server (client) or run 'npm run build' to serve the app from here.");
  });
}

/* ---------- Error handling ---------- */
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "Validation failed", details });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

/* ---------- Connect to MongoDB, then start listening ---------- */
async function startServer() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set. Copy server/.env.example to server/.env and add your connection string.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected (database: ${mongoose.connection.name})`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`MERN app running on http://localhost:${PORT}`);
    if (!fs.existsSync(CLIENT_DIST)) console.log(`React dev server expected at ${CLIENT_ORIGIN}`);
  });
}

startServer();
