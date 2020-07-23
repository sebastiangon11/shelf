import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Note } from '../../shared/Note';
import { useNotes } from '../../hooks/useNotes/useNotes';
import { Paper } from '@material-ui/core';
import { TabPanel, Panels, Panel, Tabs, Tab } from '../../components/TabPanel/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: `calc(100% - 80px)`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2)
  }
}));

export const Notes = () => {
  const classes = useStyles();
  const [notes, saveNote] = useNotes();

  const createNote = () => {
    const note = new Note('new note', {});
    saveNote(note);
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
            <Panel>{note.name}</Panel>
          ))}
        </Panels>
      </TabPanel>
    </Paper>
  );
};
