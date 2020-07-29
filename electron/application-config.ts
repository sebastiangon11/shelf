import { screen } from 'electron';
import path from 'path';
import url from 'url';
import { Store } from '../src/shared/store/store';

export default () => {
  const dir =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    });

  const index = dir;

  const preloadWindow = true;

  const icon = path.join(__dirname, '..', 'src/shared/assets/icons', 'icon.png');

  const showDockIcon = false;

  const movable = true;

  const fullscreenable = false;

  const minimizable = false;

  const skipTaskbar = true;

  const titleBarStyle = 'hidden' as const;

  const preload = path.join(__dirname, 'preload.js');

  const nodeIntegration = true;

  const enableRemoteModule = true;

  const webPreferences = {
    preload,
    nodeIntegration,
    enableRemoteModule
  };

  const position = Store.get('position') || {
    x: 0,
    y: 0,
    width: screen.getPrimaryDisplay().size.width - 300,
    height: 650
  };

  const browserWindow = {
    ...position,
    webPreferences,
    movable,
    fullscreenable,
    minimizable,
    skipTaskbar,
    titleBarStyle
  };

  return {
    dir,
    index,
    preloadWindow,
    icon,
    showDockIcon,
    browserWindow
  };
};
