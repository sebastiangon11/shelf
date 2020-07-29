import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Drawer } from '@material-ui/core';

import { Header } from './containers/Header/Header';
import { ClipboardHistory } from './containers/ClipboardHistory/ClipboardHistory';
import { Notes } from './containers/Notes/Notes';

import Mousetrap from 'mousetrap';
import './plugins/mousetrap/mousetrap-global-bind';

import { PreferencesService } from '../src/shared/services/Preferences-service';
import { PREFERENCES_IDS } from './shared/constants';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'transparent',
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

  React.useEffect(() => {
    const hot =
      PreferencesService.getPreference(PREFERENCES_IDS.SHORTCUT_TOGGLE_CLIPBOARD_HISTORY)?.value ||
      ';';
    Mousetrap.bindGlobal(`meta+shift+${hot}`, (_) => {
      setDrawer({ ...drawer, isOpen: !drawer.isOpen });
      return false;
    });

    return () => Mousetrap.unbind(hot);
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
        <Header />
        <Notes />
      </section>
    </React.Fragment>
  );
};

export default App;
