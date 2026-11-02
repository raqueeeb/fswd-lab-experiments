// Root component: owns the shared state (theme, projects) and passes it down as props
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import SkillsTable from "./components/SkillsTable.jsx";
import ProjectGallery from "./components/ProjectGallery.jsx";
import GitHubStats from "./components/GitHubStats.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import { profile, skills, initialProjects } from "./data/portfolioData.js";

function App() {
  // useState returns [currentValue, setterFunction]
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [projects, setProjects] = useState(initialProjects);

  // Side effect: whenever `theme` changes, update <body> and remember the choice
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  // State is never changed directly - we always create a new array
  const addProject = (title, stack) => {
    setProjects((current) => [...current, { id: Date.now(), title, stack }]);
  };

  const removeProject = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
  };

  return (
    <>
      <Header name={profile.name} tagline={profile.tagline} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <About name={profile.name} photo={profile.photo} bio={profile.bio} />
        <SkillsTable skills={skills} />
        <ProjectGallery projects={projects} onAdd={addProject} onRemove={removeProject} />
        <GitHubStats username={profile.github} />
        <ContactForm />
      </main>
      <Footer name={profile.name} />
    </>
  );
}

export default App;
