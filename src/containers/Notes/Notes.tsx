import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Note } from '../../shared/Note';
import { useNotes } from '../../hooks/useNotes/useNotes';
import { TabPanel, Panels, Panel, Tabs, Tab } from '../../components/TabPanel/TabPanel';
import { Editor } from '../../components/Editor/Editor';
import { EditorMenu } from '../../components/Editor/EditorMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: `calc(100% - 80px)`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2)
  }
}));

export const Notes = () => {
  const classes = useStyles();
  const [notes, saveNote, deleteNote] = useNotes();

  const createNote = () => {
    const note = new Note('New note', {});
    saveNote(note);
  };

  const handleEditorSave = (note: Note) => async (newState: Promise<any> | undefined) => {
    note.editorState = await newState;
    saveNote(note);
  };

  const handleNameChange = (note: Note) => async (newName: string) => {
    note.name = newName;
    saveNote(note);
  };

  const handleEditorDelete = (note: Note) => () => {
    deleteNote(note);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <TabPanel onTabCreated={createNote}>
        <Tabs>
          {notes.map((note) => (
            <Tab key={note.id} label={note.name} />
          ))}
        </Tabs>
        <Panels>
          {notes.map((note) => (
            <Panel>
              <Editor id={note.id} state={note.editorState} onChange={handleEditorSave(note)}>
                <EditorMenu
                  title={note.name}
                  subtitle={
                    note.editorState?.time
                      ? `Last change ${new Date(note.editorState.time).toLocaleString()}`
                      : 'Draft'
                  }
                  onTitleChange={handleNameChange(note)}
                  onDelete={handleEditorDelete(note)}
                />
              </Editor>
            </Panel>
          ))}
        </Panels>
      </TabPanel>
    </Paper>
  );
};
