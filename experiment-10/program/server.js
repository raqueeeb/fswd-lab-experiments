// Experiment 10 - Express API + MongoDB Atlas using Mongoose
// Full CRUD on the Projects and Contact collections.
// Run: copy .env.example to .env, add your MONGO_URI, then npm start

require("dotenv").config({ quiet: true }); // load variables from .env into process.env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI;

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.originalUrl}`);
  next();
});

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API with MongoDB is running", projects: "/api/projects", messages: "/api/messages" });
});

app.use("/api/projects", projectRoutes);
app.use("/api", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

/* ---------- Error handling ---------- */
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    // Mongoose schema validation failed, e.g. a required field is missing
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "Validation failed", details });
  }
  if (err.name === "CastError") {
    // the :id in the URL is not a valid MongoDB ObjectId
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

/* ---------- Connect to MongoDB first, then start the server ---------- */
async function startServer() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set. Copy .env.example to .env and add your MongoDB connection string.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected (database: ${mongoose.connection.name})`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Check the username/password in MONGO_URI and the Atlas Network Access (IP) list.");
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
