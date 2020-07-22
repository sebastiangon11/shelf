import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string;
  name: string | undefined;
  editorState: any;

  constructor(name: string, editorState: any, id?: string) {
    this.name = name;
    this.editorState = editorState;
    this.id = id || uuidv4();
  }

  public toString() {
    return `${this.id} - ${this.name}`;
  }
}
