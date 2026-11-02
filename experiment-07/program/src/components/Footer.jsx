function Footer({ name }) {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} {name}. Built with React for FSWD Lab.</p>
    </footer>
  );
}

export default Footer;
