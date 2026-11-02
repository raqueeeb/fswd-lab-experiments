// Root component of the integrated MERN portfolio
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import SkillsTable from "./components/SkillsTable.jsx";
import ProjectGallery from "./components/ProjectGallery.jsx";
import GitHubStats from "./components/GitHubStats.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import { profile, skills } from "./data/portfolioData.js";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <>
      <Header name={profile.name} tagline={profile.tagline} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <About name={profile.name} photo={profile.photo} bio={profile.bio} />
        <SkillsTable skills={skills} />
        {/* Projects are loaded from the Express + MongoDB API */}
        <ProjectGallery />
        <GitHubStats username={profile.github} />
        {/* Messages are saved to MongoDB through the API */}
        <ContactForm />
      </main>
      <Footer name={profile.name} />
    </>
  );
}

export default App;
