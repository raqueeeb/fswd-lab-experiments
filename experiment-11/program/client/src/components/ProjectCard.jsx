// ProjectCard: one reusable card, configured entirely through props
function ProjectCard({ title, stack, color, onRemove }) {
  return (
    <article className="card">
      <div className="thumb" style={{ background: color }}>
        {title}
      </div>
      <h3>{title}</h3>
      <p>{stack}</p>
      <button type="button" className="remove-btn" onClick={onRemove}>
        Remove
      </button>
    </article>
  );
}

export default ProjectCard;
