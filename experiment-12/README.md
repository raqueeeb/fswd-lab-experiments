# Experiment 12 – Deployment of the MERN Portfolio Application

> **Syllabus:** Deployment - Deploy the full MERN portfolio application to the cloud so it is publicly accessible.

| Technology | Program | Viva |
|---|---|---|
| MERN app from Exp 11 + MongoDB Atlas + Render (+ optional Vercel/Netlify) | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To deploy the complete MERN portfolio application to the cloud so that it is publicly accessible.

## What is different from Experiment 11

| Change | File |
|---|---|
| Config only from environment variables (`MONGO_URI`, `PORT`, `NODE_ENV`, `CORS_ORIGIN`) | [`program/server/server.js`](program/server/server.js), [`program/server/.env.example`](program/server/.env.example) |
| CORS allows the **live** frontend domain(s) from `CORS_ORIGIN` | `server.js` |
| `GET /api/health` health check (used by Render) | `server.js` |
| Quiet logs and generic error messages in production; 10 kB request body limit | `server.js` |
| `VITE_API_URL` for a separately hosted frontend | [`program/client/.env.example`](program/client/.env.example), [`program/client/src/api.js`](program/client/src/api.js) |
| Render Blueprint / Procfile | [`program/render.yaml`](program/render.yaml), [`program/Procfile`](program/Procfile) |
| `engines.node` + build that works with `NODE_ENV=production` | [`program/package.json`](program/package.json) |
| Script that checks a live deployment | [`program/verify-deployment.js`](program/verify-deployment.js) |
| Step-by-step guide + deployment record | [`program/DEPLOY_STEPS.md`](program/DEPLOY_STEPS.md) |

## Deploy it

Follow **[program/DEPLOY_STEPS.md](program/DEPLOY_STEPS.md)**. In short:

1. MongoDB Atlas: free M0 cluster, database user, Network Access `0.0.0.0/0`, copy the connection string.
2. Push this repository to GitHub.
3. Render → **New → Web Service** → this repo, **Root Directory** `experiment-12/program`, Build `npm install && npm run build`, Start `npm start`, env vars `MONGO_URI` and `NODE_ENV=production`.
4. Open `https://<your-service>.onrender.com` and run `node verify-deployment.js https://<your-service>.onrender.com`.

## Test the production build locally first

```powershell
cd experiment-12\program
npm install
copy server\.env.example server\.env
notepad server\.env
npm run seed
npm run build
npm start
```

Then, in a second terminal:

```powershell
cd experiment-12\program
node verify-deployment.js http://localhost:5004 --contact
```

Expected:

```text
PASS  Frontend loads (GET /)  -> HTTP 200
PASS  API health (GET /api/health)  -> {"status":"ok","database":"connected",...}
PASS  Projects from MongoDB (GET /api/projects)  -> 3 project(s)
PASS  Contact form (POST /api/contact)  -> HTTP 201

Deployment looks good!
```

## Procedure

1. Move secrets (MongoDB connection string, port) into environment variables; keep `.env` out of Git (`.gitignore`).
2. Push the client and server code to GitHub.
3. Deploy the backend to Render with build/start commands and environment variables.
4. Allow the Render service in MongoDB Atlas **Network Access**.
5. Build the React app (`npm run build` → `client/dist`).
6. Serve the build: from Express on the same Render service (default), **or** from a static host (Vercel/Netlify).
7. If the frontend is hosted separately, set `VITE_API_URL` to the backend's live URL.
8. Set `CORS_ORIGIN` on the backend to the frontend's live domain.
9. Test the live app end to end from another device/network.
10. Record the live URLs and any issues + fixes in the *Deployment record* section of `DEPLOY_STEPS.md`.

## Concepts covered

Environment variables and secrets · production builds · static hosting vs server hosting · Render web services and Blueprints · MongoDB Atlas network access · CORS for production origins · health checks · dev vs prod configuration.

## Verification

- Render-style build reproduced locally: clean `npm install` **with `NODE_ENV=production`** + `npm run build` succeeds (Vite still installed thanks to `--include=dev`).
- Server started with `NODE_ENV=production` on port 10000 (Render's default): `verify-deployment.js --contact` → 4/4 PASS; CORS returns the configured production origin; oversized body → 413; no request logs in production; `/api/health` returns **503** when the database disconnects.
- Full browser E2E suite (same 28 checks as Experiment 11) passed in dev and production modes.
- Split deployment (React built with `VITE_API_URL`, served from another origin) loaded projects and submitted the contact form across origins.
- All tests used a real MongoDB 8.2 server running in memory. **The actual cloud deployment (Render + Atlas) was not performed**, because it needs your own Render and Atlas accounts – follow `DEPLOY_STEPS.md` to do it.
