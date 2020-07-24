import List from '@editorjs/list';
import Header from '@editorjs/header';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import Marker from '@editorjs/marker';
import Table from '@editorjs/table';
import SimpleImage from 'simple-image-editorjs';

export const tools = {
  header: {
    class: Header,
    inlineToolbar: true
  },
  list: {
    class: List,
    inlineToolbar: true
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true
  },
  marker: {
    class: Marker,
    inlineToolbar: true
  },
  code: {
    class: CodeTool
  },
  table: {
    class: Table
  },
  image: SimpleImage
};