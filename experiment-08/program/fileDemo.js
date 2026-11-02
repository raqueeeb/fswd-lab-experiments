// Experiment 08 (c) - Core modules: fs (file system) and path
// Run: node fileDemo.js

const fs = require("fs");
const path = require("path");

/* ---------- path module: build file paths safely on any OS ---------- */
const notesFile = path.join(__dirname, "data", "notes.txt"); // uses \ on Windows, / on Linux/macOS
const logFile = path.join(__dirname, "data", "visits.log");

console.log("Current directory :", __dirname);
console.log("Notes file path   :", notesFile);
console.log("File name         :", path.basename(notesFile));
console.log("Extension         :", path.extname(notesFile));
console.log("Folder            :", path.dirname(notesFile));

/* ---------- fs module: synchronous vs asynchronous reading ---------- */
// Synchronous: blocks until the whole file has been read
const syncText = fs.readFileSync(notesFile, "utf8");
console.log(`\n[readFileSync]  read ${syncText.length} characters (blocking)`);

// Asynchronous: Node keeps running and calls the callback when the file is ready
console.log("[readFile]      reading the file asynchronously...");
fs.readFile(notesFile, "utf8", (err, content) => {
  if (err) {
    console.error("Could not read the file:", err.message);
    return;
  }
  console.log("\n----- notes.txt (async read finished) -----");
  console.log(content.trim());
  console.log("-------------------------------------------");

  // Append a line to a log file (the file is created if it does not exist)
  const line = `Visited at ${new Date().toISOString()}\n`;
  fs.appendFile(logFile, line, (appendErr) => {
    if (appendErr) return console.error("Could not write the log:", appendErr.message);
    const visits = fs.readFileSync(logFile, "utf8").trim().split("\n").length;
    console.log(`\nAppended to ${path.basename(logFile)} - it now has ${visits} line(s).`);
  });
});

console.log("[readFile]      this line prints BEFORE the file content -> non-blocking I/O");
