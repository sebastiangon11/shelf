import { Store } from '../store/store';
import { Note } from '../entities/Note';

export class NotesService {
  static getAllNotes(): Note[] {
    try {
      console.info('Getting all notes');
      const _notes = Store.get('notes');

      if (!_notes) {
        console.warn('Notes not found');
        return [];
      }

      return Object.values(_notes).map(
        (_note: any) => new Note(_note.name, _note.editorState, _note.id)
      );
    } catch (error) {
      console.error('Error getting all notes', error);
      throw error;
    }
  }

  static getNote(id: string): Note | undefined {
    try {
      console.info('Getting note', id);
      const _notes = Store.get('notes');

      if (!_notes || !_notes[id]) {
        console.warn('Note not found with id', id);
        return;
      }

      return new Note(_notes[id].name, _notes[id].editorState, _notes[id].id);
    } catch (error) {
      console.error('Error getting note', id, error);
      throw error;
    }
  }

  static saveNote(note: Note): Note[] {
    try {
      console.info('Saving note', note.toString());
      const _notes = Store.get('notes') || {};
      _notes[note.id] = note;
      Store.set(`notes`, _notes);
      return Object.values(_notes).map(
        (_note: any) => new Note(_note.name, _note.editorState, _note.id)
      );
    } catch (error) {
      console.error('Error saving note', note.toString(), error);
      throw error;
    }
  }

  static deleteNote(note: Note): Note[] {
    try {
      console.info('Deleting note', note.toString());
      const _notes = Store.get('notes') || {};
      delete _notes[note.id];
      Store.set(`notes`, _notes);
      return Object.values(_notes).map(
        (_note: any) => new Note(_note.name, _note.editorState, _note.id)
      );
    } catch (error) {
      console.error('Error deleting note', note.toString(), error);
      throw error;
    }
  }
}
