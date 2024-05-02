const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./db/uuid");
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require("./db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  // Send a message to the client
  res.status(200).json(notes);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method}request recieved to add a note`);

  const { title, text } = req.body;
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
