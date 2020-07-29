import { PreferencesService } from '../src/shared/services/Preferences-service';
import { PREFERENCES_IDS } from '../src/shared/constants';
import { Preference } from '../src/shared/entities/Preference';

const {
  OPEN_AT_LOGIN,
  SHORTCUT_TOGGLE_CLIPBOARD_HISTORY,
  SHORTCUT_TOGGLE_WINDOW
} = PREFERENCES_IDS;

export const initializePreferences = () => {
  console.log('Initializing preferences...');

  const openAtLogin = PreferencesService.getPreference(OPEN_AT_LOGIN);
  if (openAtLogin === undefined) {
    PreferencesService.savePreference(
      new Preference(OPEN_AT_LOGIN, 'Run application on startup', true, true)
    );
  }

  const shortcutToggleWindow = PreferencesService.getPreference(SHORTCUT_TOGGLE_WINDOW);
  if (shortcutToggleWindow === undefined) {
    PreferencesService.savePreference(
      new Preference(SHORTCUT_TOGGLE_WINDOW, 'Show/Hide application', 'l', true)
    );
  }

  const shortcutToggleClipboard = PreferencesService.getPreference(
    SHORTCUT_TOGGLE_CLIPBOARD_HISTORY
  );
  if (shortcutToggleClipboard === undefined) {
    PreferencesService.savePreference(
      new Preference(SHORTCUT_TOGGLE_CLIPBOARD_HISTORY, 'Show/Hide clipboard history', ';', false)
    );
  }
};
