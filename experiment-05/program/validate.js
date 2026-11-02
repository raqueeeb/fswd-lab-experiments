// Experiment 05 - Contact form validation using regex + try / catch / finally

/* ---------- 1. Select the form and its fields ---------- */
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusText = document.getElementById("formStatus");

/* ---------- 2. Regex patterns ---------- */
const namePattern = /^[A-Za-z ]{3,30}$/;                          // letters and spaces, 3-30 characters
const emailPattern = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}$/; // user@domain.com, user@mail.college.ac.in
const phonePattern = /^[6-9]\d{9}$/;                              // 10 digit Indian mobile number
const MIN_MESSAGE_LENGTH = 10;

/* ---------- 3. A custom error type for validation failures ---------- */
// Lets the catch block tell "the user typed something wrong" apart from a real bug.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Every field: its id, a test function and the message to show when the test fails
const rules = [
  { id: "name", label: "Name", test: (v) => namePattern.test(v), message: "Name should be 3-30 letters and spaces only." },
  { id: "email", label: "Email", test: (v) => emailPattern.test(v), message: "Enter a valid email address, e.g. you@example.com." },
  { id: "phone", label: "Phone", test: (v) => phonePattern.test(v), message: "Enter a valid 10 digit mobile number starting with 6-9." },
  { id: "message", label: "Message", test: (v) => v.length >= MIN_MESSAGE_LENGTH, message: `Message must be at least ${MIN_MESSAGE_LENGTH} characters.` },
];

/* ---------- 4. Helpers to show / clear inline errors ---------- */
function setError(fieldId, message) {
  document.getElementById(fieldId).classList.add("invalid");
  document.getElementById(`${fieldId}Error`).textContent = message;
}

function clearError(fieldId) {
  document.getElementById(fieldId).classList.remove("invalid");
  document.getElementById(`${fieldId}Error`).textContent = "";
}

// Returns true when the value passes, otherwise throws a ValidationError
function validateField(rule) {
  const value = document.getElementById(rule.id).value.trim();
  if (value === "") {
    throw new ValidationError(`${rule.label} is required.`);
  }
  if (!rule.test(value)) {
    throw new ValidationError(rule.message);
  }
  return true;
}

/* ---------- 5. Validate everything when the form is submitted ---------- */
form.addEventListener("submit", (event) => {
  event.preventDefault(); // do not reload the page / send the form yet

  submitBtn.disabled = true;
  submitBtn.textContent = "Checking...";
  statusText.textContent = "";
  statusText.className = "";

  try {
    let errorCount = 0;

    // Each field has its own try-catch, so ALL invalid fields are reported together
    for (const rule of rules) {
      try {
        validateField(rule);
        clearError(rule.id);
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err; // unexpected error -> outer catch
        setError(rule.id, err.message);
        errorCount++;
      }
    }

    if (errorCount > 0) {
      throw new ValidationError(`Please fix the ${errorCount} highlighted field(s) before submitting.`);
    }

    // All fields are valid (sent to a real server in Experiments 09-11)
    statusText.textContent = "Form submitted successfully!";
    statusText.className = "success";
    form.reset();
  } catch (err) {
    console.error(`${err.name}: ${err.message}`); // log the error for the developer
    statusText.textContent =
      err instanceof ValidationError ? err.message : "Something went wrong. Please try again.";
    statusText.className = "fail";
  } finally {
    // runs whether validation passed or failed
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});

/* ---------- 6. Remove a field's error as soon as the user edits it ---------- */
for (const rule of rules) {
  document.getElementById(rule.id).addEventListener("input", () => clearError(rule.id));
}
