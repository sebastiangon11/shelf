import { app, ipcMain, globalShortcut, screen } from 'electron';
import { menubar, Menubar } from 'menubar';
import electronSettings from 'electron-settings';
import path from 'path';
import url from 'url';

if (process.env.NODE_ENV === 'development') {
  const debug = require('electron-debug');
  debug({ showDevTools: false }); // cmd + opt + I
}

let mb: Menubar | null = null;
let isShowing = false;

const toggleWindow = () => {
  isShowing ? mb?.hideWindow() : mb?.showWindow();
  isShowing = !isShowing;
};

const init = async () => {
  const dir =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    });
  const index = dir;
  const preloadWindow = true;
  const frame = false;
  const icon = path.join(__dirname, '..', 'src/shared/assets/icons', 'icon.png');
  const webPreferences = {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: true
  };

  let width: number = parseInt((screen.getPrimaryDisplay().size.width - 300).toString());
  if (await electronSettings.has('width')) {
    width = parseInt(((await electronSettings.get('width')) || '').toString());
  }

  let height: number = 650;
  if (await electronSettings.has('height')) {
    height = parseInt(((await electronSettings.get('height')) || '').toString());
  }

  const browserWindow = { frame, webPreferences, width, height };
  const showDockIcon = false;
  const windowPosition = 'topCenter' as const;

  const config = {
    dir,
    index,
    preloadWindow,
    browserWindow,
    showDockIcon,
    windowPosition,
    icon
  };
  mb = menubar(config);

  const onWindowBlur = () => (isShowing = false);

  const onWindowResize = () => {
    const [width, height]: any = mb?.window?.getSize();
    electronSettings.set('width', width);
    electronSettings.set('height', height);
  };

  mb.on('ready', () => {
    console.log('App ready');
    mb?.app.setLoginItemSettings({ openAtLogin: true });
    mb?.window?.on('blur', onWindowBlur);
    mb?.window?.on('resize', onWindowResize);
    globalShortcut.register('CommandOrControl+Shift+l', toggleWindow);
  });
};

app.on('ready', init);

app.on('before-quit', globalShortcut.unregisterAll);

app.on('window-all-closed', () => {
  if (mb?.app) mb?.app.quit();
  app.quit();
});

app.on('activate', () => {
  if (mb?.window === null) init();
});
