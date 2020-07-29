import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useNotes } from './useNotes';
import { Note } from '../../shared/entities/Note';

const mockNotes = [
  new Note('one-note', {}, 'f236da38-6fd4-49fd-9465-2c03ec3739b1'),
  new Note('two-notes', {}, '97933b5e-e76e-40ac-ad7e-879ac21c292a'),
  new Note('three-notes', {}, '5fdee193-85c7-46d6-9745-a94e05e4dd72')
];

const mockGetAllNotes = jest.fn();

const mockDeleteNote = jest.fn().mockImplementation((note: Note) => {
  return mockNotes.filter((n) => n.id !== note.id);
});

const mockSaveNote = jest.fn().mockImplementation((note: Note) => {
  return mockNotes.concat(note);
});

jest.mock('../../shared/services/Notes-service', () => ({
  NotesService: class {
    public static getAllNotes(): Note[] {
      return mockGetAllNotes();
    }
    public static deleteNote(note: Note): Note[] {
      return mockDeleteNote(note);
    }
    public static saveNote(note: Note): Note[] {
      return mockSaveNote(note);
    }
  }
}));

describe('useNotes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return elements from store context', () => {
    mockGetAllNotes.mockImplementationOnce(() => mockNotes);
    const { result } = renderHook(() => useNotes());

    const [notes] = result.current;
    expect(notes).toHaveLength(3);
  });

  test('should render if empty array is returned', () => {
    mockGetAllNotes.mockImplementationOnce(() => []);
    const { result } = renderHook(() => useNotes());

    const [notes] = result.current;
    expect(notes).toHaveLength(0);
  });

  test('should remove the note from the store and return the new store state', () => {
    mockGetAllNotes.mockImplementationOnce(() => mockNotes);
    const { result } = renderHook(() => useNotes());

    const [notesT0, _, deleteNote] = result.current;

    const lengthBeforeDelete = notesT0.length;

    act(() => {
      deleteNote(notesT0[0]);
    });

    const [notesT1] = result.current;

    expect(notesT1).toHaveLength(lengthBeforeDelete - 1);
  });

  test('should add a note to the store and return the new store state', () => {
    mockGetAllNotes.mockImplementationOnce(() => mockNotes);
    const { result } = renderHook(() => useNotes());

    const [notesT0, saveNote, _] = result.current;

    const lengthBeforeDelete = notesT0.length;

    act(() => {
      saveNote(new Note('three-notes', {}, '5fdee193-85c7-46d6-9745-a94e05e4dd72'));
    });

    const [notesT1] = result.current;

    expect(notesT1).toHaveLength(lengthBeforeDelete + 1);
  });
});
