// Experiment 09 - calls every API route and checks the status codes (a mini Postman)
// 1. Start the server:            npm start
// 2. In a second terminal run:    npm run test:api

const BASE_URL = process.env.API_URL || "http://localhost:5001";
let passed = 0;
let failed = 0;

async function request(method, path, body, expectedStatus) {
  const response = await fetch(BASE_URL + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : body && JSON.stringify(body),
  });
  const data = await response.json();
  const ok = response.status === expectedStatus;
  ok ? passed++ : failed++;

  console.log(`${ok ? "PASS" : "FAIL"}  ${method} ${path} -> ${response.status} (expected ${expectedStatus})`);
  console.log("      " + JSON.stringify(data).slice(0, 150));
  return data;
}

async function main() {
  await request("GET", "/api/projects", null, 200);
  await request("GET", "/api/projects/1", null, 200);
  await request("GET", "/api/projects/999", null, 404);

  const created = await request("POST", "/api/projects", { title: "Quiz App", stack: "React, Node", rating: 5 }, 201);
  await request("POST", "/api/projects", { stack: "missing title" }, 400);
  await request("DELETE", `/api/projects/${created.id}`, null, 200);
  await request("DELETE", `/api/projects/${created.id}`, null, 404);

  await request("POST", "/api/contact", { name: "Rahul Kumar", email: "rahul@example.com", message: "Hi, interested in collaborating on a project." }, 201);
  await request("POST", "/api/contact", { name: "Test" }, 400);
  await request("POST", "/api/contact", { name: "Test", email: "not-an-email", message: "Long enough message" }, 400);
  await request("POST", "/api/contact", "{ bad json", 400);
  await request("GET", "/api/messages", null, 200);
  await request("GET", "/api/unknown", null, 404);

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exitCode = failed ? 1 : 0;
}

main().catch((err) => {
  console.error(`Could not reach ${BASE_URL} - is the server running? (${err.message})`);
  process.exitCode = 1;
});
