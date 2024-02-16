const NoteService = {
  getAllNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : {};
  },

  getNotesByNoteName(noteName) {
    const notes = this.getAllNotes();
    return notes[noteName] || [];
  },

  addNoteGroup(noteName, color) {
    const notes = this.getAllNotes();
    if (!notes[noteName]) {
      notes[noteName] = { color, notes: [] }; // Create a new note group with color and an empty array for notes
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  },

  // addNoteToGroup(noteName, note) {
  //   const notes = this.getAllNotes();
  //   if (notes[noteName]) {
  //     notes[noteName].notes.push(note); // Add the note to the existing note group
  //     localStorage.setItem("notes", JSON.stringify(notes));
  //   }
  // },

  addNoteToGroup(noteName, note) {
    const notes = this.getAllNotes();
    if (notes[noteName]) {
      const timestamp = new Date().getTime(); // Get the current timestamp
      const noteWithTimestamp = { note, timestamp }; // Combine note content with timestamp
      notes[noteName].notes.push(noteWithTimestamp); // Add the note to the existing note group with timestamp
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  },

  deleteNoteByIndex(noteName, index) {
    const notes = this.getAllNotes();
    if (notes[noteName]) {
      notes[noteName].notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  },

  getAllNoteNames() {
    const notes = this.getAllNotes();
    return Object.keys(notes);
  },

  updateNotesByNoteName(noteName, updatedNotes) {
    const notes = this.getAllNotes();
    notes[noteName].notes = updatedNotes;
    localStorage.setItem("notes", JSON.stringify(notes));
  },

  getAllNotesWithColors() {
    const notes = this.getAllNotes();
    const notesWithColors = [];
    for (const noteName in notes) {
      const color = notes[noteName].color || ""; // Get the color associated with the note group
      notesWithColors.push({ noteName, color });
    }
    return notesWithColors;
  },
};

export default NoteService;
