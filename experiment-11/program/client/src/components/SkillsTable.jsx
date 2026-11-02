// SkillsTable: receives an array as a prop and renders one row per skill
function SkillsTable({ skills }) {
  return (
    <section id="skills" className="section">
      <h2>Skills &amp; Ratings</h2>
      <table className="skills-table">
        <thead>
          <tr>
            <th scope="col">Skill</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            // key helps React track each row between renders
            <tr key={skill.name}>
              <td>{skill.name}</td>
              <td>
                <span className="stars" aria-hidden="true">
                  {"★".repeat(skill.rating)}
                  {"☆".repeat(5 - skill.rating)}
                </span>{" "}
                {skill.rating}/5
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SkillsTable;
