import React from 'react';
import { StoreContext } from '../../context/store-context';
import { Note } from '../../shared/Note';

export const useNotes = () => {
  const store = React.useContext(StoreContext);

  const rawNotes = store.get('notes') || new Map();
  const [notes, setNotes] = React.useState<Map<string, Note>>(new Map(rawNotes));

  const saveNote = (note: Note) => {
    try {
      const _notes = new Map(notes);
      _notes.set(note.id, note);
      store.set('notes', [...Array.from(_notes.entries())]);
      setNotes(_notes);
    } catch (error) {
      console.error(`Error saving note: ${note.toString()}, error: ${error}`);
      throw error;
    }
  };

  const deleteNote = (note: Note) => {
    try {
      const _notes = new Map(notes);
      if (_notes.has(note.id)) {
        _notes.delete(note.id);
        store.set('notes', [...Array.from(_notes.entries())]);
        setNotes(_notes);
      }
    } catch (error) {
      console.error(`Error removing note: ${note.toString()}, error: ${error}`);
      throw error;
    }
  };

  return [Array.from(notes.values()), saveNote, deleteNote] as const;
};
