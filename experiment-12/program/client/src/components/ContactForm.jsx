// ContactForm: validates on the client, then saves the message in MongoDB via the API
import { useState } from "react";
import { sendContactMessage } from "../api.js";

const emptyForm = { name: "", email: "", message: "" };

// Client-side checks give instant feedback; the server validates again (Mongoose schema)
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
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ type: "", text: "" });
      return;
    }

    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      // POST /api/contact -> Express -> Contact model -> MongoDB
      const data = await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setStatus({ type: "success", text: `${data.message} (saved to MongoDB)` });
      setForm(emptyForm);
    } catch (err) {
      setStatus({ type: "fail", text: `Could not send your message: ${err.message}` });
    } finally {
      setSending(false);
    }
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

        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status.text && <p className={`status ${status.type}`}>{status.text}</p>}
    </section>
  );
}

export default ContactForm;
