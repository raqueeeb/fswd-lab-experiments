// All calls to the Express + MongoDB backend live in this one file.
//
// API_BASE is empty by default, so requests go to "/api/..." on the same origin:
//   - development: the Vite proxy forwards them to Express on port 5004
//   - production:  Express serves this React build, so it is the same server
// To call an API hosted somewhere else, set VITE_API_URL in client/.env
const API_BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // use the server's validation messages when it sends them
    const message = data.details ? data.details.join(", ") : data.error || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

export const getProjects = () => request("/api/projects");

export const createProject = (project) =>
  request("/api/projects", { method: "POST", body: JSON.stringify(project) });

export const deleteProject = (id) => request(`/api/projects/${id}`, { method: "DELETE" });

export const sendContactMessage = (form) =>
  request("/api/contact", { method: "POST", body: JSON.stringify(form) });
