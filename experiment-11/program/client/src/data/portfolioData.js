// Static profile data. Projects are NOT here any more - they come live from MongoDB.

export const profile = {
  name: "Ananya Rao",
  tagline: "Aspiring Full Stack Developer",
  photo: "/profile.svg",
  bio:
    "I am a final year B.E. (CSE) student learning full stack web development. " +
    "This portfolio is a full MERN app: React talks to an Express API that stores data in MongoDB.",
  github: "octocat", // GitHub username shown in the stats card (change it to yours)
};

export const skills = [
  { name: "HTML & CSS", rating: 4 },
  { name: "JavaScript", rating: 3 },
  { name: "React JS", rating: 3 },
  { name: "Node & Express", rating: 2 },
  { name: "MongoDB", rating: 2 },
];

export const cardColors = ["#ffb703", "#fb8500", "#8ecae6", "#219ebc", "#023047", "#ff006e"];
