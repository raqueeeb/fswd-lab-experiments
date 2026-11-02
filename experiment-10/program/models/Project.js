// Mongoose schema + model for a portfolio Project document
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"], trim: true, maxlength: 100 },
    description: { type: String, trim: true, default: "" },
    stack: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 3 },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// The model "Project" is stored in the "projects" collection
module.exports = mongoose.model("Project", projectSchema);
