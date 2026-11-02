# Experiment 10 – Viva Questions & Answers

**MongoDB & Mongoose — CRUD Operations**

[⬅ Experiment 10](../README.md) · [Program files](../program/) · [All experiments](../../README.md)

> 6 questions from the viva section of Experiment 10 in the FSWD lab manual.

---

### Q1. What is MongoDB, and how does it differ from a relational database?

**Answer:** MongoDB is a **NoSQL, document-oriented** database. It stores data as flexible, JSON-like **documents** inside **collections**. A relational database stores data in **tables with rows and a fixed schema**, with predefined relationships between tables.

| Relational (SQL) | MongoDB |
|---|---|
| Table | Collection |
| Row | Document |
| Column | Field |

---

### Q2. What is Mongoose, and what advantage does it provide over the native MongoDB driver?

**Answer:** Mongoose is an **ODM (Object Data Modeling)** library for MongoDB and Node.js. It lets us define **schemas with data types and validation rules**, adding structure and built-in validation on top of MongoDB's otherwise schema-less documents.

---

### Q3. What do the four CRUD operations stand for?

**Answer:** **Create, Read, Update, Delete** – the four basic operations for managing persistent data.

| CRUD | HTTP | Mongoose (this program) |
|---|---|---|
| Create | POST | `Project.create()` |
| Read | GET | `Project.find()`, `Project.findById()` |
| Update | PUT | `Project.findByIdAndUpdate()` |
| Delete | DELETE | `Project.findByIdAndDelete()` |

---

### Q4. Why is a "return the updated document" option typically passed when updating a document by its id?

**Answer:** By default, `findByIdAndUpdate()` returns the document **as it was before** the update. The option tells Mongoose to return the **updated** document instead.

```js
Project.findByIdAndUpdate(id, changes, { returnDocument: "after", runValidators: true });
// older Mongoose code writes the same thing as { new: true }
```

---

### Q5. What is a Mongoose schema, and what role does it play given that MongoDB itself is schema-less?

**Answer:** A schema defines the **shape, data types, defaults and validation rules** for the documents in a collection. It enforces **structure and consistency at the application level**, even though MongoDB itself does not require a fixed schema.

```js
title: { type: String, required: true, trim: true },
rating: { type: Number, min: 1, max: 5, default: 3 }
```

---

### Q6. Why should database connection logic include error handling?

**Answer:** Connecting is **asynchronous and can fail** (wrong credentials, IP not allowed in Atlas Network Access, no internet). Without error handling, the failure could **crash the server** or leave it **silently unable to serve data**.

*In the program:* `server.js` awaits `mongoose.connect()` inside `try-catch`, prints a helpful message and exits if it fails.

---

## Quick revision

| Concept | Remember |
|---|---|
| MongoDB | NoSQL, documents in collections |
| Mongoose | ODM: schemas, types, validation |
| CRUD | Create, Read, Update, Delete |
| Update option | `returnDocument: "after"` (old: `new: true`) |
| Schema | App-level structure on a schema-less DB |
| Connection errors | Always `try-catch` the connect call |
