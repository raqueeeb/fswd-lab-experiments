# Experiment 09 – Viva Questions & Answers

**Building a RESTful API with Express.js**

[⬅ Experiment 09](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 9 in the FSWD lab manual.

---

### Q1. What is Express.js, and what problem does it solve compared to using the raw `http` module?

**Answer:** Express.js is a **minimal web framework** built on top of Node's `http` module. It simplifies **routing, middleware and request/response handling**, so we do not have to parse URLs and write routing logic by hand.

```js
app.get("/api/projects", (req, res) => res.json(projects)); // vs if/else on req.url in Exp 08
```

---

### Q2. What is middleware in Express, and how does the `next` function relate to it?

**Answer:** Middleware is a function with access to `req`, `res` and `next`, which runs during the request–response cycle. Calling **`next()` passes control** to the next middleware or route handler. If a middleware neither calls `next()` nor sends a response, the request **stops there** (and the client is left waiting).

```js
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
```

---

### Q3. What is the difference between a GET route and a POST route in Express?

**Answer:** A **GET** route is typically used to **retrieve** data. A **POST** route is used to **submit/create** data; the submitted payload is available in `req.body`.

---

### Q4. Why is JSON body-parsing middleware necessary when handling POST requests with a JSON payload?

**Answer:** Express does **not parse the raw request body** by itself. `express.json()` parses incoming JSON and puts the data in `req.body`, so route handlers can use it.

```js
app.use(express.json());
```

---

### Q5. What does CORS mean, and why is CORS middleware needed when the frontend and backend run on different ports?

**Answer:** **CORS = Cross-Origin Resource Sharing**. Browsers **block requests between different origins** (a different protocol, domain **or port**) by default. The CORS middleware adds response headers that explicitly **allow the frontend's origin** (e.g. `http://localhost:5173`) to call the API.

```js
app.use(cors({ origin: "http://localhost:5173" }));
```

---

### Q6. What HTTP status code should a successful POST request that creates a new resource typically return, and why?

**Answer:** **201 Created** – it states specifically that the request succeeded **and a new resource was created**, which is more precise than the generic **200 OK**.

```js
res.status(201).json(newProject);
```

---

## Quick revision

| Concept | Remember |
|---|---|
| Express | Framework on top of `http`: routing + middleware |
| Middleware | `(req, res, next)` – call `next()` to continue |
| GET vs POST | Read data vs create data (`req.body`) |
| `express.json()` | Fills `req.body` from JSON |
| CORS | Browser blocks other origins unless the server allows them |
| 201 | Created (new resource) |
