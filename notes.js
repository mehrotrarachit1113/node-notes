const fs = require('fs');
//to fetch notes stored in the notes-data.json
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};
//to save notes in the notes-data.json
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

//to add a note in the notes-data.json
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  const duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

//to list all the notes present in the file notes-data.json
var getAll = () => {
  return fetchNotes();
};

//to get a specified note from the file notes-data.json
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

//to remove a particular note from the notes-data.json
var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

//to log the values of the title and the body of the note present in the notes-data.jsons
var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

//to export all the module function from the notes.js
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
