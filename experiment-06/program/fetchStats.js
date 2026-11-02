// Experiment 06 - Fetch API + async/await
// Gets live GitHub user stats and renders them on the page.

const API_BASE = "https://api.github.com";
const TIMEOUT_MS = 8000; // give up if the network is too slow

const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("errorMsg");
const card = document.getElementById("card");
const repoSection = document.getElementById("repoSection");
const repoList = document.getElementById("repoList");

/* ---------- 1. Generic helper: fetch a URL and return its JSON ---------- */
async function getJSON(url) {
  // AbortController cancels the request if it takes longer than TIMEOUT_MS
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    // fetch() only rejects on network failure, so HTTP errors must be checked manually
    if (!response.ok) {
      if (response.status === 404) throw new Error("User not found. Check the username.");
      if (response.status === 403) throw new Error("GitHub API rate limit reached. Try again in a few minutes.");
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json(); // reading the body is asynchronous too
  } catch (err) {
    if (err.name === "AbortError") throw new Error("The request timed out. Check your internet connection.");
    if (err instanceof TypeError) throw new Error("Network error - could not reach GitHub.");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/* ---------- 2. Get a user's profile and latest repositories ---------- */
async function getGithubUser(username) {
  const name = encodeURIComponent(username);
  // Both requests run at the same time; await waits for both
  const [user, repos] = await Promise.all([
    getJSON(`${API_BASE}/users/${name}`),
    getJSON(`${API_BASE}/users/${name}/repos?sort=updated&per_page=5`),
  ]);
  return { user, repos };
}

/* ---------- 3. Put the data into the page ---------- */
function renderUser(user) {
  const avatar = document.getElementById("avatar");
  avatar.src = user.avatar_url;
  avatar.alt = `${user.login}'s avatar`;

  const login = document.getElementById("login");
  login.textContent = `@${user.login}`;
  login.href = user.html_url;

  document.getElementById("fullName").textContent = user.name || user.login;
  document.getElementById("bio").textContent = user.bio || "No bio available";
  document.getElementById("repos").textContent = user.public_repos;
  document.getElementById("followers").textContent = user.followers.toLocaleString();
  document.getElementById("following").textContent = user.following.toLocaleString();
}

function renderRepos(repos) {
  repoList.replaceChildren();

  if (repos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No public repositories yet.";
    repoList.appendChild(li);
    return;
  }

  for (const repo of repos) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = repo.name;

    const meta = document.createElement("span");
    meta.textContent = `★ ${repo.stargazers_count} · ${repo.language || "N/A"}`;

    li.append(link, meta);
    repoList.appendChild(li);
  }
}

/* ---------- 4. Handle a search (loading -> data or error) ---------- */
async function handleSearch() {
  const username = usernameInput.value.trim();
  if (!username) {
    errorMsg.textContent = "Please enter a GitHub username.";
    errorMsg.hidden = false;
    return;
  }

  // reset the UI and show the loading state
  card.hidden = true;
  repoSection.hidden = true;
  errorMsg.hidden = true;
  loading.hidden = false;
  searchBtn.disabled = true;

  try {
    const { user, repos } = await getGithubUser(username);
    renderUser(user);
    renderRepos(repos);
    card.hidden = false;
    repoSection.hidden = false;
  } catch (err) {
    errorMsg.textContent = err.message; // friendly fallback message
    errorMsg.hidden = false;
  } finally {
    loading.hidden = true;
    searchBtn.disabled = false;
  }
}

// Submit by clicking "Fetch" or pressing Enter
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

// Load the default user when the page opens
handleSearch();
