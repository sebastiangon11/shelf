import { v4 as uuidv4 } from 'uuid';

export class Draft {
  id: string | undefined;
  name: string | undefined;
  editorState: any;
  deletedAt: string | null = null;

  constructor(name: string, editorState: any) {
    this.id = uuidv4();
    this.name = name;
    this.editorState = editorState;
  }
}
