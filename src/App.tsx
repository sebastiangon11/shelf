import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Drawer } from '@material-ui/core';

import { Header } from './components/Header/Header';
import { ClipboardHistory } from './components/ClipboardHistory/ClipboardHistory';
import { Notes } from './components/Notes/Notes';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    border: 0
  },
  main: {
    height: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  mainShift: {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  const [drawer, setDrawer] = React.useState({
    isOpen: true,
    width: drawerWidth
  });

  const toggleDrawer = () => setDrawer({ ...drawer, isOpen: !drawer.isOpen });
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Semicolon') toggleDrawer();
  };

  React.useEffect(() => {
    // TODO: Change fot configurable shortcut
    // TODO: Multiple strokes are quick clipboard selection ?
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <React.Fragment>
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
        open={drawer.isOpen}
        anchor="right"
        variant="persistent"
      >
        <ClipboardHistory />
      </Drawer>
      <section
        className={clsx(classes.main, {
          [classes.mainShift]: drawer.isOpen
        })}
      >
        <Header title="Shelf" />
        <Notes />
      </section>
    </React.Fragment>
  );
};

export default App;
