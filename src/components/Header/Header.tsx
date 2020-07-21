import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { SearchBox } from '../SearchBox/SearchBox';
import { ElectronContext } from '../../context/electron-context';

interface HeaderProps {
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    color: 'rgba(0, 0, 0, 0.87)',
    background: 'linear-gradient(90deg, rgba(23,73,134,1) 0%, rgba(0,212,255,1) 100%)'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    fontWeight: 200
  },
  toolbar: {
    minHeight: theme.spacing(6),
    justifyContent: 'space-between'
  }
}));

export const Header: React.FC<HeaderProps> = (props) => {
  const { toolbar, appBar } = useStyles();
  const { quit } = useContext(ElectronContext);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  return (
    <AppBar className={appBar} position="static">
      <Toolbar className={toolbar}>
        <IconButton
          onClick={(event: React.MouseEvent) => setAnchorEl(event.currentTarget)}
          edge="start"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={quit}>Quit</MenuItem>
        </Menu>
        <Typography variant="h6">{props.title}</Typography>
        <SearchBox data-testid="header-searchbox" />
      </Toolbar>
    </AppBar>
  );
};
