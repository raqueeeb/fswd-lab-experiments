// Experiment 08 (b) - Basic HTTP server using only core Node.js modules
// Core modules used: http, os, url, fs, path
// Run: node server.js   then open http://localhost:5000

const http = require("http");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = process.env.PORT || 5000;

// Portfolio data served as JSON (Express + a database are added in Experiments 09-10)
const projects = [
  { id: 1, title: "Library Management System", stack: "Java, MySQL" },
  { id: 2, title: "Weather App", stack: "HTML, CSS, JavaScript" },
  { id: 3, title: "Result Portal", stack: "PHP, MySQL" },
];

// Small helpers so every route sets the status code + Content-Type header
function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  // url module: split "/projects?id=2" into pathname and query parameters
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.url}`);

  if (req.method !== "GET") {
    return sendText(res, 405, "405 - Only GET requests are supported");
  }

  if (pathname === "/") {
    sendText(
      res,
      200,
      "Node core HTTP server is running.\nTry: /about, /projects, /projects?id=2, /system-info, /notes"
    );
  } else if (pathname === "/about") {
    sendText(res, 200, "Ananya Rao - Aspiring Full Stack Developer");
  } else if (pathname === "/projects") {
    const id = searchParams.get("id");
    if (!id) return sendJSON(res, 200, projects);

    const project = projects.find((p) => p.id === Number(id));
    if (project) sendJSON(res, 200, project);
    else sendJSON(res, 404, { error: `Project ${id} not found` });
  } else if (pathname === "/system-info") {
    // os module: information about the computer running the server
    sendJSON(res, 200, {
      platform: os.platform(),
      hostname: os.hostname(),
      cpuCores: os.cpus().length,
      totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
      freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
      uptimeSeconds: Math.round(os.uptime()),
      nodeVersion: process.version,
    });
  } else if (pathname === "/notes") {
    // fs + path modules: read a file asynchronously (non-blocking I/O)
    const filePath = path.join(__dirname, "data", "notes.txt");
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) return sendText(res, 500, "500 - Could not read notes.txt");
      sendText(res, 200, content);
    });
  } else {
    sendText(res, 404, "404 - Route not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log("Press Ctrl + C to stop the server");
});
