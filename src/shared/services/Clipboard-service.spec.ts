import path from 'path';
import { ClipboardService } from './Clipboard-service';
import { ClipboardItem } from '../entities/ClipboardItem';

const electronSettings = require('electron-settings');

electronSettings.configure({
  dir: path.resolve('./src/shared/store'),
  fileName: 'store-mock.json'
});

let mockClipboard = '';

jest.mock('electron', () => ({
  clipboard: {
    readText: jest.fn().mockImplementation(() => mockClipboard),
    readImage: jest.fn().mockReturnValue({ toDataURL: jest.fn(), isEmpty: jest.fn() }),
    writeText: jest.fn().mockImplementation((value) => (mockClipboard = value))
  }
}));

console.warn('Using mock settings file', electronSettings.file());

describe('Clipboard service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should return parsed elements from store', () => {
    const history = ClipboardService.getHistory();
    expect(Array.isArray(history)).toBeTruthy();
    expect(history.length).toBeGreaterThan(0);
    expect(history[0]).toBeInstanceOf(ClipboardItem);
  });

  test('should put the new copied item in the first position', () => {
    const history = ClipboardService.getHistory();
    const lastHistoryElement = history[history.length - 1];

    // Copy the same value as last element
    ClipboardService.setItem(lastHistoryElement);

    // Read the clipboard, the copied element should be first
    const updatedHistory = ClipboardService.readClipboard() as ClipboardItem[];
    expect(updatedHistory[0].value).toEqual(lastHistoryElement.value);
  });
});
