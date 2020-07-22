import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Box from '@material-ui/core/Box';
import { Note } from '../../shared/Note';
import { useNotes } from '../../hooks/useNotes/useNotes';
import { Paper } from '@material-ui/core';
import { TabPanel } from '../../components/TabPanel/TabPanel';
// import debounce from 'lodash/debounce';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: `calc(100% - 80px)`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2, 2, 2, 2)
  },
  tabs: {
    width: '20%'
  },
  tabPanelBox: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'auto',
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.divider}`
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
      <TabPanel onTabCreated={(index) => console.log('new tab created', index)}>
        <Tabs>
          {notes.map((note) => (
            <Tab key={note.id} label={note.name} />
          ))}
        </Tabs>
        {notes.map((note) => (
          <Box key={note.id} className={classes.tabPanelBox}>
            {note.name}
          </Box>
        ))}
      </TabPanel>
    </Paper>
  );
};
