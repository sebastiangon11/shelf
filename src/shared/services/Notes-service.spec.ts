import path from 'path';
import { NotesService } from './Notes-service';
import { Note } from '../entities/Note';

const electronSettings = require('electron-settings');

electronSettings.configure({
  dir: path.resolve('./src/shared/store'),
  fileName: 'store-mock.json'
});

console.warn('Using mock settings file', electronSettings.file());

describe('Notes service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return parsed elements from store', () => {
    const notes = NotesService.getAllNotes();
    expect(Array.isArray(notes)).toBeTruthy();
    expect(notes.length).toBeGreaterThan(0);
    expect(notes[0]).toBeInstanceOf(Note);
  });

  test('should save, retrieve and modify a preference ', () => {
    const id = 'TEST_NOTE';
    const name = 'some test preference';

    const noteT0 = new Note(name, {}, id);

    // Save it
    NotesService.saveNote(noteT0);

    // Retrieve it
    const noteT1 = NotesService.getNote(id) as Note;
    expect(noteT1?.name).toBe(name);
    expect(noteT1?.editorState).toEqual({});

    // Modify it
    const newName = 'NEW_NAME';
    const newState = { block: 'a text block' };
    noteT1.name = newName;
    noteT1.editorState = newState;
    NotesService.saveNote(noteT1);

    // Check de modification
    const noteT2 = NotesService.getNote(id) as Note;
    expect(noteT2?.name).toBe(newName);
    expect(noteT2?.editorState).toEqual(newState);
  });
});
