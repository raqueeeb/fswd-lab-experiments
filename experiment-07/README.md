# Experiment 07 – Rebuilding the Portfolio with React.js

> **Syllabus:** React.js Re-build the portfolio as a React app with functional components, props, state (useState), and useEffect.

| Technology | Program | Viva |
|---|---|---|
| React 19, Vite 8, Node.js + npm | [program/](program/) | [viva/README.md](viva/README.md) (6 questions) |

## Aim

To rebuild the personal portfolio as a React application using functional components, props, state (`useState`), and effects (`useEffect`).

## Component hierarchy

```text
App                      owns state: theme, projects
├── Header               props: name, tagline, theme, onToggleTheme
├── About                props: name, photo, bio
├── SkillsTable          props: skills  (list rendered with key)
├── ProjectGallery       props: projects, onAdd, onRemove · state: title, stack, search
│   └── ProjectCard      props: title, stack, color, onRemove
├── GitHubStats          props: username · useEffect -> fetch GitHub API (from Exp 06)
├── ContactForm          state: form, errors, status (validation from Exp 05)
└── Footer               props: name
```

## Files

| Path | Purpose |
|---|---|
| [`program/src/App.jsx`](program/src/App.jsx) | Root component, theme + projects state, `useEffect` for the theme |
| [`program/src/components/`](program/src/components/) | One file per functional component |
| [`program/src/data/portfolioData.js`](program/src/data/portfolioData.js) | Profile, skills and project data |
| [`program/src/App.css`](program/src/App.css) | Styles adapted from Experiments 02 and 04 |
| [`program/src/main.jsx`](program/src/main.jsx) | Mounts `<App />` into `#root` |
| [`program/index.html`](program/index.html), [`program/vite.config.js`](program/vite.config.js) | Vite entry page and config |

## How to run

Requires **Node.js 20.19+ or 22.12+** (Vite 8 requirement).

```powershell
cd experiment-07\program
npm install
npm run dev
```

Open **http://localhost:5173**. Stop the server with `Ctrl + C`.

Production build (optional):

```powershell
npm run build
npm run preview
```

then open **http://localhost:4173**.

## Expected output

The full portfolio rendered by React: header with a **Dark Mode** button, About, a skills table with ★ ratings, a project gallery (add / remove / search cards), a **GitHub Stats** card loaded with `useEffect`, and a validated contact form ("Thanks Rahul Kumar, your message is valid and ready to send!"). The theme choice is remembered after a reload.

> The GitHub card uses the public GitHub API (60 requests/hour per IP without a token). If the limit is reached it shows a friendly "rate limit" message instead of crashing.

## Procedure

1. Scaffold a React project with Vite (`npm create vite@latest`, React template) – this repository already contains the result.
2. Plan the component hierarchy (above).
3. Convert each HTML section from Experiments 01–04 into JSX inside its component.
4. Pass `skills` and `projects` from `App` to children as props; render lists with a unique `key`.
5. Use `useState` in `ContactForm` for controlled inputs and validation errors (logic from Experiment 05).
6. Keep the theme in `useState` in `App`; pass the value and a toggle function down as props.
7. Use `useEffect` in `GitHubStats` to fetch GitHub data when the component mounts (from Experiment 06).
8. Reuse the CSS from Experiment 02 in `App.css`.
9. Run the dev server and check that components update when props and state change.

## Concepts covered

JSX · functional components · props (data and callback functions) · `useState` (including updater functions and immutable updates) · `useEffect` with dependency arrays and cleanup (`AbortController`) · lists and `key` · controlled form inputs · conditional rendering.

## Verification

Automated in headless Edge against **both** `npm run dev` and the production build (`npm run preview`): components render from props, 5 skill rows, add/remove/search projects, GitHub card via `useEffect` (GitHub API mocked because of the rate limit), theme toggle + persistence, contact validation and success – no console errors. `npm run build` succeeds.
