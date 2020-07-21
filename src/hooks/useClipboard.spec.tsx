import React, { FunctionComponent, ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { wait } from '@testing-library/dom';

import { useClipboard } from './useClipboard';
import { SettingsContext } from '../context/settings-context';
import { ElectronContext } from '../context/electron-context';
import { ClipboardItem } from '../shared/ClipboardItem';

const settingsMock = [new ClipboardItem('element-from-store')];
let clipboardMock: string = '';

const settingsContextMock = {
  set: (key: string, value: object) => {
    settingsMock.push(value as ClipboardItem);
    return;
  },
  get: (key: string) => settingsMock
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
  settingsContextMock: {
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
  settingsContextMock,
  electronContextMock
}): FunctionComponent => ({ children }: { children?: ReactNode }) => (
  <SettingsContext.Provider value={settingsContextMock}>
    <ElectronContext.Provider value={electronContextMock}>{children}</ElectronContext.Provider>
  </SettingsContext.Provider>
);

describe('useClipboard', () => {
  test('should return elements from settings context', () => {
    const { result } = renderHook(() => useClipboard(), {
      wrapper: makeWrapper({ settingsContextMock, electronContextMock })
    });

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current).toHaveLength(2);

    const [history, setItem] = result.current;

    expect(history).toHaveLength(1);
    expect(history[0]).toBeInstanceOf(ClipboardItem);
    expect(typeof setItem).toBe('function');
  });

  test('should add the new element to the first position of the clipboard history when setItem is called', async () => {
    const { result, waitForValueToChange } = renderHook(() => useClipboard(), {
      wrapper: makeWrapper({ settingsContextMock, electronContextMock })
    });

    jest.useFakeTimers();

    const [_, setItem] = result.current;

    act(() => {
      setItem(new ClipboardItem('manually-added-element'));
    });

    setImmediate(() => {
      act(() => {
        jest.runAllTimers();
      });
    });

    await waitForValueToChange(() => {
      const [history] = result.current;
      return history[0].value;
    });

    const [history] = result.current;
    expect(history[0].value).toBe('manually-added-element');
  });
});
