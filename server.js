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
    req.body.id = Math.floor(Math.random() * 10000);
    console.log(req.body.id);

    notes.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  for (let index = 0; index < notes.length; index++) {
    if (notes[index].id == req.params.id) {
      notes.splice(index, 1);
      console.log(notes[index].id);
      console.log(req.params.id);
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
