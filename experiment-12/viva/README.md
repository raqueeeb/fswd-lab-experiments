# Experiment 12 – Viva Questions & Answers

**Deployment of the MERN Portfolio Application**

[⬅ Experiment 12](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 12 in the FSWD lab manual.

---

### Q1. Why should sensitive values, such as database connection strings, never be hardcoded into source code?

**Answer:** Hardcoded secrets end up in **version control** and can be **exposed publicly** (especially in public repositories). **Environment variables** keep them out of the codebase and let each environment (local, production) use its own values.

*In the program:* `MONGO_URI` is read from `process.env`; `.env` is git-ignored and only `.env.example` is committed.

---

### Q2. What is the purpose of building a React app before deployment?

**Answer:** The build (`npm run build`) **bundles, minifies and optimises** the app into static files (`client/dist`). The result is much **smaller and faster to load** than the unoptimised development server.

---

### Q3. Why do the frontend and backend often need to be deployed to different types of hosting platforms?

**Answer:** After the build, the **frontend is just static files**, best served by a **static host/CDN** (fast and cheap). The **backend is a continuously running process** that needs a platform able to **execute server code** and keep a live database connection.

*In this program both options work:* one Render web service (Express also serves `client/dist`), or a static host for React + Render for the API.

---

### Q4. Why must CORS settings be updated again after deployment, even if they worked during local development?

**Answer:** The deployed frontend runs on a **different domain** from the local dev server (`http://localhost:5173`). The backend's CORS configuration must **explicitly allow the new production origin**, otherwise the browser blocks the cross-origin requests.

```
CORS_ORIGIN=https://my-portfolio.vercel.app
```

---

### Q5. Why is it necessary to update MongoDB Atlas's network access settings after deploying the backend?

**Answer:** Atlas **blocks connections from IP addresses that are not on its access list**. The deployed backend runs on the **cloud platform's servers**, not the developer's machine, so its access must be explicitly allowed (on free hosting with changing IPs this is usually `0.0.0.0/0`, protected by a strong database password).

---

### Q6. What is the difference between a development environment and a production environment in the context of this deployment?

**Answer:**

| Development | Production |
|---|---|
| Runs locally | Runs on remote servers (Render, Atlas) |
| Hot reloading, Vite dev server | Optimised build (`client/dist`) |
| Verbose logging and debugging | Minimal debug output |
| `.env` file on your computer | Environment variables in the hosting dashboard |
| Detailed error messages | Generic error messages, robust error handling |

---

## Quick revision

| Concept | Remember |
|---|---|
| Secrets | Environment variables, never in Git |
| `npm run build` | Bundled, minified static files |
| Static host vs server host | Files vs running process |
| CORS after deploy | Allow the live frontend domain |
| Atlas Network Access | Allow the cloud server's IP |
| Dev vs prod | Local + verbose vs remote + optimised |
