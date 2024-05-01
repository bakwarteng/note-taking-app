const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./db/uuid");
const PORT = process.envPORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Send a message to the client
res.status(200).json(`${req.method} request received to get notes`);
console.info(`${req.method} request received to get notes`);

app.get("/", (req, res) => {
  console.info(`${req.method}request recieved to add a note`);

  const { noteTitle, noteText } = req.body;
  if (noteTitle && noteText) {
    // Variable for the object we will save
    const newNote = {
      noteTitle,
      noteText,
      noteForm_id: uuid(),
    };
    fs.readFile("./db/reviews.json", "utf8", (err, note) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(note);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          "./db/reviews.json",
          JSON.stringify(parsedReviews, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }

      app.listen(PORT, () =>
        console.log(`App listening at http://localhost:${PORT}`)
      );
    });
  }
});
