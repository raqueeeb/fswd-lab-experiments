// GitHubStats: the Fetch API call from Experiment 06, now inside useEffect
import { useEffect, useState } from "react";

function GitHubStats({ username }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Runs after the first render and again only if `username` changes
  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(
            response.status === 403 ? "GitHub API rate limit reached. Try again later." : `Request failed (${response.status})`
          );
        }
        setUser(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUser();

    // Cleanup: cancel the request if the component unmounts first
    return () => controller.abort();
  }, [username]);

  return (
    <section id="github" className="section">
      <h2>GitHub Stats</h2>
      {loading && <p className="loading">Loading GitHub data...</p>}
      {error && <p className="error-text">Could not load GitHub data: {error}</p>}
      {!loading && !error && user && (
        <div className="github-card">
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
          <div>
            <h3>{user.name || user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              @{user.login}
            </a>
            <div className="stats">
              <div>
                <strong>{user.public_repos}</strong>
                <span>Repos</span>
              </div>
              <div>
                <strong>{user.followers.toLocaleString()}</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>{user.following}</strong>
                <span>Following</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GitHubStats;
