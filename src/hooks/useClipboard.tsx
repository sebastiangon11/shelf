import React from 'react';
import { SettingsContext } from '../context/settings-context';
import { ElectronContext } from '../context/electron-context';
import { ClipboardItem } from '../shared/ClipboardItem';

export const useClipboard = () => {
  const settings = React.useContext(SettingsContext);
  const electron = React.useContext(ElectronContext);
  const [history, setHistory] = React.useState<ClipboardItem[]>([]);

  React.useEffect(() => {
    const rawHistory = settings.get('clipboard') || [];
    setHistory(rawHistory.map((element: any) => new ClipboardItem(element.value, element.id)));
  }, []);

  React.useEffect(() => {
    const readClipboard = () => {
      try {
        const text = electron.clipboard.readText();
        const image = electron.clipboard.readImage();
        const currentValue = text || image.toDataURL();
        const newElement = new ClipboardItem(currentValue);
        const historyWithoutNewElement = history.filter((item) => item.value !== newElement.value);
        const historyWithNewElementFirst = [newElement, ...historyWithoutNewElement];
        const truncatedHistory = historyWithNewElementFirst.slice(0, 30);

        settings.set('clipboard', truncatedHistory);
        setHistory(truncatedHistory);
      } catch (err) {
        console.error('Error reading from clipboard: ', err);
      }
    };

    const intervalId = setInterval(readClipboard, 1000);
    return () => clearInterval(intervalId);
  });

  const setItem = (element: ClipboardItem) => {
    try {
      if (element.isImage()) {
        electron.clipboard.writeImage(electron.nativeImage.createFromDataURL(element.value));
      } else {
        electron.clipboard.writeText(element.value);
      }
    } catch (error) {
      console.error(`Failing to copy ${element.value}, error: ${error}`);
    }
  };

  return [history, setItem] as const;
};
