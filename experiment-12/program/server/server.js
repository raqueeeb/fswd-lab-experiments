// Experiment 12 - Production-ready MERN server (deployed to Render + MongoDB Atlas)
// Same app as Experiment 11, plus: environment-based config, CORS for the live
// frontend domain, a health-check endpoint and less logging in production.

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true }); // local only; Render injects env vars
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5004; // Render provides PORT automatically
const MONGO_URI = process.env.MONGO_URI;
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

// Comma-separated list of frontend origins allowed to call the API, e.g.
// CORS_ORIGIN=https://my-portfolio.vercel.app,http://localhost:5173
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/* ---------- Middleware ---------- */
app.use(express.json({ limit: "10kb" })); // reject very large request bodies
app.use(cors({ origin: allowedOrigins }));
if (!IS_PRODUCTION) {
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.originalUrl}`);
    next();
  });
}

/* ---------- Health check (used by Render and by verify-deployment.js) ---------- */
app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "error",
    database: dbConnected ? "connected" : "disconnected",
    environment: IS_PRODUCTION ? "production" : "development",
    uptimeSeconds: Math.round(process.uptime()),
  });
});

/* ---------- API routes ---------- */
app.use("/api/projects", projectRoutes);
app.use("/api", contactRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

/* ---------- Serve the React production build ---------- */
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running. Run 'npm run build' to serve the React app from this server.");
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
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large" });
  }
  console.error(err);
  // never send internal error details to users in production
  res.status(500).json({ error: IS_PRODUCTION ? "Something went wrong on the server" : err.message });
});

/* ---------- Connect to MongoDB, then start listening ---------- */
async function startServer() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set. Locally: create server/.env. On Render: add it under Environment.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected (database: ${mongoose.connection.name})`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("On Atlas, check the database user/password and Network Access (allow 0.0.0.0/0 for Render).");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`MERN app running on http://localhost:${PORT} (${IS_PRODUCTION ? "production" : "development"})`);
    console.log(`CORS allowed origins: ${allowedOrigins.join(", ")}`);
  });
}

startServer();
