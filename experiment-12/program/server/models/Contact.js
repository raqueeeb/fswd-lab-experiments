// Mongoose schema + model for a Contact (message) document
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], trim: true, minlength: 3, maxlength: 50 },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      match: [/^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}$/, "email is not valid"],
    },
    message: { type: String, required: [true, "message is required"], trim: true, minlength: 10, maxlength: 1000 },
  },
  { timestamps: true } // createdAt = when the message was received
);

// The model "Contact" is stored in the "contacts" collection
module.exports = mongoose.model("Contact", contactSchema);
