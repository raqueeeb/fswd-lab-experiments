# FSWD Lab Experiments

**Full Stack Web Development Lab (U23CS7L2) – B.E. CSE, VII Semester**

All 12 lab experiments, from a plain HTML page to a deployed MERN application, with runnable code and viva questions & answers for every experiment.

![Experiments](https://img.shields.io/badge/experiments-12-blue) ![Viva questions](https://img.shields.io/badge/viva_questions-72-green) ![Node.js](https://img.shields.io/badge/node-%3E%3D20.19-brightgreen) ![License: MIT](https://img.shields.io/badge/license-MIT-yellow)

[Quick Start](#1-quick-start--commands-to-run-all-experiments) · [Experiment Index](#3-experiment-index) · [Prerequisites](#5-prerequisites-and-installation) · [Viva Preparation](#7-viva-preparation) · [Repository Structure](#8-repository-structure)

---

## 1. Quick Start – Commands to Run All Experiments

```powershell
git clone https://github.com/Mohammed-Abdul-Raqueeb/fswd-lab-experiments.git
cd fswd-lab-experiments
```

> **Read this first**
> - Commands are written for **Windows (PowerShell or Command Prompt)**. On **macOS/Linux** use `/` instead of `\`, `cp` instead of `copy`, and `open` (macOS) / `xdg-open` (Linux) instead of `start`.
> - **Every block starts from the repository root** (`fswd-lab-experiments`). After an experiment, return with `cd ..\..`.
> - Stop any running server with **Ctrl + C**.

### At a glance

| # | Experiment | Technology | Run with | Open |
|---|---|---|---|---|
| 01 | [Personal Portfolio Page using HTML](experiment-01/) | HTML5 | `start index.html` | browser |
| 02 | [Styling the Portfolio with CSS](experiment-02/) | CSS3 | `start index.html` | browser |
| 03 | [JavaScript Basics](experiment-03/) | JavaScript | `node basics.js` | terminal / browser |
| 04 | [DOM Manipulation & Events](experiment-04/) | JavaScript DOM | `start index.html` | browser |
| 05 | [Contact Form Validation](experiment-05/) | Regex, try-catch | `start index.html` | browser |
| 06 | [Fetch API & Async/Await](experiment-06/) | Fetch API | `start index.html` | browser (internet) |
| 07 | [Portfolio with React.js](experiment-07/) | React + Vite | `npm install` → `npm run dev` | http://localhost:5173 |
| 08 | [Node.js Fundamentals](experiment-08/) | Node.js core | `node eventloop.js` / `node server.js` | http://localhost:5000 |
| 09 | [RESTful API with Express.js](experiment-09/) | Express | `npm install` → `npm start` | http://localhost:5001 |
| 10 | [MongoDB & Mongoose CRUD](experiment-10/) | MongoDB, Mongoose | `npm install` → `npm start` | http://localhost:5002 |
| 11 | [Full-Stack Integration (MERN)](experiment-11/) | MERN | `npm install` → `npm run dev:server` + `npm run dev:client` | http://localhost:5173 |
| 12 | [Deployment of the MERN App](experiment-12/) | Render + Atlas | `npm run build` → `npm start` | http://localhost:5004 / your Render URL |

---

### Experiment 01 – Personal Portfolio Page using HTML

**Requirements:** a web browser · **Technology:** HTML5

```powershell
cd experiment-01\program
start index.html
```

**Expected output:** an unstyled page with a header + nav links, a profile image and bio, a bordered *Skills & Ratings* table (5 skills, rated out of 5), three projects, and a contact form (Name, Email, Message, Send/Clear).

### Experiment 02 – Styling the Portfolio with CSS (Box Model, Flexbox & Grid)

**Requirements:** a web browser · **Technology:** HTML5, CSS3

```powershell
cd experiment-02\program
start index.html
```

**Expected output:** a styled portfolio with a dark-blue Flexbox header and a 6-card Grid gallery. Press **F12 → Ctrl + Shift + M** and resize: the gallery shows **3 columns** on desktop, **2** on tablets (≤ 768px, header stacks) and **1** on phones (≤ 480px).

### Experiment 03 – JavaScript Basics — Operators, Control Flow, Arrays, Functions, Strings

**Requirements:** Node.js (or just a browser) · **Technology:** JavaScript

```powershell
cd experiment-03\program
node basics.js
```

Browser alternative: `start basics.html` (output on the page and in the F12 console).

**Expected output:** six labelled sections of results, e.g. `a ** 2 (exponent): 144`, `Grade for 78 marks (if-else): B`, `Factorial of 5 (while loop): 120`, `filter() names ending in "App": Weather App, Quiz App, Chat App`, ending with a formatted skill summary and `Average skill rating: 2.8`.

### Experiment 04 – DOM Manipulation & Events

**Requirements:** a web browser · **Technology:** HTML5, CSS3, JavaScript

```powershell
cd experiment-04\program
start index.html
```

**Expected output:** 3 project cards rendered from a JavaScript array. **Add Project** (button or Enter) creates a card, **Remove** deletes one, hovering highlights a card, the search box filters cards (Esc clears it), and **Dark Mode** switches the theme (remembered after reload).

### Experiment 05 – Contact Form Validation using Regex & Exception Handling

**Requirements:** a web browser · **Technology:** JavaScript regex, try / catch / finally

```powershell
cd experiment-05\program
start index.html
```

**Expected output:** submitting empty/invalid data (e.g. `A1`, `ananya@@web`, `12345`, `hi`) turns each field red with its own message plus *"Please fix the 4 highlighted field(s)…"*. Valid data (e.g. `Ananya Rao`, `ananya@example.com`, `9876543210`, a 10+ character message) shows **"Form submitted successfully!"**.

### Experiment 06 – Fetch API & Async/Await

**Requirements:** a web browser + internet · **Technology:** Fetch API, async/await, GitHub REST API

```powershell
cd experiment-06\program
start index.html
```

**Expected output:** "Loading data…" then the GitHub card for `octocat` (avatar, name, repos/followers/following) and its 5 latest repositories. Search any username; an unknown one shows *"User not found."*
GitHub allows 60 unauthenticated requests per hour per IP – on a busy shared network you may see the (handled) *"rate limit reached"* message instead.

### Experiment 07 – Rebuilding the Portfolio with React.js

**Requirements:** Node.js **20.19+ or 22.12+** · **Technology:** React 19, Vite 8

```powershell
cd experiment-07\program
npm install
npm run dev
```

Open **http://localhost:5173**. (Production build: `npm run build` then `npm run preview` → http://localhost:4173.)

**Expected output:** the portfolio built from React components – theme toggle (`useState` + `useEffect`), skills table, add/remove/search projects, a GitHub card fetched in `useEffect`, and a validated contact form.

### Experiment 08 – Node.js Fundamentals — Event Loop & HTTP Server

**Requirements:** Node.js · **Technology:** Node.js core modules (`http`, `fs`, `path`, `os`, `url`) – nothing to install

```powershell
cd experiment-08\program
node -v
npm -v
node eventloop.js
node fileDemo.js
node server.js
```

With the server running, open **http://localhost:5000**, `/about`, `/projects`, `/projects?id=2`, `/system-info` and `/notes`.

**Expected output:** `eventloop.js` prints steps **1 → 9** in order (sync code → `nextTick` → Promise → `setTimeout` → `setImmediate`); `fileDemo.js` shows the async read finishing *after* the next line; the server answers each route with text or JSON and `404 - Route not found` otherwise.

### Experiment 09 – Building a RESTful API with Express.js

**Requirements:** Node.js · **Technology:** Express 5, cors

```powershell
# Terminal 1 - start the API
cd experiment-09\program
npm install
npm start
```

```powershell
# Terminal 2 - call every route
cd experiment-09\program
npm run test:api
```

API at **http://localhost:5001/api/projects**.

**Expected output:** Terminal 1 logs every request; Terminal 2 prints `13 passed, 0 failed` (GET/POST/DELETE projects, `POST /api/contact` → 201, validation errors → 400, unknown routes → 404). In PowerShell use `curl.exe`, not `curl`, for manual requests.

### Experiment 10 – MongoDB & Mongoose — CRUD Operations

**Requirements:** Node.js + a **MongoDB Atlas** connection string ([how to get one](experiment-10/README.md#step-1--create-a-free-mongodb-atlas-cluster)) or a local MongoDB server · **Technology:** MongoDB, Mongoose 9, Express, dotenv

```powershell
# Terminal 1
cd experiment-10\program
npm install
copy .env.example .env
notepad .env
npm run seed
npm start
```

Put your connection string after `MONGO_URI=` in `.env`, save, then run the last two commands.

```powershell
# Terminal 2
cd experiment-10\program
npm run test:api
```

**Expected output:** `Inserted 3 sample projects.`, `MongoDB connected (database: portfolioDB)`, `Server running on http://localhost:5002`; Terminal 2 prints `17 passed, 0 failed` (full CRUD on **projects** and **contact messages**). The documents are visible in Atlas → *Browse Collections*.

### Experiment 11 – Full-Stack Integration (React + Express + MongoDB)

**Requirements:** Node.js 20.19+/22.12+ and a MongoDB connection string · **Technology:** MERN (MongoDB, Express, React, Node.js)

```powershell
# Setup (once) - npm install also installs server\ and client\
cd experiment-11\program
npm install
copy server\.env.example server\.env
notepad server\.env
npm run seed
```

```powershell
# Development - Terminal 1 (API, port 5004)
cd experiment-11\program
npm run dev:server
```

```powershell
# Development - Terminal 2 (React, port 5173)
cd experiment-11\program
npm run dev:client
```

Open **http://localhost:5173**. Single-server production mode: `npm run build` then `npm start` → **http://localhost:5004**.

**Expected output:** the React portfolio loads projects **live from MongoDB** (with a loading message), **Add/Remove** change the database, and the contact form shows *"Message received, thank you! (saved to MongoDB)"*. If the API is down an error with a **Retry** button appears.

### Experiment 12 – Deployment of the MERN Portfolio Application

**Requirements:** everything from Experiment 11 + free **GitHub, MongoDB Atlas and Render** accounts · **Technology:** Render, MongoDB Atlas (optional Vercel/Netlify)

Test the production build locally:

```powershell
cd experiment-12\program
npm install
copy server\.env.example server\.env
notepad server\.env
npm run seed
npm run build
npm start
```

```powershell
# second terminal
cd experiment-12\program
node verify-deployment.js http://localhost:5004 --contact
```

Then deploy by following **[experiment-12/program/DEPLOY_STEPS.md](experiment-12/program/DEPLOY_STEPS.md)** – Render Web Service with Root Directory `experiment-12/program`, Build `npm install && npm run build`, Start `npm start`, environment variables `MONGO_URI` and `NODE_ENV=production`. Check the live site with `node verify-deployment.js https://<your-service>.onrender.com`.

**Expected output:** `PASS` for *Frontend loads*, *API health*, *Projects from MongoDB* and *Contact form*, then **"Deployment looks good!"**; the portfolio is reachable at your public `onrender.com` URL.

---

## 2. About This Repository

This repository contains complete, tested solutions for all 12 experiments of the **Full Stack Web Development Lab** (subject code U23CS7L2, LR-23, A.Y. 2026-27, Lords Institute of Engineering and Technology). Each experiment builds on the previous one: one personal portfolio grows from a static HTML page into a deployed **MERN** (MongoDB, Express, React, Node.js) application.

It was built from the two lab manuals:

- the **lab manual with programs** – experiment titles, aims, descriptions and reference programs;
- the **student lab manual** – experiment aims, algorithms and the **viva questions and answers**.

Every experiment folder contains:

- `README.md` – aim, files, how to run, expected output, procedure (algorithm) and what was verified;
- `program/` – the runnable source code;
- `viva/README.md` – that experiment's viva questions with concise answers.

The sample portfolio data (the name *Ananya Rao*, skills and projects) comes from the lab manual – replace it with your own details.

## 3. Experiment Index

| # | Experiment (name from the lab manual) | Program | Viva |
|---|---|---|---|
| 01 | Personal Portfolio Page using HTML | [program](experiment-01/program/) | [6 questions](experiment-01/viva/README.md) |
| 02 | Styling the Portfolio with CSS (Box Model, Flexbox & Grid) | [program](experiment-02/program/) | [6 questions](experiment-02/viva/README.md) |
| 03 | JavaScript Basics — Operators, Control Flow, Arrays, Functions, Strings | [program](experiment-03/program/) | [6 questions](experiment-03/viva/README.md) |
| 04 | DOM Manipulation & Events | [program](experiment-04/program/) | [6 questions](experiment-04/viva/README.md) |
| 05 | Contact Form Validation using Regex & Exception Handling | [program](experiment-05/program/) | [6 questions](experiment-05/viva/README.md) |
| 06 | Fetch API & Async/Await | [program](experiment-06/program/) | [6 questions](experiment-06/viva/README.md) |
| 07 | Rebuilding the Portfolio with React.js | [program](experiment-07/program/) | [6 questions](experiment-07/viva/README.md) |
| 08 | Node.js Fundamentals — Event Loop & HTTP Server | [program](experiment-08/program/) | [6 questions](experiment-08/viva/README.md) |
| 09 | Building a RESTful API with Express.js | [program](experiment-09/program/) | [6 questions](experiment-09/viva/README.md) |
| 10 | MongoDB & Mongoose — CRUD Operations | [program](experiment-10/program/) | [6 questions](experiment-10/viva/README.md) |
| 11 | Full-Stack Integration (React + Express + MongoDB) | [program](experiment-11/program/) | [6 questions](experiment-11/viva/README.md) |
| 12 | Deployment of the MERN Portfolio Application | [program](experiment-12/program/) | [6 questions](experiment-12/viva/README.md) |

Syllabus statements (from the *List of Experiments*):

1. Building a Personal Portfolio Page with HTML using necessary tags, consists of image, form, table for display skills and ratings.
2. Styling the Portfolio with CSS Box Model, Flexbox & Project Gallery using Grid. It should be responsive use media query tags.
3. Java script basics - explore operators, control flow, arrays, functions, and string manipulation.
4. Bring the portfolio to life: dynamically add/remove project cards, change themes, and respond to user events.
5. Validate the Contact form from Exp 01 using regex patterns; implement try-catch exception handling.
6. Fetch API - Get live data (e.g., GitHub user stats, etc) and render it on the portfolio, introducing async/await.
7. React.js Re-build the portfolio as a React app with functional components, props, state (useState), and useEffect.
8. Node.js Install Node.js, understand the event loop, create a basic HTTP server, and use core modules.
9. Express.js Build a RESTful API that serves portfolio data (projects, messages) and handles Contact-form submissions.
10. MongoDB & Mongoose Connect the Express API to MongoDB Atlas; perform full CRUD on Projects and Contact collections.
11. Full-Stack Integration - Integrate React (Exp 07) + Express (Exp 09) + MongoDB (Exp 10) into a single deployable MERN application.
12. Deployment - Deploy the full MERN portfolio application to the cloud so it is publicly accessible.

## 4. Technologies Used

| Area | Technology | Used in |
|---|---|---|
| Markup & styling | HTML5, CSS3 (Box Model, Flexbox, Grid, media queries, CSS variables) | 01–07, 11, 12 |
| Language | JavaScript (ES2022+), JSX | 03–12 |
| Browser APIs | DOM, events, `localStorage`, Fetch API, `AbortController` | 04–07, 11, 12 |
| External API | GitHub REST API (`api.github.com`) | 06, 07, 11, 12 |
| Frontend | React 19 (functional components, hooks), Vite 8 | 07, 11, 12 |
| Runtime | Node.js (core modules `http`, `fs`, `path`, `os`, `url`) | 03, 08–12 |
| Backend | Express 5, cors | 09–12 |
| Database | MongoDB Atlas, Mongoose 9, dotenv | 10–12 |
| Deployment | Render (web service / Blueprint), MongoDB Atlas, optional Vercel/Netlify | 12 |
| Tools | npm, Git, GitHub, VS Code | all |

## 5. Prerequisites and Installation

| Software | Needed for | Install / check |
|---|---|---|
| Modern browser (Edge, Chrome, Firefox) | 01–07, 11, 12 | already installed |
| **Node.js 20.19+ or 22.12+** (LTS recommended) | 03 (optional), 07–12 | [nodejs.org](https://nodejs.org) → check with `node -v` and `npm -v` |
| Git | cloning the repository | [git-scm.com](https://git-scm.com) → `git --version` |
| MongoDB connection string | 10–12 | free [MongoDB Atlas](https://cloud.mongodb.com) M0 cluster, or local [MongoDB Community Server](https://www.mongodb.com/try/download/community) |
| Render account | 12 (cloud deployment) | [render.com](https://render.com) (free plan) |
| Internet connection | 06 (GitHub API), first `npm install`, Atlas | – |
| VS Code (optional) | editing, Live Server, REST Client | [code.visualstudio.com](https://code.visualstudio.com) |

Installation:

```powershell
git clone https://github.com/Mohammed-Abdul-Raqueeb/fswd-lab-experiments.git
cd fswd-lab-experiments
```

Experiments 01–06 and 08 need no `npm install`. For 07, 09, 10, 11 and 12, run `npm install` inside that experiment's `program` folder (shown in the Quick Start). `node_modules` folders, build output (`dist`) and `.env` files are not stored in Git.

## 6. How to Run the Experiments

**Browser experiments (01, 02, 04, 05, 06, 03 optional):** open the `.html` file with `start <file>` (Windows), `open <file>` (macOS), `xdg-open <file>` (Linux), by double-clicking it, or with the VS Code **Live Server** extension.

**Node.js scripts (03, 08):** `node <file>.js` inside the `program` folder.

**npm projects (07, 09–12):** `npm install` once, then `npm run dev` / `npm start` (see each experiment's `package.json` scripts). Experiments 09–11 are easiest with **two terminals**: one runs the server, the other runs the tests or the React dev server.

**Environment files (10–12):** copy `.env.example` to `.env` and fill in `MONGO_URI`. Never commit `.env`.

### Troubleshooting

| Problem | Fix |
|---|---|
| `'node' is not recognized` | Install Node.js, then open a **new** terminal |
| Vite error about the Node.js version | Upgrade Node.js to 20.19+ or 22.12+ |
| `Error: listen EADDRINUSE` / "Port … is already in use" | Another server is running – stop it with Ctrl + C, or use another port: PowerShell `$env:PORT=5050; npm start`, macOS/Linux `PORT=5050 npm start` |
| `curl` in PowerShell behaves strangely | Use `curl.exe` or `Invoke-RestMethod` (in Windows PowerShell, `curl` is an alias for `Invoke-WebRequest`) |
| `npm` scripts blocked in PowerShell ("running scripts is disabled") | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, or use Command Prompt |
| `MONGO_URI is not set` | Create the `.env` file from `.env.example` in the folder shown in the message |
| `MongoDB connection error: bad auth` | Wrong user/password in `MONGO_URI` (URL-encode special characters in the password) |
| `MongoDB connection error … timed out` | Add your IP (or `0.0.0.0/0`) in Atlas → Network Access |
| Experiment 06/07 shows "rate limit reached" | GitHub's 60 requests/hour/IP limit – wait a few minutes or switch networks |
| Experiment 11 page shows "Could not …" errors | Start the API (`npm run dev:server`) before the React dev server |

### Verification status

All programs were run before publishing (Windows 11, Node.js 22.20, headless Microsoft Edge driven by Playwright; MongoDB tests used a real MongoDB 8.2 server running in memory).

| Exp | What was checked | Result |
|---|---|---|
| 01 | Page loads, image, 5-row table, form fields, no console errors, `html-validate` | ✅ Passed |
| 02 | 3 / 2 / 1 gallery columns at 1280 / 700 / 400px, header stacking, images, no overflow | ✅ Passed |
| 03 | `node basics.js` and `basics.html` output | ✅ Passed |
| 04 | Add (button + Enter), remove, hover, search, Esc, dark theme + persistence, no HTML injection | ✅ Passed |
| 05 | Empty, invalid and valid submissions, `finally` re-enables button | ✅ Passed |
| 06 | Live GitHub API (octocat card + repos); 404, 403 (rate limit), network failure, empty input via mocked responses | ✅ Passed |
| 07 | Dev server **and** production preview: props, state, `useEffect`, theme, add/remove/search, form | ✅ Passed |
| 08 | Event-loop order (5 identical runs), fs/path demo, 8 routes + 405 via `curl` | ✅ Passed |
| 09 | `npm run test:api` (13 checks), CORS origin | ✅ Passed |
| 10 | `npm run seed` + `npm run test:api` (17 CRUD checks), missing/unreachable database | ✅ Passed (local MongoDB) |
| 11 | 28 browser end-to-end checks in dev (Vite proxy) and production modes, data verified in MongoDB, root `npm install` | ✅ Passed (local MongoDB) |
| 12 | Render-style build with `NODE_ENV=production`, production server on port 10000, `verify-deployment.js`, health 503, CORS, split frontend/backend mode, 28 E2E checks | ✅ Passed (local) |

**Not tested here:** a real **MongoDB Atlas** cluster and a real **Render** deployment (they require your own accounts and credentials – the code only needs your `MONGO_URI`). The GitHub card in Experiments 07, 11 and 12 was tested with a mocked GitHub response (it is the same API call that was tested live in Experiment 06).

## 7. Viva Preparation

Each experiment has its own viva file with **all 6 questions** from that experiment's viva section in the student lab manual – **72 questions in total**. Answers are short and exam-friendly, with small code examples, links to where the concept appears in the program, and a **Quick revision** table at the end.

| Exp | Viva file | Topics |
|---|---|---|
| 01 | [experiment-01/viva](experiment-01/viva/README.md) | Tags vs elements, semantic HTML, forms, `img`, tables, DOCTYPE |
| 02 | [experiment-02/viva](experiment-02/viva/README.md) | Box model, `box-sizing`, Flexbox vs Grid, media queries, `auto-fit` |
| 03 | [experiment-03/viva](experiment-03/viva/README.md) | `let`/`const`/`var`, `==` vs `===`, `map`/`forEach`/`filter`, template literals, `this` |
| 04 | [experiment-04/viva](experiment-04/viva/README.md) | DOM, `innerHTML` vs `createElement`, event delegation, `classList.toggle`, `target` vs `currentTarget` |
| 05 | [experiment-05/viva](experiment-05/viva/README.md) | Regex, `test` vs `match`, `try`/`catch`/`finally`, custom errors, server-side validation |
| 06 | [experiment-06/viva](experiment-06/viva/README.md) | Promises, async/await, `response.ok`, `json()`, sync vs async |
| 07 | [experiment-07/viva](experiment-07/viva/README.md) | Components & props, keys, `useState`, `useEffect` dependencies, virtual DOM |
| 08 | [experiment-08/viva](experiment-08/viva/README.md) | Node.js, event loop, `require` vs npm, `package.json`, `readFile` vs `readFileSync` |
| 09 | [experiment-09/viva](experiment-09/viva/README.md) | Express, middleware & `next`, GET vs POST, `express.json()`, CORS, 201 Created |
| 10 | [experiment-10/viva](experiment-10/viva/README.md) | MongoDB vs SQL, Mongoose, CRUD, update options, schemas, connection errors |
| 11 | [experiment-11/viva](experiment-11/viva/README.md) | MERN, client/server split, proxy, loading/error states, validation, request flow |
| 12 | [experiment-12/viva](experiment-12/viva/README.md) | Secrets & env vars, builds, hosting types, CORS after deploy, Atlas network access, dev vs prod |

**Unclassified questions:** none. Every viva question in the manual is printed directly under its own experiment, so all 72 were mapped with certainty.

## 8. Repository Structure

```text
fswd-lab-experiments/
├── README.md
├── LICENSE
├── .gitignore
├── experiment-01/                  Personal Portfolio Page using HTML
│   ├── README.md
│   ├── program/
│   │   ├── index.html
│   │   └── images/profile.svg
│   └── viva/README.md
├── experiment-02/                  Styling with CSS (Box Model, Flexbox & Grid)
│   ├── README.md
│   ├── program/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── images/                 profile.svg, project1-6.svg
│   └── viva/README.md
├── experiment-03/                  JavaScript Basics
│   ├── README.md
│   ├── program/
│   │   ├── basics.html
│   │   └── basics.js
│   └── viva/README.md
├── experiment-04/                  DOM Manipulation & Events
│   ├── README.md
│   ├── program/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── style.css
│   │   ├── extra.css
│   │   └── images/                 profile.svg, project1-6.svg
│   └── viva/README.md
├── experiment-05/                  Contact Form Validation (Regex & try-catch)
│   ├── README.md
│   ├── program/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── validate.js
│   └── viva/README.md
├── experiment-06/                  Fetch API & Async/Await
│   ├── README.md
│   ├── program/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── fetchStats.js
│   └── viva/README.md
├── experiment-07/                  React.js Portfolio
│   ├── README.md
│   ├── program/
│   │   ├── package.json, package-lock.json, vite.config.js, index.html
│   │   ├── public/profile.svg
│   │   └── src/
│   │       ├── main.jsx, App.jsx, App.css
│   │       ├── data/portfolioData.js
│   │       └── components/         Header, About, SkillsTable, ProjectGallery,
│   │                               ProjectCard, GitHubStats, ContactForm, Footer (.jsx)
│   └── viva/README.md
├── experiment-08/                  Node.js Fundamentals
│   ├── README.md
│   ├── program/
│   │   ├── package.json
│   │   ├── eventloop.js
│   │   ├── server.js
│   │   ├── fileDemo.js
│   │   └── data/notes.txt
│   └── viva/README.md
├── experiment-09/                  RESTful API with Express.js
│   ├── README.md
│   ├── program/
│   │   ├── package.json, package-lock.json
│   │   ├── server.js
│   │   ├── test-api.js
│   │   └── requests.http
│   └── viva/README.md
├── experiment-10/                  MongoDB & Mongoose CRUD
│   ├── README.md
│   ├── program/
│   │   ├── package.json, package-lock.json, .env.example
│   │   ├── server.js
│   │   ├── seed.js
│   │   ├── test-api.js
│   │   ├── models/                 Project.js, Contact.js
│   │   └── routes/                 projectRoutes.js, contactRoutes.js
│   └── viva/README.md
├── experiment-11/                  Full-Stack Integration (MERN)
│   ├── README.md
│   ├── program/
│   │   ├── package.json, package-lock.json
│   │   ├── server/
│   │   │   ├── package.json, package-lock.json, .env.example
│   │   │   ├── server.js, seed.js
│   │   │   ├── models/             Project.js, Contact.js
│   │   │   └── routes/             projectRoutes.js, contactRoutes.js
│   │   └── client/
│   │       ├── package.json, package-lock.json, vite.config.js, index.html
│   │       ├── public/profile.svg
│   │       └── src/                main.jsx, App.jsx, App.css, api.js,
│   │                               data/portfolioData.js, components/*.jsx
│   └── viva/README.md
└── experiment-12/                  Deployment of the MERN App
    ├── README.md
    ├── program/
    │   ├── package.json, package-lock.json
    │   ├── render.yaml, Procfile
    │   ├── DEPLOY_STEPS.md
    │   ├── verify-deployment.js
    │   ├── server/                 same layout as Exp 11 (production-ready server.js)
    │   └── client/                 same layout as Exp 11 (+ .env.example for VITE_API_URL)
    └── viva/README.md
```

## 9. Contribution

Contributions that fix bugs or improve explanations are welcome.

1. Fork the repository and create a branch: `git checkout -b fix/short-description`.
2. Keep the code beginner-friendly and consistent with the lab manual (do not change an experiment's technology).
3. Run the affected experiment and its checks (`npm run test:api`, `node verify-deployment.js`, or the browser steps in its README).
4. Never commit `.env` files, `node_modules` or build output.
5. Commit with a clear message and open a pull request describing what changed and how you tested it.

Found a mistake in a viva answer? Open an issue with the experiment and question number.

## 10. License

Released under the [MIT License](LICENSE). You are free to use, modify and share this code; keep the license notice. Students should understand and write their own lab records – use this repository as a reference, not a copy-paste source.
