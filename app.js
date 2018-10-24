const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

//Describing the title option that is to be passed in the cli
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

//Describing the body option that is to be passed in the client
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs

  //For adding a note
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })

  //for listing notes
  .command('list', 'List all notes')

  //for reading the notes
  .command('read', 'Read a note', {
    title: titleOptions,
  })

  //for removing the notes
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

//If the add command is passed in the cli
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} 

//If the list option  is passed in the cli
else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} 

//If the read option is passede in the cli
else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
}

//If the remove option is passed in the cli
else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} 

//If any option other than add , remove , list and read is passed in the cli
else {
  console.log('Command not recognized');
}
