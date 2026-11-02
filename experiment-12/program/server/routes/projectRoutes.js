// Full CRUD routes for projects, mounted at /api/projects
// Express 5 forwards errors thrown in async handlers to the error middleware,
// so these routes do not need their own try-catch blocks.
const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Only these fields may be set by the client
function projectFields(body = {}) {
  const { title, description, stack, imageUrl, rating } = body;
  return { title, description, stack, imageUrl, rating };
}

// CREATE - POST /api/projects
router.post("/", async (req, res) => {
  const project = await Project.create(projectFields(req.body));
  res.status(201).json(project);
});

// READ all - GET /api/projects (newest first)
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// READ one - GET /api/projects/:id
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// UPDATE - PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, projectFields(req.body), {
    returnDocument: "after", // return the updated document (older code used { new: true })
    runValidators: true,     // apply the schema rules to updates too
  });
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// DELETE - DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json({ message: "Project deleted", id: req.params.id });
});

module.exports = router;
