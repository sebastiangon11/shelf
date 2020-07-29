import { Store } from '../store/store';
import { ClipboardItem } from '../entities/ClipboardItem';

const electron =
  typeof window !== 'undefined' && window.electron && Object.keys(window.electron).length
    ? window.electron
    : require('electron');

export class ClipboardService {
  static getHistory(): ClipboardItem[] {
    try {
      console.info('Getting clipboard history');
      const _history = Store.get('clipboard');

      if (!_history) {
        console.warn('Clipboard history not found');
        return [];
      }

      return Object.values(_history).map(
        (_element: any) => new ClipboardItem(_element.value, _element.id)
      );
    } catch (error) {
      console.error('Error getting clipboard history', error);
      throw error;
    }
  }

  static readClipboard(): ClipboardItem[] | undefined {
    try {
      const _history = this.getHistory();
      const text = electron.clipboard.readText();
      const image = electron.clipboard.readImage();

      if (!text && image.isEmpty()) return;

      const currentValue = text || image.toDataURL();

      if (currentValue === _history[0]?.value) return;

      // Create an item for the new copied value
      const newElement = new ClipboardItem(currentValue);

      // Remove it if it was already in the history
      const historyWithoutNewElement = _history.filter((item) => item.value !== newElement.value);

      // Add it again in the first position
      const historyWithNewElementFirst = [newElement, ...historyWithoutNewElement];

      // Keep only the last 30 items
      const truncatedHistory = historyWithNewElementFirst.slice(0, 30);

      // Save & return the new history state
      Store.set('clipboard', truncatedHistory);
      return truncatedHistory;
    } catch (err) {
      console.error('Error reading clipboard', err);
    }
  }

  static setItem(element: ClipboardItem): ClipboardItem[] {
    try {
      if (element.isImage()) {
        electron.clipboard.writeImage(electron.nativeImage.createFromDataURL(element.value));
      } else {
        electron.clipboard.writeText(element.value);
      }
      return this.getHistory();
    } catch (error) {
      console.error(`Error writing ${element.value} in the clipboard`, error);
      throw error;
    }
  }
}
