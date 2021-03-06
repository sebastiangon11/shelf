import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string;
  name: string;
  editorState: any;

  constructor(name: string, editorState: any, id?: string) {
    this.name = name;
    this.editorState = editorState;
    this.id = id || uuidv4();
  }

  public toString() {
    return `Note: ${this.id} - ${this.name}`;
  }
}
