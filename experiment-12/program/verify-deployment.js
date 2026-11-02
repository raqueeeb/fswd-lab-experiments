// Experiment 12 - checks that a deployed (or local) copy of the app works end to end
//
// Usage:
//   node verify-deployment.js https://your-app.onrender.com
//   node verify-deployment.js http://localhost:5004
//   node verify-deployment.js https://your-app.onrender.com --contact   (also saves a test message)

const baseUrl = (process.argv[2] || "http://localhost:5004").replace(/\/+$/, "");
const sendContact = process.argv.includes("--contact");
let failures = 0;

function report(name, ok, detail) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  -> " + detail : ""}`);
  if (!ok) failures++;
}

async function main() {
  console.log(`Checking ${baseUrl}\n(a free Render service may take ~1 minute to wake up)\n`);

  // 1. Frontend: the React app's HTML is served
  const page = await fetch(baseUrl, { signal: AbortSignal.timeout(90000) });
  const html = await page.text();
  report("Frontend loads (GET /)", page.ok && html.includes('id="root"'), `HTTP ${page.status}`);

  // 2. Backend + database health
  const health = await fetch(`${baseUrl}/api/health`);
  const healthData = await health.json();
  report("API health (GET /api/health)", health.ok && healthData.database === "connected", JSON.stringify(healthData));

  // 3. Live data from MongoDB Atlas
  const projects = await fetch(`${baseUrl}/api/projects`);
  const projectData = await projects.json();
  report("Projects from MongoDB (GET /api/projects)", projects.ok && Array.isArray(projectData), `${projectData.length} project(s)`);

  // 4. Optional: contact form submission is stored
  if (sendContact) {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Deployment Check", email: "check@example.com", message: "Automated deployment test message." }),
    });
    report("Contact form (POST /api/contact)", response.status === 201, `HTTP ${response.status}`);
  }

  console.log(failures ? `\n${failures} check(s) failed` : "\nDeployment looks good!");
  process.exitCode = failures ? 1 : 0;
}

main().catch((err) => {
  console.error(`Could not reach ${baseUrl}: ${err.message}`);
  process.exitCode = 1;
});
