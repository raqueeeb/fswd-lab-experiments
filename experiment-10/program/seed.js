// Inserts sample projects so the API has data to show.
// Run: npm run seed   (WARNING: replaces all existing documents in the projects collection)

require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");
const Project = require("./models/Project");

const sampleProjects = [
  { title: "Library Management System", stack: "Java, MySQL", description: "Issue/return books and track fines", rating: 4 },
  { title: "Weather App", stack: "HTML, CSS, JavaScript, Fetch API", description: "Live weather for any city", rating: 5 },
  { title: "Result Portal", stack: "PHP, MySQL", description: "Students view semester results", rating: 3 },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Create a .env file first (see .env.example).");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Project.deleteMany({});
    const inserted = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${inserted.length} sample projects.`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
