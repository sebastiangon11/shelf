import React, { useEffect } from 'react';
import { NotesService } from '../../shared/services/Notes-service';
import { Note } from '../../shared/entities/Note';

export const useNotes = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);

  useEffect(() => {
    setNotes(NotesService.getAllNotes());
  }, []);

  const saveNote = (note: Note) => {
    const updatedNotes = NotesService.saveNote(note);
    setNotes(updatedNotes);
  };

  const deleteNote = (note: Note) => {
    const updatedNotes = NotesService.deleteNote(note);
    setNotes(updatedNotes);
  };

  return [notes, saveNote, deleteNote] as const;
};
