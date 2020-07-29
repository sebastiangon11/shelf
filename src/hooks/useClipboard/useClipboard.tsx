import React from 'react';
import { ClipboardService } from '../../shared/services/Clipboard-service';
import { ClipboardItem } from '../../shared/entities/ClipboardItem';

export const useClipboard = () => {
  const [history, setHistory] = React.useState<ClipboardItem[]>([]);

  React.useEffect(() => {
    try {
      setHistory(ClipboardService.getHistory());
    } catch (error) {
      console.error(error.message);
      setHistory([]);
    }
  }, []);

  React.useEffect(() => {
    const readClipboard = () => {
      try {
        const updatedClipboard = ClipboardService.readClipboard();
        if (updatedClipboard) {
          setHistory(updatedClipboard);
        }
      } catch (error) {
        console.error(error.message);
        setHistory([]);
      }
    };

    const intervalId = setInterval(readClipboard, 1000);
    return () => clearInterval(intervalId);
  });

  const setItem = (element: ClipboardItem) => {
    try {
      const updatedHistory = ClipboardService.setItem(element);
      if (updatedHistory) {
        setHistory(updatedHistory);
      }
    } catch (error) {
      console.error(error.message);
      setHistory([]);
    }
  };

  return [history, setItem] as const;
};
