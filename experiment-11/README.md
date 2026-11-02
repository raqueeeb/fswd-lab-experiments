# Experiment 11 – Full-Stack Integration (React + Express + MongoDB)

> **Syllabus:** Full-Stack Integration - Integrate React (Exp 07) + Express (Exp 09) + MongoDB (Exp 10) into a single deployable MERN application.

| Technology | Program | Viva |
|---|---|---|
| MongoDB, Express 5, React 19, Node.js (MERN) + Vite, Mongoose | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To integrate the React frontend, Express API, and MongoDB database into a single, cohesive MERN application.

## How it fits together

```text
Development                                   Production (npm run build + npm start)
-----------                                   --------------------------------------
Browser -> :5173 Vite dev server (React)      Browser -> :5004 Express
              |  /api/* (proxy)                            |-- /api/*  -> routes -> Mongoose -> MongoDB
              v                                            '-- other   -> client/dist (React build)
           :5004 Express -> Mongoose -> MongoDB
```

## Files

| Path | Purpose |
|---|---|
| [`program/package.json`](program/package.json) | Root scripts: one `npm install` installs client **and** server |
| [`program/server/server.js`](program/server/server.js) | Express API (from Exp 09/10) + serves the React build |
| [`program/server/models/`](program/server/models/), [`program/server/routes/`](program/server/routes/) | Mongoose models and CRUD routes (from Exp 10) |
| [`program/server/seed.js`](program/server/seed.js), [`program/server/.env.example`](program/server/.env.example) | Sample data and environment template |
| [`program/client/src/api.js`](program/client/src/api.js) | All `fetch` calls to the API in one place (`VITE_API_URL` support) |
| [`program/client/src/components/ProjectGallery.jsx`](program/client/src/components/ProjectGallery.jsx) | Live projects from MongoDB with loading / error / retry states |
| [`program/client/src/components/ContactForm.jsx`](program/client/src/components/ContactForm.jsx) | Validates, then `POST /api/contact` (saved in MongoDB) |
| [`program/client/vite.config.js`](program/client/vite.config.js) | Dev proxy: `/api` → `http://localhost:5004` |

## How to run

You need a MongoDB connection string (see [Experiment 10, Step 1](../experiment-10/README.md#step-1--create-a-free-mongodb-atlas-cluster)).

**Setup (once)**

```powershell
cd experiment-11\program
npm install
copy server\.env.example server\.env
notepad server\.env
npm run seed
```

`npm install` also installs the `server/` and `client/` packages. Put your `MONGO_URI` in `server/.env`; `npm run seed` adds 3 sample projects.

**Development mode – two terminals**

```powershell
# Terminal 1 (API on http://localhost:5004)
cd experiment-11\program
npm run dev:server

# Terminal 2 (React on http://localhost:5173)
cd experiment-11\program
npm run dev:client
```

Open **http://localhost:5173**.

**Production mode – one server**

```powershell
cd experiment-11\program
npm run build
npm start
```

Open **http://localhost:5004** (Express serves both the API and the React app).

## Expected output

- The gallery shows *"Loading projects from the server..."*, then the projects stored in MongoDB.
- **Add Project** saves a new document and shows it immediately; **Remove** deletes it from the database.
- The contact form validates on the client, then shows **"Message received, thank you! (saved to MongoDB)"**; the message appears in the `contacts` collection (and at http://localhost:5004/api/messages).
- If the API is down, an error message with a **Retry** button is shown.
- The theme toggle, skills table and GitHub card from Experiment 07 still work.

## Procedure

1. Organise the project into `client/` and `server/` folders.
2. Replace the mock project data in React with a `useEffect` that calls `GET /api/projects` and stores the result in state.
3. Add `loading` and `error` state with a loading message and an error message (plus Retry).
4. Make `ContactForm` send validated data to `POST /api/contact`.
5. Configure the Vite dev proxy (and the optional `VITE_API_URL`) so no server address is hardcoded.
6. Configure CORS on Express for the React dev server's origin (`CLIENT_ORIGIN`).
7. Test end to end: projects load from MongoDB, and a contact submission creates a document in the Contact collection.
8. Show a success message after a submission.
9. Remove unused mock data and confirm the theme toggle and skills table still work.

## Concepts covered

MERN architecture · client/server separation · Vite dev proxy · environment variables in Vite (`import.meta.env`) · `useEffect` data fetching · loading/error states · `async` event handlers · CORS · serving a SPA build with `express.static` + fallback route · client + server validation.

## Verification

End-to-end tests in headless Edge against a real MongoDB 8.2 server (in-memory; Atlas itself not tested), in **both** development (Vite proxy) and production (Express serving `client/dist`) modes – **28 checks passed**: live projects from MongoDB, add/delete persisted in the database, client validation, contact message saved in MongoDB, theme toggle, error state + Retry, SPA fallback route, JSON 404 for unknown API routes, no console errors. The root `npm install` (postinstall) was also verified.
