# Experiment 05 – Contact Form Validation using Regex & Exception Handling

> **Syllabus:** Validate the Contact form from Exp 01 using regex patterns; implement try-catch exception handling.

| Technology | Program | Viva |
|---|---|---|
| HTML5, CSS3, JavaScript (Regex, try/catch/finally) | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To validate the Contact form built in Experiment 1 using JavaScript regular expressions and implement try-catch based exception handling.

## Files

| File | Purpose |
|---|---|
| [`program/index.html`](program/index.html) | Contact form (Name, Email, Phone, Message) with an error `<span>` under each field |
| [`program/validate.js`](program/validate.js) | Regex patterns, custom `ValidationError`, `try` / `catch` / `finally` |
| [`program/style.css`](program/style.css) | Form styles, red "invalid" state, success/fail messages |

## How to run

```powershell
cd experiment-05\program
start index.html
```

macOS: `open index.html` · Linux: `xdg-open index.html`

## Validation rules

| Field | Rule (regex) | Example of valid input |
|---|---|---|
| Name | `/^[A-Za-z ]{3,30}$/` – letters and spaces, 3–30 chars | `Ananya Rao` |
| Email | `/^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}$/` | `ananya@mail.college.ac.in` |
| Phone | `/^[6-9]\d{9}$/` – 10-digit Indian mobile number | `9876543210` |
| Message | at least 10 characters | `Hello, I liked your portfolio!` |

## Expected output

| Input | Result |
|---|---|
| Submit an empty form | All 4 fields turn red with "… is required." and the form message "Please fix the 4 highlighted field(s) before submitting." |
| `A1`, `ananya@@web`, `12345`, `hi` | All 4 fields show their specific error message |
| Valid values | "Form submitted successfully!" in green; the form is cleared |
| Typing in a red field | Its error disappears immediately |

Open the console (F12) to see the `ValidationError` logged by the `catch` block.

## Procedure

1. Select the form and its fields with DOM methods.
2. Listen for `submit` and call `event.preventDefault()`.
3. Define the regex patterns and the minimum message length.
4. Write `validateField()`, which tests a value and throws a `ValidationError` when it is invalid.
5. Show an inline error and a red style for each invalid field; clear it for valid fields.
6. Wrap the whole validation in `try`, and `throw` a custom error when any field fails (e.g. an empty required field).
7. In `catch`, log the error and show a form-level message.
8. In `finally`, re-enable the submit button (reset the "submitting" state).
9. On success, show a confirmation message (replaced by a real submission in Experiments 09–11).
10. Test valid input, invalid input and edge cases.

## Concepts covered

Regular expressions and `test()` · custom error classes (`class ValidationError extends Error`) · `throw` · nested `try`/`catch` · `finally` · `instanceof` · inline error UI.

## Verification

Automated in headless Edge: empty form → 4 errors, invalid data → 4 errors, button re-enabled by `finally`, error cleared on input, valid data → success message and form reset. Only the intentional `ValidationError` logs appear in the console.
