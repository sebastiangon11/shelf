import { app, globalShortcut } from 'electron';
import { menubar, Menubar } from 'menubar';
import { Store } from '../src/shared/store/store';
import config from './application-config';
import { PreferencesService } from '../src/shared/services/Preferences-service';
import { initializePreferences } from './initialize-preferences';
import { PREFERENCES_IDS } from '../src/shared/constants';

if (process.env.NODE_ENV === 'development') {
  const debug = require('electron-debug');
  debug({ showDevTools: false }); // cmd + opt + I
}

let mb: Menubar | null = null;
let isShowing = false;

const toggleWindow = () => {
  const bounds: any = mb?.window?.getBounds();
  isShowing ? mb?.hideWindow() : mb?.showWindow();
  isShowing = !isShowing;
  mb?.window?.setBounds(bounds);
};

const init = () => {
  initializePreferences();

  /** Get preferences and stored configs */
  const openAtLogin: boolean = PreferencesService.getPreference(
    PREFERENCES_IDS.SHORTCUT_TOGGLE_WINDOW
  )?.value as boolean;

  const toggleKey: string = PreferencesService.getPreference(PREFERENCES_IDS.SHORTCUT_TOGGLE_WINDOW)
    ?.value as string;

  mb = menubar(config());

  const savePosition = (event: any) => {
    Store.set('position', event.sender.getBounds());
  };

  mb.on('ready', () => {
    console.info('App ready');
    mb?.app.setLoginItemSettings({ openAtLogin });
    mb?.window?.on('blur', () => (isShowing = false));
    mb?.window?.on('close', savePosition);
    globalShortcut.register(`CommandOrControl+Shift+${toggleKey}`, toggleWindow);
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
