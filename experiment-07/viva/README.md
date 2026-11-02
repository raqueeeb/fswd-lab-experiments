# Experiment 07 – Viva Questions & Answers

**Rebuilding the Portfolio with React.js**

[⬅ Experiment 07](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 7 in the FSWD lab manual.

---

### Q1. What is the difference between a functional component and props in React?

**Answer:** A **functional component** is a JavaScript function that **returns JSX** describing part of the UI. **Props** are the **read-only inputs** passed into that function by its parent component to configure what it shows.

```jsx
function Header({ name, tagline }) {           // Header = component
  return <h1>{name} - {tagline}</h1>;
}
<Header name="Ananya Rao" tagline="Developer" /> // name, tagline = props
```

---

### Q2. Why does React require a unique `key` when rendering lists?

**Answer:** The `key` lets React's **reconciliation** process identify which list items were **changed, added or removed** between renders, so it updates only those DOM nodes instead of re-rendering the whole list.

```jsx
{skills.map((skill) => <tr key={skill.name}>...</tr>)}
```

---

### Q3. What does the `useState` hook return, and how is it typically used?

**Answer:** `useState` returns an **array of two items**: the **current state value** and a **setter function**. They are usually destructured together. Calling the setter updates the value and **triggers a re-render**.

```jsx
const [theme, setTheme] = useState("light");
setTheme("dark"); // component re-renders with theme = "dark"
```

---

### Q4. What is the purpose of the dependency array in `useEffect`?

**Answer:** It controls **when the effect runs again**:

| Dependency array | Effect runs |
|---|---|
| `[]` (empty) | Once, after the first render |
| `[a, b]` | After the first render and whenever `a` or `b` changes |
| omitted | After **every** render |

*In the program:* `GitHubStats` uses `[username]`; `App` uses `[theme]` to update the page theme.

---

### Q5. What is the difference between state and props in React?

**Answer:** **Props** are passed in from the parent and are **read-only** inside the component. **State** is data the component **owns and manages itself**; it can change over time, and every change triggers a re-render.

---

### Q6. Why is React described as using a virtual DOM?

**Answer:** React keeps an **in-memory representation** of the UI (the virtual DOM). When state or props change, it builds a new version, **compares (diffs)** it with the previous one, and applies only the **minimal necessary changes** to the real DOM, which improves performance.

---

## Quick revision

| Concept | Remember |
|---|---|
| Component | Function that returns JSX |
| Props | Read-only inputs from the parent |
| `key` | Stable identity for list items |
| `useState` | `[value, setValue]`, setter re-renders |
| `useEffect` deps | `[]` once · `[x]` when x changes · none = every render |
| Virtual DOM | Diff in memory, update only what changed |
