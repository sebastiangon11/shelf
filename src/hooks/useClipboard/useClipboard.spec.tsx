import React, { FunctionComponent, ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useClipboard } from './useClipboard';
import { StoreContext } from '../../context/store-context';
import { ElectronContext } from '../../context/electron-context';
import { ClipboardItem } from '../../shared/ClipboardItem';

let storeMock = [new ClipboardItem('element-from-store'), new ClipboardItem('last-from-store')];
let clipboardMock: string = '';

const storeContextMock = {
  set: jest.fn().mockImplementation((key: string, value: object) => {
    storeMock = value as ClipboardItem[];
    return;
  }),
  get: (key: string) => storeMock
};

const electronContextMock = {
  clipboard: {
    writeText: (text: string) => (clipboardMock = text),
    readText: () => clipboardMock,
    readImage: jest.fn().mockReturnValue({
      toDataURL: jest.fn()
    }),
    writeImage: jest.fn()
  },
  nativeImage: jest.fn(),
  quit: jest.fn()
};

interface wrapperProps {
  storeContextMock: {
    set: (key: string, value: object) => void;
    get: (key: string) => any;
  };
  electronContextMock: {
    clipboard: {
      writeText: (text: string) => void;
    };
    nativeImage: any;
    quit: () => void;
  };
}

const makeWrapper: (props: wrapperProps) => FunctionComponent = ({
  storeContextMock: storeContextMock,
  electronContextMock
}): FunctionComponent => ({ children }: { children?: ReactNode }) => (
  <StoreContext.Provider value={storeContextMock}>
    <ElectronContext.Provider value={electronContextMock}>{children}</ElectronContext.Provider>
  </StoreContext.Provider>
);

describe('useClipboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should return elements from store context', () => {
    const { result } = renderHook(() => useClipboard(), {
      wrapper: makeWrapper({ storeContextMock: storeContextMock, electronContextMock })
    });

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current).toHaveLength(2);

    const [history, setItem] = result.current;

    expect(history).toHaveLength(storeMock.length);
    expect(history[0]).toBeInstanceOf(ClipboardItem);
    expect(typeof setItem).toBe('function');
  });

  test('should add the new element to the first position of the clipboard history when setItem is called', async () => {
    const { result, waitForValueToChange } = renderHook(() => useClipboard(), {
      wrapper: makeWrapper({ storeContextMock: storeContextMock, electronContextMock })
    });

    const [_, setItem] = result.current;

    act(() => {
      setItem(new ClipboardItem('manually-added-element'));
    });

    await waitForValueToChange(() => {
      const [history] = result.current;
      return history[0].value;
    });

    const [history] = result.current;
    expect(history[0].value).toBe('manually-added-element');
  });

  test('should realocate copied item in first position if it was already in the history', async () => {
    const { result, waitForValueToChange } = renderHook(() => useClipboard(), {
      wrapper: makeWrapper({ storeContextMock: storeContextMock, electronContextMock })
    });

    const [historyT0, setItem] = result.current;

    expect(historyT0[historyT0.length - 1].value).toBe('last-from-store');

    act(() => {
      setItem(new ClipboardItem('last-from-store'));
    });

    await waitForValueToChange(() => {
      const [historyT1] = result.current;
      return historyT1[0].value;
    });

    const [historyT1] = result.current;
    expect(historyT1[0].value).toBe('last-from-store');
    expect(historyT1[historyT1.length - 1].value).not.toBe('last-from-store');
  });

  test('should not change state or save to the store if the value is the same as last copied', async () => {
    const { result, waitForValueToChange } = renderHook(() => useClipboard(), {
      wrapper: makeWrapper({ storeContextMock: storeContextMock, electronContextMock })
    });

    const [historyT0, setItem] = result.current;

    act(() => {
      // Copy some value that is equal to the last element copied
      setItem(new ClipboardItem(historyT0[0].value));
    });

    expect(storeContextMock.set.mock.calls).toHaveLength(0);

    act(() => {
      // Copy different value
      setItem(new ClipboardItem('some-different-value'));
    });

    await waitForValueToChange(() => {
      const [historyT1] = result.current;
      return historyT1[0].value;
    });

    expect(storeContextMock.set.mock.calls).toHaveLength(1);
  });
});
