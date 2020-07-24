import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import { tools } from './editorjsTools';

import './editorjs-css-overrides.css';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    margin: '0 auto',
    padding: theme.spacing(0, 2)
  },
  editor: {
    paddingTop: 110,
    marginLeft: theme.spacing(2),
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '100%'
  }
}));

interface EditorProps {
  id: string;
  state?: OutputData | undefined;
  onChange?: (newState: Promise<OutputData> | undefined) => void;
  children?: React.ReactNode;
}

export const Editor: React.FC<EditorProps> = ({ id, state, onChange, children }) => {
  const classes = useStyles();
  let editor: EditorJS | null = null;

  useEffect(() => {
    editor = new EditorJS({
      holder: id,
      data: state,
      placeholder: 'Let`s write an awesome note!',
      minHeight: 500,
      tools,
      onChange: () => {
        onChange && onChange(editor?.save());
      }
    });
  }, []);

  return (
    <div data-testid="editor-container" className={classes.root}>
      {children}
      <div data-testid="editor-root" className={classes.editor} id={id} />
    </div>
  );
};
