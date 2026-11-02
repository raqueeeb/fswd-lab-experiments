# Experiment 11 – Viva Questions & Answers

**Full-Stack Integration (React + Express + MongoDB)**

[⬅ Experiment 11](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 11 in the FSWD lab manual.

---

### Q1. What does the acronym MERN stand for, and what role does each technology play?

**Answer:**

| Letter | Technology | Role |
|---|---|---|
| **M** | MongoDB | Database |
| **E** | Express.js | Backend web framework (REST API) |
| **R** | React | Frontend UI library |
| **N** | Node.js | JavaScript runtime for the server |

Together they form a full **JavaScript-based stack** from the database to the browser.

---

### Q2. Why is it good practice to separate the client and server into distinct folders or processes during development?

**Answer:** It keeps **frontend and backend concerns independent**, lets each be developed, tested and scaled separately, and mirrors how they are usually **deployed as separate services**.

*In the program:* `program/client` (React) and `program/server` (Express + Mongoose).

---

### Q3. What problem does a development proxy or an API base URL environment variable solve?

**Answer:** It **avoids hardcoding the backend address** in the frontend code and prevents **cross-origin problems** during local development, by routing all frontend API calls to the backend consistently.

```js
// vite.config.js - forward /api/... from :5173 to Express on :5004
server: { proxy: { "/api": "http://localhost:5004" } }
```

---

### Q4. Why is it important to handle loading and error states explicitly when fetching data from an API?

**Answer:** Network requests are **asynchronous and can be slow or fail**. Without explicit loading and error states, users see a **blank or broken page** with no idea what is happening.

*In the program:* `ProjectGallery` shows "Loading projects from the server...", or an error message with a **Retry** button.

---

### Q5. In a full-stack flow, where should form validation occur, and why?

**Answer:** **Both places.** On the **client** for instant feedback and a better user experience, and on the **server** as the authoritative check, because client-side checks can be bypassed. Together they give usability **and** data integrity.

---

### Q6. What is the typical request path when a user submits the Contact form in the fully integrated application?

**Answer:**

```
React ContactForm ──POST /api/contact──▶ Express route ──▶ Contact model (Mongoose validation)
        ▲                                                         │
        └────────── JSON response (201) ◀──── saved in MongoDB Atlas ◀┘
```

The React form sends the request to the Express contact endpoint. Express passes the data to the Contact model, which validates it and saves it as a document in MongoDB Atlas. Express then responds so the UI can show a success message.

---

## Quick revision

| Concept | Remember |
|---|---|
| MERN | MongoDB · Express · React · Node |
| client/ + server/ | Separate concerns, separate deploys |
| Proxy / `VITE_API_URL` | No hardcoded backend URL |
| Loading/error states | Never leave the user with a blank screen |
| Validation | Client (UX) + server (security) |
| Contact flow | React → Express → Mongoose → MongoDB → response |
