import React from 'react';

import { useClipboard } from '../../hooks/useClipboard/useClipboard';
import { ClipboardItem } from '../../shared/ClipboardItem';
import { TextImageList } from '../../components/TextImageList/TextImageList';

interface ClipboardHistoryProps {}

export const ClipboardHistory: React.FC<ClipboardHistoryProps> = ({}) => {
  const [clipboardHistory, setClipboardItem] = useClipboard();

  return (
    <TextImageList
      elements={clipboardHistory}
      onElementClick={setClipboardItem}
      empty="Your clipboard is empty"
      isImage={(element: ClipboardItem) => element.isImage()}
    />
  );
};
