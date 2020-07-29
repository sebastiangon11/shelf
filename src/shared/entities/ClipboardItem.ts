import { v4 as uuidv4 } from 'uuid';

type clipboardItemType = 'IMAGE' | 'TEXT';

class ClipboardItem {
  id: string;
  value: string;
  type: clipboardItemType;

  constructor(value: string, id?: string) {
    this.id = id || uuidv4();
    this.value = value;
    this.type = value.match(/^data:([A-Za-z-+/]+);base64,/) ? 'IMAGE' : 'TEXT';
  }

  public isImage(): boolean {
    return this.type === 'IMAGE';
  }
}

export { ClipboardItem };
