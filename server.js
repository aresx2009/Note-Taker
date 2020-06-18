// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var notes = require("./DB/db.json")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    notes.push(req.body);
    noteId();
    fs.writeFileSync("db.json", JSON.stringify(notes));
    res.redirect("back");
});

app.delete("/api/notes/:id", function (req, res) {
    var deleteNote = notes.findIndex((i) => i.id == req.params.id);
    notes.splice(deleteNote, 1);
    newNote();
    res.json(notes);
});

function noteId() {
    notes.forEach((Element, i) => Element.id = i + 1);
};

function newNote() {
    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) {
            throw err;
        };
    });
};

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

