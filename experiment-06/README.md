# Experiment 06 – Fetch API & Async/Await

> **Syllabus:** Fetch API - Get live data (e.g., GitHub user stats, etc) and render it on the portfolio, introducing async/await.

| Technology | Program | Viva |
|---|---|---|
| HTML5, CSS3, JavaScript (Fetch API, async/await), GitHub REST API | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To fetch live data from a public API, such as GitHub user statistics, and render it on the portfolio using the Fetch API and async/await.

## Files

| File | Purpose |
|---|---|
| [`program/index.html`](program/index.html) | Search box, loading/error messages, profile card and repository list |
| [`program/fetchStats.js`](program/fetchStats.js) | `async` functions that call `https://api.github.com` with `fetch` + `await` |
| [`program/style.css`](program/style.css) | Card styles |

## How to run

An internet connection is required.

```powershell
cd experiment-06\program
start index.html
```

macOS: `open index.html` · Linux: `xdg-open index.html`

## Expected output

1. "Loading data..." appears, then the card for **octocat** (the default user): avatar, name, `@login`, bio, and Repos / Followers / Following counts, plus the 5 most recently updated repositories.
2. Type another username (e.g. `torvalds`) and click **Fetch** or press Enter.
3. An unknown username shows **"User not found. Check the username."**

> **Note – GitHub rate limit:** without a token, GitHub allows **60 API requests per hour per IP address** (each search uses 2). On a shared network (college lab/hostel Wi-Fi) the limit may already be used up; the page then shows *"GitHub API rate limit reached. Try again in a few minutes."* – this is the error handling working correctly.

## Procedure

1. Pick a public endpoint (`https://api.github.com/users/<username>`) and inspect its JSON.
2. Write an `async` function that takes a username.
3. Call `fetch()` with `await` and store the response.
4. Check `response.ok`; if it is false, `throw` an error (404 → user not found, 403 → rate limit).
5. Parse the body with `await response.json()`.
6. Update DOM elements (`textContent`, image `src`) with the data.
7. Wrap the work in `try-catch` and show a fallback message on failure; an `AbortController` cancels requests slower than 8 seconds.
8. Run the search on page load and on button click, showing "Loading data..." while waiting (`finally` hides it).
9. Test valid and invalid usernames and an offline network (DevTools → Network → Offline).

## Concepts covered

Promises · `async` / `await` · `fetch()` and `response.ok` · `response.json()` · `Promise.all()` for parallel requests · `try` / `catch` / `finally` · `AbortController` timeouts · loading and error states.

## Verification

- **Logic (mocked API, headless Edge):** success card and repository list, number formatting, missing-bio fallback, 404 → "User not found", 403 → rate-limit message, network failure → "Network error", empty username – all passed with no page errors.
- **Live API (headless Edge, real `api.github.com`):** card rendered for `@octocat` with live follower count, avatar and the 5 latest repositories.
