function About({ name, photo, bio }) {
  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <div className="about-box">
        <img src={photo} alt={`Profile photo of ${name}`} className="profile-pic" />
        <p>{bio}</p>
      </div>
    </section>
  );
}

export default About;
