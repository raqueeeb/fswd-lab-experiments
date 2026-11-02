# Experiment 08 – Node.js Fundamentals — Event Loop & HTTP Server

> **Syllabus:** Node.js Install Node.js, understand the event loop, create a basic HTTP server, and use core modules.

| Technology | Program | Viva |
|---|---|---|
| Node.js core modules (`http`, `fs`, `path`, `os`, `url`) – no npm packages | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To install Node.js, understand its event loop, create a basic HTTP server, and use core Node modules.

## Files

| File | Purpose |
|---|---|
| [`program/eventloop.js`](program/eventloop.js) | Shows the order of sync code, `nextTick`, Promises, `setTimeout`, `setImmediate` |
| [`program/server.js`](program/server.js) | HTTP server with basic routing, built only with core modules |
| [`program/fileDemo.js`](program/fileDemo.js) | `fs` (sync vs async read, append) and `path` helpers |
| [`program/data/notes.txt`](program/data/notes.txt) | Text file read by `fileDemo.js` and the `/notes` route |
| [`program/package.json`](program/package.json) | Created with `npm init`; holds the run scripts |

## How to run

**1. Install and verify Node.js** (LTS from [nodejs.org](https://nodejs.org)):

```powershell
node -v
npm -v
```

**2. Event loop demo**

```powershell
cd experiment-08\program
node eventloop.js
```

```text
1. Start of script (synchronous)
2. Blocking loop finished in 47 ms (synchronous)
3. End of script (synchronous)
4. process.nextTick callback (runs before Promise microtasks)
5. Promise.then callback (microtask)
6. setTimeout callback (timers phase)
7. setImmediate callback (check phase)
8. setImmediate inside I/O callback (always first here)
9. setTimeout inside I/O callback
```

**3. fs + path demo**

```powershell
node fileDemo.js
```

Prints the path parts, reads `notes.txt` synchronously and asynchronously (the line *"this line prints BEFORE the file content"* proves the read is non-blocking), then appends to `data/visits.log`.

**4. HTTP server**

```powershell
node server.js
```

Open these in a browser (or use `curl.exe` in PowerShell):

| URL | Response |
|---|---|
| http://localhost:5000/ | Welcome text listing the routes |
| http://localhost:5000/about | Plain text |
| http://localhost:5000/projects | JSON list of projects |
| http://localhost:5000/projects?id=2 | One project (404 JSON for an unknown id) |
| http://localhost:5000/system-info | JSON from the `os` module (platform, CPU cores, memory, uptime) |
| http://localhost:5000/notes | Contents of `data/notes.txt` (read with `fs` + `path`) |
| http://localhost:5000/anything-else | `404 - Route not found` |

Stop the server with `Ctrl + C`. If port 5000 is busy: PowerShell `$env:PORT=5050; node server.js` · macOS/Linux `PORT=5050 node server.js`.

## Procedure

1. Install Node.js LTS; check `node -v` and `npm -v`.
2. Create a folder and run `npm init -y` to generate `package.json`.
3. Create `server.js` and `require("http")`.
4. Use `http.createServer()` with a callback that sets headers (`res.writeHead`) and sends a body (`res.end`).
5. Call `server.listen(PORT)` and log a confirmation message.
6. Run it and visit `http://localhost:5000`.
7. Add routing for several paths using `req.url` (parsed with the `URL` class).
8. Demonstrate the event loop with timers, Promises and a blocking loop (`eventloop.js`).
9. Read a text file asynchronously with `fs.readFile`.
10. Build file paths safely with `path.join`.

## Concepts covered

V8 runtime · single-threaded event loop and its phases · microtasks vs macrotasks · `require()` and CommonJS · `package.json` scripts · `http.createServer`, status codes and headers · `URL` parsing · `fs.readFile` vs `fs.readFileSync` · `path.join`, `basename`, `extname` · `os` module.

## Verification

`eventloop.js` produced the identical order in 5 consecutive runs. `fileDemo.js` ran correctly. All 8 server routes plus a `POST` (→ 405) returned the expected status codes and `Content-Type` headers when tested with `curl`.
