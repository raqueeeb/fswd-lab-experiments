// Static portfolio data, passed down to components as props

export const profile = {
  name: "Ananya Rao",
  tagline: "Aspiring Full Stack Developer",
  photo: "/profile.svg",
  bio:
    "I am a final year B.E. (CSE) student learning full stack web development. " +
    "This version of my portfolio is built with React components, props and hooks.",
  github: "octocat", // GitHub username shown in the stats card (change it to yours)
};

export const skills = [
  { name: "HTML & CSS", rating: 4 },
  { name: "JavaScript", rating: 3 },
  { name: "React JS", rating: 3 },
  { name: "Node & Express", rating: 2 },
  { name: "MongoDB", rating: 2 },
];

export const initialProjects = [
  { id: 1, title: "Library Management System", stack: "Java, MySQL" },
  { id: 2, title: "Weather App", stack: "HTML, CSS, JavaScript" },
  { id: 3, title: "Result Portal", stack: "PHP, MySQL" },
  { id: 4, title: "Chat Application", stack: "Node.js, Socket.IO" },
];

// Card colours, picked by position in the list
export const cardColors = ["#ffb703", "#fb8500", "#8ecae6", "#219ebc", "#023047", "#ff006e"];
