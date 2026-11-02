# Experiment 09 – Building a RESTful API with Express.js

> **Syllabus:** Express.js Build a RESTful API that serves portfolio data (projects, messages) and handles Contact-form submissions.

| Technology | Program | Viva |
|---|---|---|
| Node.js, Express 5, cors | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To build a RESTful API using Express.js that serves portfolio data (projects, messages) and handles Contact-form submissions.

## Files

| File | Purpose |
|---|---|
| [`program/server.js`](program/server.js) | Express app: middleware, REST routes, 404 and error handlers, in-memory data |
| [`program/test-api.js`](program/test-api.js) | Calls every route and checks the status codes (a mini Postman) |
| [`program/requests.http`](program/requests.http) | Sample requests for the VS Code *REST Client* extension / Postman / Thunder Client |

## API endpoints

| Method | Endpoint | Description | Success code |
|---|---|---|---|
| GET | `/api/projects` | List all projects | 200 |
| GET | `/api/projects/:id` | One project (404 if missing) | 200 |
| POST | `/api/projects` | Create a project – body `{ "title", "stack", "rating" }` | 201 |
| DELETE | `/api/projects/:id` | Delete a project | 200 |
| POST | `/api/contact` | Submit the contact form – body `{ "name", "email", "message" }` | 201 |
| GET | `/api/messages` | Admin view of submitted messages | 200 |

Invalid input → **400** with an `error` message · unknown route → **404** · invalid JSON → **400** · unexpected error → **500**.

## How to run

**Terminal 1 – start the API**

```powershell
cd experiment-09\program
npm install
npm start
```

The API runs at **http://localhost:5001** (open http://localhost:5001/api/projects in a browser).

**Terminal 2 – test every route**

```powershell
cd experiment-09\program
npm run test:api
```

Expected: `13 passed, 0 failed`.

**Manual requests** (PowerShell – use `curl.exe`, because `curl` is an alias for `Invoke-WebRequest` in Windows PowerShell):

```powershell
curl.exe http://localhost:5001/api/projects
Invoke-RestMethod -Method Post -Uri http://localhost:5001/api/contact -ContentType "application/json" -Body '{"name":"Rahul Kumar","email":"rahul@example.com","message":"Hi, interested in collaborating!"}'
```

The data lives in memory, so it resets every time the server restarts (MongoDB is added in Experiment 10).

## Procedure

1. Run `npm init` and install `express` and `cors`.
2. Create `server.js`, require Express and create the app.
3. Add `express.json()` (body parsing) and `cors()` (allow the React dev server at `http://localhost:5173`).
4. Create in-memory arrays for projects and contact messages.
5. Add `GET /api/projects` (and `/:id`) returning JSON.
6. Add `POST /api/contact`: read `req.body`, validate the fields, store the message, respond **201**.
7. Add `GET /api/messages` for the admin view.
8. Add a 404 handler and an error-handling middleware (4 parameters).
9. Test every route with a REST client (`requests.http`, Postman, Thunder Client) or `npm run test:api`.
10. Connecting the React `ContactForm` to `POST /api/contact` is completed in **Experiment 11**, where the client and this API run together.

## Concepts covered

Express app and routing · REST conventions (resources + HTTP methods) · route parameters (`req.params`) · `req.body` and `express.json()` · custom middleware and `next()` · CORS · status codes (200, 201, 400, 404, 500) · server-side validation · error-handling middleware.

## Verification

`npm run test:api` → **13 passed, 0 failed** (including 400 for missing fields, bad email and malformed JSON, and 404 for unknown ids/routes). CORS headers are sent only to `http://localhost:5173`.
