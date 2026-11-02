# Experiment 10 – MongoDB & Mongoose — CRUD Operations

> **Syllabus:** MongoDB & Mongoose Connect the Express API to MongoDB Atlas; perform full CRUD on Projects and Contact collections.

| Technology | Program | Viva |
|---|---|---|
| Node.js, Express 5, MongoDB Atlas, Mongoose 9, dotenv | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To connect the Express API to MongoDB Atlas using Mongoose and perform full CRUD operations on the Projects and Contact collections.

## Files

| File | Purpose |
|---|---|
| [`program/server.js`](program/server.js) | Connects to MongoDB, then starts Express; error handling for validation / bad ids |
| [`program/models/Project.js`](program/models/Project.js) | Project schema: title, description, stack, imageUrl, rating (1–5), timestamps |
| [`program/models/Contact.js`](program/models/Contact.js) | Contact schema: name, email (regex), message (min 10 chars), timestamps |
| [`program/routes/projectRoutes.js`](program/routes/projectRoutes.js) | Full CRUD for projects |
| [`program/routes/contactRoutes.js`](program/routes/contactRoutes.js) | Full CRUD for contact messages |
| [`program/seed.js`](program/seed.js) | Inserts 3 sample projects |
| [`program/test-api.js`](program/test-api.js) | Exercises every CRUD route |
| [`program/.env.example`](program/.env.example) | Template for your `.env` (connection string) |

## API endpoints

| CRUD | Projects | Contact messages |
|---|---|---|
| **Create** | `POST /api/projects` | `POST /api/contact` |
| **Read** | `GET /api/projects` · `GET /api/projects/:id` | `GET /api/messages` · `GET /api/messages/:id` |
| **Update** | `PUT /api/projects/:id` | `PUT /api/messages/:id` |
| **Delete** | `DELETE /api/projects/:id` | `DELETE /api/messages/:id` |

## Step 1 – Create a free MongoDB Atlas cluster

1. Sign up at [cloud.mongodb.com](https://cloud.mongodb.com) and create a free **M0** cluster.
2. **Database Access** → *Add New Database User* → choose a username and password.
3. **Network Access** → *Add IP Address* → *Add Current IP Address* (or `0.0.0.0/0` for a lab).
4. **Database → Connect → Drivers** → copy the connection string, e.g.
   `mongodb+srv://myuser:<password>@cluster0.abcde.mongodb.net/`
5. Replace `<password>` and add a database name before `?`: `.../portfolioDB?retryWrites=true&w=majority`.

> No Atlas account? Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and use `MONGO_URI=mongodb://127.0.0.1:27017/portfolioDB`.

## Step 2 – Run the API

**Terminal 1**

```powershell
cd experiment-10\program
npm install
copy .env.example .env
notepad .env
```

Paste your connection string into `MONGO_URI=` and save (macOS/Linux: `cp .env.example .env` and edit it). Then:

```powershell
npm run seed
npm start
```

Expected:

```text
Inserted 3 sample projects.
MongoDB connected (database: portfolioDB)
Server running on http://localhost:5002
```

**Terminal 2 – test all CRUD routes**

```powershell
cd experiment-10\program
npm run test:api
```

Expected: `17 passed, 0 failed`. Then open **Atlas → Browse Collections → portfolioDB** to see the `projects` and `contacts` collections.

## Procedure

1. Create the Atlas cluster, database user and network access rule; copy the connection string.
2. Install Mongoose and connect with `mongoose.connect(MONGO_URI)` inside `try-catch` before starting the server.
3. Define the Project schema (title, description, image URL, rating) and compile it into a model.
4. Define the Contact schema (name, email, message + `timestamps` for the creation time) and model.
5. `GET /api/projects` → `Project.find()` with `async/await`.
6. `POST /api/projects` → `Project.create(req.body)`.
7. `PUT /api/projects/:id` → `findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true })`.
8. `DELETE /api/projects/:id` → `findByIdAndDelete(id)`.
9. `POST /api/contact` → `Contact.create()` (stored in MongoDB instead of an array), plus read/update/delete routes for messages.
10. Test every route with a REST client and check the documents in the Atlas collections view.

## Concepts covered

Documents and collections · Mongoose schemas, types, defaults and validators · models · `create`, `find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`, `insertMany` · `timestamps` · environment variables with `dotenv` · Express routers · Express 5 automatic async error handling · `ValidationError` / `CastError` handling.

## Verification

Tested against a real MongoDB 8.2 server (an in-memory instance, because no Atlas credentials were available during testing): `npm run seed` inserted 3 projects and `npm run test:api` → **17 passed, 0 failed** (create/read/update/delete for both collections, partial updates keep other fields, schema validation → 400, invalid id → 400, missing document → 404). A missing `MONGO_URI` and an unreachable database both print clear messages and exit. **Connecting to an actual Atlas cluster was not tested** – it only needs your own connection string in `.env`.
