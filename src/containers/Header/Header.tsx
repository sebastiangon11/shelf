import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { SearchBox } from '../../components/SearchBox/SearchBox';
import { ElectronContext } from '../../context/electron-context';
import { Modal, Divider } from '@material-ui/core';
import { Preferences } from '../Preferences/Preferences';

interface HeaderProps {}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    color: 'rgba(0, 0, 0, 0.87)',
    background: 'linear-gradient(90deg, rgba(23,73,134,1) 0%, rgba(0,212,255,1) 100%)',
    '-webkit-app-region': 'drag'
  },
  toolbar: {
    minHeight: theme.spacing(6),
    justifyContent: 'space-between'
  },
  iconRoot: {
    '-webkit-app-region': 'no-drag'
  }
}));

export const Header: React.FC<HeaderProps> = () => {
  const { toolbar, appBar, iconRoot } = useStyles();
  const { quit } = useContext(ElectronContext);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [showPreferences, setShowPreferences] = React.useState(false);

  const closePreferences = () => {
    setAnchorEl(null);
    setShowPreferences(false);
  };

  return (
    <AppBar className={appBar} position="static">
      <Toolbar className={toolbar}>
        <span />
        <SearchBox data-testid="header-searchbox" />
        <IconButton
          onClick={(event: React.MouseEvent) => setAnchorEl(event.currentTarget)}
          edge="start"
          color="inherit"
          classes={{ root: iconRoot }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setShowPreferences(true)}>Preferences</MenuItem>
          <Divider />
          <MenuItem onClick={quit}>Quit</MenuItem>
        </Menu>
      </Toolbar>
      <Modal open={showPreferences} onClose={closePreferences}>
        <Preferences onSave={closePreferences} />
      </Modal>
    </AppBar>
  );
};
