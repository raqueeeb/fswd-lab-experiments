// Contact collection routes, mounted at /api
//   POST   /api/contact        -> contact form submission (Create)
//   GET    /api/messages       -> admin list (Read)
//   GET    /api/messages/:id   -> one message (Read)
//   PUT    /api/messages/:id   -> edit a message (Update)
//   DELETE /api/messages/:id   -> remove a message (Delete)
const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

function contactFields(body = {}) {
  const { name, email, message } = body;
  return { name, email, message };
}

router.post("/contact", async (req, res) => {
  const entry = await Contact.create(contactFields(req.body));
  res.status(201).json({ message: "Message received, thank you!", entry });
});

router.get("/messages", async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.get("/messages/:id", async (req, res) => {
  const entry = await Contact.findById(req.params.id);
  if (!entry) return res.status(404).json({ error: "Message not found" });
  res.json(entry);
});

router.put("/messages/:id", async (req, res) => {
  const entry = await Contact.findByIdAndUpdate(req.params.id, contactFields(req.body), {
    returnDocument: "after",
    runValidators: true,
  });
  if (!entry) return res.status(404).json({ error: "Message not found" });
  res.json(entry);
});

router.delete("/messages/:id", async (req, res) => {
  const entry = await Contact.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ error: "Message not found" });
  res.json({ message: "Message deleted", id: req.params.id });
});

module.exports = router;
