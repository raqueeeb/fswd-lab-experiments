# Deployment Steps – MERN Portfolio (Experiment 12)

This guide publishes the app in this folder (`experiment-12/program`) so that anyone can open it on the internet.

```text
                 https://<your-service>.onrender.com
Browser ───────────────────────────────▶ Render Web Service (Node.js)
                                          ├── /api/*  → Express routes → Mongoose ──▶ MongoDB Atlas (M0 cluster)
                                          └── /*      → React build (client/dist)
```

**Option A (recommended, used below):** one Render web service – Express serves the API **and** the React build. One URL, no CORS needed.
**Option B:** React on a static host (Vercel / Netlify / Render Static Site) + API on Render – see [Option B](#option-b--frontend-on-a-static-host-backend-on-render).

All services used have free tiers. You need: a GitHub account, a [MongoDB Atlas](https://cloud.mongodb.com) account and a [Render](https://render.com) account.

---

## 1. Prepare the code (already done in this folder)

| Requirement | Where |
|---|---|
| No secrets in code – `MONGO_URI` is read from `process.env` | `server/server.js` |
| `.env` is ignored by Git, only `.env.example` is committed | repository `.gitignore` |
| Server listens on `process.env.PORT` (Render sets it) | `server/server.js` |
| One command installs everything: `npm install` (postinstall installs `server/` and `client/`, including Vite with `--include=dev` so it also works when `NODE_ENV=production`) | `package.json` |
| `npm run build` creates `client/dist`; `npm start` runs Express | `package.json` |
| Health check `GET /api/health` | `server/server.js` |

Test the production build on your computer first (see the experiment [README](../README.md#test-the-production-build-locally-first)).

## 2. Push the repository to GitHub

If you cloned this repository, it is already on GitHub. Otherwise:

```bash
git init
git add .
git commit -m "MERN portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/fswd-lab-experiments.git
git push -u origin main
```

Check on GitHub that **no `.env` file** was uploaded.

## 3. Set up MongoDB Atlas

1. Create a free **M0** cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. **Database Access → Add New Database User** – username + a strong password (avoid `@ : / ?` in the password, or URL-encode them).
3. **Network Access → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)**. Render's free services do not have a fixed outbound IP, so the cluster must accept any IP; the database password protects it.
4. **Database → Connect → Drivers** → copy the connection string and add the database name:

   ```text
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolioDB?retryWrites=true&w=majority
   ```

5. (Optional) Add sample projects from your computer: put the string in `server/.env` and run `npm run seed`.

## 4. Deploy to Render (Option A – single web service)

### 4a. Manual setup (works everywhere)

1. Render dashboard → **New → Web Service** → connect GitHub → choose this repository.
2. Fill in:

   | Setting | Value |
   |---|---|
   | Name | e.g. `fswd-mern-portfolio` (becomes part of the URL) |
   | Root Directory | `experiment-12/program` |
   | Runtime | Node |
   | Build Command | `npm install && npm run build` |
   | Start Command | `npm start` |
   | Instance Type | Free |
   | Health Check Path (Advanced) | `/api/health` |

3. **Environment Variables:**

   | Key | Value |
   |---|---|
   | `MONGO_URI` | your Atlas connection string from step 3 |
   | `NODE_ENV` | `production` |

   Do **not** set `PORT` – Render provides it.

4. Click **Create Web Service**. The log should end with:

   ```text
   MongoDB connected (database: portfolioDB)
   MERN app running on http://localhost:10000 (production)
   ```

   Render then shows your public URL, e.g. `https://fswd-mern-portfolio.onrender.com`.

### 4b. Blueprint setup (uses `render.yaml`)

`render.yaml` describes the same service as code. Render → **New → Blueprint** → choose this repository and set the Blueprint file path to `experiment-12/program/render.yaml` (Render looks for `render.yaml` at the repository root by default). Render will ask for the secret `MONGO_URI` value.

## 5. Verify the live deployment

Open the URL in a browser, ideally on **another device or mobile data**, and check that the projects load and the contact form says *"Message received, thank you! (saved to MongoDB)"*. Then run:

```bash
node verify-deployment.js https://<your-service>.onrender.com --contact
```

and confirm the new document in **Atlas → Browse Collections → portfolioDB → contacts**.

> A free Render service sleeps after ~15 minutes without traffic. The first request after that can take up to a minute – this is normal.

## 6. Redeploying

Every `git push` to `main` triggers an automatic rebuild and redeploy on Render.

---

## Option B – frontend on a static host, backend on Render

Use this when the syllabus requires a separate static host for the frontend.

1. **Backend:** deploy exactly as in step 4, plus one more environment variable:

   | Key | Value |
   |---|---|
   | `CORS_ORIGIN` | the frontend's live URL, e.g. `https://my-portfolio.vercel.app` (comma-separate several) |

2. **Frontend** on Vercel / Netlify / Render Static Site:

   | Setting | Value |
   |---|---|
   | Root / Base directory | `experiment-12/program/client` |
   | Build command | `npm install && npm run build` |
   | Output / Publish directory | `dist` |
   | Environment variable | `VITE_API_URL` = `https://<your-backend>.onrender.com` |

   `VITE_API_URL` is baked in at **build time**, so redeploy the frontend after changing it.

3. Open the frontend URL; the browser calls the backend directly (allowed by CORS).

---

## Troubleshooting (common deployment issues and fixes)

| Problem | Cause | Fix |
|---|---|---|
| Build fails: `vite: not found` | `NODE_ENV=production` makes `npm install` skip devDependencies | Already handled: `postinstall` uses `npm install --include=dev` for the client |
| Log shows `MONGO_URI is not set` | Environment variable missing | Add `MONGO_URI` in Render → Environment, then redeploy |
| `MongoDB connection error: bad auth` | Wrong username/password in the string | Re-copy the string; URL-encode special characters in the password |
| `MongoDB connection error ... timed out` / `ECONNREFUSED` | Atlas Network Access blocks Render | Allow `0.0.0.0/0` in Atlas Network Access |
| Browser console: *blocked by CORS policy* (Option B) | Frontend domain not allowed | Set `CORS_ORIGIN` on the backend to the exact frontend URL (no trailing `/`) |
| Option B frontend calls `localhost` | `VITE_API_URL` not set at build time | Set it on the static host and redeploy |
| First load takes ~1 minute | Free Render service was asleep | Normal on the free plan |
| Health check failing | Database not connected | Open `/api/health` – it returns `503` with `"database":"disconnected"` until MongoDB connects |

---

## Deployment record (fill this in for your lab record)

| Item | Value |
|---|---|
| Live application URL (frontend) | `https://...` |
| Backend / API URL | `https://.../api/projects` |
| Health check | `https://.../api/health` |
| GitHub repository | `https://github.com/<your-username>/fswd-lab-experiments` |
| MongoDB Atlas cluster / database | `Cluster0` / `portfolioDB` |
| Date deployed | |
| Tested from (device / network) | |

**Issues encountered and how they were resolved:**

1. 
2. 
