// ProjectGallery: list of ProjectCards + an add form + a search box
import { useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { cardColors } from "../data/portfolioData.js";

function ProjectGallery({ projects, onAdd, onRemove }) {
  // local state for the controlled inputs
  const [title, setTitle] = useState("");
  const [stack, setStack] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), stack.trim() || "New project");
    setTitle("");
    setStack("");
  };

  const query = search.trim().toLowerCase();
  const visible = projects.filter(
    (p) => p.title.toLowerCase().includes(query) || p.stack.toLowerCase().includes(query)
  );

  return (
    <section id="gallery" className="section">
      <h2>Project Gallery</h2>

      <form className="add-form" onSubmit={handleSubmit}>
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
        <button type="submit">Add Project</button>
      </form>

      <input
        type="search"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects..."
        aria-label="Search projects"
      />

      <div className="gallery-grid">
        {visible.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            stack={project.stack}
            color={cardColors[index % cardColors.length]}
            onRemove={() => onRemove(project.id)}
          />
        ))}
      </div>

      {visible.length === 0 && <p className="empty-message">No projects to show.</p>}
      <p className="counter">
        Showing {visible.length} of {projects.length} projects
      </p>
    </section>
  );
}

export default ProjectGallery;
