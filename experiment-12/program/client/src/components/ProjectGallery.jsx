// ProjectGallery: loads projects from the Express + MongoDB API (no more mock data)
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { cardColors } from "../data/portfolioData.js";
import { getProjects, createProject, deleteProject } from "../api.js";

function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [stack, setStack] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      setProjects(await getProjects()); // GET /api/projects
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // fetch the live project list once, after the first render
  useEffect(() => {
    loadProjects();
  }, []);

  async function handleAdd(event) {
    event.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    setError("");
    try {
      // POST /api/projects - the server answers with the saved document (including its _id)
      const saved = await createProject({ title: title.trim(), stack: stack.trim() || "MERN Stack" });
      setProjects((current) => [saved, ...current]);
      setTitle("");
      setStack("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id) {
    setError("");
    try {
      await deleteProject(id); // DELETE /api/projects/:id
      setProjects((current) => current.filter((project) => project._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section id="gallery" className="section">
      <h2>Project Gallery</h2>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New project title"
          aria-label="Project title"
        />
        <input
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="Tech stack (optional)"
          aria-label="Tech stack"
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Project"}
        </button>
      </form>

      {error && (
        <p className="status fail">
          {error}{" "}
          <button type="button" className="link-btn" onClick={loadProjects}>
            Retry
          </button>
        </p>
      )}

      {loading ? (
        <p className="loading">Loading projects from the server...</p>
      ) : (
        <>
          <div className="gallery-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                stack={project.stack}
                color={cardColors[index % cardColors.length]}
                onRemove={() => handleRemove(project._id)}
              />
            ))}
          </div>
          {projects.length === 0 && !error && (
            <p className="empty-message">No projects in the database yet - add one above or run "npm run seed".</p>
          )}
          <p className="counter">Total projects in MongoDB: {projects.length}</p>
        </>
      )}
    </section>
  );
}

export default ProjectGallery;
