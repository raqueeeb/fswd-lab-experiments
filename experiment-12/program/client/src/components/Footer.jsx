function Footer({ name }) {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} {name}. Built with the MERN stack for FSWD Lab.</p>
    </footer>
  );
}

export default Footer;
