import React, { FunctionComponent, ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useNotes } from './useNotes';
import { StoreContext } from '../../context/store-context';
import { Note } from '../../shared/Note';

let storeMock: any[] = [
  [
    'f236da38-6fd4-49fd-9465-2c03ec3739b1',
    { id: 'f236da38-6fd4-49fd-9465-2c03ec3739b1', name: 'one note', editorState: {} }
  ],
  [
    '97933b5e-e76e-40ac-ad7e-879ac21c292a',
    { id: '97933b5e-e76e-40ac-ad7e-879ac21c292a', name: 'two note', editorState: {} }
  ],
  [
    '5fdee193-85c7-46d6-9745-a94e05e4dd72',
    { id: '5fdee193-85c7-46d6-9745-a94e05e4dd72', name: 'three note', editorState: {} }
  ]
];

const storeContextMock = {
  set: jest.fn().mockImplementation((key: string, value: any[]) => {
    storeMock = value;
    return;
  }),
  get: (key: string) => storeMock
};

interface wrapperProps {
  storeContextMock: {
    set: (key: string, value: object) => void;
    get: (key: string) => any;
  };
}

const makeWrapper: (props: wrapperProps) => FunctionComponent = ({
  storeContextMock: storeContextMock
}): FunctionComponent => ({ children }: { children?: ReactNode }) => (
  <StoreContext.Provider value={storeContextMock}>{children}</StoreContext.Provider>
);

describe('useNotes', () => {
  test('should return elements from store context', () => {
    const { result } = renderHook(() => useNotes(), {
      wrapper: makeWrapper({ storeContextMock })
    });

    const [notes] = result.current;
    expect(notes).toHaveLength(3);
  });

  test('should remove the note from the store', () => {
    const { result } = renderHook(() => useNotes(), {
      wrapper: makeWrapper({ storeContextMock })
    });

    const [notesT0, _, deleteNote] = result.current;

    const lengthBeforeDelete = notesT0.length;

    act(() => {
      deleteNote(notesT0[0]);
    });

    const [notesT1] = result.current;

    expect(notesT1).toHaveLength(lengthBeforeDelete - 1);
    expect(storeContextMock.set).toHaveBeenCalledTimes(1);
  });
});
