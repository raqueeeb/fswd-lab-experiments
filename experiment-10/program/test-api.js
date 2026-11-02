// Experiment 10 - exercises every CRUD route and checks the status codes
// 1. Start the server:          npm start
// 2. In a second terminal run:  npm run test:api
// Note: it creates and then deletes its own test documents.

const BASE_URL = process.env.API_URL || "http://localhost:5002";
let passed = 0;
let failed = 0;

async function request(method, path, body, expectedStatus, check = () => true) {
  const response = await fetch(BASE_URL + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const data = await response.json();
  const ok = response.status === expectedStatus && check(data);
  ok ? passed++ : failed++;

  console.log(`${ok ? "PASS" : "FAIL"}  ${method} ${path} -> ${response.status} (expected ${expectedStatus})`);
  console.log("      " + JSON.stringify(data).slice(0, 140));
  return data;
}

async function main() {
  console.log("--- Projects: Create, Read, Update, Delete ---");
  const project = await request("POST", "/api/projects", { title: "Portfolio Website", stack: "React, Node", rating: 4 }, 201, (d) => d._id);
  await request("GET", "/api/projects", null, 200, (d) => d.some((p) => p._id === project._id));
  await request("GET", `/api/projects/${project._id}`, null, 200, (d) => d.title === "Portfolio Website");
  await request("PUT", `/api/projects/${project._id}`, { rating: 5, stack: "React, Express, MongoDB" }, 200,
    (d) => d.rating === 5 && d.title === "Portfolio Website");
  await request("PUT", `/api/projects/${project._id}`, { rating: 9 }, 400);
  await request("POST", "/api/projects", { stack: "no title" }, 400);
  await request("GET", "/api/projects/not-a-valid-id", null, 400);
  await request("DELETE", `/api/projects/${project._id}`, null, 200);
  await request("GET", `/api/projects/${project._id}`, null, 404);

  console.log("--- Contact: Create, Read, Update, Delete ---");
  await request("POST", "/api/contact", { name: "Rahul" }, 400);
  await request("POST", "/api/contact", { name: "Rahul", email: "bad-email", message: "Loved your portfolio!" }, 400);
  const created = await request("POST", "/api/contact",
    { name: "Rahul Kumar", email: "Rahul@Example.com", message: "Loved your portfolio, lets connect!" }, 201,
    (d) => d.entry.email === "rahul@example.com");
  const id = created.entry._id;
  await request("GET", "/api/messages", null, 200, (d) => d.some((m) => m._id === id));
  await request("GET", `/api/messages/${id}`, null, 200);
  await request("PUT", `/api/messages/${id}`, { message: "Updated: would love to collaborate!" }, 200,
    (d) => d.message.startsWith("Updated") && d.name === "Rahul Kumar");
  await request("DELETE", `/api/messages/${id}`, null, 200);
  await request("DELETE", `/api/messages/${id}`, null, 404);

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exitCode = failed ? 1 : 0;
}

main().catch((err) => {
  console.error(`Could not reach ${BASE_URL} - is the server running? (${err.message})`);
  process.exitCode = 1;
});
