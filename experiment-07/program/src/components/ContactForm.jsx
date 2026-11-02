// ContactForm: controlled inputs (useState) + the regex validation from Experiment 05
import { useState } from "react";

const emptyForm = { name: "", email: "", message: "" };

// Returns an object like { email: "Enter a valid email address." } - empty means valid
function validate(form) {
  const errors = {};
  if (!/^[A-Za-z ]{3,30}$/.test(form.name.trim())) {
    errors.name = "Name should be 3-30 letters and spaces only.";
  }
  if (!/^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // One change handler for every input, using the input's name attribute
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("");
      return;
    }
    // Sent to the Express API in Experiment 11
    setStatus(`Thanks ${form.name.trim()}, your message is valid and ready to send!`);
    setForm(emptyForm);
  };

  return (
    <section id="contact" className="section">
      <h2>Contact Me</h2>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} className={errors.name ? "invalid" : ""} />
        <span className="field-error">{errors.name}</span>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={form.email} onChange={handleChange} className={errors.email ? "invalid" : ""} />
        <span className="field-error">{errors.email}</span>

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={errors.message ? "invalid" : ""}
        />
        <span className="field-error">{errors.message}</span>

        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status success">{status}</p>}
    </section>
  );
}

export default ContactForm;
