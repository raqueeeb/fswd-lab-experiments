// Header: receives the name, tagline, current theme and a toggle function as props
function Header({ name, tagline, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="brand">
        <h1>{name}</h1>
        <p>{tagline}</p>
      </div>
      <nav className="navbar">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#gallery">Projects</a>
        <a href="#contact">Contact</a>
        <button type="button" className="theme-btn" onClick={onToggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
