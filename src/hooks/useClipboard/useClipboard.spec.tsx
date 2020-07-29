import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useClipboard } from './useClipboard';
import { ClipboardItem } from '../../shared/entities/ClipboardItem';

const mockHistory = [
  new ClipboardItem('value-1', '1'),
  new ClipboardItem('value-2', '2'),
  new ClipboardItem('image?', '3')
];

const mockGetHistory = jest.fn().mockImplementation(() => mockHistory);

const mockReadClipboard = jest.fn();

const mockSetItem = jest
  .fn()
  .mockImplementation((element: ClipboardItem) => [element, ...mockHistory]);

jest.mock('../../shared/services/Clipboard-service', () => ({
  ClipboardService: class {
    public static getHistory(): ClipboardItem[] {
      return mockGetHistory();
    }
    public static readClipboard(): ClipboardItem[] | undefined {
      return mockReadClipboard();
    }
    public static setItem(element: ClipboardItem): ClipboardItem[] {
      return mockSetItem(element);
    }
  }
}));

describe('useClipboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should return elements from history', () => {
    const { result } = renderHook(() => useClipboard());

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current).toHaveLength(2);

    const [history, setItem] = result.current;

    expect(history).toHaveLength(mockHistory.length);
    expect(history[0]).toBeInstanceOf(ClipboardItem);
    expect(typeof setItem).toBe('function');
  });

  test('should update the state after an item is copied', () => {
    const { result } = renderHook(() => useClipboard());
    const [_, setItem] = result.current;

    act(() => {
      setItem(new ClipboardItem('manually-added-element'));
    });

    const [history] = result.current;
    expect(history[0].value).toBe('manually-added-element');
  });
});
